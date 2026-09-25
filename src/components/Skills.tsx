import React, { useState } from "react";
import { SKILLS, SkillCategory } from "../data/resume";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
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
    <section id="stack" data-testid="skills-section" className="py-24 sm:py-32 bg-[#0D1420]/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow={lang === "fa" ? "جعبه ابزار" : "Toolbox"}
          title={lang === "fa" ? "ماتریس فناوری‌ها و مهارت‌ها" : "Tech stack matrix"}
          testid="skills-heading"
        />

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((cat, i) => (
            <Reveal key={cat.testid} delay={i * 0.08} className="h-full">
              <TiltCard max={6} className="h-full">
                <div
                  data-testid={cat.testid}
                  className="h-full rounded-2xl border border-white/10 bg-[#0B111D]/80 p-6 backdrop-blur-md hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)] transition-all flex flex-col justify-between group"
                >
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
                    <span className="flex items-center gap-1.5 text-emerald-400/70">
                      <Check className="w-3.5 h-3.5" /> Production Ready
                    </span>
                    <span>High Scalability</span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
