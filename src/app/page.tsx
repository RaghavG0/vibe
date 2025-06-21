'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Landing page components
import Header from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/features";
import { WhyUs } from "@/components/landing/WhyUs";
import { BlogCarousel } from "@/components/landing/BlogCarousel";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { LoginModal } from "@/components/landing/LoginModal";

export default function Home() {
  // State to control visibility of login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage to auto-open login modal if flag is set
    const shouldShow = localStorage.getItem("openLogin");
    if (shouldShow === "true") {
      setIsLoginModalOpen(true);
      localStorage.removeItem("openLogin"); // Clean up the flag
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
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

      {/* Login modal */}
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
