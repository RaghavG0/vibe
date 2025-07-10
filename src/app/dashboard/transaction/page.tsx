"use client";

/**
 * Transaction Management Page - Refactored for better maintainability
 * Handles transaction CRUD operations with localStorage integration
 * TODO: Connect to backend API when available
 */

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFinancialCalculations } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/localStorage';
import { Transaction, BudgetAlert, SavingsGoal } from '../types';
import { mockTransactions, mockBudgetAlerts, mockSavingsGoals } from '../data/mockData';

// Import component sections
import { TransactionStats } from '../components/transactions/TransactionStats';
import { TransactionInsights } from '../components/transactions/TransactionInsights';
import { CategoryBreakdown } from '../components/transactions/CategoryBreakdown';
import { TransactionHistory } from '../components/transactions/TransactionHistory';
import { TransactionDialogs } from '../components/transactions/TransactionDialogs';
import { QuickActions } from '../components/transactions/QuickActions';

/**
 * Main Transaction Page Component
 * Manages all transaction-related functionality
 */
export default function TransactionsPage() {
  // Load data from localStorage with fallback to mock data
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    STORAGE_KEYS.TRANSACTIONS,
    mockTransactions
  );
  
  const [budgetAlerts, setBudgetAlerts] = useLocalStorage<BudgetAlert[]>(
    STORAGE_KEYS.BUDGET_ALERTS,
    mockBudgetAlerts
  );
  
  const [savingsGoals, setSavingsGoals] = useLocalStorage<SavingsGoal[]>(
    STORAGE_KEYS.SAVINGS_GOALS,
    mockSavingsGoals
  );

  // Financial calculations
  const { totalIncome, totalExpenses, totalBalance } = useFinancialCalculations(transactions);

  // State management
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense' | 'transfer'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<string>('month');

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isBudgetAlertOpen, setIsBudgetAlertOpen] = useState(false);
  const [isSavingsGoalOpen, setIsSavingsGoalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Apply filters effect
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    // Date filter - simplified for demo
    // TODO: Implement proper date filtering logic

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterType, filterCategory, filterDateRange]);

  return (
    <DashboardLayout>
      <div className="space-y-8 h-full">
        {/* Header */}
        <DashboardHeader pageName="Transactions" />

        {/* Stats Section */}
        <TransactionStats
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          transactionCount={transactions.length}
        />

        {/* AI Insights */}
        <TransactionInsights
          transactions={transactions}
          budgetAlerts={budgetAlerts}
          onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Category Breakdown */}
          <div className="xl:col-span-2">
            <CategoryBreakdown transactions={transactions} />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions
              onAddTransaction={() => setIsAddOpen(true)}
              onOpenAnalytics={() => setIsAnalyticsOpen(true)}
              onCreateBudgetAlert={() => setIsBudgetAlertOpen(true)}
              onCreateSavingsGoal={() => setIsSavingsGoalOpen(true)}
            />
          </div>
        </div>

        {/* Transaction History */}
        <TransactionHistory
          transactions={filteredTransactions}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          filterCategory={filterCategory}
          onFilterCategoryChange={setFilterCategory}
          filterDateRange={filterDateRange}
          onFilterDateRangeChange={setFilterDateRange}
          onEditTransaction={(transaction) => {
            setEditingTransaction(transaction);
            setIsEditOpen(true);
          }}
          onDeleteTransaction={(id) => {
            setTransactions(transactions.filter((t) => t.id !== id));
          }}
        />

        {/* All Dialogs */}
        <TransactionDialogs
          // Add Transaction Dialog
          isAddOpen={isAddOpen}
          onAddOpenChange={setIsAddOpen}
          onAddTransaction={(newTransaction) => {
            setTransactions([newTransaction, ...transactions]);
          }}
          
          // Edit Transaction Dialog
          isEditOpen={isEditOpen}
          onEditOpenChange={setIsEditOpen}
          editingTransaction={editingTransaction}
          onEditTransaction={(updatedTransaction) => {
            setTransactions(
              transactions.map((t) =>
                t.id === updatedTransaction.id ? updatedTransaction : t
              )
            );
            setEditingTransaction(null);
          }}
          
          // Analytics Dialog
          isAnalyticsOpen={isAnalyticsOpen}
          onAnalyticsOpenChange={setIsAnalyticsOpen}
          transactions={transactions}
          
          // Budget Alert Dialog
          isBudgetAlertOpen={isBudgetAlertOpen}
          onBudgetAlertOpenChange={setIsBudgetAlertOpen}
          onCreateBudgetAlert={(newAlert) => {
            setBudgetAlerts([...budgetAlerts, newAlert]);
          }}
          
          // Savings Goal Dialog
          isSavingsGoalOpen={isSavingsGoalOpen}
          onSavingsGoalOpenChange={setIsSavingsGoalOpen}
          onCreateSavingsGoal={(newGoal) => {
            setSavingsGoals([...savingsGoals, newGoal]);
          }}
        />
      </div>
    </DashboardLayout>
  );
}

