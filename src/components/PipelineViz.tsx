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

const Y = 26;
const QUEUE_PER_RETRY = 3;

/**
 * A tiny request pipeline. Click (or Enter on) a service to take it down: traffic stops at the
 * failed hop, messages back up in front of it while retries back off, then drain on recovery.
 */
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
      window.setTimeout(() => setPhase(2), 1000),
      window.setTimeout(() => setPhase(3), 2200),
      window.setTimeout(() => {
        setFault(null);
        setPhase(0);
      }, 3200),
    ];
  };

  const fa = lang === "fa";
  const faultIdx = fault ? NODES.findIndex((n) => n.id === fault) : -1;
  const recovered = phase >= 3;
  const down = fault !== null && !recovered;
  // Traffic reaches just short of the failed hop; with no fault it runs end to end.
  const endX = down ? NODES[faultIdx].x - 11 : NODES[NODES.length - 1].x;
  const path = `M${NODES[0].x},${Y} H${endX}`;
  const name = fault ? NODES[faultIdx].label : "";
  const queued = fault && faultIdx > 0 ? Math.min(phase, 2) * QUEUE_PER_RETRY : 0;

  const status = !fault
    ? fa ? "روی یک سرویس بزنید تا از دسترس خارج شود" : "click a service to take it down"
    : recovered
      ? fa ? `${name} برگشت · ${queued} پیام صف تخلیه شد ✓` : `${name} back up · ${queued} queued messages drained ✓`
      : fa ? `${name} از دسترس خارج شد · تلاش مجدد ${phase}/3 · ${queued} پیام در صف` : `${name} down · retry ${phase}/3 with backoff · ${queued} queued`;

  return (
    <div dir="ltr">
      <svg viewBox="0 0 340 64" className="w-full h-auto" role="group" aria-label={fa ? "نمودار جریان درخواست" : "Request pipeline diagram"}>
        {/* Wire: healthy segment flows, the segment past a failed hop goes dark */}
        <path d={`M${NODES[0].x},${Y} H${NODES[NODES.length - 1].x}`} stroke="rgba(148,163,184,0.18)" strokeWidth="1.5" strokeDasharray="4 5" fill="none" />
        <path d={path} stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" strokeDasharray="4 5" fill="none" className="animate-pipeline-flow" />

        {endX > NODES[0].x + 12 && (
          <g key={path} className="motion-reduce:hidden">
            {[0, 1, 2].map((i) => (
              <circle key={i} r="2.6" fill="#34d399">
                <animateMotion dur={`${(3.6 * (endX - NODES[0].x)) / 296}s`} begin={`${-i * 1.2}s`} repeatCount="indefinite" path={path} />
              </circle>
            ))}
          </g>
        )}

        {/* Backlog in front of the failed hop */}
        {faultIdx > 0 &&
          Array.from({ length: QUEUE_PER_RETRY * 2 }, (_, i) => {
            const x = NODES[faultIdx].x - 13 - (i % QUEUE_PER_RETRY) * 5.5;
            const y = Y - 7 - Math.floor(i / QUEUE_PER_RETRY) * 5.5;
            const visible = i < queued;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2.1"
                fill="#fcd34d"
                className={`queue-dot ${recovered ? "drain" : ""}`}
                style={{
                  opacity: visible && !recovered ? 1 : 0,
                  transform: recovered ? `translate(${NODES[faultIdx].x - x}px, ${Y - y}px)` : undefined,
                  transitionDelay: recovered ? `${i * 50}ms` : undefined,
                }}
              />
            );
          })}

        {NODES.map((n) => {
          const isFault = fault === n.id;
          const color = isFault ? (recovered ? "#34d399" : "#fb7185") : "#10b981";
          return (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`${fa ? "از دسترس خارج کردن" : "Take down"} ${n.label}`}
              onClick={() => inject(n.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), inject(n.id))}
              className="cursor-pointer outline-none group"
            >
              <circle cx={n.x} cy={Y} r="14" fill="transparent" />
              {isFault && !recovered && (
                <circle cx={n.x} cy={Y} r="9" fill="none" stroke="#fb7185" strokeWidth="1" className="animate-radar-wave" style={{ transformOrigin: `${n.x}px ${Y}px` }} />
              )}
              <circle
                cx={n.x}
                cy={Y}
                r="6.5"
                fill="#0A0E17"
                stroke={color}
                strokeWidth="1.6"
                className="transition-colors group-hover:fill-emerald-950 group-focus-visible:stroke-white"
              />
              <circle cx={n.x} cy={Y} r="2" fill={isFault ? color : "#34d399"} />
              <text x={n.x} y="49" textAnchor="middle" fontSize="7.5" fill={isFault && !recovered ? "#fda4af" : "#94a3b8"} fontFamily="var(--font-mono)">
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p
        className={`mt-1 text-[11px] font-mono ${fault ? (recovered ? "text-emerald-300" : "text-rose-300") : "text-slate-500"}`}
        dir={fa ? "rtl" : "ltr"}
        aria-live="polite"
      >
        {status}
      </p>
    </div>
  );
}
