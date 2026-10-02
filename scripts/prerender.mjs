// Renders the React app to static HTML for `/` (fa) and `/en/` (en) after `vite build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const vite = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
  logLevel: 'error',
});

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`prerender: pattern not found ${pattern}`);
  return html.replace(pattern, replacement);
};

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const { SEO, SITE_URL } = await vite.ssrLoadModule('/src/data/seo.ts');
  const { buildJsonLd } = await vite.ssrLoadModule('/src/data/structuredData.ts');

  // The face that paints the headline in each language; preloading it avoids a late font swap.
  const assets = fs.readdirSync(path.join(dist, 'assets'));
  const fontFor = { fa: /^vazirmatn-arabic-wght-normal-.*\.woff2$/, en: /^outfit-latin-wght-normal-.*\.woff2$/ };

  for (const lang of ['fa', 'en']) {
    const meta = SEO[lang];
    const url = `${SITE_URL}${meta.path}`;
    let html = template;

    html = replaceTag(html, /<html lang="fa" dir="rtl">/, `<html lang="${lang}" dir="${lang === 'fa' ? 'rtl' : 'ltr'}">`);
    html = replaceTag(html, /<title>.*?<\/title>/s, `<title>${escapeAttr(meta.title)}</title>`);
    html = replaceTag(html, /(<meta\s+name="description"\s+content=")[^"]*(")/s, `$1${escapeAttr(meta.description)}$2`);
    html = replaceTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
    html = replaceTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
    html = replaceTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(meta.title)}$2`);
    html = replaceTag(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/s, `$1${escapeAttr(meta.description)}$2`);
    html = replaceTag(html, /(<meta property="og:locale" content=")[^"]*(")/, `$1${meta.locale}$2`);
    html = replaceTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(meta.title)}$2`);
    html = replaceTag(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/s, `$1${escapeAttr(meta.description)}$2`);
    const other = lang === 'fa' ? 'en' : 'fa';
    html = replaceTag(html, /(<meta property="og:locale:alternate" content=")[^"]*(")/, `$1${SEO[other].locale}$2`);
    html = replaceTag(html, /(<meta property="og:image:alt" content=")[^"]*(")/, `$1${escapeAttr(meta.imageAlt)}$2`);
    html = replaceTag(html, /(<meta name="twitter:image:alt" content=")[^"]*(")/, `$1${escapeAttr(meta.imageAlt)}$2`);

    const font = assets.find((f) => fontFor[lang].test(f));
    const preload = font ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />\n    ` : '';
    // `<` is escaped so the JSON can never close the script element early.
    const jsonLd = JSON.stringify(buildJsonLd(lang)).replace(/</g, '\\u003c');
    html = replaceTag(
      html,
      /<!-- structured-data -->/,
      `${preload}<script type="application/ld+json">${jsonLd}</script>`
    );
    html = replaceTag(html, /<div id="root"><\/div>/, `<div id="root">${await render(lang)}</div>`);

    const outDir = lang === 'fa' ? dist : path.join(dist, 'en');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log(`prerendered ${meta.path} (${(html.length / 1024).toFixed(1)} kB)`);
  }

  // Sitemap lists both language URLs, each carrying the full hreflang set.
  const today = new Date().toISOString().slice(0, 10);
  const alternates = ['fa', 'en']
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${SEO[l].path}" />`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`)
    .join('\n');
  const urls = ['fa', 'en']
    .map(
      (l) => `  <url>
    <loc>${SITE_URL}${SEO[l].path}</loc>
${alternates}
    <lastmod>${today}</lastmod>
    <image:image>
      <image:loc>${SITE_URL}/profile.jpg</image:loc>
    </image:image>
  </url>`
    )
    .join('\n');
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
  );
  console.log('wrote sitemap.xml');
} finally {
  await vite.close();
}
