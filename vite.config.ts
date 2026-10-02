import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';
import express from 'express';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command, mode }) => {
  // Expose .env to the dev-only contact API (same handler production uses).
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  const contactApi: Plugin = {
    name: 'contact-api',
    apply: 'serve',
    async configureServer(server) {
      const { contactRouter } = await import('./server/contact.js');
      const api = express();
      api.use(contactRouter);
      server.middlewares.use(api);
    },
  };

  const isAnalyze = process.env.ANALYZE === 'true';

  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(command === 'build' ? 'production' : (process.env.NODE_ENV || 'development')),
    },
    plugins: [
      react(),
      contactApi,
      tailwindcss(),
      ...(isAnalyze
        ? [
            visualizer({
              filename: 'dist/stats.html',
              gzipSize: true,
              brotliSize: true,
              open: false,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(import.meta.dirname, '.') },
      ],
    },
    build: {
      target: 'es2022',
      sourcemap: false,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'vendor-react',
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
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
