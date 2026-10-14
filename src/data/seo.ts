export type Lang = "en" | "fa";

export const SITE_URL = "https://salehi.my";

/** Spellings people search the name by; used in JSON-LD alternateName and the keywords meta. */
export const NAME_VARIANTS = {
  fa: ["محمدرضا صالحی", "محمد رضا صالحی", "محمد صالحی", "محمدصالحی"],
  en: ["Mohammadreza Salehi", "Mohammad Reza Salehi", "Mohammad Salehi", "Mohamadreza Salehi"],
};

export const SEO: Record<
  Lang,
  { title: string; description: string; keywords: string; path: string; locale: string; imageAlt: string }
> = {
  fa: {
    title: "محمدرضا صالحی (محمد صالحی) | برنامه‌نویس پایتون و توسعه‌دهنده بک‌اند",
    description:
      "وب‌سایت رسمی محمدرضا صالحی (محمد صالحی)، برنامه‌نویس پایتون و توسعه‌دهنده بک‌اند با ۵ سال تجربه در FastAPI، جنگو، میکروسرویس، خزش وب و خطوط داده هوش مصنوعی. رزومه و راه‌های تماس.",
    keywords: [
      ...NAME_VARIANTS.fa,
      "محمدرضا صالحی برنامه نویس",
      "محمد صالحی برنامه نویس",
      "محمدصالحی برنامه نویس",
      "برنامه نویس پایتون",
      "توسعه دهنده بک اند",
      "رزومه محمدرضا صالحی",
      "Mohammadreza Salehi",
    ].join("، "),
    path: "/",
    locale: "fa_IR",
    imageAlt: "محمدرضا صالحی (محمد صالحی)، برنامه‌نویس پایتون و توسعه‌دهنده بک‌اند",
  },
  en: {
    title: "Mohammadreza Salehi (Mohammad Salehi) — Python Backend Developer",
    description:
      "Official site of Mohammadreza Salehi (Mohammad Salehi), a Python backend developer with 5 years of experience in FastAPI, Django, microservices, web scraping and AI data pipelines. CV and contact.",
    keywords: [
      ...NAME_VARIANTS.en,
      "Mohammad Salehi developer",
      "Mohammadreza Salehi programmer",
      "Python backend developer",
      "محمدرضا صالحی",
    ].join(", "),
    path: "/en/",
    locale: "en_US",
    imageAlt: "Mohammadreza Salehi (Mohammad Salehi), Python backend developer",
  },
};

export const langFromPath = (pathname: string): Lang => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fa");
