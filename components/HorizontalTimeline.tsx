import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// [INTERFACE] TimelineItem - Estructura de datos para cada proyecto
// ============================================================================
interface TimelineItem {
  year: number;
  title: string;
  description: string;
  image: string;
  location: string;
}

// ============================================================================
// [DATA] timelineData - Array con la información de los proyectos
// ============================================================================
const timelineData: TimelineItem[] = [
  {
    year: 2025,
    title: "Baltique",
    description: "EDIFICIO DE 13 PISOS | 165 APARTAMENTOS | 1 Y 2 HAB. DE 50 M2 A 105 M2",
    image: "IMG/Baltique.jpg",
    location: "DESARROLLO - GERENCIA - DISEÑO - CONSTRUCCIÓN - OPERACIÓN TURÍSTICA"
  },
  {
    year: 2024,
    title: "Matinique",
    description: "| EDIFICIO DE 15 PISOS | 99 APARTAMENTOS | 1 Y 2 HAB. DE 65 M2 A 110 M2",
    image: "/IMG/martinique.jpg",
    location: "DESARROLLO - GERENCIA - DISEÑO - CONSTRUCCIÓN - OPERACIÓN TURÍSTICA"
  },
  {
    year: 2025,
    title: "Dominique",
    description: "Expanded into commercial architecture with award-winning office spaces.",
    image: "/IMG/Dominique.jpg",
    location: "Monterrey"
  },
  {
    year: 2021,
    title: "La Serrezuela",
    description: "Designed our first cultural institution, blending tradition with modernity.",
    image: "/IMG/La-Serrezuela.jpg",
    location: "Oaxaca"
  },
  
];

