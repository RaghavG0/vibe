"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface BrandingPanelProps {
  currentStep: number;
}

export default function BrandingPanel({ currentStep }: BrandingPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-vibe-purple-900 via-vibe-blue-900 to-vibe-mint-900 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.3'%3E%3Cpath d='M10,30 Q20,10 30,20 T50,15'/%3E%3Cpath d='M5,40 Q15,20 25,30 T45,25'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      {/* Branding content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">VibeWealth</span>
          </div>
          {/* Animated step description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentStep === 1 && (
                <>
                  <h1 className="text-4xl font-bold text-white mb-6">
                    Forgot your password?
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed">
                    No worries! Enter your email and we&apos;ll send you a secure
                    link to reset your password.
                  </p>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <h1 className="text-4xl font-bold text-white mb-6">
                    Check your email
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed">
                    We&apos;ve sent a password reset link to your email. Click the
                    link to continue with resetting your password.
                  </p>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <h1 className="text-4xl font-bold text-white mb-6">
                    Create new password
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed">
                    Choose a strong password that you haven&apos;t used before.
                    Your account security is important to us.
                  </p>
                </>
              )}
              {currentStep === 4 && (
                <>
                  <h1 className="text-4xl font-bold text-white mb-6">
                    Password updated!
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed">
                    Your password has been successfully updated. You can now
                    sign in with your new password.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}