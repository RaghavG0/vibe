"""
LiveMART Backend API - Main Application

FastAPI application for the LiveMART e-commerce platform.
Provides REST API endpoints for user authentication, product management,
and order processing with role-based access control.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routers import auth, products, orders
from app.utils.db import connect_to_mongo, close_mongo_connection


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Handles startup and shutdown events.
    """
    # Startup: Connect to database
    await connect_to_mongo()
    yield
    # Shutdown: Close database connection
    await close_mongo_connection()


# Initialize FastAPI application
app = FastAPI(
    title="LiveMART API",
    description="Backend API for LiveMART e-commerce platform",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "http://localhost:3001",
        "https://*.vercel.app",   # Vercel deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)


@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - API health check.
    
    Returns:
        dict: Welcome message and API status
    """
    return {
        "message": "Welcome to LiveMART API",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health", tags=["Root"])
async def health_check():
    """
    Health check endpoint for monitoring.
    
    Returns:
        dict: Health status
    """
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
