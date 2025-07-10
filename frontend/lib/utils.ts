import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names and merges Tailwind classes intelligently.
 * Usage: cn('p-2', condition && 'bg-red-500', 'text-white')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}