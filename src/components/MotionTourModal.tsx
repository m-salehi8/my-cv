import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Play,
  RotateCcw,
  Download,
  AlertCircle,
  Film,
  Monitor,
  Smartphone,
  Cpu,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface MotionTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "fa";
}

interface TourPreset {
  id: string;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
  prompt: string;
}

const PRESETS: TourPreset[] = [
  {
    id: "full-portfolio",
    titleEn: "Full Portfolio & Distributed Microservices",
    titleFa: "معرفی جامع معماری بک‌اند و میکروسرویس‌ها",
    descEn: "Cinematic 3D motion graphics showcasing FastAPI nodes, RabbitMQ broker, and PostgreSQL replica.",
    descFa: "موشن‌گرافی سه‌بعدی سینمایی شامل نودهای FastAPI، صف پیام RabbitMQ و پایگاه داده همگام.",
    prompt:
      "Cinematic futuristic 3D motion graphics tour of Mohammadreza Salehi backend developer portfolio, showcasing glowing distributed Python FastAPI microservices, RabbitMQ message queues, PostgreSQL databases, high-speed cybernetic data stream, elegant emerald green and cyan neon lighting on dark sleek background, ultra high definition 3D animation.",
  },
  {
    id: "data-pipeline",
    titleEn: "500K+ Data Pipeline & Scraping Engine",
    titleFa: "خطوط استخراج خودکار و مهندسی داده ۵۰۰K+",
    descEn: "High-speed cybernetic data streams, distributed worker nodes, and automated ETL pipelines.",
    descFa: "جریان داده‌های دیجیتال سایبرنتیک، نودهای توزیع‌شده استخراج خودکار و خطوط تبدیل داده حجیم.",
    prompt:
      "High-speed cybernetic motion graphics tour visualizing an automated big data web scraping engine, glowing matrices, distributed Python worker nodes crawling over 500,000 records, dynamic network graphs, emerald and cyan neon particle flow, dark high-tech interface.",
  },
  {
    id: "concurrency",
    titleEn: "High-Concurrency Async Event Engine",
    titleFa: "موتور پردازش همزمان و مدیریت بارهای سنگین",
    descEn: "Python asyncio event loop, Redis cache layers, sub-25ms response latency visualization.",
    descFa: "حلقه رویداد همزمان پایتون، لایه کش ردیس و تله‌متری پاسخ‌دهی زیر ۲۵ میلی‌ثانیه.",
    prompt:
      "Futuristic abstract motion graphics of an asynchronous high-concurrency backend event loop, pulsating digital core, glowing circuit lines, Redis cache acceleration, sub-25ms packet routing, sleek dark obsidian and glowing emerald neon style.",
  },
];

