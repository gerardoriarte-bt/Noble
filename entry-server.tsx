import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { resolveRoute, renderHeadTags, renderSitemap, prerenderPaths } from './seo/head';

// Punto de entrada para el pre-renderizado (vite build --ssr). Ver scripts/prerender.mjs.
export const render = (path: string) => {
  const route = resolveRoute(path);
  return {
    html: renderToString(
      <React.StrictMode>
        <App path={path} />
      </React.StrictMode>
    ),
    head: renderHeadTags(route),
  };
};

export { renderSitemap, prerenderPaths };
