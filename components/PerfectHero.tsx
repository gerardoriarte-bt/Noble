import React, { Suspense } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
// FIX: Explicitly extend R3F to register THREE elements as JSX components.
// This resolves TypeScript errors for R3F primitives like <ambientLight />.
import { Canvas, extend } from '@react-three/fiber';
import { AmbientLight, DirectionalLight, PointLight } from 'three';
import StaticRockModel from './StaticRockModel';

extend({ AmbientLight, DirectionalLight, PointLight });

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
            className="h-screen w-full relative overflow-hidden"
            style={{ 
                backgroundColor: '#1a1a1a',
                backgroundImage: 'url(/image/landscape.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Overlay muy sutil */}
            <motion.div 
                className="absolute inset-0"
                style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.15)',
                    opacity: overlayOpacity 
                }}
            ></motion.div>
            
             <Canvas 
                camera={{ position: [0, 0, 8], fov: 40 }}
                className="absolute inset-0 z-10"
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 10]} intensity={1.0} color="#ffffff"/>
                <directionalLight position={[-10, 5, -5]} intensity={0.3} color="#b9a695" />
                <pointLight position={[0, -10, 0]} intensity={0.15} color="#b9a695" />
                <Suspense fallback={null}>
                    <StaticRockModel />
                </Suspense>
            </Canvas>

            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-4 pointer-events-none">
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
                    <p className="text-xs text-white/70 font-light uppercase tracking-[0.4em]">
                        C R E A T O R S
                        <br />
                        O F
                        <br />
                        L Π N D M Π R K S
                    </p>
                </motion.div>
            </div>
             <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <div className="w-px h-16 bg-white/40 relative">
                    <motion.div 
                        className="w-1 h-1 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 64, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default PerfectHero;
