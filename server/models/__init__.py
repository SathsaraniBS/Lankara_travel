# Import every model here so that:
#  - relationship("Review") style string references always resolve
#  - Base.metadata knows every table (needed by Alembic autogenerate)
from models.user import User
from models.flight import Flight
from models.hotel import Hotel
from models.booking import Booking, BookingStatus
from models.payment import Payment, PaymentStatus
from models.community import Review, Story, StoryLike
from models.contact import Contact
from models.group_trip import GroupTrip, Testimonial
from models.road_trip import RoadTrip
from models.safari import SafariDestination, WildlifeCategory, SafariExperience