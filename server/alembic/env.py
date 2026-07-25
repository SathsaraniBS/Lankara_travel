import os
from dotenv import load_dotenv
from database import Base
from models.user import User  

load_dotenv()

config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL"))
target_metadata = Base.metadata