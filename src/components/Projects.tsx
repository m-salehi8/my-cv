import React, { useEffect, useState } from "react";
import { PROJECTS, ProjectItem } from "../data/resume";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import SectionContainer, { SectionItem } from "./SectionContainer";
import { ExternalLink, FolderGit2, X, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface ProjectsProps {
  lang: "en" | "fa";
}

export default function Projects({ lang }: ProjectsProps) {
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!activeProjectModal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveProjectModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeProjectModal]);

  return (
    <SectionContainer
      id="projects"
      dataTestId="projects-section"
      className="py-24 sm:py-32 bg-[#0D1420]/40 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          route="/projects"
          meta={
            lang === "fa"
              ? `${PROJECTS.length} پروژه · شامل ۲ محصول شخصی`
              : `${PROJECTS.length} projects · incl. 2 own products`
          }
          title={lang === "fa" ? "پروژه‌های کلیدی و معماری‌های توسعه‌یافته" : "Featured engineering projects"}
          testid="projects-heading"
        />

        {/* Projects Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((proj, i) => (
            <SectionItem key={proj.testid} index={i} className="h-full">
              <SpotlightCard
                data-testid={proj.testid}
                onClick={() => setActiveProjectModal(proj)}
                className="h-full p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top Row: Index & Role */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-xs text-slate-400 font-semibold">
                        {proj.index}
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

                  {/* Own-product badge: built from zero by the author */}
                  {proj.ownership && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                      <span className="font-mono text-[11px] font-semibold text-cyan-200 leading-tight">
                        {lang === "fa" && proj.ownershipFa ? proj.ownershipFa : proj.ownership}
                      </span>
                    </div>
                  )}

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
                      <span>{lang === "fa" ? "مشاهده جزئیات" : "View details"}</span>
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
              </SpotlightCard>
            </SectionItem>
          ))}
        </div>

        {/* Project Technical Detail Modal */}
        {activeProjectModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setActiveProjectModal(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-[#0D1420] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-400">
                    {activeProjectModal.index}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-1">
                    {lang === "fa" && activeProjectModal.titleFa
                      ? activeProjectModal.titleFa
                      : activeProjectModal.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono mt-1">
                    {activeProjectModal.role} · {activeProjectModal.period}
                  </p>
                </div>

                <button
                  onClick={() => setActiveProjectModal(null)}
                  aria-label={lang === "fa" ? "بستن" : "Close"}
                  className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {activeProjectModal.ownership && (
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.07] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
                    <span className="font-mono text-xs font-bold text-cyan-200">
                      {lang === "fa" && activeProjectModal.ownershipFa
                        ? activeProjectModal.ownershipFa
                        : activeProjectModal.ownership}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        step: lang === "fa" ? "ایده و طراحی محصول" : "Product Idea & Design",
                        text:
                          lang === "fa"
                            ? "مسئله، معماری و تصمیم‌های کلیدی محصول توسط خودم تعریف و طراحی شد."
                            : "The problem, the architecture and every key product decision were defined and designed by me.",
                      },
                      {
                        step: lang === "fa" ? "توسعه و پیاده‌سازی" : "Development & Implementation",
                        text:
                          lang === "fa"
                            ? "بک‌اند، فرانت‌اند، موتور داده و زیرساخت — همه از صفر توسط خودم کدنویسی شد."
                            : "Backend, frontend, data engine and infrastructure — all written from scratch by me.",
                      },
                      {
                        step: lang === "fa" ? "مالکیت کامل محصول" : "Full Ownership",
                        text:
                          lang === "fa"
                            ? "محصول شخصی من است؛ طراحی، توسعه و نگهداری کامل توسط خودم انجام می‌شود."
                            : "It is my own product; design, development and maintenance are entirely mine.",
                      },
                    ].map((b) => (
                      <div key={b.step} className="rounded-lg bg-black/25 border border-white/5 p-3">
                        <div className="font-mono text-[11px] font-semibold text-cyan-300 mb-1">
                          {b.step}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-300">{b.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
                  {lang === "fa" ? "خلاصه معماری و نقش در پروژه" : "Architecture & Contributions"}
                </h4>
                <p className="text-slate-200 text-sm leading-relaxed">
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
                    <span>
                      {activeProjectModal.ownership
                        ? lang === "fa"
                          ? "محصول شخصی — در دسترس برای دموی زنده"
                          : "My own product — live demo available on request"
                        : lang === "fa"
                          ? "معماری در محیط پروداکشن فعال است"
                          : "Enterprise internal deployment"}
                    </span>
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
    </SectionContainer>
  );
}
