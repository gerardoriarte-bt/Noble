import React from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] },
    },
};

const MinimalistAbout: React.FC = () => {
    return (
        <section className="py-32 md:py-48 bg-cloud relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-camel/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-cloud/5 rounded-full blur-2xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            <motion.div 
                className="container mx-auto px-6 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                {/* Main Statement - Asymmetric Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-32">
                    {/* Left Column - Empty Space */}
                    <div className="lg:col-span-3"></div>
                    
                    {/* Center Column - Main Content */}
                    <motion.div className="lg:col-span-6" variants={itemVariants}>
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.9] text-noir mb-12">
                            We are
                            <br />
                            <span className="text-camel/60">architects</span>
                            <br />
                            of silence.
                        </h2>
                    </motion.div>
                    
                    {/* Right Column - Empty Space */}
                    <div className="lg:col-span-3"></div>
                </div>

                {/* Philosophy Section - Minimal Text */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-32">
                    {/* Left Column - Empty */}
                    <div className="lg:col-span-2"></div>
                    
                    {/* Center Column - Philosophy */}
                    <motion.div className="lg:col-span-8" variants={itemVariants}>
                        <div className="space-y-8">
                            <p className="text-xl md:text-2xl text-noir/60 leading-relaxed font-light">
                                In the space between form and function, we find meaning.
                            </p>
                            <div className="w-24 h-px bg-camel/30"></div>
                            <p className="text-lg text-noir/50 leading-relaxed font-light max-w-2xl">
                                Every structure is a dialogue between light and shadow, 
                                between the built and the unbuilt, between presence and absence.
                            </p>
                        </div>
                    </motion.div>
                    
                    {/* Right Column - Empty */}
                    <div className="lg:col-span-2"></div>
                </div>

                {/* Values - Horizontal Layout */}
                <div className="mb-32">
                    <motion.div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-16" variants={itemVariants}>
                        {/* Value 1 */}
                        <div className="lg:w-1/3">
                            <div className="space-y-4">
                                <div className="w-16 h-px bg-camel"></div>
                                <h3 className="text-2xl font-serif text-noir">Integrity</h3>
                                <p className="text-noir/50 font-light leading-relaxed">
                                    We build with purpose and honesty, ensuring every structure stands as a testament to our unwavering principles.
                                </p>
                            </div>
                        </div>

                        {/* Value 2 */}
                        <div className="lg:w-1/3">
                            <div className="space-y-4">
                                <div className="w-16 h-px bg-camel"></div>
                                <h3 className="text-2xl font-serif text-noir">Timelessness</h3>
                                <p className="text-noir/50 font-light leading-relaxed">
                                    Our design philosophy transcends trends, focusing on creating spaces with enduring relevance and lasting beauty.
                                </p>
                            </div>
                        </div>

                        {/* Value 3 */}
                        <div className="lg:w-1/3">
                            <div className="space-y-4">
                                <div className="w-16 h-px bg-camel"></div>
                                <h3 className="text-2xl font-serif text-noir">Dignity</h3>
                                <p className="text-noir/50 font-light leading-relaxed">
                                    We approach every project with respect for its context, its materials, and the people who will inhabit the space.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Team Section - Minimalist Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Partner 1 */}
                    <motion.div className="space-y-8" variants={itemVariants}>
                        <div className="aspect-square w-full max-w-md mx-auto lg:mx-0">
                            <div className="w-full h-full bg-gradient-to-br from-camel/10 to-cloud/5 rounded-lg"></div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-3xl font-serif text-noir">Javier Moreno</h4>
                            <p className="text-sm uppercase tracking-wider text-camel">Founding Partner</p>
                            <p className="text-noir/60 font-light leading-relaxed">
                                With over 20 years of experience, Javier's vision is rooted in creating structures that are both monumental and deeply human.
                            </p>
                        </div>
                    </motion.div>

                    {/* Partner 2 */}
                    <motion.div className="space-y-8" variants={itemVariants}>
                        <div className="aspect-square w-full max-w-md mx-auto lg:mx-0">
                            <div className="w-full h-full bg-gradient-to-br from-cloud/10 to-camel/5 rounded-lg"></div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-3xl font-serif text-noir">Elena Soto</h4>
                            <p className="text-sm uppercase tracking-wider text-camel">Design Director</p>
                            <p className="text-noir/60 font-light leading-relaxed">
                                Elena believes in the power of light and space to shape experience, crafting interiors that are minimal yet warm.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Closing Statement - Centered */}
                <motion.div className="text-center mt-32" variants={itemVariants}>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="w-32 h-px bg-camel mx-auto"></div>
                        <p className="text-2xl md:text-3xl font-serif text-noir/80 leading-relaxed">
                            We are architects of landmarks, crafting spaces that embody righteousness, dignity, and a timeless presence.
                        </p>
                        <div className="w-32 h-px bg-camel mx-auto"></div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default MinimalistAbout;


