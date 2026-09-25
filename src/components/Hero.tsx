import React, { useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { PROFILE, SOCIALS } from "../data/resume";
import Terminal from "./Terminal";
import TerminalTyping from "./TerminalTyping";
import Canvas3DScene from "./Canvas3DScene";
import TiltCard from "./TiltCard";
import { Download, Mail, Linkedin, Github, Send, Check, Copy } from "lucide-react";

interface HeroProps {
  lang: "en" | "fa";
  onOpenCvModal: () => void;
}

export default function Hero({ lang, onOpenCvModal }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 700], [0, 160]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.15]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });

  const orbX = useTransform(smx, [-0.5, 0.5], [45, -45]);
  const orbY = useTransform(smy, [-0.5, 0.5], [28, -28]);
  const gridX = useTransform(smx, [-0.5, 0.5], [12, -12]);
  const gridY = useTransform(smy, [-0.5, 0.5], [8, -8]);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      onMouseMove={handleMouse}
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 pb-16 lg:py-32"
    >
      {/* Background Interactive Grid */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="hero-grid absolute -inset-8 pointer-events-none opacity-40"
      />

      {/* Atmospheric Glowing Orbs */}
      <motion.div
        style={{ y: glowY, opacity: fade }}
        className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none"
      />
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none"
      />

      {/* Floating Technology Pills in Background (from screenshot: FastAPI, Docker, RabbitMQ) */}
      <div className="hidden lg:block absolute right-10 top-28 pointer-events-none">
        <span className="px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 font-mono text-xs">
          FastAPI
        </span>
      </div>
      <div className="hidden lg:block absolute left-8 top-1/2 pointer-events-none">
        <span className="px-3.5 py-1.5 rounded-full border border-slate-700/50 bg-[#0B111D]/80 text-slate-400 font-mono text-xs">
          Docker
        </span>
      </div>
      <div className="hidden lg:block absolute right-1/3 bottom-10 pointer-events-none">
        <span className="px-3.5 py-1.5 rounded-full border border-slate-700/50 bg-[#0B111D]/80 text-slate-400 font-mono text-xs">
          RabbitMQ
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Bio & Title */}
        <div className="lg:col-span-7">
          {/* Status Badge: ● AVAILABLE FOR OPPORTUNITIES */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-emerald-400 font-medium">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* Heading: MOHAMMADREZA SALEHI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="font-display font-black tracking-tight text-4xl sm:text-6xl lg:text-7xl leading-[1.05]">
              <span className="text-white block">MOHAMMADREZA</span>
              <span className="text-emerald-400 block mt-0.5 sm:mt-1">SALEHI</span>
            </h1>

            {/* Terminal Typing Subtitle: $ MICROSERVICES & ASYNC PIPELINES */}
            <div className="mt-4 sm:mt-5 flex items-center">
              <TerminalTyping
                prefix="$"
                phrases={[
                  "MICROSERVICES & ASYNC PIPELINES",
                  "PYTHON · FASTAPI · DJANGO · POSTGRES",
                  "HIGH-THROUGHPUT WEB SCRAPING & LLM AGENTS",
                ]}
                className="text-xs sm:text-sm text-slate-300 font-mono tracking-wider sm:tracking-widest uppercase break-words"
              />
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 sm:mt-6 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal"
          >
            Dynamic Backend Developer with 4+ years of experience engineering scalable microservices, RESTful APIs, and asynchronous data pipelines. Highly skilled in Python (FastAPI, Django) and modern data engineering, with proven expertise in building complex automated scraping architectures, ERP portals, and workflow orchestration systems.
          </motion.p>

          {/* Action Buttons (Download Resume + Email copy + Socials) matching screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-7 sm:mt-8 flex flex-col gap-4 sm:gap-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              {/* Solid Green Download Resume button */}
              <a
                href={PROFILE.resumeUrl}
                download="Mohammadreza_Salehi_CV.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 px-5 py-3 font-mono text-xs sm:text-sm font-semibold text-slate-950 transition-all shadow-lg shadow-emerald-500/10 active:scale-95 w-full sm:w-auto text-center"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download Resume</span>
              </a>

              {/* Email Pill Button with copy */}
              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center sm:justify-start gap-2 rounded-xl border border-white/10 bg-[#0E1524]/80 px-4 py-3 font-mono text-xs sm:text-sm text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-white/5 transition-all w-full sm:w-auto max-w-full overflow-hidden"
                title="Click to copy email"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{PROFILE.email}</span>
                {copied && (
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 ml-1 shrink-0">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                )}
              </button>
            </div>

            {/* Social Icons row (LinkedIn, GitHub, Telegram) */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {soc.id === "linkedin" && <Linkedin className="w-4 h-4" />}
                  {soc.id === "github" && <Github className="w-4 h-4" />}
                  {soc.id === "telegram" && <Send className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Terminal matching screenshot */}
        <div className="lg:col-span-5 relative">
          {/* Subtle 3D particle lattice behind terminal */}
          <Canvas3DScene className="absolute -top-16 -left-12 w-[130%] h-[130%] opacity-40 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <TiltCard max={8}>
              <Terminal />
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
