export interface ProfileData {
  firstName: string;
  lastName: string;
  fullName: string;
  photo: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeUrl: string;
  resumeUrlFa: string;
  summary: string;
  summary2: string;
  summary2Fa?: string;
  faSummary?: string;
  heroHook?: string;
  heroHookFa?: string;
  aboutStory?: string;
  aboutStoryFa?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
  labelFa: string;
  testid: string;
}

export interface SkillCategory {
  title: string;
  titleFa: string;
  icon: string;
  items: string[];
  testid: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  pointsFa?: string[];
  tags: string[];
  testid: string;
}

export interface ProjectItem {
  index: string;
  title: string;
  titleFa?: string;
  role: string;
  period: string;
  description: string;
  descriptionFa?: string;
  tags: string[];
  testid: string;
  url?: string;
  /** Set when the project is the author's own product, taken from zero to shipped. */
  ownershipFa?: string;
  ownership?: string;
}

export interface TerminalCommand {
  id: string;
  command: string;
  output: string[];
}

export const PROFILE: ProfileData = {
  firstName: "MOHAMMADREZA",
  lastName: "SALEHI",
  fullName: "Mohammadreza Salehi",
  photo: "/profile.jpg",
  role: "Backend Developer",
  tagline: "PYTHON · DJANGO · FASTAPI · DATA PIPELINES · AI AGENTS",
  email: "job.msalehi@gmail.com",
  phone: "+98 935 255 4850",
  phoneHref: "tel:+989352554850",
  location: "Istanbul, Türkiye",
  resumeUrl: "/Mohammadreza_Salehi_CV_en.pdf",
  resumeUrlFa: "/Mohammadreza_Salehi_CV_fa.pdf",
  summary:
    "Backend developer with 5 years of experience building services in Python, Django and FastAPI, designing data pipelines, and taking products from idea to production. Most of my work has been on real operational problems: automating manual processes and putting AI agents to practical use.",
  summary2:
    "I have a product-builder mindset: I get energy from spotting a problem, shaping an idea, and pushing it all the way to something people can actually use. DataCanvas and Jaryan are my two best examples, both designed, built and shipped from scratch.",
  summary2Fa:
    "روحیه محصول‌سازی دارم؛ از دیدن یک مسئله و رسیدن به ایده انرژی می‌گیرم و دوست دارم آن را تا یک محصول واقعی و قابل استفاده جلو ببرم. دیتاکانواس و جریان دو نمونه از بهترین نتایج همین مسیرند که هر دو را از صفر طراحی، پیاده‌سازی و منتشر کرده‌ام.",
  faSummary:
    "توسعه‌دهنده بک‌اند با ۵ سال تجربه در ساخت سرویس با Python، Django و FastAPI، طراحی پایپ‌لاین‌های داده و پیاده‌سازی محصول از ایده تا استقرار. بیشتر کارم روی مسئله‌های واقعی سازمان‌ها بوده: خودکارسازی فرآیندهای دستی و به‌کارگیری عملی ایجنت‌های هوش مصنوعی.",
  heroHook:
    "Backend developer building data pipelines and AI workflows: Django and FastAPI services, agentic ERP systems, and scrapers that collected 500K+ records. I take products from idea to production.",
  heroHookFa:
    "توسعه‌دهنده بک‌اند؛ سازنده پایپ‌لاین‌های داده و گردش‌کارهای هوش مصنوعی: سرویس‌های Django و FastAPI، ERP ایجنتیک و خزنده‌هایی با بیش از ۵۰۰ هزار رکورد. محصول را از ایده تا استقرار جلو می‌برم.",
  aboutStory:
    "With 5 years of production experience, I build services in Python, Django and FastAPI, design data pipelines, and take products from idea to production. I keep growing toward software engineering and system design on purpose: cleaner architecture, better testing, and more considered technical decisions.",
  aboutStoryFa:
    "با ۵ سال تجربه در محیط‌های پروداکشن، سرویس‌های Python، Django و FastAPI می‌سازم، پایپ‌لاین داده طراحی می‌کنم و محصول را از ایده تا استقرار جلو می‌برم. مهندسی نرم‌افزار و طراحی سیستم مسیری است که آگاهانه در آن رشد می‌کنم: معماری تمیزتر، تست بیشتر و تصمیم‌های فنی سنجیده‌تر.",
};

