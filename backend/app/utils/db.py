"""
Database connection and configuration for MongoDB.

This module handles the connection to MongoDB using Motor (async driver).
It provides database and collection access for the application.
"""

from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection settings
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "livemart")

# Global database client
client: Optional[AsyncIOMotorClient] = None


async def connect_to_mongo():
    """
    Establish connection to MongoDB.
    Called on application startup.
    """
    global client
    client = AsyncIOMotorClient(MONGODB_URL)
    print(f"Connected to MongoDB at {MONGODB_URL}")


async def close_mongo_connection():
    """
    Close MongoDB connection.
    Called on application shutdown.
    """
    global client
    if client:
        client.close()
        print("Closed MongoDB connection")


def get_database():
    """
    Get the database instance.
    
    Returns:
        AsyncIOMotorDatabase: MongoDB database instance
    """
    return client[DATABASE_NAME]


def get_collection(collection_name: str):
    """
    Get a specific collection from the database.
    
    Args:
        collection_name: Name of the collection to retrieve
        
    Returns:
        AsyncIOMotorCollection: MongoDB collection instance
    """
    db = get_database()
    return db[collection_name]
