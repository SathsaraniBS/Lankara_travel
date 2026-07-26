# server/test_connection.py
import asyncio
from database import engine

async def test():
    async with engine.connect() as conn:
        print("✅ Database connected successfully!")

asyncio.run(test())