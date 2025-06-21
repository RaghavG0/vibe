import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeWealth",
  description: "Your Finance Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1F2937", // dark gray
              color: "#fff",
              border: "1px solid #4B5563", // subtle border
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "#10B981", // green
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444", // red
                secondary: "#fff",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
