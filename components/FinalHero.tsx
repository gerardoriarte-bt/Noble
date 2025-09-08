import React, { Suspense } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
// FIX: Explicitly extend R3F to register THREE elements as JSX components.
// This resolves TypeScript errors for R3F primitives like <ambientLight />.
import { Canvas, extend } from '@react-three/fiber';
import { AmbientLight, DirectionalLight, PointLight } from 'three';
import RockModelWithScroll from './RockModelWithScroll';

extend({ AmbientLight, DirectionalLight, PointLight });

const FinalHero: React.FC = () => {
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
            style={{ 
                height: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
                backgroundImage: 'url(/image/landscape.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Overlay muy sutil */}
            <motion.div 
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(26, 26, 26, 0.15)',
                    opacity: overlayOpacity 
                }}
            ></motion.div>
            
             <Canvas 
                camera={{ position: [0, 0, 8], fov: 40 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 10]} intensity={1.0} color="#ffffff"/>
                <directionalLight position={[-10, 5, -5]} intensity={0.3} color="#b9a695" />
                <pointLight position={[0, -10, 0]} intensity={0.15} color="#b9a695" />
                <Suspense fallback={null}>
                    <RockModelWithScroll />
                </Suspense>
            </Canvas>

            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                zIndex: 20, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '1rem',
                pointerEvents: 'none'
            }}>
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                    className="absolute text-right text-white/70 text-xs font-light uppercase tracking-[0.4em] leading-relaxed"
                    style={{ 
                        right: '1rem',
                        bottom: '40%'
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="md:block hidden">
                        C R E A T O R S
                        <br />
                        O F
                        <br />
                        L Π N D M Π R K S
                    </div>
                    <div className="md:hidden block">
                        C R E A T O R S
                        <br />
                        O F
                        <br />
                        L Π N D M Π R K S
                    </div>
                </motion.div>
            </div>
             <motion.div 
                style={{ 
                    position: 'absolute', 
                    bottom: '2rem', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    zIndex: 30,
                    pointerEvents: 'none'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <div style={{ 
                    width: '1px', 
                    height: '4rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                    position: 'relative' 
                }}>
                    <motion.div 
                        style={{ 
                            width: '4px', 
                            height: '4px', 
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            position: 'absolute', 
                            top: 0, 
                            left: '50%', 
                            transform: 'translateX(-50%)' 
                        }}
                        animate={{ y: [0, 64, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default FinalHero;
