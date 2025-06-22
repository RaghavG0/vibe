"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/landing/BlogCard";
import { useCarousel } from "@/hooks/useCarousel";
import { useWindowSize } from "@/hooks/useWindowSize";
import { blogPosts } from "@/data/blogs";

export function BlogCarousel() {
  const { width } = useWindowSize();

  // Determine number of items to show based on screen width
  const itemsPerView =
    width < 768 ? 1 : width < 1024 ? 2 : 3;

  const {
    currentIndex,
    setCurrentIndex,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
  } = useCarousel(blogPosts.length, itemsPerView);

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
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({
              length: blogPosts.length,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  Math.floor(currentIndex) === index
                    ? "bg-vibe-purple-600"
                    : "bg-vibe-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
