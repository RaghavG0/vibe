"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Lottie from "lottie-react";
import animation404 from "../../public/animations/Animation - 1750429631641.json";
import { logError } from "../../lib/logger";

// 404 Not Found Page
export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    // Log 404 error for Sentry/analytics
    try {
      throw new Error(`User attempted to access non-existent route: ${pathname}`);
    } catch (err) {
      logError(err, "NotFoundPage");
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Lottie 404 Animation */}
      <div className="w-full max-w-md mb-6">
        <Lottie animationData={animation404} loop autoplay />
      </div>

      {/* 404 Message */}
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