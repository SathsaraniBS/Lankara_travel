import asyncio

from sqlalchemy import text

from database import engine

# database.py creates the engine with echo=True; silence the SQL logs for this script
engine.sync_engine.echo = False


async def main():
    async with engine.connect() as conn:
        tables = await conn.execute(
            text(
                "select table_name from information_schema.tables "
                "where table_schema = 'public' order by table_name"
            )
        )
        print("TABLES:", [row[0] for row in tables])

        columns = await conn.execute(
            text(
                "select column_name from information_schema.columns "
                "where table_schema = 'public' and table_name = 'contacts' "
                "order by ordinal_position"
            )
        )
        print("CONTACTS_COLUMNS:", [row[0] for row in columns])

        try:
            version = await conn.execute(text("select version_num from alembic_version"))
            print("ALEMBIC_VERSION:", [row[0] for row in version])
        except Exception as exc:
            print("ALEMBIC_VERSION: not available (", type(exc).__name__, ")")

    await engine.dispose()


asyncio.run(main())