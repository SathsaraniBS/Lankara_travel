from typing import Optional
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/v1/destinations", tags=["destinations"])
root_router = APIRouter(tags=["destinations"])

# Comprehensive destination list for listing page
DESTINATION_LIST = [
    {
        "slug": "kandy",
        "name": "Kandy",
        "tagline": "A city of culture, history and natural beauty",
        "region": "Central Province",
        "heroImage": "/images/Kandy.jpg",
        "category": "Cultural Heritage",
    },
    {
        "slug": "sigiriya",
        "name": "Sigiriya",
        "tagline": "An Ancient Marvel in the Heart of Sri Lanka",
        "region": "Central Province",
        "heroImage": "/images/sigiriya.jpg",
        "category": "Ancient Rock Fortress",
    },
    {
        "slug": "ella",
        "name": "Ella",
        "tagline": "Mountains, Waterfalls and Endless Adventures",
        "region": "Uva Province",
        "heroImage": "/images/ella.jpg",
        "category": "Nature & Adventure",
    },
    {
        "slug": "colombo",
        "name": "Colombo",
        "tagline": "Where city life meets the Indian Ocean",
        "region": "Western Province",
        "heroImage": "/images/colombo.jpg",
        "category": "Coastal City",
    },
    {
        "slug": "nuwara-eliya",
        "name": "Nuwara Eliya",
        "tagline": "Where misty mountains and timeless charm meet",
        "region": "Central Province",
        "heroImage": "/images/ella.jpg",
        "category": "Tea Plantations",
    },
    {
        "slug": "mirissa",
        "name": "Mirissa",
        "tagline": "Golden beaches and whale watching vibes",
        "region": "Southern Province",
        "heroImage": "/images/unawatuna.jpg",
        "category": "Beaches & Surfing",
    },
]

