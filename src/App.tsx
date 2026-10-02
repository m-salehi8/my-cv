import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import FloatingContactFab from "./components/FloatingContactFab";
import MobileQuickBar from "./components/MobileQuickBar";
import SeoHead from "./components/SeoHead";
import { ToastProvider } from "./components/Toast";
import { ArrowUp } from "lucide-react";
import { useRootScrollProgress } from "./lib/scroll";
import { Lang, SEO } from "./data/seo";

// Lazy-loaded heavy below-the-fold sections and modals
const ApiPlayground = React.lazy(() => import("./components/ApiPlayground"));
const ArchitectureDiagram = React.lazy(() => import("./components/ArchitectureDiagram"));
const CvModal = React.lazy(() => import("./components/CvModal"));
const ContactModal = React.lazy(() => import("./components/ContactModal"));

function SectionPlaceholder({ id, className }: { id: string; className: string }) {
  return (
    <section id={id} aria-hidden="true" className={`py-24 sm:py-32 relative flex items-center justify-center ${className}`}>
      <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
    </section>
  );
}

export default function App({ initialLang = "fa" }: { initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useRootScrollProgress();

  // Heavy demo sections load after hydration; the prerendered HTML holds a same-size placeholder.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // If loaded with a hash (e.g. #architecture, #api-playground), scroll to target
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

    // Preload below-the-fold components as user scrolls down past 200px
    let preloaded = false;
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 600);
      if (!preloaded && window.scrollY > 200) {
        preloaded = true;
        import("./components/ApiPlayground");
        import("./components/ArchitectureDiagram");
      }
    };
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
          <Marquee />
          <About lang={lang} />
          <Skills lang={lang} />
          {mounted ? (
            <React.Suspense fallback={<SectionPlaceholder id="api-playground" className="min-h-[750px]" />}>
              <ApiPlayground lang={lang} />
            </React.Suspense>
          ) : (
            <SectionPlaceholder id="api-playground" className="min-h-[750px]" />
          )}
          <Experience lang={lang} />
          <Projects lang={lang} />
          {mounted ? (
            <React.Suspense fallback={<SectionPlaceholder id="architecture" className="min-h-[850px] bg-[#090E17]/60" />}>
              <ArchitectureDiagram lang={lang} />
            </React.Suspense>
          ) : (
            <SectionPlaceholder id="architecture" className="min-h-[850px] bg-[#090E17]/60" />
          )}
          <Footer
            lang={lang}
            onOpenCvModal={() => setCvModalOpen(true)}
            onOpenContactModal={() => setContactModalOpen(true)}
          />
        </main>

        {/* Floating Action Button with 'Available for work' pulse indicator */}
        <FloatingContactFab
          lang={lang}
          onOpenContactModal={() => setContactModalOpen(true)}
        />

        {/* Mobile Floating Thumb Quick Navigation */}
        <MobileQuickBar
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenCvModal={() => setCvModalOpen(true)}
          onOpenContactModal={() => setContactModalOpen(true)}
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

          {contactModalOpen && (
            <ContactModal
              isOpen={contactModalOpen}
              onClose={() => setContactModalOpen(false)}
              lang={lang}
            />
          )}
        </React.Suspense>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={lang === "fa" ? "بازگشت به بالا" : "Back to top"}
            className={`fixed bottom-24 lg:bottom-8 ${
              lang === "fa" ? "right-4 lg:right-8" : "right-4 lg:right-8"
            } z-40 h-11 w-11 rounded-xl border border-emerald-500/30 bg-[#0B111D]/90 backdrop-blur-xl text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400/60 transition-all shadow-lg shadow-black/50 flex items-center justify-center animate-in fade-in zoom-in-95 cursor-pointer`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </ToastProvider>
  );
}
