"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  ArrowRight,
  Bell,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Target,
  ShoppingCart,
  Car,
  Home,
  PiggyBank,
  DollarSign,
  Calendar,
  Settings,
  Heart,
  Plane,
  Gift,
  CreditCard,
  MessageCircle,
  MoreHorizontal,
  Trash2,
  Archive,
  Filter,
  Search,
  BarChart3,
  BrainCircuit,
  ChevronDown,
  Check,
  Clock,
  X,
} from "lucide-react";
import { cn } from "../../../../lib/utils";

// --- Types and Mock Data ---
interface SmartNudge {
  id: string;
  type: "spending" | "goal" | "reminder" | "investment" | "achievement";
  title: string;
  message: string;
  amount?: number;
  category?: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  isCompleted?: boolean;
  isArchived?: boolean;
  goalProgress?: number;
  goalTarget?: number;
  actionRequired?: boolean;
  iconName: string;
  color: string;
}

const iconMap = {
  Coffee: ShoppingCart,
  Target,
  CreditCard,
  TrendingUp,
  CheckCircle,
  Alert: AlertCircle,
  Bell,
  PiggyBank,
  DollarSign,
  Calendar,
  Settings,
  ShoppingCart,
  Car,
  Home,
  Heart,
  Plane,
  Gift,
} as const;

type IconName = keyof typeof iconMap;

const getIconComponent = (
  iconName: string,
): React.ComponentType<{ className?: string }> => {
  return iconMap[iconName as IconName] || Target;
};

const initialNudges: SmartNudge[] = [
  {
    id: "1",
    type: "spending",
    title: "High Food Spending Alert",
    message:
      "You've spent $340 on food this week, which is 40% above your budget. Consider meal planning to reduce costs.",
    amount: 340,
    category: "Food & Dining",
    priority: "high",
    timestamp: "2 hours ago",
    actionRequired: true,
    iconName: "Coffee",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "2",
    type: "goal",
    title: "Japan Trip Goal Update",
    message:
      "You're doing great! You've saved 65% toward your Japan trip goal. Only $1,750 left to reach your target.",
    amount: 3250,
    goalProgress: 65,
    goalTarget: 5000,
    priority: "medium",
    timestamp: "4 hours ago",
    iconName: "Plane",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "3",
    type: "reminder",
    title: "Credit Card Payment Due",
    message:
      "Your credit card payment of $1,240 is due in 3 days. Set up autopay to avoid late fees.",
    amount: 1240,
    priority: "high",
    timestamp: "6 hours ago",
    actionRequired: true,
    iconName: "CreditCard",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "4",
    type: "investment",
    title: "Market Opportunity",
    message:
      "Tech stocks are down 3% today. Consider dollar-cost averaging into your portfolio if you have spare funds.",
    priority: "low",
    timestamp: "1 day ago",
    iconName: "TrendingUp",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "5",
    type: "achievement",
    title: "Milestone Reached!",
    message:
      "Congratulations! You've successfully saved $10,000 in your emergency fund. You've reached your goal!",
    amount: 10000,
    priority: "medium",
    timestamp: "2 days ago",
    isCompleted: true,
    iconName: "CheckCircle",
    color: "from-green-500 to-blue-500",
  },
  {
    id: "6",
    type: "spending",
    title: "Subscription Review Needed",
    message:
      "You have 8 active subscriptions totaling $156/month. Consider canceling unused ones to save money.",
    amount: 156,
    category: "Subscriptions",
    priority: "medium",
    timestamp: "1 day ago",
    actionRequired: true,
    iconName: "Settings",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "7",
    type: "goal",
    title: "Emergency Fund Progress",
    message:
      "Great progress on your emergency fund! You're at 70% of your $15,000 target. Keep it up!",
    goalProgress: 70,
    goalTarget: 15000,
    priority: "low",
    timestamp: "2 days ago",
    iconName: "PiggyBank",
    color: "from-green-400 to-blue-400",
  },
  {
    id: "8",
    type: "reminder",
    title: "Budget Review Time",
    message:
      "It's time for your monthly budget review. Check if your spending categories need adjustment.",
    priority: "medium",
    timestamp: "3 days ago",
    actionRequired: true,
    iconName: "Calendar",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: "9",
    type: "spending",
    title: "Weekend Spending Pattern",
    message:
      "Your weekend spending increased by 25% this month. Consider setting a weekend budget limit.",
    amount: 180,
    category: "Entertainment",
    priority: "medium",
    timestamp: "3 days ago",
    iconName: "ShoppingCart",
    color: "from-pink-500 to-red-500",
  },
  {
    id: "10",
    type: "investment",
    title: "Rebalancing Suggestion",
    message:
      "Your portfolio is 15% overweight in tech stocks. Consider rebalancing to maintain your target allocation.",
    priority: "low",
    timestamp: "4 days ago",
    iconName: "TrendingUp",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: "11",
    type: "achievement",
    title: "Savings Streak!",
    message:
      "Amazing! You've saved money for 30 consecutive days. You're building great financial habits!",
    priority: "medium",
    timestamp: "5 days ago",
    isCompleted: true,
    iconName: "Gift",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "12",
    type: "reminder",
    title: "Health Insurance Review",
    message:
      "Open enrollment period is coming up. Review your health insurance options to ensure you have the best coverage.",
    priority: "medium",
    timestamp: "1 week ago",
    actionRequired: true,
    iconName: "Heart",
    color: "from-red-400 to-pink-500",
  },
];

