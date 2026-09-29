export type Lang = "en" | "fa";

export const SITE_URL = "https://salehi.my";

export const SEO: Record<Lang, { title: string; description: string; path: string; locale: string }> = {
  fa: {
    title: "محمدرضا صالحی | توسعه‌دهنده بک‌اند و مهندس پایتون — Mohammadreza Salehi",
    description:
      "وب‌سایت و رزومه رسمی محمدرضا صالحی: برنامه‌نویس پایتون، توسعه‌دهنده ارشد بک‌اند، متخصص FastAPI، جنگو، داکر، میکروسرویس، خزش خودکار وب و خطوط داده هوش مصنوعی.",
    path: "/",
    locale: "fa_IR",
  },
  en: {
    title: "Mohammadreza Salehi — Senior Backend Developer & Python Engineer",
    description:
      "Portfolio and CV of Mohammadreza Salehi: Python backend developer specializing in FastAPI, Django, microservices, high-throughput web scraping, and AI data pipelines.",
    path: "/en/",
    locale: "en_US",
  },
};

export const langFromPath = (pathname: string): Lang => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fa");
