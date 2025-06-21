"use client";

import { useState } from "react";
import {
  RefreshCw,
  Check,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/landing/button";
import { ResendMailButton } from "@/components/landing/ResendEmailButton";

export default function ForgotPassword() {
  // Hooks and state
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isConfirmTyping, setIsConfirmTyping] = useState(false);
  const [hasShownWeakPasswordWarning, setHasShownWeakPasswordWarning] = useState(false);

  // Step logic
  const getInitialStep = () => (token ? 3 : 1);
  const [currentStep, setCurrentStep] = useState(getInitialStep());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showWeakPasswordWarning, setShowWeakPasswordWarning] = useState(false);

  // Password requirements
  const passwordRequirements = [
    { regex: /.{8,}/, text: "Minimum 8 characters" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /\d/, text: "One number (0-9)" },
    { regex: /[!@#$%^&*(),.?\":{}|<>]/, text: "One special character" },
  ];

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    const passed = passwordRequirements.filter((req) => req.regex.test(password));
    return {
      score: passed.length,
      total: passwordRequirements.length,
      percentage: (passed.length / passwordRequirements.length) * 100,
    };
  };

  const passwordStrength = getPasswordStrength(password);

  // Helpers for password strength UI
  const getStrengthColor = () => {
    if (passwordStrength.percentage < 40) return "bg-red-500";
    if (passwordStrength.percentage < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength.percentage < 40) return "Weak";
    if (passwordStrength.percentage < 80) return "Medium";
    return "Strong";
  };

  // Step 1: Handle email submit
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

  // Step 3: Handle password reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowWeakPasswordWarning(false);
    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      const newErrors: Record<string, string> = {};

      // Validate password
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      // Validate confirm password
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);

      // If there are any errors, stop here (error will reappear after spinner)
      if (Object.keys(newErrors).length > 0) {
        setIsLoading(false);
        setIsConfirmTyping(false); // Hide live indicator on error
        return;
      }

      // Only show toast if passwords match and password is weak
      if (
        passwordStrength.score < 5 &&
        !showWeakPasswordWarning &&
        !hasShownWeakPasswordWarning
      ) {
        setShowWeakPasswordWarning(true);
        setHasShownWeakPasswordWarning(true);
        setIsLoading(false);
        return;
      }

      // Success: proceed to next step
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(4);
      }, 1000);
    }, 400); // 400ms for the "refresh" effect
  };

  // Go to login page
  const goToLogin = () => {
    router.push("/");
    localStorage.setItem("openLogin", "true");
  };

  // Steps for indicator
  const steps = [
    { number: 1, title: "Enter Email", description: "We'll send you a reset link" },
    { number: 2, title: "Check Email", description: "Click the link we sent you" },
    { number: 3, title: "New Password", description: "Create a secure password" },
    { number: 4, title: "Complete", description: "You're all set!" },
  ];

  // Step indicator component
  const StepIndicator = () => (
    <div className="flex items-start justify-center mb-8 px-4">
      {steps.map((step, index) => (
        <div key={step.number} className="relative flex items-start">
          <div className="flex flex-col items-center px-2 sm:px-4 md:px-6">
            <div className="relative flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-vibe-mint-500 text-white"
                    : currentStep === step.number
                    ? "vibe-gradient text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </div>
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-16 sm:w-20 md:w-24 lg:w-28 h-0.5">
                  <div
                    className={`w-full h-0.5 transition-all duration-300 ${
                      currentStep > step.number ? "bg-vibe-mint-500" : "bg-gray-700"
                    }`}
                  />
                </div>
              )}
            </div>
            <div className="mt-2 text-center min-w-[60px] sm:min-w-[80px]">
              <div
                className={`text-xs font-medium whitespace-nowrap ${
                  currentStep >= step.number ? "text-white" : "text-gray-400"
                }`}
              >
                {step.title}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // --- Custom persistent toast for weak password ---
  // Place this just before the main return
  const WeakPasswordToast = () =>
    showWeakPasswordWarning ? (
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center bg-vibe-gray-800 border border-vibe-purple-500 text-white px-6 py-3 rounded-xl shadow-lg space-x-3 max-w-md">
          <span className="text-xl">⚠️</span>
          <span className="flex-1">
            Your password could be stronger. If you still want to use this password, press ‘Update Password’ again.
          </span>
          <button
            onClick={() => setShowWeakPasswordWarning(false)}
            className="ml-4 text-gray-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    ) : null;

  // Main render
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      <WeakPasswordToast />
      {/* Left branding panel */}
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

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Mobile header */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 px-4 py-4 border-b border-gray-800 text-sm text-gray-400 text-center sm:text-left">
          <Link href="/" className="flex items-center space-x-2 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <span>Remember your password?</span>
            <button
              onClick={goToLogin}
              className="text-vibe-purple-400 hover:text-vibe-purple-300 font-medium cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 min-h-[calc(100vh-64px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <StepIndicator />

            {/* Animated form steps */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Enter Email */}
                {currentStep === 1 && (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Enter your email
                      </h2>
                      <p className="text-gray-400">
                        We&apos;ll send you a link to reset your password
                      </p>
                    </div>
                    <form onSubmit={handleEmailSubmit} className="space-y-6" noValidate>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
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
                        {errors.email && (
                          <p className="text-sm text-red-400">{errors.email}</p>
                        )}
                      </div>
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
                )}

                {/* Step 2: Check Email */}
                {currentStep === 2 && (
                  <div className="text-center">
                    <div className="mb-8">
                      <div className="w-20 h-20 bg-vibe-mint-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-10 h-10 text-vibe-mint-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Check your email
                      </h2>
                      <p className="text-gray-400 mb-2">
                        We&apos;ve sent a password reset link to
                      </p>
                      <p className="text-vibe-purple-400 font-medium">{email}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-white mb-2">
                          What&apos;s next?
                        </h3>
                        <ol className="text-sm text-gray-400 space-y-1">
                          <li>1. Check your email inbox (and spam folder)</li>
                          <li>2. Click the &quot;Reset Password&quot; link</li>
                          <li>3. Create your new password</li>
                        </ol>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <ResendMailButton />
                        {/* Demo button to simulate email click */}
                        <Button
                          onClick={() => setCurrentStep(3)}
                          className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm cursor-pointer"
                        >
                          Demo: Simulate Email Click
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: New Password */}
                {currentStep === 3 && (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Create new password
                      </h2>
                      <p className="text-gray-400">
                        Your new password must be different from your previous password
                      </p>
                    </div>
                    <form onSubmit={handlePasswordReset} className="space-y-6">
                      {/* New Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a strong password"
                            className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                              errors.password
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {/* Password Strength Meter */}
                        {password && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">
                                Password strength
                              </span>
                              <span
                                className={`text-xs font-medium ${
                                  passwordStrength.percentage < 40
                                    ? "text-red-400"
                                    : passwordStrength.percentage < 80
                                    ? "text-yellow-400"
                                    : "text-green-400"
                                }`}
                              >
                                {getStrengthText()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div
                                className={`h-1 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                                style={{
                                  width: `${passwordStrength.percentage}%`,
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                              {passwordRequirements.map((req, index) => {
                                const isMet = req.regex.test(password);
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                  >
                                    {isMet ? (
                                      <Check className="w-3 h-3 text-green-400" />
                                    ) : (
                                      <X className="w-3 h-3 text-gray-400" />
                                    )}
                                    <span
                                      className={`text-xs ${
                                        isMet ? "text-green-400" : "text-gray-400"
                                      }`}
                                    >
                                      {req.text}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {errors.password && (
                          <p className="text-sm text-red-400">{errors.password}</p>
                        )}
                      </div>
                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onFocus={() => setIsConfirmTyping(true)}
                            onBlur={() => setIsConfirmTyping(false)}
                            onChange={e => {
                              setConfirmPassword(e.target.value);
                              setIsConfirmTyping(true);
                              setErrors(prev => ({ ...prev, confirmPassword: "" }));
                            }}
                            placeholder="Confirm your new password"
                            className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                              errors.confirmPassword
                                ? "border-red-500 focus:ring-red-500"
                                : confirmPassword && password === confirmPassword
                                ? "border-green-500 focus:ring-green-500"
                                : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {/* Show live indicator or error, not both */}
                        {isConfirmTyping && confirmPassword ? (
                          <div className="flex items-center space-x-2">
                            {password === confirmPassword ? (
                              <>
                                <Check className="w-4 h-4 text-green-400" />
                                <span className="text-sm text-green-400">
                                  Passwords match
                                </span>
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4 text-red-400" />
                                <span className="text-sm text-red-400">
                                  Passwords don&apos;t match
                                </span>
                              </>
                            )}
                          </div>
                        ) : errors.confirmPassword ? (
                          <p className="text-sm text-red-400">{errors.confirmPassword}</p>
                        ) : null}
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full vibe-gradient hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 cursor-pointer"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Updating Password...</span>
                          </div>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </div>
                )}

                {/* Step 4: Success */}
                {currentStep === 4 && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-20 h-20 bg-vibe-mint-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-vibe-mint-400" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Password updated successfully!
                    </h2>
                    <p className="text-gray-400 mb-8">
                      Your password has been changed. You can now sign in with your new password.
                    </p>
                    <div className="space-y-4">
                      <Button
                        onClick={goToLogin}
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
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}