"""
Lankara Travel - Seed Data Script (development only)

Run from the server folder:   python seed_data.py

Passwords are NEVER stored in this file. Put them in server/.env:
    SEED_ADMIN_PASSWORD=...   # creates the admin account (12+ characters)
    SEED_USER_PASSWORD=...    # creates the sample users (12+ characters)

The script is safe to run more than once: rows that already exist are skipped.
Do not run it against a production database.
"""

import asyncio
import os
from datetime import datetime, timedelta, timezone

from sqlalchemy import select

from auth import hash_password
from database import AsyncSessionLocal, engine
from models.flight import Flight
from models.hotel import Hotel
from models.user import User

# database.py is imported above, which also loads server/.env
engine.sync_engine.echo = False  # silence SQL logs for this script

MIN_PASSWORD_LENGTH = 12


# ============================================================
# Sample Users (passwords come from the environment)
# ============================================================
SAMPLE_USERS = [
    {
        "email": "kasun@example.com",
        "full_name": "Kasun Perera",
        "phone_number": "0771111111",
        "is_admin": False,
    },
    {
        "email": "nimali@example.com",
        "full_name": "Nimali Silva",
        "phone_number": "0772222222",
        "is_admin": False,
    },
    {
        "email": "admin@lankaratravel.com",
        "full_name": "Lankara Admin",
        "phone_number": "0773333333",
        "is_admin": True,
    },
]

# ============================================================
# Sample Flights (Sri Lanka routes + International)
# ============================================================
SAMPLE_FLIGHTS = [
    {
        "airline": "SriLankan Airlines",
        "flight_number": "UL225",
        "departure_city": "Colombo",
        "destination_city": "Dubai",
        "departure_offset_hours": 24,
        "duration_hours": 4.5,
        "price": 285.00,
        "seats_available": 45,
    },
    {
        "airline": "SriLankan Airlines",
        "flight_number": "UL503",
        "departure_city": "Colombo",
        "destination_city": "Singapore",
        "departure_offset_hours": 30,
        "duration_hours": 3.5,
        "price": 210.00,
        "seats_available": 32,
    },
    {
        "airline": "Emirates",
        "flight_number": "EK655",
        "departure_city": "Colombo",
        "destination_city": "London",
        "departure_offset_hours": 48,
        "duration_hours": 11.0,
        "price": 620.00,
        "seats_available": 18,
    },
    {
        "airline": "Qatar Airways",
        "flight_number": "QR661",
        "departure_city": "Colombo",
        "destination_city": "Doha",
        "departure_offset_hours": 36,
        "duration_hours": 4.0,
        "price": 340.00,
        "seats_available": 27,
    },
    {
        "airline": "FitsAir",
        "flight_number": "8D101",
        "departure_city": "Colombo",
        "destination_city": "Jaffna",
        "departure_offset_hours": 12,
        "duration_hours": 1.0,
        "price": 45.00,
        "seats_available": 60,
    },
    {
        "airline": "IndiGo",
        "flight_number": "6E1425",
        "departure_city": "Colombo",
        "destination_city": "Chennai",
        "departure_offset_hours": 20,
        "duration_hours": 1.5,
        "price": 95.00,
        "seats_available": 50,
    },
]

# ============================================================
# Sample Hotels (Sri Lanka destinations)
# ============================================================
SAMPLE_HOTELS = [
    {
        "name": "Cinnamon Grand Colombo",
        "city": "Colombo",
        "address": "77 Galle Road, Colombo 03",
        "price_per_night": 180.00,
        "rating": 4.7,
        "rooms_available": 25,
    },
    {
        "name": "Heritance Kandalama",
        "city": "Dambulla",
        "address": "Kandalama, Dambulla",
        "price_per_night": 220.00,
        "rating": 4.8,
        "rooms_available": 15,
    },
    {
        "name": "Jetwing Lighthouse",
        "city": "Galle",
        "address": "Dadella, Galle",
        "price_per_night": 195.00,
        "rating": 4.6,
        "rooms_available": 20,
    },
    {
        "name": "Amari Galle",
        "city": "Galle",
        "address": "No 25, Closenburg Rd, Galle",
        "price_per_night": 150.00,
        "rating": 4.4,
        "rooms_available": 30,
    },
    {
        "name": "Cinnamon Wild Yala",
        "city": "Yala",
        "address": "Yala National Park",
        "price_per_night": 175.00,
        "rating": 4.5,
        "rooms_available": 18,
    },
    {
        "name": "Kandy City Hotel",
        "city": "Kandy",
        "address": "5 Saranankara Road, Kandy",
        "price_per_night": 85.00,
        "rating": 4.1,
        "rooms_available": 40,
    },
]


