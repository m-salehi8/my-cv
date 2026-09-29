import React from "react";
import { SectionItem } from "./SectionContainer";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  testid?: string;
  subtitle?: string;
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  testid,
  subtitle,
}: SectionHeadingProps) {
  return (
    <SectionItem data-testid={testid} className="mb-12 sm:mb-16">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
          {index}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 via-white/10 to-transparent" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-emerald-400/80 font-medium">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-300">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </SectionItem>
  );
}
