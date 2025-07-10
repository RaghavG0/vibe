/**
 * DashboardWelcome component
 * Displays welcome message and user profile section
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { User } from '../../types';

interface DashboardWelcomeProps {
  userData: User;
}

/**
 * Welcome section with notifications and user profile
 */
export const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({
  userData,
}) => {
  const router = useRouter();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Mock notifications - TODO: Replace with real data from backend
  const mockNotifications = [
    {
      id: '1',
      title: 'Payment Due Reminder',
      message: 'Your electricity bill of $120 is due tomorrow',
      timestamp: '2 hours ago',
      type: 'alert',
      color: 'bg-red-500',
    },
    {
      id: '2',
      title: 'Income Received',
      message: 'Freelance payment of $540 has been credited',
      timestamp: '5 hours ago',
      type: 'success',
      color: 'bg-green-500',
    },
    {
      id: '3',
      title: 'Budget Alert',
      message: "You've spent 80% of your monthly food budget",
      timestamp: '1 day ago',
      type: 'warning',
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {/* Welcome Text */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-dashboard-text mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-dashboard-text-muted">
          Here&apos;s what&apos;s happening with your money today
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
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
              {/* Notification Header */}
              <div className="p-4 border-b border-dashboard-border">
                <h3 className="text-lg font-semibold text-dashboard-text">
                  Notifications
                </h3>
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-auto">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-dashboard-border cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 ${notification.color} rounded-full mt-2 flex-shrink-0`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dashboard-text">
                          {notification.title}
                        </p>
                        <p className="text-xs text-dashboard-text-muted mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-dashboard-text-muted mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="p-4 border-t border-dashboard-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/dashboard/Notification')}
                  className="w-full rounded-xl text-dashboard-text-muted hover:text-dashboard-text"
                >
                  View All Notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Notification Indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
        </div>

        {/* Mail Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-11 h-11 p-0 bg-dashboard-card border border-dashboard-border rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
          onClick={() =>
            window.open(
              'mailto:support@vibewealth.com?subject=Support Request&body=Hi VibeWealth team,',
              '_blank'
            )
          }
          title="Send us an email"
        >
          <Mail className="w-5 h-5 text-dashboard-text-muted" />
        </Button>

        {/* Separator */}
        <div className="w-px h-8 bg-dashboard-border" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <span className="text-dashboard-text font-medium">
            {userData.firstName}
          </span>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold text-sm">
              {userData.firstName[0]}
              {userData.lastName[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
