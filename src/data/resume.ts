import { PROFILE_PHOTO_BASE64, RESUME_PDF_BASE64 } from "./assetsBase64";

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
  summary: string;
  summary2: string;
  faSummary?: string;
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
  photo: PROFILE_PHOTO_BASE64,
  role: "Backend Developer",
  tagline: "PYTHON · FASTAPI · MICROSERVICES · AI PIPELINES",
  email: "mohammadsalehi8138@gmail.com",
  phone: "+98 935 255 4850",
  phoneHref: "tel:+989352554850",
  location: "Tehran, Iran",
  resumeUrl: RESUME_PDF_BASE64,
  summary:
    "Dynamic Backend Developer with 4+ years of experience engineering scalable microservices, RESTful APIs, and asynchronous data pipelines. Highly skilled in Python (FastAPI, Django) and modern data engineering, with proven expertise in building complex automated scraping architectures, ERP portals, and workflow orchestration systems.",
  summary2:
    "Proficient in designing AI agent architectures and leveraging advanced LLM orchestration tools to build intelligent, production-grade workflows. Passionate about solving structural challenges and building high-performance, AI-driven solutions.",
  faSummary:
    "توسعه‌دهنده باک‌اند با بیش از ۴ سال تجربه تخصصی در طراحی و پیاده‌سازی مایکروسرویس‌های مقیاس‌پذیر، وب‌سرویس‌های RESTful و خطوط داده ناهمگام (Async Data Pipelines). مسلط به پایتون (FastAPI و Django)، خزش داده خودکار با Scrapy، معماری‌های Enterprise ERP، سیستم‌های ارکستراسیون ورک‌فلو و تلفیق ایجنت‌های هوش مصنوعی.",
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
    value: "04+",
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
    value: "04",
    label: "Companies",
    labelFa: "همکاری شرکتی",
    testid: "stat-companies",
  },
  {
    value: "03",
    label: "Freelance Builds",
    labelFa: "پروژه کلیدی",
    testid: "stat-projects",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Python Ecosystem",
    titleFa: "اکوسیستم پایتون",
    icon: "code",
    items: ["Python", "FastAPI", "Django", "Flask", "Async Programming", "SQL"],
    testid: "skill-python",
  },
  {
    title: "Databases & Caching",
    titleFa: "دیتابیس‌ها و کشینگ",
    icon: "database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Elasticsearch", "Redis"],
    testid: "skill-databases",
  },
  {
    title: "DevOps & Architecture",
    titleFa: "دواپس و معماری",
    icon: "server",
    items: ["Docker", "RabbitMQ", "Microservices", "RESTful APIs", "Git", "Linux (Ubuntu)"],
    testid: "skill-devops",
  },
  {
    title: "Data Eng & Scraping",
    titleFa: "مهندسی داده و وب اسکرپینگ",
    icon: "spider",
    items: ["Scrapy", "Zyte APIs", "Octoparse", "Automated Workflows", "Anti-blocking"],
    testid: "skill-scraping",
  },
  {
    title: "AI & LLM Orchestration",
    titleFa: "هوش مصنوعی و ایجنت‌های زبانی",
    icon: "sparkles",
    items: ["Dify.ai", "Claude Code", "Prompt Frameworks", "AI Agent Workflows", "Token Metrics"],
    testid: "skill-ai",
  },
  {
    title: "JavaScript & Frontend Sync",
    titleFa: "جاوااسکریپت و تعامل با فرانت‌اند",
    icon: "layers",
    items: ["JavaScript", "ReactFlow Sync", "Canvas Positioning", "API Contracts"],
    testid: "skill-js",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "National Center of Cyberspace",
    role: "Backend Developer",
    period: "Present",
    location: "Tehran, Iran / Remote",
    points: [
      "Engineered and deployed a comprehensive corporate ERP portal to streamline organizational processes.",
      "Designed scalable architectural models for the enterprise portal using Python and Django.",
      "Optimized backend scripts and handled complex database queries to ensure high performance and data integrity.",
    ],
    pointsFa: [
      "طراحی و استقرار پرتال جامع سازمانی ERP جهت یکپارچه‌سازی فرآیندهای سازمانی.",
      "طراحی مدل‌های معماری مقیاس‌پذیر سازمانی با استفاده از پایتون و جنگو.",
      "بهینه‌سازی اسکریپت‌های باک‌اند و کوئری‌های پیچیده پایگاه داده جهت تضمین توان پردازشی بالا و یکپارچگی داده‌ها.",
    ],
    tags: ["Python", "Django", "ERP", "PostgreSQL"],
    testid: "experience-card-0",
  },
  {
    company: "Jaryan",
    role: "Backend Developer — No-Code Workflow Orchestration",
    period: "Present",
    location: "Remote",
    points: [
      "Architected and deployed robust backend task execution pipelines for a no-code workflow orchestration platform using FastAPI.",
      "Synchronized complex data flow logic and automated canvas positioning with a ReactFlow frontend.",
      "Handled asynchronous operations and database migrations to ensure high availability.",
    ],
    pointsFa: [
      "معماری و استقرار خطوط اجرای وظایف باک‌اند برای پلتفرم ارکستراسیون گردش‌کار بدون کد با FastAPI.",
      "هماهنگ‌سازی منطق جریان داده پیچیده و جانمایی خودکار روی بوم گرافیکی ReactFlow.",
      "مدیریت عملیات غیرهمگام (Async) و مایگریشن‌های دیتابیس جهت تداوم پایداری سرویس.",
    ],
    tags: ["FastAPI", "Async", "ReactFlow", "Migrations"],
    testid: "experience-card-1",
  },
  {
    company: "MoboNews",
    role: "Backend Developer",
    period: "Aug 2022 — Aug 2025",
    location: "Tehran, Iran",
    points: [
      "Transformed a WordPress-based project into multiple independent services using microservices architecture.",
      "Implemented coding standards for handling high request volumes, boosting reliability and uptime.",
      "Karpol Education Platform: video uploads, format conversion, and auto-subtitle translation via Google API.",
      "Price List Crawler: automated pricing updates with Elasticsearch for accuracy and search speed.",
      "Natelo (Swiss retail chain): Buyback/Repair APIs, admin panel, branch notifications, and a pricing engine compliant with Swiss regulations.",
    ],
    pointsFa: [
      "تبدیل یک پلتفرم یکپارچه وردپرسی به سرویس‌های تفکیک‌شده بر بستر معماری مایکروسرویس.",
      "اعمال استانداردهای کدنویسی پیشرفته جهت مدیریت ترافیک سنگین و ارتقای چشمگیر Uptime.",
      "پلتفرم آموزشی کارپول (Karpol): آپلود ویدیو، تبدیل فرمت خودکار و زیرنویس هوشمند با Google API.",
      "کراولر لیست قیمت: پایش و به‌روزرسانی لحظه‌ای قیمت‌ها متصل به Elasticsearch جهت جستجوی فوق سریع.",
      "ناتلو (Natelo - زنجیره خرده‌فروشی سوئیس): توسعه وب‌سرویس‌های خرید/تعمیرات، پنل مدیریت، سیستم نوتیفیکیشن شعب و موتور قیمت‌گذاری مطابق با قوانین سوئیس.",
    ],
    tags: ["Microservices", "Elasticsearch", "Docker", "APIs"],
    testid: "experience-card-2",
  },
  {
    company: "GoldenKey",
    role: "Backend Developer",
    period: "Nov 2021 — Aug 2022",
    location: "Tehran, Iran",
    points: [
      "Migrated a monolithic application to microservices architecture, improving scalability and performance.",
      "Designed secure RESTful APIs for Vidamag, a video-sharing platform, ensuring robust data handling.",
      "Built a video transcoding microservice with Docker and RabbitMQ for dynamic scaling under peak loads.",
      "Developed a secure Single Sign-On (SSO) system for cross-platform authentication.",
    ],
    pointsFa: [
      "مهاجرت معماری مونولیت به مایکروسرویس و افزایش توان پردازشی و مقیاس‌پذیری نرم‌افزار.",
      "طراحی وب‌سرویس‌های امن RESTful برای پلتفرم اشتراک ویدیو Vidamag.",
      "پیاده‌سازی مایکروسرویس ترنسکد ویدیو با استفاده از Docker و RabbitMQ برای مقیاس‌پذیری پویا.",
      "توسعه سیستم یکپارچه احراز هویت (SSO) با ضریب امنیتی بالا.",
    ],
    tags: ["RabbitMQ", "SSO", "Transcoding", "REST"],
    testid: "experience-card-3",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    index: "01",
    title: "AI-Driven Retail Purchasing Assistant",
    titleFa: "دستیار خرید هوشمند فروشگاهی بر پایه هوش مصنوعی",
    role: "Backend & Data Engineer",
    period: "Present",
    description:
      "Backend architecture for a targeted marketplace advisor system. Automated web scraping engines harvest and monitor real-time domestic retail inventory, with extraction pipelines optimized for AI models.",
    descriptionFa:
      "طراحی معماری باک‌اند سیستم مشاور بازار. موتورهای خودکار خزش وب به صورت لحظه‌ای موجودی و تغییرات قیمت فروشگاه‌ها را پایش کرده و داده‌ها را در پایپ‌لاین‌های بهینه‌شده برای مدل‌های هوش مصنوعی پالایش می‌کنند.",
    tags: ["FastAPI", "Scraping", "AI Pipelines", "PostgreSQL"],
    testid: "project-card-0",
  },
  {
    index: "02",
    title: "Football Match Data Crawler",
    titleFa: "کراولر جامع اطلاعات مسابقات فوتبال",
    role: "Backend & Data Engineering",
    period: "Feb 2025 — Present",
    description:
      "Resilient crawlers scraping 500,000+ football matches from transfermarkt.com. Anti-blocking strategies for continuous large-scale collection, normalized into clean datasets optimized for AI/ML training.",
    descriptionFa:
      "اسکرپرهای تاب‌آور با استخراج بیش از ۵۰۰ هزار داده مسابقه از سایت transfermarkt.com مجهز به راهکارهای دور زدن مسدودی و پایپ‌لاین نرمال‌سازی داده برای یادگیری ماشین.",
    tags: ["Scrapy", "500K+ Records", "Anti-blocking", "Data Normalization"],
    testid: "project-card-1",
  },
  {
    index: "03",
    title: "MrTrader Academy",
    titleFa: "آکادمی مستر تریدر (mrtrader.net)",
    role: "Full-Stack & DevOps",
    period: "Mar 2025 — Jul 2025",
    description:
      "Delivered mrtrader.net end-to-end: backend, frontend, and infrastructure. Leveraged AI-assisted tooling for the frontend while ensuring production-grade quality across the stack.",
    descriptionFa:
      "پیاده‌سازی صفر تا صد وب‌سایت mrtrader.net شامل باک‌اند، فرانت‌اند و زیرساخت استقرار و سرورها با استانداردهای کیفی بالا.",
    tags: ["Full-Stack", "DevOps", "mrtrader.net", "AI-assisted"],
    testid: "project-card-2",
    url: "https://mrtrader.net",
  },
];

