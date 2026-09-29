# پورتفولیو و رزومه تعاملی محمدرضا صالحی | Mohammadreza Salehi Portfolio

وب‌سایت شخصی و پورتفولیوی تعاملی مهندس ارشد بک‌اند و سیستم‌های داده و هوش مصنوعی (Senior Backend & AI Data Engineer).  
طراحی شده با استانداردهای مدرن وب، پشتیبانی کامل از دو زبان فارسی و انگلیسی (RTL / LTR)، انیمیشن‌های سبک CSS/SVG، شبیه‌ساز ترمینال لینوکس و تعاملات سه‌بعدی.

---

## 🚀 راهنمای اجرای محلی پروژه (How to Run Locally)

### ۱. پیش‌نیازها (Prerequisites)
برای اجرای این پروژه، نیاز دارید که ابزارهای زیر بر روی سیستم شما نصب باشند:
- **Node.js**: نسخه 18 یا بالاتر (نسخه 20 LTS پیشنهاد می‌شود)
- **npm** (یا `pnpm` / `yarn`)
- **Git**

برای بررسی نسخه‌های نصب شده در ترمینال:
```bash
node -v
npm -v
```

---

### ۲. مراحل نصب و راه‌اندازی (Step-by-step Setup)

#### گام اول: کلون یا دریافت پروژه
اگر مخزن را کلون نکرده‌اید:
```bash
git clone <URL_مخزن_شما>
cd <پوشه_پروژه>
```

#### گام دوم: نصب بسته‌ها و وابستگی‌ها (Install Dependencies)
دستور زیر را برای نصب تمامی پکیج‌های پروژه اجرا کنید:
```bash
npm install
```

> **نکته در صورت بروز خطای ERESOLVE:**  
> اگر در نسخه‌های قدیمی‌تر npm با خطای peer dependency مواجه شدید، می‌توانید از فلگ `--legacy-peer-deps` استفاده کنید:
> ```bash
> npm install --legacy-peer-deps
> ```

#### گام سوم: تنظیم متغیرهای محیطی (Environment Variables) - اختیاری
در صورت نیاز به فعال‌سازی قابلیت‌های سرور یا کلید Gemini:
1. فایل `.env.example` را به `.env` یا `.env.local` کپی کنید:
   ```bash
   cp .env.example .env.local
   ```
2. متغیرهای مورد نظر مانند `GEMINI_API_KEY` را در صورت استفاده مقداردهی نمایید.

---

### ۳. اجرای محیط توسعه (Run Development Server)

برای راه‌اندازی سرور لوکال با قابلیت بارگذاری آنی (Hot Reload):
```bash
npm run dev
```

پس از اجرای دستور، خروجی به شکل زیر خواهد بود:
```text
  VITE v8.3.1  ready in ~200 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://<ip-address>:3000/
```

اکنون مرورگر خود را باز کرده و آدرس زیر را وارد کنید:
👉 **`http://localhost:3000`**

---

### ۴. دستورات کمکی در پروژه (Available Scripts)

در فایل `package.json` اسکریپت‌های زیر برای توسعه و انتشار در دسترس هستند:

| دستور (Command) | کاربرد (Description) |
| :--- | :--- |
| `npm run dev` | اجرای برنامه در حالت توسعه روی پورت `3000` با دسترسی شبکه محلی |
| `npm run build` | بیلد `vite` و سپس پیش‌رندر HTML هر دو زبان (`scripts/prerender.mjs`) در `dist/` |
| `npm start` | اجرای `server.js` (Express) برای سرو `dist/` با کش و gzip |
| `npm run preview` | تست و مشاهده نسخه بیلد نهایی (`dist`) به شکل لوکال |
| `npm run lint` | بررسی استاتیک تایپ‌ها و کدهای تایپ‌اسکریپت (`tsc --noEmit`) |
| `npm run clean` | پاک‌سازی پوشه بیلد و فایل‌های موقت |

---

### ۵. ساخت و انتشار برای پروداکشن (Production Build)

برای ایجاد خروجی بهینه و کامپایل شده برای سرور، هاستینگ استاتیک (مانند Vercel، Netlify، Cloudflare Pages، Docker یا Nginx):
```bash
npm run build
```
پوشه تولید شده `dist/` شامل تمامی فایل‌های HTML، CSS مینیمایز شده، جاوااسکریپت بهینه‌سازی شده و فایل‌های انیمیشن Lottie (`/animations/*.json`) می‌باشد.

برای تست محلی فایل‌های بیلد شده قبل از استقرار:
```bash
npm run preview
```

---

## 🛠 پشته فناوری‌ها (Tech Stack)

- **Frontend Core:** React 19, TypeScript
- **Bundler & Tooling:** Vite 8, Tailwind CSS v4, PostCSS
- **Animations & Micro-interactions:** فقط CSS/SVG و IntersectionObserver (بدون کتابخانه انیمیشن)
- **SEO & Performance:** پیش‌رندر زمان بیلد برای `/` (فارسی) و `/en/` (انگلیسی)، فونت‌های self-host، فشرده‌سازی gzip و کش طولانی برای assets
- **Icons & UI:** Lucide React
- **Internationalization:** پشتیبانی کامل و واکنش‌گرا از زبان‌های انگلیسی و فارسی با چیدمان استاندارد RTL/LTR

---

## 📁 ساختار پوشه‌های پروژه (Project Structure)

```text
├── public/                 # دارایی‌های استاتیک و عمومی
│   ├── favicon.svg / icon-*.png  # آیکون‌ها
│   └── og-image.png        # تصویر پیش‌نمایش (ساخته‌شده از scripts/og-image.html)
├── src/
│   ├── components/         # کامپوننت‌های رابط کاربری
│   │   ├── Hero.tsx        # بخش اصلی هیرو به همراه تله‌متری لایو
│   │   ├── PipelineViz.tsx # پایپ‌لاین SVG تعاملی با شبیه‌ساز خرابی
│   │   ├── Skills.tsx      # ماتریس مهارت‌ها و رادار اکوسیستم فناوری
│   │   ├── Projects.tsx    # گالری پروژه‌ها با قابلیت فیلتر و مشاهده جزییات
│   │   ├── Experience.tsx  # خط زمان سوابق کاری و دستاوردهای کلیدی
│   │   ├── Terminal.tsx    # شبیه‌ساز تعاملی خط فرمان با دستورات اختصاصی
│   │   └── Navbar.tsx      # ناوبری شناور با سوئیچ سریع زبان و تب‌ها
│   ├── data/               # دیتای رزومه، پروژه‌ها و تعاریف انیمیشن‌ها
│   ├── index.css           # پیکربندی استایل‌های گلوبال و فونت‌ها
│   └── App.tsx             # کامپوننت ریشه و مدیریت استیت زبان و مودال‌ها
├── index.html              # نقطه ورود HTML و متاتگ‌های SEO
├── package.json            # وابستگی‌ها و اسکریپت‌های اجرایی
└── README.md               # مستندات و راهنمای پروژه
```

---

## 📬 تماس و ارتباط (Contact)

- **ایمیل:** `mamadreza8138@gmail.com`
- **لینکدین:** [Mohammadreza Salehi](https://linkedin.com/in/mohammadreza-salehi)
- **گیت‌هاب:** [github.com/mamadreza8138](https://github.com/mamadreza8138)
