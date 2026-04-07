import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';

// ============================================================================
// [INTERFACE] TimelineItem - Estructura de datos para cada proyecto
// ============================================================================
interface TimelineItem {
  year: number;
  title: string;
  description: string;
  image: string;
  verticalImage?: string;
  horizontalImage?: string;
  location: string;
  detailedDescription?: string;
  gallery?: string[];
  specifications?: string[];
}

// ============================================================================
// [DATA] timelineData - Array con la información de los proyectos
// ============================================================================
const timelineData: TimelineItem[] = [
  {
    year: 2022,
    title: "Dominique",
    description: "Estratégicamente ubicado en el barrio Cielomar, a solo 200 metros de la mejor y más exclusiva playa de la zona norte.",
    image: "/Proyectos/DOMINIQUE/IMG-GENERAL.png",
    horizontalImage: "/Proyectos/DOMINIQUE/IMG-GENERAL.png",
    verticalImage: "/Proyectos/DOMINIQUE/IMG-INTERNA.png",
    location: "Cartagena de Indias",
    detailedDescription: "Estratégicamente ubicado en el barrio Cielomar, Dominique está a solo 200 metros de la mejor y más exclusiva playa de la zona norte, contigua al hotel Las Américas, y en el corazón de la recuperada ciénaga de la virgen.",
    gallery: [
      "/Proyectos/DOMINIQUE/IMG-GENERAL.png",
      "/Proyectos/DOMINIQUE/IMG-INTERNA.png"
    ],
    specifications: [
      "Edificio de 14 pisos",
      "120 apartamentos",
      "1 y 2 habitaciones entre 62 m² hasta 110 m²",
      "105 estacionamientos privados",
      "17 de visitantes",
      "3 ascensores"
    ]
  },
  {
    year: 2019,
    title: "Martinique",
    description: "Estratégicamente ubicado en el barrio Cielomar, a solo 200 metros de la mejor y más exclusiva playa de la zona norte.",
    image: "/Proyectos/MARTINIQUE/IMG-GENERAL.png",
    horizontalImage: "/Proyectos/MARTINIQUE/IMG-GENERAL.png",
    verticalImage: "/Proyectos/MARTINIQUE/IMG-INTERNA.png",
    location: "Cartagena de Indias",
    detailedDescription: "Estratégicamente ubicado en el barrio Cielomar, Martinique está a solo 200 metros de la mejor y más exclusiva playa de la zona norte, contigua al hotel Las Américas, y en el corazón de la recuperada ciénaga de la virgen.",
    gallery: [
      "/Proyectos/MARTINIQUE/IMG-GENERAL.png",
      "/Proyectos/MARTINIQUE/IMG-INTERNA.png"
    ],
    specifications: [
      "Edificio de 15 pisos",
      "99 apartamentos",
      "1 y 2 habitaciones entre 65 m² hasta 110 m²",
      "105 estacionamientos privados",
      "17 de visitantes",
      "3 ascensores"
    ]
  },
  {
    year: 2020,
    title: "Antique",
    description: "Ya no tienes que salir de la ciudad para encontrar comodidad y poder disfrutar de zonas verdes. El proyecto Antique traerá la calidad de vida que tú y tu familia estaban buscando.",
    image: "/Proyectos/ANTIQUE/IMG-GENERAL.png",
    horizontalImage: "/Proyectos/ANTIQUE/IMG-GENERAL.png",
    verticalImage: "/Proyectos/ANTIQUE/IMG-INTERNA.png",
    location: "Bogotá",
    detailedDescription: "ANTIQUE es un proyecto de vivienda con 36 unidades de apartamentos en 5 pisos de altura que ofrece una excelente ubicación en un sector residencial consolidado de la ciudad de Bogotá. El proyecto es el marco y fondo de un agradable y reservado parque que ofrece una ventaja única para sus propietarios y habitantes ya que cuenta con una zona verde a lo ancho del proyecto.\n\nEstructuración, Diseño, Promoción, Gerencia y Construcción Edificio de Apartamentos Antique en Bogotá, Colombia. Desarrollo propio en consorcio con CLV Arquitectura y Construcción y Mas Ingeniería SC. Fiduciaria Fidubogotá y crédito constructor Banco de Bogotá. Proyecto de 7200m² de construcción, COP 22,000 millones en ventas, 40 apartamentos y 5 pisos de altura en el barrio Nuevo Country (sector Antigua). Proyecto culminado exitosamente.",
    gallery: [
      "/Proyectos/ANTIQUE/IMG-GENERAL.png",
      "/Proyectos/ANTIQUE/IMG-INTERNA.png"
    ],
    specifications: [
      "Edificio de 5 pisos",
      "40 apartamentos",
      "7200 m² de construcción",
      "Barrio Nuevo Country (sector Antigua)",
      "Zona verde a lo ancho del proyecto",
      "Sector residencial consolidado"
    ]
  },
  {
    year: 2023,
    title: "Baruq",
    description: "Proyecto único de 360 unidades, 3 edificios, cada uno de 5 pisos más altillo. Un proyecto que se desarrollará en 3 etapas de venta.",
    image: "/Proyectos/BARUQ/IMG-GENERAL.png",
    horizontalImage: "/Proyectos/BARUQ/IMG-GENERAL.png",
    verticalImage: "/Proyectos/BARUQ/IMG-INTERNA.png",
    location: "Cartagena",
    detailedDescription: "Proyecto único de 360 unidades, 3 edificios, cada uno de 5 pisos más altillo. Un proyecto que se desarrollará en 3 etapas de venta. Iniciando con 120 unidades en la primera etapa, cada etapa para uso residencial y turístico.\n\nSOSTENIBLE: Construcción consciente con el entorno.\n\nINVERSIÓN INTELIGENTE: Diseñado para maximizar la inversión, con un modelo mixto de rentabilidad y experiencia.\n\nEXPERIENCIA: La localización garantiza el mejor spot marino del caribe colombiano. Ubicado en la milla de oro de Barú.\n\nÚNICO: Único proyecto de villas hoteleras o turística en Cartagena.\n\nLUJO: Diseño original de la reconocida firma Duque Martínez, mezclando el ambiente de la playa costera con el paisaje caribeño.",
    gallery: [
      "/Proyectos/BARUQ/IMG-GENERAL.png",
      "/Proyectos/BARUQ/IMG-INTERNA.png"
    ],
    specifications: [
      "Estructura: 5 pisos + altillo",
      "Área lote: 3.3 hectáreas",
      "Área vendible: 19.800 m²",
      "Áreas comunes: 1.200 m²",
      "Unidades residenciales: 320 unidades",
      "360 unidades totales",
      "3 edificios",
      "3 etapas de venta"
    ]
  },
  {
    year: 2019,
    title: "Emaus",
    description: "Diseño, gerencia y construcción Parroquia Discípulos de Emaús en Bogotá, Colombia.",
    image: "/Proyectos/EMAUS/IMG-GENERAL.png",
    verticalImage: "/Proyectos/EMAUS/IMG-INTERNA.jpeg",
    location: "Bogotá",
    detailedDescription: "Diseño, gerencia y construcción Parroquia Discípulos de Emaús en Bogotá, Colombia. Diseño, construcción y gerencia de proyecto para las facilidades parroquiales de 1500m² incluyendo el espacio de congregación. Proyecto culminado exitosamente.",
    gallery: [
      "/Proyectos/EMAUS/IMG-GENERAL.png",
      "/Proyectos/EMAUS/IMG-INTERNA.jpeg"
    ],
    specifications: [
      "1500 m² de facilidades parroquiales",
      "Espacio de congregación",
      "Diseño, construcción y gerencia",
      "Proyecto culminado exitosamente"
    ]
  },
  {
    year: 2019,
    title: "Serrezuela",
    description: "Centro comercial de lujo con arquitectura grandiosa que remite a una parte importante de la historia colombiana.",
    image: "/Proyectos/SERREZUELA/IMG-GENERAL.png",
    horizontalImage: "/Proyectos/SERREZUELA/IMG-GENERAL.png",
    verticalImage: "/Proyectos/SERREZUELA/IMG-INTERNA.png",
    location: "Cartagena de Indias",
    detailedDescription: "El centro comercial de lujo Plaza La Serrezuela es imponente: la construcción de una arquitectura grandiosa, que remite a una parte importante de la historia colombiana, suma 22.400 m2 de área construida, de los cuales más de 10.000 m2 se configuran como ABA. Esta división se debe a que, además de ser un lujoso centro comercial, el emprendimiento también alberga un centro cultural y un centro de convenciones. Todo esto en el corazón de Cartagena.",
    gallery: [
      "/Proyectos/SERREZUELA/IMG-GENERAL.png",
      "/Proyectos/SERREZUELA/IMG-INTERNA.png"
    ],
    specifications: [
      "22.000 m² de área total",
      "22.400 m² de área construida",
      "Más de 10.000 m² de ABA",
      "Centro comercial de lujo",
      "Centro cultural",
      "Centro de convenciones"
    ]
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
  const leftScrollRef = useRef<HTMLDivElement>(null); // Contenedor scroll vertical izquierdo
  const leftCarouselRef = useRef<HTMLDivElement>(null); // Carrusel vertical izquierdo
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // Referencias a cada item del carrusel
  const mobileCarouselRef = useRef<HTMLDivElement>(null); // Carrusel horizontal mobile
  const [mobileCarouselIndex, setMobileCarouselIndex] = useState(0); // Índice del carrusel mobile

  // ========================================================================
  // [STATE] Estado del componente
  // ========================================================================
  const [activeIndex, setActiveIndex] = useState(0); // Índice del proyecto activo
  const prevActiveIndexRef = useRef(activeIndex); // Índice anterior para comparaciones
  const isSyncingRef = useRef(false); // Bandera para evitar loops durante sincronización
  const [selectedProject, setSelectedProject] = useState<TimelineItem | null>(null); // Proyecto seleccionado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  // Intersection Observer deshabilitado - usando solo scroll handlers para mejor control
  // El Intersection Observer puede interferir con la sincronización manual

  // ========================================================================
  // [HANDLER] handleHorizontalScroll - Maneja el scroll del carrusel horizontal
  // ========================================================================
  const handleHorizontalScroll = React.useCallback(() => {
    if (isSyncingRef.current) {
      return;
    }

    // Usar el ref de desktop
    const scrollElement = scrollRef.current;

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

      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < timelineData.length) {
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

      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < timelineData.length) {
        setActiveIndex(newIndex);
      }
    }
  }, [activeIndex]);

  // ========================================================================
  // [EFFECT] useEffect - Agrega listeners de scroll horizontal (Desktop)
  // ========================================================================
  useEffect(() => {
    const scrollElementDesktop = scrollRef.current;

    if (scrollElementDesktop) {
      scrollElementDesktop.addEventListener('scroll', handleHorizontalScroll, { passive: true });
    }

    return () => {
      if (scrollElementDesktop) {
        scrollElementDesktop.removeEventListener('scroll', handleHorizontalScroll);
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

      // Desactivar bandera después de un breve delay
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 800);
    }
  }, [activeIndex]);

  // ========================================================================
  // [HANDLER] nextProject / prevProject - Navegación manual por botones
  // ========================================================================
  const nextProject = () => {
    if (activeIndex < timelineData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevProject = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // ========================================================================

  // ========================================================================
  // [HANDLER] handleOpenModal - Abre el modal con el proyecto seleccionado
  // ========================================================================
  const handleOpenModal = (project: TimelineItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  // ========================================================================
  // [HANDLER] handleCloseModal - Cierra el modal
  // ========================================================================
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Restaurar scroll del body
    document.body.style.overflow = 'unset';
  };

  // ============================================================================
  // [RENDER] JSX Principal
  // ============================================================================
  return (
    <section id="proyectos" className="relative h-screen bg-cloud md:flex md:overflow-hidden" style={{ height: '80vh', maxHeight: '80vh' }}>
      {/* ======================================================================
          [COMPONENTE] Sección izquierda - Carrusel vertical de proyectos completos (1/3 del ancho)
          ====================================================================== */}
      <div
        ref={leftScrollRef}
        className="left-scroll-section hidden md:block w-full md:w-1/3 bg-cloud border-r border-noir/5 overflow-y-auto overflow-x-hidden"
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
              key={`${item.year}-${index}`}
              className="flex-shrink-0 w-full"
              style={{
                minHeight: '100vh',
                padding: '1rem 0.5rem 1rem 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                boxSizing: 'border-box'
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
                    Proyectos
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
                  src={item.verticalImage || item.image}
                  alt={`Proyecto ${item.title} - ${item.location} - ${item.year} | Noble Architecture Studio`}
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
              <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
                {/* [SUB-COMPONENTE] Título del proyecto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0.7,
                    y: 0
                  }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  // @ts-ignore
                  className="mb-4"
                  style={{ flexShrink: 0 }}
                >
                  <h2 className="text-3xl md:text-4xl font-serif text-noir font-light mb-3">
                    {item.title}
                  </h2>
                  
                  {/* [SUB-COMPONENTE] Botón para abrir modal - Debajo del título */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ flexShrink: 0 }}
                  >
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="w-full py-3 px-4 border-2 border-noir/50 hover:border-noir bg-noir/15 hover:bg-noir/25 text-noir font-medium transition-all duration-300 text-sm uppercase tracking-widest shadow-md"
                      style={{ 
                        backgroundColor: 'rgba(18, 18, 18, 0.1)',
                        cursor: 'pointer'
                      }}
                    >
                      Ver Detalles
                    </button>
                  </motion.div>
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
                    Conoce Más Sobre Nosotros
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
              <React.Fragment key={`${item.year}-${index}`}>
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
                    <div className="w-full h-full bg-cloud/90 flex items-center justify-center p-0 relative group">
                      {/* [ELEMENTO] Imagen del proyecto */}
                      <img
                        src={item.horizontalImage || item.image}
                        alt={`Proyecto ${item.title} - ${item.location} - ${item.year} | Noble Architecture Studio`}
                        className="w-full h-full object-contain"
                        style={{
                          filter: 'brightness(1) contrast(1.05)',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                      />
                      {/* [ELEMENTO] Botón flotante para abrir modal */}
                      <div className="absolute bottom-6 right-6 z-20">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="bg-noir hover:bg-noir/90 text-cloud px-6 py-3 text-sm uppercase tracking-widest font-light transition-all duration-300 shadow-lg"
                          style={{
                            backgroundColor: 'rgba(18, 18, 18, 0.9)',
                            cursor: 'pointer'
                          }}
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================================
          [COMPONENTE] Versión mobile - Cards simplificadas - Solo Mobile
          ====================================================================== */}
      <div className="md:hidden w-full bg-cloud py-8">
        {/* [COMPONENTE] Título de sección */}
        <div className="px-6 mb-8">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-widest text-noir/60 font-light mb-2"
          >
            Proyectos
          </motion.h3>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-px bg-noir/20 mt-2"
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* [COMPONENTE] Carrusel horizontal de cards */}
        <div
          ref={mobileCarouselRef}
          className="overflow-x-auto overflow-y-visible"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            WebkitScrollbar: { display: 'none' }
          }}
          onScroll={(e) => {
            const container = e.currentTarget;
            const scrollLeft = container.scrollLeft;
            const cardWidth = container.clientWidth;
            const newIndex = Math.round(scrollLeft / cardWidth);
            if (newIndex !== mobileCarouselIndex && newIndex >= 0 && newIndex < timelineData.length) {
              setMobileCarouselIndex(newIndex);
            }
          }}
        >
          <div className="flex" style={{ width: `${timelineData.length * 100}vw` }}>
            {timelineData.map((item, index) => (
              <div
                key={`${item.year}-${index}`}
                className="flex-shrink-0"
                style={{ 
                  width: '100vw',
                  scrollSnapAlign: 'start',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  boxSizing: 'border-box'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-cloud border border-noir/10 rounded-sm overflow-hidden shadow-sm"
                >
                  {/* [SUB-COMPONENTE] Imagen del proyecto */}
                  <div className="relative w-full" style={{ height: '45vh', minHeight: '280px' }}>
                    <img
                      src={item.image}
                      alt={`Proyecto ${item.title} - ${item.location} - ${item.year} | Noble Architecture Studio`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* [SUB-COMPONENTE] Contenido de la card */}
                  <div className="p-6">
                    {/* [SUB-COMPONENTE] Título, año y ubicación */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-2xl font-serif text-noir font-light">
                          {item.title}
                        </h4>
                        <span className="text-xs text-noir/60 font-light tracking-wider">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-sm text-noir/60 uppercase tracking-widest font-light">
                        {item.location}
                      </p>
                    </div>

                    {/* [SUB-COMPONENTE] Descripción breve */}
                    <p className="text-base text-noir/70 leading-relaxed font-light mb-6">
                      {item.description}
                    </p>

                    {/* [ELEMENTO] Botón para abrir modal */}
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="w-full py-3 px-4 border-2 border-noir/30 hover:border-noir bg-noir/5 hover:bg-noir/10 text-noir transition-all duration-300 text-sm uppercase tracking-widest font-light"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* [COMPONENTE] Indicadores de progreso del carrusel */}
        <div className="flex justify-center items-center gap-2 mt-6 px-4">
          {timelineData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (mobileCarouselRef.current) {
                  const cardWidth = mobileCarouselRef.current.clientWidth;
                  mobileCarouselRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                  });
                }
                setMobileCarouselIndex(index);
              }}
              className={`transition-all duration-300 ${
                index === mobileCarouselIndex
                  ? 'w-8 h-1 bg-noir/60'
                  : 'w-2 h-1 bg-noir/20 hover:bg-noir/30'
              }`}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ======================================================================
          [COMPONENTE] Controles de navegación - Flechas flotantes
          ====================================================================== */}
      <div className="absolute bottom-12 right-12 z-50 flex items-center gap-4 pointer-events-auto hidden md:flex">
        <div className="flex items-center gap-2 bg-cloud/80 backdrop-blur-md border border-noir/10 px-4 py-3 rounded-full shadow-lg">
          <span className="text-sm font-medium text-noir/80">{activeIndex + 1}</span>
          <span className="text-xs text-noir/30">/</span>
          <span className="text-xs text-noir/40">{timelineData.length}</span>
        </div>

        <motion.button
          // @ts-ignore
          onClick={prevProject}
          disabled={activeIndex === 0}
          className={`group flex items-center justify-center w-14 h-14 rounded-full border border-noir/10 bg-cloud/80 backdrop-blur-md transition-all ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-noir hover:border-noir hover:scale-110 shadow-lg'
            }`}
          whileTap={{ scale: 0.9 }}
          aria-label="Proyecto anterior"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-colors duration-300 ${activeIndex === 0 ? 'stroke-noir/40' : 'stroke-noir group-hover:stroke-cloud'}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </motion.button>

        <motion.button
          // @ts-ignore
          onClick={nextProject}
          disabled={activeIndex === timelineData.length - 1}
          className={`group flex items-center justify-center w-14 h-14 rounded-full border border-noir/10 bg-cloud/80 backdrop-blur-md transition-all ${activeIndex === timelineData.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-noir hover:border-noir hover:scale-110 shadow-lg'
            }`}
          whileTap={{ scale: 0.9 }}
          aria-label="Siguiente proyecto"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-colors duration-300 ${activeIndex === timelineData.length - 1 ? 'stroke-noir/40' : 'stroke-noir group-hover:stroke-cloud'}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </motion.button>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />

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

        /* Ocultar botones de scroll nativos si los hay */
        .left-scroll-section {
          scrollbar-width: thin;
        }

        /* Ocultar scrollbar en carrusel mobile */
        .md\\:hidden::-webkit-scrollbar {
          display: none;
        }
        .md\\:hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default HorizontalTimeline;
