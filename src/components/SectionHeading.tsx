import React from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  testid?: string;
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  testid,
}: SectionHeadingProps) {
  return (
    <div data-testid={testid} className="mb-12 sm:mb-16">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold text-emerald-400">
            {index}
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
            {eyebrow}
          </span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
