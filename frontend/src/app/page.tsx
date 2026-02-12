/**
 * LiveMART Landing Page
 * 
 * Main entry point for the LiveMART marketplace.
 */

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-indigo-600">LiveMART</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your trusted marketplace connecting customers, retailers, and wholesalers.
              Buy and sell with confidence in our modern e-commerce platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/store"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
              >
                Start Shopping
              </Link>
              <Link
                href="/signup"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
              >
                Join as Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose LiveMART?</h2>
            <p className="text-xl text-gray-600">Built for everyone in the supply chain</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Customers */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Customers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Wide product selection</li>
                <li>✓ Best prices guaranteed</li>
                <li>✓ Secure checkout</li>
                <li>✓ Fast delivery</li>
              </ul>
            </div>

            {/* For Retailers */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Retailers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Easy product listing</li>
                <li>✓ Flexible pricing</li>
                <li>✓ Order management</li>
                <li>✓ Analytics dashboard</li>
              </ul>
            </div>

            {/* For Wholesalers */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">🏭</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Wholesalers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Bulk order handling</li>
                <li>✓ Volume pricing</li>
                <li>✓ B2B relationships</li>
                <li>✓ Inventory tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and sellers on LiveMART today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="bg-transparent text-white px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white hover:bg-white hover:text-indigo-600 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}