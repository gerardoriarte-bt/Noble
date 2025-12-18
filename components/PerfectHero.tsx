import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

const PerfectHero: React.FC = () => {
    const { scrollYProgress } = useScroll();

    // Efectos parallax para el fondo
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.25]);

    const titleVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section
            id="inicio"
            className="h-screen w-full relative overflow-hidden"
            style={{ backgroundColor: '#f2f2f1' }}
        >
            {/* Imagen de fondo que cubre completamente */}
            <motion.img
                src="/image/hero-background.jpg"
                alt="Noble Architecture Studio - Proyectos arquitectónicos de excelencia en Cartagena y Bogotá"
                className="absolute inset-0 w-full h-full object-cover z-0"
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />

            {/* Overlay muy sutil */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor: 'rgba(242, 242, 241, 0.3)',
                    opacity: overlayOpacity
                }}
            ></motion.div>

            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center p-4 pointer-events-none">
                <motion.div
                    className="flex items-center justify-center"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <img
                        src="/Noble-logo-isotipo-blanco.png"
                        alt="Noble Architecture Studio"
                        className="h-32 md:h-48 w-auto"
                    />
                </motion.div>

                <motion.div
                    className="absolute right-0 md:right-20 lg:right-40 text-right bottom-[40%] md:bottom-[38%]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="text-xs text-noir/70 font-light uppercase tracking-[0.4em]">
                        C R E A D O R E S
                        <br />
                        D E
                        <br />
                        H I T O S
                    </p>
                </motion.div>
            </div>
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <div className="w-px h-16 bg-noir/40 relative">
                    <motion.div
                        className="w-1 h-1 bg-noir rounded-full absolute top-0 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 64, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default PerfectHero;
