from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/planner", tags=["Trip Planner"])

planner_data = {
    "districts": [
        {"id": "colombo", "name": "Colombo", "region": "Western Province", "image": "/images/colombo.jpg"},
        {"id": "kandy", "name": "Kandy", "region": "Central Province", "image": "/images/Kandy.jpg"},
        {"id": "sigiriya", "name": "Sigiriya", "region": "Central Province", "image": "/images/sigiriya.jpg"},
        {"id": "ella", "name": "Ella", "region": "Uva Province", "image": "/images/ella.jpg"},
        {"id": "galle", "name": "Galle", "region": "Southern Province", "image": "/images/unawatuna.jpg"}
    ],
    "popularTrips": [
        {"id": "t1", "title": "Cultural Triangle Tour", "location": "Sigiriya & Kandy", "duration": "4 Days", "image": "/images/sigiriya.jpg"},
        {"id": "t2", "title": "Hill Country Adventure", "location": "Ella", "duration": "3 Days", "image": "/images/ella.jpg"},
        {"id": "t3", "title": "Southern Beach Escape", "location": "Galle & Mirissa", "duration": "3 Days", "image": "/images/unawatuna.jpg"}
    ],
    "initialTripPlan": [
        {"day": 1, "activity": "Arrival and City Tour in Colombo"},
        {"day": 2, "activity": "Travel to Sigiriya Rock Fortress"},
        {"day": 3, "activity": "Explore Kandy Temple of the Tooth"},
        {"day": 4, "activity": "Scenic Train Ride to Ella"}
    ]
}

@router.get("")
@router.get("/")
def get_planner_root():
    """Handle requests directly to /api/v1/planner"""
    return planner_data

@router.get("/overview")
def get_planner_overview():
    """Handle requests to /api/v1/planner/overview"""
    return planner_data