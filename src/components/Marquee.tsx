import React from "react";
import { STACK_TICKER } from "../data/resume";
import { Terminal, Cpu, Database, Server, GitBranch } from "lucide-react";

export default function Marquee() {
  const items = [...STACK_TICKER, ...STACK_TICKER, ...STACK_TICKER];

  return (
    <div
      data-testid="stack-marquee"
      className="relative border-y border-white/10 bg-[#0D1420]/60 py-4 sm:py-5 overflow-hidden backdrop-blur-md"
    >
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0E17] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0E17] to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex w-max items-center gap-8 sm:gap-12">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 font-mono text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors whitespace-nowrap group cursor-default"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-125 transition-transform" />
            <span className="tracking-wide group-hover:text-emerald-300 font-medium">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
