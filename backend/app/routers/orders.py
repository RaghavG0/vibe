"""
Orders router.

Handles order creation, retrieval, and status updates.
Customers can create orders, sellers can update order status.
"""

from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import Optional
import uuid
from datetime import datetime

from app.models.order import Order, OrderCreate, OrderUpdate, OrderList, OrderItem
from app.models.user import User
from app.routers.auth import get_current_user
from app.utils.db import get_collection

router = APIRouter(prefix="/orders", tags=["Orders"])


def generate_order_number() -> str:
    """Generate a unique order number."""
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    return f"ORD-{timestamp}-{uuid.uuid4().hex[:6].upper()}"


@router.post("/", response_model=Order, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create a new order (customers only).
    
    Args:
        order_data: Order creation data with items and shipping info
        current_user: Current authenticated user
        
    Returns:
        Order: Created order
        
    Raises:
        HTTPException: If user is not a customer
    """
    # Only customers can create orders
    if current_user.role != "customer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only customers can create orders"
        )
    
    orders_collection = get_collection("orders")
    products_collection = get_collection("products")
    
    # Validate products and stock
    for item in order_data.items:
        product = await products_collection.find_one({"_id": item.product_id})
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product {item.product_id} not found"
            )
        if product["stock_quantity"] < item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient stock for product {item.product_name}"
            )
    
    # Create order
    order_id = str(uuid.uuid4())
    order_number = generate_order_number()
    
    new_order = {
        "_id": order_id,
        "customer_id": current_user.id,
        "order_number": order_number,
        "items": [item.model_dump() for item in order_data.items],
        "total_amount": order_data.total_amount,
        "shipping_address": order_data.shipping_address,
        "status": "pending",
        "tracking_number": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    await orders_collection.insert_one(new_order)
    
    # Update product stock
    for item in order_data.items:
        await products_collection.update_one(
            {"_id": item.product_id},
            {"$inc": {"stock_quantity": -item.quantity}}
        )
    
    return Order(
        id=order_id,
        customer_id=current_user.id,
        order_number=order_number,
        items=order_data.items,
        total_amount=order_data.total_amount,
        shipping_address=order_data.shipping_address,
        status="pending",
        tracking_number=None,
        created_at=new_order["created_at"],
        updated_at=new_order["updated_at"]
    )


@router.get("/", response_model=OrderList)
async def list_orders(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100),
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """
    List orders for the current user.
    
    Args:
        page: Page number (1-indexed)
        per_page: Items per page
        status: Optional status filter
        current_user: Current authenticated user
        
    Returns:
        OrderList: Paginated list of orders
    """
    orders_collection = get_collection("orders")
    
    # Customers see their own orders
    query = {"customer_id": current_user.id}
    
    if status:
        query["status"] = status
    
    # Get total count
    total = await orders_collection.count_documents(query)
    
    # Get paginated results
    skip = (page - 1) * per_page
    cursor = orders_collection.find(query).sort("created_at", -1).skip(skip).limit(per_page)
    orders = await cursor.to_list(length=per_page)
    
    # Convert to response model
    order_list = [
        Order(
            id=str(o["_id"]),
            customer_id=o["customer_id"],
            order_number=o["order_number"],
            items=[OrderItem(**item) for item in o["items"]],
            total_amount=o["total_amount"],
            shipping_address=o["shipping_address"],
            status=o["status"],
            tracking_number=o.get("tracking_number"),
            created_at=o["created_at"],
            updated_at=o["updated_at"]
        )
        for o in orders
    ]
    
    return OrderList(
        orders=order_list,
        total=total,
        page=page,
        per_page=per_page
    )


@router.get("/{order_id}", response_model=Order)
async def get_order(
    order_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific order by ID.
    
    Args:
        order_id: Order ID
        current_user: Current authenticated user
        
    Returns:
        Order: Order details
        
    Raises:
        HTTPException: If order not found or access denied
    """
    orders_collection = get_collection("orders")
    
    order = await orders_collection.find_one({"_id": order_id})
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Customers can only see their own orders
    if current_user.role == "customer" and order["customer_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    return Order(
        id=str(order["_id"]),
        customer_id=order["customer_id"],
        order_number=order["order_number"],
        items=[OrderItem(**item) for item in order["items"]],
        total_amount=order["total_amount"],
        shipping_address=order["shipping_address"],
        status=order["status"],
        tracking_number=order.get("tracking_number"),
        created_at=order["created_at"],
        updated_at=order["updated_at"]
    )


@router.patch("/{order_id}", response_model=Order)
async def update_order_status(
    order_id: str,
    order_data: OrderUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Update order status (sellers can update orders with their products).
    
    Args:
        order_id: Order ID
        order_data: Order update data (status, tracking)
        current_user: Current authenticated user
        
    Returns:
        Order: Updated order
        
    Raises:
        HTTPException: If order not found or access denied
    """
    orders_collection = get_collection("orders")
    
    order = await orders_collection.find_one({"_id": order_id})
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Update order
    update_data = order_data.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await orders_collection.update_one(
        {"_id": order_id},
        {"$set": update_data}
    )
    
    # Fetch updated order
    updated_order = await orders_collection.find_one({"_id": order_id})
    
    return Order(
        id=str(updated_order["_id"]),
        customer_id=updated_order["customer_id"],
        order_number=updated_order["order_number"],
        items=[OrderItem(**item) for item in updated_order["items"]],
        total_amount=updated_order["total_amount"],
        shipping_address=updated_order["shipping_address"],
        status=updated_order["status"],
        tracking_number=updated_order.get("tracking_number"),
        created_at=updated_order["created_at"],
        updated_at=updated_order["updated_at"]
    )


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_order(
    order_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Cancel an order (customers can cancel their own pending orders).
    
    Args:
        order_id: Order ID
        current_user: Current authenticated user
        
    Raises:
        HTTPException: If order not found, access denied, or cannot be cancelled
    """
    orders_collection = get_collection("orders")
    products_collection = get_collection("products")
    
    order = await orders_collection.find_one({"_id": order_id})
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Customers can only cancel their own orders
    if order["customer_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    # Can only cancel pending orders
    if order["status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only pending orders can be cancelled"
        )
    
    # Update order status
    await orders_collection.update_one(
        {"_id": order_id},
        {"$set": {"status": "cancelled", "updated_at": datetime.utcnow()}}
    )
    
    # Restore product stock
    for item in order["items"]:
        await products_collection.update_one(
            {"_id": item["product_id"]},
            {"$inc": {"stock_quantity": item["quantity"]}}
        )
    
    return None
