import getSymbolFromCurrency from "currency-symbol-map";
import currencyList from "currency-list";
import countries from "world-countries";


// --- Date formatting utility ---
export function formatDate(date: Date | null, format: string, lang: string) {
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
}

// --- Currency symbol utility ---
export function getCurrencySymbol(code: string) {
  return getSymbolFromCurrency(code) || code || "$";
}

// --- Steps definition ---
export const steps = [
  { number: 1, title: "Setup" },
  { number: 2, title: "Preferences" },
  { number: 3, title: "Goals" },
  { number: 4, title: "Start" },
];

// --- Country options ---
export const countryOptions = countries
  .sort((a, b) => a.name.common.localeCompare(b.name.common))
  .map((c) => ({
    code: c.cca2,
    name: c.name.common,
    flag: c.flag,
  }));

// --- Currency options ---
export const currencyOptions = Object.entries(currencyList.getAll("en")).map(
  ([code, { name }]) => ({
    code,
    name,
    symbol: getSymbolFromCurrency(code) || code,
  })
);

// --- Goal options ---
export const goalOptions = [
  { value: "budgeting", label: "Better budgeting", icon: "PiggyBank" },
  { value: "investing", label: "Start investing", icon: "TrendingUp" },
  { value: "saving", label: "Save for goals", icon: "Target" },
  { value: "learning", label: "Financial education", icon: "GraduationCap" },
  { value: "buyHome", label: "Buy a home", icon: "Home" },
  { value: "travel", label: "Travel & experiences", icon: "Plane" },
  { value: "health", label: "Healthcare planning", icon: "Heart" },
  { value: "business", label: "Start a business", icon: "Building" },
];

// --- Language map ---
export const languageMap: Record<string, string> = {
  en: "English (en)",
  es: "Spanish (es)",
  fr: "French (fr)",
  de: "German (de)",
};