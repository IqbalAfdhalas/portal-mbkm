// src/components/ui/LoadingSpinner.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
  fullPage?: boolean;
}

/**
 * LoadingSpinner component for showing loading state
 *
 * @param size - Size of the spinner (sm, md, lg, xl)
 * @param color - Color of the spinner (primary, secondary, white, gray)
 * @param className - Additional classes
 * @param fullPage - Whether to display as a full page loading overlay
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "primary",
  className,
  fullPage = false,
}) => {
  // Define spinner sizes
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  // Define spinner colors
  const colorClasses = {
    primary: "text-primary-light",
    secondary: "text-secondary",
    white: "text-white",
    gray: "text-gray-400",
  };

  const spinnerElement = (
    <div className={cn("relative", className)}>
      <svg
        className={cn("animate-spin", sizeClasses[size], colorClasses[color])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        data-testid="loading-spinner"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );

  // If fullPage is true, render a full page overlay with the spinner centered
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          {spinnerElement}
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Otherwise, just render the spinner
  return spinnerElement;
};

export { LoadingSpinner };
