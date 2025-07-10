import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "./Providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "VibeWealth",
  description: "Your Finance Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1F2937",
              color: "#fff",
              border: "1px solid #4B5563",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <Providers>
          <div className="w-full overflow-x-hidden">{children}</div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}