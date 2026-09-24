from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.contact import ContactMessage
from schemas.contact import ContactCreate, ContactResponse

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_form(
    payload: ContactCreate, 
    db: Session = Depends(get_db)
):
    try:
        new_message = ContactMessage(
            name=payload.name,
            email=payload.email,
            phone=payload.phone,
            subject=payload.subject,
            message=payload.message
        )
        
        db.add(new_message)
        db.commit()
        db.refresh(new_message)

        return new_message

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit your message. Please try again later."
        )