const filterOptions = [
  { key: "all", name: "All Nudges" },
  { key: "active", name: "Active" },
  { key: "completed", name: "Completed" },
  { key: "spending", name: "Spending" },
  { key: "goal", name: "Goals" },
  { key: "reminder", name: "Reminders" },
  { key: "investment", name: "Investment" },
  { key: "achievement", name: "Achievements" },
  { key: "high", name: "High Priority" },
  { key: "medium", name: "Medium Priority" },
  { key: "low", name: "Low Priority" },
  { key: "action_required", name: "Action Required" },
];

// --- NudgeCard Component ---
const NudgeCard: React.FC<{
  nudge: SmartNudge;
  onAction: (id: string, action: string) => void;
  isPastNudges?: boolean;
}> = ({ nudge, onAction, isPastNudges = false }) => {
  const router = useRouter();
  const Icon = getIconComponent(nudge.iconName);

  const priorityColors = {
    high: "border-red-500/30 bg-red-50/50 dark:bg-red-900/10",
    medium: "border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/10",
    low: "border-gray-300 dark:border-gray-600",
  };

  const typeIcons = {
    spending: AlertCircle,
    goal: Target,
    reminder: Bell,
    investment: TrendingUp,
    achievement: CheckCircle,
  };

  const TypeIcon = typeIcons[nudge.type];

  const handleAskAI = () => {
    const prompt = nudge.message;
    router.push(`/dashboard/ai-chat?initialPrompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <Card
      className={cn(
        "bg-dashboard-card border-dashboard-border hover:shadow-xl transition-all duration-300 rounded-3xl",
        priorityColors[nudge.priority],
        (nudge.isCompleted || isPastNudges) && "opacity-75",
      )}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={cn(
              "w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-gradient-to-br shadow-lg flex items-center justify-center flex-shrink-0",
              nudge.color,
            )}
          >
            <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <TypeIcon className="w-4 h-4 text-dashboard-text-muted" />
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs rounded-xl capitalize",
                    nudge.priority === "high" &&
                      "border-red-200 text-red-600 dark:border-red-800 dark:text-red-400",
                    nudge.priority === "medium" &&
                      "border-yellow-200 text-yellow-600 dark:border-yellow-800 dark:text-yellow-400",
                    nudge.priority === "low" &&
                      "border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400",
                  )}
                >
                  {nudge.priority} priority
                </Badge>
                {nudge.category && (
                  <Badge variant="outline" className="text-xs rounded-xl">
                    {nudge.category}
                  </Badge>
                )}
                {nudge.isCompleted && (
                  <Badge className="text-xs rounded-xl bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Completed
                  </Badge>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl">
                  {!nudge.isCompleted && !isPastNudges && (
                    <DropdownMenuItem
                      onClick={() => onAction(nudge.id, "complete")}
                      className="rounded-xl cursor-pointer"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Mark Completed
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => onAction(nudge.id, "archive")}
                    className="rounded-xl cursor-pointer"
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onAction(nudge.id, "delete")}
                    className="rounded-xl cursor-pointer text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className="text-lg lg:text-xl font-bold text-dashboard-text mb-2">
              {nudge.title}
            </h3>
            <p className="text-sm text-dashboard-text-muted leading-relaxed mb-3">
              {nudge.message}
            </p>

            {/* Amount Display */}
            {nudge.amount && (
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-dashboard-text-muted" />
                <span className="font-bold text-dashboard-text">
                  ${nudge.amount.toLocaleString()}
                </span>
              </div>
            )}

            {/* Goal Progress */}
            {nudge.goalProgress && nudge.goalTarget && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-dashboard-text-muted">
                    Progress
                  </span>
                  <span className="text-sm font-medium text-dashboard-text">
                    {nudge.goalProgress}%
                  </span>
                </div>
                <Progress
                  value={nudge.goalProgress}
                  className="h-2 rounded-full"
                />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-dashboard-text-muted">
                    $
                    {(
                      (nudge.goalTarget * nudge.goalProgress) /
                      100
                    ).toLocaleString()}
                  </span>
                  <span className="text-xs text-dashboard-text-muted">
                    ${nudge.goalTarget.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Timestamp */}
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-dashboard-text-muted" />
              <span className="text-xs text-dashboard-text-muted">
                {nudge.timestamp}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {nudge.actionRequired && !nudge.isCompleted && !isPastNudges && (
                <Button
                  onClick={() => onAction(nudge.id, "action")}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl flex-1"
                >
                  Take Action
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAskAI}
                  className="rounded-2xl flex-1 sm:flex-none"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>

                {!nudge.isCompleted && !isPastNudges && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAction(nudge.id, "complete")}
                    className="rounded-2xl flex-1 sm:flex-none"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Main Page Component ---
export default function SmartNudges() {
  const router = useRouter();
  const [nudges, setNudges] = useState<SmartNudge[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [selectedAction, setSelectedAction] = useState<{
    nudge: SmartNudge;
    action: string;
  } | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize nudges from localStorage or use default
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("smart-nudges") : null;
    const savedNudges = saved ? JSON.parse(saved) : initialNudges;
    setNudges(savedNudges);
  }, []);

  // Save to localStorage whenever nudges change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smart-nudges", JSON.stringify(nudges));
    }
  }, [nudges]);

  // Filter nudges
  const filteredNudges = nudges.filter((nudge) => {
    const matchesSearch =
      nudge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nudge.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nudge.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = (() => {
      switch (filterType) {
        case "all":
          return true;
        case "active":
          return !nudge.isCompleted && !nudge.isArchived;
        case "completed":
          return nudge.isCompleted;
        case "action_required":
          return nudge.actionRequired && !nudge.isCompleted;
        case "high":
        case "medium":
        case "low":
          return nudge.priority === filterType;
        default:
          return nudge.type === filterType;
      }
    })();

    return matchesSearch && matchesFilter;
  });

  // Separate active and past nudges
  const activeNudges = filteredNudges.filter(
    (nudge) => !nudge.isCompleted && !nudge.isArchived,
  );
  const pastNudges = filteredNudges.filter(
    (nudge) => nudge.isCompleted || nudge.isArchived,
  );

  // Handle nudge actions
  const handleNudgeAction = (id: string, action: string) => {
    const nudge = nudges.find((n) => n.id === id);
    if (!nudge) return;

    switch (action) {
      case "complete":
        setNudges(
          nudges.map((n) => (n.id === id ? { ...n, isCompleted: true } : n)),
        );
        break;
      case "archive":
        setNudges(
          nudges.map((n) => (n.id === id ? { ...n, isArchived: true } : n)),
        );
        break;
      case "delete":
        setNudges(nudges.filter((n) => n.id !== id));
        break;
      case "action":
        setSelectedAction({ nudge, action });
        break;
    }
  };

  const closeActionDialog = () => {
    setSelectedAction(null);
  };

  // Render action dialog content based on nudge type
  const renderActionDialog = () => {
    if (!selectedAction) return null;

    const { nudge } = selectedAction;

    const actionDialogs = {
      spending: {
        title: "Reduce Spending",
        content: (
          <div className="space-y-4">
            <p className="text-dashboard-text-muted">
              Here are some actionable steps to reduce your {nudge.category}{" "}
              spending:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <h4 className="font-medium text-dashboard-text mb-1">
                  1. Set a Weekly Budget
                </h4>
                <p className="text-sm text-dashboard-text-muted">
                  Limit your {nudge.category?.toLowerCase()} spending to $
                  {Math.round((nudge.amount || 0) * 0.7)} per week.
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <h4 className="font-medium text-dashboard-text mb-1">
                  2. Plan Ahead
                </h4>
                <p className="text-sm text-dashboard-text-muted">
                  Create a meal plan or shopping list to avoid impulse
                  purchases.
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <h4 className="font-medium text-dashboard-text mb-1">
                  3. Find Alternatives
                </h4>
                <p className="text-sm text-dashboard-text-muted">
                  Look for cheaper alternatives or cook at home more often.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      reminder: {
        title: "Set Up Payment",
        content: (
          <div className="space-y-4">
            <p className="text-dashboard-text-muted">
              Don't miss your payment! Here's how to set up autopay:
            </p>
            <div className="space-y-3">
              <Button className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white">
                <CreditCard className="w-4 h-4 mr-2" />
                Set Up AutoPay with Chase Bank
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-2xl border-green-200 text-green-600 hover:bg-green-50"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add Payment Reminder to Calendar
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-2xl border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Bell className="w-4 h-4 mr-2" />
                Enable SMS Notifications
              </Button>
            </div>
          </div>
        ),
      },
      goal: {
        title: "Boost Your Savings",
        content: (
          <div className="space-y-4">
            <p className="text-dashboard-text-muted">
              You're making great progress! Here's how to reach your goal
              faster:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <h4 className="font-medium text-dashboard-text mb-1">
                  Increase Monthly Savings
                </h4>
                <p className="text-sm text-dashboard-text-muted">
                  Add an extra $100/month to reach your goal 3 months earlier.
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <h4 className="font-medium text-dashboard-text mb-1">
                  Automate Transfers
                </h4>
                <p className="text-sm text-dashboard-text-muted">
                  Set up automatic transfers on payday to stay consistent.
                </p>
              </div>
            </div>
          </div>
        ),
      },
    };

    const dialogContent =
      actionDialogs[nudge.type as keyof typeof actionDialogs] ||
      actionDialogs.spending;

    return (
      <Dialog open={!!selectedAction} onOpenChange={closeActionDialog}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-dashboard-text">
              {dialogContent.title}
            </DialogTitle>
            <DialogDescription>Take action on: {nudge.title}</DialogDescription>
          </DialogHeader>
          <div className="pt-4">{dialogContent.content}</div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={closeActionDialog}
              className="flex-1 rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleNudgeAction(nudge.id, "complete");
                closeActionDialog();
              }}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
            >
              Mark Complete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderAnalyticsDialog = () => (
    <Dialog open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
      <DialogContent className="sm:max-w-4xl rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dashboard-text">
            AI Financial Analysis
          </DialogTitle>
          <DialogDescription>
            Comprehensive insights into your financial behavior and
            recommendations
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          {/* Spending Analysis */}
          <Card className="bg-dashboard-card border-dashboard-border rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Spending Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                  <h4 className="font-medium text-dashboard-text mb-2">
                    Areas of Concern
                  </h4>
                  <ul className="space-y-2 text-sm text-dashboard-text-muted">
                    <li>• Food spending 40% above budget</li>
                    <li>• Weekend entertainment overspending</li>
                    <li>• 8 active subscriptions ($156/month)</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                  <h4 className="font-medium text-dashboard-text mb-2">
                    Positive Trends
                  </h4>
                  <ul className="space-y-2 text-sm text-dashboard-text-muted">
                    <li>• 30-day savings streak</li>
                    <li>• 70% progress on emergency fund</li>
                    <li>• Reduced transportation costs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goal Progress */}
          <Card className="bg-dashboard-card border-dashboard-border rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Goal Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                  <span className="font-medium">Japan Trip</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    65% Complete
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                  <span className="font-medium">Emergency Fund</span>
                  <span className="text-green-600 dark:text-green-400">
                    70% Complete
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800/30 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl">
                  <h4 className="font-medium text-dashboard-text mb-2">
                    💡 Monthly Savings Optimization
                  </h4>
                  <p className="text-sm text-dashboard-text-muted">
                    By reducing food spending by 20% and canceling 3 unused
                    subscriptions, you could save an additional $180/month.
                  </p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl">
                  <h4 className="font-medium text-dashboard-text mb-2">
                    🎯 Goal Achievement Acceleration
                  </h4>
                  <p className="text-sm text-dashboard-text-muted">
                    Increase your Japan trip savings by $150/month to reach your
                    goal 4 months earlier than planned.
                  </p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl">
                  <h4 className="font-medium text-dashboard-text mb-2">
                    📊 Investment Opportunity
                  </h4>
                  <p className="text-sm text-dashboard-text-muted">
                    Consider investing your excess emergency fund savings (above
                    6 months) in a diversified index fund.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );

  const stats = [
    {
      title: "Active Nudges",
      value: activeNudges.length.toString(),
      icon: Bell,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Completed",
      value: pastNudges.filter((n) => n.isCompleted).length.toString(),
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Action Required",
      value: activeNudges.filter((n) => n.actionRequired).length.toString(),
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      title: "Goals Tracked",
      value: nudges.filter((n) => n.type === "goal").length.toString(),
      icon: Target,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 h-full">
        {/* Header */}
        <DashboardHeader pageName="Smart Nudges" />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="bg-dashboard-card border-dashboard-border rounded-3xl hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3",
                        stat.bgColor,
                      )}
                    >
                      <Icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-dashboard-text-muted mb-2">
                      {stat.title}
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-dashboard-text">
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Financial Summary */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800/30 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-dashboard-text mb-2">
                  AI Financial Summary
                </h3>
                <p className="text-sm text-dashboard-text-muted mb-4">
                  This week, you've spent 15% more than usual, mainly on food
                  and entertainment. Your Japan trip savings are on track, but
                  consider reducing weekend dining out to accelerate your
                  progress. Your emergency fund milestone is approaching - great
                  job maintaining consistency!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setIsAnalyticsOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Full Analysis
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `/dashboard/ai-chat?initialPrompt=${encodeURIComponent(
                          "This week, I've spent 15% more than usual, mainly on food and entertainment. My Japan trip savings are on track, but I want to reduce weekend dining out to accelerate my progress. Can you help me create a plan?",
                        )}`,
                      )
                    }
                    className="rounded-2xl border-purple-200 text-purple-600 dark:border-purple-800 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask AI
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="bg-dashboard-card border-dashboard-border rounded-3xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-dashboard-text text-xl">
                Smart Nudges
              </CardTitle>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search nudges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64 rounded-2xl"
                  />
                </div>

                {/* Filter */}
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-40 rounded-2xl">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.map((option) => (
                      <SelectItem key={option.key} value={option.key}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 mt-4">
              <Button
                variant={activeTab === "active" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("active")}
                className="rounded-2xl px-4 py-2"
              >
                Active Nudges
                {activeNudges.length > 0 && (
                  <Badge className="ml-2 bg-blue-500 text-white">
                    {activeNudges.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant={activeTab === "past" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("past")}
                className="rounded-2xl px-4 py-2"
              >
                Past Nudges
                {pastNudges.length > 0 && (
                  <Badge className="ml-2 bg-gray-500 text-white">
                    {pastNudges.length}
                  </Badge>
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              {activeTab === "active" ? (
                activeNudges.length > 0 ? (
                  activeNudges.map((nudge) => (
                    <NudgeCard
                      key={nudge.id}
                      nudge={nudge}
                      onAction={handleNudgeAction}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-dashboard-text-muted mx-auto mb-4" />
                    <p className="text-dashboard-text-muted text-lg">
                      No active nudges found
                    </p>
                    <p className="text-sm text-dashboard-text-muted mt-1">
                      Great job staying on top of your finances!
                    </p>
                  </div>
                )
              ) : pastNudges.length > 0 ? (
                pastNudges.map((nudge) => (
                  <NudgeCard
                    key={nudge.id}
                    nudge={nudge}
                    onAction={handleNudgeAction}
                    isPastNudges={true}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Archive className="w-16 h-16 text-dashboard-text-muted mx-auto mb-4" />
                  <p className="text-dashboard-text-muted text-lg">
                    No past nudges found
                  </p>
                  <p className="text-sm text-dashboard-text-muted mt-1">
                    Completed and archived nudges will appear here
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dialogs */}
        {renderActionDialog()}
        {renderAnalyticsDialog()}
      </div>
    </DashboardLayout>
  );
}