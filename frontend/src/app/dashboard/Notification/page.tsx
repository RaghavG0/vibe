"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/Dashboard/ThemeContext";
import {
  Bell,
  Search,
  Filter,
  Check,
  CheckCircle,
  X,
  AlertCircle,
  DollarSign,
  Calendar,
  CreditCard,
  Target,
  Gift,
  Trash2,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "../../../../lib/utils";

interface Notification {
  id: string;
  type:
    | "payment"
    | "income"
    | "budget"
    | "goal"
    | "achievement"
    | "reminder"
    | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  amount?: number;
  category?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "payment",
    title: "Payment Due Reminder",
    message: "Your electricity bill of $120 is due tomorrow",
    timestamp: "2 hours ago",
    isRead: false,
    priority: "high",
    amount: 120,
    category: "Bills",
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400",
  },
  {
    id: "2",
    type: "income",
    title: "Income Received",
    message: "Freelance payment of $540 has been credited",
    timestamp: "5 hours ago",
    isRead: false,
    priority: "medium",
    amount: 540,
    category: "Freelance",
    icon: TrendingUp,
    color: "text-green-600 dark:text-green-400",
  },
  {
    id: "3",
    type: "budget",
    title: "Budget Alert",
    message: "You've spent 80% of your monthly food budget",
    timestamp: "1 day ago",
    isRead: false,
    priority: "medium",
    category: "Food",
    icon: DollarSign,
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    id: "4",
    type: "goal",
    title: "Savings Goal Progress",
    message: "You're 65% towards your Japan trip goal! Keep going!",
    timestamp: "2 days ago",
    isRead: true,
    priority: "low",
    category: "Travel",
    icon: Target,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "5",
    type: "achievement",
    title: "Milestone Achieved!",
    message: "Congratulations! You've reached your $10,000 emergency fund goal",
    timestamp: "3 days ago",
    isRead: true,
    priority: "high",
    amount: 10000,
    category: "Emergency Fund",
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
  },
  {
    id: "6",
    type: "reminder",
    title: "Weekly Review",
    message:
      "Time for your weekly financial review. Check your spending patterns.",
    timestamp: "1 week ago",
    isRead: true,
    priority: "low",
    icon: Calendar,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "7",
    type: "system",
    title: "New Feature Available",
    message: "AI-powered spending insights are now available in your dashboard",
    timestamp: "1 week ago",
    isRead: false,
    priority: "low",
    icon: Gift,
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "8",
    type: "payment",
    title: "Credit Card Payment Processed",
    message: "Your credit card payment of $850 has been successfully processed",
    timestamp: "2 weeks ago",
    isRead: true,
    priority: "medium",
    amount: 850,
    category: "Credit Card",
    icon: CreditCard,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "9",
    type: "budget",
    title: "Monthly Budget Summary",
    message: "You saved $200 this month! Your spending was 15% under budget.",
    timestamp: "2 weeks ago",
    isRead: true,
    priority: "medium",
    icon: TrendingDown,
    color: "text-green-600 dark:text-green-400",
  },
];

