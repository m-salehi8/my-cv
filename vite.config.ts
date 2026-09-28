import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function avatarUploadPlugin(): Plugin {
  return {
    name: 'avatar-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-avatar', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { imageBase64 } = JSON.parse(body);
              if (imageBase64) {
                const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(path.resolve(process.cwd(), 'public/profile.jpg'), buffer);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, path: '/profile.jpg' }));
                return;
              }
            } catch (err) {
              console.error('Avatar upload error:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), avatarUploadPlugin()],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(import.meta.dirname, '.') },
        {
          find: /^lottie-web(\/build\/player\/(lottie|lottie_svg)(\.js)?)?$/,
          replacement: path.resolve(import.meta.dirname, 'node_modules/lottie-web/build/player/lottie_light.js'),
        },
      ],
    },
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'vendor-react',
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              },
              {
                name: 'vendor-motion',
                test: /[\\/]node_modules[\\/]motion[\\/]/,
              },
              {
                name: 'vendor-lottie',
                test: /[\\/]node_modules[\\/](lottie-web|lottie-react)[\\/]/,
              },
              {
                name: 'vendor-pdf',
                test: /[\\/]node_modules[\\/]pdf-lib[\\/]/,
              },
            ],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
