import * as Sentry from "@sentry/nextjs";

export const safeCaptureException = (
  error: unknown,
  context?: Record<string, unknown>
) => {
  try {
    if (context) {
      Sentry.setContext("custom-context", context);
    }
    Sentry.captureException(error);
  } catch (sentryError) {
    console.error("Sentry reporting failed:", sentryError);
    console.error("Original error:", error);
  }
};