# Detailed dictionary for dynamic [slug] pages matching frontend requirements
DESTINATION_DETAILS = {
    "kandy": {
        "slug": "kandy",
        "name": "Kandy",
        "tagline": "A city of culture, history and natural beauty",
        "description": "Nestled in the hills of central Sri Lanka, Kandy is a city where heritage, spirituality and nature come together in perfect harmony.",
        "heroImage": "/images/Kandy.jpg",
        "aboutImage": "/images/Kandy.jpg",
        "tags": ["Cultural Heritage", "Nature & Scenic Beauty", "Temples & Sacred Sites"],
        "quickInfo": {
            "bestTime": "Dec – Apr",
            "avgTemp": "20°C – 28°C",
            "travelTime": "3–4 hours from Colombo",
            "languages": "Sinhala, Tamil, English",
        },
        "stats": {
            "history": "500+ Years",
            "relicInfo": "Sacred Tooth Relic",
            "elevation": "500 m ASL",
        },
        "attractions": [
            {"name": "Temple of the Tooth Relic", "desc": "A sacred Buddhist temple with a rich history and cultural value.", "location": "Kandy", "image": "/images/Kandy.jpg"},
            {"name": "Kandy Lake", "desc": "A beautiful man-made lake in the heart of the city.", "location": "Kandy", "image": "/images/Kandy.jpg"},
            {"name": "Royal Botanical Gardens", "desc": "Home to over 4,000 species of plants and trees.", "location": "Peradeniya (5 km)", "image": "/images/ella.jpg"},
            {"name": "Arthur's Seat", "desc": "Enjoy breathtaking panoramic views of Kandy city.", "location": "Kandy", "image": "/images/sigiriya.jpg"},
        ],
        "itineraries": [
            {"title": "1 Day in Kandy", "subtitle": "Temple, Lake & City Tour", "daysText": "1 Day", "location": "Kandy", "image": "/images/Kandy.jpg"},
            {"title": "2 Days in Kandy", "subtitle": "Culture + Nature", "daysText": "2 Days", "location": "Kandy", "image": "/images/ella.jpg"},
            {"title": "3 Days in Kandy", "subtitle": "Kandy → Ella (Train Journey)", "daysText": "3 Days", "location": "Kandy – Ella", "image": "/images/unawatuna.jpg"},
        ],
        "popularActivities": [
            "Visit the Temple of the Tooth",
            "Explore Kandy Lake",
            "Take a scenic train ride",
            "Discover local cuisine",
            "Shop for traditional handicrafts",
        ],
        "travelTips": [
            "Dress modestly when visiting temples (cover shoulders and knees).",
            "Carry a light jacket (cooler in the evenings).",
            "Try local food like kottu, rice and curry.",
            "Use public transport or tuk-tuks for short distances.",
        ],
        "whyVisit": [
            "Rich cultural heritage and ancient kingdom history",
            "Breathtaking mountain views and lush greenery",
            "Vibrant street food culture and local markets",
        ],
    },
    "sigiriya": {
        "slug": "sigiriya",
        "name": "Sigiriya",
        "tagline": "An Ancient Marvel in the Heart of Sri Lanka",
        "description": "Explore the legendary rock fortress of Sigiriya, a UNESCO World Heritage Site known for its breathtaking views, ancient history and unique architecture.",
        "heroImage": "/images/sigiriya.jpg",
        "aboutImage": "/images/sigiriya.jpg",
        "tags": ["UNESCO Heritage", "Ancient Rock Fortress", "Stunning Views", "Nature & Wildlife"],
        "quickInfo": {
            "bestTime": "Jan – Apr",
            "avgTemp": "25°C – 32°C",
            "travelTime": "2–4 hours duration",
            "languages": "Sinhala, Tamil, English",
        },
        "stats": {
            "history": "5th Century",
            "relicInfo": "World Heritage Site",
            "elevation": "200 m Rock Height",
        },
        "attractions": [
            {"name": "Sigiriya Rock Fortress", "desc": "Climb the iconic rock and explore ancient palace ruins.", "location": "Sigiriya", "image": "/images/sigiriya.jpg"},
            {"name": "Frescoes", "desc": "Admire the world-famous ancient paintings.", "location": "Sigiriya", "image": "/images/sigiriya.jpg"},
            {"name": "Mirror Wall", "desc": "See the polished wall with ancient inscriptions.", "location": "Sigiriya", "image": "/images/sigiriya.jpg"},
            {"name": "Royal Gardens", "desc": "Beautiful gardens with water features and ruins.", "location": "Sigiriya", "image": "/images/sigiriya.jpg"},
        ],
        "itineraries": [
            {"title": "Day Trip to Sigiriya", "subtitle": "Sigiriya Climb & Tour", "daysText": "1 Day", "location": "Sigiriya", "image": "/images/sigiriya.jpg"},
            {"title": "Sigiriya & Dambulla", "subtitle": "Cave Temple + Rock Fortress", "daysText": "2 Days", "location": "Sigiriya • Dambulla", "image": "/images/Kandy.jpg"},
            {"title": "Cultural Triangle Tour", "subtitle": "Sigiriya • Polonnaruwa • Dambulla", "daysText": "3 Days", "location": "Cultural Triangle", "image": "/images/ella.jpg"},
        ],
        "popularActivities": [
            "Climb the Sigiriya Rock",
            "Explore the Ancient Frescoes",
            "Visit the Royal Gardens",
            "See the Mirror Wall",
            "Discover the Lion's Paw Staircase",
        ],
        "travelTips": [
            "Wear comfortable shoes for climbing.",
            "Bring water and a hat (it can be hot).",
            "Visit early in the morning for cooler weather.",
            "Respect the cultural and historical significance of the site.",
        ],
        "whyVisit": [
            "A UNESCO World Heritage Site with rich history",
            "Breathtaking panoramic views from the top",
            "Unique ancient art and architecture",
            "A must-visit for culture and nature lovers",
        ],
    },
    "ella": {
        "slug": "ella",
        "name": "Ella",
        "tagline": "Mountains, Waterfalls and Endless Adventures",
        "description": "Ella is a peaceful hill town in the heart of Sri Lanka's tea country, known for its breathtaking views, lush green landscapes, and relaxed atmosphere.",
        "heroImage": "/images/ella.jpg",
        "aboutImage": "/images/ella.jpg",
        "tags": ["Scenic Views & Hikes", "Waterfalls & Nature", "Iconic Railway", "Tea Plantations"],
        "quickInfo": {
            "bestTime": "Jan – Apr",
            "avgTemp": "12°C – 25°C",
            "travelTime": "6–7 hours from Colombo",
            "languages": "Sinhala, Tamil, English",
        },
        "stats": {
            "history": "Hill Capital",
            "relicInfo": "Nine Arch Bridge",
            "elevation": "1,041 m ASL",
        },
        "attractions": [
            {"name": "Nine Arch Bridge", "desc": "An iconic railway bridge surrounded by lush greenery.", "location": "Ella", "image": "/images/ella.jpg"},
            {"name": "Ravana Falls", "desc": "A beautiful waterfall with a legendary story.", "location": "Ella", "image": "/images/ella.jpg"},
            {"name": "Little Adam's Peak", "desc": "A short hike with stunning views of the valley.", "location": "Ella", "image": "/images/ella.jpg"},
            {"name": "Tea Plantations", "desc": "Explore the green tea estates and meet local people.", "location": "Ella", "image": "/images/ella.jpg"},
        ],
        "itineraries": [
            {"title": "1 Day in Ella", "subtitle": "Nine Arch Bridge & Peaks", "daysText": "1 Day", "location": "Ella", "image": "/images/ella.jpg"},
            {"title": "2 Days in Ella", "subtitle": "Hike + Waterfalls + Tea", "daysText": "2 Days", "location": "Ella", "image": "/images/ella.jpg"},
            {"title": "3 Days in Ella", "subtitle": "Adventure & Culture", "daysText": "3 Days", "location": "Ella", "image": "/images/ella.jpg"},
        ],
        "popularActivities": [
            "Hike Little Adam's Peak",
            "Visit Ravana Falls",
            "Take the Scenic Train Ride",
            "Explore Tea Plantations",
            "Enjoy Local Cafes & Food",
        ],
        "travelTips": [
            "Wear comfortable shoes for hiking.",
            "Carry a light jacket as evenings get chilly.",
            "Stay hydrated during long walks.",
            "Book train tickets well in advance.",
        ],
        "whyVisit": [
            "Breathtaking mountain views and scenic landscapes",
            "World-famous train journeys",
            "Relaxed village atmosphere and cozy cafes",
        ],
    },
    "colombo": {
        "slug": "colombo",
        "name": "Colombo",
        "tagline": "Where city life meets the Indian Ocean",
        "description": "Colombo, Sri Lanka's commercial capital, is a dynamic blend of modern city life and timeless heritage.",
        "heroImage": "/images/colombo.jpg",
        "aboutImage": "/images/colombo.jpg",
        "tags": ["Coastal City", "Culture & Heritage", "Food & Nightlife"],
        "quickInfo": {
            "bestTime": "Dec – Mar",
            "avgTemp": "30°C",
            "travelTime": "Capital Hub",
            "languages": "Sinhala, Tamil, English",
        },
        "stats": {
            "history": "200+ Years",
            "relicInfo": "Commercial Capital",
            "elevation": "Sea Level",
        },
        "attractions": [
            {"name": "Gangaramaya Temple", "desc": "A historic temple with a unique blend of architecture.", "location": "Colombo", "image": "/images/colombo.jpg"},
            {"name": "Galle Face Green", "desc": "Iconic oceanfront park for relaxing walks.", "location": "Colombo", "image": "/images/colombo.jpg"},
            {"name": "Colombo Lotus Tower", "desc": "Iconic tower with panoramic city views.", "location": "Colombo", "image": "/images/colombo.jpg"},
            {"name": "Pettah Market", "desc": "Vibrant local market life and street food.", "location": "Colombo", "image": "/images/colombo.jpg"},
        ],
        "itineraries": [
            {"title": "1 Day in Colombo", "subtitle": "City Highlights", "daysText": "1 Day", "location": "Colombo", "image": "/images/colombo.jpg"},
        ],
        "popularActivities": [
            "Visit Gangaramaya Temple",
            "Walk along Galle Face Green",
            "Ride to Lotus Tower",
            "Explore Pettah street food",
        ],
        "travelTips": [
            "Carry light clothing for tropical climate.",
            "Try local street food and fresh seafood.",
            "Use ride-hailing apps for convenience.",
        ],
        "whyVisit": [
            "Vibrant urban culture and dining",
            "Historic colonial architecture",
            "Sunset views by the Indian Ocean",
        ],
    },
}


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


@root_router.get("/destinations")
def list_destinations_root(category: Optional[str] = None):
    return _filter_by_category(category)