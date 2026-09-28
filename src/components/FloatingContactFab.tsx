import React from "react";
import { motion } from "motion/react";
import { MessageSquare, Sparkles } from "lucide-react";

interface FloatingContactFabProps {
  lang: "en" | "fa";
  onOpenContactModal: () => void;
}

export default function FloatingContactFab({
  lang,
  onOpenContactModal,
}: FloatingContactFabProps) {
  const isRtl = lang === "fa";

  return (
    <motion.button
      type="button"
      onClick={onOpenContactModal}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-label={lang === "fa" ? "آماده همکاری - ارسال پیام" : "Available for work - Contact"}
      className={`fixed ${
        isRtl ? "left-4 lg:left-8" : "right-4 lg:right-24"
      } bottom-20 lg:bottom-8 z-40 group flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full border border-emerald-500/40 bg-[#0A101C]/90 backdrop-blur-xl text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all cursor-pointer`}
    >
      {/* Pulse Radar Indicator */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" />
      </span>

      {/* Label */}
      <span className="font-mono text-xs font-semibold tracking-wide text-slate-200 group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
        <span>{lang === "fa" ? "آماده همکاری" : "Available for work"}</span>
        <span className="hidden sm:inline-block text-[10px] text-emerald-400/80 font-normal">
          • {lang === "fa" ? "تماس" : "Let's Talk"}
        </span>
      </span>

      {/* Icon */}
      <div className="h-6 w-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
        <MessageSquare className="w-3 h-3 transition-transform duration-300 ease-out group-hover:scale-125" />
      </div>
    </motion.button>
  );
}
