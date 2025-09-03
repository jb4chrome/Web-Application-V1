from pydantic import BaseModel
from typing import List, Optional

# --- History Schemas ---
class HistoryBase(BaseModel):
    total_area: float
    build_quality: str
    estimated_cost: float

class HistoryCreate(HistoryBase):
    pass

class History(HistoryBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True # Updated from orm_mode

# --- User Schemas ---
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    history_entries: List[History] = []

    class Config:
        from_attributes = True # Updated from orm_mode

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None