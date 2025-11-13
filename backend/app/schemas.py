"""
Pydantic schemas for request/response validation.

This module consolidates all Pydantic models used for API validation.
Import models from individual model files to maintain clean organization.
"""

# User-related schemas
from app.models.user import (
    User,
    UserCreate,
    UserLogin,
    UserInDB,
    Token,
    TokenData
)

# Product-related schemas
from app.models.product import (
    Product,
    ProductCreate,
    ProductUpdate,
    ProductInDB,
    ProductList
)

# Order-related schemas
from app.models.order import (
    Order,
    OrderCreate,
    OrderUpdate,
    OrderInDB,
    OrderItem,
    OrderList
)

__all__ = [
    # User schemas
    "User",
    "UserCreate",
    "UserLogin",
    "UserInDB",
    "Token",
    "TokenData",
    
    # Product schemas
    "Product",
    "ProductCreate",
    "ProductUpdate",
    "ProductInDB",
    "ProductList",
    
    # Order schemas
    "Order",
    "OrderCreate",
    "OrderUpdate",
    "OrderInDB",
    "OrderItem",
    "OrderList",
]
