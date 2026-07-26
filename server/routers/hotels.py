from typing import Optional, List
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from pydantic import BaseModel, ConfigDict

from database import get_db
from models.hotel import Hotel

router = APIRouter(prefix="/api/hotels", tags=["Hotels"])


# ============================================================
# Pydantic Schemas
# ============================================================
class HotelResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    city: str
    address: Optional[str] = None
    price_per_night: float
    rating: float
    rooms_available: int


class HotelListResponse(BaseModel):
    total: int
    page: int
    page_size: int
    results: List[HotelResponse]


# ============================================================
# Routes
# ============================================================

@router.get("/", response_model=HotelListResponse)
async def search_hotels(
    city: Optional[str] = Query(None, description="City name"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price per night"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price per night"),
    min_rating: Optional[float] = Query(None, ge=0, le=5, description="Minimum rating"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Results per page"),
    db: AsyncSession = Depends(get_db),
):
    
    conditions = []

    if city:
        conditions.append(Hotel.city.ilike(f"%{city}%"))
    if min_price is not None:
        conditions.append(Hotel.price_per_night >= min_price)
    if max_price is not None:
        conditions.append(Hotel.price_per_night <= max_price)
    if min_rating is not None:
        conditions.append(Hotel.rating >= min_rating)

    # Total count query
    count_query = select(Hotel)
    if conditions:
        count_query = count_query.where(and_(*conditions))
    count_result = await db.execute(count_query)
    total = len(count_result.scalars().all())

    # Paginated results query
    query = select(Hotel)
    if conditions:
        query = query.where(and_(*conditions))
    query = query.order_by(Hotel.rating.desc()).offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(query)
    hotels = result.scalars().all()

    return HotelListResponse(
        total=total,
        page=page,
        page_size=page_size,
        results=[HotelResponse.model_validate(h) for h in hotels],
    )


@router.get("/{hotel_id}", response_model=HotelResponse)
async def get_hotel(hotel_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Hotel).where(Hotel.id == hotel_id))
    hotel = result.scalar_one_or_none()

    if not hotel:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hotel not found")

    return hotel


@router.get("/cities/list", response_model=List[str])
async def get_available_cities(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Hotel.city))
    cities = {row[0] for row in result.all()}
    return sorted(cities)