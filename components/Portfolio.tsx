import React from 'react';
import { motion, Variants } from 'framer-motion';
import { portfolioProjects } from '../constants';
import type { Project } from '../types';

const PortfolioItem: React.FC<{ project: Project; className?: string }> = ({ project, className = '' }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const imageVariants: Variants = {
        rest: { scale: 1 },
        hover: { 
            scale: 1.05,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    const overlayVariants: Variants = {
        rest: { opacity: 0 },
        hover: { 
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    const contentVariants: Variants = {
        rest: { y: 20, opacity: 0 },
        hover: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className={`group relative overflow-hidden cursor-pointer ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Imagen principal */}
            <motion.div
                className="relative w-full h-full"
                variants={imageVariants}
                initial="rest"
                animate={isHovered ? "hover" : "rest"}
            >
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                />
                
                {/* Overlay oscuro para el texto */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent"
                    variants={overlayVariants}
                    initial="rest"
                    animate={isHovered ? "hover" : "rest"}
                />
            </motion.div>

            {/* Contenido siempre visible */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {/* Título siempre visible */}
                <h3 className="text-xl md:text-2xl font-serif text-cloud mb-2 tracking-wide">
                    {project.title}
                </h3>

                {/* Categoría siempre visible */}
                <p className="text-camel text-sm uppercase tracking-[0.2em] mb-3 font-light">
                    {project.category}
                </p>

                {/* Descripción solo en hover */}
                <motion.div
                    variants={contentVariants}
                    initial="rest"
                    animate={isHovered ? "hover" : "rest"}
                >
                    <p className="text-cloud/90 text-sm leading-relaxed mb-4 max-w-sm">
                        {project.description}
                    </p>

                    {/* Metadatos */}
                    <div className="flex justify-between items-center text-xs text-cloud/70 uppercase tracking-[0.15em]">
                        <span className="font-light">{project.location}</span>
                        <span className="font-light">{project.year}</span>
                    </div>
                </motion.div>
            </div>

            {/* Indicador de hover */}
            <motion.div
                className="absolute top-6 right-6 w-2 h-2 bg-camel rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </motion.div>
    );
};

const Portfolio: React.FC = () => {
    const gridItems = [
        { project: portfolioProjects[0], className: 'md:col-span-2 md:row-span-2' },
        { project: portfolioProjects[1], className: '' },
        { project: portfolioProjects[2], className: 'md:row-span-2' },
        { project: portfolioProjects[3], className: '' },
        { project: portfolioProjects[4], className: 'md:col-span-2' },
        { project: portfolioProjects[5], className: '' },
    ];
    
    return (
        <section id="portfolio" className="py-24 md:py-32 bg-fossil">
            <div className="container mx-auto px-6">
                {/* Header de la sección */}
                <motion.div 
                    className="mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-cloud">
                        Featured Works
                    </h2>
                    <p className="text-cloud/60 mt-2">
                        A selection of our defining projects.
                    </p>
                </motion.div>

                {/* Grid de proyectos */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {gridItems.map((item, index) => (
                        <motion.div
                            key={item.project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ 
                                duration: 0.6, 
                                ease: "easeOut",
                                delay: index * 0.1
                            }}
                        >
                            <PortfolioItem 
                                project={item.project} 
                                className={item.className} 
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;