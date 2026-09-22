# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build to dist/ (client build + SSR bundle + prerender of every route)
npm run preview    # Preview the production build locally
```

No linting or test scripts are configured.

## Architecture

React + TypeScript app built with Vite, pre-rendered to static HTML at build time. There is no router library — `App.tsx` receives a `path` prop and resolves it with `resolveRoute()` from `seo/head.ts`:

- `/` → `HomePage`
- `/proyecto/<slug>` → `ProjectPage` (one page per project; singular `proyecto` to avoid a case-insensitive clash with the `public/Proyectos/` image folder)
- anything else → `NotFoundPage` (published as `404.html`)

**Data** lives in `data/projects.ts` (with `slug` and `seoDescription`) and `data/team.ts`. These are the single source for the carousel, the project pages, the schema.org JSON-LD and the sitemap — adding a project there is enough.

**Pre-rendering:** `npm run build` runs `vite build`, then `vite build --ssr entry-server.tsx --outDir dist-ssr`, then `scripts/prerender.mjs`, which renders each route with `renderToString`, replaces the `<!--seo:start-->…<!--seo:end-->` block and `<!--app-html-->` in `dist/index.html`, and writes `dist/proyecto/<slug>.html`, `dist/404.html` and `dist/sitemap.xml`. `index.tsx` hydrates when the root already has markup (production) and does a normal render otherwise (dev). Per-route `<head>` tags and JSON-LD are built in `seo/head.ts`. Code that runs during render must not touch `window`/`document` (use effects/handlers).

**Component layout (top to bottom on the page):**

```
App.tsx
  Header
  HomePage         (or ProjectPage / NotFoundPage)
    PerfectHero    — full-screen hero with parallax scroll (framer-motion useScroll/useTransform)
    Metrics
    HorizontalTimeline  — the main projects section (see below)
    Team
    Contact
  Footer
```

**HorizontalTimeline** is the most complex component. It implements a synchronized dual-carousel:
- Left panel (1/3 width, desktop): vertical scroll through project cards
- Right panel (2/3 width, desktop): horizontal scroll through large project images
- Both carousels share `activeIndex` state and use `isSyncingRef` to prevent feedback loops during programmatic scroll
- Mobile: replaces both panels with a single full-width horizontal card carousel

The "Ver Detalles" buttons are real links to `/proyecto/<slug>` (crawlable) that open the modal on a normal click.

## Styling

Tailwind CSS with a custom palette defined in `tailwind.config.js`:

| Token    | Hex       | Usage                   |
|----------|-----------|-------------------------|
| `noir`   | `#121212` | Primary text / borders  |
| `cloud`  | `#f2f2f1` | Page background         |
| `fossil` | `#373c37` | Dark accent             |
| `khaki`  | `#B2806d` | Warm accent             |
| `camel`  | `#b9a695` | Secondary warm          |
| `stone`  | `#e6dfda` | Light warm surface      |

Custom font: `CasagrandeCasabau` (loaded via `index.css`), set as both `font-sans` and `font-serif`.

## Assets & Image Paths

Static assets live in `public/` and are referenced by absolute path from root (e.g. `/Proyectos/DOMINIQUE/IMG-GENERAL.png`). Project images are organized as:

```
public/
  Proyectos/
    DOMINIQUE/   IMG-GENERAL.png, IMG-INTERNA.png
    MARTINIQUE/  ...
    ANTIQUE/     ...
    BARUQ/       ...
    EMAUS/       IMG-GENERAL.png, IMG-INTERNA.jpeg
    SERREZUELA/  ...
  Equipo/        juan-carlos.jpeg, ingrid-kemes.jpeg, ...  (web-safe lowercase names)
  image/         hero-background.jpg, landscape.png
```

**Case sensitivity matters for Vercel deployment.** File names in `public/` must exactly match what's referenced in code. Team member images were previously broken due to case mismatches — they now use lowercase web-safe names in `public/Equipo/`.

## Build & Deployment

Vite bundles output to `dist/` with manual chunks splitting React (`react-vendor`) and Framer Motion (`framer-motion`) into separate files. The site is deployed to Vercel. `vercel.json` sets `cleanUrls` so `/proyecto/<slug>` serves `proyecto/<slug>.html`. (`public/_redirects` is a Netlify file and has no effect on Vercel.)

`deploy-noble.sh` and `ec2-setup-noble.sh` are legacy scripts for an EC2 deployment — not the current deployment path.
