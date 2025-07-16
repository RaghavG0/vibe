import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/Dashboard/ThemeContext";
import { ArrowRight, Sun, Moon, Menu } from "lucide-react";

interface DashboardHeaderProps {
  pageName: string;
  onMenuClick?: () => void; // Optional: callback for menu button
}

// Theme toggle button for dashboard header (hidden on mobile)
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
      className="w-12 h-12 p-0 bg-dashboard-card border border-dashboard-border rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md hidden sm:inline-flex"
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

// DashboardHeader displays theme toggle (desktop), menu (mobile), breadcrumb, and logo
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  pageName,
  onMenuClick,
}) => {
  return (
    <div className="flex items-center justify-between sticky top-0 z-30 bg-dashboard-bg px-4 py-2">
      {/* Mobile: Menu button, Desktop: Theme toggle */}
      <div>
        {/* Menu button only on mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="w-12 h-12 p-0 rounded-2xl sm:hidden"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-dashboard-text" />
        </Button>
        {/* Theme toggle only on desktop */}
        <ThemeToggle />
      </div>

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
- Theme toggle is hidden on mobile (sm:hidden).
- Menu button is shown only on mobile (sm:hidden).
- Header is sticky and stays at the top on mobile.
- Pass an onMenuClick prop to handle menu opening.
*/