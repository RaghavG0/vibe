import React from "react";
import { Sidebar } from "@/components/Dashboard/Sidebar"
import { cn } from "../../../lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// DashboardLayout wraps the sidebar and main content area.
// - Keeps sidebar persistent
// - Main content is scrollable and padded
// - Use className prop to extend/override styles if needed
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className="flex h-screen bg-dashboard-bg text-dashboard-text">
      {/* Sidebar */}
        <Sidebar />

      {/* Main Content */}
      <main className={cn("flex-1 overflow-hidden lg:ml-0", className)}>
        <div className="h-full overflow-y-auto px-4 lg:px-10 py-6 pt-20 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
};

/*
Advice:
- Keep DashboardLayout minimal; move header/toolbars into children for flexibility.
- For mobile, consider making Sidebar collapsible or hidden.
- Use CSS variables for easy theming.
*/