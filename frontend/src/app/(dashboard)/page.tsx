/**
 * LiveMART Dashboard Page
 * 
 * User dashboard for managing orders, products, and account.
 * Different views for customers, retailers, and wholesalers.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // TODO: Fetch user data from backend API
    // For now, using mock data
    setTimeout(() => {
      setUser({
        id: '1',
        fullName: 'Demo User',
        email: 'demo@livemart.com',
        role: 'customer',
      });
      setLoading(false);
    }, 500);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
              <Link href="/dashboard" className="text-indigo-600 font-semibold">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.fullName}!
          </h1>
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium capitalize">
            {user?.role} Account
          </div>
        </div>

        {/* Dashboard Content Based on Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          {user?.role === 'customer' && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Orders</h3>
                <p className="text-3xl font-bold text-indigo-600">0</p>
                <p className="text-sm text-gray-600 mt-2">Total orders placed</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Wishlist</h3>
                <p className="text-3xl font-bold text-indigo-600">0</p>
                <p className="text-sm text-gray-600 mt-2">Saved items</p>
              </div>
            </>
          )}

          {(user?.role === 'retailer' || user?.role === 'wholesaler') && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Products</h3>
                <p className="text-3xl font-bold text-indigo-600">0</p>
                <p className="text-sm text-gray-600 mt-2">Active listings</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales</h3>
                <p className="text-3xl font-bold text-indigo-600">$0</p>
                <p className="text-sm text-gray-600 mt-2">Total revenue</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Orders</h3>
                <p className="text-3xl font-bold text-indigo-600">0</p>
                <p className="text-sm text-gray-600 mt-2">Pending orders</p>
              </div>
            </>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Status</h3>
            <p className="text-3xl font-bold text-green-600">Active</p>
            <p className="text-sm text-gray-600 mt-2">All systems go!</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user?.role === 'customer' ? (
              <>
                <Link
                  href="/store"
                  className="bg-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition text-center"
                >
                  Browse Products
                </Link>
                <button className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition">
                  View Orders
                </button>
              </>
            ) : (
              <>
                <button className="bg-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Add New Product
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition">
                  Manage Products
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition">
                  View Analytics
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
