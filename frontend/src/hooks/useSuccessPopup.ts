import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function useSuccessPopup(param: string = "signup") {
  const searchParams = useSearchParams();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const success = searchParams.get(param);
    if (success === "success") {
      setShowSuccessPopup(true);
      // Remove the param from the URL
      const url = new URL(window.location.href);
      url.searchParams.delete(param);
      window.history.replaceState({}, document.title, url.pathname + url.search);
    }
  }, [searchParams, param]);

  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => setShowSuccessPopup(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  return [showSuccessPopup, setShowSuccessPopup] as const;
}