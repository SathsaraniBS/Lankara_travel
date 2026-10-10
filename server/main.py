import os
import uuid
from typing import Optional
from fastapi import FastAPI, Form, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from auth import router as auth_router
from routers.flights import router as flights_router
from routers.hotels import router as hotels_router
from routers.bookings import router as bookings_router
from routers.payments import router as payments_router
from routers.road_trips import router as road_trips_router
from routers.safari import safari_router
from routers.group_trips import group_trips_router
from routers.contact import router as contact_router

app = FastAPI(
    title="Lankara Travel API",
    description="Backend API for Lankara Travel - Flight, Hotel, Package & Review Platform",
    version="1.0.0"
)

# CORS Configuration
# The Next.js app now calls this API from its own server (via /api/backend proxy),
# so browsers no longer hit FastAPI directly. These origins are only kept for
# local development tools (Swagger UI etc.).
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure static upload directory exists & mount static files route
REVIEW_UPLOAD_DIR = "static/uploads/reviews"
MAX_REVIEW_IMAGE_BYTES = 5 * 1024 * 1024  # 5 MB

os.makedirs(REVIEW_UPLOAD_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include Application Routers
app.include_router(auth_router)
app.include_router(flights_router)
app.include_router(hotels_router)
app.include_router(bookings_router)
app.include_router(payments_router)
app.include_router(road_trips_router)
app.include_router(safari_router)
app.include_router(group_trips_router)
app.include_router(contact_router)


@app.get("/")
async def root():
    return {"message": "Welcome to Lankara Travel API"}


def detect_image_extension(data: bytes) -> Optional[str]:
    """Identify the real image type from its first bytes.
    The client-supplied filename and content-type cannot be trusted."""
    if data.startswith(b"\xff\xd8\xff"):
        return ".jpg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return ".png"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return ".webp"
    return None


# Review Submission Endpoint
# NOTE: reviews are not persisted to the database yet - this only stores the
# optional image and echoes the payload back.
@app.post("/api/v1/reviews", status_code=status.HTTP_201_CREATED)
async def create_review(
    name: str = Form(..., min_length=1, max_length=100),
    location: str = Form(..., min_length=1, max_length=150),
    rating: int = Form(..., ge=1, le=5),
    quote: str = Form(..., min_length=1, max_length=2000),
    destination_id: Optional[str] = Form(None, max_length=100),
    image: Optional[UploadFile] = File(None),
):
    image_url = None

    # Handle optional image upload
    if image and image.filename:
        contents = await image.read(MAX_REVIEW_IMAGE_BYTES + 1)

        if len(contents) > MAX_REVIEW_IMAGE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="Image must be 5 MB or smaller",
            )

        extension = detect_image_extension(contents)
        if extension is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only JPEG, PNG or WebP images are allowed",
            )

        # Never use the client-supplied filename
        safe_filename = f"{uuid.uuid4().hex}{extension}"
        file_path = os.path.join(REVIEW_UPLOAD_DIR, safe_filename)

        try:
            with open(file_path, "wb") as buffer:
                buffer.write(contents)
        except OSError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Could not save the uploaded image",
            )

        image_url = f"/static/uploads/reviews/{safe_filename}"

    return {
        "status": "success",
        "message": "Review submitted successfully",
        "data": {
            "name": name,
            "location": location,
            "rating": rating,
            "quote": quote,
            "destination_id": destination_id,
            "image_url": image_url,
        },
    }