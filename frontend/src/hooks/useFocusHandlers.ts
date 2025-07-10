import { useState } from "react";

export function useFocusHandlers() {
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);

  return {
    focused,
    setFocused,
    open,
    setOpen,
  };
}