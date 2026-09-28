import React, { ReactNode } from "react";
import { motion, Variants } from "motion/react";

export const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const sectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface SectionContainerProps {
  id: string;
  dataTestId?: string;
  className?: string;
  children: ReactNode;
  viewportMargin?: string;
}

export default function SectionContainer({
  id,
  dataTestId,
  className = "",
  children,
  viewportMargin = "-60px",
}: SectionContainerProps) {
  return (
    <motion.section
      id={id}
      data-testid={dataTestId}
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin as any }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function SectionItem({
  children,
  className = "",
  variants = sectionItemVariants,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
