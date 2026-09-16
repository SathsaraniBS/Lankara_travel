from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, status
from sqlalchemy.orm import Session
from database import get_db
import models.contact as models
import schemas.contact as schemas
import smtplib
from email.message import EmailMessage
import os

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)

# Optional helper function for background email sending
def send_contact_email(name: str, email: str, subject: str, message: str):
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 465))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    receiver_email = os.getenv("CONTACT_RECEIVER_EMAIL", "info@lankaratravel.com")

    if not smtp_user or not smtp_pass:
        print("SMTP credentials not set. Skipping email delivery.")
        return

    msg = EmailMessage()
    msg["Subject"] = f"[Contact Form] {subject}"
    msg["From"] = smtp_user
    msg["To"] = receiver_email
    msg["Reply-To"] = email
    msg.set_content(f"Name: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}")

    try:
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
    except Exception as e:
        print(f"Failed to send email: {e}")


@router.post("", response_model=schemas.ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_form(
    payload: schemas.ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    try:
        # 1. Save to PostgreSQL database
        db_message = models.ContactMessage(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message
        )
        db.add(db_message)
        db.commit()

        # 2. Trigger background email task (non-blocking)
        background_tasks.add_task(
            send_contact_email,
            payload.name,
            payload.email,
            payload.subject,
            payload.message
        )

        return {"message": "Message sent successfully!"}

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit contact message."
        )