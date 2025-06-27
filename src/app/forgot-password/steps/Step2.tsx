import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/landing/button";
import { ResendMailButton } from "@/components/landing/ResendEmailButton";

interface Step2CheckEmailProps {
  email: string;
  onSimulateClick: () => void;
}

const Step2CheckEmail: React.FC<Step2CheckEmailProps> = ({
  email,
  onSimulateClick,
}) => (
  <div className="text-center">
    <div className="mb-8">
      <div className="w-20 h-20 bg-vibe-mint-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="w-10 h-10 text-vibe-mint-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
      <p className="text-gray-400 mb-2">
        We&apos;ve sent a password reset link to
      </p>
      <p className="text-vibe-purple-400 font-medium">{email}</p>
    </div>
    <div className="space-y-4">
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <h3 className="text-sm font-medium text-white mb-2">What&apos;s next?</h3>
        <ol className="text-sm text-gray-400 space-y-1">
          <li>1. Check your email inbox (and spam folder)</li>
          <li>2. Click the &quot;Reset Password&quot; link</li>
          <li>3. Create your new password</li>
        </ol>
      </div>
      <div className="flex flex-col space-y-3">
        <ResendMailButton />
        <Button
          onClick={onSimulateClick}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm cursor-pointer"
        >
          Demo: Simulate Email Click
        </Button>
      </div>
    </div>
  </div>
);

export default Step2CheckEmail;