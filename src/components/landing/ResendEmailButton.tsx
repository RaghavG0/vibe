"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Check, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/landing/button"; // Adjust path if needed

export function ResendMailButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleClick = async () => {
    if (cooldown > 0 || isLoading) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      setIsSent(true);
      setCooldown(60);
      toast.success("Email sent successfully!");
    } catch {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-center">
      {/* Resend Button */}
      <Button
        onClick={handleClick}
        disabled={cooldown > 0 || isLoading}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
          ${
            isSent && cooldown > 0
              ? "bg-vibe-mint-500 text-white"
              : "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
          }
          ${cooldown > 0 ? "cursor-not-allowed opacity-80" : "cursor-pointer"}
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </div>
        ) : isSent && cooldown > 0 ? (
          <div className="flex items-center justify-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Sent</span>
            <span className="text-xs">({cooldown}s)</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Resend Email</span>
          </div>
        )}
      </Button>

      {/* Cooldown Message */}
      <p className="text-sm text-gray-400">
        {cooldown > 0
          ? `You can resend email in ${cooldown}s.`
          : `Didn't get it? Resend the email now.`}
      </p>
    </div>
  );
}
