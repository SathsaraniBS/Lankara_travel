import os
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Form, UploadFile, File, Request
from sqlalchemy.orm import Session

from database import get_db
from models.contact import ContactMessage
from schemas.contact import ContactCreate, ContactResponse

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(
    request: Request,
    db: Session = Depends(get_db)
):
    try:
        content_type = request.headers.get("content-type", "")

        # Handle FormData (multipart/form-data)
        if "multipart/form-data" in content_type:
            form = await request.form()
            name = form.get("name")
            email = form.get("email")
            phone = form.get("phone")
            subject = form.get("subject")
            message = form.get("message")
            upload_file: Optional[UploadFile] = form.get("file")

            if upload_file and upload_file.filename:
                upload_dir = "static/uploads/contact"
                os.makedirs(upload_dir, exist_ok=True)
                file_path = os.path.join(upload_dir, upload_file.filename)
                with open(file_path, "wb") as buffer:
                    buffer.write(await upload_file.read())

        # Handle JSON Body (application/json)
        else:
            json_body = await request.json()
            contact_data = ContactCreate(**json_body)
            name = contact_data.name
            email = contact_data.email
            phone = contact_data.phone
            subject = contact_data.subject
            message = contact_data.message

        if not name or not email or not subject or not message:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Missing required fields."
            )

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

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        db.rollback()
        print("DATABASE ERROR TRACEBACK:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )