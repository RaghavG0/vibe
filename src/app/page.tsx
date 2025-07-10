'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Landing page sections
import Header from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/features";
import { WhyUs } from "@/components/landing/WhyUs";
import { BlogCarousel } from "@/components/landing/BlogCarousel";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { LoginModal } from "@/components/landing/LoginModal";

export default function Home() {
  // --- Modal state and handlers ---
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    // Auto-open login modal if flag is set in localStorage (e.g., after redirect)
    const shouldShow = localStorage.getItem("openLogin");
    if (shouldShow === "true") {
      setIsLoginModalOpen(true);
      localStorage.removeItem("openLogin");
    }
  }, []);

  // --- Render ---
  return (
    <div data-theme="light" className="min-h-screen bg-white w-screen">
      {/* Fixed header */}
      <Header />

      {/* Main landing page sections */}
      <main>
        <Hero />
        <Features />
        <WhyUs />
        <BlogCarousel />
        <FinalCTA />
        <Footer />
      </main>

      {/* Login modal (shown on demand) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignUpClick={() => {
          setIsLoginModalOpen(false);
          router.push("/signup");
        }}
      />
    </div>
  );
}