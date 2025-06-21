"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/landing/button"; // adjust path if different
import { LoginModal } from "@/components/landing/LoginModal";

const benefits = [
  "Start with $0 – completely free forever plan",
  "Set up your first budget in under 5 minutes",
  "AI-powered insights from day one",
  "Join 50K+ Gen Z users building wealth",
];

export function FinalCTA() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient + Effects */}
      <div className="absolute inset-0 vibe-gradient" />
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float delay-2000" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready to take control?
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Your financial glow-up <br className="hidden sm:block" />
            starts <span className="text-vibe-mint-300">right now</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto"
          >
            Join thousands of Gen Z users who&apos;ve already transformed their
            relationship with money. It&apos;s time to stop stressing and start
            building wealth.
          </motion.p>

          {/* Benefit List */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
            className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex items-center space-x-3 text-white/90"
              >
                <CheckCircle className="w-5 h-5 text-vibe-mint-300 flex-shrink-0" />
                <span className="text-left">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => router.push("/signup")}
              className="bg-white text-vibe-purple-700 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 group px-8 py-4 text-lg font-semibold cursor-pointer"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsLoginModalOpen(true)}
              className="border-white text-white bg-transparent hover:bg-white/10 hover:text-white backdrop-blur-sm px-8 py-4 text-lg font-semibold hover:border-white/80 border-2 cursor-pointer"
            >
              Already have an account? Login
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignUpClick={() => {
          setIsLoginModalOpen(false);
          router.push("/signup");
        }}
      />
    </section>
  )
}
