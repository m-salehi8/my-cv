import React, { useEffect, useRef, useState } from "react";

interface PipelineVizProps {
  lang: "en" | "fa";
}

const NODES = [
  { id: "client", label: "client", x: 22 },
  { id: "api", label: "fastapi", x: 92 },
  { id: "queue", label: "rabbitmq", x: 170 },
  { id: "worker", label: "worker", x: 248 },
  { id: "db", label: "postgres", x: 318 },
];

const PATH = "M22,26 H318";

/** A tiny request pipeline. Click (or Enter on) a node to inject a fault and watch the retry logic recover. */
export default function PipelineViz({ lang }: PipelineVizProps) {
  const [fault, setFault] = useState<string | null>(null);
  const [phase, setPhase] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const inject = (id: string) => {
    timers.current.forEach(clearTimeout);
    setFault(id);
    setPhase(1);
    timers.current = [
      window.setTimeout(() => setPhase(2), 900),
      window.setTimeout(() => setPhase(3), 1800),
      window.setTimeout(() => {
        setFault(null);
        setPhase(0);
      }, 3400),
    ];
  };

  const fa = lang === "fa";
  const status = fault
    ? phase >= 3
      ? fa ? `${fault} بازیابی شد ✓` : `${fault} recovered ✓`
      : fa ? `${fault} از دسترس خارج شد · تلاش مجدد ${phase}/3` : `${fault} down · retry ${phase}/3 (backoff)`
    : fa ? "روی یک سرویس بزنید تا خرابی شبیه‌سازی شود" : "click a service to inject a fault";

  return (
    <div dir="ltr">
      <svg viewBox="0 0 340 64" className="w-full h-auto" role="group" aria-label={fa ? "نمودار جریان درخواست" : "Request pipeline diagram"}>
        <path d={PATH} stroke="rgba(16,185,129,0.28)" strokeWidth="1.5" strokeDasharray="4 5" fill="none" className="animate-pipeline-flow" />

        {[0, 1, 2].map((i) => (
          <circle key={i} r="2.6" fill="#34d399" className="motion-reduce:hidden" opacity={fault ? 0.25 : 1}>
            <animateMotion dur="3.6s" begin={`${-i * 1.2}s`} repeatCount="indefinite" path={PATH} />
          </circle>
        ))}

        {NODES.map((n) => {
          const down = fault === n.id;
          return (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`${fa ? "شبیه‌سازی خرابی" : "Inject fault in"} ${n.label}`}
              onClick={() => inject(n.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), inject(n.id))}
              className="cursor-pointer outline-none group"
            >
              <circle cx={n.x} cy="26" r="14" fill="transparent" />
              {down && <circle cx={n.x} cy="26" r="9" fill="none" stroke="#fb7185" strokeWidth="1" className="animate-radar-wave" style={{ transformOrigin: `${n.x}px 26px` }} />}
              <circle
                cx={n.x}
                cy="26"
                r="6.5"
                fill="#0A0E17"
                stroke={down ? (phase >= 3 ? "#34d399" : "#fb7185") : "#10b981"}
                strokeWidth="1.6"
                className="transition-colors group-hover:fill-emerald-950 group-focus-visible:stroke-white"
              />
              <circle cx={n.x} cy="26" r="2" fill={down ? (phase >= 3 ? "#34d399" : "#fb7185") : "#34d399"} />
              <text x={n.x} y="49" textAnchor="middle" fontSize="7.5" fill={down ? "#fda4af" : "#94a3b8"} fontFamily="var(--font-mono)">
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className={`mt-1 text-[11px] font-mono ${fault ? (phase >= 3 ? "text-emerald-300" : "text-rose-300") : "text-slate-500"}`} aria-live="polite">
        {status}
      </p>
    </div>
  );
}
