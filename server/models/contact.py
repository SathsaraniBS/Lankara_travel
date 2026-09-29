import uuid
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class ContactMessage(Base):
    __tablename__ = "contacts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(50), nullable=False, server_default="unread", index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<ContactMessage(id={self.id}, email='{self.email}', subject='{self.subject}')>"