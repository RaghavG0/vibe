/**
 * Mock data for the dashboard
 * TODO: Replace with API calls when backend is implemented
 */

import {
  Transaction,
  User,
  Dream,
  SmartNudge,
  Notification,
  ContentItem,
  SavingsGoal,
  BudgetAlert,
  NotificationSettings,
  PrivacySettings,
} from '../types';

import {
  Plane,
  Car,
  Home,
  GraduationCap,
  Heart,
  Camera,
  Target,
  PiggyBank,
  Utensils,
  ShoppingCart,
  Receipt,
  Film,
  Book,
  Send,
  Wallet,
  Briefcase,
  Smartphone,
  Coffee,
  Music,
  MoreHorizontal,
  TrendingUp,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Bell,
  DollarSign,
  Calendar,
  Settings,
  Gift,
  BookOpen,
  Play,
  Zap,
  Star,
  Lightbulb,
} from 'lucide-react';

// User data
export const mockUserData: User = {
  id: '1',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-05-15',
  currency: 'USD',
  language: 'en',
  timezone: 'America/New_York',
  profilePicture: '',
  createdAt: new Date().toISOString(),
};

// Transaction categories with icons
export const transactionCategories = [
  { value: 'food', label: 'Food & Dining', icon: Utensils, color: 'bg-orange-500' },
  { value: 'transport', label: 'Transportation', icon: Car, color: 'bg-blue-500' },
  { value: 'shopping', label: 'Shopping', icon: ShoppingCart, color: 'bg-pink-500' },
  { value: 'bills', label: 'Bills & Utilities', icon: Receipt, color: 'bg-red-500' },
  { value: 'entertainment', label: 'Entertainment', icon: Film, color: 'bg-purple-500' },
  { value: 'health', label: 'Health & Fitness', icon: Heart, color: 'bg-red-400' },
  { value: 'education', label: 'Education', icon: Book, color: 'bg-indigo-500' },
  { value: 'transfer', label: 'Transfer', icon: Send, color: 'bg-gray-500' },
  { value: 'salary', label: 'Salary', icon: Wallet, color: 'bg-green-500' },
  { value: 'freelance', label: 'Freelance', icon: Briefcase, color: 'bg-cyan-500' },
  { value: 'rent', label: 'Rent', icon: Home, color: 'bg-yellow-500' },
  { value: 'phone', label: 'Phone', icon: Smartphone, color: 'bg-teal-500' },
  { value: 'coffee', label: 'Coffee', icon: Coffee, color: 'bg-amber-600' },
  { value: 'travel', label: 'Travel', icon: Plane, color: 'bg-sky-500' },
  { value: 'music', label: 'Music', icon: Music, color: 'bg-violet-500' },
  { value: 'other', label: 'Other', icon: MoreHorizontal, color: 'bg-gray-400' },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Transfer from Upwork platform',
    amount: 540,
    date: '2024-02-22',
    status: 'completed',
    type: 'income',
    category: 'freelance',
    description: 'Freelance project payment',
    account: 'Bank Account',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Juno Salary',
    amount: 1920,
    date: '2024-02-03',
    status: 'completed',
    type: 'income',
    category: 'salary',
    description: 'Monthly salary payment',
    account: 'Bank Account',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Transfer to: Mom',
    amount: -420,
    date: '2024-02-03',
    status: 'completed',
    type: 'expense',
    category: 'transfer',
    description: 'Family support',
    account: 'Bank Account',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'City Tax',
    amount: -32,
    date: '2024-02-22',
    status: 'completed',
    type: 'expense',
    category: 'bills',
    description: 'Municipal tax payment',
    account: 'Bank Account',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Online Shopping: Zara Store',
    amount: -72,
    date: '2024-01-27',
    status: 'completed',
    type: 'expense',
    category: 'shopping',
    description: 'Clothing purchase',
    account: 'Credit Card',
    createdAt: new Date().toISOString(),
  },
];

// Stock market data
export const mockStockMarketData = {
  topGainers: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.41, change: +4.85, changePercent: +2.63 },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 378.85, change: +8.92, changePercent: +2.41 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 134.12, change: +2.87, changePercent: +2.19 },
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: 144.73, change: +2.94, changePercent: +2.07 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: +4.12, changePercent: +1.69 },
  ],
  topLosers: [
    { symbol: 'META', name: 'Meta Platforms', price: 318.75, change: -7.83, changePercent: -2.39 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 421.32, change: -9.15, changePercent: -2.13 },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 451.23, change: -8.76, changePercent: -1.9 },
    { symbol: 'CRM', name: 'Salesforce Inc', price: 215.67, change: -3.94, changePercent: -1.79 },
    { symbol: 'PYPL', name: 'PayPal Holdings', price: 57.82, change: -0.96, changePercent: -1.63 },
  ],
};

// Mock dreams/savings goals
export const mockDreams: Dream[] = [
  {
    id: '1',
    title: 'Travel to Japan',
    icon: Plane,
    targetAmount: 5000,
    currentAmount: 1250,
    deadline: 'Dec 2024',
    color: 'from-blue-500 to-cyan-500',
    iconLabel: 'Plane',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Emergency Fund',
    icon: Target,
    targetAmount: 10000,
    currentAmount: 3500,
    deadline: 'Jun 2025',
    color: 'from-green-500 to-emerald-500',
    iconLabel: 'Target',
    createdAt: new Date().toISOString(),
  },
];

