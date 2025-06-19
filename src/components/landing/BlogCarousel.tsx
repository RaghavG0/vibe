// app/components/BlogCarousel.tsx
"use client"; // Required if used inside a server component (Next.js App Router)

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";

// Dummy blog data (can be moved to a separate file)
const blogPosts = [
  {
    id: 1,
    title: "5 Money Habits That Will Make You Rich by 30",
    summary:
      "Simple daily habits that compound into serious wealth. No boring finance jargon, just real tips that work.",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop&crop=center",
    readTime: "5 min read",
    category: "Wealth Building",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "How to Budget Without Feeling Like You're on a Diet",
    summary:
      "Make budgeting actually sustainable with these Gen Z-approved strategies that don't suck the fun out of life.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center",
    readTime: "7 min read",
    category: "Budgeting",
    date: "2024-01-12",
  },
  {
    id: 3,
    title: "Side Hustle Success: From Zero to $1K/Month",
    summary:
      "Real stories and practical tips from Gen Z entrepreneurs who turned their skills into serious side income.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
    readTime: "10 min read",
    category: "Side Hustles",
    date: "2024-01-10",
  },
  {
    id: 4,
    title: "Investing 101: Start with $50 and Actually Grow It",
    summary:
      "Demystifying investing for beginners. No trust fund required, just smart choices and patience.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop&crop=center",
    readTime: "8 min read",
    category: "Investing",
    date: "2024-01-08",
  },
  {
    id: 5,
    title: "The Psychology of Money: Why We Make Bad Decisions",
    summary:
      "Understanding your money mindset is the first step to making better financial choices. Let's dive deep.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop&crop=center",
    readTime: "6 min read",
    category: "Psychology",
    date: "2024-01-05",
  },
  {
    id: 6,
    title: "Credit Cards: The Good, Bad, and How Not to Get Screwed",
    summary:
      "Everything you need to know about credit cards without the banking industry's manipulative marketing.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center",
    readTime: "9 min read",
    category: "Credit",
    date: "2024-01-03",
  },
];

export function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView.desktop >= blogPosts.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, blogPosts.length - itemsPerView.desktop)
        : prev - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

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
            Money tips that don't{" "}
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
                  currentIndex * (100 / itemsPerView.desktop)
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
                  <div className="blog-card group cursor-pointer h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="vibe-gradient text-white text-xs font-medium px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-vibe-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <span>•</span>
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-vibe-gray-800 mb-3 group-hover:text-vibe-purple-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-vibe-gray-600 mb-4 line-clamp-3">
                        {post.summary}
                      </p>

                      <div className="flex items-center text-vibe-purple-600 font-medium group-hover:text-vibe-purple-700 transition-colors">
                        <span className="text-sm">Read Article</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({
              length: Math.ceil(blogPosts.length / itemsPerView.desktop),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  Math.floor(currentIndex / itemsPerView.desktop) === index
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
