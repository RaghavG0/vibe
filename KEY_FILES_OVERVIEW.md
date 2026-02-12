# LiveMART - Key File Contents Overview

This document shows the key files and their contents as requested in the problem statement.

## 📁 Directory Tree (Complete)

```
LiveMART/
├── README.md
├── PROJECT_STRUCTURE.md
├── .gitignore
│
├── backend/
│   ├── README.md
│   ├── .env.example
│   ├── requirements.txt
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── schemas.py
│       ├── models/
│       │   ├── __init__.py
│       │   ├── user.py
│       │   ├── product.py
│       │   └── order.py
│       ├── routers/
│       │   ├── __init__.py
│       │   ├── auth.py
│       │   ├── products.py
│       │   └── orders.py
│       └── utils/
│           ├── __init__.py
│           ├── db.py
│           └── jwt_handler.py
│
└── frontend/
    ├── .env.example
    ├── package.json
    ├── tailwind.confing.ts
    ├── postcss.config.mjs
    ├── next.config.ts
    ├── tsconfig.json
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── globals.css
        │   ├── (auth)/
        │   │   ├── login/page.tsx
        │   │   └── signup/page.tsx
        │   ├── (store)/page.tsx
        │   └── (dashboard)/page.tsx
        ├── components/
        │   └── livemart/
        │       ├── Navbar.tsx
        │       ├── Footer.tsx
        │       ├── ProductCard.tsx
        │       ├── CartSummary.tsx
        │       └── RoleToggle.tsx
        ├── contexts/
        │   └── CartContext.tsx
        └── lib/
            └── api.ts
```

---

## 🔧 Backend Key Files

### requirements.txt
```txt
# FastAPI and ASGI server
fastapi==0.115.0
uvicorn[standard]==0.32.0

# Database
pymongo==4.10.1
motor==3.6.0  # Async MongoDB driver

# Authentication & Security
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.12

# Environment variables
python-dotenv==1.0.1

# CORS
fastapi-cors==0.0.6

# Pydantic for data validation
pydantic==2.9.2
pydantic-settings==2.5.2
```

### backend/.env.example
```env
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=livemart

# JWT Configuration
SECRET_KEY=your-secret-key-change-this-in-production-use-openssl-rand-hex-32
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application Configuration
DEBUG=True
```

### backend/app/main.py (Key Parts)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routers import auth, products, orders
from app.utils.db import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
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
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to LiveMART API",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs"
    }
```

---

## 🎨 Frontend Key Files

### frontend/package.json (Key Dependencies)
```json
{
  "name": "vibe",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "echo 'skipping lint'"
  },
  "dependencies": {
    "next": "15.3.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hot-toast": "^2.5.2",
    "tailwindcss": "^4.1.10",
    // ... other dependencies
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "typescript": "^5"
  }
}
```

### frontend/.env.example
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### frontend/tailwind.confing.ts
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

### frontend/src/app/layout.tsx (Key Parts)
```tsx
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "LiveMART - Your Trusted Marketplace",
  description: "Connect with customers, retailers, and wholesalers",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
```

### frontend/src/app/page.tsx (Landing Page Structure)
```tsx
'use client';

import Link from 'next/link';
import { Navbar } from '@/components/livemart/Navbar';
import { Footer } from '@/components/livemart/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <h1 className="text-5xl font-bold">
          Welcome to <span className="text-indigo-600">LiveMART</span>
        </h1>
        <p>Your trusted marketplace connecting customers, retailers, and wholesalers</p>
        {/* CTAs */}
      </section>

      {/* Features Section - 3 Cards (Customer/Retailer/Wholesaler) */}
      
      {/* CTA Section */}
      
      <Footer />
    </div>
  );
}
```

---

## 🗂️ Component Examples

### Navbar.tsx (Structure)
```tsx
'use client';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/">LiveMART</Link>
        <div>
          <Link href="/store">Shop</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
```

### ProductCard.tsx (Role-Based Pricing)
```tsx
interface ProductCardProps {
  product: {
    name: string;
    customer_price: number;
    retailer_price: number;
    wholesaler_price: number;
    // ...
  };
  userRole: 'customer' | 'retailer' | 'wholesaler';
}

export function ProductCard({ product, userRole }: ProductCardProps) {
  const getPrice = () => {
    switch (userRole) {
      case 'customer': return product.customer_price;
      case 'retailer': return product.retailer_price;
      case 'wholesaler': return product.wholesaler_price;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md">
      <h3>{product.name}</h3>
      <p>${getPrice().toFixed(2)}</p>
      <button>Add to Cart</button>
    </div>
  );
}
```

### CartContext.tsx (State Management)
```tsx
'use client';

import { createContext, useContext, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  // ...
}>();

export function CartProvider({ children }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Cart operations...
  
  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

### lib/api.ts (API Client Structure)
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function signup(data: {
  full_name: string;
  email: string;
  password: string;
  role: 'customer' | 'retailer' | 'wholesaler';
}) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function login(email: string, password: string) {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}

export async function getProducts(params?: {
  page?: number;
  category?: string;
  search?: string;
}) {
  // Implementation...
}

export async function createOrder(data: OrderData) {
  // Implementation...
}
```

---

## 🎯 Complete Feature Set

### ✅ Implemented Features

**Backend:**
1. User Authentication (signup/login/me)
2. JWT token generation and validation
3. Role-based access control
4. Product CRUD operations
5. Order management
6. Inventory tracking
7. Password hashing
8. MongoDB async operations
9. API documentation (Swagger)

**Frontend:**
1. Landing page with hero and features
2. User registration with role selection
3. User login with JWT storage
4. Product browsing interface
5. Shopping cart with Context API
6. User dashboard (role-specific)
7. Responsive design (Tailwind CSS)
8. API client with typed functions
9. Route groups for organization

**Components:**
1. Navbar - Navigation with auth state
2. ProductCard - Display with role pricing
3. CartSummary - Cart with calculations
4. Footer - Site-wide footer
5. RoleToggle - Demo role switcher

---

## 🚀 Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with backend URL
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 📊 Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   Pages    │  │ Components │  │  Context   │       │
│  │ Auth/Store │  │  LiveMART  │  │    Cart    │       │
│  │  Dashboard │  │   Navbar   │  │    API     │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
                           ↕
                      REST API (JSON)
                           ↕
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │  Routers   │  │   Models   │  │   Utils    │       │
│  │   Auth     │  │User/Product│  │JWT/Database│       │
│  │Product/Ord │  │   Order    │  │            │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
                           ↕
                      MongoDB (Async)
                           ↕
┌─────────────────────────────────────────────────────────┐
│                     DATABASE                            │
│  Collections: users, products, orders                   │
└─────────────────────────────────────────────────────────┘
```

---

This completes the LiveMART project setup with all required files and structure!
