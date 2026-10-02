import { useEffect } from "react";
import { Lang, SEO, SITE_URL } from "../data/seo";

interface SeoHeadProps {
  lang: Lang;
}

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

/** Keeps head tags in sync when the language is switched client-side (the static HTML is prerendered per language). */
export default function SeoHead({ lang }: SeoHeadProps) {
  useEffect(() => {
    const { title, description, path, locale, imageAlt } = SEO[lang];
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", url, true);
    setMeta("og:locale", locale, true);
    setMeta("og:locale:alternate", SEO[lang === "fa" ? "en" : "fa"].locale, true);
    setMeta("og:image:alt", imageAlt, true);
    setMeta("twitter:image:alt", imageAlt);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  return null;
}
