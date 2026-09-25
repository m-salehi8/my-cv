import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { EXPERIENCE } from "../data/resume";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { MapPin } from "lucide-react";

interface ExperienceProps {
  lang: "en" | "fa";
}

export default function Experience({ lang }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" data-testid="experience-section" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow={lang === "fa" ? "گاه‌شمار شغلی" : "Chronology"}
          title={lang === "fa" ? "سوابق کاری و نقش‌های سازمانی" : "Work history & roles"}
          testid="experience-heading"
        />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative ml-2 sm:ml-8 pl-6 sm:pl-12 space-y-8 sm:space-y-16">
          {/* Base Background Track Line */}
          <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-slate-800/80 -translate-x-1/2" />

          {/* Active Fill Line */}
          <motion.div
            style={{ height: fillHeight }}
            className="absolute left-0 top-6 w-[2px] -translate-x-1/2 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] origin-top z-0"
          />

          {EXPERIENCE.map((exp, idx) => (
            <Reveal key={exp.testid} delay={idx * 0.1}>
              <div data-testid={exp.testid} className="relative group">
                <TimelineNode
                  index={idx}
                  total={EXPERIENCE.length}
                  progress={smoothProgress}
                />

                <div className="rounded-2xl border border-white/10 bg-[#0B111D]/80 hover:border-emerald-500/30 transition-all p-5 sm:p-8 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                        {exp.company}
                      </h3>
                      <div className="text-emerald-400 font-mono text-xs sm:text-sm mt-1">
                        {exp.role}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-slate-400">
                      <span className="bg-white/5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-white/5">
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="mt-4 space-y-3 font-normal text-slate-300 text-sm sm:text-base leading-relaxed">
                    {(lang === "fa" && exp.pointsFa ? exp.pointsFa : exp.points).map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-bold select-none text-base leading-tight mt-0.5">
                          •
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 font-mono text-xs text-emerald-400 hover:border-emerald-400 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineNode({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: any;
}) {
  const threshold = index / Math.max(1, total - 1);
  const nodeScale = useTransform(
    progress,
    [Math.max(0, threshold - 0.05), threshold, Math.min(1, threshold + 0.15)],
    [0.9, 1.25, 1]
  );

  const nodeBorder = useTransform(
    progress,
    [Math.max(0, threshold - 0.03), threshold],
    ["rgba(51, 65, 85, 0.9)", "rgba(52, 211, 153, 1)"]
  );

  const nodeGlow = useTransform(
    progress,
    [Math.max(0, threshold - 0.03), threshold],
    ["0 0 0px rgba(0,0,0,0)", "0 0 14px rgba(52, 211, 153, 0.9)"]
  );

  const dotFill = useTransform(
    progress,
    [Math.max(0, threshold - 0.03), threshold],
    ["rgba(10, 14, 23, 1)", "rgba(52, 211, 153, 1)"]
  );

  return (
    <div className="absolute -left-[33px] sm:-left-[57px] top-6 flex items-center justify-center z-10">
      <motion.div
        style={{
          scale: nodeScale,
          borderColor: nodeBorder,
          boxShadow: nodeGlow,
        }}
        className="h-4 w-4 rounded-full bg-[#0A0E17] border-2 transition-colors duration-200 flex items-center justify-center"
      >
        <motion.div
          style={{ backgroundColor: dotFill }}
          className="h-1.5 w-1.5 rounded-full"
        />
      </motion.div>
    </div>
  );
}