export const SOCIALS: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-reza-salehi7",
    icon: "linkedin",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/m-salehi8/",
    icon: "github",
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/mohammadsalehi81",
    icon: "send",
  },
];

export const STATS: StatItem[] = [
  {
    value: "05+",
    label: "Years Experience",
    labelFa: "سال تجربه حرفه‌ای",
    testid: "stat-years",
  },
  {
    value: "500K+",
    label: "Records Crawled",
    labelFa: "رکورد استخراج‌شده",
    testid: "stat-records",
  },
  {
    value: "03",
    label: "Companies",
    labelFa: "همکاری شرکتی",
    testid: "stat-companies",
  },
  {
    value: "04",
    label: "Key Projects",
    labelFa: "پروژه کلیدی",
    testid: "stat-projects",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Backend",
    titleFa: "بک‌اند",
    icon: "code",
    items: ["Python", "Django", "FastAPI", "Flask", "Celery", "Async Programming", "RESTful APIs", "Microservices"],
    testid: "skill-backend",
  },
  {
    title: "Databases & Messaging",
    titleFa: "دیتابیس و صف پیام",
    icon: "database",
    items: ["PostgreSQL", "Redis", "Elasticsearch", "RabbitMQ", "MongoDB", "MySQL"],
    testid: "skill-databases",
  },
  {
    title: "AI & LLMs",
    titleFa: "هوش مصنوعی و LLM",
    icon: "sparkles",
    items: ["AI Agents", "LLM Orchestration", "RAG", "Prompt Engineering", "Dify", "Claude Code", "Token Usage Tracking"],
    testid: "skill-ai",
  },
  {
    title: "Data",
    titleFa: "داده",
    icon: "spider",
    items: ["Pandas", "ETL Pipelines", "Data Normalization", "Proxy Rotation"],
    testid: "skill-data",
  },
  {
    title: "Infrastructure & Tooling",
    titleFa: "زیرساخت و ابزار",
    icon: "server",
    items: ["Docker", "Linux", "Nginx", "CI/CD", "Git", "Automated Testing"],
    testid: "skill-devops",
  },
  {
    title: "Frontend",
    titleFa: "فرانت‌اند",
    icon: "layers",
    items: ["JavaScript", "React", "Vue.js"],
    testid: "skill-frontend",
  },
  {
    title: "Practices",
    titleFa: "اصول و روش کار",
    icon: "code",
    items: ["Clean Architecture", "SOLID", "Design Patterns", "Code Review", "Agile / Scrum"],
    testid: "skill-practices",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "National Center for Cyberspace",
    role: "Backend Developer & System Designer",
    period: "Oct 2025 — Present",
    location: "Tehran, Iran",
    points: [
      "Built a Workflow Builder engine in Python and Django for the internal ERP portal, turning manual, human-dependent operations into automated workflows.",
      "Turned the portal into an Agentic ERP by connecting it to a conversational AI agent, so employees complete administrative tasks by chatting with it.",
      "Designed relational PostgreSQL data models with data integrity in mind and optimized heavy queries to cut portal response times.",
      "Implemented authentication, role-based access control (RBAC) and automated test suites for security and reliability.",
    ],
    pointsFa: [
      "توسعه موتور فرآیندساز (Workflow Builder) با Python و Django در پورتال سازمانی (ERP) و تبدیل فرآیندهای دستی به گردش‌کارهای سیستمی.",
      "ایجنتیک کردن پورتال سازمانی (Agentic ERP) و اتصال آن به چت‌بات هوشمند؛ کارکنان امور اداری خود را از طریق گفتگو با ایجنت انجام می‌دهند.",
      "طراحی مدل داده رابطه‌ای در PostgreSQL با رعایت جامعیت داده (Data Integrity) و بهینه‌سازی کوئری‌های سنگین برای کاهش زمان پاسخ‌گویی پورتال.",
      "پیاده‌سازی احراز هویت، کنترل دسترسی مبتنی بر نقش (RBAC) و تست‌های خودکار برای امنیت و پایداری سامانه.",
    ],
    tags: ["Python", "Django", "Agentic ERP", "PostgreSQL", "RBAC"],
    testid: "experience-card-0",
  },
  {
    company: "Mobonews",
    role: "Backend Developer",
    period: "Aug 2022 — Oct 2025",
    location: "Tehran, Iran",
    points: [
      "Split high-traffic modules out of a legacy WordPress monolith and rewrote them as independent Python microservices with clean-code standards, keeping the platform stable under peak load.",
      "Built an automated price-update pipeline backed by Elasticsearch for fast search and accurate data.",
      "Developed the backend of the Carpel learning platform: video upload, automatic transcoding, and automated subtitle translation via Google APIs.",
      "Implemented backend services for Swiss retail chain Natelo: smart pricing engine, admin panel, reservations and buyback.",
    ],
    pointsFa: [
      "جداسازی بخش‌های پرترافیک از هسته یکپارچه وردپرس و بازنویسی آن‌ها به‌صورت میکروسرویس‌های مستقل پایتونی با استانداردهای کد تمیز، برای پایداری در زمان اوج بار.",
      "طراحی پایپ‌لاین خودکار به‌روزرسانی قیمت‌ها متصل به Elasticsearch برای جستجوی سریع و صحت داده‌ها.",
      "توسعه بک‌اند پلتفرم آموزشی «کارپل»: آپلود ویدیو، تبدیل فرمت خودکار و ترجمه خودکار زیرنویس با Google APIs.",
      "پیاده‌سازی سرویس‌های بک‌اند زنجیره خرده‌فروشی سوئیسی Natelo: موتور قیمت‌گذاری هوشمند، پنل مدیریت، سیستم رزرو و خرید مجدد (Buyback).",
    ],
    tags: ["Microservices", "Elasticsearch", "Python", "Google APIs"],
    testid: "experience-card-1",
  },
  {
    company: "Kelid Talaei (Golden Key)",
    role: "Backend Developer",
    period: "Nov 2021 — Aug 2022",
    location: "Tehran, Iran",
    points: [
      "Helped migrate a monolithic application to microservices to enable horizontal scaling and remove processing bottlenecks.",
      "Designed secure, standards-based RESTful APIs for the Vidamag video-sharing platform.",
      "Built a distributed video transcoding microservice with Docker and RabbitMQ that scaled out automatically at peak load.",
      "Implemented token-based single sign-on (SSO) for centralized authentication across the group's platforms.",
    ],
    pointsFa: [
      "مشارکت در مهاجرت اپلیکیشن مونولیتیک به معماری میکروسرویس برای مقیاس‌پذیری افقی و کاهش گلوگاه‌های پردازشی.",
      "طراحی RESTful APIهای امن و استاندارد برای پلتفرم اشتراک ویدیوی Vidamag.",
      "ساخت میکروسرویس توزیع‌شده تبدیل فرمت ویدیو (Transcoding) با Docker و صف پیام RabbitMQ، با امکان افزایش خودکار ظرفیت در زمان اوج بار.",
      "پیاده‌سازی ورود یکپارچه (SSO) مبتنی بر توکن برای احراز هویت متمرکز میان پلتفرم‌های مجموعه.",
    ],
    tags: ["RabbitMQ", "Docker", "SSO", "REST"],
    testid: "experience-card-2",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    index: "01",
    title: "DataCanvas — AI-Powered Business Intelligence Platform",
    titleFa: "دیتاکانواس — پلتفرم هوش تجاری مبتنی بر AI",
    role: "Full-Stack & AI Data Engineer",
    period: "Aug 2026 — Present",
    description:
      "Took the product from idea to production on my own: architecture, backend, frontend, data-processing pipeline, and containerized deployment with Docker. Users upload Excel/CSV files or connect a database directly, ask questions in plain language, and get interactive ECharts dashboards and analytical reports. Computation is separated from AI: all statistics are computed deterministically in Pandas and the LLM only generates the chart structure (valid JSON), so no hallucinated numbers reach a report. Includes native Jalali calendar support for time series, automatic table detection in multi-sheet workbooks, and role-based access control (RBAC).",
    descriptionFa:
      "ایده‌پردازی، طراحی معماری و توسعه کامل محصول شامل بک‌اند، فرانت‌اند، پایپ‌لاین پردازش داده و استقرار کانتینری با Docker. کاربر فایل Excel/CSV را بارگذاری می‌کند یا دیتابیس را مستقیم وصل می‌کند و با پرسش به زبان ساده، داشبورد تعاملی ECharts و گزارش تحلیلی می‌گیرد. محاسبه از هوش مصنوعی جدا شده است: همه محاسبات آماری به‌صورت قطعی در Pandas انجام می‌شود و مدل زبانی فقط ساختار نمودار (JSON معتبر) را تولید می‌کند؛ در نتیجه عددی از توهم مدل وارد گزارش نمی‌شود. شامل پشتیبانی بومی از تقویم جلالی در سری‌های زمانی، تشخیص خودکار ساختار جدول در فایل‌های اکسل چندشیتی و کنترل دسترسی مبتنی بر نقش (RBAC).",
    tags: ["Django / DRF", "Pandas", "PostgreSQL", "Vue 3", "Apache ECharts", "LLM Orchestration", "Docker"],
    testid: "project-card-0",
    url: "https://datacanvas.salehi.my",
    ownership: "Own Product · Idea, Design & Full Implementation",
    ownershipFa: "محصول شخصی · ایده، طراحی و پیاده‌سازی کامل از صفر",
  },
  {
    index: "02",
    title: "Jaryan — No-Code Workflow Automation Platform",
    titleFa: "جریان — پلتفرم اتوماسیون گردش‌کار بدون کد",
    role: "Full-Stack & Workflow Engine Engineer",
    period: "May 2026 — Present",
    description:
      "One platform that combines n8n-style node-based automation with an enterprise process builder, covering both service integrations and automated tasks, and the design and execution of business processes. Designed and built a full-stack task orchestration platform with two views: a node-based visual canvas and a linear task list. Built an asynchronous DAG execution engine in FastAPI that runs tasks concurrently with high throughput and reliability, and an interactive ReactFlow canvas with real-time run-state sync between backend and frontend.",
    descriptionFa:
      "ساخت پلتفرمی که اتوماسیون نودمحور به سبک n8n را با یک فرآیندساز سازمانی در یک محصول ترکیب می‌کند؛ هم اتصال سرویس‌ها و اجرای خودکار تسک‌ها، هم طراحی و اجرای فرآیندهای کاری سازمان. طراحی و توسعه فول‌استک پلتفرم ارکستراسیون تسک‌ها با دو رابط: بوم بصری مبتنی بر نود و نمای خطی. موتور ناهمگام اجرای DAG در FastAPI تسک‌ها را هم‌زمان و با توان عملیاتی و قابلیت اطمینان بالا اجرا می‌کند و بوم تعاملی ReactFlow وضعیت اجرا را به‌صورت بالدرنگ میان بک‌اند و فرانت‌اند همگام می‌کند.",
    tags: ["FastAPI", "Async DAG Engine", "PostgreSQL", "ReactFlow", "Docker"],
    testid: "project-card-1",
    url: "https://jaryan.salehi.my",
    ownership: "Own Product · Idea, Design & Full Implementation",
    ownershipFa: "محصول شخصی · ایده، طراحی و پیاده‌سازی کامل از صفر",
  },
  {
    index: "03",
    title: "Football Match Data Pipeline",
    titleFa: "پایپ‌لاین استخراج داده مسابقات فوتبال",
    role: "Data Engineering & Web Scraping",
    period: "Feb 2025 — Present",
    description:
      "Distributed Scrapy crawlers that reliably collected 500K+ match records from Transfermarkt. Anti-blocking measures (anti-bot handling, IP rotation) and crawl-queue management for uninterrupted collection, with raw data normalized into clean, structured datasets ready for machine-learning pipelines.",
    descriptionFa:
      "خزنده‌های توزیع‌شده Scrapy برای استخراج پایدار بیش از ۵۰۰ هزار رکورد مسابقه از Transfermarkt، با مکانیزم‌های عبور از مسدودسازی (Anti-Bot، چرخش IP) و مدیریت صف خزش برای جمع‌آوری بدون وقفه. داده خام به مجموعه‌داده‌های تمیز و ساخت‌یافته و آماده برای پایپ‌لاین‌های یادگیری ماشین نرمال‌سازی می‌شود.",
    tags: ["Scrapy", "Zyte API", "Proxy Rotation", "Data Normalization", "ETL"],
    testid: "project-card-2",
  },
  {
    index: "04",
    title: "MrTrader Academy",
    titleFa: "آکادمی مستر تریدر (mrtrader.net)",
    role: "Full-Stack & DevOps",
    period: "Mar 2025 — Jul 2025",
    description:
      "Delivered the learning and analytics platform end to end: backend, frontend, Nginx web server, containerized services and SSL certificates. Set up a CI/CD pipeline automating test, build and deploy with zero-downtime releases, and sped up the development cycle with AI-assisted tooling while keeping production-level code quality.",
    descriptionFa:
      "تحویل کامل پلتفرم آموزشی و تحلیلی از بک‌اند و فرانت‌اند تا وب‌سرور Nginx، داکرایز کردن سرویس‌ها و صدور گواهی SSL. راه‌اندازی پایپ‌لاین CI/CD برای خودکارسازی تست، بیلد و استقرار بدون قطعی، و تسریع چرخه توسعه با ابزارهای هوش مصنوعی با حفظ کیفیت کد در سطح محصول.",
    tags: ["Python", "Vue.js", "Docker", "Nginx", "Let's Encrypt SSL", "CI/CD"],
    testid: "project-card-3",
    url: "https://mrtrader.net",
  },
];

