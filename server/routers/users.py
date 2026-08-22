# server/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter(prefix="/api/v1/users", tags=["Users"])

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

@router.get("/me")
async def get_current_user_profile():
    # TODO: Fetch current authenticated user via JWT dependency (e.g., current_user: User = Depends(get_current_user))
    return {
        "status": "success",
        "user": {
            "id": "usr_101",
            "full_name": "Kasun Perera",
            "email": "kasun@example.com",
            "phone": "+94 77 123 4567",
            "location": "Colombo, Sri Lanka",
        },
        "bookings": [
            {
                "id": "bk_001",
                "type": "Flight",
                "title": "Colombo (CMB) to Male (MLE)",
                "date": "2026-05-12",
                "status": "Confirmed",
                "amount": 320.00
            }
        ]
    }

@router.put("/me")
async def update_user_profile(profile_data: UserProfileUpdate):
    # TODO: Update user record in PostgreSQL database via SQLAlchemy session
    return {
        "status": "success",
        "message": "Profile updated successfully",
        "updated_fields": profile_data.dict(exclude_unset=True)
    }