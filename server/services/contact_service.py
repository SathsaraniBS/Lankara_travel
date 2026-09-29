import asyncio
import logging
import os
import smtplib
import uuid
from email.message import EmailMessage
from pathlib import Path

import redis.asyncio as aioredis
from fastapi import HTTPException, Request
from starlette.datastructures import UploadFile

from app.config import settings  # needs the fields listed in the integration notes

logger = logging.getLogger(__name__)

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB (matches the frontend hint)
RATE_LIMIT_MAX = 5  # submissions ...
RATE_LIMIT_WINDOW = 60 * 60  # ... per hour, per IP

# extension -> magic-byte check (client-supplied content-type is never trusted)
ALLOWED_TYPES: dict[str, tuple[bytes, ...]] = {
    ".jpg": (b"\xff\xd8\xff",),
    ".jpeg": (b"\xff\xd8\xff",),
    ".png": (b"\x89PNG\r\n\x1a\n",),
    ".webp": (b"RIFF",),
    ".pdf": (b"%PDF",),
    ".docx": (b"PK\x03\x04",),
}

_redis: aioredis.Redis | None = None


def _get_redis() -> aioredis.Redis:
    global _redis
    if _redis is None:
        _redis = aioredis.from_url(settings.REDIS_URL, decode_responses=True)
    return _redis


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


async def enforce_rate_limit(request: Request) -> None:
    """Simple fixed-window limiter in Redis. Fails open if Redis is down."""
    key = f"contact:rl:{_client_ip(request)}"
    try:
        r = _get_redis()
        count = await r.incr(key)
        if count == 1:
            await r.expire(key, RATE_LIMIT_WINDOW)
    except Exception as exc:  # Redis unavailable -> don't block real users
        logger.warning("Contact rate limiter unavailable: %s", exc)
        return

    if count > RATE_LIMIT_MAX:
        raise HTTPException(
            status_code=429,
            detail="Too many messages sent. Please try again later.",
        )


async def save_attachment(upload: UploadFile) -> tuple[str, str]:
    """Validate and store an uploaded file. Returns (original_name, stored_path)."""
    original_name = os.path.basename(upload.filename or "attachment")[:255]
    ext = Path(original_name).suffix.lower()

    if ext not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Allowed: JPG, PNG, WEBP, PDF, DOCX.",
        )

    data = await upload.read(MAX_FILE_SIZE + 1)
    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File is too large (max 5MB).")
    if not any(data.startswith(sig) for sig in ALLOWED_TYPES[ext]):
        raise HTTPException(
            status_code=400, detail="File content does not match its extension."
        )

    upload_dir = Path(settings.UPLOAD_DIR) / "contact"
    upload_dir.mkdir(parents=True, exist_ok=True)
    stored = upload_dir / f"{uuid.uuid4().hex}{ext}"
    await asyncio.to_thread(stored.write_bytes, data)

    return original_name, str(stored)


def send_contact_notification(
    *,
    name: str,
    email: str,
    phone: str | None,
    subject: str,
    message: str,
    attachment_path: str | None = None,
    attachment_name: str | None = None,
) -> None:
    """Email the team about a new message. Runs as a FastAPI BackgroundTask."""
    if not (settings.SMTP_HOST and settings.CONTACT_NOTIFY_EMAIL):
        return  # notifications not configured

    try:
        msg = EmailMessage()
        clean_subject = " ".join(subject.split())  # no newlines -> no header injection
        msg["Subject"] = f"[Lankara Contact] {clean_subject}"
        msg["From"] = settings.SMTP_USER or settings.CONTACT_NOTIFY_EMAIL
        msg["To"] = settings.CONTACT_NOTIFY_EMAIL
        msg["Reply-To"] = email
        msg.set_content(
            f"New contact form message\n\n"
            f"Name:  {name}\n"
            f"Email: {email}\n"
            f"Phone: {phone or '-'}\n"
            f"Subject: {clean_subject}\n\n"
            f"{message}\n"
        )

        if attachment_path and Path(attachment_path).exists():
            data = Path(attachment_path).read_bytes()
            msg.add_attachment(
                data,
                maintype="application",
                subtype="octet-stream",
                filename=attachment_name or Path(attachment_path).name,
            )

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as smtp:
            smtp.starttls()
            if settings.SMTP_USER and settings.SMTP_PASSWORD:
                smtp.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            smtp.send_message(msg)
    except Exception:
        # Never let a mail failure affect the user's submission
        logger.exception("Failed to send contact notification email")