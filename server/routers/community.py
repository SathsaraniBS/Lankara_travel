from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
import json

from database import get_db
from models.community import Review, Story, StoryLike
from schemas.community import (
    ReviewCreate, ReviewResponse, CommunityStats, 
    StoryCreate, StoryResponse, RatingBreakdown
)
from auth.dependencies import get_current_user  # JWT Auth handler
from redis_client import redis_client  # Redis instance

router = APIRouter(prefix="/api/v1/community", tags=["Community & Reviews"])


@router.get("/stats", response_model=CommunityStats)
def get_community_stats(db: Session = Depends(get_db)):
    """Fetch platform stats and star percentage breakdown with Redis caching."""
    cached_stats = redis_client.get("community_stats")
    if cached_stats:
        return json.loads(cached_stats)

    total_reviews = db.query(Review).count()
    avg_rating_res = db.query(func.avg(Review.rating)).scalar() or 4.8
    total_stories = db.query(Story).count()

    # Rating Breakdown Calculation
    breakdown = []
    for star in range(5, 0, -1):
        count = db.query(Review).filter(Review.rating == star).count()
        pct = f"{round((count / total_reviews * 100))}%" if total_reviews > 0 else "0%"
        breakdown.append({"stars": star, "count": count, "percentage": pct})

    stats_data = {
        "total_travellers": 12000 + total_reviews,
        "average_rating": round(float(avg_rating_res), 1),
        "total_reviews": total_reviews,
        "total_photos_stories": 8000 + total_stories,
        "active_members": 3000,
        "breakdown": breakdown
    }

    # Cache for 10 minutes
    redis_client.setex("community_stats", 600, json.dumps(stats_data))
    return stats_data


@router.get("/reviews", response_model=List[ReviewResponse])
def get_reviews(limit: int = 6, offset: int = 0, db: Session = Depends(get_db)):
    """Get latest reviews with reviewer information."""
    reviews = db.query(Review).order_by(Review.created_at.desc()).offset(offset).limit(limit).all()
    return reviews


@router.post("/reviews", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(
    review_data: ReviewCreate, 
    db: Session = Depends(get_db), 
    current_user=Depends(get_current_user)
):
    """Post a new review (Authenticated)."""
    new_review = Review(
        user_id=current_user.id,
        rating=review_data.rating,
        comment=review_data.comment,
        location_name=review_data.location_name,
        image_url=review_data.image_url
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    # Invalidate stats cache on new review
    redis_client.delete("community_stats")
    return new_review


@router.get("/stories", response_model=List[StoryResponse])
def get_stories(limit: int = 4, offset: int = 0, db: Session = Depends(get_db)):
    """Get community travel stories."""
    stories = db.query(Story).order_by(Story.created_at.desc()).offset(offset).limit(limit).all()
    return stories


@router.post("/stories/{story_id}/like")
def toggle_story_like(
    story_id: str, 
    db: Session = Depends(get_db), 
    current_user=Depends(get_current_user)
):
    """Like or unlike a travel story."""
    existing_like = db.query(StoryLike).filter(
        StoryLike.story_id == story_id, 
        StoryLike.user_id == current_user.id
    ).first()

    story = db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")

    if existing_like:
        db.delete(existing_like)
        story.likes_count = max(0, story.likes_count - 1)
        db.commit()
        return {"liked": False, "likes_count": story.likes_count}
    else:
        new_like = StoryLike(story_id=story_id, user_id=current_user.id)
        db.add(new_like)
        story.likes_count += 1
        db.commit()
        return {"liked": True, "likes_count": story.likes_count}