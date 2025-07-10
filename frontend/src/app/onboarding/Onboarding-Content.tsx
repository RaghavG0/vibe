"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, TrendingUp, LogOut } from "lucide-react";
import StepIndicator from "./steps/StepIndicator";
import Step1PersonalInfo from "./steps/Step1";
import Step2Preferences from "./steps/Step2";
import Step3Goals from "./steps/Step3";
import Step4Welcome from "./steps/Step4";
import SuccessPopup from "./SuccessPopup";
import { useStepNavigation } from "@/hooks/useStepNavigation";
import { useSuccessPopup } from "@/hooks/useSuccessPopup";
import { useFocusHandlers } from "@/hooks/useFocusHandlers";
import {
  steps,
  countryOptions,
  currencyOptions,
  goalOptions,
  languageMap,
  getCurrencySymbol,
  formatDate,
} from "./utils";
import type { SelectInstance } from "react-select";
import DatePicker from "react-datepicker";

type CountryOptionType = { value: string; label: string };

export default function OnboardingContent() {
  const router = useRouter();
  const pathname = usePathname();

  // --- Success popup state (custom hook) ---
  const [showSuccessPopup] = useSuccessPopup("signup");

  // --- Form state ---
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
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [dob, setDob] = useState<Date | null>(null);

  // --- Refs for file and select controls ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dobWrapperRef = useRef<HTMLDivElement>(null);
  const countrySelectRef = useRef<SelectInstance<CountryOptionType, false> | null>(null);
  const datePickerRef = useRef<DatePicker | null>(null);

  // --- Focus handlers for selects and datepicker (custom hook) ---
  const dobFocus = useFocusHandlers();
  const countryFocus = useFocusHandlers();

  // --- Validation functions for each step ---
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

  // --- Step navigation logic (custom hook) ---
  const {
    currentStep,
    maxStepReached,
    goToStep,
    goNext,
    goPrevious,
  } = useStepNavigation([validateStep1, validateStep2, validateStep3], 4);

  // --- Handlers for form fields and photo upload ---
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePhoto(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // --- Complete onboarding action ---
  const completeOnboarding = () => {
    router.push("/dashboard");
  };

  // --- Sign out action ---
  const signOut = () => router.push("/");

  // --- Page-level effects ---
  useEffect(() => {
    document.body.classList.add("onboarding-page");
    return () => document.body.classList.remove("onboarding-page");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  // --- Render ---
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
      <SuccessPopup show={showSuccessPopup} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl mx-auto"
        >
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            maxStepReached={maxStepReached}
            goToStep={goToStep}
          />

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
              {currentStep === 1 && (
                <Step1PersonalInfo
                  formData={formData}
                  errors={errors}
                  setErrors={setErrors}
                  profilePhoto={profilePhoto}
                  fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
                  dob={dob}
                  setDob={setDob}
                  handleInputChange={handleInputChange}
                  handlePhotoUpload={handlePhotoUpload}
                  goPrevious={goPrevious}
                  goNext={goNext}
                  dobWrapperRef={dobWrapperRef as React.RefObject<HTMLDivElement>}
                  dobFocused={dobFocus.focused}
                  dobOpen={dobFocus.open}
                  setDobFocused={dobFocus.setFocused}
                  setDobOpen={dobFocus.setOpen}
                  countryOptions={countryOptions}
                  countrySelectRef={countrySelectRef}
                  countryFocused={countryFocus.focused}
                  setCountryFocused={countryFocus.setFocused}
                  datePickerRef={datePickerRef}
                />
              )}
              {currentStep === 2 && (
                <Step2Preferences
                  formData={formData}
                  handleInputChange={handleInputChange}
                  goPrevious={goPrevious}
                  goNext={goNext}
                  currencyOptions={currencyOptions}
                  languageMap={languageMap}
                  getCurrencySymbol={getCurrencySymbol}
                  formatDate={formatDate}
                />
              )}
              {currentStep === 3 && (
                <Step3Goals
                  formData={formData}
                  errors={errors}
                  goalOptions={goalOptions}
                  handleGoalToggle={handleGoalToggle}
                  goPrevious={goPrevious}
                  goNext={goNext}
                  currentStep={currentStep}
                />
              )}
              {currentStep === 4 && (
                <Step4Welcome
                  formData={formData}
                  goPrevious={goPrevious}
                  goNext={completeOnboarding}
                  currentStep={currentStep}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}