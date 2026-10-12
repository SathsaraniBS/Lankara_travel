import asyncio

from sqlalchemy import text

from database import engine

# silence the SQL logs for this script
engine.sync_engine.echo = False


async def main():
       async with engine.connect() as conn:
           result = await conn.execute(
               text("select count(*) from users where email = 'admin@lankaratravel.com'")
           )
           print("admin seed account exists:", result.scalar_one() > 0)
       await engine.dispose()


asyncio.run(main())