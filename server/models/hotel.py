from sqlalchemy import Column, String, Float, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from database import Base


class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    address = Column(String, nullable=True)
    price_per_night = Column(Float, nullable=False)
    rating = Column(Float, default=0.0)
    rooms_available = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    bookings = relationship("Booking", back_populates="hotel")