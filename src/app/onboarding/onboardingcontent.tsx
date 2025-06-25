"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Select from "./SelectClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getSymbolFromCurrency from "currency-symbol-map";
import currencyList from "currency-list";
import countries from "world-countries";
import { usePathname } from "next/navigation";
import type { GroupBase, SelectInstance } from "react-select";
import {
  User,
  Calendar,
  Globe,
  ArrowLeft,
  ArrowRight,
  Check,
  TrendingUp,
  LogOut,
  Camera,
  Sparkles,
  CheckCircle2,
  PiggyBank,
  Target,
  GraduationCap,
  Home,
  Plane,
  Heart,
  Building
} from "lucide-react";
import { Button } from "@/components/landing/button";

// Custom date format function
const formatDate = (date: Date | null, format: string, lang: string) => {
  if (!date) return "";
  switch (format) {
    case "MM-DD-YYYY":
      return date
        .toLocaleDateString(lang, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$1-$2-$3");
    case "DD-MM-YYYY":
      return date
        .toLocaleDateString(lang, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$2-$1-$3");
    case "YYYY-MM-DD":
      return date.toISOString().split("T")[0];
    default:
      return date.toLocaleDateString(lang);
  }
};

type Step = {
  number: number;
  title: string;
};

const steps: Step[] = [
  { number: 1, title: "Setup" },
  { number: 2, title: "Preferences" },
  { number: 3, title: "Goals" },
  { number: 4, title: "Start" },
];

const countryOptions = countries
  .sort((a, b) => a.name.common.localeCompare(b.name.common))
  .map((c) => ({
    code: c.cca2,
    name: c.name.common,
    flag: c.flag,
  }));

const currencyOptions = Object.entries(currencyList.getAll("en")).map(
  ([code, { name }]) => ({
    code,
    name,
    symbol: getSymbolFromCurrency(code) || code,
  })
);

const goalOptions = [
  {
    value: "budgeting",
    label: "Better budgeting",
    icon: <PiggyBank className="w-8 h-8 text-vibe-purple-400 mb-2" />,
  },
  {
    value: "investing",
    label: "Start investing",
    icon: <TrendingUp className="w-8 h-8 text-vibe-purple-400 mb-2" />,
  },
  {
    value: "saving",
    label: "Save for goals",
    icon: <Target className="w-8 h-8 text-vibe-purple-400 mb-2" />,
  },
  {
    value: "learning",
    label: "Financial education",
    icon: <GraduationCap className="w-8 h-8 text-vibe-purple-400 mb-2" />,
  },
  {
    value: "buyHome",
    label: "Buy a home",
    icon: <Home className="w-8 h-8 text-vibe-purple-400 mb-2" />,
  },
  {
    value: "travel",
    label: "Travel & experiences",
    icon: <Plane className="w-8 h-8 text-vibe-purple-400 mb-2" />,
  },
  {
    value: "health",
    label: "Healthcare planning",
    icon: <Heart className="w-8 h-8 text-vibe-purple-400 mb-2" />,
  },
  {
    value: "business",
    label: "Start a business",
    icon: <Building className="w-8 h-8 text-vibe-purple-400 mb-2" />,
  },
];

export default function Onboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [dob, setDob] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    dob: "",
    country: "",
    colorTheme: "system",
    language: "en",
    currency: "USD",
    dateFormat: "MM-DD-YYYY",
    bringHere: "",
    goals: [] as string[],
    primaryGoal: "",
    timeFrame: "",
    riskTolerance: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Show the popup when signup=success
  useEffect(() => {
    const signupSuccess = searchParams.get("signup");
    if (signupSuccess === "success") {
      setShowSuccessPopup(true);

      // Remove the signup param from the URL (shallow routing)
      const url = new URL(window.location.href);
      url.searchParams.delete("signup");
      window.history.replaceState({}, document.title, url.pathname + url.search);
    }
  }, [searchParams]);

  // Hide the popup after 2.5s whenever it is shown
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => setShowSuccessPopup(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dobWrapperRef.current &&
        !dobWrapperRef.current.contains(event.target as Node)
      ) {
        setDobFocused(false);
        setDobOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.userName.trim()) newErrors.userName = "User name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => true;

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.goals.length === 0) newErrors.goals = "Please select at least one goal";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handler
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // For multi-goal selection
  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => {
      const already = prev.goals.includes(goal);
      if (already) {
        return { ...prev, goals: prev.goals.filter((g) => g !== goal) };
      } else if (prev.goals.length < 3) {
        return { ...prev, goals: [...prev.goals, goal] };
      }
      return prev;
    });
    setErrors((prev) => ({ ...prev, goals: "" }));
  };

  // Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePhoto(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Step navigation
  const [maxStepReached, setMaxStepReached] = useState<number>(1);

  useEffect(() => {
    setMaxStepReached((prev) => Math.max(prev, currentStep));
  }, [currentStep]);

  const goToStep = (step: number) => {
    if (step <= maxStepReached) setCurrentStep(step);
  };

  // Error refresh on submit
  const goNext = () => {
    setErrors({});
    let isValid = false;
    setTimeout(() => {
      if (currentStep === 1) isValid = validateStep1();
      else if (currentStep === 2) isValid = validateStep2();
      else if (currentStep === 3) isValid = validateStep3();
      else isValid = true;

      if (isValid) {
        if (!completedSteps.includes(currentStep)) setCompletedSteps((prev) => [...prev, currentStep]);
        if (currentStep < 4) setCurrentStep(currentStep + 1);
        else completeOnboarding();
      }
    }, 350);
  };

  const goPrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const completeOnboarding = () => {
    router.push("/dashboard");
  };

  const signOut = () => router.push("/");

  // ProgressBar with center-to-center lines
  const StepIndicator = () => (
    <div className="flex items-start justify-center mb-8 px-4">
      {steps.map((step, index) => (
        <div key={step.number} className="relative flex items-start">
          <div className="flex flex-col items-center px-2 sm:px-4 md:px-6">
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => goToStep(step.number)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 focus:outline-none
                  ${
                    currentStep > step.number
                      ? "bg-vibe-mint-500 text-white"
                      : currentStep === step.number
                      ? "vibe-gradient text-white"
                      : "bg-gray-800 text-gray-400"
                  }
                  ${step.number <= maxStepReached ? "cursor-pointer" : "cursor-not-allowed"}
                `}
                disabled={step.number > maxStepReached}
                aria-label={`Go to step ${step.title}`}
              >
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </button>
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

  // Example account preview (updates live with preferences)
  const getCurrencySymbol = (code: string) => {
    const found = currencyOptions.find((c) => c.code === code);
    return found?.symbol || "$";
  };

  // Language map for demo
  const languageMap: Record<string, string> = {
    en: "English (en)",
    es: "Spanish (es)",
    fr: "French (fr)",
    de: "German (de)",
  };

  const datePickerRef = useRef<DatePicker | null>(null);
  const [dobFocused, setDobFocused] = useState(false);
  const [dobOpen, setDobOpen] = useState(false);
  const [countryFocused, setCountryFocused] = useState(false);
  const dobWrapperRef = useRef<HTMLDivElement>(null);
  const countrySelectRef = useRef<SelectInstance<{ value: string; label: React.ReactNode }, false, GroupBase<{ value: string; label: React.ReactNode }>>>(null);
  const [colorThemeFocused, setColorThemeFocused] = useState(false);
  const [languageFocused, setLanguageFocused] = useState(false);
  const [currencyFocused, setCurrencyFocused] = useState(false);
  const [dateFormatFocused, setDateFormatFocused] = useState(false);

  const colorThemeSelectRef = useRef<SelectInstance<{ value: string; label: React.ReactNode }, false, GroupBase<{ value: string; label: React.ReactNode }>>>(null);
  const languageSelectRef = useRef<SelectInstance<{ value: string; label: React.ReactNode }, false, GroupBase<{ value: string; label: React.ReactNode }>>>(null);
  const currencySelectRef = useRef<SelectInstance<{ value: string; label: React.ReactNode }, false, GroupBase<{ value: string; label: React.ReactNode }>>>(null);
  const dateFormatSelectRef = useRef<SelectInstance<{ value: string; label: React.ReactNode }, false, GroupBase<{ value: string; label: React.ReactNode }>>>(null);

  return (
    <div className="min-h-screen w-full bg-gray-900 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <div className="relative h-[72px] border-b border-gray-800 flex items-center justify-center bg-gray-900 w-full">
        {/* Left: Back to home */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to home</span>
          </button>
        </div>
        {/* Center: VibeWealth */}
        <div className="flex items-center space-x-3 justify-center">
          <div className="w-8 h-8 bg-vibe-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold">VibeWealth</span>
        </div>
        {/* Right: Sign out */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <button
            onClick={signOut}
            className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Sign out</span>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Signup Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs sm:max-w-sm"
          >
            <div className="flex flex-col items-center sm:flex-row sm:items-center bg-gray-800 border border-gray-700 rounded-xl shadow-2xl px-4 py-4 sm:px-6 sm:py-4 space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative mb-2 sm:mb-0">
                <CheckCircle2 className="w-7 h-7 text-vibe-mint-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-medium text-sm sm:text-base">Signed up successfully!</p>
                <p className="text-gray-400 text-xs sm:text-sm">Welcome to VibeWealth</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl mx-auto"
        >
          <StepIndicator />

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
                <div className="p-4 sm:p-8 ">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Let&apos;s set up your account
                    </h2>
                    <p className="text-gray-400 text-lg">
                      First things first, let&apos;s get your profile set up.
                    </p>
                  </div>
                  {/* Photo Upload */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors border-2 border-dashed border-vibe-purple-400 hover:border-vibe-purple-300"
                      >
                        {profilePhoto ? (
                          <Image src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <Camera className="w-8 h-8 text-vibe-purple-400" />
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
                  <div className="text-center mb-8">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-base text-vibe-purple-400 hover:text-vibe-purple-300 transition-colors cursor-pointer"
                    >
                      <Camera className="w-4 h-4 inline mr-1" />
                      Upload photo (optional)
                    </button>
                    <p className="text-xs text-gray-500 mt-2">JPG or PNG. 5MB max.</p>
                  </div>
                  <form
                    className="space-y-7"
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      goNext();
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* First Name */}
                      <div>
                        <label className="text-base font-medium text-gray-300 block">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={e => handleInputChange("firstName", e.target.value)}
                            placeholder="First Name"
                            className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                              errors.firstName
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
                            }`}
                          />
                        </div>
                        {errors.firstName && <p className="text-sm text-red-400 mt-2">{errors.firstName}</p>}
                      </div>
                      {/* Last Name */}
                      <div>
                        <label className="text-base font-medium text-gray-300 block">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={e => handleInputChange("lastName", e.target.value)}
                            placeholder="Last Name"
                            className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                              errors.lastName
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
                            }`}
                          />
                        </div>
                        {errors.lastName && <p className="text-sm text-red-400 mt-2">{errors.lastName}</p>}
                      </div>
                    </div>
                    {/* User Name */}
                    <div>
                      <label className="text-base font-medium text-gray-300 block">User Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.userName}
                          onChange={e => handleInputChange("userName", e.target.value)}
                          placeholder="User Name"
                          className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.userName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
                          }`}
                        />
                      </div>
                      {errors.userName && <p className="text-sm text-red-400 mt-2">{errors.userName}</p>}
                    </div>
                    {/* Date of Birth & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Date of Birth */}
                      <div>
                          <label className="text-base font-medium text-gray-300 block">
                            Date of Birth
                          </label>
                          <div
                            ref={dobWrapperRef}
                            className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-colors
                              ${(dobFocused || dobOpen) ? "border-vibe-purple-500" : "border-gray-700"}
                            `}
                          >
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                            <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
                            <svg
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 cursor-pointer"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              onClick={() => datePickerRef.current?.setOpen?.(true)}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            <DatePicker
                              ref={datePickerRef}
                              selected={dob}
                              onChange={date => {
                                setDob(date);
                                handleInputChange("dob", date ? date.toISOString().split("T")[0] : "");
                              }}
                              dateFormat="dd-MM-yyyy"
                              placeholderText="dd-mm-yyyy"
                              className="w-full pl-10 pr-10 py-3 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                              maxDate={new Date()}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              autoComplete="off"
                              isClearable
                              onFocus={() => setDobFocused(true)}
                              onBlur={() => {
                                setDobFocused(false);
                                setDobOpen(false);
                              }}
                              onCalendarOpen={() => setDobOpen(true)}
                              onCalendarClose={() => setDobOpen(false)}
                              popperPlacement="top"
                              popperClassName="datepicker-center-popper"
                            />
                          </div>
                          {errors.dob && <p className="text-sm text-red-400 mt-2">{errors.dob}</p>}
                      </div>
                      {/* Country */}
                      <div>
                        <label className="text-base font-medium text-gray-300 block">Country</label>
                        <div
                          className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-colors cursor-text
                            ${countryFocused ? "border-vibe-purple-500" : "border-gray-700"}
                          `}
                          onClick={() => {
                            // Focus the react-select input when clicking anywhere in the box
                            document.querySelector<HTMLInputElement>('.country-select input')?.focus();
                          }}
                        >
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                          <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 cursor-pointer"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            onClick={e => {
                              e.stopPropagation();
                              // Focus the select input
                              document.querySelector<HTMLInputElement>('.country-select input')?.focus();
                              // Open the menu (react-select opens menu on focus, but to force it, use setState if needed)
                              setCountryFocused(true);
                              // Optionally, if your SelectClient supports openMenu, call it:
                              countrySelectRef.current?.focus();
                              countrySelectRef.current?.onMenuOpen?.();
                            }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                          <Select
                            ref={countrySelectRef}
                            className="country-select w-full h-12 pl-10 pr-10 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                            options={countryOptions.map(c => ({
                              value: c.name,
                              label: `${c.flag} ${c.name}`,
                            }))}
                            value={
                              formData.country
                                ? { value: formData.country, label: `${countryOptions.find(c => c.name === formData.country)?.flag || ""} ${formData.country}` }
                                : null
                            }
                            onChange={opt => handleInputChange("country", opt?.value || "")}
                            placeholder="Select Country"
                            menuPlacement="top"
                            onFocus={() => setCountryFocused(true)}
                            onBlur={() => setCountryFocused(false)}
                            styles={{
                              control: (base) => ({
                                ...base,
                                background: "transparent",
                                border: "none",
                                boxShadow: "none",
                                minHeight: "3rem",
                                paddingLeft: 0,
                                cursor: "pointer",
                              }),
                              valueContainer: (base) => ({
                                ...base,
                                paddingLeft: 0,
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#9ca3af",
                                opacity: 1,
                                cursor: "pointer",
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "#fff",
                              }),
                              input: (base) => ({
                                ...base,
                                color: "#fff",
                              }),
                              indicatorsContainer: (base) => ({
                                ...base,
                                display: "none",
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                display: "none",
                              }),
                              indicatorSeparator: (base) => ({
                                ...base,
                                display: "none",
                              }),
                              menu: base => ({
                                ...base,
                                background: "#1f2937",
                                color: "#fff",
                                left: 0,
                                marginLeft: 0, // ensure no offset
                                width: "100%", // make dropdown as wide as the input
                                zIndex: 1000,
                              }),
                              option: (base, state) => ({
                                ...base,
                                background: state.isSelected
                                  ? "#a78bfa"
                                  : state.isFocused
                                  ? "#4b5563"
                                  : "#1f2937",
                                color: "#fff",
                              }),
                            }}
                          />
                        </div>
                        {errors.country && <p className="text-sm text-red-400 mt-2">{errors.country}</p>}
                      </div>
                    </div>
                    {/* Navigation Buttons for Step 1 */}
                    <div className="flex flex-row justify-between items-center gap-4 pt-4">
                      <Button
                        onClick={goPrevious}
                        disabled={currentStep === 1}
                        variant="outline"
                        className={`h-12 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer ${
                          currentStep === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        className="h-12 vibe-gradient hover:opacity-90 text-white cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Preferences */}
              {currentStep === 2 && (
                <div className="p-4 sm:p-8">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Configure your preferences</h2>
                    <p className="text-gray-400 text-lg">Let&apos;s configure your preferences.</p>
                  </div>
                  {/* Example Account Display */}
                  <div className="bg-gray-700 rounded-xl p-6 mb-8 flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col items-center mb-4">
                      <h3 className="text-white font-medium mb-2">Example account</h3>
                      <div className="text-2xl font-bold text-white truncate">
                        {getCurrencySymbol(formData.currency)}{" "}
                        2,325.25
                      </div>
                      <div className="text-sm text-vibe-mint-400">
                        + {getCurrencySymbol(formData.currency)} 78.90 (+3.39) as of {formatDate(new Date("2024-10-23"), formData.dateFormat, formData.language)}
                      </div>
                    </div>
                    <div className="text-base text-gray-400 mb-2">
                      Language: {languageMap[formData.language] || "English (en)"}
                    </div>
                    <p className="text-xs text-gray-400">
                      Preview how data displays based on preferences.
                    </p>
                  </div>
                  <form className="space-y-7" noValidate>
                    {/* Color Theme */}
                    <div className="mb-7">
                      <label className="text-base font-medium text-gray-300 block">Color theme</label>
                      <div
                        className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-colors cursor-pointer
                          ${colorThemeFocused ? "border-vibe-purple-500" : "border-gray-700"}
                        `}
                        onClick={() => {
                          colorThemeSelectRef.current?.focus();
                          colorThemeSelectRef.current?.onMenuOpen?.();
                        }}
                      >
                        <Sparkles
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-gray-400 pointer-events-none"
                        />
                        <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          onClick={e => {
                            e.stopPropagation();
                            colorThemeSelectRef.current?.focus();
                            colorThemeSelectRef.current?.onMenuOpen?.();
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <Select
                          classNamePrefix="react-select"
                          ref={colorThemeSelectRef}
                          className="color-theme-select w-full h-12 pl-10 pr-10 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                          options={[
                            {
                              value: "system",
                              label: (
                                <span className="flex items-center">
                                  <Sparkles className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  System
                                </span>
                              ),
                            },
                            {
                              value: "dark",
                              label: (
                                <span className="flex items-center">
                                  <Sparkles className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  Dark
                                </span>
                              ),
                            },
                            {
                              value: "light",
                              label: (
                                <span className="flex items-center">
                                  <Sparkles className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  Light
                                </span>
                              ),
                            },
                          ]}
                          value={{
                            value: formData.colorTheme,
                            label: (
                              <span className="flex items-center">
                                {formData.colorTheme.charAt(0).toUpperCase() + formData.colorTheme.slice(1)}
                              </span>
                            ),
                          }}
                          onChange={opt => handleInputChange("colorTheme", opt?.value || "")}
                          placeholder={
                            <span className="flex items-center">
                              <span>Select Theme</span>
                            </span>
                          }
                          onFocus={() => setColorThemeFocused(true)}
                          onBlur={() => setColorThemeFocused(false)}
                          components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                          }}
                          styles={{
                            control: base => ({
                              ...base,
                              background: "transparent",
                              border: "none",
                              boxShadow: "none",
                              minHeight: "3rem",
                              paddingLeft: 0,
                              cursor: "pointer",
                            }),
                            valueContainer: base => ({
                              ...base,
                              paddingLeft: 0,
                            }),
                            placeholder: base => ({
                              ...base,
                              color: "#9ca3af",
                              opacity: 1,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }),
                            singleValue: base => ({
                              ...base,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }),
                            input: base => ({
                              ...base,
                              color: "#fff",
                            }),
                            indicatorsContainer: base => ({
                              ...base,
                              display: "none",
                            }),
                            menu: base => ({
                              ...base,
                              background: "#1f2937",
                              color: "#fff",
                              left: 0,
                              zIndex: 1000,
                            }),
                            option: (base, state) => ({
                              ...base,
                              background: state.isSelected
                                ? "#a78bfa"
                                : state.isFocused
                                ? "#4b5563"
                                : "#1f2937",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }),
                          }}
                        />
                      </div>
                    </div>

                    {/* Language */}
                    <div className="mb-7">
                      <label className="text-base font-medium text-gray-300 block">Language</label>
                      <div
                        className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-colors cursor-pointer
                          ${languageFocused ? "border-vibe-purple-500" : "border-gray-700"}
                        `}
                        onClick={() => {
                          languageSelectRef.current?.focus();
                          languageSelectRef.current?.onMenuOpen?.();
                        }}
                      >
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                        <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          onClick={e => {
                            e.stopPropagation();
                            languageSelectRef.current?.focus();
                            languageSelectRef.current?.onMenuOpen?.();
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <Select
                          ref={languageSelectRef}
                          classNamePrefix="react-select"
                          className="language-select w-full h-12 pl-10 pr-10 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                          options={[
                            {
                              value: "en",
                              label: (
                                <span className="flex items-center">
                                  <Globe className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  English (en)
                                </span>
                              ),
                            },
                            {
                              value: "es",
                              label: (
                                <span className="flex items-center">
                                  <Globe className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  Spanish (es)
                                </span>
                              ),
                            },
                            {
                              value: "fr",
                              label: (
                                <span className="flex items-center">
                                  <Globe className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  French (fr)
                                </span>
                              ),
                            },
                            {
                              value: "de",
                              label: (
                                <span className="flex items-center">
                                  <Globe className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  German (de)
                                </span>
                              ),
                            },
                          ]}
                          value={{
                            value: formData.language,
                            label: (
                              <span className="flex items-center">
                                {languageMap[formData.language] || "English (en)"}
                              </span>
                            ),
                          }}
                          onChange={opt => handleInputChange("language", opt?.value || "")}
                          placeholder={
                            <span className="flex items-center">
                              <span>Select Language</span>
                            </span>
                          }
                          onFocus={() => setLanguageFocused(true)}
                          onBlur={() => setLanguageFocused(false)}
                          components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                          }}
                          styles={{
                            control: base => ({
                              ...base,
                              background: "transparent",
                              border: "none",
                              boxShadow: "none",
                              minHeight: "3rem",
                              paddingLeft: 0,
                              cursor: "pointer",
                            }),
                            valueContainer: base => ({
                              ...base,
                              paddingLeft: 0,
                            }),
                            placeholder: base => ({
                              ...base,
                              color: "#9ca3af",
                              opacity: 1,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }),
                            singleValue: base => ({
                              ...base,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }),
                            input: base => ({
                              ...base,
                              color: "#fff",
                            }),
                            indicatorsContainer: base => ({
                              ...base,
                              display: "none",
                            }),
                            menu: base => ({
                              ...base,
                              background: "#1f2937",
                              color: "#fff",
                              left: 0,
                              zIndex: 1000,
                            }),
                            option: (base, state) => ({
                              ...base,
                              background: state.isSelected
                                ? "#a78bfa"
                                : state.isFocused
                                ? "#4b5563"
                                : "#1f2937",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }),
                          }}
                        />
                      </div>
                    </div>

                    {/* Currency */}
                    <div className="mb-7">
                      <label className="text-base font-medium text-gray-300 block">Currency</label>
                      <div
                        className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-colors cursor-pointer
                          ${currencyFocused ? "border-vibe-purple-500" : "border-gray-700"}
                        `}
                        onClick={() => {
                          currencySelectRef.current?.focus();
                          currencySelectRef.current?.onMenuOpen?.();
                        }}
                      >
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none">
                          {getSymbolFromCurrency(formData.currency) || "$"}
                        </span>
                        <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          onClick={e => {
                            e.stopPropagation();
                            currencySelectRef.current?.focus();
                            currencySelectRef.current?.onMenuOpen?.();
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <Select
                          classNamePrefix="react-select"
                          ref={currencySelectRef}
                          className="currency-select w-full h-12 pl-10 pr-10 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                          options={currencyOptions.map(c => ({
                            value: c.code,
                            label: (
                              <span className="flex items-center">
                                <span className="w-5 h-5 mr-2 -mt-1 text-gray-400">{c.symbol}</span>
                                {c.name} ({c.code})
                              </span>
                            ),
                          }))}
                          value={
                            formData.currency
                              ? {
                                  value: formData.currency,
                                  label: (
                                    <span className="flex items-center">
                                      {currencyOptions.find(c => c.code === formData.currency)?.name || ""}
                                      {" "}
                                      ({formData.currency})
                                    </span>
                                  ),
                                }
                              : null
                          }
                          onChange={opt => handleInputChange("currency", opt?.value || "")}
                          placeholder={
                            <span className="flex items-center">
                              <span>Select Currency</span>
                            </span>
                          }
                          onFocus={() => setCurrencyFocused(true)}
                          onBlur={() => setCurrencyFocused(false)}
                          components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                          }}
                          styles={{
                            control: base => ({
                              ...base,
                              background: "transparent",
                              border: "none",
                              boxShadow: "none",
                              minHeight: "3rem",
                              paddingLeft: 0,
                              cursor: "pointer",
                            }),
                            valueContainer: base => ({
                              ...base,
                              paddingLeft: 0,
                            }),
                            placeholder: base => ({
                              ...base,
                              color: "#9ca3af",
                              opacity: 1,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }),
                            singleValue: base => ({
                              ...base,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }),
                            input: base => ({
                              ...base,
                              color: "#fff",
                            }),
                            indicatorsContainer: base => ({
                              ...base,
                              display: "none",
                            }),
                            menu: base => ({
                              ...base,
                              background: "#1f2937",
                              color: "#fff",
                              left: 0,
                              zIndex: 1000,
                            }),
                            option: (base, state) => ({
                              ...base,
                              background: state.isSelected
                                ? "#a78bfa"
                                : state.isFocused
                                ? "#4b5563"
                                : "#1f2937",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }),
                          }}
                        />
                      </div>
                    </div>

                    {/* Date Format */}
                    <div className="mb-7">
                      <label className="text-base font-medium text-gray-300 block">Date format</label>
                      <div
                        className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-colors cursor-pointer
                          ${dateFormatFocused ? "border-vibe-purple-500" : "border-gray-700"}
                        `}
                        onClick={() => {
                          dateFormatSelectRef.current?.focus();
                          dateFormatSelectRef.current?.onMenuOpen?.();
                        }}
                      >
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                        <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          onClick={e => {
                            e.stopPropagation();
                            dateFormatSelectRef.current?.focus();
                            dateFormatSelectRef.current?.onMenuOpen?.();
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <Select
                          classNamePrefix="react-select"
                          ref={dateFormatSelectRef}
                          className="date-format-select w-full h-12 pl-10 pr-10 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                          options={[
                            {
                              value: "MM-DD-YYYY",
                              label: (
                                <span className="flex items-center">
                                  <Calendar className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  MM-DD-YYYY
                                </span>
                              ),
                            },
                            {
                              value: "DD-MM-YYYY",
                              label: (
                                <span className="flex items-center">
                                  <Calendar className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  DD-MM-YYYY
                                </span>
                              ),
                            },
                            {
                              value: "YYYY-MM-DD",
                              label: (
                                <span className="flex items-center">
                                  <Calendar className="w-5 h-5 mr-2 -mt-1 text-gray-400" />
                                  YYYY-MM-DD
                                </span>
                              ),
                            },
                          ]}
                          value={{
                            value: formData.dateFormat,
                            label: (
                              <span className="flex items-center">
                                {formData.dateFormat}
                              </span>
                            ),
                          }}
                          onChange={opt => handleInputChange("dateFormat", opt?.value || "")}
                          placeholder={
                            <span className="flex items-center">
                              <span>Select Date Format</span>
                            </span>
                          }
                          menuPlacement="top"
                          onFocus={() => setDateFormatFocused(true)}
                          onBlur={() => setDateFormatFocused(false)}
                          components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                          }}
                          styles={{
                            control: base => ({
                              ...base,
                              background: "transparent",
                              border: "none",
                              boxShadow: "none",
                              minHeight: "3rem",
                              paddingLeft: 0,
                              cursor: "pointer",
                            }),
                            valueContainer: base => ({
                              ...base,
                              paddingLeft: 0,
                            }),
                            placeholder: base => ({
                              ...base,
                              color: "#9ca3af",
                              opacity: 1,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }),
                            singleValue: base => ({
                              ...base,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }),
                            input: base => ({
                              ...base,
                              color: "#fff",
                            }),
                            indicatorsContainer: base => ({
                              ...base,
                              display: "none",
                            }),
                            menu: base => ({
                              ...base,
                              background: "#1f2937",
                              color: "#fff",
                              left: 0,
                              zIndex: 1000,
                            }),
                            option: (base, state) => ({
                              ...base,
                              background: state.isSelected
                                ? "#a78bfa"
                                : state.isFocused
                                ? "#4b5563"
                                : "#1f2937",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </form>
                  {/* Navigation Buttons for Step 2 */}
                  <div className="flex flex-row justify-between items-center gap-4 pt-4">
                    <Button
                      onClick={goPrevious}
                      disabled={Number(currentStep) === 1}
                      variant="outline"
                      className={`h-12 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer ${
                        Number(currentStep) === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={goNext}
                      type="button"
                      className="h-12 vibe-gradient hover:opacity-90 text-white cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Complete</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Goals */}
              {currentStep === 3 && (
                <div className="p-4 sm:p-8">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">What are your goals?</h2>
                    <p className="text-gray-400 text-lg">Select up to 3 goals that matter most to you.</p>
                  </div>
                  <form className="space-y-7" noValidate>
                    <div>
                      <label className="text-base font-medium text-gray-300 block">
                        Choose your goals <span className="text-gray-400">(max 3)</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {goalOptions.map(option => (
                          <button
                            type="button"
                            key={option.value}
                            onClick={() => handleGoalToggle(option.value)}
                            className={`flex flex-col items-start p-6 rounded-2xl border-2 transition-all w-full h-full text-left cursor-pointer ${
                              formData.goals.includes(option.value)
                                ? "border-vibe-purple-400 bg-gray-700"
                                : "border-gray-600 hover:border-vibe-purple-400 bg-gray-800"
                            } ${formData.goals.length >= 3 && !formData.goals.includes(option.value) ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={formData.goals.length >= 3 && !formData.goals.includes(option.value)}
                          >
                            {option.icon}
                            <span className="text-lg font-semibold text-white">{option.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.goals && <p className="text-sm text-red-400 mt-2">{errors.goals}</p>}
                    </div>
                    {/* Navigation Buttons for Step 3 */}
                    <div className="flex flex-row justify-between items-center gap-4 pt-4">
                      <Button
                        onClick={goPrevious}
                        disabled={Number(currentStep) === 1}
                        variant="outline"
                        className={`h-12 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer ${
                          Number(currentStep) === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <Button
                        onClick={goNext}
                        type="button"
                        className="h-12 vibe-gradient hover:opacity-90 text-white cursor-pointer"
                        disabled={formData.goals.length === 0}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 4: Welcome */}
              {currentStep === 4 && (
                <div className="p-4 sm:p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-vibe-mint-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Sparkles className="w-10 h-10 text-vibe-mint-400" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-4">Welcome to VibeWealth!</h2>
                  <p className="text-gray-400 mb-2">
                    Hey {formData.firstName}! You&apos;re all set to start your financial journey.
                  </p>
                  <p className="text-gray-400 mb-8">
                    Let&apos;s help you achieve your goals and build the wealth you deserve.
                  </p>
                  <div className="bg-gray-700 rounded-xl p-6 mb-8">
                    <h3 className="text-white font-medium mb-4">Your Journey Starts With:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-vibe-mint-400" />
                        <span className="text-gray-300">Personalized dashboard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-vibe-mint-400" />
                        <span className="text-gray-300">AI-powered insights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-vibe-mint-400" />
                        <span className="text-gray-300">Goal tracking tools</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-vibe-mint-400" />
                        <span className="text-gray-300">Educational resources</span>
                      </div>
                    </div>
                  </div>
                  {/* Navigation Buttons for Step 4 */}
                  <div className="flex flex-row justify-between items-center gap-4 pt-4">
                    <Button
                      onClick={goPrevious}
                      disabled={Number(currentStep) === 1}
                      variant="outline"
                      className={`h-12 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer ${
                        Number(currentStep) === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={goNext}
                      type="button"
                      className="h-12 vibe-gradient hover:opacity-90 text-white cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Get Started</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}