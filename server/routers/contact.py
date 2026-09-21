import os
import smtplib
from email.message import EmailMessage
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, status
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import contact as models
from schemas import contact as schemas

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)

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


@router.post("", status_code=status.HTTP_201_CREATED)
@router.post("/", status_code=status.HTTP_201_CREATED)
async def submit_contact_form(
    payload: schemas.ContactCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    try:
        # 1. Save to PostgreSQL database (Async await)
        db_message = models.ContactMessage(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message
        )
        db.add(db_message)
        await db.commit()
        await db.refresh(db_message)

        # 2. Trigger background email task
        background_tasks.add_task(
            send_contact_email,
            payload.name,
            payload.email,
            payload.subject,
            payload.message
        )

        return {"message": "Message sent successfully!"}

    except Exception as e:
        await db.rollback()
        print(f"Error submitting contact form: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit contact message: {str(e)}"
        )