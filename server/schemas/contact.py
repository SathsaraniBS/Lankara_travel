from pydantic import BaseModel, EmailStr

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    message: str