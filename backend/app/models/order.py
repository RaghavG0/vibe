"""
Order model for database operations.

Represents customer orders with items, pricing, and status tracking.
"""

from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime


class OrderItem(BaseModel):
    """Individual item in an order"""
    product_id: str
    product_name: str
    quantity: int
    unit_price: float
    total_price: float


class OrderBase(BaseModel):
    """Base order model"""
    items: List[OrderItem]
    total_amount: float
    shipping_address: str
    status: Literal["pending", "confirmed", "shipped", "delivered", "cancelled"] = "pending"


class OrderCreate(OrderBase):
    """Order model for creation"""
    pass


class OrderUpdate(BaseModel):
    """Order model for updates"""
    status: Optional[Literal["pending", "confirmed", "shipped", "delivered", "cancelled"]] = None
    tracking_number: Optional[str] = None


class OrderInDB(OrderBase):
    """Order model as stored in database"""
    id: str = Field(alias="_id")
    customer_id: str  # User ID of the customer
    order_number: str  # Unique order identifier
    tracking_number: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True


class Order(OrderBase):
    """Order model for responses"""
    id: str
    customer_id: str
    order_number: str
    tracking_number: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class OrderList(BaseModel):
    """Response model for order listings"""
    orders: List[Order]
    total: int
    page: int
    per_page: int
