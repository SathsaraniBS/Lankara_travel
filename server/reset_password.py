"""
Reset a user's password from the command line (development / admin utility).

Run it from the server folder:

    python reset_password.py <email>          set a new password directly
    python reset_password.py <email> --link   print a reset link for the web page

The checks match the /reset-password page: the two passwords must be equal and
at least 8 characters long. Passwords are typed hidden and are never printed.
"""

import argparse
import asyncio
import getpass
import os
import sys

from sqlalchemy import func, select

from auth import RESET_TOKEN_EXPIRE_MINUTES, create_reset_token, hash_password
from database import AsyncSessionLocal, engine
from models.user import User

# database.py creates the engine with echo=True; silence the SQL logs here
engine.sync_engine.echo = False

MIN_LENGTH = 8  # same rule as the reset-password page
MAX_BYTES = 72  # bcrypt ignores everything after 72 bytes
ADMIN_RECOMMENDED_LENGTH = 12

# auth.py / database.py already loaded server/.env at import time
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")


async def find_user(db, email: str) -> User | None:
    result = await db.execute(
        select(User).where(func.lower(User.email) == email.lower())
    )
    return result.scalars().first()


def ask_new_password(email: str) -> str | None:
    password = getpass.getpass(f"New password for {email}: ")
    confirm = getpass.getpass("Repeat the password: ")

    if password != confirm:
        print("Passwords do not match. Nothing was changed.")
        return None

    if len(password) < MIN_LENGTH:
        print(f"Password must be at least {MIN_LENGTH} characters. Nothing was changed.")
        return None

    if len(password.encode("utf-8")) > MAX_BYTES:
        print(f"Password must be at most {MAX_BYTES} bytes. Nothing was changed.")
        return None

    return password


async def run(email: str, link_only: bool) -> int:
    try:
        async with AsyncSessionLocal() as db:
            user = await find_user(db, email)
            if user is None:
                print(f"No user found with email {email}. Nothing was changed.")
                return 1

            if link_only:
                token = create_reset_token(str(user.id))
                print(f"Reset link for {user.email} (valid {RESET_TOKEN_EXPIRE_MINUTES} minutes):")
                print(f"   {FRONTEND_URL}/reset-password?token={token}")
                print("Open it in your browser. Anyone with this link can set the password, so do not share it.")
                return 0

            password = ask_new_password(user.email)
            if password is None:
                return 1

            if user.is_admin and len(password) < ADMIN_RECOMMENDED_LENGTH:
                print(
                    f"Tip: admin accounts should use at least "
                    f"{ADMIN_RECOMMENDED_LENGTH} characters."
                )

            user.hashed_password = hash_password(password)
            await db.commit()

            print(f"Password updated for {user.email}.")
            return 0
    finally:
        await engine.dispose()


def main() -> None:
    parser = argparse.ArgumentParser(description="Reset a user's password.")
    parser.add_argument("email", help="email address of the account")
    parser.add_argument(
        "--link",
        action="store_true",
        help="print a reset link for the /reset-password page instead of setting the password here",
    )
    args = parser.parse_args()
    sys.exit(asyncio.run(run(args.email.strip(), args.link)))


if __name__ == "__main__":
    main()