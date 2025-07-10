"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTheme } from "@/components/Dashboard/ThemeContext";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Globe,
  Palette,
  Shield,
  CreditCard,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Camera,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  ArrowRight,
  Settings as SettingsIcon,
  Smartphone,
  Calendar,
  DollarSign,
  Languages,
  HelpCircle,
  FileText,
  LogOut,
} from "lucide-react";
import { cn } from "../../../../lib/utils";

// Mock user data - this would come from your authentication system
const initialUserData = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1990-05-15",
  currency: "USD",
  language: "en",
  timezone: "America/New_York",
  profilePicture: "",
};

// Currency options
const currencies = [
  { value: "USD", label: "US Dollar ($)", symbol: "$" },
  { value: "EUR", label: "Euro (€)", symbol: "€" },
  { value: "GBP", label: "British Pound (£)", symbol: "£" },
  { value: "JPY", label: "Japanese Yen (¥)", symbol: "¥" },
  { value: "CAD", label: "Canadian Dollar (C$)", symbol: "C$" },
  { value: "AUD", label: "Australian Dollar (A$)", symbol: "A$" },
  { value: "INR", label: "Indian Rupee (₹)", symbol: "₹" },
  { value: "CNY", label: "Chinese Yuan (¥)", symbol: "¥" },
];

// Language options
const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
];

// Timezone options (abbreviated for brevity)
const timezones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "GMT" },
  { value: "Europe/Paris", label: "Central European Time" },
  { value: "Asia/Tokyo", label: "Japan Standard Time" },
  { value: "Asia/Shanghai", label: "China Standard Time" },
  { value: "Asia/Kolkata", label: "India Standard Time" },
];

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  icon: Icon,
  children,
}) => (
  <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
    <CardHeader className="border-b border-dashboard-border">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center shadow-md">
          <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <CardTitle className="text-xl text-dashboard-text">
            {title}
          </CardTitle>
          <p className="text-sm text-dashboard-text-muted mt-1">
            {description}
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-6">{children}</CardContent>
  </Card>
);

