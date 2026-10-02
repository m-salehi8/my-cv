import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.14)",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  // Pointer position goes straight to CSS variables: no React re-render per mouse move.
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={divRef}
      onPointerMove={handlePointerMove}
      className={`group/spot relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B111D]/80 transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 z-0"
        style={{
          background: `radial-gradient(400px circle at var(--sx, 50%) var(--sy, 50%), ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
