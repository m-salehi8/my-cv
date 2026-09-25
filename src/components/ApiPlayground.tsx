import React, { useState } from "react";
import { PROFILE, SKILLS, PROJECTS } from "../data/resume";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Play, Copy, Check, Terminal, Clock, Server, Send, ArrowRight } from "lucide-react";

interface ApiPlaygroundProps {
  lang: "en" | "fa";
}

interface Endpoint {
  method: "GET" | "POST";
  path: string;
  summary: string;
  summaryFa: string;
  category: string;
  requestBody?: Record<string, any>;
  response: (body?: any) => Record<string, any>;
}

export default function ApiPlayground({ lang }: ApiPlaygroundProps) {
  const endpoints: Endpoint[] = [
    {
      method: "GET",
      path: "/api/v1/profile",
      summary: "Retrieve verified developer profile and availability",
      summaryFa: "دریافت پروفایل اعتبارسنجی شده و وضعیت آمادگی برای کار",
      category: "core",
      response: () => ({
        status: 200,
        developer: {
          fullName: PROFILE.fullName,
          role: PROFILE.role,
          experience: "4+ years",
          primaryStack: ["Python 3.12", "FastAPI", "PostgreSQL", "Docker", "RabbitMQ"],
          availability: "Available for Full-time / Remote / Contract",
          relocation: "Istanbul, Remote Worldwide, or Hybrid",
          contact: {
            email: PROFILE.email,
            phone: PROFILE.phone,
          },
        },
        meta: {
          runtime: "FastAPI / Uvicorn (ASGI)",
          protocol: "HTTP/2",
        },
      }),
    },
    {
      method: "GET",
      path: "/api/v1/system/health",
      summary: "Inspect microservices cluster status, cache hit ratio & queues",
      summaryFa: "پایش وضعیت کلاستر میکروسرویس‌ها، نرخ کش ریدیس و صف پیام‌ها",
      category: "telemetry",
      response: () => ({
        status: "healthy",
        uptime: "99.98%",
        services: {
          gateway: { status: "online", latencyMs: 3 },
          api_service: { framework: "FastAPI", workers: 4, asyncEventLoop: "uvloop" },
          database: { engine: "PostgreSQL 16", pool: "20/20 active connections", status: "healthy" },
          cache: { engine: "Redis 7.2", hitRate: "94.6%", memoryUsed: "48.2MB" },
          message_queue: { broker: "RabbitMQ", pendingJobs: 0, acknowledgedSec: 1420 },
        },
        timestamp: new Date().toISOString(),
      }),
    },
    {
      method: "GET",
      path: "/api/v1/skills?category=backend",
      summary: "Fetch technical competencies with production readiness scores",
      summaryFa: "دریافت ماتریس مهارت‌های فنی به همراه وضعیت محیط پروداکشن",
      category: "skills",
      response: () => ({
        status: 200,
        category: "Backend & Data Engineering",
        technologies: SKILLS.map((s) => ({
          domain: s.title,
          stack: s.items,
          testedInProduction: true,
        })),
        totalItems: SKILLS.reduce((acc, curr) => acc + curr.items.length, 0),
      }),
    },
    {
      method: "GET",
      path: "/api/v1/projects?featured=true",
      summary: "List deployed enterprise & freelance architecture case studies",
      summaryFa: "فهرست پروژه‌ها و مطالعات موردی معماری پروداکشن",
      category: "projects",
      response: () => ({
        status: 200,
        count: PROJECTS.length,
        projects: PROJECTS.map((p) => ({
          id: p.index,
          name: p.title,
          role: p.role,
          period: p.period,
          architectureTags: p.tags,
          liveUrl: p.url || null,
        })),
      }),
    },
    {
      method: "POST",
      path: "/api/v1/contact/inquiry",
      summary: "Send validation test payload or direct hiring inquiry",
      summaryFa: "ارسال درخواست بررسی مستقیم یا دعوت به همکاری",
      category: "inquiry",
      requestBody: {
        recruiterName: "Tech Lead / HR",
        company: "Global Tech",
        roleOffered: "Senior Backend Developer",
        preferredStack: "FastAPI + Microservices",
        message: "We loved your profile and would like to arrange an interview.",
      },
      response: (body) => ({
        status: 201,
        message: "Inquiry validated and queued successfully for Mohammadreza.",
        referenceId: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
        dataReceived: body,
        deliveryReceipt: {
          dispatchedTo: PROFILE.email,
          channel: "FastAPI Webhook -> Email Pipeline",
          deliveredAt: new Date().toISOString(),
        },
      }),
    },
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [requestBodyText, setRequestBodyText] = useState(
    JSON.stringify(endpoints[4].requestBody, null, 2)
  );
  const [responseOutput, setResponseOutput] = useState<any>(endpoints[0].response());
  const [latency, setLatency] = useState<number>(14);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const activeEp = endpoints[selectedIdx];

  const handleSelectEndpoint = (index: number) => {
    setSelectedIdx(index);
    const ep = endpoints[index];
    if (ep.method === "POST" && ep.requestBody) {
      setRequestBodyText(JSON.stringify(ep.requestBody, null, 2));
    }
    // Auto execute to show output immediately
    executeRequest(index);
  };

  const executeRequest = (epIdx = selectedIdx) => {
    setLoading(true);
    const target = endpoints[epIdx];

    // Simulated network roundtrip with realistic FastAPI speed (10-35ms)
    const simulatedLatency = Math.floor(Math.random() * 20) + 12;

    setTimeout(() => {
      let bodyData;
      if (target.method === "POST") {
        try {
          bodyData = JSON.parse(requestBodyText);
        } catch {
          bodyData = target.requestBody;
        }
      }
      setResponseOutput(target.response(bodyData));
      setLatency(simulatedLatency);
      setLoading(false);
    }, 180);
  };

  const curlCommand = `curl -X ${activeEp.method} "https://salehi.dev${activeEp.path}" \\
  -H "Accept: application/json"${
    activeEp.method === "POST"
      ? ` \\\n  -H "Content-Type: application/json" \\\n  -d '${requestBodyText.replace(/\n/g, "")}'`
      : ""
  }`;

  const copyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <section id="api-playground" data-testid="api-playground-section" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow={lang === "fa" ? "شبیه‌ساز وب‌سرویس" : "Interactive API Explorer"}
          title={lang === "fa" ? "تست زنده اندپوینت‌های FastAPI" : "Live FastAPI REST Simulator"}
          testid="api-playground-heading"
        />

        <Reveal delay={0.1}>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mb-8 leading-relaxed">
            {lang === "fa"
              ? "به عنوان مهندس باک‌اند، تمامی داده‌های این رزومه از طریق قراردادهای تمیز RESTful و مدل‌های Pydantic ساختاریافته در دسترس هستند. روی هر اندپوینت کلیک کرده یا درخواست POST ارسال کنید تا پاسخ سریع سرور را بررسی نمایید."
              : "Experience the backend architecture firsthand. As a FastAPI specialist, all portfolio metrics, services, and inquiry pipelines are exposed through high-performance RESTful endpoints with sub-25ms response latencies."}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-white/10 bg-[#0B111D]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#080D15]/80">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                <span className="font-mono text-xs text-slate-400 ml-2 hidden sm:inline">
                  FastAPI OpenAPI Docs v1.4.2 · Uvicorn Worker (ASGI)
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>200 OK</span>
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="tabular-nums">{latency}ms</span>
                </span>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Endpoint Selector Tabs */}
              <div className="lg:col-span-5 p-3 sm:p-5 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#090E17]/40 space-y-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 px-2 py-1">
                  {lang === "fa" ? "انتخاب اندپوینت" : "Available Endpoints"}
                </div>

                <div className="space-y-1.5">
                  {endpoints.map((ep, idx) => {
                    const isSelected = selectedIdx === idx;
                    return (
                      <button
                        key={ep.path}
                        onClick={() => handleSelectEndpoint(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-500/50 shadow-md shadow-emerald-950/40"
                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/10 text-slate-300"
                        }`}
                      >
                        <span
                          className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                            ep.method === "GET"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          }`}
                        >
                          {ep.method}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div
                            className={`font-mono text-xs sm:text-sm truncate ${
                              isSelected ? "text-white font-semibold" : "text-slate-300"
                            }`}
                          >
                            {ep.path}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">
                            {lang === "fa" ? ep.summaryFa : ep.summary}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* cURL Command preview box */}
                <div className="mt-5 p-3 rounded-xl border border-white/10 bg-slate-950/60 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>cURL Command</span>
                    </span>
                    <button
                      onClick={copyCurl}
                      className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-[11px]"
                    >
                      {copiedCurl ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-slate-300 overflow-x-auto p-2 bg-[#0A0E17] rounded-lg text-[11px] leading-relaxed scrollbar-thin">
                    {curlCommand}
                  </pre>
                </div>
              </div>

              {/* Right Column: Request Runner & Response Viewer */}
              <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-4">
                {/* Endpoint Header Bar with Execute button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded ${
                        activeEp.method === "GET"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      }`}
                    >
                      {activeEp.method}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-white font-semibold">
                      {activeEp.path}
                    </span>
                  </div>

                  <button
                    onClick={() => executeRequest()}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{loading ? "Executing..." : "Execute Request"}</span>
                  </button>
                </div>

                {/* If POST: Show Editable Request Body */}
                {activeEp.method === "POST" && (
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Request Body (JSON):
                    </label>
                    <textarea
                      value={requestBodyText}
                      onChange={(e) => setRequestBodyText(e.target.value)}
                      rows={5}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-emerald-500/60 scrollbar-thin resize-y"
                    />
                  </div>
                )}

                {/* Response Viewer */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-2">
                      <span className="text-white font-semibold">Response Payload</span>
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] border border-emerald-500/20">
                        Content-Type: application/json
                      </span>
                    </span>

                    <button
                      onClick={copyResponse}
                      className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-slate-400"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy JSON</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] rounded-xl border border-white/10 bg-[#080D15] p-3 sm:p-4 overflow-y-auto font-mono text-xs leading-relaxed text-emerald-300/90 scrollbar-thin">
                    <pre className="whitespace-pre-wrap break-words font-mono text-xs">
                      {JSON.stringify(responseOutput, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
