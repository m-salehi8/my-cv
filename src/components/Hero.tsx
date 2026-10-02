import React, { useRef, useState } from "react";
import { PROFILE, SOCIALS } from "../data/resume";
import Terminal from "./Terminal";
import TerminalTyping from "./TerminalTyping";
import TiltCard from "./TiltCard";
import LoadTrace from "./LoadTrace";
import IstanbulClock from "./IstanbulClock";
import { Download, Mail, Linkedin, Github, Send, Check } from "lucide-react";

interface HeroProps {
  lang: "en" | "fa";
  onOpenCvModal: () => void;
}

export default function Hero({ lang, onOpenCvModal }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax: write normalized pointer position to CSS variables (no re-render).
  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
    el.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-testid="hero-section"
      onMouseMove={handleMouse}
      className="relative min-h-[92vh] lg:min-h-[calc(100svh-3.875rem)] flex items-center overflow-hidden pt-28 pb-16 lg:pt-24 lg:pb-10"
    >
      {/* Background Interactive Grid */}
      <div
        aria-hidden="true"
        style={{ transform: "translate(calc(var(--mx, 0) * -24px), calc(var(--my, 0) * -16px))" }}
        className="hero-grid absolute -inset-8 pointer-events-none opacity-40 transition-transform duration-300 ease-out"
      />

      {/* Atmospheric Glowing Orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        style={{ transform: "translate(calc(var(--mx, 0) * -90px), calc(var(--my, 0) * -56px))" }}
        className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none transition-transform duration-500 ease-out"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Bio & Title */}
        <div className="lg:col-span-7">
          {/* Status Badge: ● AVAILABLE FOR OPPORTUNITIES */}
          <div
            style={{ animationDelay: "0s" }}
            className="hero-rise flex items-center gap-2 mb-6 lg:mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-emerald-400 font-medium">
              {lang === "fa" ? "آماده برای فرصت‌های شغلی و پروژه‌های جدید" : "AVAILABLE FOR OPPORTUNITIES"}
            </span>
            <span aria-hidden="true" className="text-slate-700">/</span>
            <IstanbulClock lang={lang} />
          </div>

          {/* Heading: MOHAMMADREZA SALEHI */}
          <div
            style={{ animationDelay: "0.1s" }}
          className="hero-rise"
          >
            <h1 className="font-display font-black tracking-tight text-4xl sm:text-6xl lg:text-[3.75rem] xl:text-[4rem] leading-[1.05]">
              <span className="text-white block">{lang === "fa" ? "محمدرضا" : "MOHAMMADREZA"}</span>
              <span className="text-emerald-400 block mt-0.5 sm:mt-1">{lang === "fa" ? "صالحی" : "SALEHI"}</span>
              {/* The visible role line is animated (empty in the static HTML), so the heading states it too. */}
              <span className="sr-only">{lang === "fa" ? "، توسعه‌دهنده بک‌اند پایتون" : ", Python backend developer"}</span>
            </h1>

            {/* Terminal Typing Subtitle: $ MICROSERVICES & ASYNC PIPELINES */}
            <div className="mt-4 sm:mt-5 lg:mt-3 flex items-center">
              <TerminalTyping
                prefix="$"
                phrases={
                  lang === "fa"
                    ? [
                        "معماری میکروسرویس و خطوط داده ناهمگام",
                        "پایتون · FASTAPI · جنگو · POSTGRESQL",
                        "خزش خودکار وب در مقیاس بزرگ و ایجنت‌های هوش مصنوعی",
                      ]
                    : [
                        "MICROSERVICES & ASYNC PIPELINES",
                        "PYTHON · FASTAPI · DJANGO · POSTGRES",
                        "HIGH-THROUGHPUT WEB SCRAPING & LLM AGENTS",
                      ]
                }
                className="text-xs sm:text-sm text-slate-300 font-mono tracking-wider sm:tracking-widest uppercase break-words"
              />
            </div>
          </div>

          {/* Bio text */}
          <p
            style={{ animationDelay: "0.2s" }}
            className="hero-rise mt-5 sm:mt-6 lg:mt-4 text-slate-300 text-sm sm:text-base lg:text-[15px] leading-relaxed max-w-xl lg:max-w-2xl font-normal"
          >
            {lang === "fa" ? PROFILE.heroHookFa : PROFILE.heroHook}
          </p>

          {/* Real navigation timing of this very page load */}
          <div
            style={{ animationDelay: "0.25s" }}
            className="hero-rise mt-6 lg:mt-5 p-3 sm:p-4 lg:p-3.5 rounded-xl border border-white/10 bg-[#0E1524]/80 max-w-xl shadow-lg"
          >
            <LoadTrace lang={lang} />
          </div>

          {/* Action Buttons (Download Resume + Email copy + Socials) */}
          <div
            style={{ animationDelay: "0.3s" }}
            className="hero-rise mt-7 sm:mt-8 lg:mt-5 flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-5 lg:gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              {/* Solid Green Download Resume button */}
              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 px-5 py-3 font-mono text-xs sm:text-sm font-semibold text-slate-950 transition-all shadow-lg shadow-emerald-500/10 active:scale-95 w-full sm:w-auto text-center cursor-pointer min-h-[44px]"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>{lang === "fa" ? "مشاهده و دریافت فایل رزومه" : "Download Resume"}</span>
              </button>

              {/* Email Pill Button with copy */}
              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center sm:justify-start gap-2 rounded-xl border border-white/10 bg-[#0E1524]/80 px-4 py-3 font-mono text-xs sm:text-sm text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-white/5 transition-all w-full sm:w-auto max-w-full overflow-hidden min-h-[44px]"
                title="Click to copy email"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{PROFILE.email}</span>
                {copied && (
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 ml-1 shrink-0">
                    <Check className="w-3 h-3" /> {lang === "fa" ? "کپی شد!" : "Copied!"}
                  </span>
                )}
              </button>
            </div>

            {/* Social Icons row (LinkedIn, GitHub, Telegram) */}
            <div className="flex items-center gap-3 pt-1 lg:pt-0">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {soc.id === "linkedin" && <Linkedin className="w-4 h-4" />}
                  {soc.id === "github" && <Github className="w-4 h-4" />}
                  {soc.id === "telegram" && <Send className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Terminal matching screenshot */}
        <div className="lg:col-span-5 relative">

          <div
            style={{ animationDelay: "0.2s" }}
            className="hero-rise relative z-10"
          >
            <TiltCard max={8}>
              <Terminal onOpenCvModal={onOpenCvModal} lang={lang} />
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
