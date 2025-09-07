import React from 'react';
import { motion, Variants } from 'framer-motion';
import { portfolioProjects } from '../constants';
import type { Project } from '../types';

const PortfolioItem: React.FC<{ project: Project; className?: string }> = ({ project, className = '' }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const overlayVariants: Variants = {
        rest: { opacity: 0 },
        hover: { opacity: 1, transition: { staggerChildren: 0.07, ease: 'easeOut' } },
    };

    const itemVariants: Variants = {
        rest: { y: 20, opacity: 0 },
        hover: { y: 0, opacity: 1 },
    };

    const descriptionVariants: Variants = {
        collapsed: { 
            opacity: 0, 
            height: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
        expanded: { 
            opacity: 1, 
            height: 'auto',
            transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
        },
    };

    return (
        <motion.div
            className={`group relative overflow-hidden ring-1 ring-cloud/10 hover:ring-camel transition-all duration-300 cursor-pointer ${className}`}
            style={{ perspective: 800 }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-all duration-700 ease-in-out-circ group-hover:brightness-50" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent p-6 md:p-8 flex flex-col justify-end"
                    variants={overlayVariants}
                    initial="rest"
                    whileHover="hover"
                    animate={isExpanded ? 'hover' : 'rest'}
                >
                    <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">{project.title}</motion.h3>
                    <motion.p variants={itemVariants} className="text-camel uppercase tracking-widest text-xs md:text-sm">{project.category}</motion.p>
                    
                    <motion.div
                        className="font-serif overflow-hidden"
                        variants={descriptionVariants}
                        initial="collapsed"
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                    >
                        <p className="text-cloud/90 text-sm leading-relaxed mt-3 mb-4">{project.description}</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="w-full border-t border-cloud/30 pt-2 mt-auto">
                         <div className="flex justify-between text-xs text-cloud/70 uppercase tracking-widest">
                            <span>{project.location}</span>
                            <span>{project.year}</span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
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
                <motion.div 
                    className="mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-cloud">Featured Works</h2>
                    <p className="text-cloud/60 mt-2">A selection of our defining projects.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {gridItems.map((item) => (
                        <PortfolioItem key={item.project.id} project={item.project} className={item.className} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;