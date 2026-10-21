from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import List, Optional
import uuid

from database import get_db
from models.user import User
from auth import get_current_user  

router = APIRouter(prefix="/api", tags=["Dashboard"])

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
    days: str
    type: str
    guests: str
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
    avatar_url: str
    stats: StatsSchema
    upcoming_trip: Optional[TripSchema] = None
    popular_destinations: List[DestinationSchema]
    recent_activities: List[ActivitySchema]
    travel_tips: List[TipSchema]


# ============================================================
# Dashboard API Endpoint
# ============================================================
@router.get("/dashboard", response_model=DashboardResponse)
async def get_dashboard_data(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    
    # 1. User Profile Details
    full_name = current_user.full_name or "Traveler"
    email = current_user.email
    role = "Admin" if getattr(current_user, "is_admin", False) else "Traveler"
    avatar_url = "/images/colombo.jpg"

    stats = StatsSchema(
        total_bookings=3,
        wishlist_count=5,
        upcoming_trips=1,
        travel_points=250
    )

    # 3. Upcoming Trip
    upcoming_trip = TripSchema(
        title="Ella Getaway",
        location="Ella, Badulla District",
        date="12 Apr 2025 - 16 Apr 2025",
        days="4 Days",
        type="Round Trip",
        guests="2 Adults",
        image="/images/ella.jpg"
    )

    # 4. Popular Destinations
    popular_destinations = [
        DestinationSchema(id="d1", name="Ella", province="Central Province", image="/images/ella.jpg"),
        DestinationSchema(id="d2", name="Galle", province="Southern Province", image="/images/unawatuna.jpg"),
        DestinationSchema(id="d3", name="Kandy", province="Central Province", image="/images/Kandy.jpg"),
        DestinationSchema(id="d4", name="Sigiriya", province="Central Province", image="/images/sigiriya.jpg"),
    ]

    # 5. Recent Activities
    recent_activities = [
        ActivitySchema(id="a1", title="Hotel Booking Confirmed", subtitle="Cinnamon Grand Colombo", date="10 Apr 2025"),
        ActivitySchema(id="a2", title="Flight Booked", subtitle="Colombo → Dubai", date="05 Apr 2025"),
        ActivitySchema(id="a3", title="Holiday Package Viewed", subtitle="Maldives - 5 Days", date="28 Mar 2025"),
    ]

    # 6. Travel Tips
    travel_tips = [
        TipSchema(id="t1", title="Best Time to Visit Sri Lanka", description="Weather, seasons and what to pack.", image="/images/sigiriya.jpg"),
        TipSchema(id="t2", title="Top 10 Beaches in Sri Lanka", description="Crystal clear waters and golden sands.", image="/images/unawatuna.jpg"),
        TipSchema(id="t3", title="Essential Travel Tips", description="Make your trip smooth and safe.", image="/images/ella.jpg"),
    ]

    return DashboardResponse(
        full_name=full_name,
        email=email,
        role=role,
        avatar_url=avatar_url,
        stats=stats,
        upcoming_trip=upcoming_trip,
        popular_destinations=popular_destinations,
        recent_activities=recent_activities,
        travel_tips=travel_tips
    )