export const STACK_TICKER: string[] = [
  "Python",
  "FastAPI",
  "Django",
  "Celery",
  "PostgreSQL",
  "Redis",
  "Elasticsearch",
  "RabbitMQ",
  "Docker",
  "Microservices",
  "Scrapy",
  "AI Agents",
  "LLM Orchestration",
  "RAG",
  "Pandas",
  "Async Pipelines",
];

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  {
    id: "info",
    command: "salehi --info",
    output: [
      "{",
      '  "name": "Mohammadreza Salehi",',
      '  "role": "Backend Developer",',
      '  "location": "Istanbul, Türkiye",',
      '  "experience": "5 years",',
      '  "focus": "data pipelines · AI agents",',
      '  "status": "open_to_opportunities"',
      "}",
    ],
  },
  {
    id: "stack",
    command: "salehi --stack",
    output: [
      "core     Python · Django · FastAPI · Flask · Celery",
      "data     PostgreSQL · MongoDB · Redis · Pandas",
      "search   Elasticsearch · Vector Search",
      "queue    RabbitMQ · async background tasks",
      "ops      Docker · Linux (Ubuntu) · Git CI/CD",
      "ai       AI Agents · RAG · Dify · Claude Code",
    ],
  },
  {
    id: "experience",
    command: "salehi --experience",
    output: [
      "▸ National Center for Cyberspace — Backend Dev & System Designer · 2025–now",
      "▸ Mobonews — Backend Dev · 2022–2025 (Carpel, Natelo)",
      "▸ Kelid Talaei — Backend Dev · 2021–2022 (Vidamag, Transcoding)",
    ],
  },
  {
    id: "contact",
    command: "salehi --contact",
    output: [
      "email   job.msalehi@gmail.com",
      "phone   +98 935 255 4850",
      "based   Istanbul, Türkiye · remote-friendly & relocation ready",
      "status  Available for backend & AI pipeline engineering",
    ],
  },
];