// Mock initial transactions
const initialTransactions: Transaction[] = [
  {
    id: "1",
    name: "Freelance Project Payment",
    amount: 2500,
    date: "2024-02-22",
    status: "Completed",
    type: "income",
    category: "freelance",
    description: "Web development project for client",
    account: "Bank Account",
  },
  {
    id: "2",
    name: "Grocery Shopping",
    amount: -85,
    date: "2024-02-21",
    status: "Completed",
    type: "expense",
    category: "food",
    description: "Weekly groceries from Whole Foods",
    account: "Credit Card",
  },
  {
    id: "3",
    name: "Uber Ride",
    amount: -23,
    date: "2024-02-21",
    status: "Completed",
    type: "expense",
    category: "transport",
    description: "Trip to downtown",
    account: "Debit Card",
  },
  {
    id: "4",
    name: "Netflix Subscription",
    amount: -15.99,
    date: "2024-02-20",
    status: "Completed",
    type: "expense",
    category: "entertainment",
    description: "Monthly subscription",
    account: "Credit Card",
  },
  {
    id: "5",
    name: "Salary",
    amount: 5000,
    date: "2024-02-01",
    status: "Completed",
    type: "income",
    category: "salary",
    description: "Monthly salary",
    account: "Bank Account",
  },
  {
    id: "6",
    name: "Coffee Shop",
    amount: -4.5,
    date: "2024-02-23",
    status: "Completed",
    type: "expense",
    category: "coffee",
    description: "Morning coffee",
    account: "Debit Card",
  },
  {
    id: "7",
    name: "Gas Station",
    amount: -45,
    date: "2024-02-22",
    status: "Completed",
    type: "expense",
    category: "transport",
    description: "Fuel for car",
    account: "Credit Card",
  },
  {
    id: "8",
    name: "Online Course",
    amount: -99,
    date: "2024-02-20",
    status: "Completed",
    type: "expense",
    category: "education",
    description: "React development course",
    account: "Credit Card",
  },
];

// Transaction categories with icons
const transactionCategories = [
  {
    value: "food",
    label: "Food & Dining",
    icon: Utensils,
    color: "bg-orange-500",
  },
  {
    value: "transport",
    label: "Transportation",
    icon: Car,
    color: "bg-blue-500",
  },
  {
    value: "shopping",
    label: "Shopping",
    icon: ShoppingCart,
    color: "bg-pink-500",
  },
  {
    value: "bills",
    label: "Bills & Utilities",
    icon: Receipt,
    color: "bg-red-500",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: Film,
    color: "bg-purple-500",
  },
  {
    value: "health",
    label: "Health & Fitness",
    icon: Heart,
    color: "bg-red-400",
  },
  {
    value: "education",
    label: "Education",
    icon: Book,
    color: "bg-indigo-500",
  },
  { value: "transfer", label: "Transfer", icon: Send, color: "bg-gray-500" },
  { value: "salary", label: "Salary", icon: Wallet, color: "bg-green-500" },
  {
    value: "freelance",
    label: "Freelance",
    icon: Briefcase,
    color: "bg-cyan-500",
  },
  { value: "rent", label: "Rent", icon: Home, color: "bg-yellow-500" },
  { value: "phone", label: "Phone", icon: Smartphone, color: "bg-teal-500" },
  { value: "coffee", label: "Coffee", icon: Coffee, color: "bg-amber-600" },
  { value: "travel", label: "Travel", icon: Plane, color: "bg-sky-500" },
  { value: "music", label: "Music", icon: Music, color: "bg-violet-500" },
  {
    value: "other",
    label: "Other",
    icon: MoreHorizontal,
    color: "bg-gray-400",
  },
];

// Quick date filters
const quickDateFilters = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Last 30 Days", value: "30days" },
  { label: "This Year", value: "year" },
  { label: "Custom Range", value: "custom" },
];

// Account types
const accountTypes = [
  { value: "bank", label: "Bank Account" },
  { value: "credit", label: "Credit Card" },
  { value: "debit", label: "Debit Card" },
  { value: "wallet", label: "Digital Wallet" },
  { value: "cash", label: "Cash" },
];
  
