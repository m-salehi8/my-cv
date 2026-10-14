import React from "react";
import { SKILLS } from "../data/resume";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import SectionContainer, { SectionItem } from "./SectionContainer";
import { Code, Database, Server, Bug, Sparkles, Layers } from "lucide-react";

interface SkillsProps {
  lang: "en" | "fa";
}

export default function Skills({ lang }: SkillsProps) {
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
          route="/stack"
          meta={lang === "fa" ? `${SKILLS.length} حوزه · ${SKILLS.reduce((n, c) => n + c.items.length, 0)} ابزار` : `${SKILLS.length} domains · ${SKILLS.reduce((n, c) => n + c.items.length, 0)} tools`}
          title={lang === "fa" ? "ماتریس فناوری‌ها و مهارت‌ها" : "Tech stack matrix"}
          testid="skills-heading"
        />

        {/* Category Cards Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((cat, i) => (
            <SectionItem key={cat.testid} index={i % 3} className="h-full">
              <SpotlightCard className="h-full p-6 group">
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
                          {cat.items.length} {lang === "fa" ? "ابزار" : "TOOLS"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skill Tags List */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-lg font-mono text-xs bg-white/5 text-slate-300 border border-white/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </SpotlightCard>
            </SectionItem>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
