import React, { useState, useMemo } from "react";
import { PROJECTS, ProjectItem } from "../data/resume";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { ExternalLink, Sparkles, FolderGit2, Search, X, CheckCircle2, ArrowRight } from "lucide-react";

interface ProjectsProps {
  lang: "en" | "fa";
}

export default function Projects({ lang }: ProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const allTags = ["All", "FastAPI", "Scraping", "AI Pipelines", "PostgreSQL", "DevOps"];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesTag =
        selectedTag === "All" ||
        proj.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())) ||
        (selectedTag === "DevOps" && proj.tags.some((t) => t.includes("Docker") || t.includes("DevOps")));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        (proj.titleFa && proj.titleFa.toLowerCase().includes(q)) ||
        proj.description.toLowerCase().includes(q) ||
        (proj.descriptionFa && proj.descriptionFa.toLowerCase().includes(q)) ||
        proj.tags.some((t) => t.toLowerCase().includes(q));

      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  return (
    <section id="projects" data-testid="projects-section" className="py-24 sm:py-32 bg-[#0D1420]/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow={lang === "fa" ? "پروژه‌های شاخص" : "Portfolio"}
          title={lang === "fa" ? "پروژه‌های کلیدی و معماری‌های توسعه‌یافته" : "Featured engineering projects"}
          testid="projects-heading"
        />

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all whitespace-nowrap ${
                  selectedTag === tag
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "fa" ? "جستجو در پروژه‌ها..." : "Filter by keyword..."}
              className="w-full bg-[#0B111D] border border-white/10 rounded-xl pl-9 pr-8 py-1.5 font-mono text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((proj, i) => (
            <Reveal key={proj.testid} delay={i * 0.1} className="h-full">
              <TiltCard max={10} className="h-full">
                <div
                  data-testid={proj.testid}
                  onClick={() => setActiveProjectModal(proj)}
                  className="h-full rounded-2xl border border-white/10 bg-[#0B111D]/85 p-6 sm:p-7 backdrop-blur-md hover:border-emerald-400/50 hover:shadow-[0_15px_40px_rgba(16,185,129,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Row: Index & Role */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono text-xs text-slate-400 font-semibold">
                          PROJECT // {proj.index}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                        {proj.period}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 font-display font-bold text-xl text-white group-hover:text-emerald-300 transition-colors">
                      {lang === "fa" && proj.titleFa ? proj.titleFa : proj.title}
                    </h3>

                    {/* Role sub-badge */}
                    <div className="mt-1 font-mono text-xs text-slate-400">
                      {proj.role}
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {lang === "fa" && proj.descriptionFa ? proj.descriptionFa : proj.description}
                    </p>
                  </div>

                  {/* Footer tags and link */}
                  <div className="mt-6 pt-5 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-white/5 font-mono text-[11px] text-slate-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-emerald-400 group-hover:underline flex items-center gap-1">
                        <span>{lang === "fa" ? "مشاهده جزئیات معماری" : "View architecture specs"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>

                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
            {lang === "fa" ? "هیچ پروژه‌ای با این معیار پیدا نشد." : "No projects match your filter criteria."}
          </div>
        )}

        {/* Project Technical Detail Modal */}
        {activeProjectModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setActiveProjectModal(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-[#0D1420] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                    Project // {activeProjectModal.index} · {activeProjectModal.period}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1">
                    {lang === "fa" && activeProjectModal.titleFa
                      ? activeProjectModal.titleFa
                      : activeProjectModal.title}
                  </h3>
                  <div className="text-slate-400 font-mono text-xs mt-1">
                    {activeProjectModal.role}
                  </div>
                </div>

                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
                  {lang === "fa" ? "شرح معماری و چالش‌های فنی" : "Architecture & Engineering Scope"}
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {lang === "fa" && activeProjectModal.descriptionFa
                    ? activeProjectModal.descriptionFa
                    : activeProjectModal.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
                  {lang === "fa" ? "فناوری‌ها و پروتکل‌های به‌کاررفته" : "Technologies & Infrastructure"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 font-mono text-xs text-emerald-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {activeProjectModal.url ? (
                  <a
                    href={activeProjectModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-mono text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
                  >
                    <span>{lang === "fa" ? "مشاهده آنلاین وب‌سایت" : "Visit Live Platform"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === "fa" ? "معماری در محیط پروداکشن فعال است" : "Enterprise internal deployment"}</span>
                  </span>
                )}

                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 font-mono text-xs"
                >
                  {lang === "fa" ? "بستن" : "Close"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
