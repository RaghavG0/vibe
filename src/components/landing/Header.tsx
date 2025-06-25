"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, TrendingUp } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";

import { Button } from "./button";
import { LoginModal } from "@/components/landing/LoginModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Why Us", href: "#why-us" },
    { name: "Blog", href: "#blog" },
  ];

  // Height of header in px (h-16 = 64px)
  const headerHeight = 64;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-vibe-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 vibe-gradient rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <Link href="#top" scroll={true}>
                <span className="text-xl font-bold text-vibe-purple-700 cursor-pointer">
                  VibeWealth
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-vibe-gray-600 hover:text-vibe-purple-600 transition-colors duration-200 font-medium cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setIsLoginModalOpen(true)}
                className="text-vibe-gray-600 hover:text-vibe-purple-600 hover:bg-vibe-purple-50 cursor-pointer"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="vibe-gradient hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-vibe-gray-100 transition-colors cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-vibe-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-vibe-gray-600" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav & Blur Overlay rendered via portal to cover all content below header */}
      {mounted && isOpen &&
        createPortal(
          <>
            {/* Strong blurred overlay covering everything below header */}
            <div
              className="fixed left-0 right-0 z-40 bg-black/40 backdrop-blur-lg transition-all"
              style={{
                top: `${headerHeight}px`,
                bottom: 0,
              }}
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            />
            {/* Mobile Nav */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-vibe-gray-200 bg-white z-50 fixed top-16 left-0 right-0 rounded-b-xl shadow-xl"
              style={{ maxWidth: "100vw" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-vibe-gray-600 hover:text-vibe-purple-600 hover:bg-vibe-purple-50 rounded-lg transition-colors cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                <div className="flex flex-col space-y-2 px-3 pt-4">
                  <Button
                    variant="ghost"
                    size="default"
                    className="!justify-center !bg-vibe-purple-200 !text-vibe-purple-600 hover:text-vibe-purple-600 hover:bg-vibe-purple-50 cursor-pointer"
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/signup");
                      setIsOpen(false);
                    }}
                    className="vibe-gradient text-white shadow-lg cursor-pointer"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </>,
          document.body
        )
      }

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignUpClick={() => {
          setIsLoginModalOpen(false);
          router.push("/signup");
        }}
      />
    </>
  )
}