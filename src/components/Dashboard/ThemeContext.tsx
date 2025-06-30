"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibe-theme");
      return (saved as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [actualTheme, setActualTheme] = useState<ResolvedTheme>("dark");

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
    applyTheme(theme);
  }, [theme]);

  // Sync with system preference
  useEffect(() => {
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handle = () => applyTheme("system");
      media.addEventListener("change", handle);
      return () => media.removeEventListener("change", handle);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
