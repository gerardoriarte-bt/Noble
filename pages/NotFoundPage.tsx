import React from 'react';

// ============================================================================
// [PÁGINA] NotFoundPage - Ruta inexistente (se publica como 404.html)
// ============================================================================
const NotFoundPage: React.FC = () => (
  <section className="min-h-[70vh] pt-36 md:pt-44 pb-20 flex items-center">
    <div className="container mx-auto px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-noir/50 mb-4">Error 404</p>
      <h1 className="text-4xl md:text-6xl font-serif text-noir font-light mb-6">Página no encontrada</h1>
      <p className="text-noir/60 mb-10">La página que buscas no existe o fue movida.</p>
      <div className="flex justify-center gap-8 text-sm uppercase tracking-widest">
        <a href="/" className="text-noir/70 hover:text-noir underline underline-offset-4">Inicio</a>
        <a href="/#proyectos" className="text-noir/70 hover:text-noir underline underline-offset-4">Proyectos</a>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
