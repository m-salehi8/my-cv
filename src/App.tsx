import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import MobileQuickBar from "./components/MobileQuickBar";
import SeoHead from "./components/SeoHead";
import { ToastProvider } from "./components/Toast";
import { ArrowUp } from "lucide-react";
import { useRootScrollProgress } from "./lib/scroll";
import { Lang, SEO } from "./data/seo";

const CvModal = React.lazy(() => import("./components/CvModal"));

export default function App({ initialLang = "fa" }: { initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useRootScrollProgress();

  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // If loaded with a hash (e.g. #projects), scroll to target
        const checkTarget = () => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        };
        setTimeout(checkTarget, 100);
        setTimeout(checkTarget, 500);
      } else {
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
      }
    }

    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleLang = () => {
    const next: Lang = lang === "en" ? "fa" : "en";
    setLang(next);
    // Each language has its own URL (`/` and `/en/`), matching the prerendered pages.
    window.history.replaceState({}, "", SEO[next].path + window.location.hash);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <ToastProvider>
      <SeoHead lang={lang} />
      <div
        className={`min-h-screen bg-[#0A0E17] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden w-full relative ${
          lang === "fa" ? "font-vazirmatn" : ""
        }`}
        dir={lang === "fa" ? "rtl" : "ltr"}
      >
        {/* Top Navbar */}
        <Navbar
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenCvModal={() => setCvModalOpen(true)}
        />

        {/* Main Sections */}
        <main className="pb-28 lg:pb-0">
          <Hero lang={lang} onOpenCvModal={() => setCvModalOpen(true)} />
          <About lang={lang} />
          <Skills lang={lang} />
          <Experience lang={lang} />
          <Projects lang={lang} />
          <Footer lang={lang} onOpenCvModal={() => setCvModalOpen(true)} />
        </main>

        {/* Mobile Floating Thumb Quick Navigation */}
        <MobileQuickBar
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenCvModal={() => setCvModalOpen(true)}
        />

        {/* Lazy-loaded Modals */}
        <React.Suspense fallback={null}>
          {cvModalOpen && (
            <CvModal
              isOpen={cvModalOpen}
              onClose={() => setCvModalOpen(false)}
              lang={lang}
            />
          )}
        </React.Suspense>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={lang === "fa" ? "بازگشت به بالا" : "Back to top"}
            className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-40 h-11 w-11 rounded-xl border border-emerald-500/30 bg-[#0B111D]/90 backdrop-blur-xl text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400/60 transition-all shadow-lg shadow-black/50 flex items-center justify-center animate-in fade-in zoom-in-95 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </ToastProvider>
  );
}
