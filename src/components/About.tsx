import React from "react";
import { PROFILE, STATS } from "../data/resume";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import SectionContainer, { SectionItem } from "./SectionContainer";
import {
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Cpu,
} from "lucide-react";

interface AboutProps {
  lang: "en" | "fa";
}

export default function About({ lang }: AboutProps) {
  return (
    <SectionContainer id="about" dataTestId="about-section" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          route="/about"
          meta={lang === "fa" ? "۴+ سال سابقه" : "4+ years in production"}
          title={lang === "fa" ? "فلسفه و رویکرد توسعه" : "Engineering philosophy"}
          testid="about-heading"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & Stats */}
          <SectionItem className="lg:col-span-7 space-y-6">
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {lang === "fa" ? PROFILE.aboutStoryFa : PROFILE.aboutStory}
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {lang === "fa" ? PROFILE.summary2Fa : PROFILE.summary2}
            </p>

            {/* Quick architectural principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-white/5 my-6">
              <div className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Fault-tolerant asynchronous job pipelines</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Enterprise-grade security & clean REST contracts</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Microservices decoupled via message brokers</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>AI Agent orchestration & token-optimized prompts</span>
              </div>
            </div>

            {/* Stats Counter Cards with Spotlight */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 items-stretch">
              {STATS.map((s, i) => (
                <SectionItem key={s.testid} index={i} className="h-full">
                  <SpotlightCard className="h-full p-4 text-center flex flex-col justify-center items-center">
                    <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-400">
                      {s.value}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-slate-400 uppercase tracking-wider leading-tight">
                      {lang === "fa" ? s.labelFa : s.label}
                    </div>
                  </SpotlightCard>
                </SectionItem>
              ))}
            </div>
          </SectionItem>

          {/* Right Column: Profile Card with Photo and Spotlight */}
          <SectionItem className="lg:col-span-5">
            <SpotlightCard className="p-3 sm:p-4">
              {/* Photo frame */}
              <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-white/10 shadow-2xl">
                <picture>
                  <source srcSet="/profile.webp" type="image/webp" />
                  <img
                    data-testid="about-profile-photo"
                    src="/profile.jpg"
                    alt={
                      lang === "fa"
                        ? "محمدرضا صالحی — توسعه‌دهنده بک‌اند پایتون و مهندس نرم‌افزار"
                        : "Mohammadreza Salehi — Senior Python Backend Developer"
                    }
                    width="760"
                    height="815"
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </picture>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-transparent opacity-85" />

                {/* Overlay info */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-[#0A0E17]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{PROFILE.location}</span>
                  </div>

                  <div className="text-white font-display font-bold text-lg leading-tight">
                    {PROFILE.fullName}
                  </div>
                  <div className="text-emerald-400 font-mono text-xs">
                    {PROFILE.role}
                  </div>
                </div>
              </div>

              {/* Contact pills below photo */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2 font-mono text-xs text-slate-300">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors"
                >
                  <span className="flex items-center gap-2 truncate text-slate-300 hover:text-emerald-300">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate">{PROFILE.email}</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">EMAIL</span>
                </a>

                <a
                  href={PROFILE.phoneHref}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{PROFILE.phone}</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">CALL</span>
                </a>
              </div>
            </SpotlightCard>
          </SectionItem>
        </div>
      </div>
    </SectionContainer>
  );
}
