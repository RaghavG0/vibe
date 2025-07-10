/**
 * Custom React hooks for localStorage management
 * TODO: Replace with API hooks when backend is implemented
 */

import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

/**
 * Custom hook for managing localStorage with React state
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    return loadFromLocalStorage(key, defaultValue);
  });

  useEffect(() => {
    saveToLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

/**
 * Hook for managing user data
 */
export function useUserData() {
  return useLocalStorage('vibewealth-user-data', {
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
  });
}

/**
 * Hook for managing financial data calculations
 */
export function useFinancialCalculations(transactions: any[]) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalBalance = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    totalBalance,
  };
}
