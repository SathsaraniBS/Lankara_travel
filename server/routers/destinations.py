from typing import Optional

from fastapi import APIRouter, HTTPException

from data.destinations_data import DESTINATION_LIST, DESTINATION_DETAILS

router = APIRouter(prefix="/api/v1/destinations", tags=["destinations"])
root_router = APIRouter(tags=["destinations"])


def _filter_by_category(category: Optional[str]):
    if not category:
        return DESTINATION_LIST
    return [d for d in DESTINATION_LIST if d["category"].lower() == category.lower()]


@router.get("")
@router.get("/")
def list_destinations(category: Optional[str] = None):
    return _filter_by_category(category)


@router.get("/{slug}")
def get_destination(slug: str):
    destination = DESTINATION_DETAILS.get(slug.lower())
    if destination is None:
        raise HTTPException(status_code=404, detail="Destination not found")
    return destination


# Legacy alias: GET /destinations
@root_router.get("/destinations")
def list_destinations_root(category: Optional[str] = None):
    return _filter_by_category(category)