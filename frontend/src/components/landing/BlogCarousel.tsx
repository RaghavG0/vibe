"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/landing/BlogCard";
import { useCarousel } from "@/hooks/useCarousel";
import { useWindowSize } from "@/hooks/useWindowSize";
import { blogPosts } from "@/data/blogs";
// CHANGED: Added useState and useEffect for hydration fix
import { useState, useEffect } from "react";

export function BlogCarousel() {
  const { width } = useWindowSize();
  // CHANGED: State to safely determine if we are on the client
  const [isClient, setIsClient] = useState(false);

  // CHANGED: This effect runs only on the client, after the initial render
  useEffect(() => {
    setIsClient(true);
  }, []);

  // CHANGED: itemsPerView calculation now safely handles server vs. client rendering
  const itemsPerView = isClient ? (width < 768 ? 1 : width < 1024 ? 2 : 3) : 3;

  // --- CLONING LOGIC ---
  const clonedStart = blogPosts.slice(-itemsPerView);
  const clonedEnd = blogPosts.slice(0, itemsPerView);
  const extendedPosts = [...clonedStart, ...blogPosts, ...clonedEnd];

  const {
    currentIndex,
    isTransitioning,
    activeDotIndex,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
    handleDotClick,
  } = useCarousel(blogPosts.length, itemsPerView);

  return (
    <section
      id="blog"
      className="py-20 bg-gradient-to-b from-vibe-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - No Changes */}
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
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* CHANGED: Arrows are now visible on all screen sizes */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-vibe-gray-50 transition-colors duration-200 border border-vibe-gray-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-vibe-gray-600" />
            </button>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-vibe-gray-50 transition-colors duration-200 border border-vibe-gray-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-vibe-gray-600" />
            </button>
          </div>

          {/* Blog Cards */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              style={{
                width: `${(100 * extendedPosts.length) / itemsPerView}%`,
                transform: `translateX(-${
                  (currentIndex * 100) / extendedPosts.length
                }%)`,
                transition: isTransitioning
                  ? "transform 500ms ease-in-out"
                  : "none",
              }}
            >
              {extendedPosts.map((post, index) => (
                <article
                  key={`${post.id}-${index}`}
                  className="px-2 md:px-4"
                  style={{ width: `${100 / extendedPosts.length}%` }}
                >
                  <BlogCard post={post} />
                </article>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  (activeDotIndex + blogPosts.length) % blogPosts.length ===
                  index
                    ? "bg-vibe-purple-600"
                    : "bg-vibe-gray-300 hover:bg-vibe-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}