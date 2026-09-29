import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/outfit';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/vazirmatn';
import App from './App.tsx';
import { langFromPath } from './data/seo';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App initialLang={langFromPath(window.location.pathname)} />
  </StrictMode>
);

// Production HTML is prerendered (see scripts/prerender.mjs); dev serves an empty root.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
