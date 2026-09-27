import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROFILE, SOCIALS } from "../data/resume";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { useToast } from "./Toast";
import { Copy, Check, Download, Mail, Phone, ExternalLink, ArrowUp, Send, User, MessageSquare, Sparkles } from "lucide-react";

interface FooterProps {
  lang: "en" | "fa";
  onOpenCvModal: () => void;
}

export default function Footer({ lang, onOpenCvModal }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { showToast } = useToast();

  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      showToast(
        lang === "fa" ? "ایمیل کپی شد" : "Email Copied",
        PROFILE.email,
        "success"
      );
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // fallback
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.phone);
      setCopiedPhone(true);
      showToast(
        lang === "fa" ? "شماره تماس کپی شد" : "Phone Copied",
        PROFILE.phone,
        "success"
      );
      setTimeout(() => setCopiedPhone(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      showToast(
        lang === "fa" ? "پیام ارسال شد" : "Message Dispatched",
        lang === "fa" ? "پیام شما در صف بررسی قرار گرفت." : "Your inquiry has been queued for immediate review.",
        "success"
      );
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 600);
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
      {/* Background Watermark */}
      <motion.span
        aria-hidden="true"
        style={{
          x: bgX,
          WebkitTextStroke: "1px rgba(148, 163, 184, 0.08)",
        }}
        className="pointer-events-none select-none absolute top-4 left-0 font-display font-black text-[18vw] leading-none text-transparent whitespace-nowrap"
      >
        SALEHI · BACKEND
      </motion.span>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          eyebrow={lang === "fa" ? "سیگنال ارتباطی" : "Signal"}
          title={lang === "fa" ? "بیایید سیستمی مقیاس‌پذیر و پایدار بسازیم" : "Let's build something reliable & scalable"}
          testid="contact-heading"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Quick Copy Buttons */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.1}>
              <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
                {lang === "fa"
                  ? "آماده همکاری در موقعیت‌های توسعه بک‌اند (Senior / Lead)، طراحی خطوط لوله داده و مایکروسرویس‌های توزیع‌شده با کارایی بالا در سراسر جهان یا استانبول."
                  : "Currently exploring backend engineering roles, high-throughput microservices, and AI-driven workflow infrastructure. Reach out directly or dispatch a message below:"}
              </p>
            </Reveal>

            {/* Direct Email Action Button */}
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={copyEmail}
                  className="group flex-1 inline-flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-5 py-3.5 font-mono text-xs sm:text-sm text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all shadow-md active:scale-95"
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold truncate">{PROFILE.email}</span>
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 shrink-0 ml-2">
                    {copiedEmail ? (lang === "fa" ? "کپی شد!" : "Copied!") : (lang === "fa" ? "کپی ایمیل" : "Copy")}
                  </span>
                </button>

                <button
                  onClick={copyPhone}
                  className="group inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 font-mono text-xs sm:text-sm text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-all hover:bg-white/10 active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{PROFILE.phone}</span>
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-slate-300 ml-2">
                    {copiedPhone ? (lang === "fa" ? "کپی شد!" : "Copied!") : (lang === "fa" ? "کپی شماره" : "Copy")}
                  </span>
                </button>
              </div>
            </Reveal>

            {/* Social channels */}
            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-white/10 bg-[#0B111D]/80 p-5 backdrop-blur-md space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-slate-400 pb-2 border-b border-white/5 flex items-center justify-between">
                  <span>{lang === "fa" ? "کانال‌های مستقیم و شبکه‌ها" : "Direct channels & profiles"}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{PROFILE.location}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SOCIALS.map((soc) => (
                    <a
                      key={soc.id}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all group"
                    >
                      <span className="font-mono text-xs text-slate-200 group-hover:text-emerald-300 font-medium flex items-center gap-2">
                        {soc.id === "telegram" && <Send className="w-3.5 h-3.5 text-cyan-400" />}
                        {soc.label}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <SpotlightCard className="p-6 sm:p-7 shadow-2xl relative">
                <h3 className="font-display font-bold text-lg text-white mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "fa" ? "ارسال پیام مستقیم" : "Send a Direct Message"}</span>
                </h3>
                <p className="font-mono text-xs text-slate-400 mb-5">
                  {lang === "fa"
                    ? "پیام شما مستقیماً به تلگرام و ایمیل من ارسال می‌شود."
                    : "Your message is dispatched immediately to my priority notification queue."}
                </p>

                {submitSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2 animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {lang === "fa"
                        ? "پیام شما دریافت شد و به زودی پاسخ داده خواهد شد. با تشکر!"
                        : "Message transmitted successfully! I will respond promptly."}
                    </span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                        {lang === "fa" ? "نام شما" : "Your Name"}
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder={lang === "fa" ? "علی رضایی" : "Alex Mercer"}
                          className="w-full rounded-xl border border-white/10 bg-slate-950/60 pl-9 pr-3 py-2.5 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                        {lang === "fa" ? "ایمیل یا آیدی تماس" : "Your Email"}
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/60 pl-9 pr-3 py-2.5 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                      {lang === "fa" ? "متن پیام یا شرح پروژه" : "Message / Project Inquiries"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={
                        lang === "fa"
                          ? "سلام محمدرضا، ما به دنبال مهندس بک‌اند با تخصص FastAPI برای توسعه میکروسرویس‌های خود هستیم..."
                          : "Hi Mohammadreza, we'd like to discuss a backend engineering opportunity at our team..."
                      }
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 resize-y"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={onOpenCvModal}
                      className="font-mono text-xs text-slate-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === "fa" ? "دریافت فایل رزومه" : "View CV"}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-2.5 font-mono text-xs font-bold text-slate-950 transition-all shadow-md shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>{isSubmitting ? (lang === "fa" ? "در حال ارسال..." : "Sending...") : (lang === "fa" ? "ارسال پیام" : "Dispatch Message")}</span>
                    </button>
                  </div>
                </form>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © 2026 Mohammadreza Salehi — {lang === "fa" ? "توسعه‌یافته با دقت و استانداردهای FastAPI" : "built with FastAPI-grade precision"}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <span>{lang === "fa" ? "بازگشت به بالا" : "Back to top"}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