// ============================================================================
// [COMPONENTE] HorizontalTimeline - Componente principal del timeline
// ============================================================================
const HorizontalTimeline: React.FC = () => {
  // ========================================================================
  // [REFs] Referencias a los elementos DOM del carrusel
  // ========================================================================
  const scrollRef = useRef<HTMLDivElement>(null); // Carrusel horizontal desktop
  const scrollRefMobile = useRef<HTMLDivElement>(null); // Carrusel horizontal mobile
  const leftScrollRef = useRef<HTMLDivElement>(null); // Contenedor scroll vertical izquierdo
  const leftCarouselRef = useRef<HTMLDivElement>(null); // Carrusel vertical izquierdo
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // Referencias a cada item del carrusel
  
  // ========================================================================
  // [STATE] Estado del componente
  // ========================================================================
  const [activeIndex, setActiveIndex] = useState(0); // Índice del proyecto activo
  const prevActiveIndexRef = useRef(activeIndex); // Índice anterior para comparaciones
  const isSyncingRef = useRef(false); // Bandera para evitar loops durante sincronización

  // Intersection Observer deshabilitado - usando solo scroll handlers para mejor control
  // El Intersection Observer puede interferir con la sincronización manual

  // ========================================================================
  // [HANDLER] handleHorizontalScroll - Maneja el scroll del carrusel horizontal
  // ========================================================================
  const handleHorizontalScroll = React.useCallback(() => {
    if (isSyncingRef.current) {
      return;
    }
    
    // Intentar con el ref de desktop primero, luego mobile
    const scrollElement = scrollRef.current || scrollRefMobile.current;
    
    if (scrollElement) {
      const scrollLeft = scrollElement.scrollLeft;
      const containerWidth = scrollElement.clientWidth;
      
      if (containerWidth === 0) return; // No hacer nada si el ancho es 0
      
      // Calcular el índice basado en la posición del scroll
      // Cada imagen ocupa 80vw del viewport (reducido para menos scroll)
      const GAP_SIZE = 2; // Separación fija en píxeles (no depende del tamaño de ventana)
      const viewportWidth = window.innerWidth; // Ancho completo del viewport
      const itemWidth = viewportWidth * 0.8; // Cada imagen ocupa 80vw (80% del viewport)
      const itemWidthWithGap = itemWidth + GAP_SIZE; // Cada imagen + separación
      const rawIndex = scrollLeft / itemWidthWithGap;
      let newIndex = Math.round(rawIndex);
      
      // Asegurar que el índice esté dentro de los límites válidos
      newIndex = Math.max(0, Math.min(newIndex, timelineData.length - 1));
      
      console.log('Scroll horizontal:', {
        scrollLeft,
        containerWidth,
        rawIndex,
        newIndex,
        activeIndex,
        totalProjects: timelineData.length
      });
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < timelineData.length) {
        console.log('Actualizando índice horizontal:', activeIndex, '->', newIndex);
        setActiveIndex(newIndex);
      }
    }
  }, [activeIndex]);

  // ========================================================================
  // [HANDLER] handleVerticalScroll - Maneja el scroll del carrusel vertical
  // ========================================================================
  const handleVerticalScroll = React.useCallback(() => {
    if (isSyncingRef.current) {
      return;
    }
    
    if (leftScrollRef.current) {
      const scrollTop = leftScrollRef.current.scrollTop;
      const containerHeight = leftScrollRef.current.clientHeight;
      
      if (containerHeight === 0) return; // No hacer nada si la altura es 0
      
      // Calcular el índice basado en la posición del scroll
      // Cada proyecto ocupa containerHeight (100vh), así que dividimos scrollTop por containerHeight
      const rawIndex = scrollTop / containerHeight;
      let newIndex = Math.round(rawIndex);
      
      // Asegurar que el índice esté dentro de los límites válidos
      newIndex = Math.max(0, Math.min(newIndex, timelineData.length - 1));
      
      console.log('Scroll vertical:', {
        scrollTop,
        containerHeight,
        rawIndex,
        newIndex,
        activeIndex,
        totalProjects: timelineData.length
      });
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < timelineData.length) {
        console.log('Actualizando índice vertical:', activeIndex, '->', newIndex);
        setActiveIndex(newIndex);
      }
    }
  }, [activeIndex]);

  // ========================================================================
  // [EFFECT] useEffect - Agrega listeners de scroll horizontal (Desktop y Mobile)
  // ========================================================================
  useEffect(() => {
    const scrollElementDesktop = scrollRef.current;
    const scrollElementMobile = scrollRefMobile.current;
    
    if (scrollElementDesktop) {
      scrollElementDesktop.addEventListener('scroll', handleHorizontalScroll, { passive: true });
    }
    if (scrollElementMobile) {
      scrollElementMobile.addEventListener('scroll', handleHorizontalScroll, { passive: true });
    }
    
    return () => {
      if (scrollElementDesktop) {
        scrollElementDesktop.removeEventListener('scroll', handleHorizontalScroll);
      }
      if (scrollElementMobile) {
        scrollElementMobile.removeEventListener('scroll', handleHorizontalScroll);
      }
    };
  }, [handleHorizontalScroll]);

  // ========================================================================
  // [EFFECT] useEffect - Agrega listener de scroll vertical (izquierda)
  // ========================================================================
  useEffect(() => {
    const scrollElement = leftScrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleVerticalScroll, { passive: true });
      return () => {
        scrollElement.removeEventListener('scroll', handleVerticalScroll);
      };
    }
  }, [handleVerticalScroll]);

  // ========================================================================
  // [EFFECT] useEffect - Sincronización bidireccional cuando cambia el proyecto activo
  // ========================================================================
  useEffect(() => {
    if (prevActiveIndexRef.current !== activeIndex) {
      prevActiveIndexRef.current = activeIndex;
      
      // Activar bandera de sincronización
      isSyncingRef.current = true;
      
      // Sincronizar el carrusel vertical de la izquierda
      if (leftScrollRef.current) {
        const containerHeight = leftScrollRef.current.clientHeight;
        const scrollHeight = leftScrollRef.current.scrollHeight;
        const maxScrollTop = scrollHeight - containerHeight;
        
        // Calcular la posición de scroll para el proyecto activo
        let expectedScrollTop = activeIndex * containerHeight;
        
        // Asegurar que no exceda el scroll máximo
        expectedScrollTop = Math.min(expectedScrollTop, maxScrollTop);
        
        // Asegurar que sea al menos 0
        expectedScrollTop = Math.max(0, expectedScrollTop);
        
        console.log('Sincronizando scroll vertical:', {
          activeIndex,
          containerHeight,
          scrollHeight,
          maxScrollTop,
          expectedScrollTop,
          currentScrollTop: leftScrollRef.current.scrollTop
        });
        
        leftScrollRef.current.scrollTo({
          top: expectedScrollTop,
          behavior: 'smooth'
        });
      }
      
      // Sincronizar el carrusel horizontal de la derecha (desktop y mobile)
      const syncHorizontalScroll = (element: HTMLDivElement | null) => {
        if (element) {
          const containerWidth = element.clientWidth;
          if (containerWidth > 0) {
            const scrollWidth = element.scrollWidth;
            const maxScrollLeft = scrollWidth - containerWidth;
            
            // Calcular la posición de scroll para el proyecto activo
            // Cada imagen ocupa 80vw del viewport (reducido para menos scroll)
            const GAP_SIZE = 2; // Separación fija en píxeles
            const viewportWidth = window.innerWidth; // Ancho completo del viewport
            const itemWidth = viewportWidth * 0.8; // Cada imagen ocupa 80vw (80% del viewport)
            const itemWidthWithGap = itemWidth + GAP_SIZE; // Cada imagen + separación
            // Posición de inicio de cada imagen: índice * (ancho de imagen + separación)
            let expectedScrollLeft = activeIndex * itemWidthWithGap;
            
            // Asegurar que no exceda el scroll máximo
            expectedScrollLeft = Math.min(expectedScrollLeft, maxScrollLeft);
            
            // Asegurar que sea al menos 0
            expectedScrollLeft = Math.max(0, expectedScrollLeft);
            
            console.log('Sincronizando scroll horizontal:', {
              activeIndex,
              containerWidth,
              scrollWidth,
              maxScrollLeft,
              expectedScrollLeft,
              currentScrollLeft: element.scrollLeft
            });
            
            element.scrollTo({
              left: expectedScrollLeft,
              behavior: 'smooth'
            });
          } else {
            // Reintentar si el ancho aún no está disponible
            requestAnimationFrame(() => {
              if (element) {
                const retryWidth = element.clientWidth;
                if (retryWidth > 0) {
                  const scrollWidth = element.scrollWidth;
                  const maxScrollLeft = scrollWidth - retryWidth;
                  
                  const GAP_SIZE = 2; // Separación fija en píxeles
                  const retryViewportWidth = window.innerWidth; // Ancho completo del viewport
                  const retryItemWidth = retryViewportWidth * 0.8; // Cada imagen ocupa 80vw
                  const retryItemWidthWithGap = retryItemWidth + GAP_SIZE;
                  // Posición de inicio de cada imagen
                  let expectedScrollLeft = activeIndex * retryItemWidthWithGap;
                  expectedScrollLeft = Math.min(expectedScrollLeft, maxScrollLeft);
                  expectedScrollLeft = Math.max(0, expectedScrollLeft);
                  
                  element.scrollTo({
                    left: expectedScrollLeft,
                    behavior: 'smooth'
                  });
                }
              }
            });
          }
        }
      };
      
      syncHorizontalScroll(scrollRef.current);
      syncHorizontalScroll(scrollRefMobile.current);
      
      // Desactivar bandera después de un breve delay
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 800);
    }
  }, [activeIndex]);

  // ========================================================================
  // [VARIABLE] activeProject - Proyecto activo actual
  // ========================================================================
  const activeProject = timelineData[activeIndex] || timelineData[0];

  // ============================================================================
  // [RENDER] JSX Principal
  // ============================================================================
  return (
    <section className="h-screen bg-cloud flex overflow-hidden" style={{ height: '80vh', maxHeight: '80vh' }}>
      {/* ======================================================================
          [COMPONENTE] Sección izquierda - Carrusel vertical de proyectos completos (1/3 del ancho)
          ====================================================================== */}
      <div 
        ref={leftScrollRef}
        className="left-scroll-section w-full md:w-1/3 bg-cloud border-r border-noir/5 overflow-y-auto overflow-x-hidden"
        style={{ 
          height: '100vh', 
          maxHeight: '100vh',
          padding: '20px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(18, 18, 18, 0.3) rgba(242, 242, 241, 0.5)'
        }}
      >
        {/* ======================================================================
            [COMPONENTE] leftCarouselRef - Contenedor interno del carrusel vertical
            ====================================================================== */}
        <div 
          ref={leftCarouselRef}
          className="flex flex-col"
          style={{ minHeight: '80%' }}
        >
          {/* ======================================================================
              [LOOP] Mapeo de proyectos - Renderiza cada proyecto del timeline
              ====================================================================== */}
          {timelineData.map((item, index) => (
            <div
              key={item.year}
              className="flex-shrink-0 w-full"
              style={{ 
                height: '100vh',
                minHeight: '100vh',
                maxHeight: '100vh',
                padding: '1rem 0.5rem 1rem 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}
            >
              {/* ==================================================================
                  [COMPONENTE] Título superior - Solo visible en el primer proyecto
                  ================================================================== */}
              {index === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  // @ts-ignore
                  className="mb-8"
                >
                  <h3 className="text-sm uppercase tracking-widest text-noir/60 font-light">
                    Our Journey Through Time
                  </h3>
                </motion.div>
              )}

              {/* ==================================================================
                  [COMPONENTE] Imagen del proyecto - Tamaño fijo exacto para sincronización precisa
                  ================================================================== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0.6,
                  scale: index === activeIndex ? 1 : 0.98
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                // @ts-ignore
                className="mb-6"
                style={{ 
                  height: '40vh',
                  width: '100%',
                  minHeight: '40vh',
                  maxHeight: '40vh',
                  minWidth: '100%',
                  maxWidth: '100%',
                  flexShrink: 0,
                  flexGrow: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: 'auto'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    minWidth: '100%',
                    minHeight: '100%',
                    filter: index === activeIndex ? 'brightness(1) contrast(1.05)' : 'brightness(0.8) contrast(1.1)',
                    transition: 'filter 0.6s ease-out'
                  }}
                />
              </motion.div>

              {/* ==================================================================
                  [COMPONENTE] Contenido del proyecto - Información textual del proyecto
                  ================================================================== */}
              <div className="flex-1 flex flex-col" style={{ minHeight: 0, overflow: 'hidden' }}>
                {/* [SUB-COMPONENTE] Título del proyecto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0.7,
                    y: 0
                  }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  // @ts-ignore
                  className="mb-3"
                  style={{ flexShrink: 0 }}
                >
                  <h2 className="text-3xl md:text-4xl font-serif text-noir font-light mb-2">
                    {item.title}
                  </h2>
                </motion.div>

                {/* [SUB-COMPONENTE] Año grande del proyecto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0.7,
                    y: 0
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  // @ts-ignore
                  className="mb-4"
                  style={{ flexShrink: 0 }}
                >
                  <h2 className="text-5xl md:text-6xl font-serif text-noir font-light">
                    {item.year}
                  </h2>
                </motion.div>

                {/* [SUB-COMPONENTE] Descripción del proyecto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0.7,
                    y: 0
                  }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  // @ts-ignore
                  className="mb-4 flex-1 overflow-y-auto"
                  style={{ minHeight: 0 }}
                >
                  <p className="text-sm md:text-base text-noir/70 leading-relaxed font-light whitespace-pre-line">
                    {item.description}
                  </p>
                </motion.div>

                {/* [SUB-COMPONENTE] Separador horizontal decorativo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0.5
                  }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  // @ts-ignore
                  className="h-px bg-noir/10 mb-4"
                  style={{ flexShrink: 0 }}
                />

                {/* [SUB-COMPONENTE] Servicios/Ubicación del proyecto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0.7,
                    y: 0
                  }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{ flexShrink: 0 }}
                >
                  <span className="text-xs text-noir/50 uppercase tracking-[0.3em] font-light leading-relaxed block whitespace-pre-line">
                    {item.location}
                  </span>
                </motion.div>
              </div>

              {/* [COMPONENTE] Link inferior - Solo visible en el último proyecto */}
              {index === timelineData.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  // @ts-ignore
                  className="mt-12 pt-8 border-t border-noir/10"
                >
                  <a
                    href="#"
                    className="text-sm text-noir/60 hover:text-noir transition-colors underline underline-offset-4"
                  >
                    Learn More About Us
                  </a>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================================
          [COMPONENTE] Sección derecha - Galería horizontal (2/3 del ancho) - Solo Desktop
          ====================================================================== */}
      <div className="hidden md:flex w-2/3 overflow-hidden" style={{ height: '80vh', maxHeight: '80vh' }}>
        {/* [SUB-COMPONENTE] scrollRef - Contenedor scrollable del carrusel horizontal desktop */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto overflow-y-hidden"
          style={{
            height: '100vh',
            maxHeight: '100vh',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}
        >
          {/* [SUB-COMPONENTE] Contenedor flex interno con ancho calculado */}
          <div 
            className="flex" 
            style={{ 
              width: `calc(${timelineData.length * 80}vw + ${(timelineData.length - 1) * 2}px)`, 
              height: '100vh'
            }}
          >
            {/* [LOOP] Mapeo de imágenes del carrusel horizontal */}
            {timelineData.map((item, index) => (
              <React.Fragment key={item.year}>
                {/* [COMPONENTE] Espaciador entre imágenes (solo después de la primera) */}
                {index > 0 && (
                  <div 
                    className="flex-shrink-0" 
                    style={{ width: '2px', height: '100vh' }}
                  />
                )}
                {/* [COMPONENTE] Item individual del carrusel horizontal */}
                <div
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="flex-shrink-0 relative"
                  style={{ 
                    height: '100vh', 
                    maxHeight: '100vh',
                    width: '80vw',
                    boxSizing: 'content-box',
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always'
                  }}
                >
                  {/* [SUB-COMPONENTE] Contenedor con marco minimalista y espacio alrededor */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* [SUB-COMPONENTE] Marco con fondo semitransparente */}
                    <div className="w-full h-full bg-cloud/90 flex items-center justify-center p-0">
                      {/* [ELEMENTO] Imagen del proyecto */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        style={{
                          filter: 'brightness(1) contrast(1.05)',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================================
          [COMPONENTE] Versión mobile - Layout apilado - Solo Mobile
          ====================================================================== */}
      <div className="md:hidden w-full overflow-y-auto" style={{ height: '100vh', maxHeight: '100vh' }}>
        {/* [COMPONENTE] Información del proyecto activo - Solo mobile */}
        {activeProject && (
          <div className="p-6 mb-6">
            <h3 className="text-sm uppercase tracking-widest text-noir/60 font-light mb-6">
              Our Journey Through Time
            </h3>
            <h2 className="text-4xl font-serif text-noir font-light mb-4">
              {activeProject.year}
            </h2>
            <p className="text-base text-noir/70 leading-relaxed font-light mb-4">
              {activeProject.description}
            </p>
          </div>
        )}

        {/* [COMPONENTE] scrollRefMobile - Carrusel horizontal mobile */}
        <div
          ref={scrollRefMobile}
          className="flex overflow-x-auto overflow-y-hidden"
          style={{
            height: '50vh',
            maxHeight: '50vh',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* [SUB-COMPONENTE] Contenedor flex del carrusel mobile */}
          <div className="flex" style={{ width: `${timelineData.length * 100}vw`, height: '50vh' }}>
            {/* [LOOP] Mapeo de imágenes del carrusel mobile */}
            {timelineData.map((item) => (
              <div
                key={item.year}
                className="flex-shrink-0 w-screen relative"
                style={{ height: '50vh', maxHeight: '50vh' }}
              >
                <div className="w-full h-full flex items-center justify-center p-1">
                  <div className="w-full h-full bg-cloud/90 flex items-center justify-center p-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* [COMPONENTE] Indicadores de progreso y link inferior - Solo mobile */}
        <div className="p-6 pt-4">
          {/* [SUB-COMPONENTE] Indicadores de progreso (puntos/barra) */}
          <div className="flex items-center gap-2 mb-4">
            {timelineData.map((_, i) => (
              <div
                key={i}
                className={`h-px transition-all ${
                  i === activeIndex ? 'w-8 bg-noir/60' : 'w-2 bg-noir/10'
                }`}
              />
            ))}
          </div>
          {/* [ELEMENTO] Link inferior */}
          <a href="#" className="text-sm text-noir/60 underline">Learn More About Us</a>
        </div>
      </div>

      {/* ======================================================================
          [STYLE] Estilos personalizados para scrollbar
          ====================================================================== */}
      <style>{`
        /* Scrollbar para la sección izquierda */
        .left-scroll-section::-webkit-scrollbar {
          width: 6px;
        }
        .left-scroll-section::-webkit-scrollbar-track {
          background: rgba(242, 242, 241, 0.5);
        }
        .left-scroll-section::-webkit-scrollbar-thumb {
          background: rgba(18, 18, 18, 0.3);
          border-radius: 3px;
        }
        .left-scroll-section::-webkit-scrollbar-thumb:hover {
          background: rgba(18, 18, 18, 0.5);
        }
      `}</style>
    </section>
  );
};

export default HorizontalTimeline;
