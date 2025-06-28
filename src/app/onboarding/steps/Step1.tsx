"use client";
import React, { RefObject, useState, useRef } from "react";
import Image from "next/image";
import { User, Calendar, Camera, Globe, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/landing/button";
import type { FormData } from "../type";
import type { SelectInstance } from "react-select";
import ReactDatePicker from "react-datepicker";

// Utility for conditional classes
function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

type CountryOptionType = { value: string; label: string };

interface Step1PersonalInfoProps {
  formData: FormData;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  profilePhoto: string | null;
  fileInputRef: RefObject<HTMLInputElement>;
  dob: Date | null;
  setDob: (date: Date | null) => void;
  handleInputChange: (field: string, value: string) => void;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  goPrevious: () => void;
  goNext: () => void;
  dobWrapperRef: RefObject<HTMLDivElement>;
  dobFocused: boolean;
  dobOpen: boolean;
  setDobFocused: (v: boolean) => void;
  setDobOpen: (v: boolean) => void;
  countryOptions: { name: string; flag: string }[];
  countrySelectRef: RefObject<SelectInstance<CountryOptionType, false> | null>;
  countryFocused: boolean;
  setCountryFocused: (v: boolean) => void;
  datePickerRef: RefObject<ReactDatePicker | null>;
}

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({
  formData,
  errors,
  setErrors,
  profilePhoto,
  fileInputRef,
  dob,
  setDob,
  handleInputChange,
  handlePhotoUpload,
  goPrevious,
  goNext,
  dobWrapperRef,
  dobFocused,
  dobOpen,
  setDobFocused,
  setDobOpen,
  countryOptions,
  countryFocused,
  setCountryFocused,
  datePickerRef,
}) => {
  // For country input and dropdown
  const [countryInput, setCountryInput] = useState("");
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [countryHoveredIdx, setCountryHoveredIdx] = useState<number | null>(null);
  const [isCountryTyping, setIsCountryTyping] = useState(false);
  const countryInputRef = useRef<HTMLInputElement>(null);

  // Show all countries if input is empty, otherwise filter
  const filteredCountries = countryInput === ""
    ? countryOptions
    : countryOptions.filter(c =>
        c.name.toLowerCase().includes(countryInput.toLowerCase())
      );

  // Get selected country for placeholder
  const selectedCountry = countryOptions.find(c => c.name === formData.country);

  // When formData.country changes (from parent), update input if not typing
  React.useEffect(() => {
    if (!isCountryTyping) {
      setCountryInput("");
    }
  }, [formData.country, isCountryTyping]);

  // Handle input focus: open menu, clear input, show all options
  const handleCountryFocus = () => {
    setCountryFocused(true);
    setCountryMenuOpen(true);
    setCountryInput("");
    setIsCountryTyping(false);
    setDobFocused(false);
  };

  // Handle input click: open menu, clear input, show all options
  const handleCountryClick = () => {
    setCountryMenuOpen(true);
    setCountryInput("");
    setIsCountryTyping(false);
  };

  // Handle input blur: close menu, reset typing state
  const handleCountryBlur = () => {
    setTimeout(() => {
      setCountryFocused(false);
      setCountryMenuOpen(false);
      setIsCountryTyping(false);
      setCountryInput(""); // Reset input so selected country shows
    }, 100);
  };

  // Handle input change: filter options, keep menu open, mark as typing
  const handleCountryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryInput(e.target.value);
    setCountryMenuOpen(true);
    setIsCountryTyping(true);
    handleInputChange("country", e.target.value);
  };

  // Handle country select: set value, close menu, blur input, reset input
  const handleCountrySelect = (c: { name: string; flag: string }) => {
    setCountryInput(""); // Reset input so selected country shows
    handleInputChange("country", c.name);
    setCountryMenuOpen(false);
    setCountryFocused(false);
    setIsCountryTyping(false);
    // Blur input to remove blinking cursor
    countryInputRef.current?.blur();
  };

  return (
    <div className="p-4 sm:p-8">
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
          type="button"
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

          let hasError = false;
          const newErrors: Record<string, string> = {};

          if (!formData.firstName) {
            newErrors.firstName = "First name is required.";
            hasError = true;
          }
          if (!formData.lastName) {
            newErrors.lastName = "Last name is required.";
            hasError = true;
          }
          if (!formData.userName) {
            newErrors.userName = "User name is required.";
            hasError = true;
          }
          if (!dob) {
            newErrors.dob = "Date of birth is required.";
            hasError = true;
          }
          if (!formData.country) {
            newErrors.country = "Country is required.";
            hasError = true;
          }

          setErrors({}); // Clear first to force re-render
          setTimeout(() => setErrors(newErrors), 0);

          if (!hasError) goNext();
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
              className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-all
                ${errors.dob
                  ? "border-red-500 ring-red-500"
                  : (dobFocused || dobOpen)
                    ? "border-vibe-purple-500 ring-vibe-purple-500 ring-2"
                    : "border-gray-700 focus:ring-2 focus:ring-vibe-purple-500 focus:border-transparent"
                }
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
                onClick={() => {
                  // Open the calendar programmatically
                  if (datePickerRef.current) {
                    datePickerRef.current.setOpen(true);
                  }
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <DatePicker
                ref={datePickerRef}
                selected={dob}
                onChange={(date) => {
                  setDob(date);
                  handleInputChange("dob", date ? date.toISOString().split("T")[0] : "");
                }}
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
                className="w-full pl-10 pr-20 py-3 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                autoComplete="off"
                isClearable
                onFocus={() => {
                  setDobFocused(true);
                  setCountryFocused(false);
                  // Open calendar on focus (tab)
                  if (datePickerRef.current) {
                    datePickerRef.current.setOpen(true);
                  }
                }}
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
          {/* Country Field - Custom Input & Dropdown */}
          <div>
            <label className="text-base font-medium text-gray-300 block">Country</label>
            <div
              className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer z-20
                ${errors.country
                  ? "border-red-500 ring-red-500"
                  : countryFocused
                  ? "border-vibe-purple-500 ring-vibe-purple-500 ring-2"
                  : "border-gray-700 focus:ring-2 focus:ring-vibe-purple-500 focus:border-transparent"
                }`
              }
            >
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
              <input
                ref={countryInputRef}
                type="text"
                className="w-full h-12 pl-10 pr-10 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                value={
                  countryFocused || countryMenuOpen || isCountryTyping
                    ? countryInput
                    : selectedCountry
                    ? `${selectedCountry.flag} ${selectedCountry.name}`
                    : ""
                }
                placeholder="Select Country"
                onFocus={handleCountryFocus}
                onClick={handleCountryClick}
                onBlur={handleCountryBlur}
                onChange={handleCountryInputChange}
                tabIndex={0}
                autoComplete="off"
                readOnly={false}
              />
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 cursor-pointer"
                onMouseDown={e => {
                  e.preventDefault();
                  setCountryMenuOpen(v => !v);
                  setCountryFocused(true);
                  setCountryInput("");
                  setIsCountryTyping(false);
                  setTimeout(() => {
                    countryInputRef.current?.focus();
                  }, 0);
                }}
              />
              {countryMenuOpen && (
                <ul
                  className="absolute bottom-full mb-2 w-full rounded-xl bg-[#23293a] border border-gray-700 shadow-2xl z-50 max-h-80 overflow-y-auto py-1 text-base focus:outline-none sm:text-sm"
                  style={{
                    touchAction: "pan-y",
                    WebkitOverflowScrolling: "touch",
                    overscrollBehavior: "contain",
                    padding: 0,
                  }}
                >
                  {filteredCountries.length === 0 && (
                    <li className="text-gray-400 px-4 py-2">No countries found</li>
                  )}
                  {filteredCountries.map((c, idx) => {
                    const isSelected = formData.country === c.name;
                    const isActive = idx === countryHoveredIdx;
                    return (
                      <li
                        key={c.name}
                        className={classNames(
                          "cursor-pointer select-none relative py-2 pl-10 pr-4 flex items-center transition-colors",
                          isSelected
                            ? "bg-vibe-purple-500 text-white"
                            : isActive
                            ? "bg-blue-600/70 text-white"
                            : "text-gray-200"
                        )}
                        style={{
                          borderRadius: idx === 0
                            ? "0.75rem 0.75rem 0 0"
                            : idx === filteredCountries.length - 1
                            ? "0 0 0.75rem 0.75rem"
                            : undefined,
                          margin: 0,
                        }}
                        onMouseDown={e => {
                          e.preventDefault();
                          handleCountrySelect(c);
                        }}
                        onMouseEnter={() => setCountryHoveredIdx(idx)}
                        onMouseLeave={() => setCountryHoveredIdx(null)}
                      >
                        <span className="block truncate">{c.flag} {c.name}</span>
                        {isSelected && (
                          <span className="absolute right-4 text-white font-bold">&#10003;</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {errors.country && <p className="text-sm text-red-400 mt-2">{errors.country}</p>}
          </div>
        </div>
        {/* Navigation Buttons for Step 1 */}
        <div className="flex flex-row justify-between items-center gap-4 pt-4">
          <Button
            onClick={goPrevious}
            disabled={false}
            variant="outline"
            className="h-12 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer"
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
      {/* Style fix for react-datepicker clear icon */}
      <style>{`
        .react-datepicker__close-icon {
          right: 2.5rem !important;
        }
      `}</style>
    </div>
  );
};

export default Step1PersonalInfo;