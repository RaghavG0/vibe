"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
//   Upload,
//   User,
//   MapPin,
//   Calendar,
  Check,
  TrendingUp,
  LogOut,
  Camera,
//   Globe,
//   DollarSign,
//   Palette,
  Target,
  PiggyBank,
  GraduationCap,
  Home,
//   Car,
  Plane,
  Heart,
  Building,
  Sparkles,
  CheckCircle2,
//   Loader2,
} from "lucide-react";
import { Button } from "@/components/landing/button";

export default function Onboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: "",
    lastName: "",
    householdName: "",
    age: "",
    country: "",

    // Step 2: Preferences
    colorTheme: "system",
    language: "en",
    currency: "USD",
    dateFormat: "MM-DD-YYYY",

    // Step 3: Goals
    bringHere: "",
    primaryGoal: "",
    timeFrame: "",
    riskTolerance: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle signup success popup
  useEffect(() => {
    const signupSuccess = searchParams.get("signup");
    if (signupSuccess === "success") {
      setShowSuccessPopup(true);
      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Countries data
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "Brazil",
    "Mexico",
    "Other",
  ];

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.householdName.trim())
      newErrors.householdName = "Household name is required";
    if (!formData.age) newErrors.age = "Age is required";
    else if (parseInt(formData.age) < 13 || parseInt(formData.age) > 120) {
      newErrors.age = "Please enter a valid age";
    }
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    // All fields have defaults, so no validation needed
    return true;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bringHere)
      newErrors.bringHere = "Please select what brings you here";
    if (!formData.primaryGoal)
      newErrors.primaryGoal = "Please select your primary goal";
    if (!formData.timeFrame)
      newErrors.timeFrame = "Please select your time frame";
    if (!formData.riskTolerance)
      newErrors.riskTolerance = "Please select your risk tolerance";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Navigation functions
  const goToStep = (step: number) => {
    if (step < currentStep || completedSteps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const goNext = () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }

      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete onboarding
        completeOnboarding();
      }
    }
  };

  const goPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // Save onboarding data and redirect to dashboard
    console.log("Onboarding completed:", formData);
    router.push("/dashboard"); // Assuming you have a dashboard
  };

  const signOut = () => {
    router.push("/");
  };

  // Progress bar component
  const ProgressBar = () => (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8">
      {[1, 2, 3, 4].map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <button
              onClick={() => goToStep(step)}
              disabled={step > currentStep && !completedSteps.includes(step)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                completedSteps.includes(step)
                  ? "bg-vibe-mint-500 text-white cursor-pointer"
                  : currentStep === step
                    ? "vibe-gradient text-white"
                    : step < currentStep
                      ? "bg-gray-600 text-gray-300 cursor-pointer hover:bg-gray-500"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              {completedSteps.includes(step) ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                step
              )}
            </button>
            <div className="mt-1 sm:mt-2 text-center">
              <div
                className={`text-xs font-medium ${
                  currentStep >= step ? "text-white" : "text-gray-500"
                }`}
              >
                {step === 1 && "Setup"}
                {step === 2 && "Preferences"}
                {step === 3 && "Goals"}
                {step === 4 && "Start"}
              </div>
            </div>
          </div>
          {index < 3 && (
            <div
              className={`w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 transition-all duration-300 ${
                completedSteps.includes(step)
                  ? "bg-vibe-mint-500"
                  : "bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <Link
          href="/"
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to home</span>
        </Link>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-vibe-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold">VibeWealth</span>
        </div>

        <button
          onClick={signOut}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="hidden sm:inline">Sign out</span>
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl px-6 py-4 flex items-center space-x-3 max-w-sm">
              <div className="relative">
                <CheckCircle2 className="w-6 h-6 text-vibe-mint-400" />
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute inset-0"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <motion.circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#10b981"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3.5, ease: "linear" }}
                      style={{
                        transformOrigin: "center",
                        transform: "rotate(-90deg)",
                      }}
                    />
                  </svg>
                </motion.div>
              </div>
              <div>
                <p className="text-white font-medium">
                  Signed up successfully!
                </p>
                <p className="text-gray-400 text-sm">Welcome to VibeWealth</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <ProgressBar />

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
            >
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Let&apos;s set up your account
                    </h2>
                    <p className="text-gray-400">
                      First things first, let&apos;s get your profile set up.
                    </p>
                  </div>

                  {/* Photo Upload */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors border-2 border-dashed border-gray-600 hover:border-gray-500"
                      >
                        {profilePhoto ? (
                          <Image
                            src={profilePhoto}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <Camera className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm text-vibe-purple-400 hover:text-vibe-purple-300 transition-colors"
                    >
                      <Camera className="w-4 h-4 inline mr-1" />
                      Upload photo (optional)
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG or PNG. 5MB max.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          First name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="First name"
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.firstName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:ring-vibe-purple-500"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-400">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Last name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Last name"
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.lastName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:ring-vibe-purple-500"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-400">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Household Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Household name *
                      </label>
                      <input
                        type="text"
                        value={formData.householdName}
                        onChange={(e) =>
                          handleInputChange("householdName", e.target.value)
                        }
                        placeholder="Household name"
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.householdName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-600 focus:ring-vibe-purple-500"
                        }`}
                      />
                      {errors.householdName && (
                        <p className="text-sm text-red-400">
                          {errors.householdName}
                        </p>
                      )}
                    </div>

                    {/* Age and Country */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Age *
                        </label>
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) =>
                            handleInputChange("age", e.target.value)
                          }
                          placeholder="25"
                          min="13"
                          max="120"
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.age
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:ring-vibe-purple-500"
                          }`}
                        />
                        {errors.age && (
                          <p className="text-sm text-red-400">{errors.age}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Country *
                        </label>
                        <select
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                            errors.country
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:ring-vibe-purple-500"
                          }`}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option
                              key={country}
                              value={country}
                              className="bg-gray-700"
                            >
                              {country}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <p className="text-sm text-red-400">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Preferences */}
              {currentStep === 2 && (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Configure your preferences
                    </h2>
                    <p className="text-gray-400">
                      Let&apos;s configure your preferences.
                    </p>
                  </div>

                  {/* Example Account Display */}
                  <div className="bg-gray-700 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          Example account
                        </h3>
                        <div className="text-2xl font-bold text-white">
                          {formData.currency === "USD" && "$"}
                          {formData.currency === "EUR" && "€"}
                          {formData.currency === "GBP" && "£"}
                          {formData.currency === "JPY" && "¥"}
                          2,325.25
                        </div>
                        <div className="text-sm text-vibe-mint-400">
                          +$78.90 (+3.39) as of 10-23-2024
                        </div>
                      </div>
                      <div className="w-16 h-8">
                        <svg viewBox="0 0 100 40" className="w-full h-full">
                          <path
                            d="M10,30 Q30,10 50,15 T90,10"
                            stroke="#10b981"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      Preview how data displays based on preferences.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Color Theme */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Color theme
                      </label>
                      <select
                        value={formData.colorTheme}
                        onChange={(e) =>
                          handleInputChange("colorTheme", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-vibe-purple-500"
                      >
                        <option value="system">System</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                      </select>
                    </div>

                    {/* Language */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Language
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) =>
                          handleInputChange("language", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-vibe-purple-500"
                      >
                        <option value="en">English (en)</option>
                        <option value="es">Spanish (es)</option>
                        <option value="fr">French (fr)</option>
                        <option value="de">German (de)</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) =>
                          handleInputChange("currency", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-vibe-purple-500"
                      >
                        <option value="USD">United States Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                        <option value="JPY">Japanese Yen (JPY)</option>
                        <option value="CAD">Canadian Dollar (CAD)</option>
                      </select>
                    </div>

                    {/* Date Format */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Date format
                      </label>
                      <select
                        value={formData.dateFormat}
                        onChange={(e) =>
                          handleInputChange("dateFormat", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-vibe-purple-500"
                      >
                        <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                        <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Goals */}
              {currentStep === 3 && (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      What brings you to VibeWealth?
                    </h2>
                    <p className="text-gray-400">
                      Help us understand your financial goals and preferences
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* What brings you here */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        What brings you here? *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          {
                            id: "budgeting",
                            label: "Better budgeting",
                            icon: PiggyBank,
                          },
                          {
                            id: "investing",
                            label: "Start investing",
                            icon: TrendingUp,
                          },
                          {
                            id: "saving",
                            label: "Save for goals",
                            icon: Target,
                          },
                          {
                            id: "learning",
                            label: "Financial education",
                            icon: GraduationCap,
                          },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              handleInputChange("bringHere", option.id)
                            }
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              formData.bringHere === option.id
                                ? "border-vibe-purple-500 bg-vibe-purple-500/10"
                                : "border-gray-600 hover:border-gray-500"
                            }`}
                          >
                            <option.icon className="w-6 h-6 text-vibe-purple-400 mb-2" />
                            <div className="text-white font-medium">
                              {option.label}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.bringHere && (
                        <p className="text-sm text-red-400">
                          {errors.bringHere}
                        </p>
                      )}
                    </div>

                    {/* Primary Goal */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        What&apos;s your primary financial goal? *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          {
                            id: "emergency",
                            label: "Emergency fund",
                            icon: Heart,
                          },
                          { id: "house", label: "Buy a house", icon: Home },
                          {
                            id: "retirement",
                            label: "Retirement savings",
                            icon: Building,
                          },
                          {
                            id: "travel",
                            label: "Travel & experiences",
                            icon: Plane,
                          },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              handleInputChange("primaryGoal", option.id)
                            }
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              formData.primaryGoal === option.id
                                ? "border-vibe-mint-500 bg-vibe-mint-500/10"
                                : "border-gray-600 hover:border-gray-500"
                            }`}
                          >
                            <option.icon className="w-6 h-6 text-vibe-mint-400 mb-2" />
                            <div className="text-white font-medium">
                              {option.label}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.primaryGoal && (
                        <p className="text-sm text-red-400">
                          {errors.primaryGoal}
                        </p>
                      )}
                    </div>

                    {/* Time Frame */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Time frame for your goal *
                      </label>
                      <select
                        value={formData.timeFrame}
                        onChange={(e) =>
                          handleInputChange("timeFrame", e.target.value)
                        }
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                          errors.timeFrame
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-600 focus:ring-vibe-purple-500"
                        }`}
                      >
                        <option value="">Select time frame</option>
                        <option value="6months">Less than 6 months</option>
                        <option value="1year">6 months - 1 year</option>
                        <option value="3years">1 - 3 years</option>
                        <option value="5years">3 - 5 years</option>
                        <option value="10years">5 - 10 years</option>
                        <option value="longterm">More than 10 years</option>
                      </select>
                      {errors.timeFrame && (
                        <p className="text-sm text-red-400">
                          {errors.timeFrame}
                        </p>
                      )}
                    </div>

                    {/* Risk Tolerance */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Risk tolerance *
                      </label>
                      <select
                        value={formData.riskTolerance}
                        onChange={(e) =>
                          handleInputChange("riskTolerance", e.target.value)
                        }
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                          errors.riskTolerance
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-600 focus:ring-vibe-purple-500"
                        }`}
                      >
                        <option value="">Select risk tolerance</option>
                        <option value="conservative">
                          Conservative - Minimal risk
                        </option>
                        <option value="moderate">
                          Moderate - Balanced approach
                        </option>
                        <option value="aggressive">
                          Aggressive - Higher potential returns
                        </option>
                      </select>
                      {errors.riskTolerance && (
                        <p className="text-sm text-red-400">
                          {errors.riskTolerance}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Welcome */}
              {currentStep === 4 && (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-vibe-mint-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Sparkles className="w-10 h-10 text-vibe-mint-400" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-4">
                    Welcome to VibeWealth!
                  </h2>

                  <p className="text-gray-400 mb-2">
                    Hey {formData.firstName}! You&apos;re all set to start your
                    financial journey.
                  </p>

                  <p className="text-gray-400 mb-8">
                    Let&apos;s help you achieve your goals and build the wealth you
                    deserve.
                  </p>

                  <div className="bg-gray-700 rounded-xl p-6 mb-8">
                    <h3 className="text-white font-medium mb-4">
                      Your Journey Starts With:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-vibe-mint-400" />
                        <span className="text-gray-300">
                          Personalized dashboard
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-vibe-mint-400" />
                        <span className="text-gray-300">
                          AI-powered insights
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-vibe-mint-400" />
                        <span className="text-gray-300">
                          Goal tracking tools
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-vibe-mint-400" />
                        <span className="text-gray-300">
                          Educational resources
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="px-8 pb-8">
                <div className="flex justify-between items-center">
                  <Button
                    onClick={goPrevious}
                    disabled={currentStep === 1}
                    variant="outline"
                    className={`border-gray-700 bg-gray-800 text-white hover:bg-gray-700 ${
                      currentStep === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={goNext}
                    className="vibe-gradient hover:opacity-90 text-white cursor-pointer"
                  >
                    {currentStep === 4 ? (
                      <div className="flex items-center space-x-2">
                        <span>Get Started</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>
                          {currentStep === 2 ? "Complete" : "Continue"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
