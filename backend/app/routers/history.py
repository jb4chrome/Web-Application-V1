from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, database, models
from .auth import get_current_user # Import the dependency to secure endpoints

router = APIRouter(prefix="/history", tags=["History"])

@router.post("/", response_model=schemas.History)
def create_history_entry(
    history: schemas.HistoryCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user) # Secure this endpoint
):
    # Create the history entry and link it to the current user
    db_history = models.EstimationHistory(**history.dict(), owner_id=current_user.id)
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history


@router.get("/", response_model=List[schemas.History])
def read_user_history(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user) # Secure this endpoint
):
    # Return only the history entries for the currently logged-in user
    return db.query(models.EstimationHistory).filter(models.EstimationHistory.owner_id == current_user.id).all()