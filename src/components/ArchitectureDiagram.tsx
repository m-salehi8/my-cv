import React, { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Server, Database, Cpu, Layers, ShieldCheck, Activity, ArrowRight, CheckCircle2, Zap } from "lucide-react";

interface ArchitectureDiagramProps {
  lang: "en" | "fa";
}

interface ArchNode {
  id: string;
  name: string;
  nameFa: string;
  category: string;
  tag: string;
  color: "emerald" | "cyan" | "indigo" | "amber" | "fuchsia";
  description: string;
  descriptionFa: string;
  metrics: { label: string; value: string }[];
  details: string[];
  detailsFa: string[];
}

export default function ArchitectureDiagram({ lang }: ArchitectureDiagramProps) {
  const nodes: ArchNode[] = [
    {
      id: "gateway",
      name: "API Gateway & Reverse Proxy",
      nameFa: "گیت‌وی API و ریورس پروکسی",
      category: "Traffic Ingestion",
      tag: "Nginx / Traefik",
      color: "emerald",
      description:
        "High-performance edge router handling SSL termination, global rate limiting (Token Bucket), and routing requests to internal FastAPI microservice clusters.",
      descriptionFa:
        "مسیریاب لبه با عملکرد بالا برای مدیریت گواهی SSL، محدودسازی نرخ درخواست (Rate Limiting) و هدایت ترافیک به کلاسترهای مایکروسرویس FastAPI.",
      metrics: [
        { label: "Throughput", value: "25K+ req/s" },
        { label: "Edge Latency", value: "< 1.5ms" },
        { label: "SSL Rating", value: "A+ TLS 1.3" },
      ],
      details: [
        "Distributed rate limiting backed by Redis sliding window counters",
        "CORS policy enforcement and automatic gzip/brotli compression",
        "Health-check based dynamic upstream failover routing",
      ],
      detailsFa: [
        "محدودسازی نرخ توزیع‌شده با الگوریتم پنجره لغزان مبتنی بر Redis",
        "اعمال سیاست‌های امنیتی CORS و فشرده‌سازی خودکار داده‌ها",
        "مسیریابی هوشمند Failover بر مبنای Health Check لحظه‌ای",
      ],
    },
    {
      id: "fastapi",
      name: "FastAPI Core Microservices",
      nameFa: "مایکروسرویس‌های هسته FastAPI",
      category: "Compute & Business Logic",
      tag: "Python 3.12 / Uvicorn (uvloop)",
      color: "cyan",
      description:
        "Async-first service pods built with Python 3.12 and FastAPI. Strict Pydantic v2 data validation, dependency injection, and decoupled domain-driven services.",
      descriptionFa:
        "پادهای سرویس غیرهمگام (Async) توسعه‌یافته با پایتون ۳.۱۲ و FastAPI. اعتبارسنجی دقیق داده‌ها با Pydantic v2 و معماری دامنه-محور تفکیک‌شده.",
      metrics: [
        { label: "Avg Service Latency", value: "14ms" },
        { label: "Memory Footprint", value: "~65MB / pod" },
        { label: "Concurrency", value: "Async I/O" },
      ],
      details: [
        "Structured logging with OpenTelemetry tracing and correlation IDs",
        "Pydantic v2 compile-time Rust core validations for 5x serialization speed",
        "Token-bucket JWT authentication with public-key verification",
      ],
      detailsFa: [
        "لاگ‌برداری ساختاریافته همراه با رهگیری OpenTelemetry و شناسه یکتا",
        "سرعت سریال‌سازی ۵ برابری با موتور کامپایل‌شده Rust در Pydantic v2",
        "احراز هویت مبتنی بر توکن‌های JWT و اعتبارسنجی کلید عمومی",
      ],
    },
    {
      id: "redis",
      name: "Redis Distributed Cache & PubSub",
      nameFa: "حافظه کش توزیع‌شده و PubSub ردیس",
      category: "In-Memory Acceleration",
      tag: "Redis 7.2 Cluster",
      color: "amber",
      description:
        "Sub-millisecond caching layer for hot database queries, user sessions, distributed lock orchestrations, and real-time event broadcasting.",
      descriptionFa:
        "لایه کشینگ زیر یک میلی‌ثانیه برای پاسخ‌دهی به کوئری‌های پرتکرار دیتابیس، سشن‌های کاربران، قفل‌های توزیع‌شده و مخابره رویدادهای زنده.",
      metrics: [
        { label: "Cache Hit Rate", value: "94.6%" },
        { label: "Read Latency", value: "< 0.4ms" },
        { label: "Persistence", value: "RDB + AOF" },
      ],
      details: [
        "Cache-aside pattern with automatic TTL invalidation on database mutations",
        "Distributed Redlock implementation preventing race conditions across pods",
        "In-memory Pub/Sub for push notifications and instant WebSocket sync",
      ],
      detailsFa: [
        "پیاده‌سازی الگوی Cache-aside با ابطال خودکار TTL هنگام تغییرات پایگاه‌داده",
        "الگوریتم Redlock برای جلوگیری از تداخل و Race Condition میان سرویس‌ها",
        "سیستم انتشار رویداد Pub/Sub جهت به‌روزرسانی سریع وب‌سوکت‌ها",
      ],
    },
    {
      id: "postgres",
      name: "PostgreSQL & PgBouncer Pool",
      nameFa: "پایگاه داده PostgreSQL با مخزن PgBouncer",
      category: "Relational Persistence",
      tag: "PostgreSQL 16 / SQLAlchemy Async",
      color: "indigo",
      description:
        "Primary relational database with ACID guarantees, multi-region read replicas, connection pooling via PgBouncer, and optimized B-Tree and GIN indexes.",
      descriptionFa:
        "پایگاه‌داده رابطه‌ای اصلی با تضمین ACID، رپلیکاهای خواندن، مدیریت اتصالات با PgBouncer و ایندکس‌های بهینه‌سازی‌شده B-Tree و GIN.",
      metrics: [
        { label: "Connection Pool", value: "20 pooled / 500 max" },
        { label: "Query Execution", value: "99th % < 18ms" },
        { label: "Integrity", value: "Strict ACID" },
      ],
      details: [
        "Asynchronous sessions with SQLAlchemy 2.0 and Alembic schema migrations",
        "Read-write split directing reporting & crawler reads to read-replicas",
        "Composite indexing on high-cardinality audit tables and JSONB fields",
      ],
      detailsFa: [
        "سشن‌های غیرهمگام با SQLAlchemy 2.0 و مایگریشن‌های خودکار Alembic",
        "تفکیک ترافیک خواندن و نوشتن و ارسال گزارش‌ها به Read Replicaها",
        "ایندکس‌گذاری ترکیبی روی جداول لاگ سنگین و فیلدهای JSONB",
      ],
    },
    {
      id: "workers",
      name: "RabbitMQ & Celery Async Pipelines",
      nameFa: "خطوط پردازش ناهمگام RabbitMQ و Celery",
      category: "Background Task Queue",
      tag: "RabbitMQ / Celery Workers",
      color: "fuchsia",
      description:
        "Decoupled asynchronous worker fleets processing heavy background workloads: massive web scraping (500K+ records), media transcoding, and AI agent execution.",
      descriptionFa:
        "ناوگان کارگران غیرهمگام برای پردازش بارهای سنگین پس‌زمینه: خزش داده میلیونی وب، تبدیل فرمت‌های رسانه و اجرای خطوط لوله هوش مصنوعی.",
      metrics: [
        { label: "Message Throughput", value: "12K msgs/sec" },
        { label: "Retry Policy", value: "Exponential Backoff" },
        { label: "Dead Letter Queue", value: "Active Alerting" },
      ],
      details: [
        "Dead-Letter-Exchange (DLX) routing failed tasks to quarantine inspect queues",
        "Dynamic worker auto-scaling during traffic spikes or batch crawl jobs",
        "Dedicated Celery queues for critical user notifications vs batch jobs",
      ],
      detailsFa: [
        "مکانیزم Dead-Letter-Exchange برای قرنطینه پیام‌های خطاخورده بدون توقف صف",
        "مقیاس‌پذیری خودکار ورکرها در زمان اوج ترافیک یا خزش‌های حجیم اطلاعات",
        "صف‌بندی اختصاصی برای اولویت‌دهی به نوتیفیکیشن‌ها نسبت به وظایف سنگین",
      ],
    },
  ];

  const [activeNodeId, setActiveNodeId] = useState<string>("fastapi");
  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[1];

  const colorStyles: Record<string, { border: string; bg: string; text: string; badge: string }> = {
    emerald: {
      border: "border-emerald-500/50 hover:border-emerald-400",
      bg: "bg-emerald-950/20",
      text: "text-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    cyan: {
      border: "border-cyan-500/50 hover:border-cyan-400",
      bg: "bg-cyan-950/20",
      text: "text-cyan-400",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    },
    amber: {
      border: "border-amber-500/50 hover:border-amber-400",
      bg: "bg-amber-950/20",
      text: "text-amber-400",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    indigo: {
      border: "border-indigo-500/50 hover:border-indigo-400",
      bg: "bg-indigo-950/20",
      text: "text-indigo-400",
      badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    },
    fuchsia: {
      border: "border-fuchsia-500/50 hover:border-fuchsia-400",
      bg: "bg-fuchsia-950/20",
      text: "text-fuchsia-400",
      badge: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
    },
  };

  return (
    <section id="architecture" data-testid="architecture-section" className="py-24 sm:py-32 bg-[#090E17]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow={lang === "fa" ? "معماری سیستم" : "System Blueprint"}
          title={lang === "fa" ? "طراحی معماری میکروسرویس و پایپ‌لاین‌ها" : "Production Microservices Topology"}
          testid="architecture-heading"
        />

        <Reveal delay={0.1}>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mb-10 leading-relaxed">
            {lang === "fa"
              ? "دیداری جامع از نحوه تعامل لایه‌ها در پروژه‌های پروداکشن: از دریافت ترافیک در دروازه ورودی تا پردازش غیرهمگام در FastAPI، کشینگ چندسطحی با Redis، پایگاه‌داده PostgreSQL و صف‌های تسک RabbitMQ. روی هر بخش کلیک کنید تا جزئیات فنی و متریک‌ها نمایش داده شود."
              : "An interactive topology of the distributed architectures I design and operate: from reverse proxy SSL termination to asynchronous FastAPI microservices, sub-millisecond Redis caching, resilient PostgreSQL connection pools, and Celery task queues. Click any component to inspect."}
          </p>
        </Reveal>

        {/* Interactive Architecture Flow View */}
        <div className="space-y-8">
          {/* Node Selector Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {nodes.map((node, index) => {
              const isSelected = activeNodeId === node.id;
              const style = colorStyles[node.color];

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? `bg-[#0D1625] ${style.border} shadow-lg shadow-black/60 scale-[1.02]`
                      : "bg-[#0B111D]/80 border-white/10 hover:border-white/20 text-slate-300 hover:bg-[#0D1625]/60"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      STEP 0{index + 1}
                    </span>
                    <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                  </div>

                  <div>
                    <h4 className={`font-display font-bold text-xs sm:text-sm leading-tight ${isSelected ? style.text : "text-white"}`}>
                      {lang === "fa" ? node.nameFa : node.name}
                    </h4>
                    <span className="font-mono text-[11px] text-slate-400 block mt-1">
                      {node.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#0D1625]/90 to-[#080D15]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-xs border ${colorStyles[activeNode.color].badge}`}>
                      {activeNode.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Component Stack: {activeNode.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {lang === "fa" ? activeNode.nameFa : activeNode.name}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
                    {lang === "fa" ? activeNode.descriptionFa : activeNode.description}
                  </p>
                </div>

                {/* Live Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 shrink-0 lg:w-80">
                  {activeNode.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-white/10 bg-slate-950/60 text-center flex flex-col justify-center"
                    >
                      <div className="font-display font-extrabold text-sm sm:text-base text-emerald-400">
                        {m.value}
                      </div>
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation Principles / Specs */}
              <div className="pt-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "fa" ? "الگوهای مهندسی اعمال‌شده" : "Production Architectural Highlights"}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(lang === "fa" ? activeNode.detailsFa : activeNode.details).map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed font-mono"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
