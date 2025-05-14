// src/components/ui/CardGrid.tsx
import { ReactNode } from "react";

interface CardGridProps {
  children: ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "small" | "medium" | "large";
  className?: string;
}

/**
 * Grid layout for displaying cards in a responsive grid.
 */
const CardGrid = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "medium",
  className = "",
}: CardGridProps) => {
  // Dynamic gap based on props
  const gapSizes = {
    small: "gap-3",
    medium: "gap-5",
    large: "gap-8",
  };

  // Generate responsive grid columns
  const gridCols = `
    grid-cols-1
    ${columns.sm ? `sm:grid-cols-${columns.sm}` : ""}
    ${columns.md ? `md:grid-cols-${columns.md}` : ""}
    ${columns.lg ? `lg:grid-cols-${columns.lg}` : ""}
    ${columns.xl ? `xl:grid-cols-${columns.xl}` : ""}
  `;

  return (
    <div className={`grid ${gridCols} ${gapSizes[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default CardGrid;
