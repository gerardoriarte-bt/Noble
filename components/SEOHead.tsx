import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

/**
 * Componente para manejar meta tags dinámicos
 * Útil para futuras páginas o secciones específicas
 */
const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Noble Architecture Studio | Creadores de Hitos Arquitectónicos',
  description = 'Estudio de arquitectura especializado en crear proyectos residenciales y comerciales que encarnan rectitud, dignidad y una presencia atemporal. Más de 20 años de experiencia en Cartagena y Bogotá.',
  image = 'https://noble.com/image/hero-background.jpg',
  url = 'https://noble.com',
  type = 'website'
}) => {
  React.useEffect(() => {
    // Actualizar título
    if (title) {
      document.title = title;
    }

    // Actualizar o crear meta tags dinámicamente
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Meta tags básicos
    updateMetaTag('description', description);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:url', url);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, image, url, type]);

  return null;
};

export default SEOHead;