export default function Transactions() {
    const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isBudgetAlertOpen, setIsBudgetAlertOpen] = useState(false);
  const [isSavingsGoalOpen, setIsSavingsGoalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "income" | "expense" | "transfer"
  >("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<string>("month");
  const [customDateRange, setCustomDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [balance, setBalance] = useState(12450.75);

  // Budget alerts and savings goals
  const [budgetAlerts, setBudgetAlerts] = useState<BudgetAlert[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      name: "Emergency Fund",
      target: 10000,
      current: 3500,
      deadline: "2024-12-31",
      description: "6 months of expenses",
      priority: "high",
    },
    {
      id: "2",
      name: "Vacation to Japan",
      target: 5000,
      current: 1200,
      deadline: "2024-08-15",
      description: "Summer vacation trip",
      priority: "medium",
    },
  ]);

  // Transaction form state
  const [transactionForm, setTransactionForm] = useState({
    name: "",
    amount: "",
    category: "",
    type: "expense" as "income" | "expense" | "transfer",
    description: "",
    account: "bank",
    date: new Date().toISOString().split("T")[0],
  });

  // Budget alert form state
  const [budgetAlertForm, setBudgetAlertForm] = useState({
    category: "",
    limit: "",
    period: "monthly" as "daily" | "weekly" | "monthly",
  });

  // Savings goal form state
  const [savingsGoalForm, setSavingsGoalForm] = useState({
    name: "",
    target: "",
    current: "",
    deadline: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
  });

  // Calculate totals for all transactions
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Calculate totals for filtered transactions
  const filteredIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const currentBalance = balance + totalIncome - totalExpenses;

  // Category breakdown
  const categoryBreakdown = transactionCategories
    .map((category) => {
      const categoryTransactions = transactions.filter(
        (t) => t.category === category.value && t.type === "expense",
      );
      const total = categoryTransactions.reduce(
        (sum, t) => sum + Math.abs(t.amount),
        0,
      );
      const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;

      return {
        ...category,
        total,
        percentage,
        count: categoryTransactions.length,
      };
    })
    .filter((category) => category.total > 0)
    .sort((a, b) => b.total - a.total);

  // Apply filters
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    // Date filter
    if (filterDateRange !== "all") {
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );

      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.date);

        switch (filterDateRange) {
          case "today":
            return transactionDate >= startOfToday;
          case "week":
            const startOfWeek = new Date(startOfToday);
            startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
            return transactionDate >= startOfWeek;
          case "month":
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            return transactionDate >= startOfMonth;
          case "30days":
            const thirtyDaysAgo = new Date(startOfToday);
            thirtyDaysAgo.setDate(startOfToday.getDate() - 30);
            return transactionDate >= thirtyDaysAgo;
          case "year":
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            return transactionDate >= startOfYear;
          case "custom":
            if (customDateRange.from && customDateRange.to) {
              return (
                transactionDate >= customDateRange.from &&
                transactionDate <= customDateRange.to
              );
            }
            return true;
          default:
            return true;
        }
      });
    }

    setFilteredTransactions(filtered);
  }, [
    transactions,
    searchTerm,
    filterType,
    filterCategory,
    filterDateRange,
    customDateRange,
  ]);

  // Handle custom date range selection
  const handleCustomDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      if (!customDateRange.from) {
        setCustomDateRange({ from: selectedDate, to: undefined });
      } else if (!customDateRange.to && selectedDate > customDateRange.from) {
        setCustomDateRange({ from: customDateRange.from, to: selectedDate });
        setIsDatePickerOpen(false);
      } else {
        setCustomDateRange({ from: selectedDate, to: undefined });
      }
    }
  };

  // Handle add transaction
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

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      name: transactionForm.name,
      amount: finalAmount,
      date: transactionForm.date,
      status: "Completed",
      type: transactionForm.type,
      category: transactionForm.category,
      description: transactionForm.description,
      account:
        accountTypes.find((a) => a.value === transactionForm.account)?.label ||
        "Bank Account",
    };

    setTransactions([newTransaction, ...transactions]);
    setTransactionForm({
      name: "",
      amount: "",
      category: "",
      type: "expense",
      description: "",
      account: "bank",
      date: new Date().toISOString().split("T")[0],
    });
    setIsAddOpen(false);
  };

  // Handle edit transaction
  const handleEditTransaction = () => {
    if (
      !editingTransaction ||
      !transactionForm.name ||
      !transactionForm.amount ||
      !transactionForm.category
    ) {
      return;
    }

    const amount = parseFloat(transactionForm.amount);
    const finalAmount =
      transactionForm.type === "expense" ? -Math.abs(amount) : Math.abs(amount);

    const updatedTransaction: Transaction = {
      ...editingTransaction,
      name: transactionForm.name,
      amount: finalAmount,
      date: transactionForm.date,
      type: transactionForm.type,
      category: transactionForm.category,
      description: transactionForm.description,
      account:
        accountTypes.find((a) => a.value === transactionForm.account)?.label ||
        "Bank Account",
    };

    setTransactions(
      transactions.map((t) =>
        t.id === editingTransaction.id ? updatedTransaction : t,
      ),
    );
    setEditingTransaction(null);
    setIsEditOpen(false);
  };

  // Handle delete transaction
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Handle add budget alert
  const handleAddBudgetAlert = () => {
    if (!budgetAlertForm.category || !budgetAlertForm.limit) {
      return;
    }

    const newBudgetAlert: BudgetAlert = {
      id: Date.now().toString(),
      category: budgetAlertForm.category,
      limit: parseFloat(budgetAlertForm.limit),
      period: budgetAlertForm.period,
      isActive: true,
    };

    setBudgetAlerts([...budgetAlerts, newBudgetAlert]);
    setBudgetAlertForm({
      category: "",
      limit: "",
      period: "monthly",
    });
    setIsBudgetAlertOpen(false);
  };

  // Handle add savings goal
  const handleAddSavingsGoal = () => {
    if (
      !savingsGoalForm.name ||
      !savingsGoalForm.target ||
      !savingsGoalForm.deadline
    ) {
      return;
    }

    const newSavingsGoal: SavingsGoal = {
      id: Date.now().toString(),
      name: savingsGoalForm.name,
      target: parseFloat(savingsGoalForm.target),
      current: parseFloat(savingsGoalForm.current) || 0,
      deadline: savingsGoalForm.deadline,
      description: savingsGoalForm.description,
      priority: savingsGoalForm.priority,
    };

    setSavingsGoals([...savingsGoals, newSavingsGoal]);
    setSavingsGoalForm({
      name: "",
      target: "",
      current: "",
      deadline: "",
      description: "",
      priority: "medium",
    });
    setIsSavingsGoalOpen(false);
  };

  // Open edit dialog
  const openEditDialog = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setTransactionForm({
      name: transaction.name,
      amount: Math.abs(transaction.amount).toString(),
      category: transaction.category,
      type: transaction.type,
      description: transaction.description || "",
      account:
        accountTypes.find((a) => a.label === transaction.account)?.value ||
        "bank",
      date: transaction.date,
    });
    setIsEditOpen(true);
  };

  // Get AI suggestion based on transaction name
  const getAISuggestion = (name: string) => {
    const suggestions: {
      [key: string]: { category: string; description: string };
    } = {
      starbucks: { category: "coffee", description: "Coffee purchase" },
      uber: { category: "transport", description: "Ride sharing" },
      netflix: {
        category: "entertainment",
        description: "Streaming subscription",
      },
      amazon: { category: "shopping", description: "Online shopping" },
      grocery: { category: "food", description: "Grocery shopping" },
      gas: { category: "transport", description: "Fuel purchase" },
      rent: { category: "rent", description: "Monthly rent payment" },
      salary: { category: "salary", description: "Monthly salary" },
      freelance: { category: "freelance", description: "Freelance income" },
    };

    const key = Object.keys(suggestions).find((k) =>
      name.toLowerCase().includes(k),
    );

    return key ? suggestions[key] : null;
  };

  // Apply AI suggestion
  const applySuggestion = (suggestion: {
    category: string;
    description: string;
  }) => {
    setTransactionForm((prev) => ({
      ...prev,
      category: suggestion.category,
      description: suggestion.description,
    }));
  };

  const aiSuggestion = getAISuggestion(transactionForm.name);
    return (
      <DashboardLayout>
        <div className="space-y-8 h-full">
          {/* Header */}
          <DashboardHeader pageName="Transactions" />
  
          {/* Quick Stats - Fixed Responsiveness */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <Card className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800/30 rounded-3xl">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                    Balance
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-green-900 dark:text-green-100">
                    ${currentBalance.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
  
            <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[var(--dashboard-text-muted)] mb-2">
                    Income
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                    +${totalIncome.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
  
            <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[var(--dashboard-text-muted)] mb-2">
                    Expenses
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
                    -${totalExpenses.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
  
            <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Receipt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[var(--dashboard-text-muted)] mb-2">
                    Total
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-[var(--dashboard-text)]">
                    {transactions.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
  
          {/* AI Insights */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800/30 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--dashboard-text)] mb-2">
                    AI Financial Insights
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-[var(--dashboard-text-muted)]">
                      💡 You've spent $
                      {categoryBreakdown.find((c) => c.value === "food")?.total ||
                        0}{" "}
                      on food this month. Consider setting a monthly budget of
                      $400 to stay on track.
                    </p>
                    <p className="text-sm text-[var(--dashboard-text-muted)]">
                      🎯 Great job! You're $
                      {savingsGoals[0]?.target - savingsGoals[0]?.current || 0}{" "}
                      away from your {savingsGoals[0]?.name || "savings"} goal.
                    </p>
                    <p className="text-sm text-[var(--dashboard-text-muted)]">
                      ⚠️ Your entertainment spending increased this week. Maybe
                      try a home movie night instead?
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                    onClick={() => setIsAnalyticsOpen(true)}
                  >
                    View Detailed Analysis
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* Category Breakdown */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-[var(--dashboard-text)] flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Category Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryBreakdown.slice(0, 6).map((category) => {
                      const Icon = category.icon;
                      return (
                        <div
                          key={category.value}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center",
                                category.color,
                              )}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-[var(--dashboard-text)] text-sm">
                                {category.label}
                              </p>
                              <p className="text-xs text-[var(--dashboard-text-muted)]">
                                {category.count} transactions
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm text-[var(--dashboard-text)]">
                              ${category.total.toFixed(2)}
                            </p>
                            <p className="text-xs text-[var(--dashboard-text-muted)]">
                              {category.percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
  
            <div>
              <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-[var(--dashboard-text)] flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => setIsAddOpen(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl"
                    onClick={() => setIsAnalyticsOpen(true)}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl"
                    onClick={() => setIsBudgetAlertOpen(true)}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Set Budget Alert
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl"
                    onClick={() => setIsSavingsGoalOpen(true)}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Create Savings Goal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
  
          {/* Transaction Management */}
          <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-[var(--dashboard-text)] text-xl">
                    Transaction History
                  </CardTitle>
                </div>
  
                {/* Search and Filters - Fixed Layout */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-2xl"
                      />
                    </div>
  
                    {/* Type Filter */}
                    <Select
                      value={filterType}
                      onValueChange={(value: any) => setFilterType(value)}
                    >
                      <SelectTrigger className="w-full sm:w-32 rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
  
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Category Filter */}
                    <Select
                      value={filterCategory}
                      onValueChange={setFilterCategory}
                    >
                      <SelectTrigger className="w-full sm:w-40 rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {transactionCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
  
                    {/* Date Filter */}
                    <Select
                      value={filterDateRange}
                      onValueChange={setFilterDateRange}
                    >
                      <SelectTrigger className="w-full sm:w-40 rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {quickDateFilters.map((filter) => (
                          <SelectItem key={filter.value} value={filter.value}>
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
  
                    {/* Custom Date Range Button */}
                    {filterDateRange === "custom" && (
                      <Popover
                        open={isDatePickerOpen}
                        onOpenChange={setIsDatePickerOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full sm:w-40 rounded-2xl"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            {customDateRange.from && customDateRange.to
                              ? `${customDateRange.from.toLocaleDateString()} - ${customDateRange.to.toLocaleDateString()}`
                              : "Select Dates"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 rounded-2xl"
                          align="start"
                        >
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-[var(--dashboard-text)] mb-4 text-center">
                              Select Date Range
                            </h3>
                            <CalendarComponent
                              mode="single"
                              selected={customDateRange.from}
                              onSelect={handleCustomDateSelect}
                              className="rounded-2xl mx-auto"
                            />
                            {customDateRange.from && !customDateRange.to && (
                              <p className="text-sm text-[var(--dashboard-text-muted)] mt-3 text-center">
                                Now select the end date
                              </p>
                            )}
                            {customDateRange.from && customDateRange.to && (
                              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                                <p className="text-sm text-green-700 dark:text-green-300">
                                  Selected:{" "}
                                  {customDateRange.from.toLocaleDateString()} -{" "}
                                  {customDateRange.to.toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
  
                {/* Filtered Totals Display */}
                {(searchTerm ||
                  filterType !== "all" ||
                  filterCategory !== "all" ||
                  filterDateRange !== "all") && (
                  <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                    <div className="text-sm text-[var(--dashboard-text-muted)]">
                      Showing {filteredTransactions.length} transactions
                    </div>
                    {filteredIncome > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Income: +${filteredIncome.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {filteredExpenses > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                          Expenses: -${filteredExpenses.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-[var(--dashboard-text)]">
                        Net: $
                        {(filteredIncome - filteredExpenses).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
  
            <CardContent className="p-0 pb-6">
              <div className="space-y-1">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => {
                    const category = transactionCategories.find(
                      (c) => c.value === transaction.category,
                    );
                    const Icon = category?.icon || MoreHorizontal;
  
                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-300 group mx-4"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                              category?.color || "bg-gray-400",
                            )}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[var(--dashboard-text)] text-sm truncate">
                              {transaction.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-xs text-[var(--dashboard-text-muted)]">
                                {new Date(transaction.date).toLocaleDateString()}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-xs rounded-xl"
                              >
                                {category?.label || "Other"}
                              </Badge>
                              {transaction.account && (
                                <Badge
                                  variant="outline"
                                  className="text-xs rounded-xl"
                                >
                                  {transaction.account}
                                </Badge>
                              )}
                            </div>
                            {transaction.description && (
                              <p className="text-xs text-[var(--dashboard-text-muted)] mt-1 truncate">
                                {transaction.description}
                              </p>
                            )}
                          </div>
                        </div>
  
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right">
                            <p
                              className={cn(
                                "font-bold text-sm whitespace-nowrap",
                                transaction.type === "income"
                                  ? "text-green-600 dark:text-green-400"
                                  : transaction.type === "expense"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-blue-600 dark:text-blue-400",
                              )}
                            >
                              {transaction.type === "income"
                                ? "+"
                                : transaction.type === "expense"
                                  ? "-"
                                  : ""}
                              ${Math.abs(transaction.amount).toFixed(2)}
                            </p>
                            <p className="text-xs text-[var(--dashboard-text-muted)] capitalize">
                              {transaction.type}
                            </p>
                          </div>
  
                          {/* Action Buttons */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(transaction)}
                              className="w-8 h-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                              title="Edit transaction"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteTransaction(transaction.id)
                              }
                              className="w-8 h-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                              title="Delete transaction"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <Receipt className="w-16 h-16 text-[var(--dashboard-text-muted)] mx-auto mb-4" />
                    <p className="text-[var(--dashboard-text-muted)] text-lg">
                      No transactions found
                    </p>
                    <p className="text-sm text-[var(--dashboard-text-muted)] mt-1">
                      Try adjusting your filters or add a new transaction
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
  
          {/* Add Transaction Dialog */}
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogContent className="sm:max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[var(--dashboard-text)]">
                  Add New Transaction
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {/* AI Suggestion */}
                {aiSuggestion && (
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                          AI Suggestion
                        </p>
                        <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                          Category:{" "}
                          {
                            transactionCategories.find(
                              (c) => c.value === aiSuggestion.category,
                            )?.label
                          }
                        </p>
                        <p className="text-xs text-purple-700 dark:text-purple-300">
                          Description: {aiSuggestion.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => applySuggestion(aiSuggestion)}
                          className="mt-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 px-3 py-1 h-auto"
                        >
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
  
                {/* Transaction Type */}
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant={
                      transactionForm.type === "income" ? "default" : "outline"
                    }
                    onClick={() =>
                      setTransactionForm({ ...transactionForm, type: "income" })
                    }
                    className="rounded-2xl"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Income
                  </Button>
                  <Button
                    type="button"
                    variant={
                      transactionForm.type === "expense" ? "default" : "outline"
                    }
                    onClick={() =>
                      setTransactionForm({ ...transactionForm, type: "expense" })
                    }
                    className="rounded-2xl"
                  >
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Expense
                  </Button>
                  <Button
                    type="button"
                    variant={
                      transactionForm.type === "transfer" ? "default" : "outline"
                    }
                    onClick={() =>
                      setTransactionForm({ ...transactionForm, type: "transfer" })
                    }
                    className="rounded-2xl"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Transfer
                  </Button>
                </div>
  
                {/* Transaction Name */}
                <div className="space-y-2">
                  <Label htmlFor="transaction-name">Transaction Name *</Label>
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
  
                {/* Amount and Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transaction-amount">Amount *</Label>
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
                    <Label htmlFor="transaction-date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="transaction-date"
                        type="date"
                        value={transactionForm.date}
                        onChange={(e) =>
                          setTransactionForm({
                            ...transactionForm,
                            date: e.target.value,
                          })
                        }
                        className="pl-10 rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
  
                {/* Category and Account */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transaction-category">Category *</Label>
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
                        <SelectValue placeholder="Select category" />
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
                    <Label htmlFor="transaction-account">Account</Label>
                    <Select
                      value={transactionForm.account}
                      onValueChange={(value) =>
                        setTransactionForm({ ...transactionForm, account: value })
                      }
                    >
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accountTypes.map((account) => (
                          <SelectItem key={account.value} value={account.value}>
                            {account.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
  
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="transaction-description">
                    Notes (Optional)
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
  
                {/* Attachment */}
                <div className="space-y-2">
                  <Label>Receipt (Optional)</Label>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl h-12 border-dashed"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach Receipt
                  </Button>
                </div>
  
                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddOpen(false)}
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
  
          {/* Edit Transaction Dialog */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="sm:max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[var(--dashboard-text)]">
                  Edit Transaction
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {/* Transaction Type */}
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant={
                      transactionForm.type === "income" ? "default" : "outline"
                    }
                    onClick={() =>
                      setTransactionForm({ ...transactionForm, type: "income" })
                    }
                    className="rounded-2xl"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Income
                  </Button>
                  <Button
                    type="button"
                    variant={
                      transactionForm.type === "expense" ? "default" : "outline"
                    }
                    onClick={() =>
                      setTransactionForm({ ...transactionForm, type: "expense" })
                    }
                    className="rounded-2xl"
                  >
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Expense
                  </Button>
                  <Button
                    type="button"
                    variant={
                      transactionForm.type === "transfer" ? "default" : "outline"
                    }
                    onClick={() =>
                      setTransactionForm({ ...transactionForm, type: "transfer" })
                    }
                    className="rounded-2xl"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Transfer
                  </Button>
                </div>
  
                {/* Transaction Name */}
                <div className="space-y-2">
                  <Label htmlFor="edit-transaction-name">
                    Transaction Name *
                  </Label>
                  <Input
                    id="edit-transaction-name"
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
  
                {/* Amount and Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-transaction-amount">Amount *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="edit-transaction-amount"
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
                    <Label htmlFor="edit-transaction-date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="edit-transaction-date"
                        type="date"
                        value={transactionForm.date}
                        onChange={(e) =>
                          setTransactionForm({
                            ...transactionForm,
                            date: e.target.value,
                          })
                        }
                        className="pl-10 rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
  
                {/* Category and Account */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-transaction-category">Category *</Label>
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
                        <SelectValue placeholder="Select category" />
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
                    <Label htmlFor="edit-transaction-account">Account</Label>
                    <Select
                      value={transactionForm.account}
                      onValueChange={(value) =>
                        setTransactionForm({ ...transactionForm, account: value })
                      }
                    >
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accountTypes.map((account) => (
                          <SelectItem key={account.value} value={account.value}>
                            {account.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
  
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="edit-transaction-description">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    id="edit-transaction-description"
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
  
                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditOpen(false)}
                    className="flex-1 rounded-2xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleEditTransaction}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
  
          {/* Analytics Dialog */}
          <Dialog open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
            <DialogContent className="sm:max-w-4xl rounded-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[var(--dashboard-text)]">
                  Advanced Analytics
                </DialogTitle>
                <DialogDescription>
                  Deep insights into your spending patterns and financial habits
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                {/* Spending Trends */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Monthly Spending Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-12 h-12 text-[var(--dashboard-text-muted)] mx-auto mb-2" />
                          <p className="text-sm text-[var(--dashboard-text-muted)]">
                            Monthly trend chart
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
  
                  <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Category Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="w-12 h-12 text-[var(--dashboard-text-muted)] mx-auto mb-2" />
                          <p className="text-sm text-[var(--dashboard-text-muted)]">
                            Category breakdown
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
  
                {/* AI Insights */}
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800/30 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      AI-Powered Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl">
                        <h4 className="font-medium text-[var(--dashboard-text)] mb-2">
                          Spending Pattern Analysis
                        </h4>
                        <p className="text-sm text-[var(--dashboard-text-muted)]">
                          Your highest spending occurs on weekends, particularly
                          on entertainment and dining. Consider setting weekend
                          budgets to maintain better control.
                        </p>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl">
                        <h4 className="font-medium text-[var(--dashboard-text)] mb-2">
                          Seasonal Trends
                        </h4>
                        <p className="text-sm text-[var(--dashboard-text-muted)]">
                          Your transportation costs increase by 25% during winter
                          months. Budget an extra $100 monthly for transportation
                          from November to March.
                        </p>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl">
                        <h4 className="font-medium text-[var(--dashboard-text)] mb-2">
                          Optimization Opportunities
                        </h4>
                        <p className="text-sm text-[var(--dashboard-text-muted)]">
                          You could save $150/month by reducing subscription
                          services and coffee purchases. Consider switching to a
                          premium coffee subscription at home.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
  
                {/* Top Categories */}
                <Card className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)] rounded-3xl">
                  <CardHeader>
                    <CardTitle>Top Spending Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categoryBreakdown.slice(0, 5).map((category) => {
                        const Icon = category.icon;
                        return (
                          <div
                            key={category.value}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-xl flex items-center justify-center",
                                  category.color,
                                )}
                              >
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-[var(--dashboard-text)] text-sm">
                                  {category.label}
                                </p>
                                <p className="text-xs text-[var(--dashboard-text-muted)]">
                                  {category.count} transactions
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm text-[var(--dashboard-text)]">
                                ${category.total.toFixed(2)}
                              </p>
                              <p className="text-xs text-[var(--dashboard-text-muted)]">
                                {category.percentage.toFixed(1)}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
  
          {/* Budget Alert Dialog */}
          <Dialog open={isBudgetAlertOpen} onOpenChange={setIsBudgetAlertOpen}>
            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[var(--dashboard-text)]">
                  Set Budget Alert
                </DialogTitle>
                <DialogDescription>
                  Get notified when you're approaching your spending limits
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="budget-category">Category</Label>
                  <Select
                    value={budgetAlertForm.category}
                    onValueChange={(value) =>
                      setBudgetAlertForm({ ...budgetAlertForm, category: value })
                    }
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <SelectItem key={category.value} value={category.value}>
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
                  <Label htmlFor="budget-limit">Budget Limit</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="budget-limit"
                      type="number"
                      placeholder="500.00"
                      value={budgetAlertForm.limit}
                      onChange={(e) =>
                        setBudgetAlertForm({
                          ...budgetAlertForm,
                          limit: e.target.value,
                        })
                      }
                      className="pl-10 rounded-2xl"
                    />
                  </div>
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="budget-period">Period</Label>
                  <Select
                    value={budgetAlertForm.period}
                    onValueChange={(value: any) =>
                      setBudgetAlertForm({ ...budgetAlertForm, period: value })
                    }
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Alert Settings
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                        You'll receive notifications at 75% and 90% of your budget
                        limit.
                      </p>
                    </div>
                  </div>
                </div>
  
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsBudgetAlertOpen(false)}
                    className="flex-1 rounded-2xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAddBudgetAlert}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                  >
                    Create Alert
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
  
          {/* Savings Goal Dialog */}
          <Dialog open={isSavingsGoalOpen} onOpenChange={setIsSavingsGoalOpen}>
            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[var(--dashboard-text)]">
                  Create Savings Goal
                </DialogTitle>
                <DialogDescription>
                  Set a target and track your progress towards your financial
                  goals
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-name">Goal Name</Label>
                  <Input
                    id="goal-name"
                    placeholder="e.g., Emergency Fund, Vacation"
                    value={savingsGoalForm.name}
                    onChange={(e) =>
                      setSavingsGoalForm({
                        ...savingsGoalForm,
                        name: e.target.value,
                      })
                    }
                    className="rounded-2xl"
                  />
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-target">Target Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="goal-target"
                        type="number"
                        placeholder="5000.00"
                        value={savingsGoalForm.target}
                        onChange={(e) =>
                          setSavingsGoalForm({
                            ...savingsGoalForm,
                            target: e.target.value,
                          })
                        }
                        className="pl-10 rounded-2xl"
                      />
                    </div>
                  </div>
  
                  <div className="space-y-2">
                    <Label htmlFor="goal-current">Current Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="goal-current"
                        type="number"
                        placeholder="0.00"
                        value={savingsGoalForm.current}
                        onChange={(e) =>
                          setSavingsGoalForm({
                            ...savingsGoalForm,
                            current: e.target.value,
                          })
                        }
                        className="pl-10 rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-deadline">Target Date</Label>
                    <Input
                      id="goal-deadline"
                      type="date"
                      value={savingsGoalForm.deadline}
                      onChange={(e) =>
                        setSavingsGoalForm({
                          ...savingsGoalForm,
                          deadline: e.target.value,
                        })
                      }
                      className="rounded-2xl"
                    />
                  </div>
  
                  <div className="space-y-2">
                    <Label htmlFor="goal-priority">Priority</Label>
                    <Select
                      value={savingsGoalForm.priority}
                      onValueChange={(value: any) =>
                        setSavingsGoalForm({
                          ...savingsGoalForm,
                          priority: value,
                        })
                      }
                    >
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="goal-description">Description (Optional)</Label>
                  <Textarea
                    id="goal-description"
                    placeholder="What is this goal for?"
                    value={savingsGoalForm.description}
                    onChange={(e) =>
                      setSavingsGoalForm({
                        ...savingsGoalForm,
                        description: e.target.value,
                      })
                    }
                    className="rounded-2xl min-h-[80px]"
                  />
                </div>
  
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Goal Tracking
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                        Your progress will be visible in the Dashboard and Dream
                        Budget sections.
                      </p>
                    </div>
                  </div>
                </div>
  
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSavingsGoalOpen(false)}
                    className="flex-1 rounded-2xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAddSavingsGoal}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
                  >
                    Create Goal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DashboardLayout>
    );
};