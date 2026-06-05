# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build to dist/
npm run preview    # Preview the production build locally
```

No linting or test scripts are configured.

## Architecture

Single-page React + TypeScript app built with Vite. There is no router library — `App.tsx` uses a manual `switch` on `window.location.pathname`. Currently only one route (`/`) renders `HomePage`.

**Component layout (top to bottom on the page):**

```
App.tsx
  SEOHead          — dynamically sets document title + OG meta tags via useEffect
  Header
  HomePage
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

Project data is co-located as `timelineData` array inside `HorizontalTimeline.tsx` — no separate data file.

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

Vite bundles output to `dist/` with manual chunks splitting React (`react-vendor`) and Framer Motion (`framer-motion`) into separate files. The site is deployed to Vercel. `public/_redirects` handles SPA routing fallback.

`deploy-noble.sh` and `ec2-setup-noble.sh` are legacy scripts for an EC2 deployment — not the current deployment path.
