# LiveMART Backend API

FastAPI backend for the LiveMART e-commerce platform.

## Features

- **JWT Authentication**: Secure user authentication with role-based access
- **Three User Roles**: Customer, Retailer, Wholesaler
- **MongoDB Database**: Scalable NoSQL database for products, users, and orders
- **RESTful API**: Clean API endpoints for frontend integration

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=livemart
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

4. Run the server:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── routers/             # API route handlers
│   │   ├── auth.py          # Authentication endpoints
│   │   ├── products.py      # Product management
│   │   └── orders.py        # Order processing
│   ├── models/              # Database models
│   │   ├── user.py          # User model
│   │   ├── product.py       # Product model
│   │   └── order.py         # Order model
│   ├── schemas.py           # Pydantic schemas for validation
│   └── utils/               # Utility functions
│       ├── jwt_handler.py   # JWT token handling
│       └── db.py            # Database connection
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Deployment

Deploy to Render, Fly.io, or any platform supporting Python applications.
