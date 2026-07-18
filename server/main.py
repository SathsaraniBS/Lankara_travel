from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

from database import db

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