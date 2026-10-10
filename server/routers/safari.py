from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
import models.safari as models

safari_router = APIRouter(
    prefix="/safari",
    tags=["Safari"],
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


class WildlifeCategorySchema(BaseModel):
    id: str
    name: str
    tripsCount: str
    image: str


class SafariExperienceSchema(BaseModel):
    id: int
    badge: str
    title: str
    tag1: str
    duration: str
    tag2: str
    price: float
    image: str


# --- Endpoints ---

@safari_router.get("/destinations", response_model=List[SafariDestinationSchema])
async def get_destinations(
    destination: Optional[str] = Query(None),
    trip_type: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(models.SafariDestination)

    if destination:
        query = query.where(
            or_(
                models.SafariDestination.location_tag.ilike(f"%{destination}%"),
                models.SafariDestination.title.ilike(f"%{destination}%"),
            )
        )
    if trip_type:
        query = query.where(models.SafariDestination.type.ilike(f"%{trip_type}%"))

    result = await db.execute(query.order_by(models.SafariDestination.id))

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
            image=d.image,
        )
        for d in result.scalars().all()
    ]


@safari_router.get("/categories", response_model=List[WildlifeCategorySchema])
async def get_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.WildlifeCategory).order_by(models.WildlifeCategory.name))
    return [
        WildlifeCategorySchema(
            id=c.id,
            name=c.name,
            tripsCount=c.trips_count,
            image=c.image,
        )
        for c in result.scalars().all()
    ]


@safari_router.get("/experiences", response_model=List[SafariExperienceSchema])
async def get_experiences(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.SafariExperience).order_by(models.SafariExperience.id))
    return [
        SafariExperienceSchema(
            id=e.id,
            badge=e.badge,
            title=e.title,
            tag1=e.tag1,
            duration=e.duration,
            tag2=e.tag2,
            price=e.price,
            image=e.image,
        )
        for e in result.scalars().all()
    ]