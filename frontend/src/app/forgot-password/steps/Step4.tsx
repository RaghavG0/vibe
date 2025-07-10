import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/landing/button";
import Link from "next/link";

interface Step4SuccessProps {
  onSignIn: () => void;
}

const Step4Success: React.FC<Step4SuccessProps> = ({ onSignIn }) => (
  <div className="text-center">
    <div className="w-20 h-20 bg-vibe-mint-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle className="w-10 h-10 text-vibe-mint-400" />
    </div>
    <h2 className="text-2xl font-bold text-white mb-2">
      Password updated successfully!
    </h2>
    <p className="text-gray-400 mb-8">
      Your password has been changed. You can now sign in with your new password.
    </p>
    <div className="space-y-4">
      <Button
        onClick={onSignIn}
        className="w-full vibe-gradient hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-center space-x-2">
          <span>Sign In Now</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </Button>
      <Link
        href="/"
        className="block w-full text-center py-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

export default Step4Success;