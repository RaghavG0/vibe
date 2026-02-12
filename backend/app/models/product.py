"""
Product model for database operations.

Represents products in the LiveMART system with pricing
that varies based on user role (customer/retailer/wholesaler).
"""

from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime


class ProductBase(BaseModel):
    """Base product model with common fields"""
    name: str
    description: str
    category: str
    image_url: Optional[str] = None
    stock_quantity: int = 0
    
    # Role-based pricing
    customer_price: float
    retailer_price: float
    wholesaler_price: float


class ProductCreate(ProductBase):
    """Product model for creation"""
    pass


class ProductUpdate(BaseModel):
    """Product model for updates (all fields optional)"""
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    stock_quantity: Optional[int] = None
    customer_price: Optional[float] = None
    retailer_price: Optional[float] = None
    wholesaler_price: Optional[float] = None


class ProductInDB(ProductBase):
    """Product model as stored in database"""
    id: str = Field(alias="_id")
    seller_id: str  # User ID of the seller (retailer/wholesaler)
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True


class Product(ProductBase):
    """Product model for responses"""
    id: str
    seller_id: str
    is_active: bool = True
    created_at: datetime
    
    class Config:
        from_attributes = True


class ProductList(BaseModel):
    """Response model for product listings"""
    products: List[Product]
    total: int
    page: int
    per_page: int
