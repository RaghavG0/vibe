"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Props = {
  show: boolean;
  message?: string;
  subtext?: string;
};

export default function SuccessPopup({
  show,
  message = "Signed up successfully!",
  subtext = "Welcome to VibeWealth",
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] max-w-xs sm:max-w-sm"
        >
          <div className="flex flex-col items-center sm:flex-row sm:items-center bg-gray-800 border border-gray-700 rounded-xl shadow-2xl px-4 py-4 sm:px-6 sm:py-4 space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative mb-2 sm:mb-0">
              <CheckCircle2 className="w-7 h-7 text-vibe-mint-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-medium text-sm sm:text-base">{message}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{subtext}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}