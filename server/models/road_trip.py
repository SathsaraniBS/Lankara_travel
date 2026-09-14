from sqlalchemy import Column, String, Integer, ARRAY, DateTime
from sqlalchemy.sql import func
from database import Base

class RoadTrip(Base):
    __tablename__ = "road_trips"

    id = Column(String, primary_key=True, index=True)
    badge = Column(String, nullable=False)
    title = Column(String, nullable=False)
    tags = Column(ARRAY(String), nullable=False)
    duration = Column(String, nullable=False)
    distance = Column(String, nullable=False)
    image = Column(String, nullable=False)
    travel_style = Column(String, nullable=False, index=True)
    min_days = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())