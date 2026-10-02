import express from 'express';

const router = express.Router();

// Contact form -> Telegram. The bot token lives only in server env vars.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();

const clip = (v, max) => String(v ?? '').trim().slice(0, max);

router.post('/api/contact', express.json({ limit: '10kb' }), async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(503).json({ ok: false });

  // Honeypot: bots fill the hidden field; pretend success so they move on.
  if (req.body?.website) return res.json({ ok: true });

  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return res.status(429).json({ ok: false });
  recent.push(now);
  hits.set(ip, recent);

  const name = clip(req.body?.name, 100);
  const contact = clip(req.body?.contact, 200);
  const message = clip(req.body?.message, 3000);
  const type = clip(req.body?.type, 100);
  if (!name || !contact || !message) return res.status(400).json({ ok: false });

  const text = [
    '📩 پیام جدید از رزومه',
    `👤 ${name}`,
    `📞 ${contact}`,
    type && `🏷 ${type}`,
    '',
    message,
  ]
    .filter((l) => l !== false)
    .join('\n');

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    if (!r.ok) throw new Error(`telegram ${r.status}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('contact relay failed:', err.message);
    res.status(502).json({ ok: false });
  }
});

export const contactRouter = router;