export default function Settings() {
  const { theme, setTheme, actualTheme } = useTheme();
  const [userData, setUserData] = useState(initialUserData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    budgetAlerts: true,
    goalReminders: true,
    weeklyReports: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    dataSharing: false,
    analyticsOptOut: false,
    marketingEmails: false,
  });
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settingsData = {
      userData,
      notifications,
      privacy,
      theme: actualTheme,
    };
    localStorage.setItem("vibewealth-settings", JSON.stringify(settingsData));
  }, [userData, notifications, privacy, actualTheme]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("vibewealth-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.userData) setUserData(parsed.userData);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.privacy) setPrivacy(parsed.privacy);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  const handleSaveProfile = async () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const handleResetPreferences = () => {
    setNotifications({
      emailNotifications: true,
      pushNotifications: true,
      transactionAlerts: true,
      budgetAlerts: true,
      goalReminders: true,
      weeklyReports: false,
    });
    setPrivacy({
      profileVisibility: "private",
      dataSharing: false,
      analyticsOptOut: false,
      marketingEmails: false,
    });
    setTheme("system");
    setShowResetDialog(false);
    alert("Preferences reset to default!");
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  const TabButton: React.FC<{
    tab: any;
    isActive: boolean;
    onClick: () => void;
  }> = ({ tab, isActive, onClick }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center justify-start gap-2 w-full px-3 py-3 text-left rounded-2xl transition-all duration-300 min-h-[44px]",
          isActive
            ? "bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-purple-600 dark:text-purple-400 border border-purple-400/30 shadow-lg"
            : "text-dashboard-text-muted hover:text-dashboard-text hover:bg-gray-100 dark:hover:bg-gray-800/50",
        )}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="font-medium flex-1 text-xs leading-tight">
          {tab.label}
        </span>
        {isActive && (
          <ArrowRight className="w-3 h-3 flex-shrink-0 text-purple-600 dark:text-purple-400" />
        )}
      </button>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 h-full">
        {/* Header */}
        <DashboardHeader pageName="Settings" />

        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-dashboard-text">
              Settings
            </h1>
            <p className="text-dashboard-text-muted mt-2">
              Manage your account, security, and preferences
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saveStatus === "saved" && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Saved!</span>
              </div>
            )}
            {saveStatus === "saving" && (
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">Saving...</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Tabs */}
        <div className="xl:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 whitespace-nowrap flex-shrink-0",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-purple-600 dark:text-purple-400 border border-purple-400/30 shadow-lg"
                      : "text-dashboard-text-muted hover:text-dashboard-text hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-dashboard-border",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden xl:block xl:col-span-1">
            <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg sticky top-6">
              <CardContent className="p-3">
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <TabButton
                      key={tab.id}
                      tab={tab}
                      isActive={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="xl:col-span-4 space-y-8">
                      {/* Account Information */}
                      {activeTab === "account" && (
                        <div className="space-y-8">
                          <SettingsSection
                            title="Profile Information"
                            description="Update your personal information and profile details"
                            icon={User}
                          >
                            <div className="space-y-6">
                              {/* Profile Picture */}
                              <div className="flex items-center gap-6">
                                <div className="relative">
                                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-2xl">
                                      {userData.firstName[0]}
                                      {userData.lastName[0]}
                                    </span>
                                  </div>
                                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--dashboard-card)] border-2 border-[var(--dashboard-border)] rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                                    <Camera className="w-4 h-4 text-[var(--dashboard-text)]" />
                                  </button>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-[var(--dashboard-text)]">
                                    Profile Picture
                                  </h3>
                                  <p className="text-sm text-[var(--dashboard-text-muted)]">
                                    Upload a new avatar for your profile
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 rounded-2xl"
                                  >
                                    Change Photo
                                  </Button>
                                </div>
                              </div>
          
                              {/* Name Fields */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label htmlFor="firstName">First Name</Label>
                                  <Input
                                    id="firstName"
                                    value={userData.firstName}
                                    onChange={(e) =>
                                      setUserData({
                                        ...userData,
                                        firstName: e.target.value,
                                      })
                                    }
                                    className="rounded-2xl"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lastName">Last Name</Label>
                                  <Input
                                    id="lastName"
                                    value={userData.lastName}
                                    onChange={(e) =>
                                      setUserData({
                                        ...userData,
                                        lastName: e.target.value,
                                      })
                                    }
                                    className="rounded-2xl"
                                  />
                                </div>
                              </div>
          
                              {/* Contact Information */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label htmlFor="email">Email Address</Label>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                      id="email"
                                      type="email"
                                      value={userData.email}
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
                                          email: e.target.value,
                                        })
                                      }
                                      className="pl-10 rounded-2xl"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="phone">Phone Number</Label>
                                  <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                      id="phone"
                                      type="tel"
                                      value={userData.phone}
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
                                          phone: e.target.value,
                                        })
                                      }
                                      className="pl-10 rounded-2xl"
                                    />
                                  </div>
                                </div>
                              </div>
          
                              {/* Date of Birth */}
                              <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <div className="relative max-w-xs">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={userData.dateOfBirth}
                                    onChange={(e) =>
                                      setUserData({
                                        ...userData,
                                        dateOfBirth: e.target.value,
                                      })
                                    }
                                    className="pl-10 rounded-2xl"
                                  />
                                </div>
                              </div>
          
                              <Button
                                onClick={handleSaveProfile}
                                disabled={saveStatus === "saving"}
                                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl px-8"
                              >
                                {saveStatus === "saving" ? (
                                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  <Save className="w-4 h-4 mr-2" />
                                )}
                                Save Profile
                              </Button>
                            </div>
                          </SettingsSection>
                        </div>
                      )}
          
                      {/* Security Settings */}
                      {activeTab === "security" && (
                        <div className="space-y-8">
                          <SettingsSection
                            title="Password & Security"
                            description="Manage your password and security settings"
                            icon={Shield}
                          >
                            <div className="space-y-6">
                              <Alert>
                                <Shield className="w-4 h-4" />
                                <AlertDescription>
                                  Choose a strong password with at least 8 characters,
                                  including letters, numbers, and symbols.
                                </AlertDescription>
                              </Alert>
          
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="currentPassword">
                                    Current Password
                                  </Label>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                      id="currentPassword"
                                      type={showPassword.current ? "text" : "password"}
                                      value={passwordData.currentPassword}
                                      onChange={(e) =>
                                        setPasswordData({
                                          ...passwordData,
                                          currentPassword: e.target.value,
                                        })
                                      }
                                      className="pl-10 pr-10 rounded-2xl"
                                      placeholder="Enter current password"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setShowPassword({
                                          ...showPassword,
                                          current: !showPassword.current,
                                        })
                                      }
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                      {showPassword.current ? (
                                        <EyeOff className="w-4 h-4" />
                                      ) : (
                                        <Eye className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>
                                </div>
          
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <div className="relative">
                                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                      <Input
                                        id="newPassword"
                                        type={showPassword.new ? "text" : "password"}
                                        value={passwordData.newPassword}
                                        onChange={(e) =>
                                          setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value,
                                          })
                                        }
                                        className="pl-10 pr-10 rounded-2xl"
                                        placeholder="Enter new password"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setShowPassword({
                                            ...showPassword,
                                            new: !showPassword.new,
                                          })
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                      >
                                        {showPassword.new ? (
                                          <EyeOff className="w-4 h-4" />
                                        ) : (
                                          <Eye className="w-4 h-4" />
                                        )}
                                      </button>
                                    </div>
                                  </div>
          
                                  <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                      Confirm Password
                                    </Label>
                                    <div className="relative">
                                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                      <Input
                                        id="confirmPassword"
                                        type={showPassword.confirm ? "text" : "password"}
                                        value={passwordData.confirmPassword}
                                        onChange={(e) =>
                                          setPasswordData({
                                            ...passwordData,
                                            confirmPassword: e.target.value,
                                          })
                                        }
                                        className="pl-10 pr-10 rounded-2xl"
                                        placeholder="Confirm new password"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setShowPassword({
                                            ...showPassword,
                                            confirm: !showPassword.confirm,
                                          })
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                      >
                                        {showPassword.confirm ? (
                                          <EyeOff className="w-4 h-4" />
                                        ) : (
                                          <Eye className="w-4 h-4" />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
          
                              <Button
                                onClick={handlePasswordChange}
                                disabled={
                                  !passwordData.currentPassword ||
                                  !passwordData.newPassword ||
                                  !passwordData.confirmPassword ||
                                  saveStatus === "saving"
                                }
                                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl px-8"
                              >
                                {saveStatus === "saving" ? (
                                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  <Lock className="w-4 h-4 mr-2" />
                                )}
                                Update Password
                              </Button>
                            </div>
                          </SettingsSection>
          
                          <SettingsSection
                            title="Two-Factor Authentication"
                            description="Add an extra layer of security to your account"
                            icon={Smartphone}
                          >
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                                    <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-[var(--dashboard-text)]">
                                      SMS Authentication
                                    </h4>
                                    <p className="text-sm text-[var(--dashboard-text-muted)]">
                                      Receive codes via text message
                                    </p>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="rounded-xl">
                                  Recommended
                                </Badge>
                              </div>
                              <Button
                                variant="outline"
                                className="w-full rounded-2xl border-2 border-dashed"
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Set Up Two-Factor Authentication
                              </Button>
                            </div>
                          </SettingsSection>
                        </div>
                      )}
          
                      {/* Notifications */}
                      {activeTab === "notifications" && (
                        <SettingsSection
                          title="Notification Preferences"
                          description="Control how and when you receive notifications"
                          icon={Bell}
                        >
                          <div className="space-y-6">
                            {Object.entries({
                              emailNotifications: "Email Notifications",
                              pushNotifications: "Push Notifications",
                              transactionAlerts: "Transaction Alerts",
                              budgetAlerts: "Budget Alerts",
                              goalReminders: "Goal Reminders",
                              weeklyReports: "Weekly Reports",
                            }).map(([key, label]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
                              >
                                <div>
                                  <h4 className="font-medium text-[var(--dashboard-text)]">
                                    {label}
                                  </h4>
                                  <p className="text-sm text-[var(--dashboard-text-muted)]">
                                    {key === "emailNotifications" &&
                                      "Receive notifications via email"}
                                    {key === "pushNotifications" &&
                                      "Receive push notifications on your device"}
                                    {key === "transactionAlerts" &&
                                      "Get notified of new transactions"}
                                    {key === "budgetAlerts" &&
                                      "Alerts when approaching budget limits"}
                                    {key === "goalReminders" &&
                                      "Reminders about your financial goals"}
                                    {key === "weeklyReports" &&
                                      "Weekly summary of your finances"}
                                  </p>
                                </div>
                                <Switch
                                  checked={
                                    notifications[key as keyof typeof notifications]
                                  }
                                  onCheckedChange={(checked) =>
                                    setNotifications({
                                      ...notifications,
                                      [key]: checked,
                                    })
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </SettingsSection>
                      )}
          
                      {/* Preferences */}
                      {activeTab === "preferences" && (
                        <div className="space-y-8">
                          <SettingsSection
                            title="Appearance"
                            description="Customize the look and feel of your dashboard"
                            icon={Palette}
                          >
                            <div className="space-y-6">
                              <div className="space-y-4">
                                <Label>Theme</Label>
                                <div className="grid grid-cols-3 gap-4">
                                  {[
                                    { value: "light", label: "Light", icon: Sun },
                                    { value: "dark", label: "Dark", icon: Moon },
                                    {
                                      value: "system",
                                      label: "System",
                                      icon: Smartphone,
                                    },
                                  ].map((themeOption) => {
                                    const Icon = themeOption.icon;
                                    return (
                                      <button
                                        key={themeOption.value}
                                        onClick={() => setTheme(themeOption.value as any)}
                                        className={cn(
                                          "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300",
                                          theme === themeOption.value
                                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
                                        )}
                                      >
                                        <Icon className="w-6 h-6 text-[var(--dashboard-text)]" />
                                        <span className="font-medium text-[var(--dashboard-text)]">
                                          {themeOption.label}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </SettingsSection>
          
                          <SettingsSection
                            title="Localization"
                            description="Set your currency, language, and timezone preferences"
                            icon={Globe}
                          >
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label>Currency</Label>
                                  <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Select
                                      value={userData.currency}
                                      onValueChange={(value) =>
                                        setUserData({ ...userData, currency: value })
                                      }
                                    >
                                      <SelectTrigger className="pl-10 rounded-2xl">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {currencies.map((currency) => (
                                          <SelectItem
                                            key={currency.value}
                                            value={currency.value}
                                          >
                                            {currency.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
          
                                <div className="space-y-2">
                                  <Label>Language</Label>
                                  <div className="relative">
                                    <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Select
                                      value={userData.language}
                                      onValueChange={(value) =>
                                        setUserData({ ...userData, language: value })
                                      }
                                    >
                                      <SelectTrigger className="pl-10 rounded-2xl">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {languages.map((language) => (
                                          <SelectItem
                                            key={language.value}
                                            value={language.value}
                                          >
                                            {language.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
          
                              <div className="space-y-2">
                                <Label>Timezone</Label>
                                <div className="relative max-w-md">
                                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  <Select
                                    value={userData.timezone}
                                    onValueChange={(value) =>
                                      setUserData({ ...userData, timezone: value })
                                    }
                                  >
                                    <SelectTrigger className="pl-10 rounded-2xl">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timezones.map((timezone) => (
                                        <SelectItem
                                          key={timezone.value}
                                          value={timezone.value}
                                        >
                                          {timezone.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </SettingsSection>
                        </div>
                      )}
          
                      {/* Privacy Settings */}
                      {activeTab === "privacy" && (
                        <SettingsSection
                          title="Privacy & Data"
                          description="Control your privacy settings and data usage"
                          icon={Lock}
                        >
                          <div className="space-y-6">
                            {(["dataSharing", "analyticsOptOut", "marketingEmails"] as const).map((key) => (
                            <div
                                key={key}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
                            >
                                <div>
                                <h4 className="font-medium text-dashboard-text">{{
                                    dataSharing: "Data Sharing with Partners",
                                    analyticsOptOut: "Opt out of Analytics",
                                    marketingEmails: "Marketing Emails",
                                }[key]}</h4>
                                <p className="text-sm text-dashboard-text-muted">
                                    {key === "dataSharing" &&
                                    "Allow sharing anonymized data with trusted partners"}
                                    {key === "analyticsOptOut" &&
                                    "Prevent collection of usage analytics"}
                                    {key === "marketingEmails" &&
                                    "Receive promotional emails and offers"}
                                </p>
                                </div>
                                <Switch
                                checked={privacy[key]}
                                onCheckedChange={(checked) =>
                                    setPrivacy({
                                    ...privacy,
                                    [key]: checked,
                                    })
                                }
                                />
                            </div>
                            ))}
          
                            <div className="pt-6 border-t border-[var(--dashboard-border)]">
                              <h4 className="font-medium text-[var(--dashboard-text)] mb-4">
                                Data Export & Deletion
                              </h4>
                              <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="outline" className="rounded-2xl">
                                  <Download className="w-4 h-4 mr-2" />
                                  Export My Data
                                </Button>
                                <Dialog
                                  open={showDeleteDialog}
                                  onOpenChange={setShowDeleteDialog}
                                >
                                  <DialogTrigger asChild>
                                    <Button variant="destructive" className="rounded-2xl">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete Account
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="rounded-3xl">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center gap-2 text-red-600">
                                        <AlertTriangle className="w-5 h-5" />
                                        Delete Account
                                      </DialogTitle>
                                      <DialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and remove all
                                        your data from our servers.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex gap-3 pt-4">
                                      <Button
                                        variant="outline"
                                        onClick={() => setShowDeleteDialog(false)}
                                        className="flex-1 rounded-2xl"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        className="flex-1 rounded-2xl"
                                      >
                                        Yes, Delete Account
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        </SettingsSection>
                      )}
          
                      {/* Support */}
                      {activeTab === "support" && (
                        <div className="space-y-8">
                          <SettingsSection
                            title="Help & Support"
                            description="Get help and manage your account preferences"
                            icon={HelpCircle}
                          >
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                  <FileText className="w-5 h-5 text-[var(--dashboard-text-muted)]" />
                                  <div className="text-left">
                                    <h4 className="font-medium text-[var(--dashboard-text)]">
                                      Documentation
                                    </h4>
                                    <p className="text-sm text-[var(--dashboard-text-muted)]">
                                      Learn how to use VibeWealth
                                    </p>
                                  </div>
                                </button>
          
                                <button className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                  <HelpCircle className="w-5 h-5 text-[var(--dashboard-text-muted)]" />
                                  <div className="text-left">
                                    <h4 className="font-medium text-[var(--dashboard-text)]">
                                      Contact Support
                                    </h4>
                                    <p className="text-sm text-[var(--dashboard-text-muted)]">
                                      Get help from our team
                                    </p>
                                  </div>
                                </button>
                              </div>
          
                              <Dialog
                                open={showResetDialog}
                                onOpenChange={setShowResetDialog}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full rounded-2xl border-2 border-dashed"
                                  >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Reset All Preferences
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-3xl">
                                  <DialogHeader>
                                    <DialogTitle>Reset Preferences</DialogTitle>
                                    <DialogDescription>
                                      This will reset all your preferences including
                                      notifications, privacy settings, and theme to their
                                      default values. This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex gap-3 pt-4">
                                    <Button
                                      variant="outline"
                                      onClick={() => setShowResetDialog(false)}
                                      className="flex-1 rounded-2xl"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleResetPreferences}
                                      className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                                    >
                                      Reset Preferences
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </SettingsSection>
                        </div>
                      )}
                    </div>
                  </div>
          
                  {/* Bottom padding */}
                  <div className="pb-8" />
                </div>
              </DashboardLayout>
  );
}