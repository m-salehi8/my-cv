import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { PROFILE } from "../data/resume";
import { Download, Globe, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  lang: "en" | "fa";
  onToggleLang: () => void;
  onOpenCvModal: () => void;
}

export default function Navbar({ lang, onToggleLang, onOpenCvModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
        scrolled
          ? "bg-[#0A0E17]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/40"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Scroll indicator line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left"
        style={{ scaleX: progress }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Terminal prompt */}
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm text-slate-200 hover:text-emerald-400 transition-colors flex items-center gap-2 group min-h-[44px]"
        >
          <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform font-bold">
            ➜
          </span>
          <span className="font-semibold text-slate-100 tracking-wide">~/salehi</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.index}
              onClick={() => handleNavClick(link.href)}
              className="font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions: Language Switcher + CV Modal Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={onToggleLang}
            data-testid="lang-toggle-btn"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 font-mono text-xs text-slate-300 hover:text-emerald-300 transition-colors min-h-[40px]"
            title={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold">{lang === "fa" ? "EN" : "فا"}</span>
          </button>

          <button
            onClick={onOpenCvModal}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-3.5 py-2 font-mono text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all shadow-sm min-h-[40px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV.pdf</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white bg-white/5 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 font-mono text-sm">
            {navLinks.map((link) => (
              <button
                key={link.index}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between py-2.5 text-slate-300 hover:text-emerald-400 border-b border-white/5 text-left"
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
