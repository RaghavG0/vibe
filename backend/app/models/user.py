"""
User model for database operations.

Represents users in the system with three possible roles:
Customer, Retailer, and Wholesaler.
"""

from typing import Optional, Literal
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserBase(BaseModel):
    """Base user model with common fields"""
    email: EmailStr
    full_name: str
    role: Literal["customer", "retailer", "wholesaler"]


class UserCreate(UserBase):
    """User model for creation (includes password)"""
    password: str


class UserInDB(UserBase):
    """User model as stored in database"""
    id: str = Field(alias="_id")
    hashed_password: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True


class User(UserBase):
    """User model for responses (excludes password)"""
    id: str
    is_active: bool = True
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    """User login credentials"""
    email: EmailStr
    password: str


class Token(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Data encoded in JWT token"""
    email: Optional[str] = None
    role: Optional[str] = None
