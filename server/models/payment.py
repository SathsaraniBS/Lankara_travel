from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum
from database import Base


class PaymentStatus(str, enum.Enum):
    pending = "pending"
    succeeded = "succeeded"
    failed = "failed"
    refunded = "refunded"


class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False, unique=True)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="usd")
    stripe_payment_intent_id = Column(String, nullable=True)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.pending)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    booking = relationship("Booking", back_populates="payment")