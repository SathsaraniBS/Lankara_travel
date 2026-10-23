from typing import Optional, List
from datetime import datetime, date
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from pydantic import BaseModel, ConfigDict, field_validator

from database import get_db
from models.user import User
from models.flight import Flight
from models.hotel import Hotel
from models.booking import Booking, BookingStatus
from auth import get_current_user

router = APIRouter(tags=["Bookings"])

# The same routes are served under every prefix the frontend / proxy might use.
PREFIXES = ["/api/bookings", "/api/v1/bookings", "/bookings"]


def multi_route(method: str, path: str, **kwargs):
    """Register one handler under all PREFIXES (only the first shows in /docs)."""
    def decorator(fn):
        for i, prefix in enumerate(PREFIXES):
            router.add_api_route(
                prefix + path,
                fn,
                methods=[method],
                include_in_schema=(i == 0),
                **kwargs,
            )
        return fn
    return decorator


# ============================================================
# Pydantic Schemas
# ============================================================
class BookingCreate(BaseModel):
    flight_id: Optional[uuid.UUID] = None
    hotel_id: Optional[uuid.UUID] = None
    passengers: int = 1
    rooms: int = 1
    check_in: Optional[date] = None
    check_out: Optional[date] = None
    traveler_name: Optional[str] = None
    traveler_email: Optional[str] = None
    traveler_phone: Optional[str] = None
    special_requests: Optional[str] = None

    @field_validator("passengers", "rooms")
    @classmethod
    def must_be_positive(cls, v):
        if v < 1:
            raise ValueError("Must be at least 1")
        return v


class BookingResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    user_id: uuid.UUID
    flight_id: Optional[uuid.UUID] = None
    hotel_id: Optional[uuid.UUID] = None
    status: BookingStatus
    total_amount: float
    created_at: datetime


class BookingDetailResponse(BookingResponse):
    passengers: int = 1
    rooms: int = 1
    check_in: Optional[date] = None
    check_out: Optional[date] = None
    nights: Optional[int] = None
    traveler_name: Optional[str] = None
    traveler_email: Optional[str] = None
    traveler_phone: Optional[str] = None
    special_requests: Optional[str] = None
    payment_status: Optional[str] = None
    flight_info: Optional[dict] = None
    hotel_info: Optional[dict] = None


# ============================================================
# Helpers
# ============================================================
def _nights(check_in: Optional[date], check_out: Optional[date]) -> Optional[int]:
    if check_in and check_out:
        return max((check_out - check_in).days, 0)
    return None


def _iso(value) -> Optional[str]:
    return value.isoformat() if value is not None else None


def build_detail(booking: Booking) -> BookingDetailResponse:
    """Needs booking.flight / booking.hotel / booking.payment already loaded."""
    flight_info = None
    hotel_info = None

    f = booking.flight
    if f:
        flight_info = {
            "airline": f.airline,
            "flight_number": f.flight_number,
            "departure_city": f.departure_city,
            "destination_city": f.destination_city,
            "departure_time": _iso(f.departure_time),
            "arrival_time": _iso(getattr(f, "arrival_time", None)),
            "price": f.price,
        }

    h = booking.hotel
    if h:
        hotel_info = {
            "name": h.name,
            "city": h.city,
            "address": h.address,
            "price_per_night": h.price_per_night,
        }

    payment_status = None
    if booking.payment is not None:
        raw = getattr(booking.payment, "status", None)
        payment_status = getattr(raw, "value", raw)
        payment_status = str(payment_status) if payment_status is not None else None

    base = BookingResponse.model_validate(booking).model_dump()
    return BookingDetailResponse(
        **base,
        passengers=booking.passengers or 1,
        rooms=booking.rooms or 1,
        check_in=booking.check_in,
        check_out=booking.check_out,
        nights=_nights(booking.check_in, booking.check_out),
        traveler_name=booking.traveler_name,
        traveler_email=booking.traveler_email,
        traveler_phone=booking.traveler_phone,
        special_requests=booking.special_requests,
        payment_status=payment_status,
        flight_info=flight_info,
        hotel_info=hotel_info,
    )


