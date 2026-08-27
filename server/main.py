# server/main.py
import os
from typing import Optional
from fastapi import FastAPI, Form, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from auth import router as auth_router
from routers.flights import router as flights_router
from routers.hotels import router as hotels_router
from routers.bookings import router as bookings_router
from routers.payments import router as payments_router

app = FastAPI(
    title="Lankara Travel API",
    description="Backend API for Lankara Travel - Flight, Hotel, Package & Review Platform",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists & mount static files route
os.makedirs("static/uploads/reviews", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include Application Routers
app.include_router(auth_router)
app.include_router(flights_router)
app.include_router(hotels_router)
app.include_router(bookings_router)
app.include_router(payments_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Lankara Travel API"}


# Review Submission Endpoint
@app.post("/api/v1/reviews", status_code=status.HTTP_201_CREATED)
async def create_review(
    name: str = Form(...),
    location: str = Form(...),
    rating: int = Form(...),
    quote: str = Form(...),
    destination_id: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None)
):
    try:
        image_url = None

        # Handle optional image upload
        if image:
            upload_dir = "static/uploads/reviews"
            file_path = os.path.join(upload_dir, image.filename)
            
            with open(file_path, "wb") as buffer:
                buffer.write(await image.read())

            image_url = f"/static/uploads/reviews/{image.filename}"

        # TODO: Insert review data into PostgreSQL via SQLAlchemy session
        # review = Review(
        #     name=name,
        #     location=location,
        #     rating=rating,
        #     quote=quote,
        #     destination_id=destination_id,
        #     image_url=image_url
        # )
        # db.add(review)
        # db.commit()

        return {
            "status": "success",
            "message": "Review submitted successfully",
            "data": {
                "name": name,
                "location": location,
                "rating": rating,
                "quote": quote,
                "destination_id": destination_id,
                "image_url": image_url
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while saving the review: {str(e)}"
        )