// Dream templates
export const dreamTemplates = [
  { title: 'Travel to Japan', icon: Plane, estimatedCost: 5000, color: 'from-blue-500 to-cyan-500' },
  { title: 'Buy a Car', icon: Car, estimatedCost: 25000, color: 'from-green-500 to-emerald-500' },
  { title: 'Down Payment', icon: Home, estimatedCost: 50000, color: 'from-purple-500 to-pink-500' },
  { title: 'Graduate Degree', icon: GraduationCap, estimatedCost: 30000, color: 'from-orange-500 to-red-500' },
  { title: 'Wedding', icon: Heart, estimatedCost: 20000, color: 'from-pink-500 to-rose-500' },
  { title: 'Photography Gear', icon: Camera, estimatedCost: 3000, color: 'from-indigo-500 to-purple-500' },
];

// Mock smart nudges
export const mockSmartNudges: SmartNudge[] = [
  {
    id: '1',
    type: 'spending',
    title: 'High Food Spending Alert',
    message: "You've spent $340 on food this week, which is 40% above your budget. Consider meal planning to reduce costs.",
    amount: 340,
    category: 'Food & Dining',
    priority: 'high',
    timestamp: '2 hours ago',
    actionRequired: true,
    iconName: 'Coffee',
    color: 'from-red-500 to-orange-500',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'goal',
    title: 'Japan Trip Goal Update',
    message: "You're doing great! You've saved 65% toward your Japan trip goal. Only $1,750 left to reach your target.",
    amount: 3250,
    goalProgress: 65,
    goalTarget: 5000,
    priority: 'medium',
    timestamp: '4 hours ago',
    iconName: 'Plane',
    color: 'from-green-500 to-emerald-500',
    createdAt: new Date().toISOString(),
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Due Reminder',
    message: 'Your electricity bill of $120 is due tomorrow',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'high',
    amount: 120,
    category: 'Bills',
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'income',
    title: 'Income Received',
    message: 'Freelance payment of $540 has been credited',
    timestamp: '5 hours ago',
    isRead: false,
    priority: 'medium',
    amount: 540,
    category: 'Freelance',
    icon: TrendingUp,
    color: 'text-green-600 dark:text-green-400',
    createdAt: new Date().toISOString(),
  },
];

// Mock content items
export const mockContentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Building Your Emergency Fund: A Complete Guide',
    type: 'article',
    category: 'Savings',
    difficulty: 'Beginner',
    description: 'Learn how to build a solid emergency fund that protects you from financial uncertainties. Includes practical steps and real examples.',
    author: 'Sarah Chen',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    featured: true,
    likes: 234,
    icon: PiggyBank,
    color: 'from-green-500 to-emerald-500',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Credit Card Rewards: Maximize Your Benefits',
    type: 'video',
    category: 'Credit',
    difficulty: 'Intermediate',
    description: 'Discover advanced strategies to maximize credit card rewards and cashback without falling into debt traps.',
    author: 'Mike Rodriguez',
    publishedAt: '2024-01-12',
    videoLength: '12 min',
    featured: false,
    likes: 189,
    icon: CreditCard,
    color: 'from-blue-500 to-cyan-500',
    createdAt: new Date().toISOString(),
  },
];

// Default settings
export const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  transactionAlerts: true,
  budgetAlerts: true,
  goalReminders: true,
  weeklyReports: false,
};

export const mockPrivacySettings: PrivacySettings = {
  profileVisibility: 'private',
  dataSharing: false,
  analyticsOptOut: false,
  marketingEmails: false,
};

// Mock savings goals
export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    target: 10000,
    current: 3500,
    deadline: '2024-12-31',
    description: '6 months of expenses',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Vacation to Japan',
    target: 5000,
    current: 1200,
    deadline: '2024-08-15',
    description: 'Summer vacation trip',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
];

// Mock budget alerts
export const mockBudgetAlerts: BudgetAlert[] = [
  {
    id: '1',
    category: 'food',
    limit: 500,
    period: 'monthly',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    category: 'entertainment',
    limit: 200,
    period: 'monthly',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

// Time period options
export const timePeriods = [
  { value: 'current', label: 'Current' },
  { value: 'this-week', label: 'This Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'last-6-months', label: 'Last 6 Months' },
  { value: 'this-year', label: 'This Year' },
  { value: 'last-year', label: 'Last Year' },
  { value: 'custom', label: 'Custom Date Range' },
];

// Currency options
export const currencies = [
  { value: 'USD', label: 'US Dollar ($)', symbol: '$' },
  { value: 'EUR', label: 'Euro (€)', symbol: '€' },
  { value: 'GBP', label: 'British Pound (£)', symbol: '£' },
  { value: 'JPY', label: 'Japanese Yen (¥)', symbol: '¥' },
  { value: 'CAD', label: 'Canadian Dollar (C$)', symbol: 'C$' },
  { value: 'AUD', label: 'Australian Dollar (A$)', symbol: 'A$' },
  { value: 'INR', label: 'Indian Rupee (₹)', symbol: '₹' },
  { value: 'CNY', label: 'Chinese Yuan (¥)', symbol: '¥' },
];

// Language options
export const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
  { value: 'zh', label: '中文' },
  { value: 'ja', label: '日本語' },
];

// Timezone options
export const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'GMT' },
  { value: 'Europe/Paris', label: 'Central European Time' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time' },
  { value: 'Asia/Shanghai', label: 'China Standard Time' },
  { value: 'Asia/Kolkata', label: 'India Standard Time' },
];
