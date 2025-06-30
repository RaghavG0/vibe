"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/components/Dashboard/ThemeContext";
import {
  Target,
  Plus,
  ArrowRight,
  Plane,
  Car,
  Home,
  GraduationCap,
  Heart,
  Camera,
  MapPin,
  DollarSign,
  TrendingUp,
  Edit,
} from "lucide-react";
import { cn } from "../../../../lib/utils";

interface Dream {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
  createdAt: string;
}

const dreamTemplates = [
  {
    title: "Travel to Japan",
    icon: Plane,
    estimatedCost: 5000,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Buy a Car",
    icon: Car,
    estimatedCost: 25000,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Down Payment",
    icon: Home,
    estimatedCost: 50000,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Graduate Degree",
    icon: GraduationCap,
    estimatedCost: 30000,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Wedding",
    icon: Heart,
    estimatedCost: 20000,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Photography Gear",
    icon: Camera,
    estimatedCost: 3000,
    color: "from-indigo-500 to-purple-500",
  },
];

const iconOptions = [
  { icon: Target, label: "Target" },
  { icon: Plane, label: "Travel" },
  { icon: Car, label: "Car" },
  { icon: Home, label: "Home" },
  { icon: GraduationCap, label: "Education" },
  { icon: Heart, label: "Personal" },
  { icon: Camera, label: "Hobby" },
  { icon: MapPin, label: "Adventure" },
];

const colorOptions = [
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-green-500",
  "from-yellow-500 to-orange-500",
];

