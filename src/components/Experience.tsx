import React, { useEffect, useRef } from "react";
import { EXPERIENCE } from "../data/resume";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import SectionContainer, { SectionItem } from "./SectionContainer";
import { useElementProgress } from "../lib/scroll";
import { MapPin, GitCommitHorizontal } from "lucide-react";

interface ExperienceProps {
  lang: "en" | "fa";
}

// Short commit-style ids: purely decorative, one per role.
const COMMIT_IDS = ["e4c9a1f", "7b20d3c", "a91f5e8", "3d6c0b2"];

export default function Experience({ lang }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "fa";

  useElementProgress(containerRef, 0.65, 0.75);

  return (
    <SectionContainer id="experience" dataTestId="experience-section" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow={lang === "fa" ? "گاه‌شمار شغلی" : "Chronology"}
          title={lang === "fa" ? "سوابق کاری و نقش‌های سازمانی" : "Work history & roles"}
          testid="experience-heading"
        />

        {/* Git-log style timeline: one commit per role, newest first */}
        <div
          ref={containerRef}
          className={`relative ${
            isRtl ? "mr-2 sm:mr-8 pr-6 sm:pr-12" : "ml-2 sm:ml-8 pl-6 sm:pl-12"
          } space-y-8 sm:space-y-14`}
        >
          <div
            aria-hidden="true"
            className={`absolute ${isRtl ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"} top-6 bottom-6 w-[2px] bg-slate-800/80`}
          />
          <div
            aria-hidden="true"
            className={`absolute ${
              isRtl ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
            } top-6 bottom-6 w-[2px] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] origin-top`}
            style={{ transform: "scaleY(var(--p, 0))" }}
          />

          {EXPERIENCE.map((exp, idx) => (
            <SectionItem key={exp.testid} className="relative group" data-testid={exp.testid}>
              <TimelineNode isRtl={isRtl} current={exp.period === "Present"} />

              <SpotlightCard className="p-5 sm:p-8">
                <div className="flex items-center gap-2 pb-3 font-mono text-[11px] text-slate-500" dir="ltr">
                  <GitCommitHorizontal className="w-3.5 h-3.5 text-emerald-500/70" aria-hidden="true" />
                  <span className="text-amber-300/80">{COMMIT_IDS[idx % COMMIT_IDS.length]}</span>
                  {exp.period === "Present" && (
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-px text-emerald-300">
                      HEAD → main
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4">
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">{exp.company}</h3>
                    <div className="text-emerald-400 font-mono text-xs sm:text-sm mt-1">{exp.role}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-slate-400">
                    <span className="bg-white/5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-white/5">{exp.period}</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500" aria-hidden="true" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-3 font-normal text-slate-300 text-sm sm:text-base leading-relaxed">
                  {(lang === "fa" && exp.pointsFa ? exp.pointsFa : exp.points).map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="text-emerald-400 font-bold select-none text-base leading-tight mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 font-mono text-xs text-slate-300 border border-white/5 hover:border-emerald-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </SectionItem>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

function TimelineNode({ isRtl, current }: { isRtl: boolean; current: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  // Lights up once the node scrolls past the reading line.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("reached", entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -35% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`timeline-node absolute top-6 ${isRtl ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"} z-10`}
    >
      <div className={`h-4 w-4 rounded-full bg-[#0A0E17] border-2 flex items-center justify-center ${current ? "node-live" : ""}`}>
        <div className="node-dot h-1.5 w-1.5 rounded-full" />
      </div>
    </div>
  );
}
