from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models.road_trip import RoadTrip
from pydantic import BaseModel

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

    class Config:
        from_attributes = True

@router.get("", response_model=List[RoadTripResponse])
def get_road_trips(
    destination: Optional[str] = Query(None),
    duration: Optional[str] = Query(None),
    travel_style: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(RoadTrip)

    if destination:
        query = query.filter(RoadTrip.title.ilike(f"%{destination}%"))

    if travel_style:
        query = query.filter(RoadTrip.travel_style == travel_style)

    if duration == "1-2":
        query = query.filter(RoadTrip.min_days <= 2)
    elif duration == "3-5":
        query = query.filter(RoadTrip.min_days >= 3, RoadTrip.min_days <= 5)
    elif duration == "7+":
        query = query.filter(RoadTrip.min_days >= 7)

    results = query.all()
    
    # Map snake_case model to camelCase JSON output
    return [
        RoadTripResponse(
            id=item.id,
            badge=item.badge,
            title=item.title,
            tags=item.tags,
            duration=item.duration,
            distance=item.distance,
            image=item.image,
            travelStyle=item.travel_style
        ) for item in results
    ]