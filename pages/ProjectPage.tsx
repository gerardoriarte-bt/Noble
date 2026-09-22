import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import { projects, type Project } from '../data/projects';

// ============================================================================
// [PÁGINA] ProjectPage - Página propia de cada proyecto (/proyecto/<slug>)
// ============================================================================
const ProjectPage: React.FC<{ project: Project }> = ({ project }) => {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const paragraphs = (project.detailedDescription || project.description).split(/\n\s*\n/);

  const index = projects.findIndex((p) => p.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <article className="pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          {/* Migas de pan */}
          <nav aria-label="Ruta de navegación" className="mb-8 text-xs uppercase tracking-widest text-noir/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="hover:text-noir transition-colors">Inicio</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="/#proyectos" className="hover:text-noir transition-colors">Proyectos</a></li>
              <li aria-hidden="true">/</li>
              <li className="text-noir/80" aria-current="page">{project.title}</li>
            </ol>
          </nav>

          {/* Título */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-noir font-light mb-3">{project.title}</h1>
            <p className="text-sm text-noir/50 uppercase tracking-widest">
              {project.location} · {project.year}
            </p>
          </motion.header>

          {/* Imagen principal */}
          <div className="mb-12 md:mb-16 bg-noir/5 overflow-hidden rounded-sm">
            <img
              src={encodeURI(project.horizontalImage || project.image)}
              alt={`Proyecto ${project.title} - ${project.location} | Noble Architecture Studio`}
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
          </div>

          {/* Descripción y especificaciones */}
          <div className="grid md:grid-cols-[1fr_22rem] gap-12 md:gap-16 mb-16 md:mb-20">
            <section>
              <h2 className="text-xs uppercase tracking-widest text-noir/50 mb-4 font-light">Sobre el proyecto</h2>
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="text-base md:text-lg text-noir/70 leading-relaxed font-light mb-5">
                  {paragraph}
                </p>
              ))}
            </section>

            <aside>
              {project.specifications && project.specifications.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xs uppercase tracking-widest text-noir/50 mb-4 font-light">Especificaciones</h2>
                  <ul className="divide-y divide-noir/10 border-y border-noir/10">
                    {project.specifications.map((spec, i) => (
                      <li key={i} className="py-3 text-sm text-noir/70 font-light">{spec}</li>
                    ))}
                  </ul>
                </section>
              )}
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-noir/50 uppercase tracking-widest text-xs mb-1">Año</dt>
                  <dd className="text-noir font-light">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-noir/50 uppercase tracking-widest text-xs mb-1">Ubicación</dt>
                  <dd className="text-noir font-light">{project.location}</dd>
                </div>
              </dl>
            </aside>
          </div>

          {/* Galería */}
          {gallery.length > 1 && (
            <section className="mb-16 md:mb-20">
              <h2 className="text-xs uppercase tracking-widest text-noir/50 mb-6 font-light">Galería</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {gallery.map((image, i) => (
                  <div key={image} className="bg-noir/5 overflow-hidden rounded-sm aspect-[4/3]">
                    <img
                      src={encodeURI(image)}
                      alt={`Proyecto ${project.title} - ${project.location} - Imagen ${i + 1} | Noble Architecture Studio`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Otros proyectos */}
          <nav aria-label="Otros proyectos" className="flex justify-between gap-6 pt-8 border-t border-noir/10">
            <a href={`/proyecto/${previous.slug}`} className="group text-left">
              <span className="block text-xs uppercase tracking-widest text-noir/50 mb-1">← Anterior</span>
              <span className="text-xl md:text-2xl font-serif text-noir/80 group-hover:text-noir transition-colors">{previous.title}</span>
            </a>
            <a href={`/proyecto/${next.slug}`} className="group text-right">
              <span className="block text-xs uppercase tracking-widest text-noir/50 mb-1">Siguiente →</span>
              <span className="text-xl md:text-2xl font-serif text-noir/80 group-hover:text-noir transition-colors">{next.title}</span>
            </a>
          </nav>
        </div>
      </article>
      <Contact />
    </>
  );
};

export default ProjectPage;
