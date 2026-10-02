from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/planner", tags=["Trip Planner"])

@router.get("/overview")
def get_planner_overview():
    return {
        "districts": [...],
        "popularTrips": [...],
        "initialTripPlan": [...]
    }