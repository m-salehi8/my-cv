import React from "react";
import { PROFILE } from "../data/resume";
import { X, Download, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "fa";
}

export default function CvModal({ isOpen, onClose, lang }: CvModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0D1420] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-[#090E17]/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">
                Mohammadreza_Salehi_CV.pdf
              </h3>
              <p className="font-mono text-[11px] text-slate-400 truncate">
                {lang === "fa" ? "مهندس بک‌اند · پایتون / FastAPI / میکروسرویس" : "Backend Developer · Python / FastAPI / Microservices"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
            <a
              href={PROFILE.resumeUrl}
              download="Mohammadreza_Salehi_CV.pdf"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-500 px-3 sm:px-4 py-2 font-mono text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{lang === "fa" ? "دانلود فایل PDF" : "Download PDF"}</span>
              <span className="sm:hidden">PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Viewer Frame */}
        <div className="flex-1 min-h-[450px] sm:min-h-[550px] bg-slate-950 p-2 sm:p-4 overflow-y-auto">
          <object
            data={PROFILE.resumeUrl}
            type="application/pdf"
            className="w-full h-full min-h-[450px] sm:min-h-[550px] rounded-lg border border-white/5"
          >
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center h-full space-y-4">
              <FileText className="w-14 sm:w-16 h-14 sm:h-16 text-emerald-400 animate-pulse" />
              <div className="text-white font-display text-lg font-bold">
                {lang === "fa" ? "سند رزومه آماده دانلود است" : "Resume Document Ready"}
              </div>
              <p className="text-slate-400 font-mono text-xs max-w-md leading-relaxed">
                {lang === "fa"
                  ? "مرورگر شما از نمایش مستقیم فایل PDF در این کادر پشتیبانی نمی‌کند. روی دکمه زیر کلیک کنید تا فایل کامل دانلود و ذخیره شود."
                  : "Your browser doesn't support direct PDF embedding in this view. Click below to view or download the complete CV file."}
              </p>
              <a
                href={PROFILE.resumeUrl}
                download="Mohammadreza_Salehi_CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-mono text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>{lang === "fa" ? "دریافت فایل PDF رزومه" : "Download Resume PDF"}</span>
              </a>
            </div>
          </object>
        </div>

        {/* Modal Footer Summary */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#090E17]/80 flex items-center justify-between font-mono text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === "fa" ? "نسخه رسمی و تاییدشده ۲۰۲۶" : "Verified 2026 Production Edition"}</span>
          </span>
          <span className="hidden sm:inline">Istanbul / Remote Availability</span>
        </div>
      </div>
    </div>
  );
}
