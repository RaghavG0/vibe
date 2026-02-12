/**
 * LiveMART Store Page
 * 
 * Product browsing and shopping interface for all users.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Placeholder for future imports
// import { ProductCard } from '@/components/livemart/ProductCard';
// import { CartSummary } from '@/components/livemart/CartSummary';

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch products from backend API
    // For now, using mock data
    setTimeout(() => {
      setProducts([
        // Mock products will be replaced with actual API data
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              LiveMART
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/store" className="text-gray-700 hover:text-indigo-600 font-medium">
                Shop
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium">
                Dashboard
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Products</h1>
          <p className="text-gray-600">Discover amazing deals from our retailers and wholesalers</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food & Beverages</option>
            <option value="home">Home & Garden</option>
          </select>
          
          <input
            type="search"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Product cards will be rendered here */}
            {products.map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                {/* ProductCard component will go here */}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-xl text-gray-600 mb-4">No products available yet</p>
            <p className="text-gray-500">Check back soon for amazing deals!</p>
          </div>
        )}
      </main>
    </div>
  );
}
