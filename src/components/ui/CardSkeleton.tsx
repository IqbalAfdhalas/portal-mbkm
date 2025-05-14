// src/components/ui/CardSkeleton.tsx
import React from "react";

interface CardSkeletonProps {
  hasImage?: boolean;
  hasFooter?: boolean;
  className?: string;
}

/**
 * Skeleton loader for Card component
 * Used for loading states before content is available
 */
const CardSkeleton = ({
  hasImage = true,
  hasFooter = false,
  className = "",
}: CardSkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {/* Image skeleton */}
      {hasImage && (
        <div className="h-48 w-full bg-gray-200 dark:bg-gray-700"></div>
      )}

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>

        {/* Subtitle skeleton */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>

        {/* Content paragraph skeletons */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>

      {/* Footer skeleton */}
      {hasFooter && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSkeleton;