const DreamCard: React.FC<{
  dream: Dream;
  onAddMoney: () => void;
  onViewDetails: () => void;
}> = ({ dream, onAddMoney, onViewDetails }) => {
  const Icon = dream.icon;
  const progress = (dream.currentAmount / dream.targetAmount) * 100;
  const remaining = dream.targetAmount - dream.currentAmount;

  return (
    <Card className="bg-dashboard-card border-dashboard-border hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 rounded-3xl shadow-lg hover:shadow-xl group w-full max-w-full">
      <CardContent className="p-6 w-full max-w-full overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
                `bg-gradient-to-r ${dream.color}`,
              )}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-dashboard-text text-lg group-hover:text-purple-500 transition-colors">
                {dream.title}
              </h3>
              <p className="text-sm text-dashboard-text-muted">
                Due: {dream.deadline}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-dashboard-text-muted">
              Progress
            </span>
            <span className="text-sm font-medium text-dashboard-text">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className={cn(
                "h-3 rounded-full transition-all duration-500",
                `bg-gradient-to-r ${dream.color}`,
              )}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-dashboard-text-muted">Current</p>
              <p className="font-bold text-dashboard-text">
                ${dream.currentAmount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-dashboard-text-muted">Target</p>
              <p className="font-bold text-dashboard-text">
                ${dream.targetAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-dashboard-text-muted mb-2">
              ${remaining.toLocaleString()} remaining
            </p>
            <Button
              onClick={onAddMoney}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Money
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DreamTemplateCard: React.FC<{
  template: (typeof dreamTemplates)[0];
  onSelect: () => void;
}> = ({ template, onSelect }) => {
  const Icon = template.icon;

  return (
    <Card
      className="bg-dashboard-card border-dashboard-border hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer group rounded-3xl shadow-lg hover:shadow-xl"
      onClick={onSelect}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
              `bg-gradient-to-r ${template.color}`,
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-dashboard-text group-hover:text-purple-500 transition-colors">
              {template.title}
            </h4>
            <p className="text-sm text-dashboard-text-muted">
              ~${template.estimatedCost.toLocaleString()}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-dashboard-text-muted group-hover:text-purple-500 transition-colors" />
        </div>
      </CardContent>
    </Card>
  );
};

export default function DreamBudget() {
  const { actualTheme } = useTheme();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCustomDream, setShowCustomDream] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showDreamDetails, setShowDreamDetails] = useState(false);
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null);

  // Custom dream form state
  const [dreamForm, setDreamForm] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
    selectedIcon: Target,
    selectedColor: colorOptions[0],
  });

  // Add money form state
  const [addMoneyForm, setAddMoneyForm] = useState({
    amount: "",
    note: "",
  });

  // Load dreams from localStorage
  const [dreams, setDreams] = useState<Dream[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibewealth-dreams");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert icon names back to components
        return parsed.map((dream: any) => ({
          ...dream,
          icon:
            iconOptions.find((opt) => opt.label === dream.iconLabel)?.icon ||
            Target,
        }));
      }
    }
    return [
      {
        id: "1",
        title: "Travel to Japan",
        icon: Plane,
        targetAmount: 5000,
        currentAmount: 1250,
        deadline: "Dec 2024",
        color: "from-blue-500 to-cyan-500",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Emergency Fund",
        icon: Target,
        targetAmount: 10000,
        currentAmount: 3500,
        deadline: "Jun 2025",
        color: "from-green-500 to-emerald-500",
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Save dreams to localStorage whenever dreams change
  useEffect(() => {
    const dreamsToSave = dreams.map((dream) => ({
      ...dream,
      iconLabel:
        iconOptions.find((opt) => opt.icon === dream.icon)?.label || "Target",
    }));
    if (typeof window !== "undefined") {
      localStorage.setItem("vibewealth-dreams", JSON.stringify(dreamsToSave));
    }
  }, [dreams]);

  const handleTemplateSelect = (template: (typeof dreamTemplates)[0]) => {
    setDreamForm({
      title: template.title,
      targetAmount: template.estimatedCost.toString(),
      deadline: "",
      selectedIcon: template.icon,
      selectedColor: template.color,
    });
    setShowTemplates(false);
    setShowCustomDream(true);
  };

  const handleCreateDream = () => {
    if (!dreamForm.title || !dreamForm.targetAmount || !dreamForm.deadline) {
      return;
    }

    const newDream: Dream = {
      id: Date.now().toString(),
      title: dreamForm.title,
      icon: dreamForm.selectedIcon,
      targetAmount: parseFloat(dreamForm.targetAmount),
      currentAmount: 0,
      deadline: dreamForm.deadline,
      color: dreamForm.selectedColor,
      createdAt: new Date().toISOString(),
    };

    setDreams([...dreams, newDream]);
    setDreamForm({
      title: "",
      targetAmount: "",
      deadline: "",
      selectedIcon: Target,
      selectedColor: colorOptions[0],
    });
    setShowCustomDream(false);
  };

  const handleAddMoney = () => {
    if (!selectedDream || !addMoneyForm.amount) return;

    const amount = parseFloat(addMoneyForm.amount);
    setDreams(
      dreams.map((dream) =>
        dream.id === selectedDream.id
          ? { ...dream, currentAmount: dream.currentAmount + amount }
          : dream,
      ),
    );

    setAddMoneyForm({ amount: "", note: "" });
    setShowAddMoney(false);
    setSelectedDream(null);
  };

  const totalDreamsValue = dreams.reduce(
    (sum, dream) => sum + dream.targetAmount,
    0,
  );
  const totalSaved = dreams.reduce(
    (sum, dream) => sum + dream.currentAmount,
    0,
  );
  const overallProgress =
    totalDreamsValue > 0 ? (totalSaved / totalDreamsValue) * 100 : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8 h-full">
        {/* Header */}
        <DashboardHeader pageName="Dream Budget" />

        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-dashboard-text">
              Dream Budget
            </h1>
            <p className="text-dashboard-text-muted mt-2">
              Turn your dreams into achievable financial goals
            </p>
          </div>

          <Button
            onClick={() => setShowTemplates(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Dream
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-purple-200 dark:border-purple-800/30 rounded-3xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Total Dreams
                  </p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {dreams.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-800/30 rounded-3xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Total Saved
                  </p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    ${totalSaved.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 dark:border-orange-800/30 rounded-3xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    Overall Progress
                  </p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                    {Math.round(overallProgress)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dreams Grid */}
        {dreams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-hidden">
            {dreams.map((dream) => (
              <DreamCard
                key={dream.id}
                dream={dream}
                onAddMoney={() => {
                  setSelectedDream(dream);
                  setShowAddMoney(true);
                }}
                onViewDetails={() => {
                  setSelectedDream(dream);
                  setShowDreamDetails(true);
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg">
            <CardContent className="p-12 text-center">
              <Target className="w-16 h-16 text-dashboard-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dashboard-text mb-2">
                No Dreams Yet
              </h3>
              <p className="text-dashboard-text-muted mb-6">
                Start by creating your first financial goal
              </p>
              <Button
                onClick={() => setShowTemplates(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Dream
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Templates Dialog */}
        <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
          <DialogContent className="sm:max-w-2xl rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-dashboard-text">
                Choose Your Dream
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dreamTemplates.map((template) => (
                  <DreamTemplateCard
                    key={template.title}
                    template={template}
                    onSelect={() => handleTemplateSelect(template)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-sm text-dashboard-text-muted">
                  or
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <Button
                onClick={() => {
                  setShowTemplates(false);
                  setShowCustomDream(true);
                }}
                variant="outline"
                className="w-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 py-4"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Custom Dream
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Custom Dream Dialog */}
        <Dialog open={showCustomDream} onOpenChange={setShowCustomDream}>
          <DialogContent className="sm:max-w-lg rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-dashboard-text">
                Create Custom Dream
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="dream-title">Dream Title</Label>
                <Input
                  id="dream-title"
                  placeholder="e.g., Buy a new car"
                  value={dreamForm.title}
                  onChange={(e) =>
                    setDreamForm({ ...dreamForm, title: e.target.value })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-amount">Target Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="target-amount"
                    type="number"
                    placeholder="25000"
                    value={dreamForm.targetAmount}
                    onChange={(e) =>
                      setDreamForm({
                        ...dreamForm,
                        targetAmount: e.target.value,
                      })
                    }
                    className="pl-10 rounded-2xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Target Date</Label>
                <Input
                  id="deadline"
                  placeholder="e.g., Dec 2024"
                  value={dreamForm.deadline}
                  onChange={(e) =>
                    setDreamForm({ ...dreamForm, deadline: e.target.value })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Choose Icon</Label>
                <div className="grid grid-cols-4 gap-2">
                  {iconOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() =>
                          setDreamForm({
                            ...dreamForm,
                            selectedIcon: option.icon,
                          })
                        }
                        className={cn(
                          "p-3 rounded-2xl border-2 transition-all duration-200",
                          dreamForm.selectedIcon === option.icon
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
                        )}
                      >
                        <Icon className="w-6 h-6 mx-auto text-dashboard-text" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Choose Color</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setDreamForm({ ...dreamForm, selectedColor: color })
                      }
                      className={cn(
                        "w-12 h-12 rounded-2xl border-2 transition-all duration-200",
                        `bg-gradient-to-r ${color}`,
                        dreamForm.selectedColor === color
                          ? "border-gray-600 dark:border-gray-300 scale-110"
                          : "border-gray-300 dark:border-gray-600 hover:scale-105",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCustomDream(false)}
                  className="flex-1 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleCreateDream}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                >
                  Create Dream
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Money Dialog */}
        <Dialog open={showAddMoney} onOpenChange={setShowAddMoney}>
          <DialogContent className="sm:max-w-md rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-dashboard-text">
                Add Money to {selectedDream?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="add-amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="add-amount"
                    type="number"
                    placeholder="100"
                    value={addMoneyForm.amount}
                    onChange={(e) =>
                      setAddMoneyForm({
                        ...addMoneyForm,
                        amount: e.target.value,
                      })
                    }
                    className="pl-10 rounded-2xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-note">Note (Optional)</Label>
                <Input
                  id="add-note"
                  placeholder="e.g., Birthday money"
                  value={addMoneyForm.note}
                  onChange={(e) =>
                    setAddMoneyForm({ ...addMoneyForm, note: e.target.value })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddMoney(false)}
                  className="flex-1 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleAddMoney}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                >
                  Add Money
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Bottom padding */}
        <div className="pb-8" />
      </div>
    </DashboardLayout>
  );
}