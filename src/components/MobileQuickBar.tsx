import React from "react";
import { Download, Terminal, Mail, Globe } from "lucide-react";

interface MobileQuickBarProps {
  lang: "en" | "fa";
  onToggleLang: () => void;
  onOpenCvModal: () => void;
  onOpenContactModal?: () => void;
}

export default function MobileQuickBar({
  lang,
  onToggleLang,
  onOpenCvModal,
  onOpenContactModal,
}: MobileQuickBarProps) {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 z-40 lg:hidden pointer-events-auto">
      <div className="flex items-center justify-around p-2 rounded-2xl bg-[#090E17]/95 border border-white/15 backdrop-blur-2xl shadow-2xl shadow-black/80 font-mono text-xs">
        {/* API Playground Link */}
        <button
          onClick={() => scrollTo("#api-playground")}
          className="group flex flex-col items-center gap-1 p-2 rounded-xl text-slate-300 hover:text-emerald-400 active:scale-95 transition-all min-h-[44px] justify-center cursor-pointer"
        >
          <div className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-125 group-active:scale-95">
            <Terminal className="w-4 h-4 text-emerald-400 transition-colors" />
          </div>
          <span className="text-[10px] group-hover:text-emerald-300 transition-colors">{lang === "fa" ? "تست API" : "API"}</span>
        </button>

        {/* CV Modal Trigger */}
        <button
          onClick={onOpenCvModal}
          className="group flex flex-col items-center gap-1 p-2 rounded-xl text-slate-300 hover:text-emerald-400 active:scale-95 transition-all min-h-[44px] justify-center cursor-pointer"
        >
          <div className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-125 group-active:scale-95">
            <Download className="w-4 h-4 text-cyan-400 transition-colors" />
          </div>
          <span className="text-[10px] group-hover:text-cyan-300 transition-colors">{lang === "fa" ? "رزومه" : "CV"}</span>
        </button>

        {/* Contact Modal Trigger with Pulse Indicator */}
        <button
          onClick={onOpenContactModal || (() => scrollTo("#contact"))}
          className="group flex flex-col items-center gap-1 p-2 rounded-xl text-slate-300 hover:text-emerald-400 active:scale-95 transition-all min-h-[44px] justify-center relative cursor-pointer"
        >
          <span className="relative flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-125 group-active:scale-95">
            <Mail className="w-4 h-4 text-emerald-400 transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            </span>
          </span>
          <span className="text-[10px] group-hover:text-emerald-300 transition-colors">{lang === "fa" ? "همکاری" : "Contact"}</span>
        </button>

        {/* Language Toggle */}
        <button
          onClick={onToggleLang}
          className="group flex flex-col items-center gap-1 p-2 rounded-xl text-slate-300 hover:text-emerald-400 active:scale-95 transition-all min-h-[44px] justify-center cursor-pointer"
        >
          <div className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-125 group-active:scale-95">
            <Globe className="w-4 h-4 text-emerald-400 transition-colors" />
          </div>
          <span className="text-[10px] font-bold group-hover:text-emerald-300 transition-colors">{lang === "fa" ? "EN" : "فا"}</span>
        </button>
      </div>
    </div>
  );
}
