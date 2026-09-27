import React from "react";
import { Download, Terminal, Mail, Globe, ArrowUp } from "lucide-react";

interface MobileQuickBarProps {
  lang: "en" | "fa";
  onToggleLang: () => void;
  onOpenCvModal: () => void;
}

export default function MobileQuickBar({
  lang,
  onToggleLang,
  onOpenCvModal,
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
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-slate-300 hover:text-emerald-400 active:scale-95 transition-all min-h-[44px] justify-center"
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px]">{lang === "fa" ? "تست API" : "API"}</span>
        </button>

        {/* CV Modal Trigger */}
        <button
          onClick={onOpenCvModal}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-slate-300 hover:text-emerald-400 active:scale-95 transition-all min-h-[44px] justify-center"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px]">{lang === "fa" ? "رزومه" : "CV"}</span>
        </button>

        {/* Contact Link */}
        <button
          onClick={() => scrollTo("#contact")}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-slate-300 hover:text-emerald-400 active:scale-95 transition-all min-h-[44px] justify-center"
        >
          <Mail className="w-4 h-4 text-amber-400" />
          <span className="text-[10px]">{lang === "fa" ? "تماس" : "Contact"}</span>
        </button>

        {/* Language Toggle */}
        <button
          onClick={onToggleLang}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-slate-300 hover:text-emerald-400 active:scale-95 transition-all min-h-[44px] justify-center"
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-bold">{lang === "fa" ? "EN" : "فا"}</span>
        </button>
      </div>
    </div>
  );
}
