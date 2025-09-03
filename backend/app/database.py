from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define the database URL. SQLite is used for simplicity.
SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"

# Create the SQLAlchemy engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    # This argument is required for SQLite to allow it to be used in a multithreaded environment like FastAPI
    connect_args={"check_same_thread": False} 
)

# Create a session class that will be used to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class that our ORM models will inherit from
Base = declarative_base()

# --- This is the missing function ---
# This dependency creates a new database session for each request and closes it when done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()