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

    const textItemVariants: Variants = {
        rest: { y: 10, opacity: 0 },
        hover: { 
            y: 0, 
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
            {/* Imagen placeholder con gradiente */}
            <motion.div
                className="w-full h-80 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 relative"
                variants={imageVariants}
                animate={isHovered ? "hover" : "rest"}
            >
                {/* Patrón sutil */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-16 h-16 bg-white/30 rounded"></div>
                    <div className="absolute top-8 right-8 w-8 h-8 bg-white/20 rounded"></div>
                    <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/25 rounded"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/15 rounded"></div>
                </div>
                
                {/* Overlay con contenido */}
                <motion.div
                    className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6"
                    variants={overlayVariants}
                    animate={isHovered ? "hover" : "rest"}
                >
                    <motion.div
                        className="text-white"
                        variants={contentVariants}
                        animate={isHovered ? "hover" : "rest"}
                    >
                        <motion.h3 
                            className="text-xl font-bold mb-2"
                            variants={textItemVariants}
                            animate={isHovered ? "hover" : "rest"}
                        >
                            {project.title}
                        </motion.h3>
                        
                        <motion.p 
                            className="text-sm text-gray-300 mb-3"
                            variants={textItemVariants}
                            animate={isHovered ? "hover" : "rest"}
                        >
                            {project.category}
                        </motion.p>
                        
                        <motion.p 
                            className="text-sm text-gray-200 mb-4 leading-relaxed"
                            variants={textItemVariants}
                            animate={isHovered ? "hover" : "rest"}
                        >
                            {project.description}
                        </motion.p>
                        
                        <motion.div 
                            className="flex justify-between text-xs text-gray-400"
                            variants={textItemVariants}
                            animate={isHovered ? "hover" : "rest"}
                        >
                            <span>{project.location}</span>
                            <span>{project.year}</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const PortfolioWithPlaceholders: React.FC = () => {
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

export default PortfolioWithPlaceholders;


