import React, { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { Server, Database, Cpu, Layers, ShieldCheck, Activity, ArrowRight, CheckCircle2, Zap, Code, Terminal, Sparkles } from "lucide-react";

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
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

export default function ArchitectureDiagram({ lang }: ArchitectureDiagramProps) {
  const nodes: ArchNode[] = [
    {
      id: "gateway",
      name: "API Gateway & Edge Router",
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
      codeSnippet: {
        language: "nginx",
        filename: "nginx.conf",
        code: `# Edge Rate Limiting & Upstream Reverse Proxy
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/s;

upstream fastapi_cluster {
    least_conn;
    server 10.0.1.10:8000 max_fails=3 fail_timeout=10s;
    server 10.0.1.11:8000 max_fails=3 fail_timeout=10s;
    keepalive 64;
}

location /api/v1/ {
    limit_req zone=api_limit burst=30 nodelay;
    proxy_pass http://fastapi_cluster;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_set_header X-Real-IP $remote_addr;
}`,
      },
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
        { label: "Avg Latency", value: "14ms" },
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
      codeSnippet: {
        language: "python",
        filename: "service_router.py",
        code: `from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from app.core.security import verify_jwt_token
from app.services.cache import get_redis_pool

router = APIRouter(prefix="/api/v1", tags=["Internal Services"])

class ServicePayload(BaseModel):
    task_id: str = Field(..., min_length=8)
    dataset_records: int = Field(gt=0, le=500_000)
    priority: str = Field(default="high")

@router.post("/pipeline/dispatch", status_code=status.HTTP_202_ACCEPTED)
async def dispatch_pipeline(
    payload: ServicePayload,
    user: dict = Depends(verify_jwt_token),
    redis = Depends(get_redis_pool)
):
    # Async dispatch to message broker with correlation ID
    job_token = await redis.publish_task("celery.scrape_queue", payload.model_dump())
    return {"status": "enqueued", "job_token": job_token, "latency_ms": 12}`,
      },
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
      codeSnippet: {
        language: "python",
        filename: "cache_manager.py",
        code: `import json
from functools import wraps
from redis.asyncio import Redis

def cache_response(key_prefix: str, ttl_seconds: int = 3600):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            redis: Redis = kwargs.get("redis")
            cache_key = f"{key_prefix}:{hash(str(kwargs))}"
            cached = await redis.get(cache_key)
            if cached:
                return json.loads(cached)
            
            result = await func(*args, **kwargs)
            await redis.setex(cache_key, ttl_seconds, json.dumps(result))
            return result
        return wrapper
    return decorator`,
      },
    },
    {
      id: "postgres",
      name: "PostgreSQL 16 & Connection Pool",
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
      codeSnippet: {
        language: "python",
        filename: "database_session.py",
        code: `from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

DATABASE_URL = "postgresql+asyncpg://app_user:sec_pwd@pgbouncer:6432/production_db"

engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=1800,
    pool_pre_ping=True
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)`,
      },
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
        { label: "Message Rate", value: "12K msgs/sec" },
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
      codeSnippet: {
        language: "python",
        filename: "celery_tasks.py",
        code: `from celery import Celery
from kombu import Queue, Exchange

app = Celery("pipeline_worker", broker="pyamqp://guest@rabbitmq:5672//")

app.conf.task_queues = (
    Queue("high_priority", Exchange("tasks"), routing_key="task.high"),
    Queue("crawlers_500k", Exchange("tasks"), routing_key="task.crawl"),
)

@app.task(bind=True, max_retries=3, default_retry_delay=60)
def process_scraped_dataset(self, match_data: dict):
    try:
        # Normalize and ingest into PostgreSQL & Elasticsearch
        return {"status": "ingested", "records": len(match_data)}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)`,
      },
    },
  ];

  const [activeNodeId, setActiveNodeId] = useState<string>("fastapi");
  const [showCodeView, setShowCodeView] = useState<boolean>(false);

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[1];

  return (
    <section id="architecture" data-testid="architecture-section" className="py-24 sm:py-32 bg-[#090E17]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow={lang === "fa" ? "معماری سیستم" : "System Blueprint"}
          title={lang === "fa" ? "طراحی معماری میکروسرویس و پایپ‌لاین‌ها" : "Production Microservices Topology"}
          testid="architecture-heading"
        />

        <Reveal delay={0.1}>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mb-10 leading-relaxed">
            {lang === "fa"
              ? "دیداری جامع از نحوه تعامل لایه‌ها در پروژه‌های پروداکشن: از دریافت ترافیک در دروازه ورودی تا پردازش غیرهمگام در FastAPI، کشینگ چندسطحی با Redis، پایگاه‌داده PostgreSQL و صف‌های تسک RabbitMQ. روی هر بخش کلیک کرده و کد اسنیپت واقعی را بررسی کنید."
              : "An interactive topology of the distributed architectures I design and operate: from reverse proxy SSL termination to asynchronous FastAPI microservices, sub-millisecond Redis caching, resilient PostgreSQL connection pools, and Celery task queues."}
          </p>
        </Reveal>

        {/* Animated Data Stream Flow Indicator */}
        <div className="mb-8 p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between overflow-x-auto scrollbar-none font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">{lang === "fa" ? "جریان زنده داده:" : "Active Data Flow:"}</span>
          </div>

          <div dir="ltr" className="flex items-center gap-2 sm:gap-3 shrink-0 ml-4">
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">Client Traffic</span>
            <span className="text-emerald-400">➔</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">Nginx Gateway</span>
            <span className="text-emerald-400">➔</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">FastAPI Pods</span>
            <span className="text-emerald-400">➔</span>
            <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">Redis Cache</span>
            <span className="text-emerald-400">➔</span>
            <span className="px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">PostgreSQL</span>
            <span className="text-emerald-400">➔</span>
            <span className="px-2 py-0.5 rounded bg-fuchsia-950/60 text-fuchsia-300 border border-fuchsia-500/30">RabbitMQ / Celery</span>
          </div>
        </div>

        {/* Interactive Architecture Flow View */}
        <div className="space-y-8">
          {/* Node Selector Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {nodes.map((node, index) => {
              const isSelected = activeNodeId === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`${lang === "fa" ? "text-right" : "text-left"} p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#0D1625] border-emerald-500/60 shadow-lg shadow-emerald-950/40 scale-[1.02]"
                      : "bg-[#0B111D]/80 border-white/10 hover:border-white/20 text-slate-300 hover:bg-[#0D1625]/60"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      STAGE 0{index + 1}
                    </span>
                    <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                  </div>

                  <div>
                    <h4 className={`font-display font-bold text-xs sm:text-sm leading-tight ${isSelected ? "text-emerald-300" : "text-white"}`}>
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

          {/* Active Node Detail Card with Spotlight */}
          <Reveal delay={0.15}>
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-xs border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                      {activeNode.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Stack: {activeNode.tag}
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

              {/* View Switcher: Architectural Principles vs Live Code Snippet */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCodeView(false)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
                        !showCodeView
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                          : "bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{lang === "fa" ? "الگوهای معماری" : "Architecture Specs"}</span>
                      </span>
                    </button>

                    <button
                      onClick={() => setShowCodeView(true)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
                        showCodeView
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                          : "bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5" />
                        <span>{lang === "fa" ? "مشاهده کد پروداکشن" : "Production Code Schema"}</span>
                      </span>
                    </button>
                  </div>

                  <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">
                    {showCodeView ? activeNode.codeSnippet.filename : "Fault-tolerant design"}
                  </span>
                </div>

                {!showCodeView ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in">
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
                ) : (
                  <div dir="ltr" className="rounded-xl border border-white/10 bg-[#070B12] p-4 overflow-x-auto font-mono text-xs leading-relaxed text-emerald-300/90 scrollbar-thin animate-in fade-in text-left">
                    <div className="text-slate-500 text-[10px] pb-2 border-b border-white/5 mb-3 flex items-center justify-between">
                      <span># {activeNode.codeSnippet.filename}</span>
                      <span>Python 3.12 / ASGI</span>
                    </div>
                    <pre className="whitespace-pre overflow-x-auto">
                      {activeNode.codeSnippet.code}
                    </pre>
                  </div>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
