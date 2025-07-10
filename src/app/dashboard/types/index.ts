/**
 * Shared TypeScript interfaces and types for the dashboard
 * TODO: Generate from backend schema when API is implemented
 */

// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// User types
export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  currency: string;
  language: string;
  timezone: string;
  profilePicture?: string;
}

// Transaction types
export type TransactionType = 'income' | 'expense' | 'transfer';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction extends BaseEntity {
  name: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  type: TransactionType;
  category: string;
  description?: string;
  account?: string;
}

// Dream/Goals types
export interface Dream extends BaseEntity {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
  iconLabel?: string; // For localStorage serialization
}

// Notification types
export type NotificationType = 'payment' | 'income' | 'budget' | 'goal' | 'achievement' | 'reminder' | 'system';
export type Priority = 'high' | 'medium' | 'low';

export interface Notification extends BaseEntity {
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: Priority;
  amount?: number;
  category?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Smart Nudge types
export type NudgeType = 'spending' | 'goal' | 'reminder' | 'investment' | 'achievement';

export interface SmartNudge extends BaseEntity {
  type: NudgeType;
  title: string;
  message: string;
  amount?: number;
  category?: string;
  priority: Priority;
  timestamp: string;
  isCompleted?: boolean;
  isArchived?: boolean;
  goalProgress?: number;
  goalTarget?: number;
  actionRequired?: boolean;
  iconName: string;
  color: string;
}

// Chat types
export interface ChatMessage extends BaseEntity {
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'goal';
}

export interface ChatSession extends BaseEntity {
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: ChatMessage[];
}

// Settings types
export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  transactionAlerts: boolean;
  budgetAlerts: boolean;
  goalReminders: boolean;
  weeklyReports: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  dataSharing: boolean;
  analyticsOptOut: boolean;
  marketingEmails: boolean;
}

export interface AppSettings {
  userData: User;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  theme: 'light' | 'dark' | 'system';
}

// Budget and Goals types
export interface BudgetAlert extends BaseEntity {
  category: string;
  limit: number;
  period: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
}

export interface SavingsGoal extends BaseEntity {
  name: string;
  target: number;
  current: number;
  deadline: string;
  description?: string;
  priority: Priority;
}

// Content types for friendly content page
export interface ContentItem extends BaseEntity {
  title: string;
  type: 'article' | 'video' | 'interactive' | 'meme';
  duration?: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  author: string;
  publishedAt: string;
  readTime?: string;
  videoLength?: string;
  featured?: boolean;
  likes: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  thumbnail?: string;
}

// API Response types (for future backend integration)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface TransactionForm {
  name: string;
  amount: string;
  category: string;
  type: TransactionType;
  description: string;
  account: string;
  date: string;
}

export interface DreamForm {
  title: string;
  targetAmount: string;
  deadline: string;
  selectedIcon: React.ComponentType<{ className?: string }>;
  selectedColor: string;
}

// Filter and search types
export interface FilterOptions {
  searchTerm: string;
  category?: string;
  type?: string;
  dateRange?: string;
  priority?: Priority;
}

// Statistics types
export interface FinancialStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  netWorth: number;
  monthlyGrowth: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  count: number;
  color: string;
}
