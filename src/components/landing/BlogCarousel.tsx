"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/landing/BlogCard";
import { useCarousel } from "@/hooks/useCarousel";
import { useWindowSize } from "@/hooks/useWindowSize";

// --- Sample blogs ---
export const blogPosts = [
  {
    id: 1,
    title: "How to Start Budgeting in College",
    summary: "A step-by-step guide to help you take control of your finances as a student.",
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=600&q=80",
    author: "Alex Kim",
    date: "2024-06-01",
    readTime: "4 min",
    category: "Budgeting",
  },
  {
    id: 2,
    title: "Investing 101: The Basics for Gen Z",
    summary: "Learn the fundamentals of investing and how to get started with just $10.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    author: "Priya Singh",
    date: "2024-05-20",
    readTime: "5 min",
    category: "Investing",
  },
  {
    id: 3,
    title: "Side Hustles That Actually Work",
    summary: "Real stories and tips from young people earning extra cash online and offline.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    author: "Jordan Lee",
    date: "2024-05-10",
    readTime: "6 min",
    category: "Side Hustle",
  },
  {
    id: 4,
    title: "Credit Scores Demystified",
    summary: "What is a credit score, why does it matter, and how can you build yours?",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    author: "Samira Patel",
    date: "2024-04-28",
    readTime: "3 min",
    category: "Credit",
  },
  {
    id: 5,
    title: "How to Save Money on Food Delivery",
    summary: "Simple hacks to cut your delivery bill without giving up your favorites.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    author: "Chris Evans",
    date: "2024-04-15",
    readTime: "2 min",
    category: "Saving",
  },
  {
    id: 6,
    title: "Travel Hacking for Beginners",
    summary: "How to see the world for less using points, deals, and smart planning.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    author: "Taylor Brooks",
    date: "2024-04-01",
    readTime: "7 min",
    category: "Travel",
  },
];

export function BlogCarousel() {
  const { width } = useWindowSize();
  const itemsPerView = width < 640 ? 1 : width < 1024 ? 2 : 3;

  // Infinite carousel logic
  const total = blogPosts.length;
  const {
    currentIndex,
    setCurrentIndex,
    setIsAutoPlaying,
    shouldAnimate,
  } = useCarousel(total, itemsPerView);

  // Clone slides for infinite effect
  const slides = [
    ...blogPosts.slice(-itemsPerView), // last N
    ...blogPosts,
    ...blogPosts.slice(0, itemsPerView), // first N
  ];
  const realStart = itemsPerView;
  const realEnd = realStart + total - 1;

  // Track transition for instant jump
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const handle = () => {
      // Instantly jump to real slide after clone, no animation
      if (currentIndex < realStart) {
        setCurrentIndex(realEnd, false);
      } else if (currentIndex > realEnd) {
        setCurrentIndex(realStart, false);
      }
    };
    const node = containerRef.current;
    node.addEventListener("transitionend", handle);
    return () => node.removeEventListener("transitionend", handle);
  }, [currentIndex, realStart, realEnd, setCurrentIndex]);

  // Next/Prev handlers
  const nextSlide = () => {
    setCurrentIndex(currentIndex + 1, true);
  };
  const prevSlide = () => {
    setCurrentIndex(currentIndex - 1, true);
  };

  // Dots logic (show correct dot for real slides)
  const dotCount = Math.ceil(total / itemsPerView);
  const activeDot = Math.floor((currentIndex - realStart) / itemsPerView);

  // Slide width
  const slideWidth = 100 / itemsPerView;

  return (
    <section
      id="blog"
      className="py-20 bg-gradient-to-b from-vibe-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full vibe-gradient/10 border border-vibe-purple-200 text-vibe-purple-700 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Latest from the VibeWealth Blog
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Money tips that don&apos;t{" "}
            <span className="text-vibe-purple-700">put you to sleep</span>
          </h2>
          <p className="text-xl text-vibe-gray-600 max-w-3xl mx-auto">
            Fresh perspectives on finance, written by Gen Z for Gen Z. No
            corporate speak, just real advice.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-vibe-gray-50 transition-colors duration-200 border border-vibe-gray-200 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-vibe-gray-600" />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4">
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-vibe-gray-50 transition-colors duration-200 border border-vibe-gray-200 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-vibe-gray-600" />
            </button>
          </div>

          {/* Blog Cards */}
          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className={`flex ${shouldAnimate ? "transition-transform duration-700 ease-in-out" : ""}`}
              style={{
                width: `${(slides.length * 100) / itemsPerView}%`,
                transform: `translateX(-${currentIndex * slideWidth}%)`,
              }}
            >
              {slides.map((post, index) => (
                <div
                  key={`slide-${index}-${post.id ?? index}`}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: dotCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(realStart + index * itemsPerView, true)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  activeDot === index
                    ? "bg-vibe-purple-600"
                    : "bg-vibe-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}