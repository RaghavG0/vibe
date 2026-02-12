# LiveMART - Modern Full-Stack E-Commerce Platform

LiveMART is a comprehensive e-commerce marketplace connecting **customers**, **retailers**, and **wholesalers** in a seamless digital experience.

## 🎯 Project Overview

LiveMART enables three distinct user roles to interact within a single platform:

- **Customers** - Browse and purchase products at retail prices
- **Retailers** - List and sell products with flexible pricing
- **Wholesalers** - Manage bulk inventory and B2B relationships

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Context** for state management
- Deployed on **Vercel**

### Backend
- **FastAPI** (Python) for REST API
- **MongoDB** with Motor (async driver)
- **JWT Authentication** for secure access
- **Role-based access control**
- Deployed on **Render/Fly.io**

## 📁 Project Structure

```
/
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/         # Authentication routes
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── (store)/        # Product browsing
│   │   │   ├── (dashboard)/    # User dashboard
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   └── livemart/       # LiveMART-specific components
│   │   │       ├── Navbar.tsx
│   │   │       ├── ProductCard.tsx
│   │   │       ├── RoleToggle.tsx
│   │   │       ├── CartSummary.tsx
│   │   │       └── Footer.tsx
│   │   ├── contexts/
│   │   │   └── CartContext.tsx # Shopping cart state
│   │   └── lib/
│   │       └── api.ts          # API client functions
│   └── package.json
│
└── backend/                     # FastAPI backend application
    ├── app/
    │   ├── main.py             # Application entry point
    │   ├── routers/            # API endpoints
    │   │   ├── auth.py
    │   │   ├── products.py
    │   │   └── orders.py
    │   ├── models/             # Data models
    │   │   ├── user.py
    │   │   ├── product.py
    │   │   └── order.py
    │   ├── schemas.py          # Pydantic schemas
    │   └── utils/              # Utilities
    │       ├── jwt_handler.py
    │       └── db.py
    └── requirements.txt
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.9+ (for backend)
- **MongoDB** (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file (copy from `.env.example`):
   ```env
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=livemart
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`
   - Swagger docs: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 🔑 Key Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Customer, Retailer, Wholesaler)
- Secure password hashing with bcrypt

### Product Management
- Create, read, update, delete products (CRUD)
- Role-specific pricing
- Category filtering and search
- Inventory tracking

### Order Processing
- Shopping cart functionality
- Order creation and tracking
- Status updates (pending, confirmed, shipped, delivered)
- Order cancellation

### User Dashboard
- Role-specific views
- Order history for customers
- Product management for sellers
- Sales analytics for retailers/wholesalers

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Products
- `GET /products` - List products (with pagination)
- `GET /products/{id}` - Get product details
- `POST /products` - Create product (sellers only)
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Orders
- `GET /orders` - List user orders
- `GET /orders/{id}` - Get order details
- `POST /orders` - Create new order
- `PATCH /orders/{id}` - Update order status
- `DELETE /orders/{id}` - Cancel order

## 🎨 Component Library

### Reusable Components
- **Navbar** - Main navigation with auth state
- **ProductCard** - Product display with role-based pricing
- **RoleToggle** - Switch between user role views
- **CartSummary** - Shopping cart with total calculation
- **Footer** - Site-wide footer

### Contexts
- **CartContext** - Global shopping cart state management

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- Input validation with Pydantic

## 🚢 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Fly.io)
1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy the `backend` directory

## 📝 Development Notes

- Frontend uses Next.js App Router for modern routing
- Backend follows REST API best practices
- All API calls are typed with TypeScript
- Shopping cart persists in localStorage
- Role-based pricing automatically adjusts

## 🤝 Contributing

This is an educational project demonstrating full-stack development with modern technologies.

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack application architecture
- RESTful API design
- Authentication & authorization
- Database design and ORM usage
- Modern frontend development
- Deployment strategies
- Role-based access control

---

Built with ❤️ using Next.js and FastAPI
