from sqlalchemy import Column, Integer, String, Float, ARRAY
from database import Base

class GroupTrip(Base):
    __tablename__ = "group_trips"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    tag = Column(String, nullable=False)
    location = Column(String, nullable=False, index=True)
    duration = Column(String, nullable=False)
    tags = Column(ARRAY(String), nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=False)
    trip_type = Column(String, nullable=True, index=True)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(String, primary_key=True, index=True)
    quote = Column(String, nullable=False)
    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    rating = Column(Integer, nullable=False, default=5)
    avatar = Column(String, nullable=False)