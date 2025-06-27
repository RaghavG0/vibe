import { useState } from "react";

export function usePasswordMeterVisibility(password: string) {
  const [touched, setTouched] = useState(false);

  // Call this onFocus
  const handleFocus = () => setTouched(true);

  // Call this onChange
  const handleChange = () => {
    if (!touched) setTouched(true);
  };

  // Call this onBlur
  const handleBlur = () => {
    if (!password) setTouched(false);
  };

  return {
    passwordMeterVisible: touched,
    handleFocus,
    handleChange,
    handleBlur,
  };
}