"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Lottie from "lottie-react";
import animation404 from "../../public/animations/Animation - 1750429631641.json"; // Adjust path as needed

import { logError } from "../../lib/logger"; // ✅ Import custom logger

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // ❗️Use custom error logger for Sentry
      throw new Error(`User attempted to access non-existent route: ${pathname}`);
    } catch (err) {
      logError(err, "NotFoundPage");
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Lottie Animation */}
      <div className="w-full max-w-md mb-6">
        <Lottie animationData={animation404} loop autoplay />
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>

        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
