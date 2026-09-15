from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from database import get_db
import models.group_trip as models

router = APIRouter(
    prefix="/group-trips",
    tags=["Group Trips"]
)

# --- Pydantic Schemas ---

class GroupTripSchema(BaseModel):
    id: str
    title: str
    tag: str
    location: str
    duration: str
    tags: List[str]
    price: float
    image: str

    class Config:
        from_attributes = True


class TestimonialSchema(BaseModel):
    id: str
    quote: str
    name: str
    country: str
    rating: int
    avatar: str

    class Config:
        from_attributes = True

# --- Endpoints ---

@router.get("", response_model=List[GroupTripSchema])
def get_group_trips(
    destination: Optional[str] = Query(None),
    trip_type: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.GroupTrip)
    
    if destination:
        query = query.filter(
            (models.GroupTrip.location.ilike(f"%{destination}%")) |
            (models.GroupTrip.title.ilike(f"%{destination}%"))
        )
    if trip_type:
        query = query.filter(models.GroupTrip.trip_type.ilike(f"%{trip_type}%"))

    return query.all()


@router.get("/testimonials", response_model=List[TestimonialSchema])
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(models.Testimonial).all()