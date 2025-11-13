# LiveMART Project - File Structure Overview

## 🎯 Complete Directory Tree

```
LiveMART/
├── README.md                           # Main project documentation
├── .gitignore                          # Git ignore rules (includes Python & Node)
│
├── backend/                            # FastAPI Backend
│   ├── README.md                       # Backend setup guide
│   ├── .env.example                    # Environment variables template
│   ├── requirements.txt                # Python dependencies
│   └── app/
│       ├── __init__.py
│       ├── main.py                     # FastAPI app entry point
│       ├── schemas.py                  # Consolidated Pydantic schemas
│       ├── models/                     # Database models
│       │   ├── __init__.py
│       │   ├── user.py                 # User model (Customer/Retailer/Wholesaler)
│       │   ├── product.py              # Product model with role-based pricing
│       │   └── order.py                # Order model with items
│       ├── routers/                    # API endpoint handlers
│       │   ├── __init__.py
│       │   ├── auth.py                 # Authentication (signup/login/me)
│       │   ├── products.py             # Product CRUD operations
│       │   └── orders.py               # Order management
│       └── utils/                      # Utility functions
│           ├── __init__.py
│           ├── db.py                   # MongoDB connection
│           └── jwt_handler.py          # JWT token handling
│
└── frontend/                           # Next.js 14 Frontend
    ├── .env.example                    # Frontend environment template
    ├── package.json                    # Node dependencies
    ├── tailwind.confing.ts             # Tailwind configuration
    ├── postcss.config.mjs              # PostCSS configuration
    ├── tsconfig.json                   # TypeScript configuration
    ├── next.config.ts                  # Next.js configuration
    └── src/
        ├── app/                        # Next.js App Router
        │   ├── layout.tsx              # Root layout (updated for LiveMART)
        │   ├── page.tsx                # Landing page (updated for LiveMART)
        │   ├── globals.css             # Global styles
        │   ├── (auth)/                 # Auth route group
        │   │   ├── login/
        │   │   │   └── page.tsx        # Login page
        │   │   └── signup/
        │   │       └── page.tsx        # Signup page with role selection
        │   ├── (store)/                # Store route group
        │   │   └── page.tsx            # Product browsing page
        │   └── (dashboard)/            # Dashboard route group
        │       └── page.tsx            # User dashboard (role-specific)
        │
        ├── components/
        │   └── livemart/               # LiveMART components
        │       ├── Navbar.tsx          # Navigation bar
        │       ├── Footer.tsx          # Footer
        │       ├── ProductCard.tsx     # Product display card
        │       ├── CartSummary.tsx     # Shopping cart summary
        │       └── RoleToggle.tsx      # Role switcher (demo)
        │
        ├── contexts/
        │   └── CartContext.tsx         # Shopping cart state management
        │
        └── lib/
            └── api.ts                  # API client for backend calls
```

## 📋 Key File Purposes

### Backend Files

#### `backend/app/main.py`
- FastAPI application entry point
- Mounts all routers (auth, products, orders)
- Configures CORS for frontend
- Database connection lifecycle management
- Health check endpoints

#### `backend/app/routers/auth.py`
- User registration (signup)
- User authentication (login with JWT)
- Get current user profile
- Logout endpoint
- Role-based access control

#### `backend/app/routers/products.py`
- List products with pagination and filtering
- Get product details
- Create product (retailers/wholesalers only)
- Update product (owner only)
- Delete product (soft delete)

#### `backend/app/routers/orders.py`
- Create order (customers only)
- List user orders
- Get order details
- Update order status
- Cancel order (pending orders only)

#### `backend/app/models/user.py`
- User data model
- Three roles: customer, retailer, wholesaler
- Password hashing
- JWT token schemas

#### `backend/app/models/product.py`
- Product data model
- Role-based pricing (customer/retailer/wholesaler)
- Stock management
- Category organization

#### `backend/app/models/order.py`
- Order data model
- Order items list
- Order status tracking
- Shipping information

#### `backend/app/utils/jwt_handler.py`
- Create JWT access tokens
- Decode and verify tokens
- Password hashing/verification
- Token expiration handling

#### `backend/app/utils/db.py`
- MongoDB connection setup
- Database instance management
- Collection access helpers

### Frontend Files

#### `frontend/src/app/page.tsx`
- Landing page for LiveMART
- Hero section with CTAs
- Features showcase
- Role explanations

#### `frontend/src/app/(auth)/login/page.tsx`
- User login form
- Email and password input
- JWT token storage
- Redirect to dashboard

#### `frontend/src/app/(auth)/signup/page.tsx`
- User registration form
- Role selection dropdown
- Password validation
- Account creation

#### `frontend/src/app/(store)/page.tsx`
- Product browsing interface
- Search and filter controls
- Product grid display
- Category navigation

#### `frontend/src/app/(dashboard)/page.tsx`
- Role-specific dashboard
- Order/sales statistics
- Quick actions
- User profile info

#### `frontend/src/components/livemart/Navbar.tsx`
- Site-wide navigation
- Auth state display
- Cart indicator
- Login/logout buttons

#### `frontend/src/components/livemart/ProductCard.tsx`
- Product display component
- Role-based pricing display
- Add to cart button
- Stock status indicator

#### `frontend/src/components/livemart/CartSummary.tsx`
- Shopping cart display
- Quantity adjustment
- Subtotal/tax/total calculation
- Checkout button

#### `frontend/src/components/livemart/Footer.tsx`
- Site footer
- Quick links
- Support information
- Legal links

#### `frontend/src/contexts/CartContext.tsx`
- Global cart state
- Add/remove items
- Update quantities
- localStorage persistence

#### `frontend/src/lib/api.ts`
- Typed API client functions
- Authentication API calls
- Products API calls
- Orders API calls
- Error handling

## 🔑 Environment Variables

### Backend (.env)
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=livemart
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🚀 Quick Start Commands

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints Summary

### Authentication
- `POST /auth/signup` - Register
- `POST /auth/login` - Login
- `GET /auth/me` - Get user

### Products
- `GET /products` - List products
- `GET /products/{id}` - Get product
- `POST /products` - Create product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Orders
- `GET /orders` - List orders
- `GET /orders/{id}` - Get order
- `POST /orders` - Create order
- `PATCH /orders/{id}` - Update order
- `DELETE /orders/{id}` - Cancel order

## 🎨 Design Patterns Used

### Backend
- Repository pattern (via MongoDB collections)
- Dependency injection (FastAPI)
- JWT authentication middleware
- Pydantic data validation
- Async/await for database operations

### Frontend
- React Context for state management
- Custom hooks for reusability
- Component composition
- Route groups for organization
- Server/Client component separation

## 📱 Responsive Design

All frontend components are fully responsive using Tailwind CSS:
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly interfaces

## 🔐 Security Features

- JWT tokens with expiration
- Password hashing (bcrypt)
- Role-based access control
- Input validation (Pydantic)
- CORS protection
- SQL injection prevention (MongoDB)

---

This structure provides a clean, modular, and scalable foundation for the LiveMART e-commerce platform.
