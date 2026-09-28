import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// Avatar upload endpoint
app.post('/api/upload-avatar', (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (imageBase64) {
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(__dirname, 'public', 'profile.jpg'), buffer);
      if (fs.existsSync(path.join(__dirname, 'dist'))) {
        fs.writeFileSync(path.join(__dirname, 'dist', 'profile.jpg'), buffer);
      }
      return res.status(200).json({ success: true, path: '/profile.jpg' });
    }
    return res.status(400).json({ error: 'Missing imageBase64' });
  } catch (err) {
    console.error('Upload avatar error:', err);
    return res.status(500).json({ error: 'Server error saving image' });
  }
});

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

// Single Page Application fallback to index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running at http://0.0.0.0:${PORT}`);
});
