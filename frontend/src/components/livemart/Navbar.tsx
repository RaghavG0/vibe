/**
 * LiveMART Navbar Component
 * 
 * Main navigation bar for the application.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated (simplified)
  // TODO: Replace with actual auth check
  const checkAuth = () => {
    return typeof window !== 'undefined' && localStorage.getItem('token') !== null;
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">LiveMART</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/store"
              className={`${
                pathname === '/store'
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-700 hover:text-indigo-600'
              } transition`}
            >
              Shop
            </Link>
            <Link
              href="/dashboard"
              className={`${
                pathname === '/dashboard'
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-700 hover:text-indigo-600'
              } transition`}
            >
              Dashboard
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {checkAuth() ? (
              <>
                <button className="text-gray-700 hover:text-indigo-600 transition">
                  Cart (0)
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                  className="text-gray-700 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