const filterOptions = [
  { value: "all", label: "All Notifications" },
  { value: "unread", label: "Unread" },
  { value: "payment", label: "Payments" },
  { value: "income", label: "Income" },
  { value: "budget", label: "Budget" },
  { value: "goal", label: "Goals" },
  { value: "achievement", label: "Achievements" },
  { value: "reminder", label: "Reminders" },
  { value: "system", label: "System" },
];

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const toggleTheme = () => {
    if (actualTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-12 h-12 p-0 bg-dashboard-card border border-dashboard-border rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
      title={`Switch to ${actualTheme === "light" ? "dark" : "light"} mode`}
    >
      {actualTheme === "light" ? (
        <Moon className="w-5 h-5 text-dashboard-text-muted" />
      ) : (
        <Sun className="w-5 h-5 text-dashboard-text-muted" />
      )}
    </Button>
  );
};

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    [],
  );

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      (filterType === "unread" && !notification.isRead) ||
      notification.type === filterType;

    return matchesSearch && matchesFilter;
  });

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    setSelectedNotifications(selectedNotifications.filter((nId) => nId !== id));
  };

  // Toggle notification selection
  const toggleSelection = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id],
    );
  };

  // Select all notifications
  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map((n) => n.id));
  };

  // Deselect all
  const deselectAll = () => {
    setSelectedNotifications([]);
  };

  // Delete selected notifications
  const deleteSelected = () => {
    setNotifications(
      notifications.filter((n) => !selectedNotifications.includes(n.id)),
    );
    setSelectedNotifications([]);
  };

  // Mark selected as read
  const markSelectedAsRead = () => {
    setNotifications(
      notifications.map((n) =>
        selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n,
      ),
    );
    setSelectedNotifications([]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 h-full">
        {/* Back to Dashboard */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header - Theme Toggle | Breadcrumb | Logo */}
        <div className="flex items-center justify-between">
          <ThemeToggle />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-dashboard-text-muted">Home</span>
            <ArrowRight className="w-4 h-4 text-dashboard-text" />
            <span className="font-medium text-dashboard-text">
              Notifications
            </span>
          </div>

          {/* V Logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">V</span>
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-dashboard-card border-dashboard-border rounded-3xl">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-dashboard-text-muted mb-2">
                  Total Notifications
                </p>
                <p className="text-lg sm:text-xl font-bold text-dashboard-text">
                  {notifications.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card border-dashboard-border rounded-3xl">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-dashboard-text-muted mb-2">
                  Unread
                </p>
                <p className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
                  {unreadCount}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card border-dashboard-border rounded-3xl">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-dashboard-text-muted mb-2">
                  High Priority
                </p>
                <p className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400">
                  {notifications.filter((n) => n.priority === "high").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Actions */}
        {selectedNotifications.length > 0 && (
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800/30 rounded-3xl">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-sm font-medium text-dashboard-text">
                  {selectedNotifications.length} notification(s) selected
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markSelectedAsRead}
                    className="rounded-2xl text-xs px-3 py-1.5"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deleteSelected}
                    className="rounded-2xl text-red-600 hover:text-red-700 text-xs px-3 py-1.5"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={deselectAll}
                    className="rounded-2xl text-xs px-2 py-1.5"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card className="bg-dashboard-card border-dashboard-border rounded-3xl">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <CardTitle className="text-dashboard-text text-xl">
                All Notifications
              </CardTitle>

              {/* Search and Filters Row */}
              <div className="flex flex-col lg:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-2xl"
                  />
                </div>

                {/* Filter */}
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full lg:w-48 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      selectedNotifications.length ===
                      filteredNotifications.length
                        ? deselectAll
                        : selectAll
                    }
                    className="rounded-2xl text-xs px-3 py-1.5 whitespace-nowrap"
                  >
                    {selectedNotifications.length ===
                    filteredNotifications.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                  {unreadCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllAsRead}
                      className="rounded-2xl text-xs px-3 py-1.5 whitespace-nowrap"
                    >
                      Mark All Read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 pb-6">
            <div className="space-y-1">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
                  const Icon = notification.icon;
                  const isSelected = selectedNotifications.includes(
                    notification.id,
                  );

                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-300 mx-4 cursor-pointer group",
                        !notification.isRead &&
                          "bg-blue-50/50 dark:bg-blue-900/10",
                        isSelected &&
                          "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30",
                      )}
                      onClick={() => toggleSelection(notification.id)}
                    >
                      {/* Selection Checkbox */}
                      <div
                        className={cn(
                          "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0",
                          isSelected
                            ? "bg-purple-500 border-purple-500"
                            : "border-gray-300 dark:border-gray-600",
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon className={cn("w-6 h-6", notification.color)} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p
                                className={cn(
                                  "font-medium text-sm truncate",
                                  notification.isRead
                                    ? "text-dashboard-text-muted"
                                    : "text-dashboard-text",
                                )}
                              >
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-xs text-dashboard-text-muted mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-dashboard-text-muted">
                                {notification.timestamp}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs rounded-xl",
                                  notification.priority === "high" &&
                                    "border-red-200 text-red-600 dark:border-red-800 dark:text-red-400",
                                  notification.priority === "medium" &&
                                    "border-yellow-200 text-yellow-600 dark:border-yellow-800 dark:text-yellow-400",
                                  notification.priority === "low" &&
                                    "border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400",
                                )}
                              >
                                {notification.priority} priority
                              </Badge>
                              {notification.category && (
                                <Badge
                                  variant="outline"
                                  className="text-xs rounded-xl"
                                >
                                  {notification.category}
                                </Badge>
                              )}
                              {notification.amount && (
                                <Badge
                                  variant="outline"
                                  className="text-xs rounded-xl"
                                >
                                  ${notification.amount}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="w-8 h-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="w-8 h-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                              title="Delete notification"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-dashboard-text-muted mx-auto mb-4" />
                  <p className="text-dashboard-text-muted text-lg">
                    No notifications found
                  </p>
                  <p className="text-sm text-dashboard-text-muted mt-1">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}