"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getSymbolFromCurrency from "currency-symbol-map";
import currencyList from "currency-list";
import countries from "world-countries";
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

const steps = [
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

export default function Onboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
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
    primaryGoal: "",
    timeFrame: "",
    riskTolerance: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const signupSuccess = searchParams.get("signup");
    if (signupSuccess === "success") {
      setShowSuccessPopup(true);
      const timer = setTimeout(() => setShowSuccessPopup(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

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
    if (!formData.bringHere) newErrors.bringHere = "Please select what brings you here";
    if (!formData.primaryGoal) newErrors.primaryGoal = "Please select your primary goal";
    if (!formData.timeFrame) newErrors.timeFrame = "Please select your time frame";
    if (!formData.riskTolerance) newErrors.riskTolerance = "Please select your risk tolerance";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handler
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
  const goToStep = (step: number) => {
    if (step < currentStep || completedSteps.includes(step)) setCurrentStep(step);
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
  const ProgressBar = () => (
    <div className="flex items-start justify-center mb-8 px-4">
      {steps.map((step, index) => (
        <div key={step.number} className="relative flex items-start">
          <div className="flex flex-col items-center px-2 sm:px-4 md:px-6">
            <div className="relative flex items-center">
              <button
                onClick={() => goToStep(step.number)}
                disabled={step.number > currentStep && !completedSteps.includes(step.number)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold transition-all duration-300 ${
                  completedSteps.includes(step.number)
                    ? "bg-vibe-mint-500 text-white cursor-pointer"
                    : currentStep === step.number
                      ? "vibe-gradient text-white"
                      : step.number < currentStep
                        ? "bg-gray-600 text-gray-300 cursor-pointer hover:bg-gray-500"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {completedSteps.includes(step.number) ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  step.number
                )}
              </button>
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-12 sm:w-16 md:w-20 h-0.5">
                  <div
                    className={`w-full h-0.5 transition-all duration-300 ${
                      completedSteps.includes(step.number) ? "bg-vibe-mint-500" : "bg-gray-700"
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

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <button
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to home</span>
        </button>
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

      {/* Signup Success Popup */}
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
              </div>
              <div>
                <p className="text-white font-medium">Signed up successfully!</p>
                <p className="text-gray-400 text-sm">Welcome to VibeWealth</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
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
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Let's set up your account
                    </h2>
                    <p className="text-gray-400">
                      First things first, let's get your profile set up.
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
                          <Image src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
                    <p className="text-xs text-gray-500 mt-1">JPG or PNG. 5MB max.</p>
                  </div>
                  <form className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                        {errors.firstName && <p className="text-sm text-red-400">{errors.firstName}</p>}
                      </div>
                      {/* Last Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                        {errors.lastName && <p className="text-sm text-red-400">{errors.lastName}</p>}
                      </div>
                    </div>
                    {/* User Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">User Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                      {errors.userName && <p className="text-sm text-red-400">{errors.userName}</p>}
                    </div>
                    {/* Date of Birth */}
                    <div className="space-y-2 col-span-1 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <DatePicker
                          selected={dob}
                          onChange={date => {
                            setDob(date);
                            handleInputChange("dob", date ? date.toISOString().split("T")[0] : "");
                          }}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date of birth"
                          className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.dob
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
                          }`}
                          maxDate={new Date()}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                      {errors.dob && <p className="text-sm text-red-400">{errors.dob}</p>}
                    </div>
                    {/* Country */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Country</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                        <Select
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
                          classNamePrefix="react-select"
                          placeholder="Select Country"
                          styles={{
                            control: base => ({
                              ...base,
                              paddingLeft: "2.5rem",
                            }),
                          }}
                          menuPlacement="top"
                        />
                      </div>
                      {errors.country && <p className="text-sm text-red-400">{errors.country}</p>}
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Preferences */}
              {currentStep === 2 && (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Configure your preferences</h2>
                    <p className="text-gray-400">Let's configure your preferences.</p>
                  </div>
                  {/* Example Account Display */}
                  <div className="bg-gray-700 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white font-medium mb-1">Example account</h3>
                        <div className="text-2xl font-bold text-white truncate">
                          {getCurrencySymbol(formData.currency)}
                          2,325.25
                        </div>
                        <div className="text-sm text-vibe-mint-400">
                          +{getCurrencySymbol(formData.currency)}78.90 (+3.39) as of 10-23-2024
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
                  <form className="space-y-6" noValidate>
                    {/* Color Theme */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Color theme</label>
                      <Select
                        options={[
                          { value: "system", label: "System" },
                          { value: "dark", label: "Dark" },
                          { value: "light", label: "Light" },
                        ]}
                        value={{
                          value: formData.colorTheme,
                          label:
                            formData.colorTheme.charAt(0).toUpperCase() +
                            formData.colorTheme.slice(1),
                        }}
                        onChange={opt => handleInputChange("colorTheme", opt?.value || "")}
                        classNamePrefix="react-select"
                        placeholder="Select Theme"
                      />
                    </div>
                    {/* Language */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Language</label>
                      <Select
                        options={[
                          { value: "en", label: "English (en)" },
                          { value: "es", label: "Spanish (es)" },
                          { value: "fr", label: "French (fr)" },
                          { value: "de", label: "German (de)" },
                        ]}
                        value={{
                          value: formData.language,
                          label:
                            {
                              en: "English (en)",
                              es: "Spanish (es)",
                              fr: "French (fr)",
                              de: "German (de)",
                            }[formData.language],
                        }}
                        onChange={opt => handleInputChange("language", opt?.value || "")}
                        classNamePrefix="react-select"
                        placeholder="Select Language"
                      />
                    </div>
                    {/* Currency */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Currency</label>
                      <Select
                        options={currencyOptions.map(c => ({
                          value: c.code,
                          label: `${c.symbol} ${c.name} (${c.code})`,
                        }))}
                        value={
                          formData.currency
                            ? {
                                value: formData.currency,
                                label: `${getSymbolFromCurrency(formData.currency) || formData.currency} ${
                                  currencyOptions.find(c => c.code === formData.currency)?.name || ""
                                } (${formData.currency})`,
                              }
                            : null
                        }
                        onChange={opt => handleInputChange("currency", opt?.value || "")}
                        classNamePrefix="react-select"
                        placeholder="Select Currency"
                      />
                    </div>
                    {/* Date Format */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Date format</label>
                      <Select
                        options={[
                          { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
                          { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
                          { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                        ]}
                        value={{
                          value: formData.dateFormat,
                          label: formData.dateFormat,
                        }}
                        onChange={opt => handleInputChange("dateFormat", opt?.value || "")}
                        classNamePrefix="react-select"
                        placeholder="Select Date Format"
                      />
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Goals */}
              {currentStep === 3 && (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">What brings you to VibeWealth?</h2>
                    <p className="text-gray-400">Help us understand your financial goals and preferences</p>
                  </div>
                  <form className="space-y-6" noValidate>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">What brings you here? *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
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
                        ].map(option => (
                          <button
                            type="button"
                            key={option.value}
                            onClick={() => handleInputChange("bringHere", option.value)}
                            className={`flex flex-col items-start p-6 rounded-2xl border-2 transition-all w-full h-full text-left ${
                              formData.bringHere === option.value
                                ? "border-vibe-purple-400 bg-gray-700"
                                : "border-gray-600 hover:border-vibe-purple-400 bg-gray-800"
                            }`}
                          >
                            {option.icon}
                            <span className="text-lg font-semibold text-white">{option.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.bringHere && <p className="text-sm text-red-400">{errors.bringHere}</p>}
                    </div>
                  </form>
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
                  <h2 className="text-3xl font-bold text-white mb-4">Welcome to VibeWealth!</h2>
                  <p className="text-gray-400 mb-2">
                    Hey {formData.firstName}! You're all set to start your financial journey.
                  </p>
                  <p className="text-gray-400 mb-8">
                    Let's help you achieve your goals and build the wealth you deserve.
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
                      currentStep === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
                        <span>{currentStep === 2 ? "Complete" : "Continue"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}