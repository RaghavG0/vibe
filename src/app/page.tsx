'use client';

import Header from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/features";
import { WhyUs } from "@/components/landing/WhyUs";
import { BlogCarousel } from "@/components/landing/BlogCarousel";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { div } from "framer-motion/client";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/landing/LoginModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const shouldShow = localStorage.getItem("openLogin");
  if (shouldShow === "true") {
    setIsLoginModalOpen(true);
    localStorage.removeItem("openLogin");
  }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <WhyUs />
        <BlogCarousel />
        <FinalCTA />
        <Footer />
      </main>
      <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSignUpClick={() => {
                setIsLoginModalOpen(false);
                router.push("/signup");
                }}
            />
    </div>
  )
}