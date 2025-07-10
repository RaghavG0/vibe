"use client";

import { useEffect } from "react";
import NextError from "next/error";
import { safeCaptureException } from "../../lib/errorLogger";

// Global error boundary for the app
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // Log error to Sentry or your error tracking service
    safeCaptureException(error, {
      route: "global-error",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        {/* Next.js default error component */}
        <NextError statusCode={500} />
        {/* Optionally, add a custom message for users */}
        {/* <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-gray-400 mt-2">Please try refreshing the page or come back later.</p>
        </div> */}
      </body>
    </html>
  );
}