import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

interface LoadTraceProps {
  lang: "en" | "fa";
}

type Kind = "net" | "server" | "client";

interface Span {
  id: string;
  label: string;
  kind: Kind;
  start: number;
  end: number;
}

interface Trace {
  spans: Span[];
  total: number;
  fcp: number | null;
  transfer: number;
}

// Rows are fixed so the prerendered skeleton and the measured trace have the same height.
const ROWS: Omit<Span, "start" | "end">[] = [
  { id: "dns", label: "dns lookup", kind: "net" },
  { id: "connect", label: "tcp + tls", kind: "net" },
  { id: "server", label: "server (ttfb)", kind: "server" },
  { id: "download", label: "html download", kind: "net" },
  { id: "parse", label: "dom parse", kind: "client" },
  { id: "hydrate", label: "react hydrate", kind: "client" },
];

const KIND_COLOR: Record<Kind, string> = {
  net: "bg-slate-400",
  server: "bg-emerald-400",
  client: "bg-sky-400",
};

// Wall-clock length of the replay; spans are drawn in proportion to their real duration.
const REPLAY_MS = 1600;

function measure(hydratedAt: number): Trace | null {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (!nav || !nav.responseEnd) return null;

  const at: Record<string, [number, number]> = {
    dns: [nav.domainLookupStart, nav.domainLookupEnd],
    connect: [nav.connectStart, nav.connectEnd],
    server: [nav.requestStart, nav.responseStart],
    download: [nav.responseStart, nav.responseEnd],
    parse: [nav.responseEnd, nav.domInteractive || nav.responseEnd],
    hydrate: [nav.domInteractive || nav.responseEnd, hydratedAt],
  };
  const spans = ROWS.map((r) => ({ ...r, start: at[r.id][0], end: Math.max(at[r.id][0], at[r.id][1]) }));
  const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0];
  return {
    spans,
    total: Math.max(hydratedAt, ...spans.map((s) => s.end)),
    fcp: fcpEntry ? fcpEntry.startTime : null,
    transfer: nav.transferSize || 0,
  };
}

const ms = (n: number) => `${Math.round(n)}ms`;

/** Waterfall of this page's own load, read from the Navigation Timing API in the visitor's browser. */
export default function LoadTrace({ lang }: LoadTraceProps) {
  const fa = lang === "fa";
  const [trace, setTrace] = useState<Trace | null>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const hydratedAt = performance.now();
    const id = requestAnimationFrame(() => setTrace(measure(hydratedAt)));
    // First paint can land after hydration (client-rendered dev builds); pick it up whenever it arrives.
    let po: PerformanceObserver | undefined;
    try {
      po = new PerformanceObserver((list) => {
        const fcp = list.getEntriesByName("first-contentful-paint")[0];
        if (fcp) setTrace((t) => (t ? { ...t, fcp: fcp.startTime, total: Math.max(t.total, fcp.startTime) } : t));
      });
      po.observe({ type: "paint", buffered: true });
    } catch {
      // Paint timing unsupported: the trace simply has no marker.
    }
    return () => {
      cancelAnimationFrame(id);
      po?.disconnect();
    };
  }, []);

  const total = trace?.total || 1;
  const pct = (n: number) => `${((n / total) * 100).toFixed(2)}%`;

  return (
    <div dir="ltr" className="font-mono text-[11px]">
      <div className="flex items-baseline justify-between gap-3 pb-2.5 border-b border-white/5">
        <span className="text-slate-300" dir={fa ? "rtl" : "ltr"}>
          {fa ? "بارگذاری همین صفحه، اندازه‌گیری‌شده در مرورگر شما" : "This page's load, measured in your browser"}
        </span>
        <span className="text-emerald-300 tabular-nums shrink-0">{trace ? ms(trace.total) : "…"}</span>
      </div>

      <div key={run} className="trace relative mt-2.5">
        {/* Time axis overlay: the playhead sweeps it once; bars grow as it passes their start */}
        {trace && (
          <div aria-hidden="true" className="trace-track">
            <span className="trace-playhead" style={{ "--len": `${REPLAY_MS}ms` } as React.CSSProperties} />
            {trace.fcp != null && (
              <span
                className="trace-fade absolute top-0 bottom-0 w-px bg-amber-300/60"
                style={{ left: pct(trace.fcp), "--d": `${(trace.fcp / total) * REPLAY_MS}ms` } as React.CSSProperties}
              >
                <span className="absolute -bottom-3.5 -translate-x-1/2 text-[9px] text-amber-200/80 whitespace-nowrap">
                  {fa ? "اولین رنگ" : "first paint"}
                </span>
              </span>
            )}
          </div>
        )}

        <ul className="space-y-1" aria-label={fa ? "زمان‌بندی بارگذاری صفحه" : "Page load timing"}>
          {(trace?.spans ?? ROWS.map((r) => ({ ...r, start: 0, end: 0 }))).map((s) => {
            const dur = s.end - s.start;
            return (
              <li key={s.id} className="grid grid-cols-[7.5rem_1fr] items-center gap-0 h-4">
                <span className="text-slate-500 truncate">{s.label}</span>
                {/* Right gutter keeps the duration label of the last span inside the card */}
                <span className="relative h-full me-12">
                  {trace && (
                    <span
                      className={`trace-bar absolute top-1/2 -translate-y-1/2 h-2 rounded-sm ${KIND_COLOR[s.kind]}`}
                      style={
                        {
                          left: pct(s.start),
                          width: `max(2px, ${pct(dur)})`,
                          "--d": `${(s.start / total) * REPLAY_MS}ms`,
                          "--len": `${Math.max(60, (dur / total) * REPLAY_MS)}ms`,
                        } as React.CSSProperties
                      }
                    />
                  )}
                  {trace && (
                    <span
                      className="trace-fade absolute top-1/2 -translate-y-1/2 ps-1.5 text-slate-400 tabular-nums whitespace-nowrap"
                      style={{ left: pct(s.end), "--d": `${(s.end / total) * REPLAY_MS}ms` } as React.CSSProperties}
                    >
                      {ms(dur)}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-slate-500">
        <span className="flex items-center gap-3">
          <Legend color={KIND_COLOR.net} label={fa ? "شبکه" : "network"} />
          <Legend color={KIND_COLOR.server} label={fa ? "سرور" : "server"} />
          <Legend color={KIND_COLOR.client} label={fa ? "مرورگر" : "browser"} />
          {trace && trace.transfer > 0 && (
            <span className="hidden sm:inline tabular-nums">html {(trace.transfer / 1024).toFixed(1)} kB</span>
          )}
        </span>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          disabled={!trace}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-slate-400 hover:text-emerald-300 hover:bg-white/5 transition-colors disabled:opacity-40"
        >
          <RotateCcw className="w-3 h-3" aria-hidden="true" />
          {fa ? "پخش دوباره" : "Replay"}
        </button>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-sm ${color}`} aria-hidden="true" />
      {label}
    </span>
  );
}
