import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import ApiPlayground from "./components/ApiPlayground";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ArchitectureDiagram from "./components/ArchitectureDiagram";
import Footer from "./components/Footer";
import CvModal from "./components/CvModal";
import MobileQuickBar from "./components/MobileQuickBar";
import { ToastProvider } from "./components/Toast";

export default function App() {
  const [lang, setLang] = useState<"en" | "fa">(() => {
    try {
      const saved = localStorage.getItem("preferred_lang");
      return saved === "fa" || saved === "en" ? saved : "en";
    } catch {
      return "en";
    }
  });

  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleToggleLang = () => {
    setLang((prev) => {
      const next = prev === "en" ? "fa" : "en";
      try {
        localStorage.setItem("preferred_lang", next);
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
          <ApiPlayground lang={lang} />
          <Experience lang={lang} />
          <Projects lang={lang} />
          <ArchitectureDiagram lang={lang} />
          <Footer lang={lang} onOpenCvModal={() => setCvModalOpen(true)} />
        </main>

        {/* Mobile Floating Thumb Quick Navigation */}
        <MobileQuickBar
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenCvModal={() => setCvModalOpen(true)}
        />

        {/* CV PDF Viewer Modal */}
        <CvModal
          isOpen={cvModalOpen}
          onClose={() => setCvModalOpen(false)}
          lang={lang}
        />
      </div>
    </ToastProvider>
  );
}
