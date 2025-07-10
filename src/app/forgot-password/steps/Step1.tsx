"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/landing/button";

// TEMP: This is your temporary local mock user list.
// DELETE THIS once backend is connected.
const mockRegisteredEmails = [
  "dashboard@gmail.com",
  "demo@vibewealth.com",
];

interface Step1EnterEmailProps {
  onSuccess: () => void; // call this to go to Step 2
}

const Step1EnterEmail: React.FC<Step1EnterEmailProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: "Email is required." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ email: "Please enter a valid email." });
      return;
    }

    setIsLoading(true);

    try {
      // Replace this block with backend fetch once ready
      // ---- BACKEND START ----
      const isRegistered = mockRegisteredEmails.includes(email); // TEMP check

      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1000));

      if (!isRegistered) {
        setErrors({ email: "Email not registered." });
      } else {
        // Send to backend to trigger actual email with token
        // await fetch("/api/auth/forgot-password", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ email }),
        // });

        onSuccess(); // Proceed to Step 2 (Email Sent Screen)
      }
      // ---- BACKEND END ----
    } catch (err) {
      console.error(err);
      setErrors({ email: "Something went wrong. Try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Enter your email</h2>
        <p className="text-gray-400">
          We&apos;ll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
              }`}
            />
          </div>
          {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full vibe-gradient hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Sending Link...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>Send Reset Link</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Step1EnterEmail;
