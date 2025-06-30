import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Hook to detect if the viewport is mobile-sized
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

/*
Advice:
- Use this hook to conditionally render mobile layouts/components.
- For SSR, initial value is undefined; always check for client before using.
- You can extend this for more breakpoints if needed.
*/