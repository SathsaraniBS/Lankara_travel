from typing import Optional, List
from datetime import datetime
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from pydantic import BaseModel, ConfigDict

from database import get_db
from models.flight import Flight

router = APIRouter(prefix="/api/flights", tags=["Flights"])


# ============================================================
# Pydantic Schemas
# ============================================================
class FlightResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    airline: str
    flight_number: str
    departure_city: str
    destination_city: str
    departure_time: datetime
    arrival_time: datetime
    price: float
    seats_available: int


class FlightListResponse(BaseModel):
    total: int
    page: int
    page_size: int
    results: List[FlightResponse]


# ============================================================
# Routes
# ============================================================

@router.get("/", response_model=FlightListResponse)
async def search_flights(
    departure_city: Optional[str] = Query(None, description="Departure city name"),
    destination_city: Optional[str] = Query(None, description="Destination city name"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price"),
    departure_date: Optional[str] = Query(None, description="Filter by date (YYYY-MM-DD)"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Results per page"),
    db: AsyncSession = Depends(get_db),
):
    
    conditions = []

    if departure_city:
        conditions.append(Flight.departure_city.ilike(f"%{departure_city}%"))
    if destination_city:
        conditions.append(Flight.destination_city.ilike(f"%{destination_city}%"))
    if min_price is not None:
        conditions.append(Flight.price >= min_price)
    if max_price is not None:
        conditions.append(Flight.price <= max_price)
    if departure_date:
        try:
            date_obj = datetime.strptime(departure_date, "%Y-%m-%d").date()
            conditions.append(
                Flight.departure_time >= datetime.combine(date_obj, datetime.min.time())
            )
            conditions.append(
                Flight.departure_time < datetime.combine(date_obj, datetime.max.time())
            )
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid date format. Use YYYY-MM-DD",
            )

    # Total count query
    count_query = select(Flight)
    if conditions:
        count_query = count_query.where(and_(*conditions))
    count_result = await db.execute(count_query)
    total = len(count_result.scalars().all())

    # Paginated results query
    query = select(Flight)
    if conditions:
        query = query.where(and_(*conditions))
    query = query.order_by(Flight.departure_time).offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(query)
    flights = result.scalars().all()

    return FlightListResponse(
        total=total,
        page=page,
        page_size=page_size,
        results=[FlightResponse.model_validate(f) for f in flights],
    )


@router.get("/{flight_id}", response_model=FlightResponse)
async def get_flight(flight_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Flight).where(Flight.id == flight_id))
    flight = result.scalar_one_or_none()

    if not flight:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Flight not found")

    return flight


@router.get("/cities/list", response_model=List[str])
async def get_available_cities(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Flight.departure_city, Flight.destination_city))
    rows = result.all()

    cities = set()
    for departure, destination in rows:
        cities.add(departure)
        cities.add(destination)

    return sorted(cities)