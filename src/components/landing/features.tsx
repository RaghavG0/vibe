"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // <-- Next.js routing
import {
  Target,
  Bot,
  Calculator,
  Zap,
  PieChart,
  Bell,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Dream Tracker",
    description:
      "Visualize and track your biggest financial goals with interactive progress bars and milestone celebrations.",
    color: "vibe-purple",
    gradient: "from-vibe-purple-500 to-vibe-purple-600",
  },
  {
    icon: Bot,
    title: "AI Chatbot",
    description:
      "Get personalized financial advice, spending insights, and budget tips from our smart AI assistant.",
    color: "vibe-blue",
    gradient: "from-vibe-blue-500 to-vibe-blue-600",
  },
  {
    icon: Calculator,
    title: "Smart Budget Planner",
    description:
      "Create intelligent budgets that adapt to your lifestyle and automatically optimize your spending.",
    color: "vibe-mint",
    gradient: "from-vibe-mint-500 to-vibe-mint-600",
  },
  {
    icon: Zap,
    title: "Meme-style Content",
    description:
      "Learn finance through Gen Z-friendly content, memes, and interactive challenges that make money fun.",
    color: "vibe-purple",
    gradient: "from-vibe-purple-400 to-vibe-blue-500",
  },
  {
    icon: PieChart,
    title: "Transaction Breakdown",
    description:
      "Beautiful charts and insights that show exactly where your money goes with smart categorization.",
    color: "vibe-blue",
    gradient: "from-vibe-blue-400 to-vibe-mint-500",
  },
  {
    icon: Bell,
    title: "Smart Nudging",
    description:
      "Gentle reminders and alerts that help you stay on track without being annoying or overwhelming.",
    color: "vibe-mint",
    gradient: "from-vibe-mint-400 to-vibe-purple-500",
  },
];

export function Features() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-white to-vibe-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full vibe-gradient/10 border border-vibe-purple-200 text-vibe-purple-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Why VibeWealth?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="text-vibe-purple-700">master money</span>
          </h2>
          <p className="text-xl text-vibe-gray-600 max-w-3xl mx-auto">
            Built specifically for Gen Z with the features that actually matter.
            No boring spreadsheets, just smart tools that make finance fun.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-vibe-gray-100 hover:shadow-xl hover:border-vibe-purple-200 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-vibe-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-vibe-gray-800 mb-3 group-hover:text-vibe-purple-700 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-vibe-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-vibe-gray-600 mb-6">
            Ready to experience the future of personal finance?
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="vibe-gradient text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl cursor-pointer"
          >
            Try All Features Free
          </button>
        </motion.div>
      </div>
    </section>
  )
}
