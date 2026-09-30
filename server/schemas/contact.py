import uuid

from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=30)
    subject: str = Field(min_length=3, max_length=255)
    message: str = Field(min_length=5, max_length=5000)

    @field_validator("name", "subject", "message", mode="before")
    @classmethod
    def strip_text(cls, v):
        return v.strip() if isinstance(v, str) else v

    @field_validator("phone", mode="before")
    @classmethod
    def empty_phone_to_none(cls, v):
        # Frontend sends "" when the phone field is left blank
        if v is None:
            return None
        v = str(v).strip()
        return v or None


class ContactResponse(BaseModel):
    id: uuid.UUID
    message: str = "Thank you! Your message has been received."