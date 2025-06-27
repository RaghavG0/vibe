import React from "react";
import { Sparkles, Globe, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Select from "../SelectClient";
import { Button } from "@/components/landing/button";
import type { FormData, CurrencyOption } from "../type";
import type { RefObject } from "react";
import type { SelectInstance, GroupBase } from "react-select";

type OptionType = { value: string; label: React.ReactNode };

interface Step2PreferencesProps {
  formData: FormData;
  handleInputChange: (field: string, value: string) => void;
  goPrevious: () => void;
  goNext: () => void;
  colorThemeSelectRef: RefObject<SelectInstance<OptionType, false, GroupBase<OptionType>> | null>;
  languageSelectRef: RefObject<SelectInstance<OptionType, false, GroupBase<OptionType>> | null>;
  currencySelectRef: RefObject<SelectInstance<OptionType, false, GroupBase<OptionType>> | null>;
  dateFormatSelectRef: RefObject<SelectInstance<OptionType, false, GroupBase<OptionType>> | null>;
  colorThemeFocused: boolean;
  setColorThemeFocused: (v: boolean) => void;
  languageFocused: boolean;
  setLanguageFocused: (v: boolean) => void;
  currencyFocused: boolean;
  setCurrencyFocused: (v: boolean) => void;
  dateFormatFocused: boolean;
  setDateFormatFocused: (v: boolean) => void;
  currencyOptions: CurrencyOption[];
  languageMap: Record<string, string>;
  getCurrencySymbol: (code: string) => string;
  formatDate: (date: Date, format: string, lang: string) => string;
}

const Step2Preferences: React.FC<Step2PreferencesProps> = ({
  formData,
  handleInputChange,
  goPrevious,
  goNext,
  colorThemeSelectRef,
  languageSelectRef,
  currencySelectRef,
  dateFormatSelectRef,
  colorThemeFocused,
  setColorThemeFocused,
  languageFocused,
  setLanguageFocused,
  currencyFocused,
  setCurrencyFocused,
  dateFormatFocused,
  setDateFormatFocused,
  currencyOptions,
  languageMap,
  getCurrencySymbol,
  formatDate,
}) => (
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
      <div className="mb-7">
        <label className="text-base font-medium text-gray-300 block">Color theme</label>
        <div
          className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer
            border-gray-700 focus-within:ring-2 focus-within:ring-vibe-purple-500 focus-within:border-transparent
          `}
          onClick={() => {
            document.querySelector<HTMLInputElement>('.color-theme-select input')?.focus();
          }}
        >
          <Sparkles
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-gray-400 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              setColorThemeFocused(true);
              colorThemeSelectRef.current?.focus();
              colorThemeSelectRef.current?.onMenuOpen?.();
            }}
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
              setColorThemeFocused(true);
              colorThemeSelectRef.current?.focus();
              colorThemeSelectRef.current?.onMenuOpen?.();
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <Select
            classNamePrefix="react-select"
            ref={colorThemeSelectRef}
            closeMenuOnSelect={true}
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
            placeholder={<span className="flex items-center"><span>Select Theme</span></span>}
            onFocus={() => {
              setColorThemeFocused(true);
              colorThemeSelectRef.current?.onMenuOpen?.();
            }}
            onBlur={() => setColorThemeFocused(false)}
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
                caretColor: "transparent",
                pointerEvents: "none",
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
                maxHeight: 250,
                overflowY: "auto",
                touchAction: "auto",
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
          className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer
            border-gray-700 focus-within:ring-2 focus-within:ring-vibe-purple-500 focus-within:border-transparent
          `}
          onClick={() => {
            document.querySelector<HTMLInputElement>('.language-select input')?.focus();
          }}
        >
          <Globe
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              setLanguageFocused(true);
              languageSelectRef.current?.focus();
              languageSelectRef.current?.onMenuOpen?.();
            }}
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
              setLanguageFocused(true);
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
            closeMenuOnSelect={true}
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
            onFocus={() => {
              setLanguageFocused(true);
              languageSelectRef.current?.onMenuOpen?.();
            }}
            onBlur={() => setLanguageFocused(false)}
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
                caretColor: "transparent",
                pointerEvents: "none",
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
                maxHeight: 250,
                overflowY: "auto",
                touchAction: "auto",
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
          className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer
            border-gray-700 focus-within:ring-2 focus-within:ring-vibe-purple-500 focus-within:border-transparent
          `}
          onClick={() => {
            document.querySelector<HTMLInputElement>('.currency-select input')?.focus();
          }}
        >
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              setCurrencyFocused(true);
              currencySelectRef.current?.focus();
              currencySelectRef.current?.onMenuOpen?.();
            }}
          >
            {getCurrencySymbol(formData.currency) || "$"}
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
              setCurrencyFocused(true);
              currencySelectRef.current?.focus();
              currencySelectRef.current?.onMenuOpen?.();
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <Select
            classNamePrefix="react-select"
            ref={currencySelectRef}
            closeMenuOnSelect={true}
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
                // DO NOT hide caret or pointer events for currency
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
                maxHeight: 250,
                overflowY: "auto",
                touchAction: "auto",
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
          className={`relative w-full h-12 bg-gray-800 border rounded-xl transition-all cursor-pointer
            border-gray-700 focus-within:ring-2 focus-within:ring-vibe-purple-500 focus-within:border-transparent
          `}
          onClick={() => {
            document.querySelector<HTMLInputElement>('.date-format-select input')?.focus();
          }}
        >
          <Calendar
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              setDateFormatFocused(true);
              dateFormatSelectRef.current?.focus();
              dateFormatSelectRef.current?.onMenuOpen?.();
            }}
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
              setDateFormatFocused(true);
              dateFormatSelectRef.current?.focus();
              dateFormatSelectRef.current?.onMenuOpen?.();
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <Select
            classNamePrefix="react-select"
            ref={dateFormatSelectRef}
            closeMenuOnSelect={true}
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
            onFocus={() => {
              setDateFormatFocused(true);
              dateFormatSelectRef.current?.onMenuOpen?.();
            }}
            onBlur={() => setDateFormatFocused(false)}
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
                caretColor: "transparent",
                pointerEvents: "none",
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
                maxHeight: 250,
                overflowY: "auto",
                touchAction: "auto",
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

export default Step2Preferences;