"use client";

import { useEffect } from "react";
import NextError from "next/error";
import { safeCaptureException } from "../../lib/errorLogger";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    safeCaptureException(error, {
      route: "global-error",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
