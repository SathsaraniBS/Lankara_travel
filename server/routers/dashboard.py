from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from auth import get_current_user
from models.user import User
from models.booking import Booking, BookingStatus
from models.flight import Flight
from models.hotel import Hotel

router = APIRouter(prefix="/api", tags=["Dashboard"])

# ============================================================
# Settings you can tweak
# ============================================================
DEFAULT_IMAGE = "/images/sigiriya.jpg"

# Image for a trip / booking, picked from the destination city name
CITY_IMAGES = {
    "ella": "/images/ella.jpg",
    "kandy": "/images/Kandy.jpg",
    "sigiriya": "/images/sigiriya.jpg",
    "galle": "/images/unawatuna.jpg",
    "unawatuna": "/images/unawatuna.jpg",
    "mirissa": "/images/mirissa.webp",
    "colombo": "/images/colombo.jpg",
}

# Travel points rule (your decision): 1 point for every 100 spent on CONFIRMED bookings
TRAVEL_POINT_UNIT = 100.0

# Same catalogue as the /api/v1/destinations endpoint in main.py, plus the province.
# TODO: move to a shared module (or a DB table) so main.py and this file use one list.
POPULAR_DESTINATIONS = [
    {"id": "2", "name": "Ella", "province": "Uva Province", "image": "/images/ella.jpg"},
    {"id": "1", "name": "Sigiriya", "province": "Central Province", "image": "/images/sigiriya.jpg"},
    {"id": "4", "name": "Kandy", "province": "Central Province", "image": "/images/Kandy.jpg"},
    {"id": "3", "name": "Mirissa", "province": "Southern Province", "image": "/images/mirissa.webp"},
]

# Editorial content (not user data). TODO: replace with articles from the DB when available.
TRAVEL_TIPS = [
    {"id": "t1", "title": "Best Time to Visit Sri Lanka", "description": "Weather, seasons and what to pack.", "image": "/images/sigiriya.jpg"},
    {"id": "t2", "title": "Top 10 Beaches in Sri Lanka", "description": "Crystal clear waters and golden sands.", "image": "/images/unawatuna.jpg"},
    {"id": "t3", "title": "Essential Travel Tips", "description": "Make your trip smooth and safe.", "image": "/images/ella.jpg"},
]


# ============================================================
# Pydantic Schemas for Dashboard Response
# ============================================================
class StatsSchema(BaseModel):
    total_bookings: int
    wishlist_count: int
    upcoming_trips: int
    travel_points: int


class TripSchema(BaseModel):
    title: str
    location: str
    date: str
    days: str = ""
    type: str = ""
    guests: str = ""
    image: str


class DestinationSchema(BaseModel):
    id: str
    name: str
    province: str
    image: str


class ActivitySchema(BaseModel):
    id: str
    title: str
    subtitle: str
    date: str


class TipSchema(BaseModel):
    id: str
    title: str
    description: str
    image: str


class DashboardResponse(BaseModel):
    full_name: str
    email: str
    role: str
    avatar_url: Optional[str] = None
    stats: StatsSchema
    upcoming_trip: Optional[TripSchema] = None
    popular_destinations: List[DestinationSchema]
    recent_activities: List[ActivitySchema]
    travel_tips: List[TipSchema]


# ============================================================
# Helpers
# ============================================================
def _naive_utc(dt: datetime) -> datetime:
    """Flight.departure_time may be timezone-aware or naive; compare everything as naive UTC."""
    if dt.tzinfo is not None:
        return dt.astimezone(timezone.utc).replace(tzinfo=None)
    return dt


def _fmt(dt: datetime) -> str:
    return dt.strftime("%d %b %Y")


def _image_for_city(city: Optional[str]) -> str:
    return CITY_IMAGES.get((city or "").strip().lower(), DEFAULT_IMAGE)


def _activity_from_booking(booking: Booking, flight: Optional[Flight], hotel: Optional[Hotel]) -> ActivitySchema:
    if flight and hotel:
        kind = "Flight & Hotel"
    elif flight:
        kind = "Flight"
    else:
        kind = "Hotel"

    status_label = {
        BookingStatus.confirmed: "Confirmed",
        BookingStatus.pending: "Pending",
        BookingStatus.cancelled: "Cancelled",
    }.get(booking.status, "Updated")

    parts = []
    if flight:
        parts.append(f"{flight.departure_city} → {flight.destination_city}")
    if hotel:
        parts.append(hotel.name)

    return ActivitySchema(
        id=str(booking.id),
        title=f"{kind} Booking {status_label}",
        subtitle=" • ".join(parts),
        date=_fmt(booking.created_at),
    )


# ============================================================
# Dashboard API Endpoint  ->  GET /api/dashboard
# ============================================================
@router.get("/dashboard", response_model=DashboardResponse)
async def get_dashboard_data(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # 1. Current user's bookings together with their flight / hotel (one query)
    result = await db.execute(
        select(Booking, Flight, Hotel)
        .outerjoin(Flight, Booking.flight_id == Flight.id)
        .outerjoin(Hotel, Booking.hotel_id == Hotel.id)
        .where(Booking.user_id == current_user.id)
        .order_by(Booking.created_at.desc())
    )
    rows = result.all()

    now = datetime.utcnow()

    active_rows = [r for r in rows if r[0].status != BookingStatus.cancelled]

    # 2. Upcoming trips = active bookings with a flight that has not departed yet
    upcoming_rows = [
        r for r in active_rows
        if r[1] is not None and _naive_utc(r[1].departure_time) >= now
    ]
    upcoming_rows.sort(key=lambda r: _naive_utc(r[1].departure_time))

    upcoming_trip: Optional[TripSchema] = None
    if upcoming_rows:
        _, flight, hotel = upcoming_rows[0]
        upcoming_trip = TripSchema(
            title=f"{flight.departure_city} → {flight.destination_city}",
            location=flight.destination_city,
            date=_fmt(_naive_utc(flight.departure_time)),
            type="Flight + Hotel" if hotel else "Flight",
            image=_image_for_city(flight.destination_city),
        )

    # 3. Travel points from confirmed bookings
    confirmed_total = sum(
        (r[0].total_amount or 0.0) for r in rows if r[0].status == BookingStatus.confirmed
    )

    stats = StatsSchema(
        total_bookings=len(active_rows),
        wishlist_count=0,  # TODO: no wishlist table / route exists yet
        upcoming_trips=len(upcoming_rows),
        travel_points=int(confirmed_total // TRAVEL_POINT_UNIT),
    )

    # 4. Recent activities = latest 5 bookings
    recent_activities = [
        _activity_from_booking(booking, flight, hotel)
        for booking, flight, hotel in rows[:5]
    ]

    return DashboardResponse(
        full_name=current_user.full_name or "Traveler",
        email=current_user.email,
        role="Admin" if getattr(current_user, "is_admin", False) else "Traveler",
        avatar_url=None,  # TODO: users table has no avatar column yet
        stats=stats,
        upcoming_trip=upcoming_trip,
        popular_destinations=[DestinationSchema(**d) for d in POPULAR_DESTINATIONS],
        recent_activities=recent_activities,
        travel_tips=[TipSchema(**t) for t in TRAVEL_TIPS],
    )