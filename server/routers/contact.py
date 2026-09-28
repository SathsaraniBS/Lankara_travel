from fastapi import APIRouter, Depends, HTTPException, status, Form, UploadFile, File
from typing import Optional
from sqlalchemy.orm import Session
import os

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
    subject: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        # Handle optional file upload
        file_path_str = None
        if file and file.filename:
            upload_dir = "static/uploads/contacts"
            os.makedirs(upload_dir, exist_ok=True)
            saved_path = os.path.join(upload_dir, file.filename)
            
            with open(saved_path, "wb") as buffer:
                buffer.write(await file.read())
            
            file_path_str = f"/static/uploads/contacts/{file.filename}"

        # Create database entry
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
        print(f"Error saving contact message: {str(e)}")  
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit your message: {str(e)}"
        )