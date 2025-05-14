// src/components/layout/Container.tsx
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  fluid?: boolean;
}

const Container = ({
  children,
  className = "",
  as: Component = "div",
  fluid = false,
}: ContainerProps) => {
  return (
    <Component
      className={`${fluid ? "px-4" : "container mx-auto px-4 md:px-6"} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Container;
