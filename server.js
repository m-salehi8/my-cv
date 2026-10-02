import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { contactRouter } from './server/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(compression());

app.use((_req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
  });
  next();
});

// One origin and one URL per language: www → apex, and the old `?lang=` URLs → their real paths.
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('www.')) {
    return res.redirect(301, `https://${host.slice(4)}${req.originalUrl}`);
  }
  if (req.path === '/' && (req.query.lang === 'en' || req.query.lang === 'fa')) {
    return res.redirect(301, req.query.lang === 'en' ? '/en/' : '/');
  }
  next();
});

// Hashed build assets never change: cache for a year. Everything else revalidates.
app.use(
  express.static(path.join(__dirname, 'dist'), {
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (/\.(?:jpe?g|webp|avif|png|svg|ico|pdf)$/i.test(filePath)) {
        res.set('Cache-Control', 'public, max-age=86400');
      } else {
        res.set('Cache-Control', 'no-cache');
      }
    },
  })
);

app.use(contactRouter);

// Health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

// Unknown paths get a real 404 status (the page itself is served so visitors can navigate back).
app.get('*', (_req, res) => {
  res.set({ 'Cache-Control': 'no-cache', 'X-Robots-Tag': 'noindex' });
  res.status(404).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running at http://0.0.0.0:${PORT}`);
});