export const STACK_TICKER: string[] = [
  "Python",
  "FastAPI",
  "Django",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Elasticsearch",
  "Docker",
  "RabbitMQ",
  "Microservices",
  "Scrapy",
  "LLM Orchestration",
  "REST APIs",
  "Linux",
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
      '  "location": "Tehran, Iran",',
      '  "experience": "4+ years",',
      '  "focus": "microservices · AI pipelines",',
      '  "status": "open_to_opportunities"',
      "}",
    ],
  },
  {
    id: "stack",
    command: "salehi --stack",
    output: [
      "core     Python · FastAPI · Django · Flask",
      "data     PostgreSQL · MongoDB · Redis",
      "search   Elasticsearch · Vector Search",
      "queue    RabbitMQ · async background tasks",
      "ops      Docker · Linux (Ubuntu) · Git CI/CD",
      "ai       Dify.ai · Claude Code · LLM agent workflows",
    ],
  },
  {
    id: "experience",
    command: "salehi --experience",
    output: [
      "▸ National Center of Cyberspace — Backend Dev (ERP Portal)",
      "▸ Jaryan — Backend Dev (No-Code Workflow Orchestration)",
      "▸ MoboNews — Backend Dev · 2022–2025 (Karpol, Natelo)",
      "▸ GoldenKey — Backend Dev · 2021–2022 (Vidamag, Transcoding)",
    ],
  },
  {
    id: "contact",
    command: "salehi --contact",
    output: [
      "email   mohammadsalehi8138@gmail.com",
      "phone   +98 935 255 4850",
      "based   Tehran, Iran · remote-friendly & relocation ready",
      "status  Available for backend & AI pipeline engineering",
    ],
  },
];
