import { renderToString } from 'react-dom/server';
import App from './App';
import type { Lang } from './data/seo';

export function render(lang: Lang): string {
  return renderToString(<App initialLang={lang} />);
}
