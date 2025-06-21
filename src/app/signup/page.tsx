"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Check,
  X,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/landing/button";

export default function SignUp() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    newsletter: false,
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswordRecommendation, setShowPasswordRecommendation] = useState(false);


  // Password requirements for strength meter
  const passwordRequirements = [
    { regex: /.{8,}/, text: "Minimum 8 characters" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /\d/, text: "One number (0-9)" },
    { regex: /[!@#$%^&*(),.?\":{}|<>]/, text: "One special character" },
  ];

  // Calculate password strength
  const getPasswordStrength = (password: string) => {
    const passed = passwordRequirements.filter((req) => req.regex.test(password));
    return {
      score: passed.length,
      total: passwordRequirements.length,
      percentage: (passed.length / passwordRequirements.length) * 100,
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Handle input changes for all fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate all form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    // Last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address (e.g., user@example.com)";
    }
    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Only show toast if there are no password errors so far
    if (
      !newErrors.password &&
      !newErrors.confirmPassword &&
      passwordStrength.score < passwordRequirements.length &&
      !showPasswordRecommendation
    ) {
      toast(
        "Your password could be stronger. Would you like to improve it or continue?",
        {
          icon: "⚠️",
        }
      );
      setShowPasswordRecommendation(true);
      return false;
    }
    // Terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        "You must agree to the Terms of Service and Privacy Policy to create an account";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});        // Clear all errors
    setIsLoading(true);   // Show loading spinner

    setTimeout(() => {
      const isValid = validateForm(); // This sets errors if invalid
      setIsLoading(false);
      // If valid, proceed
      if (isValid) {
        router.push("/onboarding?signup=success");
      }
      // If not valid, errors will be shown (set by validateForm)
    }, 400); // 400ms for the "refresh" effect
  };

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

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-vibe-purple-900 via-vibe-blue-900 to-vibe-mint-900 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.3'%3E%3Cpath d='M10,30 Q20,10 30,20 T50,15'/%3E%3Cpath d='M5,40 Q15,20 25,30 T45,25'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        {/* Branding Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">VibeWealth</span>
            </div>
            {/* Heading */}
            <h1 className="text-4xl font-bold text-white mb-6">
              Start your financial journey with us
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Join thousands of Gen Z users who&apos;ve already transformed their
              relationship with money.
            </p>
            {/* Features List */}
            <div className="space-y-4">
              {[
                "AI-powered financial insights",
                "Beautiful budget visualization",
                "Dream goal tracking",
                "24/7 support community",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-vibe-mint-400 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="flex flex-col  sm:flex-row items-center justify-between sm:justify-between p-6 border-b border-gray-800 text-sm text-center sm:text-left">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to home</span>
          </Link>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Already have an account?</span>
            <button
              onClick={() => {
                router.push("/");
                localStorage.setItem("openLogin", "true");
              }}
              className="text-vibe-purple-400 hover:text-vibe-purple-300 font-medium cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Create your account
              </h2>
              <p className="text-gray-400">Join the financial revolution</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.firstName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-red-400">{errors.firstName}</p>
                  )}
                </div>
                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.lastName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
                      }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-sm text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                {formData.password && (
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
                        style={{ width: `${passwordStrength.percentage}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {passwordRequirements.map((req, index) => {
                        const isMet = req.regex.test(formData.password);
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
                              className={`text-xs ${isMet ? "text-green-400" : "text-gray-400"}`}
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
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
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
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="flex items-center space-x-2">
                    {formData.password === formData.confirmPassword ? (
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
                )}
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms & Newsletter */}
              <div className="space-y-4">
                {/* Terms of Service */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-vibe-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-vibe-purple-500 focus:ring-2 cursor-pointer"
                  />
                  <label className="text-sm text-gray-300">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-vibe-purple-400 hover:text-vibe-purple-300"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-vibe-purple-400 hover:text-vibe-purple-300"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-400">{errors.agreeToTerms}</p>
                )}
                {/* Newsletter */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-vibe-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-vibe-purple-500 focus:ring-2 cursor-pointer"
                  />
                  <label className="text-sm text-gray-300">
                    Send me updates about new features and financial tips
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full vibe-gradient hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}