_LOAD = (
    selectinload(Booking.flight),
    selectinload(Booking.hotel),
    selectinload(Booking.payment),
)


# ============================================================
# Routes
# ============================================================
@multi_route("POST", "/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking_data: BookingCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if not booking_data.flight_id and not booking_data.hotel_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one of flight_id or hotel_id must be provided",
        )

    nights = None
    if booking_data.hotel_id:
        nights = _nights(booking_data.check_in, booking_data.check_out)
        if not nights:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Check-out must be after check-in",
            )

    total_amount = 0.0

    # Flight - row lock + seat check
    if booking_data.flight_id:
        result = await db.execute(
            select(Flight).where(Flight.id == booking_data.flight_id).with_for_update()
        )
        flight = result.scalar_one_or_none()

        if not flight:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Flight not found")

        if flight.seats_available < booking_data.passengers:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only {flight.seats_available} seats available, requested {booking_data.passengers}",
            )

        flight.seats_available -= booking_data.passengers
        total_amount += flight.price * booking_data.passengers

    # Hotel - row lock + room check
    if booking_data.hotel_id:
        result = await db.execute(
            select(Hotel).where(Hotel.id == booking_data.hotel_id).with_for_update()
        )
        hotel = result.scalar_one_or_none()

        if not hotel:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hotel not found")

        if hotel.rooms_available < booking_data.rooms:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only {hotel.rooms_available} rooms available, requested {booking_data.rooms}",
            )

        hotel.rooms_available -= booking_data.rooms
        total_amount += hotel.price_per_night * booking_data.rooms * nights

    new_booking = Booking(
        user_id=current_user.id,
        flight_id=booking_data.flight_id,
        hotel_id=booking_data.hotel_id,
        status=BookingStatus.pending,
        total_amount=total_amount,
        passengers=booking_data.passengers if booking_data.flight_id else 1,
        rooms=booking_data.rooms if booking_data.hotel_id else 1,
        check_in=booking_data.check_in if booking_data.hotel_id else None,
        check_out=booking_data.check_out if booking_data.hotel_id else None,
        traveler_name=booking_data.traveler_name,
        traveler_email=booking_data.traveler_email,
        traveler_phone=booking_data.traveler_phone,
        special_requests=booking_data.special_requests,
    )

    db.add(new_booking)
    await db.commit()
    await db.refresh(new_booking)

    return new_booking


@multi_route("GET", "/", response_model=List[BookingDetailResponse])
async def get_my_bookings(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Booking)
        .options(*_LOAD)
        .where(Booking.user_id == current_user.id)
        .order_by(Booking.created_at.desc())
    )
    return [build_detail(b) for b in result.scalars().all()]


@multi_route("GET", "/{booking_id}", response_model=BookingDetailResponse)
async def get_booking(
    booking_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Booking).options(*_LOAD).where(Booking.id == booking_id)
    )
    booking = result.scalar_one_or_none()

    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if booking.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to view this booking",
        )

    return build_detail(booking)


@multi_route("PATCH", "/{booking_id}/cancel", response_model=BookingResponse)
async def cancel_booking(
    booking_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalar_one_or_none()

    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if booking.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to cancel this booking",
        )

    if booking.status == BookingStatus.cancelled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Booking already cancelled")

    # Paid bookings need a refund flow -> support handles it (matches the UI text)
    if booking.status == BookingStatus.confirmed and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Paid bookings can't be cancelled online. Please contact support.",
        )

    if booking.flight_id:
        flight_result = await db.execute(
            select(Flight).where(Flight.id == booking.flight_id).with_for_update()
        )
        flight = flight_result.scalar_one_or_none()
        if flight:
            flight.seats_available += booking.passengers or 1

    if booking.hotel_id:
        hotel_result = await db.execute(
            select(Hotel).where(Hotel.id == booking.hotel_id).with_for_update()
        )
        hotel = hotel_result.scalar_one_or_none()
        if hotel:
            hotel.rooms_available += booking.rooms or 1

    booking.status = BookingStatus.cancelled
    await db.commit()
    await db.refresh(booking)

    return booking