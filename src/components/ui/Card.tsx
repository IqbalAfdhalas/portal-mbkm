// src/components/ui/Card.tsx
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  title?: string;
  subtitle?: string;
  content?: string | ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  footer?: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "bordered" | "simple";
  onClick?: () => void;
  hoverEffect?: boolean;
}

/**
 * Reusable Card component that supports various styles and configurations.
 */
const Card = ({
  title,
  subtitle,
  content,
  imageUrl,
  imageAlt = "Card image",
  href,
  footer,
  className = "",
  variant = "default",
  onClick,
  hoverEffect = true,
}: CardProps) => {
  // Card style variations
  const cardStyles = {
    default: "bg-white dark:bg-dark-surface rounded-lg shadow-md",
    elevated: "bg-white dark:bg-dark-surface rounded-lg shadow-lg",
    bordered:
      "bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-gray-700",
    simple: "bg-transparent",
  };

  // Hover effects
  const hoverStyles = hoverEffect
    ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    : "";

  // Clickable card wrapper
  const CardWrapper = ({ children }: { children: ReactNode }) => {
    if (href) {
      return (
        <Link href={href} className="block w-full h-full">
          {children}
        </Link>
      );
    }

    if (onClick) {
      return (
        <button
          className="block w-full h-full text-left"
          onClick={onClick}
          type="button"
        >
          {children}
        </button>
      );
    }

    return <>{children}</>;
  };

  const cardContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${cardStyles[variant]} ${hoverStyles} overflow-hidden flex flex-col ${className}`}
    >
      {/* Card Image */}
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>
      )}

      {/* Card Body */}
      <div className="flex-1 p-4">
        {title && (
          <h3 className="font-heading font-semibold text-lg text-gray-800 dark:text-gray-100 mb-1">
            {title}
          </h3>
        )}

        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {subtitle}
          </p>
        )}

        {content && (
          <div className="text-gray-700 dark:text-gray-300 text-sm">
            {typeof content === "string" ? <p>{content}</p> : content}
          </div>
        )}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
          {footer}
        </div>
      )}
    </motion.div>
  );

  return <CardWrapper>{cardContent}</CardWrapper>;
};

export default Card;
