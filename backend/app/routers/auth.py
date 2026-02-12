"""
Authentication router.

Handles user registration, login, and JWT token management.
Supports three user roles: customer, retailer, wholesaler.
"""

from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
from datetime import timedelta
import uuid

from app.models.user import UserCreate, UserLogin, User, Token, UserInDB
from app.utils.jwt_handler import (
    create_access_token,
    hash_password,
    verify_password,
    decode_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from app.utils.db import get_collection

router = APIRouter(prefix="/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """
    Dependency to get the current authenticated user from JWT token.
    
    Args:
        token: JWT token from Authorization header
        
    Returns:
        User: Current authenticated user
        
    Raises:
        HTTPException: If token is invalid or user not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_token(token)
    if payload is None:
        raise credentials_exception
    
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
    
    users_collection = get_collection("users")
    user = await users_collection.find_one({"email": email})
    
    if user is None:
        raise credentials_exception
    
    return User(
        id=str(user["_id"]),
        email=user["email"],
        full_name=user["full_name"],
        role=user["role"],
        is_active=user.get("is_active", True),
        created_at=user.get("created_at")
    )


@router.post("/signup", response_model=User, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    """
    Register a new user.
    
    Args:
        user_data: User registration data including email, password, role
        
    Returns:
        User: Created user (without password)
        
    Raises:
        HTTPException: If email already exists
    """
    users_collection = get_collection("users")
    
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = str(uuid.uuid4())
    new_user = {
        "_id": user_id,
        "email": user_data.email,
        "full_name": user_data.full_name,
        "role": user_data.role,
        "hashed_password": hash_password(user_data.password),
        "is_active": True,
        "created_at": None  # Will be set by default_factory in model
    }
    
    await users_collection.insert_one(new_user)
    
    return User(
        id=user_id,
        email=user_data.email,
        full_name=user_data.full_name,
        role=user_data.role,
        is_active=True,
        created_at=new_user.get("created_at")
    )


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate user and return JWT token.
    
    Args:
        form_data: OAuth2 form with username (email) and password
        
    Returns:
        Token: JWT access token
        
    Raises:
        HTTPException: If credentials are invalid
    """
    users_collection = get_collection("users")
    
    # Find user by email (username field in OAuth2)
    user = await users_collection.find_one({"email": form_data.username})
    
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]},
        expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=User)
async def get_me(current_user: User = Depends(get_current_user)):
    """
    Get current authenticated user profile.
    
    Args:
        current_user: Current user from JWT token
        
    Returns:
        User: Current user profile
    """
    return current_user


@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """
    Logout endpoint (client should discard token).
    
    Args:
        current_user: Current user from JWT token
        
    Returns:
        dict: Success message
    """
    return {"message": "Successfully logged out"}
