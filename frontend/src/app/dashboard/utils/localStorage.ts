/**
 * Utility functions for localStorage operations
 * TODO: Replace with proper backend API calls when backend is implemented
 */

/**
 * Generic function to save data to localStorage
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

/**
 * Generic function to load data from localStorage
 */
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
  }
  return defaultValue;
};

/**
 * Remove item from localStorage
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

/**
 * Check if localStorage is available
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// Local storage keys - centralized for consistency
export const STORAGE_KEYS = {
  USER_DATA: 'vibewealth-user-data',
  TRANSACTIONS: 'vibewealth-transactions',
  DREAMS: 'vibewealth-dreams',
  SETTINGS: 'vibewealth-settings',
  CHAT_SESSIONS: 'vibewealth-chat-sessions',
  SMART_NUDGES: 'vibewealth-smart-nudges',
  NOTIFICATIONS: 'vibewealth-notifications',
  BUDGET_ALERTS: 'vibewealth-budget-alerts',
  SAVINGS_GOALS: 'vibewealth-savings-goals',
} as const;
