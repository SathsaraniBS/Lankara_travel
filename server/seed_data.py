import asyncio
from database import db

destinations = [
    {"name": "COLOMBO", "description": "Urban & Nightlife", "image": "/images/colombo.jpg"},
    {"name": "GALLE", "description": "Heritage & Beaches", "image": "/images/galle.jpg"},
    {"name": "KANDY", "description": "History & Culture", "image": "/images/Kandy.jpg"},
    {"name": "TRINCOMALEE", "description": "Nature & Adventure", "image": "/images/Trincomalee.jpg"},
    {"name": "Nuwara Eliya", "description": "Nature & Adventure", "image": "/images/nuwaraeliya.webp"},
    {"name": "Jaffna", "description": "Culture & Nature", "image": "/images/jaffna.jpg"},
    {"name": "Ella", "description": "Nature & Adventure", "image": "/images/ella.jpg"},
    {"name": "Sigiriya", "description": "History & Culture", "image": "/images/sigiriya.jpg"},
    {"name": "Anuradhapura", "description": "History & Culture", "image": "/images/anuradhapura.jpg"},
]


async def seed():
    collection = db["destinations"]

    # Avoid duplicate inserts if this script is run more than once.
    existing_count = await collection.count_documents({})
    if existing_count > 0:
        print(f"'destinations' collection already has {existing_count} documents. Skipping insert.")
        print("If you want to re-seed, delete the existing documents first (see note below).")
        return

    result = await collection.insert_many(destinations)
    print(f"Inserted {len(result.inserted_ids)} destinations successfully.")


if __name__ == "__main__":
    asyncio.run(seed())

# To clear the collection and re-seed from scratch, run this in a Python shell instead:
#   import asyncio
#   from database import db
#   asyncio.run(db["destinations"].delete_many({}))