export default function MotionTourModal({ isOpen, onClose, lang }: MotionTourModalProps) {
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("full-portfolio");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Generation state
  const [status, setStatus] = useState<"idle" | "starting" | "polling" | "downloading" | "ready" | "error">("idle");
  const [operationName, setOperationName] = useState<string>("");
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>("");
  const [pollCount, setPollCount] = useState<number>(0);
  const [showInteractiveDemo, setShowInteractiveDemo] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Clean up blob URL on unmount or reset
  useEffect(() => {
    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
    };
  }, [videoBlobUrl]);

  // Interactive Canvas Motion Demo animation when triggered or in fallback
  useEffect(() => {
    if (!isOpen || (!showInteractiveDemo && status !== "ready")) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 640);
    let height = (canvas.height = aspectRatio === "16:9" ? (width * 9) / 16 : (width * 16) / 9);

    let t = 0;
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1.5,
      color: Math.random() > 0.4 ? "#10B981" : "#06B6D4",
    }));

    const render = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(7, 11, 20, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Central core node
      const cx = width / 2;
      const cy = height / 2;
      const pulse = Math.sin(t * 3) * 15 + 40;

      // Concentric rings
      ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse * 2.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, pulse * 1.4, 0, Math.PI * 2);
      ctx.stroke();

      // Node core
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulse * 0.8);
      grad.addColorStop(0, "#10B981");
      grad.addColorStop(0.5, "#06B6D4");
      grad.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Connecting data paths
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.lineWidth = 1;
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect to center if close
        const dist = Math.hypot(p.x - cx, p.y - cy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(cx, cy);
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.35 * (1 - dist / 180)})`;
          ctx.stroke();
        }
      });

      // Digital telemetry text
      ctx.font = "12px monospace";
      ctx.fillStyle = "#10B981";
      ctx.fillText(`VEO-3.1 MOTION STREAM // 60FPS // ASYNC CORE`, 20, 30);
      ctx.fillStyle = "#94A3B8";
      ctx.fillText(`FRAME: ${Math.floor(t * 60)} | NODES: ACTIVE | LATENCY: 18ms`, 20, 50);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, showInteractiveDemo, status, aspectRatio]);

  // Handle generation start
  const handleStartGeneration = async () => {
    try {
      setStatus("starting");
      setErrorMessage(null);
      setProgressMessage(
        lang === "fa"
          ? "در حال ارسال درخواست به مدل ویدیوساز گوگل Veo 3.1 Fast..."
          : "Sending generation request to Google Veo 3.1 Fast engine..."
      );

      const promptToSend = isCustom && customPrompt.trim()
        ? customPrompt.trim()
        : PRESETS.find((p) => p.id === selectedPresetId)?.prompt || PRESETS[0].prompt;

      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptToSend,
          aspectRatio: aspectRatio,
          resolution: "720p",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.operationName) {
        throw new Error(data.error || "Failed to start Veo 3 video generation");
      }

      setOperationName(data.operationName);
      setStatus("polling");
      setPollCount(0);
      startPolling(data.operationName);
    } catch (err: any) {
      console.error("Veo video generation error:", err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to initiate video generation");
    }
  };

  // Poll video status
  const startPolling = async (opName: string) => {
    let count = 0;
    const interval = setInterval(async () => {
      count++;
      setPollCount(count);

      // Dynamic informative messages
      if (count === 1) {
        setProgressMessage(
          lang === "fa"
            ? "عملیات ویدیو در سرورهای ابری گوگل آغاز شد..."
            : "Operation created on Google Cloud Veo engine..."
        );
      } else if (count === 3) {
        setProgressMessage(
          lang === "fa"
            ? "در حال رندر وکتورهای موشن‌گرافی و نورپردازی سایبرنتیک..."
            : "Synthesizing motion graphics vectors and cybernetic lighting..."
        );
      } else if (count === 6) {
        setProgressMessage(
          lang === "fa"
            ? "پردازش فریم‌های گرافیکی و پیوند نودهای مایکروسرویس..."
            : "Processing high-framerate sequence & microservice nodes..."
        );
      } else if (count > 10) {
        setProgressMessage(
          lang === "fa"
            ? "نهایی‌سازی فشرده‌سازی فریم‌ها و آماده‌سازی خروجی MP4..."
            : "Finalizing MP4 video encoding and preparing download..."
        );
      }

      try {
        const pollRes = await fetch("/api/video-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ operationName: opName }),
        });

        const pollData = await pollRes.json();

        if (pollData.error) {
          clearInterval(interval);
          throw new Error(pollData.error.message || "Video generation encountered an error");
        }

        if (pollData.done) {
          clearInterval(interval);
          downloadVideo(opName);
        }
      } catch (pollErr: any) {
        clearInterval(interval);
        console.error("Polling error:", pollErr);
        setStatus("error");
        setErrorMessage(pollErr.message || "Error while polling video generation status");
      }
    }, 6000);
  };

  // Download finished video
  const downloadVideo = async (opName: string) => {
    try {
      setStatus("downloading");
      setProgressMessage(
        lang === "fa"
          ? "ویدیو آماده شد! در حال دریافت استریم فایل MP4..."
          : "Video ready! Streaming MP4 video buffer to client..."
      );

      const dlRes = await fetch("/api/video-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operationName: opName }),
      });

      if (!dlRes.ok) {
        const errData = await dlRes.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to download video file");
      }

      const blob = await dlRes.blob();
      const url = URL.createObjectURL(blob);
      setVideoBlobUrl(url);
      setStatus("ready");
    } catch (dlErr: any) {
      console.error("Download error:", dlErr);
      setStatus("error");
      setErrorMessage(dlErr.message || "Failed to download generated video");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl rounded-2xl border border-emerald-500/30 bg-[#0B111E] shadow-2xl shadow-emerald-500/10 overflow-hidden flex flex-col my-auto max-h-[92vh]"
          dir={lang === "fa" ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#080D18]/90 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>GOOGLE VEO 3.1 FAST ENGINE</span>
                </div>
                <h2 className="text-sm sm:text-base font-display font-bold text-white">
                  {lang === "fa" ? "تور موشن‌گرافی ویدیویی معرفی پروژه" : "AI Motion Graphics Tour Generator"}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-2">
                {lang === "fa" ? "نسبت ابعاد ویدیو (Aspect Ratio):" : "Video Aspect Ratio:"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAspectRatio("16:9")}
                  disabled={status === "starting" || status === "polling" || status === "downloading"}
                  className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
                    aspectRatio === "16:9"
                      ? "border-emerald-400 bg-emerald-500/15 text-emerald-300 shadow-sm shadow-emerald-500/20"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="font-semibold">16:9 Landscape</span>
                  <span className="text-[10px] text-slate-400">({lang === "fa" ? "افقی / دسکتاپ" : "Showcase"})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio("9:16")}
                  disabled={status === "starting" || status === "polling" || status === "downloading"}
                  className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
                    aspectRatio === "9:16"
                      ? "border-emerald-400 bg-emerald-500/15 text-emerald-300 shadow-sm shadow-emerald-500/20"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="font-semibold">9:16 Portrait</span>
                  <span className="text-[10px] text-slate-400">({lang === "fa" ? "عمودی / موبایل" : "Story / Reel"})</span>
                </button>
              </div>
            </div>

            {/* Presets vs Custom */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-medium text-slate-300">
                  {lang === "fa" ? "موضوع و سبک موشن‌گرافی:" : "Tour Theme & Style Prompt:"}
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustom(!isCustom)}
                  className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                >
                  {isCustom
                    ? lang === "fa"
                      ? "← انتخاب از قالب‌های آماده"
                      : "← Use Predefined Presets"
                    : lang === "fa"
                    ? "+ پرامپت سفارشی"
                    : "+ Custom Prompt"}
                </button>
              </div>

              {!isCustom ? (
                <div className="space-y-2.5">
                  {PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => setSelectedPresetId(preset.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "border-emerald-400/80 bg-emerald-950/30 text-white shadow-sm shadow-emerald-500/10"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs sm:text-sm text-emerald-300">
                            {lang === "fa" ? preset.titleFa : preset.titleEn}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                            VEO 3.1
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                          {lang === "fa" ? preset.descFa : preset.descEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <textarea
                    rows={3}
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder={
                      lang === "fa"
                        ? "توصیف موشن‌گرافی مورد نظر را وارد کنید (مثال: تور ویدیویی سه‌بعدی از نودهای پایتون با افکت‌های نئونی سبز و سایان)..."
                        : "Describe the motion graphics tour you want Veo 3 to synthesize (e.g. 3D holographic backend server cluster with glowing data lines)..."
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#070B14] p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              )}
            </div>

            {/* Video Player Display (When Ready) */}
            {status === "ready" && videoBlobUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    {lang === "fa" ? "ویدیو موشن‌گرافی آماده پخش است" : "Motion graphics video ready for playback"}
                  </span>
                  <a
                    href={videoBlobUrl}
                    download="portfolio-veo3-motion-tour.mp4"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {lang === "fa" ? "دانلود MP4" : "Download MP4"}
                  </a>
                </div>

                <div className="flex items-center justify-center bg-black/60 rounded-xl overflow-hidden border border-white/10">
                  <video
                    controls
                    autoPlay
                    loop
                    playsInline
                    className={`rounded-xl object-contain max-h-[380px] w-full ${
                      aspectRatio === "9:16" ? "max-w-[260px]" : "w-full"
                    }`}
                    src={videoBlobUrl}
                  />
                </div>
              </motion.div>
            )}

            {/* Progress / Status feedback */}
            {(status === "starting" || status === "polling" || status === "downloading") && (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-[#070B14] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <span className="animate-spin h-3.5 w-3.5 border-2 border-emerald-400 border-t-transparent rounded-full" />
                    {lang === "fa" ? "در حال تولید ویدیو با هوش مصنوعی..." : "Synthesizing Video with Veo 3..."}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {pollCount > 0 ? `${lang === "fa" ? "ثانیه" : "Elapsed"}: ~${pollCount * 6}s` : ""}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-mono leading-relaxed">{progressMessage}</p>

                {/* Progress bar animation */}
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-400 animate-pulse w-full rounded-full" />
                </div>
              </div>
            )}

            {/* Error or Quota handling */}
            {status === "error" && (
              <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 text-xs text-slate-300 space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-amber-300">
                      {errorMessage?.includes("429") || errorMessage?.includes("quota") || errorMessage?.includes("RESOURCE_EXHAUSTED")
                        ? lang === "fa"
                          ? "سقف سهمیه کلید رایگان هوش مصنوعی تکمیل است (نیاز به اکانت پرمیوم / کلید اختصاصی Google Cloud)"
                          : "Free quota limit reached for Veo 3 model (Requires paid project or Google Cloud key)"
                        : lang === "fa"
                        ? "خطا در برقراری ارتباط با مدل ویدیو:"
                        : "Video generation error:"}
                    </span>
                    <p className="text-slate-400 font-mono text-[11px] leading-relaxed">
                      {errorMessage}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setShowInteractiveDemo(!showInteractiveDemo)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    {lang === "fa" ? "مشاهده موشن‌گرافی تعاملی کلاینت" : "View Live Interactive Motion Tour"}
                  </button>
                  <button
                    type="button"
                    onClick={handleStartGeneration}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {lang === "fa" ? "تلاش مجدد" : "Retry"}
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Live Motion Canvas Tour (Always available / Fallback view) */}
            {(showInteractiveDemo || status === "idle") && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{lang === "fa" ? "پیش‌نمایش زنده موشن‌گرافی معماری:" : "Live Architectural Motion Tour Canvas:"}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">60 FPS VECTOR ENGINE</span>
                </div>
                <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#070B14]">
                  <canvas ref={canvasRef} className="w-full h-auto block" />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-slate-400">
                    MOHAMMADREZA SALEHI // BACKEND TOUR
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/10 bg-[#080D18]/90 shrink-0">
            <div className="text-[11px] font-mono text-slate-400">
              <span>{lang === "fa" ? "مدل:" : "Model:"} veo-3.1-fast-generate-preview</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                {lang === "fa" ? "بستن" : "Close"}
              </button>

              <button
                type="button"
                onClick={handleStartGeneration}
                disabled={status === "starting" || status === "polling" || status === "downloading"}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 px-5 py-2.5 font-mono text-xs font-semibold text-slate-950 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  {status === "starting" || status === "polling" || status === "downloading"
                    ? lang === "fa"
                      ? "در حال پردازش..."
                      : "Generating..."
                    : lang === "fa"
                    ? "تولید ویدیو با Veo 3"
                    : "Generate with Veo 3"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
