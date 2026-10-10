from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, ConfigDict
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
import models.group_trip as models

group_trips_router = APIRouter(
    prefix="/group-trips",
    tags=["Group Trips"],
)


# --- Pydantic Schemas ---

class GroupTripSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    tag: str
    location: str
    duration: str
    tags: List[str]
    price: float
    image: str


class TestimonialSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    quote: str
    name: str
    country: str
    rating: int
    avatar: str


# --- Endpoints ---

@group_trips_router.get("", response_model=List[GroupTripSchema])
async def get_group_trips(
    destination: Optional[str] = Query(None),
    trip_type: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(models.GroupTrip)

    if destination:
        query = query.where(
            or_(
                models.GroupTrip.location.ilike(f"%{destination}%"),
                models.GroupTrip.title.ilike(f"%{destination}%"),
            )
        )
    if trip_type:
        query = query.where(models.GroupTrip.trip_type.ilike(f"%{trip_type}%"))

    result = await db.execute(query.order_by(models.GroupTrip.title))
    return result.scalars().all()


@group_trips_router.get("/testimonials", response_model=List[TestimonialSchema])
async def get_testimonials(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Testimonial))
    return result.scalars().all()