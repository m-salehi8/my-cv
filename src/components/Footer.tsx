import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROFILE, SOCIALS } from "../data/resume";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Copy, Check, Download, Mail, Phone, ExternalLink, ArrowUp, Send } from "lucide-react";

interface FooterProps {
  lang: "en" | "fa";
  onOpenCvModal: () => void;
}

export default function Footer({ lang, onOpenCvModal }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      data-testid="contact-section"
      className="relative overflow-hidden py-24 sm:py-32 border-t border-white/10"
    >
      {/* Huge subtle text stroke watermark */}
      <motion.span
        aria-hidden="true"
        style={{
          x: bgX,
          WebkitTextStroke: "1px rgba(148, 163, 184, 0.12)",
        }}
        className="pointer-events-none select-none absolute top-4 left-0 font-display font-black text-[18vw] leading-none text-transparent whitespace-nowrap"
      >
        SALEHI · SALEHI
      </motion.span>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow={lang === "fa" ? "سیگنال ارتباطی" : "Signal"}
          title={lang === "fa" ? "بیایید سیستمی پایدار بسازیم" : "Let's build something reliable"}
          testid="contact-heading"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: CTA description & Copy Email button */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.1}>
              <p className="text-slate-300 text-base sm:text-xl font-normal leading-relaxed">
                {lang === "fa"
                  ? "آماده همکاری در موقعیت‌های توسعه باک‌اند، طراحی خطوط لوله داده و مایکروسرویس‌های بلادرنگ در سراسر جهان یا استانبول."
                  : "Currently exploring backend engineering roles, high-throughput microservices, and AI-driven workflow infrastructure. Reach out directly:"}
              </p>
            </Reveal>

            {/* Direct Email Action Button */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={copyEmail}
                  className="group inline-flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-6 py-4 font-mono text-sm sm:text-base text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all shadow-lg shadow-emerald-500/5 active:scale-95"
                >
                  <Mail className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{PROFILE.email}</span>
                  <span className="text-xs ml-2 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-200">
                    {copied ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Click to copy
                      </span>
                    )}
                  </span>
                </button>

                <a
                  href={PROFILE.resumeUrl}
                  download="Mohammadreza_Salehi_CV.pdf"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-mono text-sm text-slate-300 hover:border-emerald-400/50 hover:text-emerald-300 transition-all hover:bg-white/10"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download CV (.PDF)</span>
                </a>
              </div>
            </Reveal>

            {/* Phone & Location info */}
            <Reveal delay={0.25}>
              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-slate-400">
                <a
                  href={PROFILE.phoneHref}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{PROFILE.phone}</span>
                </a>
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Based in {PROFILE.location}</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Social Channels */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-[#0B111D]/80 p-6 backdrop-blur-md space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-slate-400 pb-2 border-b border-white/5">
                  Direct channels & social profiles
                </div>

                <div className="space-y-2">
                  {SOCIALS.map((soc) => (
                    <a
                      key={soc.id}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all group"
                    >
                      <span className="font-mono text-sm text-slate-200 group-hover:text-emerald-300 font-medium flex items-center gap-2">
                        {soc.id === "telegram" && <Send className="w-4 h-4 text-cyan-400" />}
                        {soc.label}
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © 2026 Mohammadreza Salehi — built with FastAPI-grade precision
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
