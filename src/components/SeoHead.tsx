import { useEffect } from "react";

interface SeoHeadProps {
  lang: "en" | "fa";
}

export default function SeoHead({ lang }: SeoHeadProps) {
  useEffect(() => {
    const isFa = lang === "fa";

    // 1. Dynamic Document Title
    const title = isFa
      ? "محمدرضا صالحی | توسعه‌دهنده بک‌اند و مهندس پایتون — Mohammadreza Salehi"
      : "Mohammadreza Salehi — Senior Backend Developer & Python Engineer";
    document.title = title;

    // 2. Dynamic Meta Description
    const description = isFa
      ? "وب‌سایت و رزومه رسمی محمدرضا صالحی: برنامه‌نویس پایتون، توسعه‌دهنده ارشد بک‌اند، متخصص FastAPI، جنگو، داکر، میکروسرویس، خزش خودکار وب و خطوط داده هوش مصنوعی."
      : "Portfolio and CV of Mohammadreza Salehi: Python backend developer specializing in FastAPI, Django, microservices, high-throughput web scraping, and AI data pipelines.";

    const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, nameOrProperty);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", value);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("og:locale", isFa ? "fa_IR" : "en_US", true);

    // 3. Dynamic Canonical URL
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      const canonicalUrl = `${window.location.origin}${window.location.pathname}${
        isFa ? "?lang=fa" : "?lang=en"
      }`;
      canonicalLink.href = canonicalUrl;
    }

    // 4. HTML Attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isFa ? "rtl" : "ltr";
  }, [lang]);

  return null;
}
