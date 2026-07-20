from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bson import ObjectId
from pydantic import BaseModel

from database import db
from auth import hash_password, verify_password, create_access_token

app = FastAPI(title="Ceylon Compass API")

# Allow the Vite dev server (client) to call this API.
# Add your production frontend URL here too once you deploy.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Return errors as {"message": "..."} instead of FastAPI's default {"detail": "..."}
# so the frontend's `err.response?.data?.message` works without any frontend changes.
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code, content={"message": exc.detail})


def serialize_destination(doc: dict) -> dict:
    """Convert MongoDB's _id (ObjectId) to a plain string so FastAPI can return it as JSON."""
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc


@app.get("/")
async def root():
    return {"message": "Ceylon Compass API is running"}


@app.get("/destinations")
async def get_destinations():
    """Return all destinations from the 'destinations' collection."""
    destinations = []
    async for doc in db["destinations"].find():
        destinations.append(serialize_destination(doc))
    return destinations


@app.get("/destinations/{destination_id}")
async def get_destination(destination_id: str):
    """Return a single destination by its MongoDB _id."""
    doc = await db["destinations"].find_one({"_id": ObjectId(destination_id)})
    if doc is None:
        raise HTTPException(status_code=404, detail="Destination not found")
    return serialize_destination(doc)


# ── Auth ──────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


@app.post("/api/auth/register")
async def register(payload: RegisterRequest):
    existing = await db["users"].find_one({"email": payload.email})
    if existing:
        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists.",
        )

    if len(payload.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters.",
        )

    user_doc = {
        "name": payload.name,
        "email": payload.email,
        "password": hash_password(payload.password),
        "role": "user",
    }
    result = await db["users"].insert_one(user_doc)

    token = create_access_token({"sub": payload.email, "user_id": str(result.inserted_id)})

    user_response = {
        "id": str(result.inserted_id),
        "name": payload.name,
        "email": payload.email,
        "role": "user",
    }

    return {"token": token, "user": user_response}