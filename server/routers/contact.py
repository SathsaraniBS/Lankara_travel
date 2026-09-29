from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.datastructures import UploadFile

from database import get_db  # adjust to your async session dependency
from models.contact import Contact
from schemas.contact import ContactCreate, ContactResponse
from services.contact_service import (
    enforce_rate_limit,
    save_attachment,
    send_contact_notification,
)

router = APIRouter(prefix="/api/contact", tags=["contact"])

FIELDS = ("name", "email", "phone", "subject", "message")


@router.post("/", response_model=ContactResponse, status_code=201)
async def submit_contact(
    request: Request,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    """
    Accepts the Contact Us form.
    - application/json          -> no attachment
    - multipart/form-data       -> optional `file` field
    """
    await enforce_rate_limit(request)

    content_type = request.headers.get("content-type", "")
    upload: UploadFile | None = None

    if content_type.startswith("multipart/form-data"):
        form = await request.form()
        raw = {k: form.get(k) for k in FIELDS}
        candidate = form.get("file")
        if isinstance(candidate, UploadFile) and candidate.filename:
            upload = candidate
    elif content_type.startswith("application/json"):
        try:
            raw = await request.json()
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid JSON body.")
        if not isinstance(raw, dict):
            raise HTTPException(status_code=400, detail="Invalid request body.")
    else:
        raise HTTPException(
            status_code=415,
            detail="Content-Type must be application/json or multipart/form-data.",
        )

    # Validate manually so we can return the same `detail` shape the frontend parses
    try:
        payload = ContactCreate.model_validate(raw)
    except ValidationError as exc:
        raise HTTPException(
            status_code=422,
            detail=[
                {"loc": list(e["loc"]), "msg": e["msg"]}
                for e in exc.errors(include_url=False, include_context=False)
            ],
        )

    attachment_name = attachment_path = None
    if upload:
        attachment_name, attachment_path = await save_attachment(upload)

    contact = Contact(
        name=payload.name,
        email=str(payload.email),
        phone=payload.phone,
        subject=payload.subject,
        message=payload.message,
        attachment_name=attachment_name,
        attachment_path=attachment_path,
    )
    db.add(contact)
    await db.commit()
    await db.refresh(contact)

    background_tasks.add_task(
        send_contact_notification,
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        subject=contact.subject,
        message=contact.message,
        attachment_path=attachment_path,
        attachment_name=attachment_name,
    )

    return ContactResponse(id=contact.id)