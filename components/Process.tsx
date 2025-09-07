import React from 'react';
// FIX: Import `Variants` to correctly type framer-motion animation variants.
import { motion, Variants } from 'framer-motion';

const Process: React.FC = () => {
    // FIX: Explicitly type variant objects with `Variants` to prevent incorrect type inference by TypeScript, which was causing errors with the `ease` property in transitions.
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] },
        },
    };

    const timelineItemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="process" className="py-32 md:py-48 bg-fossil relative overflow-hidden">
             <div className="absolute inset-0 z-0 opacity-10">
                {/* Abstract floating shapes representing matter */}
                <motion.div 
                    className="absolute top-[10%] left-[15%] w-24 h-24 bg-cloud/10 rounded-full filter blur-xl"
                    animate={{
                        x: [0, 20, 0, -20, 0],
                        y: [0, -30, 0, 30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div 
                    className="absolute top-[50%] left-[80%] w-32 h-32 bg-camel/10 rounded-full filter blur-2xl"
                     animate={{
                        x: [0, -25, 0, 25, 0],
                        y: [0, 40, 0, -40, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
                />
                 <motion.div 
                    className="absolute bottom-[15%] left-[5%] w-16 h-16 bg-cloud/10 rounded-full filter blur-lg"
                     animate={{
                        x: [0, 15, 0, -15, 0],
                        y: [0, -20, 0, 20, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 2 }}
                />
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.h2 
                        className="text-4xl md:text-5xl font-serif text-cloud leading-tight mb-6"
                        variants={itemVariants}
                    >
                        Transformamos la materia en espacios extraordinarios
                    </motion.h2>

                    <motion.h3
                        className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-cloud/80 mb-20 md:mb-24"
                        variants={itemVariants}
                    >
                        Proyectos
                    </motion.h3>

                    <div className="relative flex justify-between items-center w-full max-w-4xl mx-auto">
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-px">
                             <svg width="100%" height="2" preserveAspectRatio="none">
                                <line x1="0" y1="1" x2="100%" y2="1" strokeDasharray="4 4" className="stroke-cloud/30" />
                            </svg>
                        </div>

                        <motion.div 
                            className="flex flex-col items-center z-10"
                            variants={timelineItemVariants}
                        >
                            <div className="bg-fossil p-4 rounded-lg border border-cloud/20 w-28 h-16 md:w-32 md:h-20 flex items-center justify-center">
                                <h4 className="font-bold text-base md:text-lg text-cloud/80">Pasado</h4>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="flex flex-col items-center z-10"
                            variants={timelineItemVariants}
                        >
                            <div className="bg-cloud/10 p-4 rounded-lg border border-camel w-28 h-16 md:w-32 md:h-20 flex items-center justify-center shadow-lg shadow-camel/10">
                                 <h4 className="font-bold text-base md:text-lg text-cloud">Presente</h4>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex flex-col items-center z-10"
                            variants={timelineItemVariants}
                        >
                           <div className="bg-fossil p-4 rounded-lg border border-cloud/20 w-28 h-16 md:w-32 md:h-20 flex items-center justify-center">
                                <h4 className="font-bold text-base md:text-lg text-cloud/80">Futuro</h4>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Process;
