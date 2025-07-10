import { NextResponse } from "next/server";
import { safeCaptureException } from "../../../../lib/errorLogger"; // ✅ import our reusable error logger

export const dynamic = "force-dynamic";

class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}

export function GET() {
  try {
    // Throw error to simulate backend failure
    throw new SentryExampleAPIError("This error is raised on the backend called by the example page.");
    
    // (unreachable but good to have for testing conditionally)
    return NextResponse.json({ data: "Testing Sentry Error..." });
  } catch (error) {
    // 🔐 Log to Sentry with extra context
    safeCaptureException(error, {
      route: "/api/example",
      method: "GET",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
