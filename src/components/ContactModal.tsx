import React, { useState, useEffect } from "react";
import { PROFILE, SOCIALS } from "../data/resume";
import { useToast } from "./Toast";
import {
  X,
  Send,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Briefcase,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "fa";
}

export default function ContactModal({ isOpen, onClose, lang }: ContactModalProps) {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [inquiryType, setInquiryType] = useState("Full-time / Senior Role");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const isRtl = lang === "fa";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(
        lang === "fa" ? "پیام ارسال شد" : "Message Dispatched",
        lang === "fa"
          ? "پیام شما به صندوق دریافت محمدرضا با موفقیت منتقل شد."
          : "Your inquiry was transmitted to Mohammadreza's priority queue.",
        "success"
      );
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setContactInfo("");
        setMessage("");
        onClose();
      }, 2200);
    }, 700);
  };

  const telegramLink = SOCIALS.find((s) => s.id === "telegram")?.href || "https://t.me/mohammadsalehi81";

  return (
    <>
      {isOpen && (
        <div role="dialog" aria-modal="true" aria-label={lang === "fa" ? "تماس" : "Contact"} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div onClick={onClose} className="fixed inset-0 bg-black/80 animate-fade-in" />

          {/* Modal Container */}
          <div
            className={`animate-modal-in relative w-full max-w-lg bg-[#0C121E] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            {/* Top Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#090E17]/80">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                    <span>{lang === "fa" ? "شروع گفتگو و همکاری" : "Get in Touch"}</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  </h3>
                  <p className="font-mono text-[11px] text-emerald-400/90">
                    {lang === "fa"
                      ? "آماده همکاری (تمام‌وقت / دورکاری) · پاسخ سریع"
                      : "Available for work · Avg response < 2 hrs"}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5">
              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">
                    {lang === "fa" ? "پیام با موفقیت دریافت شد" : "Transmission Successful"}
                  </h4>
                  <p className="font-mono text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    {lang === "fa"
                      ? "از حسن توجه شما سپاسگزارم. در اسرع وقت از طریق اطلاعات تماس با شما ارتباط خواهم گرفت."
                      : "Thank you for reaching out. I will review your message and reply promptly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                      {lang === "fa" ? "نام و نام‌خانوادگی" : "Your Name"}
                    </label>
                    <div className="relative">
                      <User className={`w-4 h-4 text-slate-500 absolute ${isRtl ? "right-3" : "left-3"} top-1/2 -translate-y-1/2`} />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === "fa" ? "مثال: علی رضایی" : "e.g. Alex Mercer"}
                        className={`w-full rounded-xl border border-white/10 bg-slate-950/70 ${isRtl ? "pr-9 pl-3" : "pl-9 pr-3"} py-2.5 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all`}
                      />
                    </div>
                  </div>

                  {/* Email / Contact Field */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                      {lang === "fa" ? "ایمیل یا آیدی تلگرام" : "Email or Telegram Handle"}
                    </label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 text-slate-500 absolute ${isRtl ? "right-3" : "left-3"} top-1/2 -translate-y-1/2`} />
                      <input
                        type="text"
                        required
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder={lang === "fa" ? "name@company.com یا @username" : "alex@domain.com or @telegram"}
                        className={`w-full rounded-xl border border-white/10 bg-slate-950/70 ${isRtl ? "pr-9 pl-3" : "pl-9 pr-3"} py-2.5 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all`}
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                      {lang === "fa" ? "موضوع همکاری" : "Inquiry Nature"}
                    </label>
                    <div className="relative">
                      <Briefcase className={`w-4 h-4 text-slate-500 absolute ${isRtl ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 pointer-events-none`} />
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className={`w-full rounded-xl border border-white/10 bg-[#0A0F1A] ${isRtl ? "pr-9 pl-3" : "pl-9 pr-3"} py-2.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all`}
                      >
                        <option value="Full-time / Senior Role">
                          {lang === "fa" ? "فرصت شغلی تمام‌وقت (Full-time / Senior)" : "Full-time / Senior Backend Role"}
                        </option>
                        <option value="Remote / Contract Project">
                          {lang === "fa" ? "پروژه ریموت و قراردادی (Contract / Consulting)" : "Remote / Contract Consulting"}
                        </option>
                        <option value="Architecture Review">
                          {lang === "fa" ? "مشاوره و طراحی معماری میکروسرویس" : "Architecture & Microservices Review"}
                        </option>
                        <option value="General Discussion">
                          {lang === "fa" ? "سایر موضوعات و گفتگوی کاری" : "General Inquiry"}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                      {lang === "fa" ? "شرح کوتاه پیام یا پروژه" : "Message / Brief"}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        lang === "fa"
                          ? "سلام، ما مایل هستیم درباره همکاری در موقعیت بک‌اند تیم‌مان با شما گفتگو کنیم..."
                          : "Hello Mohammadreza, we'd love to chat about a backend engineering opportunity..."
                      }
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 p-3 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all resize-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:scale-125" />
                      <span>{lang === "fa" ? "ارتباط در تلگرام" : "Telegram Direct"}</span>
                      <ExternalLink className="w-3 h-3 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 font-mono text-xs font-bold text-slate-950 transition-all shadow-md shadow-emerald-500/25 active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>{isSubmitting ? (lang === "fa" ? "در حال ارسال..." : "Sending...") : (lang === "fa" ? "ارسال پیام" : "Send Inquiry")}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Contact Alternative bar */}
            <div className="px-5 py-3 border-t border-white/5 bg-[#080D15] flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Mail className="w-3 h-3 text-emerald-400" />
                <span className="truncate">{PROFILE.email}</span>
              </span>
              <span className="text-emerald-400/90 font-medium">
                {PROFILE.location}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
