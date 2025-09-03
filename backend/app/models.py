from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    history_entries = relationship("EstimationHistory", back_populates="owner")


class EstimationHistory(Base):
    __tablename__ = "estimation_history"

    id = Column(Integer, primary_key=True, index=True)
    total_area = Column(Float, index=True)
    build_quality = Column(String, index=True)
    estimated_cost = Column(Float, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="history_entries")