import * as Sentry from "@sentry/nextjs";

// Log an error to console and optionally to Sentry
export function logError(error: unknown, context?: string) {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[Error - ${context || "General"}]:`, error);
  }

  Sentry.captureException(error, {
    tags: { context: context || "unknown" },
  });
}