import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/Dashboard/ThemeContext";
import { ArrowRight, Sun, Moon } from "lucide-react";

interface DashboardHeaderProps {
  pageName: string;
}

// Theme toggle button for dashboard header
const ThemeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-12 h-12 p-0 bg-dashboard-card border border-dashboard-border rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-dashboard-text-muted" />
      ) : (
        <Moon className="w-5 h-5 text-dashboard-text-muted" />
      )}
    </Button>
  );
};


// DashboardHeader displays theme toggle, breadcrumb, and logo
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  pageName,
}) => {
  return (
    <div className="flex items-center justify-between">
      <ThemeToggle />

      <div className="flex items-center gap-2 text-sm">
        <span className="text-dashboard-text-muted">Home</span>
        <ArrowRight className="w-4 h-4 text-dashboard-text" />
        <span className="font-medium text-dashboard-text">
          {pageName}
        </span>
      </div>

      {/* Centered V Logo */}
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-xl">V</span>
      </div>
    </div>
  );
};

/*
Advice:
- Keep header minimal and focused on navigation and theme.
- For more pages, consider making breadcrumb dynamic.
- Logo can be replaced with your SVG or image for branding.
*/