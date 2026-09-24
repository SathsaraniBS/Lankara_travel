from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from uuid import UUID

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=250)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    subject: str = Field(..., min_length=2, max_length=250)
    message: str = Field(..., min_length=5, max_length=5000)

class ContactResponse(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True