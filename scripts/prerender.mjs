// Pre-renderiza cada ruta a HTML estático después de `vite build`.
// Usa el bundle SSR (dist-ssr/entry-server.js) y la plantilla dist/index.html.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, renderSitemap, prerenderPaths } = await import(path.join(ssrDir, 'entry-server.js'));
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template) || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html no tiene los marcadores <!--seo:start--> / <!--app-html-->');
}

const page = (url) => {
  const { html, head } = render(url);
  return template.replace(SEO_BLOCK, head).replace('<!--app-html-->', html);
};

const write = (file, contents) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
  console.log(`  prerender  ${path.relative(root, file)}`);
};

for (const url of prerenderPaths()) {
  write(path.join(dist, url === '/' ? 'index.html' : `${url}.html`), page(url));
}
write(path.join(dist, '404.html'), page('/404'));
write(path.join(dist, 'sitemap.xml'), renderSitemap(new Date().toISOString().slice(0, 10)));

fs.rmSync(ssrDir, { recursive: true, force: true });
