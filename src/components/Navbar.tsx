import React, { useState, useEffect } from "react";
import { Download, Globe, Menu, X, Film } from "lucide-react";

interface NavbarProps {
  lang: "en" | "fa";
  onToggleLang: () => void;
  onOpenCvModal: () => void;
  onOpenMotionTourModal?: () => void;
}

export default function Navbar({
  lang,
  onToggleLang,
  onOpenCvModal,
  onOpenMotionTourModal,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "stack", "api-playground", "experience", "projects", "architecture", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#about", index: "01", label: lang === "fa" ? "درباره من" : "About" },
    { href: "#stack", index: "02", label: lang === "fa" ? "مهارت‌ها" : "Stack" },
    { href: "#api-playground", index: "03", label: lang === "fa" ? "تست API" : "API Docs" },
    { href: "#experience", index: "04", label: lang === "fa" ? "سوابق کاری" : "Experience" },
    { href: "#projects", index: "05", label: lang === "fa" ? "پروژه‌ها" : "Projects" },
    { href: "#architecture", index: "06", label: lang === "fa" ? "معماری" : "Architecture" },
    { href: "#contact", index: "07", label: lang === "fa" ? "تماس" : "Contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300"
    >
      {/* Scroll indicator line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left transition-transform duration-100 ease-out"
        style={{ transform: "scaleX(var(--scroll, 0))" }}
      />

      <div
        className={`pointer-events-auto max-w-6xl mx-auto h-14 sm:h-16 rounded-2xl border transition-all duration-300 px-3.5 sm:px-6 flex items-center justify-between shadow-2xl backdrop-blur-2xl ${
          scrolled
            ? "bg-[#090E17]/95 border-emerald-500/25 shadow-black/80"
            : "bg-[#0B111D]/85 border-white/12 shadow-black/50 hover:border-white/20"
        }`}
      >
        {/* Logo / Terminal prompt */}
        <button
          data-testid="nav-logo"
          dir="ltr"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-xs sm:text-sm text-slate-200 hover:text-emerald-400 transition-all flex items-center gap-2 group min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform font-bold">
            ➜
          </span>
          <span className="font-semibold text-slate-100 tracking-wide">~/salehi</span>
        </button>

        {/* Desktop Navigation with Active Section highlighting */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-xl">
          {navLinks.map((link) => (
            <button
              key={link.index}
              onClick={() => handleNavClick(link.href)}
              className={`font-mono text-xs tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                activeSection === link.href
                  ? "text-emerald-300 bg-emerald-500/15"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions: Language Switcher + CV Modal Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Toggle Button */}
          <button
            onClick={onToggleLang}
            data-testid="lang-toggle-btn"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-2.5 sm:px-3 py-1.5 font-mono text-xs text-slate-300 hover:text-emerald-300 transition-colors min-h-[36px]"
            title={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold">{lang === "fa" ? "EN" : "فا"}</span>
          </button>

          {onOpenMotionTourModal && (
            <button
              onClick={onOpenMotionTourModal}
              className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 px-2.5 sm:px-3 py-1.5 font-mono text-xs font-semibold text-cyan-300 transition-all shadow-md shadow-cyan-500/15 active:scale-95 min-h-[36px] cursor-pointer"
              title={lang === "fa" ? "تور موشن‌گرافی ویدیویی پروژه (Veo 3)" : "AI Motion Tour (Veo 3)"}
            >
              <Film className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden md:inline">{lang === "fa" ? "موشن‌گرافی" : "Motion Tour"}</span>
            </button>
          )}

          <button
            onClick={onOpenCvModal}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 font-mono text-xs font-bold text-slate-950 transition-all shadow-md shadow-emerald-500/20 active:scale-95 min-h-[36px]"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>CV.pdf</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-white/10 text-slate-300 hover:text-white bg-white/5 focus:outline-none min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto max-w-6xl mx-auto mt-2 rounded-2xl border border-white/15 bg-[#0A0E17]/95 backdrop-blur-2xl px-5 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-1 font-mono text-sm">
            {navLinks.map((link) => (
              <button
                key={link.index}
                onClick={() => handleNavClick(link.href)}
                className={`flex items-center justify-between py-2 px-2.5 rounded-lg text-slate-300 hover:text-emerald-400 hover:bg-white/5 transition-colors ${
                  lang === "fa" ? "text-right" : "text-left"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-emerald-400 text-xs font-semibold">{link.index}</span>
              </button>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5 font-mono text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span>{lang === "fa" ? "مشاهده و دانلود رزومه PDF" : "Download Resume PDF"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
