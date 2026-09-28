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

// Lazy-loaded heavy below-the-fold sections and modals
const ApiPlayground = React.lazy(() => import("./components/ApiPlayground"));
const ArchitectureDiagram = React.lazy(() => import("./components/ArchitectureDiagram"));
const CvModal = React.lazy(() => import("./components/CvModal"));
const ContactModal = React.lazy(() => import("./components/ContactModal"));

// Preload helper for hover/scroll anticipation
const preloadSection = (factory: () => Promise<any>) => {
  factory();
};

export default function App() {
  const [lang, setLang] = useState<"en" | "fa">(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get("lang");
        if (urlLang === "fa" || urlLang === "en") return urlLang;
        const saved = localStorage.getItem("preferred_lang");
        if (saved === "fa" || saved === "en") return saved;
      }
    } catch {
      // ignore
    }
    return "fa";
  });

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
    setLang((prev) => {
      const next = prev === "en" ? "fa" : "en";
      try {
        localStorage.setItem("preferred_lang", next);
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("lang", next);
          window.history.replaceState({}, "", url.toString());
        }
      } catch {
        // ignore
      }
      return next;
    });
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
        {/* Background subtle noise and glow */}
        <div className="noise-overlay" />

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
          <React.Suspense
            fallback={
              <section
                id="api-playground"
                className="py-24 sm:py-32 relative min-h-[750px] flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              </section>
            }
          >
            <ApiPlayground lang={lang} />
          </React.Suspense>
          <Experience lang={lang} />
          <Projects lang={lang} />
          <React.Suspense
            fallback={
              <section
                id="architecture"
                className="py-24 sm:py-32 bg-[#090E17]/60 relative min-h-[850px] flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              </section>
            }
          >
            <ArchitectureDiagram lang={lang} />
          </React.Suspense>
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
