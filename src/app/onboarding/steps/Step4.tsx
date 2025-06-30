import React from "react";
import { Sparkles, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/landing/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Step4WelcomeProps {
  formData: { firstName: string };
  goPrevious: () => void;
  goNext?: () => void;
  currentStep: number;
}

const Step4Welcome: React.FC<Step4WelcomeProps> = ({
  formData,
  goPrevious,
  currentStep,
}) => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="p-4 sm:p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-vibe-mint-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Sparkles className="w-10 h-10 text-vibe-mint-400" />
      </motion.div>
      <h2 className="text-3xl font-bold text-white mb-4">Welcome to VibeWealth!</h2>
      <p className="text-gray-400 mb-2">
        Hey {formData.firstName}! You&apos;re all set to start your financial journey.
      </p>
      <p className="text-gray-400 mb-8">
        Let&apos;s help you achieve your goals and build the wealth you deserve.
      </p>
      <div className="bg-gray-700 rounded-xl p-6 mb-8">
        <h3 className="text-white font-medium mb-4">Your Journey Starts With:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-vibe-mint-400" />
            <span className="text-gray-300">Personalized dashboard</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-vibe-mint-400" />
            <span className="text-gray-300">AI-powered insights</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-vibe-mint-400" />
            <span className="text-gray-300">Goal tracking tools</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-vibe-mint-400" />
            <span className="text-gray-300">Educational resources</span>
          </div>
        </div>
      </div>
      {/* Navigation Buttons for Step 4 */}
      <div className="flex flex-row justify-between items-center gap-4 pt-4">
        <Button
          onClick={goPrevious}
          disabled={currentStep === 1}
          variant="outline"
          className={`h-12 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer ${
            currentStep === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleGetStarted}
          type="button"
          className="h-12 vibe-gradient hover:opacity-90 text-white cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <span>Get Started</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Step4Welcome;