import React from "react";
import { SectionItem } from "./SectionContainer";

interface SectionHeadingProps {
  /** Route this section answers, e.g. "/experience". */
  route: string;
  /** Short, real summary of what the section returns, e.g. "4 roles". */
  meta: string;
  title: string;
  method?: "GET" | "POST";
  code?: string;
  testid?: string;
  subtitle?: string;
}

/**
 * Heading drawn as a request line. When it scrolls into view the wire fills (request in flight)
 * and the status arrives, the same way a response would.
 */
export default function SectionHeading({
  route,
  meta,
  title,
  method = "GET",
  code = "200",
  testid,
  subtitle,
}: SectionHeadingProps) {
  return (
    <SectionItem data-testid={testid} className="mb-12 sm:mb-16">
      <div dir="ltr" className="flex items-center gap-3 font-mono text-xs sm:text-sm">
        <span className="font-semibold text-emerald-400">{method}</span>
        <span className="text-slate-300">{route}</span>
        <span aria-hidden="true" className="req-wire h-px flex-1 bg-gradient-to-r from-emerald-400/70 to-slate-600/40" />
        <span className="req-status flex items-center gap-2 whitespace-nowrap">
          <span className="text-emerald-300 font-semibold">{code}</span>
          <bdi className="text-slate-500">{meta}</bdi>
        </span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </SectionItem>
  );
}
