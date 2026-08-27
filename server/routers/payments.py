# server/routers/payments.py
import os
import stripe
from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel

stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_your_stripe_secret_key")
router = APIRouter(prefix="/api/v1/payments", tags=["Payments"])

class CreateCheckoutSession(BaseModel):
    booking_id: str
    title: str
    amount: float  # In USD
    quantity: int = 1

@router.post("/create-checkout-session")
async def create_checkout_session(data: CreateCheckoutSession):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": data.title,
                    },
                    "unit_amount": int(data.amount * 100),  # Stripe uses cents
                },
                "quantity": data.quantity,
            }],
            mode="payment",
            success_url=f"http://localhost:3000/profile?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url="http://localhost:3000/bookings",
            metadata={"booking_id": data.booking_id}
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))