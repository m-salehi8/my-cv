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
    html = replaceTag(html, /<div id="root"><\/div>/, `<div id="root">${await render(lang)}</div>`);

    const outDir = lang === 'fa' ? dist : path.join(dist, 'en');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log(`prerendered ${meta.path} (${(html.length / 1024).toFixed(1)} kB)`);
  }
} finally {
  await vite.close();
}