def _utc_now() -> datetime:
    # The columns are timezone-naive DateTime, so store naive UTC values
    return datetime.now(timezone.utc).replace(tzinfo=None)


def _password_for(user_data: dict) -> str | None:
    env_name = "SEED_ADMIN_PASSWORD" if user_data["is_admin"] else "SEED_USER_PASSWORD"
    password = os.getenv(env_name)
    if not password:
        print(f"   - skipped {user_data['email']}: {env_name} is not set in server/.env")
        return None
    if len(password) < MIN_PASSWORD_LENGTH:
        print(
            f"   - skipped {user_data['email']}: {env_name} must be at least "
            f"{MIN_PASSWORD_LENGTH} characters"
        )
        return None
    return password


async def seed_users(db) -> None:
    print("Seeding users...")
    created = 0
    for user_data in SAMPLE_USERS:
        existing = await db.execute(select(User.id).where(User.email == user_data["email"]))
        if existing.scalar_one_or_none() is not None:
            print(f"   - exists, left unchanged: {user_data['email']}")
            continue

        password = _password_for(user_data)
        if password is None:
            continue

        db.add(
            User(
                email=user_data["email"],
                hashed_password=hash_password(password),
                full_name=user_data["full_name"],
                phone_number=user_data["phone_number"],
                is_admin=user_data["is_admin"],
            )
        )
        created += 1

    await db.commit()
    print(f"   {created} user(s) created")


async def seed_flights(db) -> None:
    print("Seeding flights...")
    now = _utc_now()
    created = 0
    for flight_data in SAMPLE_FLIGHTS:
        existing = await db.execute(
            select(Flight.id).where(Flight.flight_number == flight_data["flight_number"])
        )
        if existing.scalars().first() is not None:
            continue

        departure_time = now + timedelta(hours=flight_data["departure_offset_hours"])
        arrival_time = departure_time + timedelta(hours=flight_data["duration_hours"])

        db.add(
            Flight(
                airline=flight_data["airline"],
                flight_number=flight_data["flight_number"],
                departure_city=flight_data["departure_city"],
                destination_city=flight_data["destination_city"],
                departure_time=departure_time,
                arrival_time=arrival_time,
                price=flight_data["price"],
                seats_available=flight_data["seats_available"],
            )
        )
        created += 1

    await db.commit()
    print(f"   {created} flight(s) created")


async def seed_hotels(db) -> None:
    print("Seeding hotels...")
    created = 0
    for hotel_data in SAMPLE_HOTELS:
        existing = await db.execute(select(Hotel.id).where(Hotel.name == hotel_data["name"]))
        if existing.scalars().first() is not None:
            continue

        db.add(
            Hotel(
                name=hotel_data["name"],
                city=hotel_data["city"],
                address=hotel_data["address"],
                price_per_night=hotel_data["price_per_night"],
                rating=hotel_data["rating"],
                rooms_available=hotel_data["rooms_available"],
            )
        )
        created += 1

    await db.commit()
    print(f"   {created} hotel(s) created")


async def main() -> None:
    print("=" * 50)
    print("  Lankara Travel - Database Seeding (development only)")
    print("=" * 50)

    async with AsyncSessionLocal() as db:
        await seed_users(db)
        await seed_flights(db)
        await seed_hotels(db)

    await engine.dispose()

    print("=" * 50)
    print("  Seeding complete")
    print("=" * 50)


if __name__ == "__main__":
    asyncio.run(main())