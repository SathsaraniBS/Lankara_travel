import asyncio
import logging
import os
import uuid

import stripe
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from auth import get_current_user
from database import get_db
from models.booking import Booking, BookingStatus
from models.payment import Payment, PaymentStatus
from models.user import User

load_dotenv()

logger = logging.getLogger(__name__)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")
PAYMENT_CURRENCY = os.getenv("PAYMENT_CURRENCY", "usd").lower()

router = APIRouter(prefix="/api/v1/payments", tags=["Payments"])


class CreateCheckoutSession(BaseModel):
    # Only the booking id is trusted. The amount always comes from the database;
    # any other fields an old client still sends (title, amount, quantity) are ignored.
    booking_id: uuid.UUID


@router.post("/create-checkout-session")
async def create_checkout_session(
    data: CreateCheckoutSession,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if not stripe.api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Payments are not configured",
        )

    result = await db.execute(select(Booking).where(Booking.id == data.booking_id))
    booking = result.scalar_one_or_none()

    # Same answer for "does not exist" and "belongs to someone else"
    # so booking ids cannot be probed.
    if booking is None or booking.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if booking.status != BookingStatus.pending:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"This booking is already {booking.status.value}",
        )

    if booking.total_amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking has no payable amount",
        )

    amount_minor = round(booking.total_amount * 100)  # Stripe uses the smallest currency unit

    # Payment.booking_id is unique, so reuse the row if the user retries checkout
    pay_result = await db.execute(select(Payment).where(Payment.booking_id == booking.id))
    payment = pay_result.scalar_one_or_none()

    if payment is not None and payment.status == PaymentStatus.succeeded:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This booking has already been paid",
        )

    if payment is None:
        payment = Payment(
            booking_id=booking.id,
            amount=booking.total_amount,
            currency=PAYMENT_CURRENCY,
            status=PaymentStatus.pending,
        )
        db.add(payment)
    else:
        payment.amount = booking.total_amount
        payment.currency = PAYMENT_CURRENCY
        payment.status = PaymentStatus.pending

    booking_ref = str(booking.id)[:8].upper()

    try:
        # The Stripe SDK call is blocking, so run it off the event loop
        session = await asyncio.to_thread(
            stripe.checkout.Session.create,
            mode="payment",
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": PAYMENT_CURRENCY,
                        "product_data": {"name": f"Lankara Travels booking #{booking_ref}"},
                        "unit_amount": amount_minor,
                    },
                    "quantity": 1,
                }
            ],
            success_url=f"{FRONTEND_URL}/checkout/confirmation?ref={booking.id}",
            cancel_url=f"{FRONTEND_URL}/bookings",
            client_reference_id=str(booking.id),
            customer_email=current_user.email,
            metadata={"booking_id": str(booking.id)},
        )
    except Exception:
        logger.exception("Stripe checkout session creation failed for booking %s", booking.id)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Payment provider error. Please try again.",
        )

    await db.commit()
    return {"url": session.url}


async def _mark_paid(
    db: AsyncSession,
    booking_id_str: str | None,
    payment_intent_id: str | None,
    amount_total: int | None,
) -> None:
    try:
        booking_id = uuid.UUID(str(booking_id_str))
    except ValueError:
        logger.warning("Webhook without a valid booking_id in metadata")
        return

    booking_result = await db.execute(
        select(Booking).where(Booking.id == booking_id).with_for_update()
    )
    booking = booking_result.scalar_one_or_none()
    if booking is None:
        logger.warning("Webhook for unknown booking %s", booking_id)
        return

    # Make sure the amount Stripe actually charged matches what we expected
    if amount_total is not None and amount_total != round(booking.total_amount * 100):
        logger.error(
            "Amount mismatch for booking %s: stripe=%s expected=%s",
            booking_id,
            amount_total,
            round(booking.total_amount * 100),
        )
        return

    pay_result = await db.execute(
        select(Payment).where(Payment.booking_id == booking_id).with_for_update()
    )
    payment = pay_result.scalar_one_or_none()
    if payment is None:
        payment = Payment(
            booking_id=booking_id,
            amount=booking.total_amount,
            currency=PAYMENT_CURRENCY,
        )
        db.add(payment)

    if payment.status == PaymentStatus.succeeded:
        return  # Stripe retries webhooks, so this must be idempotent

    payment.status = PaymentStatus.succeeded
    payment.stripe_payment_intent_id = payment_intent_id

    if booking.status == BookingStatus.pending:
        booking.status = BookingStatus.confirmed
    elif booking.status == BookingStatus.cancelled:
        logger.warning("Paid booking %s was already cancelled: refund needed", booking_id)

    await db.commit()


async def _mark_failed(db: AsyncSession, booking_id_str: str | None) -> None:
    try:
        booking_id = uuid.UUID(str(booking_id_str))
    except ValueError:
        return

    pay_result = await db.execute(select(Payment).where(Payment.booking_id == booking_id))
    payment = pay_result.scalar_one_or_none()
    if payment is not None and payment.status == PaymentStatus.pending:
        payment.status = PaymentStatus.failed
        await db.commit()


@router.post("/webhook", include_in_schema=False)
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Webhook is not configured",
        )

    payload = await request.body()
    signature = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(payload, signature, STRIPE_WEBHOOK_SECRET)
    except Exception:
        # Invalid payload or bad signature
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid webhook")

    event_type = event["type"]
    session = event["data"]["object"]
    booking_id = (session.get("metadata") or {}).get("booking_id")

    if event_type in ("checkout.session.completed", "checkout.session.async_payment_succeeded"):
        if session.get("payment_status") == "paid":
            await _mark_paid(
                db,
                booking_id,
                session.get("payment_intent"),
                session.get("amount_total"),
            )
    elif event_type in ("checkout.session.expired", "checkout.session.async_payment_failed"):
        await _mark_failed(db, booking_id)

    return {"received": True}