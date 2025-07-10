"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calender";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
  ShoppingCart,
  Car,
  Utensils,
  ArrowUpRight,
  ChevronDown,
  Send,
  Receipt,
  Plane,
  Film,
  Book,
  Heart,
  Briefcase,
  Bell,
  Mail,
  X,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useRouter } from "next/navigation";

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
};

// Time period options
const timePeriods = [
  { value: "current", label: "Current" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
  { value: "last-6-months", label: "Last 6 Months" },
  { value: "this-year", label: "This Year" },
  { value: "last-year", label: "Last Year" },
  { value: "custom", label: "Custom Date Range" },
];

// Chart time period options
const chartTimePeriods = [
  { value: "1-month", label: "1 month" },
  { value: "3-months", label: "3 months" },
  { value: "6-months", label: "6 months" },
  { value: "1-year", label: "1 year" },
  { value: "2-years", label: "2 years" },
  { value: "custom", label: "Custom Date Range" },
];

// Expense chart time periods
const expenseTimePeriods = [
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "last-month", label: "Last month" },
  { value: "this-quarter", label: "This quarter" },
  { value: "this-year", label: "This year" },
  { value: "custom", label: "Custom Date Range" },
];

// Initial mock data for transactions
const initialTransactions = [
  {
    id: "1",
    name: "Transfer from Upwork platform",
    amount: 540,
    date: "22 Feb, 2024",
    status: "Completed",
    type: "income" as const,
    category: "Freelance",
  },
  {
    id: "2",
    name: "Juno Salary",
    amount: 1920,
    date: "3 Feb, 2024",
    status: "Received",
    type: "income" as const,
    category: "Salary",
  },
  {
    id: "3",
    name: "Transfer to: Mom",
    amount: -420,
    date: "3 Feb, 2024",
    status: "Completed",
    type: "expense" as const,
    category: "Transfer",
  },
  {
    id: "4",
    name: "City Tax",
    amount: -32,
    date: "22 Feb, 2024",
    status: "Completed",
    type: "expense" as const,
    category: "Tax",
  },
  {
    id: "5",
    name: "Online Shopping: Zara Store",
    amount: -72,
    date: "27 Jan, 2024",
    status: "Completed",
    type: "expense" as const,
    category: "Shopping",
  },
];

// Mock data for stock market
const stockMarketData = {
  topGainers: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 189.41,
      change: +4.85,
      changePercent: +2.63,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp",
      price: 378.85,
      change: +8.92,
      changePercent: +2.41,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 134.12,
      change: +2.87,
      changePercent: +2.19,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc",
      price: 144.73,
      change: +2.94,
      changePercent: +2.07,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 248.42,
      change: +4.12,
      changePercent: +1.69,
    },
  ],
  topLosers: [
    {
      symbol: "META",
      name: "Meta Platforms",
      price: 318.75,
      change: -7.83,
      changePercent: -2.39,
    },
    {
      symbol: "NFLX",
      name: "Netflix Inc.",
      price: 421.32,
      change: -9.15,
      changePercent: -2.13,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp",
      price: 451.23,
      change: -8.76,
      changePercent: -1.9,
    },
    {
      symbol: "CRM",
      name: "Salesforce Inc",
      price: 215.67,
      change: -3.94,
      changePercent: -1.79,
    },
    {
      symbol: "PYPL",
      name: "PayPal Holdings",
      price: 57.82,
      change: -0.96,
      changePercent: -1.63,
    },
  ],
};

// Mock data for savings goals
const savingsGoals = [
  {
    id: "1",
    name: "Vacation",
    target: 12000,
    current: 7325,
    icon: Plane,
  },
  {
    id: "2",
    name: "New Car",
    target: 38000,
    current: 0,
    icon: Car,
  },
];

// Transaction categories with icons
const transactionCategories = [
  { value: "food", label: "Food & Dining", icon: Utensils },
  { value: "transport", label: "Transportation", icon: Car },
  { value: "shopping", label: "Shopping", icon: ShoppingCart },
  { value: "bills", label: "Bills & Utilities", icon: Receipt },
  { value: "entertainment", label: "Entertainment", icon: Film },
  { value: "health", label: "Health & Fitness", icon: Heart },
  { value: "education", label: "Education", icon: Book },
  { value: "transfer", label: "Transfer", icon: Send },
  { value: "salary", label: "Salary", icon: Wallet },
  { value: "freelance", label: "Freelance", icon: Briefcase },
  { value: "investment", label: "Investment", icon: TrendingUp },
  { value: "other", label: "Other", icon: MoreHorizontal },
];

