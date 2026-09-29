import React, { ReactNode } from "react";
import { useReveal } from "../lib/reveal";

interface SectionContainerProps {
  id: string;
  dataTestId?: string;
  className?: string;
  children: ReactNode;
}

export default function SectionContainer({ id, dataTestId, className = "", children }: SectionContainerProps) {
  return (
    <section id={id} data-testid={dataTestId} className={className}>
      {children}
    </section>
  );
}

interface SectionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** Stagger position; each step delays the entrance by 80ms. */
  index?: number;
}

export function SectionItem({ children, className = "", index = 0, style, ...rest }: SectionItemProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--i": index, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
