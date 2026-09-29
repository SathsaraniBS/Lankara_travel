import os
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Form, UploadFile, File
from sqlalchemy.orm import Session

from database import get_db
from models.contact import ContactMessage
from schemas.contact import ContactResponse

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(
    name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    subject: str = Form(...),
    message: str = Form(...),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        # File එකක් Upload කර තිබේ නම් එය Save කිරීම
        file_path = None
        if file and file.filename:
            upload_dir = "static/uploads/contact"
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, file.filename)
            with open(file_path, "wb") as buffer:
                buffer.write(await file.read())

        new_message = ContactMessage(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message
        )
        
        db.add(new_message)
        db.commit()
        db.refresh(new_message)

        return new_message

    except Exception as e:
        db.rollback()
        print("DATABASE ERROR TRACEBACK:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )