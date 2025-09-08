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
        rest: { opacity: 0.3 },
        hover: { 
            opacity: 0.7,
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

    const titleVariants: Variants = {
        rest: { y: 0, opacity: 1 },
        hover: { 
            y: -10, 
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
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
                
                {/* Overlay oscuro siempre presente para mejor contraste */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent"
                    variants={overlayVariants}
                    initial="rest"
                    animate={isHovered ? "hover" : "rest"}
                />
            </motion.div>

            {/* Contenido con mejor contraste */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {/* Título con sombra para mejor legibilidad */}
                <motion.h3 
                    className="text-xl md:text-2xl font-serif text-white mb-2 tracking-wide drop-shadow-lg"
                    variants={titleVariants}
                    initial="rest"
                    animate={isHovered ? "hover" : "rest"}
                >
                    {project.title}
                </motion.h3>

                {/* Categoría con fondo semi-transparente */}
                <div className="inline-block">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 text-white text-sm uppercase tracking-[0.2em] font-light rounded-full">
                        {project.category}
                    </span>
                </div>

                {/* Descripción solo en hover */}
                <motion.div
                    className="mt-4"
                    variants={contentVariants}
                    initial="rest"
                    animate={isHovered ? "hover" : "rest"}
                >
                    <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg">
                        <p className="text-white text-sm leading-relaxed mb-4">
                            {project.description}
                        </p>

                        {/* Metadatos */}
                        <div className="flex justify-between items-center text-xs text-white/80 uppercase tracking-[0.15em]">
                            <span className="font-light">{project.location}</span>
                            <span className="font-light">{project.year}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const ImprovedPortfolio: React.FC = () => {
    return (
        <section id="portfolio" className="py-32 md:py-48 bg-noir">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-serif text-cloud leading-tight mb-6">
                        Featured Works
                    </h2>
                    <div className="w-24 h-px bg-camel mx-auto mb-8"></div>
                    <p className="text-cloud/60 max-w-2xl mx-auto">
                        A curated selection of our most impactful architectural projects, 
                        showcasing our commitment to innovative design and sustainable practices.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioProjects.map((project, index) => (
                        <PortfolioItem 
                            key={project.id} 
                            project={project}
                            className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
                        />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <motion.button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-camel text-noir font-medium uppercase tracking-wider hover:bg-camel/90 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore All Projects
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default ImprovedPortfolio;
