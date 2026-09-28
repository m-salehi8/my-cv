import React, { useState } from "react";
import { motion } from "motion/react";
import { SKILLS } from "../data/resume";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import SectionContainer, { SectionItem, sectionItemVariants } from "./SectionContainer";
import LottieAnimation from "./LottieAnimation";
import { SKILLS_TECH_RADAR_LOTTIE } from "../data/lottieAnimations";
import { Code, Database, Server, Bug, Sparkles, Layers, Check } from "lucide-react";

interface SkillsProps {
  lang: "en" | "fa";
}

export default function Skills({ lang }: SkillsProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="w-5 h-5 text-emerald-400" />;
      case "database":
        return <Database className="w-5 h-5 text-cyan-400" />;
      case "server":
        return <Server className="w-5 h-5 text-indigo-400" />;
      case "spider":
        return <Bug className="w-5 h-5 text-amber-400" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-fuchsia-400" />;
      case "layers":
        return <Layers className="w-5 h-5 text-teal-400" />;
      default:
        return <Code className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <SectionContainer
      id="stack"
      dataTestId="skills-section"
      className="py-24 sm:py-32 bg-[#0D1420]/40 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow={lang === "fa" ? "جعبه ابزار" : "Toolbox"}
          title={lang === "fa" ? "ماتریس فناوری‌ها و مهارت‌ها" : "Tech stack matrix"}
          testid="skills-heading"
        />

        {/* Live Tech Radar & Architecture Core Banner */}
        <SectionItem className="mb-8">
          <SpotlightCard className="p-5 sm:p-7 bg-gradient-to-r from-[#0C1322]/90 via-[#0A0F1D]/80 to-[#0C1322]/90 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 w-full">
                {/* Lottie Tech Radar Canvas */}
                <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-2xl bg-[#070B14]/90 border border-emerald-500/20 shadow-inner">
                  <LottieAnimation
                    animationData={SKILLS_TECH_RADAR_LOTTIE}
                    className="w-full h-full"
                    ariaLabel={lang === "fa" ? "رادار پایش فناوری‌ها" : "Tech radar telemetry scanner"}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
                </div>

                <div className={lang === "fa" ? "sm:text-right" : "sm:text-left"}>
                  <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-[11px] text-emerald-400 font-semibold tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>{lang === "fa" ? "رادار پایش هسته زیرساخت" : "ACTIVE ARCHITECTURE RADAR"}</span>
                  </div>

                  <h3 className="mt-1.5 font-display font-bold text-lg sm:text-xl text-white">
                    {lang === "fa"
                      ? "موتور پردازش همزمان و ارکستراسیون میکروسرویس‌ها"
                      : "High-Concurrency Backend Core & Microservices"}
                  </h3>

                  <p className="mt-1 text-slate-400 text-xs sm:text-sm font-mono max-w-xl leading-relaxed">
                    {lang === "fa"
                      ? "پایتون، فست‌ای‌پی‌آی، پایگاه‌های داده ناهمگام و خطوط استخراج خودکار داده در تعامل پیوسته برای حداکثر پایداری و بازدهی."
                      : "Synchronized Python event loops, distributed databases, message queues, and scraper fleets engineered for resilience."}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-white/5 gap-2.5 font-mono">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                  6 DOMAINS ACTIVE
                </span>
                <span className="text-[11px] text-slate-400">
                  25+ PRODUCTION TOOLS
                </span>
              </div>
            </div>
          </SpotlightCard>
        </SectionItem>

        {/* Category Cards Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((cat) => (
            <motion.div
              key={cat.testid}
              variants={sectionItemVariants}
              className="h-full"
            >
              <SpotlightCard className="h-full p-6 flex flex-col justify-between group">
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                        {getIcon(cat.icon)}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors">
                          {lang === "fa" ? cat.titleFa : cat.title}
                        </h3>
                        <span className="font-mono text-[10px] text-slate-500">
                          {cat.items.length} TECHNOLOGIES
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skill Tags List */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.items.map((item) => {
                      const isSelected = selectedTag === item;
                      return (
                        <button
                          key={item}
                          onClick={() => setSelectedTag(isSelected ? null : item)}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                            isSelected
                              ? "bg-emerald-500 text-slate-950 font-bold scale-105 shadow-md shadow-emerald-500/30"
                              : "bg-white/5 text-slate-300 border border-white/5 hover:border-emerald-400/40 hover:text-emerald-300 hover:bg-white/10"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-400/80">
                    <Check className="w-3.5 h-3.5" /> Production Ready
                  </span>
                  <span>High Concurrency</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
