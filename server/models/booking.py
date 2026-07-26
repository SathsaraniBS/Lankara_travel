from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum
from database import Base


class BookingStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    cancelled = "cancelled"


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    flight_id = Column(UUID(as_uuid=True), ForeignKey("flights.id"), nullable=True)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id"), nullable=True)
    status = Column(Enum(BookingStatus), default=BookingStatus.pending)
    total_amount = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="bookings")
    flight = relationship("Flight", back_populates="bookings")
    hotel = relationship("Hotel", back_populates="bookings")
    payment = relationship("Payment", back_populates="booking", uselist=False, cascade="all, delete-orphan")