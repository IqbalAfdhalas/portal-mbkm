// src/components/ui/ViewCounter.tsx
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ViewCounterProps {
  viewCount: number;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'badge';
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Component untuk menampilkan view count dengan berbagai style
 */
export const ViewCounter: React.FC<ViewCounterProps> = ({
  viewCount,
  isLoading = false,
  size = 'md',
  variant = 'default',
  showIcon = true,
  className = '',
  onClick,
}) => {
  // Format angka view count
  const formatViewCount = (count: number): string => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  };

  // Icon size
  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  // Variant styles
  const variantClasses = {
    default: 'bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur-sm',
    minimal: 'text-gray-600 dark:text-gray-400',
    badge:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full font-medium',
  };

  const baseClasses = `
    flex items-center transition-all duration-200
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick} title={`${viewCount} views`}>
      {showIcon && <Eye size={iconSize[size]} className={`${isLoading ? 'animate-pulse' : ''}`} />}

      <span className={isLoading ? 'animate-pulse' : ''}>
        {isLoading ? '...' : formatViewCount(viewCount)}
      </span>

      {variant !== 'minimal' && (
        <span className="hidden sm:inline">{viewCount === 1 ? 'view' : 'views'}</span>
      )}
    </div>
  );
};

/**
 * Component untuk menampilkan view counter di card gallery
 */
export const GalleryViewCounter: React.FC<{
  viewCount: number;
  isLoading?: boolean;
  className?: string;
}> = ({ viewCount, isLoading, className = '' }) => {
  return (
    <ViewCounter
      viewCount={viewCount}
      isLoading={isLoading}
      size="sm"
      variant="default"
      className={`absolute bottom-2 right-2 ${className}`}
    />
  );
};

/**
 * Component untuk menampilkan view counter di detail page
 */
export const DetailViewCounter: React.FC<{
  viewCount: number;
  isLoading?: boolean;
  className?: string;
}> = ({ viewCount, isLoading, className = '' }) => {
  return (
    <ViewCounter
      viewCount={viewCount}
      isLoading={isLoading}
      size="md"
      variant="minimal"
      className={className}
    />
  );
};

/**
 * Component untuk menampilkan most viewed badge
 */
export const MostViewedBadge: React.FC<{
  viewCount: number;
  className?: string;
}> = ({ viewCount, className = '' }) => {
  return (
    <ViewCounter
      viewCount={viewCount}
      size="sm"
      variant="badge"
      showIcon={false}
      className={`${className}`}
    />
  );
};

/**
 * Component untuk interactive view counter (dengan click handler)
 */
export const InteractiveViewCounter: React.FC<{
  viewCount: number;
  isLoading?: boolean;
  hasViewed?: boolean;
  onIncrement: () => void;
  className?: string;
}> = ({ viewCount, isLoading, hasViewed, onIncrement, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ViewCounter
        viewCount={viewCount}
        isLoading={isLoading}
        size="md"
        variant="minimal"
        showIcon={false}
      />

      <button
        onClick={onIncrement}
        disabled={isLoading || hasViewed}
        className={`
          flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200
          ${
            hasViewed
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200 active:scale-95'
          }
          ${isLoading ? 'animate-pulse' : ''}
        `}
        title={hasViewed ? 'Sudah dilihat' : 'Klik untuk menambah view'}
      >
        {hasViewed ? <EyeOff size={14} /> : <Eye size={14} />}
        <span className="text-xs font-medium">{hasViewed ? 'Viewed' : 'View'}</span>
      </button>
    </div>
  );
};
