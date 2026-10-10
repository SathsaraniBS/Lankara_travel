from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.road_trip import RoadTrip

router = APIRouter(prefix="/api/v1/road-trips", tags=["Road Trips"])


class RoadTripResponse(BaseModel):
    id: str
    badge: str
    title: str
    tags: List[str]
    duration: str
    distance: str
    image: str
    travelStyle: str


@router.get("", response_model=List[RoadTripResponse])
async def get_road_trips(
    destination: Optional[str] = Query(None),
    duration: Optional[str] = Query(None),
    travel_style: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(RoadTrip)

    if destination:
        query = query.where(RoadTrip.title.ilike(f"%{destination}%"))

    if travel_style:
        query = query.where(RoadTrip.travel_style == travel_style)

    if duration == "1-2":
        query = query.where(RoadTrip.min_days <= 2)
    elif duration == "3-5":
        query = query.where(RoadTrip.min_days >= 3, RoadTrip.min_days <= 5)
    elif duration == "7+":
        query = query.where(RoadTrip.min_days >= 7)

    result = await db.execute(query.order_by(RoadTrip.title))
    items = result.scalars().all()

    # Map snake_case model to the camelCase JSON the frontend expects
    return [
        RoadTripResponse(
            id=item.id,
            badge=item.badge,
            title=item.title,
            tags=item.tags,
            duration=item.duration,
            distance=item.distance,
            image=item.image,
            travelStyle=item.travel_style,
        )
        for item in items
    ]