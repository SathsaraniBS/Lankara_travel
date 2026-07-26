from sqlalchemy import Column, String, Float, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from database import Base

class Flight(Base):
    __tablename__ = "flights"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    airline = Column(String, nullable=False)
    departure_city = Column(String, nullable=False)
    destination_city = Column(String, nullable=False)
    departure_time = Column(DateTime, nullable=False)
    arrival_time = Column(DateTime, nullable=False)
    price = Column(Float, nullable=False)
    seats_available = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)