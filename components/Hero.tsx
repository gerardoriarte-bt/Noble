import React, { Suspense } from 'react';
import { motion, Variants } from 'framer-motion';
// FIX: Explicitly extend R3F to register THREE elements as JSX components.
// This resolves TypeScript errors for R3F primitives like <ambientLight />.
import { Canvas, extend } from '@react-three/fiber';
import { AmbientLight, DirectionalLight, PointLight } from 'three';
import RockModel from './RockModel';

extend({ AmbientLight, DirectionalLight, PointLight });

const Hero: React.FC = () => {
    const title = "ΠOBLE";
    const titleVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const letterVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.01, 0.05, 0.95]
            },
        },
    };

    return (
        <section className="h-screen w-full relative bg-noir">
             <Canvas 
                camera={{ position: [0, 0, 8], fov: 40 }}
                className="absolute inset-0 z-10"
            >
                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff"/>
                <directionalLight position={[-10, 5, -5]} intensity={0.5} color="camel" />
                <pointLight position={[0, -10, 0]} intensity={0.3} color="camel" />
                <Suspense fallback={null}>
                    <RockModel />
                </Suspense>
            </Canvas>

            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-4 pointer-events-none">
                <motion.h1
                    className="text-7xl md:text-9xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-cloud to-stone flex items-center select-none"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {title.split('').map((char, index) => (
                        <motion.span key={index} variants={letterVariants} className={char === 'Π' ? 'font-serif text-6xl md:text-8xl -ml-2 -mr-1' : ''}>
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.div 
                    className="absolute right-0 md:right-20 lg:right-40 text-right bottom-[40%] md:bottom-[38%]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="text-xs text-cloud/70 font-light uppercase tracking-[0.4em]">
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
                <div className="w-px h-16 bg-cloud/40 relative">
                    <motion.div 
                        className="w-1 h-1 bg-cloud rounded-full absolute top-0 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 64, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;