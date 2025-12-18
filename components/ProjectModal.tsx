import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// [INTERFACE] ProjectModalProps - Props del componente modal
// ============================================================================
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    year: number;
    title: string;
    description: string;
    location: string;
    detailedDescription?: string;
    gallery?: string[];
    specifications?: string[];
  } | null;
}

// ============================================================================
// [COMPONENTE] ProjectModal - Modal con información detallada del proyecto
// ============================================================================
const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Resetear índice de imagen cuando cambia el proyecto
  useEffect(() => {
    if (project && project.gallery && project.gallery.length > 0) {
      setSelectedImageIndex(0);
    }
  }, [project]);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!project) return null;

  const gallery = project.gallery || [];
  const hasMultipleImages = gallery.length > 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-noir/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-cloud w-full max-w-7xl max-h-[95vh] overflow-hidden pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between p-6 border-b border-noir/10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif text-noir font-light mb-1">
                    {project.title}
                  </h2>
                  <p className="text-sm text-noir/50 uppercase tracking-widest">
                    {project.location} · {project.year}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-noir/60 hover:text-noir transition-colors p-2"
                  aria-label="Cerrar modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Contenido del Modal - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid md:grid-cols-[65%_35%] gap-0 min-h-0">
                  {/* Sección de Imágenes - Izquierda - Priorizada */}
                  <div className="bg-noir/5 p-8 flex flex-col">
                    {gallery.length > 0 ? (
                      <>
                        {/* Imagen Principal - Más grande */}
                        <div className="mb-6 bg-cloud/30 flex items-center justify-center overflow-hidden rounded-sm" style={{ minHeight: '60vh', maxHeight: '70vh' }}>
                          <motion.img
                            key={selectedImageIndex}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            src={encodeURI(gallery[selectedImageIndex])}
                            alt={`Proyecto ${project.title} - ${project.location} - Galería imagen ${selectedImageIndex + 1} | Noble Architecture Studio`}
                            className="w-full h-full object-contain"
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                            onError={(e) => {
                              console.error('Error loading image:', gallery[selectedImageIndex]);
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>

                        {/* Galería de Miniaturas - Mejorada */}
                        {hasMultipleImages && (
                          <div className="grid grid-cols-5 gap-3 mb-6">
                            {gallery.map((image, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`aspect-square overflow-hidden border-2 transition-all rounded-sm ${
                                  selectedImageIndex === index
                                    ? 'border-noir/80 shadow-md scale-105'
                                    : 'border-noir/20 opacity-70 hover:opacity-100 hover:border-noir/40'
                                }`}
                              >
                                <img
                                  src={encodeURI(image)}
                                  alt={`Proyecto ${project.title} - Miniatura ${index + 1} | Noble Architecture Studio`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Navegación de Imágenes - Mejorada */}
                        {hasMultipleImages && (
                          <div className="flex items-center justify-between mt-auto pt-6 border-t border-noir/10">
                            <button
                              onClick={() =>
                                setSelectedImageIndex(
                                  selectedImageIndex > 0
                                    ? selectedImageIndex - 1
                                    : gallery.length - 1
                                )
                              }
                              className="text-noir/70 hover:text-noir transition-all px-6 py-3 border-2 border-noir/30 hover:border-noir/60 bg-noir/5 hover:bg-noir/10 text-sm uppercase tracking-widest font-light"
                            >
                              ← Anterior
                            </button>
                            <span className="text-sm text-noir/60 uppercase tracking-widest font-light">
                              {selectedImageIndex + 1} / {gallery.length}
                            </span>
                            <button
                              onClick={() =>
                                setSelectedImageIndex(
                                  selectedImageIndex < gallery.length - 1
                                    ? selectedImageIndex + 1
                                    : 0
                                )
                              }
                              className="text-noir/70 hover:text-noir transition-all px-6 py-3 border-2 border-noir/30 hover:border-noir/60 bg-noir/5 hover:bg-noir/10 text-sm uppercase tracking-widest font-light"
                            >
                              Siguiente →
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="aspect-video bg-cloud/50 flex items-center justify-center">
                            <p className="text-noir/30 text-sm">No hay imágenes disponibles</p>
                          </div>
                    )}
                  </div>

                  {/* Sección de Información - Derecha - Compacta */}
                  <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 100px)' }}>
                    {/* Descripción Corta */}
                    <div className="mb-6">
                      <h3 className="text-xs uppercase tracking-widest text-noir/50 mb-3 font-light">
                        Descripción
                      </h3>
                      <p className="text-base text-noir/70 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* Descripción Detallada */}
                    {project.detailedDescription && (
                      <div className="mb-6">
                        <h3 className="text-xs uppercase tracking-widest text-noir/50 mb-3 font-light">
                          Detalles del Proyecto
                        </h3>
                        <p className="text-sm text-noir/60 leading-relaxed font-light whitespace-pre-line">
                          {project.detailedDescription}
                        </p>
                      </div>
                    )}

                    {/* Especificaciones */}
                    {project.specifications && project.specifications.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xs uppercase tracking-widest text-noir/50 mb-3 font-light">
                          Especificaciones
                        </h3>
                        <ul className="space-y-3">
                          {project.specifications.map((spec, index) => {
                            // Función para obtener el icono según el contenido de la especificación
                            const getIcon = (text: string) => {
                              const lowerText = text.toLowerCase();
                              if (lowerText.includes('piso') || lowerText.includes('edificio')) {
                                return (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                );
                              }
                              if (lowerText.includes('apartamento') || lowerText.includes('habitacion')) {
                                return (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                  </svg>
                                );
                              }
                              if (lowerText.includes('m²') || lowerText.includes('metro')) {
                                return (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                  </svg>
                                );
                              }
                              if (lowerText.includes('estacionamiento') || lowerText.includes('parking')) {
                                return (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                  </svg>
                                );
                              }
                              if (lowerText.includes('visitante')) {
                                return (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                );
                              }
                              if (lowerText.includes('ascensor') || lowerText.includes('elevator')) {
                                return (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                  </svg>
                                );
                              }
                              // Icono por defecto
                              return (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              );
                            };

                            return (
                              <li
                                key={index}
                                className="text-sm text-noir/60 font-light flex items-start gap-3"
                              >
                                <span className="text-noir/40 flex-shrink-0 mt-0.5">
                                  {getIcon(spec)}
                                </span>
                                <span className="flex-1">{spec}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {/* Información Adicional */}
                    <div className="pt-6 border-t border-noir/10">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-noir/50 uppercase tracking-widest text-xs mb-1">
                            Año
                          </p>
                          <p className="text-noir font-light">{project.year}</p>
                        </div>
                        <div>
                          <p className="text-noir/50 uppercase tracking-widest text-xs mb-1">
                            Ubicación
                          </p>
                          <p className="text-noir font-light">{project.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

