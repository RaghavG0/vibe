/**
 * Reusable StatsCard component for displaying financial statistics
 * Used across multiple dashboard pages for consistency
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar as CalendarComponent } from '@/components/ui/calender';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import { timePeriods } from '../../data/mockData';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  isMain?: boolean;
  period?: string;
  lastWeek?: string;
  onPeriodChange?: (period: string) => void;
  className?: string;
}

/**
 * StatsCard component for displaying key financial metrics
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  isMain,
  period,
  lastWeek,
  onPeriodChange,
  className,
}) => {
  // Calendar state for custom date range selection
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  /**
   * Handle period selection from dropdown
   */
  const handlePeriodSelect = (selectedPeriod: string) => {
    if (selectedPeriod === 'Custom Date Range') {
      setIsCalendarOpen(true);
    } else {
      onPeriodChange?.(selectedPeriod);
    }
  };

  /**
   * Handle custom date selection
   */
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
        'border-dashboard-border hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 rounded-3xl shadow-lg hover:shadow-xl',
        isMain
          ? 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800/30'
          : 'bg-dashboard-card',
        className
      )}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="text-center">
          {/* Period Selector */}
          {period && onPeriodChange && (
            <div className="mb-4 flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 text-xs rounded-xl hover:bg-white/60 dark:hover:bg-black/20',
                      isMain
                        ? 'bg-white/40 dark:bg-black/10 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
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
              'text-sm font-medium mb-3',
              isMain
                ? 'text-green-800 dark:text-green-200'
                : 'text-dashboard-text-muted'
            )}
          >
            {title}
          </p>

          {/* Main Value */}
          <p
            className={cn(
              'text-2xl sm:text-3xl lg:text-4xl font-bold mb-2',
              isMain
                ? 'text-green-900 dark:text-green-100'
                : 'text-dashboard-text'
            )}
          >
            {value}
          </p>

          {/* Secondary Text */}
          {lastWeek && (
            <p
              className={cn(
                'text-sm mb-2',
                isMain
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-dashboard-text-muted'
              )}
            >
              {lastWeek}
            </p>
          )}

          {/* Change Indicator */}
          {change && (
            <div className="flex items-center justify-center gap-1">
              <div
                className={cn(
                  'p-1.5 rounded-xl',
                  changeType === 'positive'
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : 'bg-red-100 dark:bg-red-900/20'
                )}
              >
                {changeType === 'positive' ? (
                  <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
                )}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                )}
              >
                {change}
              </span>
            </div>
          )}
        </div>

        {/* Custom Date Range Modal */}
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
                      Selected: {dateRange.from.toLocaleDateString()} -{' '}
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
