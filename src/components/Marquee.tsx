import React, { useEffect, useRef } from "react";
import { STACK_TICKER } from "../data/resume";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  // The loop only runs while the strip is on screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => el.classList.toggle("is-paused", !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Two identical halves: the track slides by exactly one half (-50%), so the loop is seamless.
  const half = (copy: number) =>
    STACK_TICKER.map((item) => (
      <span
        key={`${copy}-${item}`}
        aria-hidden={copy > 0 || undefined}
        className="flex items-center gap-3 font-mono text-xs sm:text-sm text-slate-400 whitespace-nowrap pe-8 sm:pe-12"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
        <span className="tracking-wide font-medium">{item}</span>
      </span>
    ));

  return (
    <div
      data-testid="stack-marquee"
      dir="ltr"
      className="relative border-y border-white/10 bg-[#0D1420]/60 py-4 sm:py-5 overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0E17] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0E17] to-transparent z-10 pointer-events-none" />

      <div ref={trackRef} className="marquee-track flex w-max items-center">
        {half(0)}
        {half(1)}
      </div>
    </div>
  );
}
