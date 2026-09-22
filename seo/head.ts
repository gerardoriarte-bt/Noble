import { projects, getProjectBySlug, type Project } from '../data/projects';
import { teamMembers } from '../data/team';

// ============================================================================
// [SEO] Etiquetas <head> y schema.org por ruta. Se usa al pre-renderizar
// (scripts/prerender.mjs), así cada página sale con su propio HTML.
// ============================================================================

export const SITE_URL = 'https://nobleproyectos.com';
const SITE_NAME = 'Noble Proyectos';
const DEFAULT_TITLE = 'Noble Proyectos | Estudio de Arquitectura en Cartagena y Bogotá';
const DEFAULT_DESCRIPTION =
  'Estudio de arquitectura especializado en crear proyectos residenciales y comerciales que encarnan rectitud, dignidad y una presencia atemporal. Más de 20 años de experiencia en Cartagena y Bogotá.';
const DEFAULT_IMAGE = `${SITE_URL}/image/og-image.jpg`;

export const projectPath = (project: Project) => `/proyecto/${project.slug}`;
const absolute = (path: string) => `${SITE_URL}${encodeURI(path)}`;

interface HeadData {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
  robots?: string;
  jsonLd: object[];
}

const organization = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'Noble Architecture Studio',
  url: SITE_URL,
  logo: `${SITE_URL}/Noble-logo-blanco.png`,
  image: DEFAULT_IMAGE,
  description:
    'Estudio de arquitectura especializado en crear proyectos residenciales y comerciales que encarnan rectitud, dignidad y una presencia atemporal.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
    addressLocality: 'Cartagena de Indias',
    addressRegion: 'Bolívar',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'estudio@nobleproyectos.com',
  },
  sameAs: [
    'https://www.instagram.com/noble_proyectos/',
    'https://www.linkedin.com/in/noble-proyectos-260a62375/',
    'https://www.facebook.com/profile.php?id=61578608248209',
    'https://www.youtube.com/@Nobleproyectos',
    'https://co.pinterest.com/nobleproyectos/',
  ],
  foundingDate: '2004',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: teamMembers.length },
  areaServed: [
    { '@type': 'City', name: 'Cartagena de Indias' },
    { '@type': 'City', name: 'Bogotá' },
    { '@type': 'Country', name: 'Colombia' },
  ],
  employee: teamMembers.map((member) => ({
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    image: absolute(member.image),
  })),
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'es-CO',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const projectSchema = (project: Project) => ({
  '@type': 'CreativeWork',
  '@id': `${SITE_URL}${projectPath(project)}#proyecto`,
  name: project.title,
  url: `${SITE_URL}${projectPath(project)}`,
  description: project.seoDescription,
  image: (project.gallery ?? [project.image]).map(absolute),
  dateCreated: String(project.year),
  locationCreated: { '@type': 'Place', name: project.location },
  creator: { '@id': `${SITE_URL}/#organization` },
});

const homeHead = (): HeadData => ({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: '/',
  image: DEFAULT_IMAGE,
  imageAlt: 'Noble Architecture Studio - Proyectos arquitectónicos de excelencia',
  type: 'website',
  jsonLd: [
    organization,
    website,
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Proyectos de Noble Proyectos',
      url: `${SITE_URL}/#proyectos`,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}${projectPath(project)}`,
        name: project.title,
      })),
    },
  ],
});

const projectHead = (project: Project): HeadData => ({
  title: `${project.title} · ${project.location} | Noble Proyectos`,
  description: project.seoDescription,
  path: projectPath(project),
  image: absolute(project.horizontalImage || project.image),
  imageAlt: `Proyecto ${project.title} - ${project.location}`,
  type: 'article',
  jsonLd: [
    organization,
    { '@context': 'https://schema.org', ...projectSchema(project) },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Proyectos', item: `${SITE_URL}/#proyectos` },
        { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}${projectPath(project)}` },
      ],
    },
  ],
});

const notFoundHead = (): HeadData => ({
  title: 'Página no encontrada | Noble Proyectos',
  description: DEFAULT_DESCRIPTION,
  path: '/404',
  image: DEFAULT_IMAGE,
  imageAlt: 'Noble Architecture Studio',
  type: 'website',
  robots: 'noindex, follow',
  jsonLd: [],
});

// ============================================================================
// [ROUTING] Resolución de rutas compartida entre App y el pre-renderizado
// ============================================================================
export type Route =
  | { kind: 'home' }
  | { kind: 'project'; project: Project }
  | { kind: 'not-found' };

export const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path) || '/';

export const resolveRoute = (rawPath: string): Route => {
  const path = normalizePath(rawPath);
  if (path === '/' || path === '/index.html') return { kind: 'home' };
  const match = path.match(/^\/proyecto\/([^/]+)$/);
  const project = match ? getProjectBySlug(decodeURIComponent(match[1])) : undefined;
  return project ? { kind: 'project', project } : { kind: 'not-found' };
};

const headFor = (route: Route): HeadData => {
  if (route.kind === 'home') return homeHead();
  if (route.kind === 'project') return projectHead(route.project);
  return notFoundHead();
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// JSON dentro de <script>: evitar que "</script>" cierre la etiqueta
const safeJson = (value: object) => JSON.stringify(value, null, 2).replace(/</g, '\\u003c');

export const renderHeadTags = (route: Route): string => {
  const head = headFor(route);
  const url = `${SITE_URL}${head.path === '/' ? '/' : head.path}`;
  const t = escapeHtml(head.title);
  const d = escapeHtml(head.description);
  const img = escapeHtml(head.image);
  const alt = escapeHtml(head.imageAlt);
  const tags = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${head.robots ?? 'index, follow'}" />`,
    route.kind === 'not-found' ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${head.type}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${img}" />`,
    head.image === DEFAULT_IMAGE
      ? '<meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:type" content="image/jpeg" />'
      : '',
    `<meta property="og:image:alt" content="${alt}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    '<meta property="og:locale" content="es_CO" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<meta name="twitter:image:alt" content="${alt}" />`,
    route.kind === 'home' ? '<link rel="preload" as="image" href="/image/hero-background.webp" fetchpriority="high" />' : '',
    ...head.jsonLd.map((block) => `<script type="application/ld+json">\n${safeJson(block)}\n    </script>`),
  ];
  return tags.filter(Boolean).join('\n    ');
};

// ============================================================================
// [SITEMAP] Generado a partir de los mismos datos de proyectos
// ============================================================================
export const prerenderPaths = (): string[] => ['/', ...projects.map(projectPath)];

export const renderSitemap = (lastmod: string): string => {
  const imageTag = (path: string, title: string) =>
    `    <image:image>\n      <image:loc>${escapeHtml(absolute(path))}</image:loc>\n      <image:title>${escapeHtml(title)}</image:title>\n    </image:image>`;
  const urlTag = (path: string, images: string[]) =>
    `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n${images.join('\n')}\n  </url>`;

  const urls = [
    urlTag('/', [imageTag('/image/hero-background.webp', 'Noble Proyectos - Estudio de arquitectura en Cartagena y Bogotá')]),
    ...projects.map((project) =>
      urlTag(
        projectPath(project),
        (project.gallery ?? [project.image]).map((image, i) =>
          imageTag(image, `Proyecto ${project.title} - ${project.location} (imagen ${i + 1})`)
        )
      )
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
};
