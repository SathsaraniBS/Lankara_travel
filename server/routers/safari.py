from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from database import get_db
import models.safari as models

safari_router = APIRouter(
    prefix="/safari",
    tags=["Safari"]
)

# --- Pydantic Schemas ---

class SafariDestinationSchema(BaseModel):
    id: int
    badge: Optional[str] = None
    locationTag: str
    title: str
    type: str
    duration: str
    season: str
    price: float
    image: str

    class Config:
        from_attributes = True

class WildlifeCategorySchema(BaseModel):
    id: str
    name: str
    tripsCount: str
    image: str

    class Config:
        from_attributes = True

class SafariExperienceSchema(BaseModel):
    id: int
    badge: str
    title: str
    tag1: str
    duration: str
    tag2: str
    price: float
    image: str

    class Config:
        from_attributes = True

# --- Endpoints ---

@safari_router.get("/destinations", response_model=List[SafariDestinationSchema])
def get_destinations(
    destination: Optional[str] = Query(None),
    trip_type: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.SafariDestination)
    if destination:
        query = query.filter(
            (models.SafariDestination.location_tag.ilike(f"%{destination}%")) |
            (models.SafariDestination.title.ilike(f"%{destination}%"))
        )
    if trip_type:
        query = query.filter(models.SafariDestination.type.ilike(f"%{trip_type}%"))
    
    results = query.all()
    
    # Map snake_case DB columns to camelCase expected by Next.js
    return [
        SafariDestinationSchema(
            id=d.id,
            badge=d.badge,
            locationTag=d.location_tag,
            title=d.title,
            type=d.type,
            duration=d.duration,
            season=d.season,
            price=d.price,
            image=d.image
        )
        for d in results
    ]

@safari_router.get("/categories", response_model=List[WildlifeCategorySchema])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.WildlifeCategory).all()
    return [
        WildlifeCategorySchema(
            id=c.id,
            name=c.name,
            tripsCount=c.trips_count,
            image=c.image
        )
        for c in categories
    ]

@safari_router.get("/experiences", response_model=List[SafariExperienceSchema])
def get_experiences(db: Session = Depends(get_db)):
    experiences = db.query(models.SafariExperience).all()
    return [
        SafariExperienceSchema(
            id=e.id,
            badge=e.badge,
            title=e.title,
            tag1=e.tag1,
            duration=e.duration,
            tag2=e.tag2,
            price=e.price,
            image=e.image
        )
        for e in experiences
    ]