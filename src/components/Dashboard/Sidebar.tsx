"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../../lib/utils";
import {
  BarChart3,
  Target,
  BookOpen,
  Zap,
  MessageCircle,
  Settings,
  Menu,
  X,
  CreditCard,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationSections: NavSection[] = [
    {
      title: "MENU",
      items: [
        {
          href: "/dashboard",
          icon: BarChart3,
          label: "Dashboard",
        },
        {
          href: "/dashboard/transactions",
          icon: CreditCard,
          label: "Transactions",
        },
        {
          href: "/dashboard/dream-budget",
          icon: Target,
          label: "Dream Budget",
        },
        {
          href: "/dashboard/friendly-content",
          icon: BookOpen,
          label: "Friendly Content",
        },
        {
          href: "/dashboard/smart-nudges",
          icon: Zap,
          label: "Smart Nudges",
        },
        {
          href: "/dashboard/ai-chat",
          icon: MessageCircle,
          label: "AI Chat",
        },
        {
          href: "/dashboard/settings",
          icon: Settings,
          label: "Settings",
        },
      ],
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = () => {
    // Clear all stored user data
    if (typeof window !== "undefined") {
      localStorage.removeItem("user-logged-in");
      localStorage.removeItem("onboarding-completed");
      localStorage.removeItem("vibe-theme");
      localStorage.removeItem("user-signup-data");
    }
    // Navigate to landing page
    router.push("/");
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-dashboard-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-dashboard-text text-left">
              VibeWealth
            </h1>
            <p className="text-sm text-dashboard-text-muted text-left">
              Your Financial Companion
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-6">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="px-6 mb-4 text-xs font-medium text-dashboard-text-muted uppercase tracking-wider">
              {section.title}
            </h3>
            <nav className="space-y-2 px-3">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center lg:justify-start gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 group relative w-full",
                      isActive
                        ? "bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-purple-500 border border-purple-400/30 shadow-lg shadow-purple-500/10"
                        : "text-dashboard-text-muted hover:text-dashboard-text bg-white/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-md hover:border-gray-300/50 dark:hover:border-gray-600/50 shadow-sm",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 flex-shrink-0",
                        isActive ? "text-purple-500" : "",
                      )}
                    />
                    <span className="hidden lg:block flex-1 text-left">
                      {item.label}
                    </span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 hidden lg:block text-purple-500" />
                    )}

                    {/* Mobile tooltip */}
                    <div className="lg:hidden absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Sign Out Button */}
      <div className="p-6 border-t border-dashboard-border">
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center lg:justify-start gap-3 w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group shadow-sm hover:shadow-md relative"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="hidden lg:block flex-1 text-left">Sign Out</span>

          {/* Mobile tooltip */}
          <div className="lg:hidden absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
            Sign Out
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-dashboard-card border border-dashboard-border rounded-lg flex items-center justify-center text-dashboard-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col w-72 h-full bg-dashboard-sidebar border-r border-dashboard-border">
        {sidebarContent}
      </nav>

      {/* Mobile Sidebar */}
      <nav
        className={cn(
          "lg:hidden fixed left-0 top-0 h-full w-72 bg-dashboard-sidebar border-r border-dashboard-border transition-transform duration-300 ease-in-out z-40 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </nav>

      {/* Spacer for mobile when menu is closed */}
      <div className="lg:hidden w-0" />
    </>
  );
};