from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from uuid import UUID

# User snippet schema for nested author/reviewer data
class UserBasicInfo(BaseModel):
    id: UUID
    full_name: str
    country: Optional[str] = "Sri Lanka"
    avatar_url: Optional[str] = None

    class Config:
        from_attributes = True

# --- REVIEW SCHEMAS ---
class ReviewCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    comment: str
    location_name: Optional[str] = None
    image_url: Optional[str] = None

class ReviewResponse(BaseModel):
    id: UUID
    rating: int
    comment: str
    location_name: Optional[str]
    image_url: Optional[str]
    created_at: datetime
    user: UserBasicInfo

    class Config:
        from_attributes = True

class RatingBreakdown(BaseModel):
    stars: int
    count: int
    percentage: str

class CommunityStats(BaseModel):
    total_travellers: int
    average_rating: float
    total_reviews: int
    total_photos_stories: int
    active_members: int
    breakdown: List[RatingBreakdown]

# --- STORY SCHEMAS ---
class StoryCreate(BaseModel):
    title: str
    excerpt: str
    content: Optional[str] = None
    category: str
    cover_image_url: Optional[str] = None

class StoryResponse(BaseModel):
    id: UUID
    title: str
    excerpt: str
    category: str
    cover_image_url: Optional[str]
    likes_count: int
    comments_count: int
    created_at: datetime
    author: UserBasicInfo
    is_liked_by_me: Optional[bool] = False

    class Config:
        from_attributes = True