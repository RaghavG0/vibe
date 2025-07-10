"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, User, Mail, Lock, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/landing/button";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import { PasswordRequirementsList } from "@/components/ui/PasswordRequirementsList";
import { SignupBrandingPanel } from "@/components/Signup/SignupBrandingPanel";
import { usePasswordMeterVisibility } from "@/hooks/usePasswordMeterVisibility";

export default function SignUp() {
  const router = useRouter();

  // --- Form state ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    newsletter: false,
  });

  const {
    passwordMeterVisible,
    handleFocus: handlePasswordFocus,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = usePasswordMeterVisibility(formData.password);

  // --- UI state ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isConfirmTyping, setIsConfirmTyping] = useState(false);

  // --- Password requirements ---
  const passwordRequirements = [
    { regex: /.{8,}/, text: "Minimum 8 characters" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /\d/, text: "One number (0-9)" },
    { regex: /[!@#$%^&*(),.?\":{}|<>]/, text: "One special character" },
  ];

  // --- Input change handler ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "password") {
      const allRequirementsMet = passwordRequirements.every(req => req.regex.test(value));
      if (allRequirementsMet && errors.password) {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    } else if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // --- Form validation ---
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address (e.g., user@example.com)";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    // All password requirements must be met
    passwordRequirements.forEach(req => {
      if (!req.regex.test(formData.password)) {
        newErrors.password = "Password does not meet all requirements";
      }
    });
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the Terms of Service and Privacy Policy to create an account";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Form submit handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const isValid = validateForm();
    if (!isValid) return;

    setIsLoading(true);

    try {
      // Check if email exists
      const checkRes = await fetch("http://localhost:8000/auth/email-exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const checkData = await checkRes.json();

      if (checkData.exists) {
        setErrors({ email: "Email already registered" });
        return;
      }

      // Proceed to signup
      const signupRes = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!signupRes.ok) {
        throw new Error("Signup failed");
      }

      // Save email to localStorage for verification screen
      localStorage.setItem("signup-email", formData.email);

      // Navigate to email verification
      router.push("/email-verification");
    } catch (err) {
      console.error(err);
      setErrors({ email: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen w-screen overflow-hidden bg-gray-900 flex">
      {/* Left Side - Branding */}
      <SignupBrandingPanel />

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-800 text-sm text-center sm:text-left">
          <div className="flex w-full justify-between items-center">
            {/* Left: Back to home */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              style={{ minWidth: 0 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to home</span>
            </Link>
            {/* Right: Account group */}
            <div className="flex flex-col items-end justify-center sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0 space-y-1">
              <span className="text-gray-400 text-sm">Already have an account?</span>
              <button
                onClick={() => {
                  router.push("/");
                  localStorage.setItem("openLogin", "true");
                }}
                className="text-vibe-purple-400 hover:text-vibe-purple-300 font-medium cursor-pointer mt-1 sm:mt-0"
                style={{ lineHeight: 1 }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6 flex items-start justify-center pt-8">
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
                    onFocus={handlePasswordFocus}
                    onChange={e => {
                      handleInputChange(e);
                      handlePasswordChange();
                    }}
                    onBlur={handlePasswordBlur}
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
                {passwordMeterVisible && (
                  <>
                    <PasswordStrengthMeter password={formData.password} requirements={passwordRequirements} />
                    <PasswordRequirementsList password={formData.password} requirements={passwordRequirements} />
                  </>
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
                    onFocus={() => setIsConfirmTyping(true)}
                    onBlur={() => setIsConfirmTyping(false)}
                    onChange={e => {
                      handleInputChange(e);
                      setIsConfirmTyping(true);
                      setErrors(prev => ({ ...prev, confirmPassword: "" }));
                    }}
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
                {/* Only one error/indicator at a time */}
                {isConfirmTyping && formData.confirmPassword ? (
                  <div className="flex items-center space-x-2">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <span className="text-sm text-green-400 flex items-center">
                          ✓ Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-red-400 flex items-center">
                          ✗ Passwords don&apos;t match
                        </span>
                      </>
                    )}
                  </div>
                ) : errors.confirmPassword ? (
                  <p className="text-sm text-red-400">
                    {errors.confirmPassword}
                  </p>
                ) : null}
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
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === "Return") {
                        e.preventDefault();
                        setFormData(prev => ({
                          ...prev,
                          agreeToTerms: !prev.agreeToTerms,
                        }));
                      }
                    }}
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
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === "Return") {
                        e.preventDefault();
                        setFormData(prev => ({
                          ...prev,
                          newsletter: !prev.newsletter,
                        }));
                      }
                    }}
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