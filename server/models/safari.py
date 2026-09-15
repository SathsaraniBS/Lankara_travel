from sqlalchemy import Column, Integer, String, Float
from database import Base

class SafariDestination(Base):
    __tablename__ = "safari_destinations"

    id = Column(Integer, primary_key=True, index=True)
    badge = Column(String, nullable=True)
    location_tag = Column(String, nullable=False)
    title = Column(String, nullable=False)
    type = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    season = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=False)


class WildlifeCategory(Base):
    __tablename__ = "wildlife_categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    trips_count = Column(String, nullable=False)
    image = Column(String, nullable=False)


class SafariExperience(Base):
    __tablename__ = "safari_experiences"

    id = Column(Integer, primary_key=True, index=True)
    badge = Column(String, nullable=False)
    title = Column(String, nullable=False)
    tag1 = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    tag2 = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=False)