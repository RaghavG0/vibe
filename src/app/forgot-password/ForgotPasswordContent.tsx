"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BrandingPanel from "@/components/ForgotPassword/BrandingPanel";
import StepIndicator from "../onboarding/steps/StepIndicator";
import Step1EnterEmail from "./steps/Step1";
import Step2CheckEmail from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4Success from "./steps/Step4";
import { usePasswordMeterVisibility } from "@/hooks/usePasswordMeterVisibility";

// --- Password requirements (same as signup) ---
const passwordRequirements = [
  { regex: /.{8,}/, text: "Minimum 8 characters" },
  { regex: /[a-z]/, text: "One lowercase letter" },
  { regex: /[A-Z]/, text: "One uppercase letter" },
  { regex: /\d/, text: "One number (0-9)" },
  { regex: /[!@#$%^&*(),.?\":{}|<>]/, text: "One special character" },
];

export default function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Step logic: 1=Email, 2=Check Email, 3=New Password, 4=Success
  const getInitialStep = () => (token ? 3 : 1);
  const [currentStep, setCurrentStep] = useState(getInitialStep());

  // Email and password state
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isConfirmTyping, setIsConfirmTyping] = useState(false);

  // Password meter visibility (shared hook)
  const {
    passwordMeterVisible,
    handleFocus: handlePasswordFocus,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = usePasswordMeterVisibility(password);

  // Step indicator steps
  const steps = [
    { number: 1, title: "Enter Email", description: "We'll send you a reset link" },
    { number: 2, title: "Check Email", description: "Click the link we sent you" },
    { number: 3, title: "New Password", description: "Create a secure password" },
    { number: 4, title: "Complete", description: "You're all set!" },
  ];

  // --- Password strength logic (same as signup) ---
  const getPasswordStrength = (password: string) => {
    const passed = passwordRequirements.filter((req) => req.regex.test(password));
    return {
      score: passed.length,
      total: passwordRequirements.length,
      percentage: (passed.length / passwordRequirements.length) * 100,
    };
  };
  const passwordStrength = getPasswordStrength(password);

  // --- Handlers ---
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 1500);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      const newErrors: Record<string, string> = {};
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
      if (!passwordRequirements.every(req => req.regex.test(password))) {
        newErrors.password = "Password does not meet all requirements";
      }
      if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      setErrors(newErrors);

      setIsLoading(false);
      setIsConfirmTyping(false);

      if (Object.keys(newErrors).length === 0) {
        setCurrentStep(4);
      }
    }, 400);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
        setEmail(value);
        setErrors(prev => ({ ...prev, email: "" }));
    } else if (name === "password") {
        setPassword(value);
        handlePasswordChange();
        const allMet = passwordRequirements.every(req => req.regex.test(value));
        if (allMet) setErrors(prev => ({ ...prev, password: "" }));
    } else if (name === "confirmPassword") {
        setConfirmPassword(value);
        setIsConfirmTyping(true);
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  const goToLogin = () => {
    router.push("/");
    localStorage.setItem("openLogin", "true");
  };

  // --- Main render ---
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      {/* Left branding panel */}
      <BrandingPanel currentStep={currentStep} />

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex w-full justify-between items-center px-4 py-4 border-b border-gray-800 text-sm text-gray-400">
          {/* Left: Back to home */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:text-white"
            style={{ minWidth: 0 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to home</span>
          </Link>
          {/* Right: Account group */}
          <div className="flex flex-col items-end justify-center sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 space-y-1">
            <span className="text-gray-400 text-sm">Remember your password?</span>
            <button
              onClick={goToLogin}
              className="text-vibe-purple-400 hover:text-vibe-purple-300 font-medium cursor-pointer mt-1 sm:mt-0"
              style={{ lineHeight: 1 }}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Main form content */}
        <div className="flex-1 flex items-center justify-center px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              maxStepReached={currentStep}
              goToStep={() => {}} // No back navigation
            />

            {/* Animated form steps */}
            {currentStep === 1 && (
              <Step1EnterEmail
                email={email}
                errors={errors}
                isLoading={isLoading}
                onSubmit={handleEmailSubmit}
                onChange={handleInputChange}
              />
            )}
            {currentStep === 2 && (
              <Step2CheckEmail
                email={email}
                onSimulateClick={() => setCurrentStep(3)}
              />
            )}
            {currentStep === 3 && (
            <Step3
                password={password}
                confirmPassword={confirmPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                isConfirmTyping={isConfirmTyping}
                setIsConfirmTyping={setIsConfirmTyping}
                errors={errors}
                isLoading={isLoading}
                passwordRequirements={passwordRequirements}
                passwordStrength={passwordStrength}
                passwordMeterVisible={passwordMeterVisible}
                handlePasswordFocus={handlePasswordFocus}
                handlePasswordChange={handlePasswordChange}
                handlePasswordBlur={handlePasswordBlur}
                onSubmit={handlePasswordReset}
                onChange={handleInputChange}
            />
            )}
            {currentStep === 4 && (
              <Step4Success onSignIn={goToLogin} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}