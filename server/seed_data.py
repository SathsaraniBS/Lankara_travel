"""
Lankara Travel - Seed Data Script
Sample flights, hotels, and test users database insert .

Run: python seed_data.py
"""

import asyncio
from datetime import datetime, timedelta

from database import AsyncSessionLocal
from models.user import User
from models.flight import Flight
from models.hotel import Hotel
from auth import hash_password


# ============================================================
# Sample Users
# ============================================================
SAMPLE_USERS = [
    {
        "email": "kasun@example.com",
        "password": "password123",
        "full_name": "Kasun Perera",
        "phone_number": "0771111111",
        "is_admin": False,
    },
    {
        "email": "nimali@example.com",
        "password": "password123",
        "full_name": "Nimali Silva",
        "phone_number": "0772222222",
        "is_admin": False,
    },
    {
        "email": "admin@lankaratravel.com",
        "password": "Ladmin#2?/56",
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


async def seed_users(db):
    print("🌱 Seeding users...")
    for user_data in SAMPLE_USERS:
        new_user = User(
            email=user_data["email"],
            hashed_password=hash_password(user_data["password"]),
            full_name=user_data["full_name"],
            phone_number=user_data["phone_number"],
            is_admin=user_data["is_admin"],
        )
        db.add(new_user)
    await db.commit()
    print(f"   ✅ {len(SAMPLE_USERS)} users created")


async def seed_flights(db):
    print("🌱 Seeding flights...")
    now = datetime.utcnow()
    for flight_data in SAMPLE_FLIGHTS:
        departure_time = now + timedelta(hours=flight_data["departure_offset_hours"])
        arrival_time = departure_time + timedelta(hours=flight_data["duration_hours"])

        new_flight = Flight(
            airline=flight_data["airline"],
            flight_number=flight_data["flight_number"],
            departure_city=flight_data["departure_city"],
            destination_city=flight_data["destination_city"],
            departure_time=departure_time,
            arrival_time=arrival_time,
            price=flight_data["price"],
            seats_available=flight_data["seats_available"],
        )
        db.add(new_flight)
    await db.commit()
    print(f"   ✅ {len(SAMPLE_FLIGHTS)} flights created")


async def seed_hotels(db):
    print("🌱 Seeding hotels...")
    for hotel_data in SAMPLE_HOTELS:
        new_hotel = Hotel(
            name=hotel_data["name"],
            city=hotel_data["city"],
            address=hotel_data["address"],
            price_per_night=hotel_data["price_per_night"],
            rating=hotel_data["rating"],
            rooms_available=hotel_data["rooms_available"],
        )
        db.add(new_hotel)
    await db.commit()
    print(f"   ✅ {len(SAMPLE_HOTELS)} hotels created")


async def main():
    print("=" * 50)
    print("  Lankara Travel - Database Seeding")
    print("=" * 50)

    async with AsyncSessionLocal() as db:
        await seed_users(db)
        await seed_flights(db)
        await seed_hotels(db)

    print("=" * 50)
    print("  ✅ Seeding complete!")
    print("=" * 50)
    print("\n📋 Test Login Credentials:")
    print("   Email: kasun@example.com | Password: password123")
    print("   Email: admin@lankaratravel.com | Password: admin123456")


if __name__ == "__main__":
    asyncio.run(main())