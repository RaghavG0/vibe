"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Globe, Calendar, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/landing/button";
import type { FormData, CurrencyOption } from "../type";

type OptionType = { value: string; label: string; icon?: React.ReactNode };

// Utility for conditional classes
function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

interface Step2PreferencesProps {
  formData: FormData;
  handleInputChange: (field: string, value: string) => void;
  goPrevious: () => void;
  goNext: () => void;
  currencyOptions: CurrencyOption[];
  languageMap: Record<string, string>;
  getCurrencySymbol: (code: string) => string;
  formatDate: (date: Date, format: string, lang: string) => string;
}

const colorThemeOptions: OptionType[] = [
  { value: "system", label: "System", icon: <Sparkles className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
  { value: "dark", label: "Dark", icon: <Sparkles className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
  { value: "light", label: "Light", icon: <Sparkles className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
];

const languageOptions: OptionType[] = [
  { value: "en", label: "English (en)", icon: <Globe className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
  { value: "es", label: "Spanish (es)", icon: <Globe className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
  { value: "fr", label: "French (fr)", icon: <Globe className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
  { value: "de", label: "German (de)", icon: <Globe className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
];

const dateFormatOptions: OptionType[] = [
  { value: "MM-DD-YYYY", label: "MM-DD-YYYY", icon: <Calendar className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
  { value: "DD-MM-YYYY", label: "DD-MM-YYYY", icon: <Calendar className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD", icon: <Calendar className="w-5 h-5 mr-2 -mt-1 text-gray-400" /> },
];

const INR_CODE = "INR";

const Step2Preferences: React.FC<Step2PreferencesProps> = ({
  formData,
  handleInputChange,
  goPrevious,
  goNext,
  currencyOptions,
  languageMap,
  getCurrencySymbol,
  formatDate,
}) => {
  // Dropdown state for each field
  const [colorThemeOpen, setColorThemeOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [dateFormatOpen, setDateFormatOpen] = useState(false);

  // Active index for keyboard navigation in dropdowns
  const [colorThemeActiveIdx, setColorThemeActiveIdx] = useState<number | null>(null);
  const [languageActiveIdx, setLanguageActiveIdx] = useState<number | null>(null);
  const [dateFormatActiveIdx, setDateFormatActiveIdx] = useState<number | null>(null);

  // Inputs for currency search
  const [currencyInput, setCurrencyInput] = useState("");
  const [currencyActiveIdx, setCurrencyActiveIdx] = useState<number | null>(null);
  const currencyInputRef = useRef<HTMLInputElement>(null);

  // Filtering logic for currency
  const filteredCurrencies = currencyOptions.filter(opt =>
    (opt.name + " " + opt.code).toLowerCase().includes(currencyInput.toLowerCase())
  );

  // Helper for dropdown menu style
  const dropdownMenuClass =
    "absolute top-full mt-2 w-full rounded-xl bg-[#23293a] border border-gray-700 shadow-2xl z-50 max-h-80 overflow-y-auto py-1 text-base focus:outline-none sm:text-sm";
  const dropdownMenuClassUp =
    "absolute bottom-full mb-2 w-full rounded-xl bg-[#23293a] border border-gray-700 shadow-2xl z-50 max-h-80 overflow-y-auto py-1 text-base focus:outline-none sm:text-sm";

  // Helper for dropdown item style
  // Selected: purple, Focused/Hover: lighter blue, Default: gray
  function dropdownItemClass(isSelected: boolean, isActive: boolean) {
    return classNames(
      "cursor-pointer select-none relative py-2 pl-10 pr-4 flex items-center transition-colors",
      isSelected && isActive
        ? "bg-vibe-purple-500 text-white" // If both selected and focused, keep selected color
        : isSelected
        ? "bg-vibe-purple-500 text-white"
        : isActive
        ? "bg-blue-600/70 text-white"
        : "text-gray-200"
    );
  }

  // Currency icon helper
  const getCurrencyIcon = (code: string) =>
    <span className="w-5 h-5 mr-2 -mt-1 text-gray-400">{getCurrencySymbol(code) || "$"}</span>;

  // Get selected objects
  const selectedColorTheme = colorThemeOptions.find(opt => opt.value === formData.colorTheme);
  const selectedLanguage = languageOptions.find(opt => opt.value === formData.language);
  const selectedCurrency = currencyOptions.find(opt => opt.code === formData.currency);
  const selectedDateFormat = dateFormatOptions.find(opt => opt.value === formData.dateFormat);

  // --- Add refs for focus detection ---
  const colorThemeRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const dateFormatRef = useRef<HTMLDivElement>(null);

  // --- Set initial value for currency to INR (Indian Rupee) ---
  useEffect(() => {
    if (!formData.currency) {
      const inrOption = currencyOptions.find(opt => opt.code === INR_CODE);
      if (inrOption) {
        handleInputChange("currency", INR_CODE);
        setCurrencyInput(""); // keep input empty for placeholder
      }
    }
    // eslint-disable-next-line
  }, [currencyOptions]);

  // --- Fix tabbing glitch: close currency dropdown on blur and clear input ---
  function handleCurrencyBlur() {
    setTimeout(() => {
      setCurrencyOpen(false);
      setCurrencyActiveIdx(null);
      setCurrencyInput(""); // clear input so placeholder shows again
    }, 100);
  }

  // --- Dropdown open/close and blur logic for all fields ---
  // Color Theme
  function handleColorThemeFocus() {
    if (!colorThemeOpen) {
      setColorThemeOpen(true);
      setColorThemeActiveIdx(null);
    }
  }
  function handleColorThemeClick() {
    if (!colorThemeOpen) {
      setColorThemeOpen(true);
      setColorThemeActiveIdx(null);
    }
  }
  // Language
  function handleLanguageFocus() {
    if (!languageOpen) {
      setLanguageOpen(true);
      setLanguageActiveIdx(null);
    }
  }
  function handleLanguageClick() {
    if (!languageOpen) {
      setLanguageOpen(true);
      setLanguageActiveIdx(null);
    }
  }
  // Date Format
  function handleDateFormatFocus() {
    if (!dateFormatOpen) {
      setDateFormatOpen(true);
      setDateFormatActiveIdx(null);
    }
  }
  function handleDateFormatClick() {
    if (!dateFormatOpen) {
      setDateFormatOpen(true);
      setDateFormatActiveIdx(null);
    }
  }

  // --- Keyboard navigation handlers for dropdowns ---
  // Only ArrowUp/ArrowDown/Enter/Escape are handled, Tab is left for field navigation

  // Color Theme Dropdown Keyboard Navigation
  function handleColorThemeKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!colorThemeOpen) return;
    if (colorThemeOptions.length === 0) return;
    if (e.key === "ArrowDown") {
      setColorThemeActiveIdx(idx => {
        if (idx === null || idx === colorThemeOptions.length - 1) return 0;
        return idx + 1;
      });
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setColorThemeActiveIdx(idx => {
        if (idx === null || idx === 0) return colorThemeOptions.length - 1;
        return idx - 1;
      });
      e.preventDefault();
    } else if (e.key === "Enter" && colorThemeActiveIdx !== null) {
      const opt = colorThemeOptions[colorThemeActiveIdx];
      handleInputChange("colorTheme", opt.value);
      setColorThemeOpen(false);
      setColorThemeActiveIdx(null);
      colorThemeRef.current?.blur();
      e.preventDefault();
    } else if (e.key === "Escape") {
      setColorThemeOpen(false);
      setColorThemeActiveIdx(null);
      e.preventDefault();
    }
  }

  // Language Dropdown Keyboard Navigation
  function handleLanguageKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!languageOpen) return;
    if (languageOptions.length === 0) return;
    if (e.key === "ArrowDown") {
      setLanguageActiveIdx(idx => {
        if (idx === null || idx === languageOptions.length - 1) return 0;
        return idx + 1;
      });
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setLanguageActiveIdx(idx => {
        if (idx === null || idx === 0) return languageOptions.length - 1;
        return idx - 1;
      });
      e.preventDefault();
    } else if (e.key === "Enter" && languageActiveIdx !== null) {
      const opt = languageOptions[languageActiveIdx];
      handleInputChange("language", opt.value);
      setLanguageOpen(false);
      setLanguageActiveIdx(null);
      languageRef.current?.blur();
      e.preventDefault();
    } else if (e.key === "Escape") {
      setLanguageOpen(false);
      setLanguageActiveIdx(null);
      e.preventDefault();
    }
  }

  // Date Format Dropdown Keyboard Navigation
  function handleDateFormatKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!dateFormatOpen) return;
    if (dateFormatOptions.length === 0) return;
    if (e.key === "ArrowDown") {
      setDateFormatActiveIdx(idx => {
        if (idx === null || idx === dateFormatOptions.length - 1) return 0;
        return idx + 1;
      });
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setDateFormatActiveIdx(idx => {
        if (idx === null || idx === 0) return dateFormatOptions.length - 1;
        return idx - 1;
      });
      e.preventDefault();
    } else if (e.key === "Enter" && dateFormatActiveIdx !== null) {
      const opt = dateFormatOptions[dateFormatActiveIdx];
      handleInputChange("dateFormat", opt.value);
      setDateFormatOpen(false);
      setDateFormatActiveIdx(null);
      dateFormatRef.current?.blur();
      e.preventDefault();
    } else if (e.key === "Escape") {
      setDateFormatOpen(false);
      setDateFormatActiveIdx(null);
      e.preventDefault();
    }
  }

  // Currency Dropdown Keyboard Navigation (Tab is NOT used for options)
  function handleCurrencyKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!currencyOpen) return;
    if (filteredCurrencies.length === 0) return;
    if (e.key === "ArrowDown") {
      setCurrencyActiveIdx(idx => {
        if (idx === null || idx === filteredCurrencies.length - 1) return 0;
        return idx + 1;
      });
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setCurrencyActiveIdx(idx => {
        if (idx === null || idx === 0) return filteredCurrencies.length - 1;
        return idx - 1;
      });
      e.preventDefault();
    } else if (e.key === "Enter" && currencyActiveIdx !== null) {
      const opt = filteredCurrencies[currencyActiveIdx];
      setCurrencyInput(""); // Clear input for next time
      handleInputChange("currency", opt.code);
      setCurrencyOpen(false);
      setCurrencyActiveIdx(null);
      currencyInputRef.current?.blur();
      e.preventDefault();
    } else if (e.key === "Escape") {
      setCurrencyOpen(false);
      setCurrencyActiveIdx(null);
      e.preventDefault();
    } else if (e.key === "Tab") {
      setCurrencyOpen(false);
      setCurrencyActiveIdx(null);
    }
  }

  return (
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
            {getCurrencySymbol(formData.currency)} 2,325.25
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
        <div>
          <label className="text-base font-medium text-gray-300 block">Color theme</label>
          <div
            ref={colorThemeRef}
            className={classNames(
              "relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer flex items-center focus:outline-none",
              colorThemeOpen
                ? "border-vibe-purple-500 ring-vibe-purple-500 ring-2"
                : "border-gray-700 focus:ring-2 focus:ring-vibe-purple-500 focus:border-transparent"
            )}
            tabIndex={0}
            onFocus={handleColorThemeFocus}
            onClick={handleColorThemeClick}
            onBlur={() => setTimeout(() => setColorThemeOpen(false), 100)}
            onKeyDown={handleColorThemeKeyDown}
          >
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-gray-400" />
            <span className="ml-10 truncate text-white">
              {selectedColorTheme?.label || "Select Theme"}
            </span>
            <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
            {colorThemeOpen && (
              <ul className={dropdownMenuClass} style={{
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                padding: 0,
              }}>
                {colorThemeOptions.map((opt, idx) => (
                  <li
                    key={opt.value}
                    className={dropdownItemClass(formData.colorTheme === opt.value, idx === colorThemeActiveIdx)}
                    style={{
                      borderRadius: idx === 0
                        ? "0.75rem 0.75rem 0 0"
                        : idx === colorThemeOptions.length - 1
                        ? "0 0 0.75rem 0.75rem"
                        : undefined,
                      margin: 0,
                    }}
                    onMouseDown={e => {
                      e.preventDefault();
                      handleInputChange("colorTheme", opt.value);
                      setColorThemeOpen(false);
                      setColorThemeActiveIdx(null);
                      colorThemeRef.current?.blur();
                    }}
                    onMouseEnter={() => setColorThemeActiveIdx(idx)}
                    onMouseLeave={() => setColorThemeActiveIdx(null)}
                  >
                    <span className="flex items-center">{opt.icon}{opt.label}</span>
                    {formData.colorTheme === opt.value && (
                      <span className="absolute right-4 text-white font-bold">&#10003;</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Language */}
        <div>
          <label className="text-base font-medium text-gray-300 block">Language</label>
          <div
            ref={languageRef}
            className={classNames(
              "relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer flex items-center focus:outline-none",
              languageOpen
                ? "border-vibe-purple-500 ring-vibe-purple-500 ring-2"
                : "border-gray-700 focus:ring-2 focus:ring-vibe-purple-500 focus:border-transparent"
            )}
            tabIndex={0}
            onFocus={handleLanguageFocus}
            onClick={handleLanguageClick}
            onBlur={() => setTimeout(() => setLanguageOpen(false), 100)}
            onKeyDown={handleLanguageKeyDown}
          >
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <span className="ml-10 truncate text-white">
              {selectedLanguage?.label || "Select Language"}
            </span>
            <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
            {languageOpen && (
              <ul className={dropdownMenuClass} style={{
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                padding: 0,
              }}>
                {languageOptions.map((opt, idx) => (
                  <li
                    key={opt.value}
                    className={dropdownItemClass(formData.language === opt.value, idx === languageActiveIdx)}
                    style={{
                      borderRadius: idx === 0
                        ? "0.75rem 0.75rem 0 0"
                        : idx === languageOptions.length - 1
                        ? "0 0 0.75rem 0.75rem"
                        : undefined,
                      margin: 0,
                    }}
                    onMouseDown={e => {
                      e.preventDefault();
                      handleInputChange("language", opt.value);
                      setLanguageOpen(false);
                      setLanguageActiveIdx(null);
                      languageRef.current?.blur();
                    }}
                    onMouseEnter={() => setLanguageActiveIdx(idx)}
                    onMouseLeave={() => setLanguageActiveIdx(null)}
                  >
                    <span className="flex items-center">{opt.icon}{opt.label}</span>
                    {formData.language === opt.value && (
                      <span className="absolute right-4 text-white font-bold">&#10003;</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Currency */}
        <div>
          <label className="text-base font-medium text-gray-300 block">Currency</label>
          <div className="relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer border-gray-700 focus-within:ring-2 focus-within:ring-vibe-purple-500 focus-within:border-transparent">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10">
              {getCurrencySymbol(formData.currency) || "$"}
            </span>
            <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
            <input
              ref={currencyInputRef}
              type="text"
              className="w-full h-12 pl-10 pr-10 bg-transparent border-none text-white placeholder-white focus:outline-none"
              value={currencyInput}
              placeholder={
                selectedCurrency
                  ? `${selectedCurrency.name} (${formData.currency})`
                  : "Select Currency"
              }
              onFocus={() => {
                if (!currencyOpen) {
                  setCurrencyOpen(true);
                  setCurrencyInput("");
                  setCurrencyActiveIdx(null);
                }
              }}
              onClick={() => {
                if (!currencyOpen) {
                  setCurrencyOpen(true);
                  setCurrencyInput("");
                  setCurrencyActiveIdx(null);
                }
              }}
              onBlur={handleCurrencyBlur}
              onChange={e => {
                setCurrencyInput(e.target.value);
                setCurrencyOpen(true);
                setCurrencyActiveIdx(0);
              }}
              onKeyDown={handleCurrencyKeyDown}
              autoComplete="off"
              tabIndex={0}
            />
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 cursor-pointer"
              onMouseDown={e => {
                e.preventDefault();
                setCurrencyOpen(v => !v);
                if (!currencyOpen) setTimeout(() => currencyInputRef.current?.focus(), 0);
              }}
            />
            {currencyOpen && (
              <ul className={dropdownMenuClass} style={{
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                padding: 0,
              }}>
                {filteredCurrencies.length === 0 && (
                  <li className="text-gray-400 px-4 py-2">No currencies found</li>
                )}
                {filteredCurrencies.map((opt, idx) => {
                  const isSelected = formData.currency === opt.code;
                  const isActive = idx === currencyActiveIdx;
                  return (
                    <li
                      key={opt.code}
                      className={dropdownItemClass(isSelected, isActive)}
                      style={{
                        borderRadius: idx === 0
                          ? "0.75rem 0.75rem 0 0"
                          : idx === filteredCurrencies.length - 1
                          ? "0 0 0.75rem 0.75rem"
                          : undefined,
                        margin: 0,
                      }}
                      onMouseDown={e => {
                        e.preventDefault();
                        setCurrencyInput(""); // Clear input for next time
                        handleInputChange("currency", opt.code);
                        setCurrencyOpen(false);
                        setCurrencyActiveIdx(null);
                        currencyInputRef.current?.blur(); // <-- Blur input so cursor disappears
                      }}
                      onMouseEnter={() => setCurrencyActiveIdx(idx)}
                      onMouseLeave={() => setCurrencyActiveIdx(null)}
                    >
                      <span className="flex items-center">{getCurrencyIcon(opt.code)}{opt.name} ({opt.code})</span>
                      {isSelected && (
                        <span className="absolute right-4 text-white font-bold">&#10003;</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        {/* Date Format */}
        <div>
          <label className="text-base font-medium text-gray-300 block">Date format</label>
          <div
            ref={dateFormatRef}
            className={classNames(
              "relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer flex items-center focus:outline-none",
              dateFormatOpen
                ? "border-vibe-purple-500 ring-vibe-purple-500 ring-2"
                : "border-gray-700 focus:ring-2 focus:ring-vibe-purple-500 focus:border-transparent"
            )}
            tabIndex={0}
            onFocus={handleDateFormatFocus}
            onClick={handleDateFormatClick}
            onBlur={() => setTimeout(() => setDateFormatOpen(false), 100)}
            onKeyDown={handleDateFormatKeyDown}
          >
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <span className="ml-10 truncate text-white">
              {selectedDateFormat?.label || "Select Date Format"}
            </span>
            <div className="absolute right-10 top-2 bottom-2 w-px bg-gray-700 z-10" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
            {dateFormatOpen && (
              <ul className={dropdownMenuClassUp} style={{
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                padding: 0,
              }}>
                {dateFormatOptions.map((opt, idx) => (
                  <li
                    key={opt.value}
                    className={dropdownItemClass(formData.dateFormat === opt.value, idx === dateFormatActiveIdx)}
                    style={{
                      borderRadius: idx === 0
                        ? "0.75rem 0.75rem 0 0"
                        : idx === dateFormatOptions.length - 1
                        ? "0 0 0.75rem 0.75rem"
                        : undefined,
                      margin: 0,
                    }}
                    onMouseDown={e => {
                      e.preventDefault();
                      handleInputChange("dateFormat", opt.value);
                      setDateFormatOpen(false);
                      setDateFormatActiveIdx(null);
                      dateFormatRef.current?.blur();
                    }}
                    onMouseEnter={() => setDateFormatActiveIdx(idx)}
                    onMouseLeave={() => setDateFormatActiveIdx(null)}
                  >
                    <span className="flex items-center">{opt.icon}{opt.label}</span>
                    {formData.dateFormat === opt.value && (
                      <span className="absolute right-4 text-white font-bold">&#10003;</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </form>
      {/* Navigation Buttons for Step 2 */}
      <div className="flex flex-row justify-between items-center gap-4 pt-4">
        <Button
          onClick={goPrevious}
          variant="outline"
          className="h-12 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer"
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
  );
};

export default Step2Preferences;