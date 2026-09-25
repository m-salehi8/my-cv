import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import CvModal from "./components/CvModal";

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#0A0E17] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden w-full relative"
      dir="ltr"
    >
      {/* Background subtle noise and glow */}
      <div className="noise-overlay" />

      {/* Top Navbar */}
      <Navbar
        lang="en"
        onToggleLang={() => {}}
        onOpenCvModal={() => setCvModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero lang="en" onOpenCvModal={() => setCvModalOpen(true)} />
        <Marquee />
        <About lang="en" />
        <Skills lang="en" />
        <Experience lang="en" />
        <Projects lang="en" />
        <Footer lang="en" onOpenCvModal={() => setCvModalOpen(true)} />
      </main>

      {/* CV PDF Viewer Modal */}
      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        lang="en"
      />
    </div>
  );
}
