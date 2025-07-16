"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Target,
  Bot,
  Calculator,
  Zap,
  PieChart,
  Bell,
  Sparkles,
} from "lucide-react";

// Feature data remains the same
const features = [
  {
    icon: Target,
    title: "Dream Tracker",
    description:
      "Visualize and track your biggest financial goals with interactive progress bars and milestone celebrations.",
    gradient: "from-vibe-purple-500 to-vibe-purple-600",
  },
  {
    icon: Bot,
    title: "AI Chatbot",
    description:
      "Get personalized financial advice, spending insights, and budget tips from our smart AI assistant.",
    gradient: "from-vibe-blue-500 to-vibe-blue-600",
  },
  {
    icon: Calculator,
    title: "Smart Budget Planner",
    description:
      "Create intelligent budgets that adapt to your lifestyle and automatically optimize your spending.",
    gradient: "from-vibe-mint-500 to-vibe-mint-600",
  },
  {
    icon: Zap,
    title: "Meme-style Content",
    description:
      "Learn finance through Gen Z-friendly content, memes, and interactive challenges that make money fun.",
    gradient: "from-vibe-purple-400 to-vibe-blue-500",
  },
  {
    icon: PieChart,
    title: "Transaction Breakdown",
    description:
      "Beautiful charts and insights that show exactly where your money goes with smart categorization.",
    gradient: "from-vibe-blue-400 to-vibe-mint-500",
  },
  {
    icon: Bell,
    title: "Smart Nudging",
    description:
      "Gentle reminders and alerts that help you stay on track without being annoying or overwhelming.",
    gradient: "from-vibe-mint-400 to-vibe-purple-500",
  },
];

// Animation variants remain the same
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

// FeatureCard component updated with responsive text
function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      className="flex-shrink-0 w-4/5 sm:w-2/3 md:w-auto group bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-vibe-gray-100 hover:shadow-xl hover:border-vibe-purple-200 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-vibe-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div
          className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        {/* CHANGED: Responsive font size for the card title */}
        <h3 className="text-lg md:text-xl font-bold text-vibe-gray-800 mb-3 group-hover:text-vibe-purple-700 transition-colors">
          {title}
        </h3>
        {/* CHANGED: Explicitly set base font size for the card description */}
        <p className="text-base text-vibe-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export function Features() {
  const router = useRouter();

  return (
    <section
      id="features"
      className="py-16 md:py-20 bg-gradient-to-b from-white to-vibe-gray-50 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-vibe-purple-100 border border-vibe-purple-200 text-vibe-purple-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Why VibeWealth?
          </div>
          {/* CHANGED: Responsive font size for the main heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-vibe-purple-700">master money</span>
          </h2>
          {/* CHANGED: Responsive font size for the paragraph */}
          <p className="text-lg md:text-xl text-vibe-gray-600 max-w-3xl mx-auto">
            Built specifically for Gen Z with the features that actually matter.
            No boring spreadsheets, just smart tools that make finance fun.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hide-scrollbar flex overflow-x-auto space-x-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-x-0 md:pb-0"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          {/* CHANGED: Explicitly set base font size for consistency */}
          <p className="text-base text-vibe-gray-600 mb-6">
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
  );
}