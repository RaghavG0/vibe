"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Users,
  Award,
  Zap,
  Star,
  CheckCircle,
} from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

// Data remains the same
const stats = [
  { number: "50K+", label: "Gen Z Users", icon: Users, color: "vibe-purple" },
  { number: "98%", label: "Satisfaction Rate", icon: Star, color: "vibe-blue" },
  { number: "$2M+", label: "Money Saved", icon: Award, color: "vibe-mint" },
  { number: "24/7", label: "AI Support", icon: Zap, color: "vibe-purple" },
];

const differentiators = [
  {
    title: "Built for Gen Z",
    description:
      "Unlike traditional finance apps, we understand your lifestyle, language, and financial challenges.",
  },
  {
    title: "Actually Fun",
    description:
      "We turned boring budgeting into an engaging experience with gamification and memes.",
  },
  {
    title: "AI-First Approach",
    description:
      "Our AI learns your habits and provides personalized advice that evolves with you.",
  },
  {
    title: "Privacy Protected",
    description:
      "Bank-level security with complete transparency about how we use your data.",
  },
];

// StatCard component with responsive text
function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center group"
    >
      <div
        className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      {/* CHANGED: Responsive font size for the animated number */}
      <div className="text-2xl sm:text-3xl font-bold mb-1">
        <AnimatedCounter value={stat.number} />
      </div>
      <div className="text-sm text-vibe-gray-600 font-medium">{stat.label}</div>
    </motion.div>
  );
}

// Main component with all responsive updates
export function WhyUs() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  return (
    <section id="why-us" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-vibe-purple-100 border border-vibe-purple-200 text-vibe-purple-700 text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Why Choose VibeWealth?
          </div>
          {/* CHANGED: Responsive font size for the main heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            The <span className="text-vibe-purple-700">smarter choice</span> for
            your money
          </h2>
          {/* CHANGED: Responsive font size for the paragraph */}
          <p className="text-lg md:text-xl text-vibe-gray-600 max-w-3xl mx-auto">
            We&apos;re not just another finance app. We&apos;re a movement
            that&apos;s changing how Gen Z thinks about money.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-8 mb-16 md:mb-20">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20"
        >
          {/* CHANGED: Responsive font size for the subheading */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            What makes us{" "}
            <span className="text-vibe-purple-700">different</span>
          </h3>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            {differentiators.map((item, index) => (
              // CHANGED: Added `last:border-b-0` to remove the border from the last item
              <div key={item.title} className="border-b last:border-b-0 md:border-none">
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex justify-between items-center py-5 text-left md:hidden"
                >
                  {/* CHANGED: Responsive font size for the accordion title */}
                  <h4 className="text-base sm:text-lg font-semibold text-vibe-gray-800">
                    {item.title}
                  </h4>
                  <span
                    className={`transform transition-transform duration-300 ${
                      openAccordion === index ? "rotate-45" : ""
                    }`}
                  >
                    <Zap className="w-5 h-5 text-vibe-purple-500" />
                  </span>
                </button>
                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden md:hidden"
                    >
                      {/* CHANGED: Added text-base for consistency */}
                      <p className="pb-5 text-base text-vibe-gray-600">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="hidden md:flex items-start space-x-4 p-6 rounded-2xl hover:bg-vibe-gray-50 transition-colors duration-300">
                   <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-vibe-mint-500" />
                   </div>
                   <div>
                      <h4 className="text-lg font-semibold text-vibe-gray-800 mb-2">
                         {item.title}
                      </h4>
                      <p className="text-base text-vibe-gray-600">{item.description}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}