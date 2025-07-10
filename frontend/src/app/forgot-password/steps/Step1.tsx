"use client";

import React from "react";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/landing/button";

interface Step1EnterEmailProps {
  email: string;
  errors: Record<string, string>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step1EnterEmail: React.FC<Step1EnterEmailProps> = ({
  email,
  errors,
  isLoading,
  onSubmit,
  onChange,
}) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Enter your email</h2>
        <p className="text-gray-400">
          We&apos;ll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
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