// --- StatsCard Component ---
const StatsCard: React.FC<{
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  isMain?: boolean;
  period?: string;
  lastWeek?: string;
  onPeriodChange?: (period: string) => void;
}> = ({
  title,
  value,
  change,
  changeType,
  isMain,
  period,
  lastWeek,
  onPeriodChange,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handlePeriodSelect = (selectedPeriod: string) => {
    if (selectedPeriod === "Custom Date Range") {
      setIsCalendarOpen(true);
    } else {
      if (onPeriodChange) {
        onPeriodChange(selectedPeriod);
      }
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      if (!dateRange.from) {
        setDateRange({ from: selectedDate, to: undefined });
      } else if (!dateRange.to && selectedDate > dateRange.from) {
        const newRange = { from: dateRange.from, to: selectedDate };
        setDateRange(newRange);
        if (onPeriodChange) {
          const customRange = `${newRange.from.toLocaleDateString()} - ${newRange.to.toLocaleDateString()}`;
          onPeriodChange(customRange);
          setIsCalendarOpen(false);
        }
      } else {
        setDateRange({ from: selectedDate, to: undefined });
      }
    }
  };

  return (
    <Card
      className={cn(
        "border-dashboard-border hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 rounded-3xl shadow-lg hover:shadow-xl",
        isMain
          ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800/30"
          : "bg-dashboard-card",
      )}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="text-center">
          {/* Period Selector at Top - Centered */}
          {period && onPeriodChange && (
            <div className="mb-4 flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 text-xs rounded-xl hover:bg-white/60 dark:hover:bg-black/20",
                      isMain
                        ? "bg-white/40 dark:bg-black/10 text-green-700 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                    )}
                  >
                    <span className="truncate max-w-20 sm:max-w-none">
                      {period}
                    </span>
                    <ChevronDown className="w-3 h-3 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="rounded-2xl">
                  {timePeriods.map((timePeriod) => (
                    <DropdownMenuItem
                      key={timePeriod.value}
                      onClick={() => handlePeriodSelect(timePeriod.label)}
                      className="rounded-xl cursor-pointer"
                    >
                      {timePeriod.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Title */}
          <p
            className={cn(
              "text-sm font-medium mb-3",
              isMain
                ? "text-green-800 dark:text-green-200"
                : "text-dashboard-text-muted",
            )}
          >
            {title}
          </p>

          {/* Main Value - Centered */}
          <p
            className={cn(
              "text-2xl sm:text-3xl lg:text-4xl font-bold mb-2",
              isMain
                ? "text-green-900 dark:text-green-100"
                : "text-dashboard-text",
            )}
          >
            {value}
          </p>

          {/* Secondary Text */}
          {lastWeek && (
            <p
              className={cn(
                "text-sm mb-2",
                isMain
                  ? "text-green-700 dark:text-green-300"
                  : "text-dashboard-text-muted",
              )}
            >
              {lastWeek}
            </p>
          )}

          {/* Change Indicator - Centered */}
          {change && (
            <div className="flex items-center justify-center gap-1">
              <div
                className={cn(
                  "p-1.5 rounded-xl",
                  changeType === "positive"
                    ? "bg-green-100 dark:bg-green-900/20"
                    : "bg-red-100 dark:bg-red-900/20",
                )}
              >
                {changeType === "positive" ? (
                  <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  changeType === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400",
                )}
              >
                {change}
              </span>
            </div>
          )}
        </div>

        {/* Calendar Popover for Custom Date Range */}
        {isCalendarOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-dashboard-card border border-dashboard-border rounded-2xl shadow-xl max-w-md w-full mx-4">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-dashboard-text mb-4 text-center">
                  Select Date Range
                </h3>
                <CalendarComponent
                  mode="single"
                  selected={dateRange.from}
                  onSelect={handleDateSelect}
                  className="rounded-2xl mx-auto"
                />
                {dateRange.from && !dateRange.to && (
                  <p className="text-sm text-dashboard-text-muted mt-3 text-center">
                    Now select the end date
                  </p>
                )}
                {dateRange.from && dateRange.to && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Selected: {dateRange.from.toLocaleDateString()} -{" "}
                      {dateRange.to.toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-dashboard-border">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDateRange({ from: undefined, to: undefined });
                      setIsCalendarOpen(false);
                    }}
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  {dateRange.from && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDateRange({ from: undefined, to: undefined })
                      }
                      className="flex-1 rounded-xl"
                    >
                      Clear
                    </Button>
                  )}
                  {dateRange.from && dateRange.to && (
                    <Button
                      size="sm"
                      onClick={() => setIsCalendarOpen(false)}
                      className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// --- StockItem Component ---
const StockItem: React.FC<{
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
  };
}> = ({ stock }) => {
  const isPositive = stock.change > 0;

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-300 cursor-pointer">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-bold">
              {stock.symbol.slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-medium text-dashboard-text text-sm">
              {stock.symbol}
            </p>
            <p className="text-xs text-dashboard-text-muted truncate max-w-28">
              {stock.name}
            </p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm text-dashboard-text">
          ${stock.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-1 justify-end">
          {isPositive ? (
            <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400",
            )}
          >
            {isPositive ? "+" : ""}
            {stock.changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

// --- TransactionItem Component ---
const TransactionItem: React.FC<{
  transaction: (typeof initialTransactions)[0];
  onDelete?: (id: string) => void;
  showDelete?: boolean;
}> = ({ transaction, onDelete, showDelete = false }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-300 group">
    <div className="flex-1">
      <p className="font-medium text-dashboard-text text-sm">
        {transaction.name}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-dashboard-text-muted">
          {transaction.date}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "text-xs rounded-xl",
            transaction.status === "Completed"
              ? "text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
              : "text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800",
          )}
        >
          {transaction.status}
        </Badge>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p
          className={cn(
            "font-bold text-sm",
            transaction.type === "income"
              ? "text-green-600 dark:text-green-400"
              : "text-dashboard-text",
          )}
        >
          {transaction.type === "income" ? "+" : ""}$
          {Math.abs(transaction.amount)}
        </p>
      </div>
      {showDelete && onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(transaction.id)}
          className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
          title="Delete transaction"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  </div>
);

// --- SavingsGoalItem Component ---
const SavingsGoalItem: React.FC<{
  goal: (typeof savingsGoals)[0];
}> = ({ goal }) => {
  const progress = (goal.current / goal.target) * 100;
  const Icon = goal.icon;

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-300">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center shadow-md">
        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-dashboard-text text-sm">
          {goal.name}
        </p>
        <p className="text-xs text-dashboard-text-muted">
          Target: ${goal.target.toLocaleString()}
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm text-dashboard-text">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function Page() {
  const router = useRouter();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [activeTransactionTab, setActiveTransactionTab] = useState<
    "current" | "past"
  >("current");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedPeriods, setSelectedPeriods] = useState({
    balance: "Current",
    income: "This Month",
    expenses: "This Month",
    financialOverview: "6 months",
    expensesPie: "This week",
  });

  // Chart calendar states
  const [isChartCalendarOpen, setIsChartCalendarOpen] = useState(false);
  const [chartCalendarType, setChartCalendarType] = useState<string>("");
  const [chartDateRange, setChartDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Transaction form state
  const [transactionForm, setTransactionForm] = useState({
    name: "",
    amount: "",
    category: "",
    type: "expense" as "income" | "expense",
    description: "",
  });

  // Calculate dynamic stats
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalBalance = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    if (
      !transactionForm.name ||
      !transactionForm.amount ||
      !transactionForm.category
    ) {
      return;
    }

    const amount = parseFloat(transactionForm.amount);
    const finalAmount =
      transactionForm.type === "expense" ? -Math.abs(amount) : Math.abs(amount);

    const newTransaction = {
      id: Date.now().toString(),
      name: transactionForm.name,
      amount: finalAmount,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "Completed",
      type: transactionForm.type,
      category: transactionForm.category,
    };

    setTransactions([newTransaction, ...transactions]);
    setTransactionForm({
      name: "",
      amount: "",
      category: "",
      type: "expense",
      description: "",
    });
    setIsAddTransactionOpen(false);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions(transactions.filter((t) => t.id !== transactionId));
  };

  const handlePeriodChange = (cardType: string, period: string) => {
    setSelectedPeriods((prev) => ({
      ...prev,
      [cardType]: period,
    }));
  };

  const handleChartPeriodChange = (chartType: string, period: string) => {
    if (period === "Custom Date Range") {
      setChartCalendarType(chartType);
      setIsChartCalendarOpen(true);
    } else {
      setSelectedPeriods((prev) => ({
        ...prev,
        [chartType]: period,
      }));
    }
  };

  const handleChartDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      if (!chartDateRange.from) {
        setChartDateRange({ from: selectedDate, to: undefined });
      } else if (!chartDateRange.to && selectedDate > chartDateRange.from) {
        const newRange = { from: chartDateRange.from, to: selectedDate };
        setChartDateRange(newRange);
        const customRange = `${newRange.from.toLocaleDateString()} - ${newRange.to.toLocaleDateString()}`;
        setSelectedPeriods((prev) => ({
          ...prev,
          [chartCalendarType]: customRange,
        }));
        setIsChartCalendarOpen(false);
        setChartDateRange({ from: undefined, to: undefined });
      } else {
        setChartDateRange({ from: selectedDate, to: undefined });
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 h-full">
        {/* Header with Theme Toggle and Logo */}
        <DashboardHeader pageName="Dashboard" />
        {/* Welcome Section with Notifications and Profile */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-dashboard-text mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-dashboard-text-muted">
              Here&apos;s what&apos;s happening with your money today
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell with Red Dot */}
            <div className="relative">
              <Popover
                open={isNotificationOpen}
                onOpenChange={setIsNotificationOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-11 h-11 p-0 bg-dashboard-card border border-dashboard-border rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                  >
                    <Bell className="w-5 h-5 text-dashboard-text-muted" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 rounded-2xl" align="end">
                  <div className="p-4 border-b border-dashboard-border">
                    <h3 className="text-lg font-semibold text-dashboard-text">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-auto">
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-dashboard-border cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-dashboard-text">
                            Payment Due Reminder
                          </p>
                          <p className="text-xs text-dashboard-text-muted mt-1">
                            Your electricity bill of $120 is due tomorrow
                          </p>
                          <p className="text-xs text-dashboard-text-muted mt-1">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-dashboard-border cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-dashboard-text">
                            Income Received
                          </p>
                          <p className="text-xs text-dashboard-text-muted mt-1">
                            Freelance payment of $540 has been credited
                          </p>
                          <p className="text-xs text-dashboard-text-muted mt-1">
                            5 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-dashboard-border cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-dashboard-text">
                            Budget Alert
                          </p>
                          <p className="text-xs text-dashboard-text-muted mt-1">
                            You&apos;ve spent 80% of your monthly food budget
                          </p>
                          <p className="text-xs text-dashboard-text-muted mt-1">
                            1 day ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-dashboard-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push("/dashboard/Notification")}
                      className="w-full rounded-xl text-dashboard-text-muted hover:text-dashboard-text"
                    >
                      View All Notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              {/* Red notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>

            {/* Mail Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="w-11 h-11 p-0 bg-dashboard-card border border-dashboard-border rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
              onClick={() =>
                window.open(
                  "mailto:support@vibewealth.com?subject=Support Request&body=Hi VibeWealth team,",
                  "_blank",
                )
              }
              title="Send us an email"
            >
              <Mail className="w-5 h-5 text-dashboard-text-muted" />
            </Button>

            {/* Separator */}
            <div className="w-px h-8 bg-dashboard-border"></div>

            {/* Profile Name and Picture */}
            <div className="flex items-center gap-3">
              <span className="text-dashboard-text font-medium">
                {userData.name.split(" ")[0]}
              </span>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-sm">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with Full Titles and Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Balance"
            value={`$${totalBalance.toLocaleString()}`}
            period={selectedPeriods.balance}
            lastWeek={`$${(totalBalance - 1500).toLocaleString()} last week`}
            change="+10.8%"
            changeType="positive"
            isMain={true}
            onPeriodChange={(period) => handlePeriodChange("balance", period)}
          />
          <StatsCard
            title="Total Income"
            value={`$${totalIncome.toLocaleString()}`}
            period={selectedPeriods.income}
            lastWeek={`$${(totalIncome - 500).toLocaleString()} last month`}
            change="+29.8%"
            changeType="positive"
            onPeriodChange={(period) => handlePeriodChange("income", period)}
          />
          <StatsCard
            title="Total Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            period={selectedPeriods.expenses}
            lastWeek={`$${(totalExpenses + 200).toLocaleString()} last month`}
            change="-3.7%"
            changeType="positive"
            onPeriodChange={(period) => handlePeriodChange("expenses", period)}
          />
        </div>

        {/* Financial Overview Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-dashboard-text text-xl">
                  Financial Overview
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-dashboard-text-muted">
                      Income
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-dashboard-text-muted">
                      Expenses
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 text-xs text-dashboard-text-muted"
                      >
                        <span>{selectedPeriods.financialOverview}</span>
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl">
                      {chartTimePeriods.map((timePeriod) => (
                        <DropdownMenuItem
                          key={timePeriod.value}
                          onClick={() =>
                            handleChartPeriodChange(
                              "financialOverview",
                              timePeriod.label,
                            )
                          }
                          className="rounded-xl cursor-pointer"
                        >
                          {timePeriod.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-to-b from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-purple-400/30 rounded-3xl"></div>
                  <div className="text-center relative z-10">
                    <BarChart3 className="w-16 h-16 text-dashboard-text-muted mx-auto mb-4" />
                    <p className="text-dashboard-text-muted text-lg">
                      Interactive chart showing income vs expenses over 6 months
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Expenses Pie Chart */}
          <div>
            <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-dashboard-text text-xl">
                  All Expenses
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 text-xs text-dashboard-text-muted"
                    >
                      <span>{selectedPeriods.expensesPie}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl">
                    {expenseTimePeriods.map((timePeriod) => (
                      <DropdownMenuItem
                        key={timePeriod.value}
                        onClick={() =>
                          handleChartPeriodChange(
                            "expensesPie",
                            timePeriod.label,
                          )
                        }
                        className="rounded-xl cursor-pointer"
                      >
                        {timePeriod.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="h-56 flex items-center justify-center relative">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 rounded-full bg-gradient-conic from-purple-500 via-pink-500 to-blue-500 shadow-lg"></div>
                    <div className="absolute inset-4 bg-dashboard-card rounded-full flex items-center justify-center shadow-inner">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-dashboard-text">
                          ${totalExpenses.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-dashboard-text-muted">
                        Food
                      </span>
                    </div>
                    <span className="font-medium text-dashboard-text">
                      42%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span className="text-dashboard-text-muted">
                        Bills
                      </span>
                    </div>
                    <span className="font-medium text-dashboard-text">
                      24%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-dashboard-text-muted">
                        Shops
                      </span>
                    </div>
                    <span className="font-medium text-dashboard-text">
                      22%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-dashboard-text-muted">
                        Other
                      </span>
                    </div>
                    <span className="font-medium text-dashboard-text">
                      12%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction History with Tabs */}
        <div>
          <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg">
            <CardHeader className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <CardTitle className="text-dashboard-text text-xl">
                  Transaction History
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant={
                    activeTransactionTab === "current" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setActiveTransactionTab("current")}
                  className="rounded-2xl px-4 py-2"
                >
                  Current Transactions
                </Button>
                <Button
                  variant={
                    activeTransactionTab === "past" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setActiveTransactionTab("past")}
                  className="rounded-2xl px-4 py-2"
                >
                  Past Transactions
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 pb-6">
              {/* Current Transactions Tab */}
              {activeTransactionTab === "current" && (
                <div className="space-y-1">
                  {transactions.slice(0, 6).map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </div>
              )}

              {/* Past Transactions Tab */}
              {activeTransactionTab === "past" && (
                <div className="space-y-6 p-6">
                  {/* Add Transaction Section */}
                  <div className="flex items-center justify-between border-b border-dashboard-border pb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-dashboard-text">
                        Manage Transactions
                      </h3>
                      <p className="text-sm text-dashboard-text-muted">
                        Add new transactions or delete existing ones
                      </p>
                    </div>
                    <Dialog
                      open={isAddTransactionOpen}
                      onOpenChange={setIsAddTransactionOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                          <Plus className="w-5 h-5 mr-2" />
                          Add Transaction
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md rounded-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-dashboard-text">
                            Add New Transaction
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Button
                              type="button"
                              variant={
                                transactionForm.type === "income"
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                setTransactionForm({
                                  ...transactionForm,
                                  type: "income",
                                })
                              }
                              className="rounded-2xl"
                            >
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Income
                            </Button>
                            <Button
                              type="button"
                              variant={
                                transactionForm.type === "expense"
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                setTransactionForm({
                                  ...transactionForm,
                                  type: "expense",
                                })
                              }
                              className="rounded-2xl"
                            >
                              <TrendingDown className="w-4 h-4 mr-2" />
                              Expense
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="transaction-name">
                              Transaction Name
                            </Label>
                            <Input
                              id="transaction-name"
                              placeholder="e.g., Coffee at Starbucks"
                              value={transactionForm.name}
                              onChange={(e) =>
                                setTransactionForm({
                                  ...transactionForm,
                                  name: e.target.value,
                                })
                              }
                              className="rounded-2xl"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="transaction-amount">Amount</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                id="transaction-amount"
                                type="number"
                                placeholder="0.00"
                                value={transactionForm.amount}
                                onChange={(e) =>
                                  setTransactionForm({
                                    ...transactionForm,
                                    amount: e.target.value,
                                  })
                                }
                                className="pl-10 rounded-2xl"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="transaction-category">
                              Category
                            </Label>
                            <Select
                              value={transactionForm.category}
                              onValueChange={(value) =>
                                setTransactionForm({
                                  ...transactionForm,
                                  category: value,
                                })
                              }
                            >
                              <SelectTrigger className="rounded-2xl">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {transactionCategories.map((category) => {
                                  const Icon = category.icon;
                                  return (
                                    <SelectItem
                                      key={category.value}
                                      value={category.value}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        {category.label}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="transaction-description">
                              Description (Optional)
                            </Label>
                            <Textarea
                              id="transaction-description"
                              placeholder="Add any additional notes..."
                              value={transactionForm.description}
                              onChange={(e) =>
                                setTransactionForm({
                                  ...transactionForm,
                                  description: e.target.value,
                                })
                              }
                              className="rounded-2xl min-h-[80px]"
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsAddTransactionOpen(false)}
                              className="flex-1 rounded-2xl"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              onClick={handleAddTransaction}
                              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                            >
                              Add Transaction
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* All Transactions with Delete Option */}
                  <div className="space-y-1">
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <TransactionItem
                          key={transaction.id}
                          transaction={transaction}
                          onDelete={handleDeleteTransaction}
                          showDelete={true}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Receipt className="w-16 h-16 text-dashboard-text-muted mx-auto mb-4" />
                        <p className="text-dashboard-text-muted text-lg">
                          No transactions yet
                        </p>
                        <p className="text-sm text-dashboard-text-muted mt-1">
                          Add your first transaction to get started
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Goals and Stock Market Side by Side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Saving Goals */}
          <div>
            <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-dashboard-text text-xl">
                  Saving Goals
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {savingsGoals.map((goal) => (
                    <SavingsGoalItem key={goal.id} goal={goal} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stock Market Overview */}
          <div>
            <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-dashboard-text flex items-center gap-2 text-xl">
                  <BarChart3 className="w-6 h-6" />
                  Stock Market
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-2xl text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Stock
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Top Gainers */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h4 className="font-semibold text-dashboard-text">
                        Top Gainers
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {stockMarketData.topGainers
                        .slice(0, 3)
                        .map((stock, index) => (
                          <StockItem key={`gainer-${index}`} stock={stock} />
                        ))}
                    </div>
                  </div>

                  {/* Top Losers */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <h4 className="font-semibold text-dashboard-text">
                        Top Losers
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {stockMarketData.topLosers
                        .slice(0, 3)
                        .map((stock, index) => (
                          <StockItem key={`loser-${index}`} stock={stock} />
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="pb-8" />

        {/* Chart Calendar Modal */}
        {isChartCalendarOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-dashboard-card border border-dashboard-border rounded-2xl shadow-xl max-w-md w-full mx-4">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-dashboard-text mb-4 text-center">
                  Select Date Range for{" "}
                  {chartCalendarType === "financialOverview"
                    ? "Financial Overview"
                    : "Expenses Chart"}
                </h3>
                <CalendarComponent
                  mode="single"
                  selected={chartDateRange.from}
                  onSelect={handleChartDateSelect}
                  className="rounded-2xl mx-auto"
                />
                {chartDateRange.from && !chartDateRange.to && (
                  <p className="text-sm text-dashboard-text-muted mt-3 text-center">
                    Now select the end date
                  </p>
                )}
                {chartDateRange.from && chartDateRange.to && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Selected: {chartDateRange.from.toLocaleDateString()} -{" "}
                      {chartDateRange.to.toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-dashboard-border">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChartDateRange({ from: undefined, to: undefined });
                      setIsChartCalendarOpen(false);
                      setChartCalendarType("");
                    }}
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  {chartDateRange.from && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setChartDateRange({ from: undefined, to: undefined })
                      }
                      className="flex-1 rounded-xl"
                    >
                      Clear
                    </Button>
                  )}
                  {chartDateRange.from && chartDateRange.to && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsChartCalendarOpen(false);
                        setChartCalendarType("");
                      }}
                      className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
