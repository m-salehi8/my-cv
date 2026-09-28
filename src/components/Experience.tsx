import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { EXPERIENCE } from "../data/resume";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import SectionContainer, { sectionItemVariants } from "./SectionContainer";
import { MapPin } from "lucide-react";

interface ExperienceProps {
  lang: "en" | "fa";
}

export default function Experience({ lang }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "fa";

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
    <SectionContainer
      id="experience"
      dataTestId="experience-section"
      className="py-24 sm:py-32 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow={lang === "fa" ? "گاه‌شمار شغلی" : "Chronology"}
          title={lang === "fa" ? "سوابق کاری و نقش‌های سازمانی" : "Work history & roles"}
          testid="experience-heading"
        />

        {/* Timeline Container with RTL/LTR awareness */}
        <div
          ref={containerRef}
          className={`relative ${
            isRtl
              ? "mr-2 sm:mr-8 pr-6 sm:pr-12"
              : "ml-2 sm:ml-8 pl-6 sm:pl-12"
          } space-y-8 sm:space-y-16`}
        >
          {/* Base Background Track Line */}
          <div
            className={`absolute ${
              isRtl ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
            } top-6 bottom-6 w-[2px] bg-slate-800/80`}
          />

          {/* Active Fill Line */}
          <motion.div
            style={{ height: fillHeight }}
            className={`absolute ${
              isRtl ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
            } top-6 w-[2px] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] origin-top z-0`}
          />

          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={exp.testid}
              variants={sectionItemVariants}
              className="relative group"
              data-testid={exp.testid}
            >
              <TimelineNode
                index={idx}
                total={EXPERIENCE.length}
                progress={smoothProgress}
                isRtl={isRtl}
              />

              <SpotlightCard className="p-5 sm:p-8">
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
                      className="px-2.5 py-1 rounded-md bg-white/5 font-mono text-xs text-slate-300 border border-white/5 hover:border-emerald-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

interface TimelineNodeProps {
  index: number;
  total: number;
  progress: any;
  isRtl: boolean;
}

function TimelineNode({ index, total, progress, isRtl }: TimelineNodeProps) {
  const nodeThreshold = total > 1 ? index / (total - 1) : 0;
  const isReached = useTransform(progress, (v: number) => v >= nodeThreshold * 0.95);

  return (
    <div
      className={`absolute top-6 ${
        isRtl ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
      } z-10`}
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
        className="relative flex items-center justify-center"
      >
        <div className="h-4 w-4 rounded-full bg-[#0A0E17] border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_10px_rgba(52,211,153,0.8)]">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>
      </motion.div>
    </div>
  );
}
