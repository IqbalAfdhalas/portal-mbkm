// src/components/layout/Section.tsx
import { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  withContainer?: boolean;
  fluid?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const Section = ({
  children,
  id,
  className = "",
  containerClassName = "",
  withContainer = true,
  fluid = false,
  as: Component = "section",
}: SectionProps) => {
  return (
    <Component id={id} className={`py-16 md:py-24 ${className}`}>
      {withContainer ? (
        <Container className={containerClassName} fluid={fluid}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Component>
  );
};

export default Section;
