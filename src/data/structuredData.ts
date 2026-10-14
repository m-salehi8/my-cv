import { EXPERIENCE, PROFILE, SKILLS, SOCIALS } from "./resume";
import { Lang, NAME_VARIANTS, SEO, SITE_URL } from "./seo";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** schema.org graph for one language version of the page (injected by scripts/prerender.mjs). */
export function buildJsonLd(lang: Lang) {
  const page = SEO[lang];
  const url = `${SITE_URL}${page.path}`;
  const inLanguage = lang === "fa" ? "fa-IR" : "en-US";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: lang === "fa" ? "محمدرضا صالحی" : PROFILE.fullName,
        alternateName: [...NAME_VARIANTS.fa, ...NAME_VARIANTS.en].filter(
          (n) => n !== (lang === "fa" ? "محمدرضا صالحی" : PROFILE.fullName)
        ),
        givenName: lang === "fa" ? "محمدرضا" : "Mohammadreza",
        familyName: lang === "fa" ? "صالحی" : "Salehi",
        jobTitle: lang === "fa" ? ["برنامه‌نویس پایتون", "توسعه‌دهنده بک‌اند"] : ["Python Developer", "Backend Developer"],
        hasOccupation: {
          "@type": "Occupation",
          name: lang === "fa" ? "برنامه‌نویس و توسعه‌دهنده بک‌اند" : "Software Developer (Backend)",
          occupationalCategory: "15-1252.00",
        },
        description: lang === "fa" ? PROFILE.faSummary : PROFILE.summary,
        image: `${SITE_URL}/profile.jpg`,
        url: SITE_URL + "/",
        email: `mailto:${PROFILE.email}`,
        telephone: PROFILE.phoneHref.replace("tel:", ""),
        address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
        sameAs: SOCIALS.map((s) => s.href),
        worksFor: EXPERIENCE.filter((e) => e.period === "Present").map((e) => ({
          "@type": "Organization",
          name: e.company,
        })),
        knowsAbout: SKILLS.flatMap((c) => c.items),
        knowsLanguage: ["fa", "en"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL + "/",
        name: lang === "fa" ? "محمدرضا صالحی" : "Mohammadreza Salehi",
        alternateName: [...NAME_VARIANTS.fa, ...NAME_VARIANTS.en],
        inLanguage: ["fa-IR", "en-US"],
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/profile.jpg`, width: 760, height: 815 },
      },
    ],
  };
}
