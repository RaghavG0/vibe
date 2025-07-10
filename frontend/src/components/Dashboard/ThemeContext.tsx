"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  actualTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "system",
}) => {
  const pathname = usePathname();

  // List of prefixes that should always use light theme
  const lightThemePrefixes = [
    "/",                        // Home page
    "/signup",                 
    "/forgot-password",        
    "/onboarding",             
  ];

  // Should force light theme on matching paths
  const shouldForceLight = lightThemePrefixes.some(prefix =>
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibe-theme");
      return (saved as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [actualTheme, setActualTheme] = useState<ResolvedTheme>("light");

  const applyTheme = (nextTheme: Theme) => {
    localStorage.setItem("vibe-theme", nextTheme);
    setThemeState(nextTheme);

    let resolved: ResolvedTheme;
    if (nextTheme === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      resolved = nextTheme;
    }

    setActualTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
  };

  useEffect(() => {
    if (shouldForceLight) {
      setActualTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      applyTheme(theme);
    }
  }, [theme, shouldForceLight]);

  useEffect(() => {
    if (theme === "system" && !shouldForceLight) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handle = () => applyTheme("system");
      media.addEventListener("change", handle);
      return () => media.removeEventListener("change", handle);
    }
  }, [theme, shouldForceLight]);

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
