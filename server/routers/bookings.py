from typing import Optional, List
from datetime import datetime
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, ConfigDict, field_validator

from database import get_db
from models.user import User
from models.flight import Flight
from models.hotel import Hotel
from models.booking import Booking, BookingStatus
from auth import get_current_user

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])


# ============================================================
# Pydantic Schemas
# ============================================================
class BookingCreate(BaseModel):
    flight_id: Optional[uuid.UUID] = None
    hotel_id: Optional[uuid.UUID] = None
    passengers: int = 1  # Flight booking - seats 
    rooms: int = 1       # Hotel booking - rooms 

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
    flight_info: Optional[dict] = None
    hotel_info: Optional[dict] = None


# ============================================================
# Routes
# ============================================================

@router.post("/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
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

    total_amount = 0.0
    flight = None
    hotel = None

    # ---------------------------------------------------
    # Flight Booking - Row lock seats check 
    # ---------------------------------------------------
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

    # ---------------------------------------------------
    # Hotel Booking - Row lock  rooms check 
    # ---------------------------------------------------
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
        total_amount += hotel.price_per_night * booking_data.rooms

    # ---------------------------------------------------
    # Booking Record Create 
    # ---------------------------------------------------
    new_booking = Booking(
        user_id=current_user.id,
        flight_id=booking_data.flight_id,
        hotel_id=booking_data.hotel_id,
        status=BookingStatus.pending,  
        total_amount=total_amount,
    )

    db.add(new_booking)
    await db.commit()
    await db.refresh(new_booking)

    return new_booking


@router.get("/", response_model=List[BookingResponse])
async def get_my_bookings(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Booking)
        .where(Booking.user_id == current_user.id)
        .order_by(Booking.created_at.desc())
    )
    bookings = result.scalars().all()
    return bookings


@router.get("/{booking_id}", response_model=BookingDetailResponse)
async def get_booking(
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
            detail="You don't have permission to view this booking",
        )

    flight_info = None
    hotel_info = None

    if booking.flight_id:
        flight_result = await db.execute(select(Flight).where(Flight.id == booking.flight_id))
        flight = flight_result.scalar_one_or_none()
        if flight:
            flight_info = {
                "airline": flight.airline,
                "flight_number": flight.flight_number,
                "departure_city": flight.departure_city,
                "destination_city": flight.destination_city,
                "departure_time": flight.departure_time.isoformat(),
            }

    if booking.hotel_id:
        hotel_result = await db.execute(select(Hotel).where(Hotel.id == booking.hotel_id))
        hotel = hotel_result.scalar_one_or_none()
        if hotel:
            hotel_info = {
                "name": hotel.name,
                "city": hotel.city,
                "address": hotel.address,
            }

    return BookingDetailResponse(
        **BookingResponse.model_validate(booking).model_dump(),
        flight_info=flight_info,
        hotel_info=hotel_info,
    )


@router.patch("/{booking_id}/cancel", response_model=BookingResponse)
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

    if booking.flight_id:
        flight_result = await db.execute(
            select(Flight).where(Flight.id == booking.flight_id).with_for_update()
        )
        flight = flight_result.scalar_one_or_none()
        if flight:
            flight.seats_available += 1  # Simplified - passengers count track කරන්නේ නැති නිසා

    if booking.hotel_id:
        hotel_result = await db.execute(
            select(Hotel).where(Hotel.id == booking.hotel_id).with_for_update()
        )
        hotel = hotel_result.scalar_one_or_none()
        if hotel:
            hotel.rooms_available += 1

    booking.status = BookingStatus.cancelled
    await db.commit()
    await db.refresh(booking)

    return booking