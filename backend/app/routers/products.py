"""
Products router.

Handles product CRUD operations, search, and filtering.
Access control based on user roles.
"""

from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
import uuid
from datetime import datetime

from app.models.product import Product, ProductCreate, ProductUpdate, ProductList
from app.models.user import User
from app.routers.auth import get_current_user
from app.utils.db import get_collection

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create a new product (retailers and wholesalers only).
    
    Args:
        product_data: Product creation data
        current_user: Current authenticated user
        
    Returns:
        Product: Created product
        
    Raises:
        HTTPException: If user is not retailer or wholesaler
    """
    # Only retailers and wholesalers can create products
    if current_user.role not in ["retailer", "wholesaler"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only retailers and wholesalers can create products"
        )
    
    products_collection = get_collection("products")
    
    product_id = str(uuid.uuid4())
    new_product = {
        "_id": product_id,
        **product_data.model_dump(),
        "seller_id": current_user.id,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    await products_collection.insert_one(new_product)
    
    return Product(
        id=product_id,
        seller_id=current_user.id,
        **product_data.model_dump(),
        is_active=True,
        created_at=new_product["created_at"]
    )


@router.get("/", response_model=ProductList)
async def list_products(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100),
    category: Optional[str] = None,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """
    List products with pagination and filtering.
    
    Args:
        page: Page number (1-indexed)
        per_page: Items per page
        category: Optional category filter
        search: Optional search term
        current_user: Current authenticated user
        
    Returns:
        ProductList: Paginated list of products
    """
    products_collection = get_collection("products")
    
    # Build filter query
    query = {"is_active": True}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    # Get total count
    total = await products_collection.count_documents(query)
    
    # Get paginated results
    skip = (page - 1) * per_page
    cursor = products_collection.find(query).skip(skip).limit(per_page)
    products = await cursor.to_list(length=per_page)
    
    # Convert to response model
    product_list = [
        Product(
            id=str(p["_id"]),
            seller_id=p["seller_id"],
            name=p["name"],
            description=p["description"],
            category=p["category"],
            image_url=p.get("image_url"),
            stock_quantity=p["stock_quantity"],
            customer_price=p["customer_price"],
            retailer_price=p["retailer_price"],
            wholesaler_price=p["wholesaler_price"],
            is_active=p.get("is_active", True),
            created_at=p.get("created_at")
        )
        for p in products
    ]
    
    return ProductList(
        products=product_list,
        total=total,
        page=page,
        per_page=per_page
    )


@router.get("/{product_id}", response_model=Product)
async def get_product(
    product_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific product by ID.
    
    Args:
        product_id: Product ID
        current_user: Current authenticated user
        
    Returns:
        Product: Product details
        
    Raises:
        HTTPException: If product not found
    """
    products_collection = get_collection("products")
    
    product = await products_collection.find_one({"_id": product_id, "is_active": True})
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    return Product(
        id=str(product["_id"]),
        seller_id=product["seller_id"],
        name=product["name"],
        description=product["description"],
        category=product["category"],
        image_url=product.get("image_url"),
        stock_quantity=product["stock_quantity"],
        customer_price=product["customer_price"],
        retailer_price=product["retailer_price"],
        wholesaler_price=product["wholesaler_price"],
        is_active=product.get("is_active", True),
        created_at=product.get("created_at")
    )


@router.put("/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product_data: ProductUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Update a product (only by the seller).
    
    Args:
        product_id: Product ID
        product_data: Product update data
        current_user: Current authenticated user
        
    Returns:
        Product: Updated product
        
    Raises:
        HTTPException: If product not found or user is not the seller
    """
    products_collection = get_collection("products")
    
    # Check if product exists and user is the seller
    product = await products_collection.find_one({"_id": product_id})
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    if product["seller_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own products"
        )
    
    # Update product
    update_data = product_data.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await products_collection.update_one(
        {"_id": product_id},
        {"$set": update_data}
    )
    
    # Fetch updated product
    updated_product = await products_collection.find_one({"_id": product_id})
    
    return Product(
        id=str(updated_product["_id"]),
        seller_id=updated_product["seller_id"],
        name=updated_product["name"],
        description=updated_product["description"],
        category=updated_product["category"],
        image_url=updated_product.get("image_url"),
        stock_quantity=updated_product["stock_quantity"],
        customer_price=updated_product["customer_price"],
        retailer_price=updated_product["retailer_price"],
        wholesaler_price=updated_product["wholesaler_price"],
        is_active=updated_product.get("is_active", True),
        created_at=updated_product.get("created_at")
    )


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Delete (soft delete) a product (only by the seller).
    
    Args:
        product_id: Product ID
        current_user: Current authenticated user
        
    Raises:
        HTTPException: If product not found or user is not the seller
    """
    products_collection = get_collection("products")
    
    # Check if product exists and user is the seller
    product = await products_collection.find_one({"_id": product_id})
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    if product["seller_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own products"
        )
    
    # Soft delete
    await products_collection.update_one(
        {"_id": product_id},
        {"$set": {"is_active": False, "updated_at": datetime.utcnow()}}
    )
    
    return None
