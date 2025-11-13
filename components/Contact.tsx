import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-32 md:py-48 bg-cloud text-noir">
            <div className="container mx-auto px-6 text-center flex flex-col items-center">
                 <motion.div 
                    className="max-w-3xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.3 }}
                >
                    <motion.h2 
                        className="text-5xl md:text-7xl font-serif"
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                    >
                        Let's Create a <span className="text-camel">Landmark</span> Together
                    </motion.h2>
                    <motion.p 
                        className="mt-8 mb-12 text-lg text-noir/70 max-w-xl mx-auto"
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                    >
                        Have a project in mind? We would love to hear about your vision. Reach out to us to begin the conversation.
                    </motion.p>
                    <motion.a
                        href="mailto:studio@noble.com"
                        className="text-2xl md:text-3xl font-serif text-noir relative w-fit group"
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <span>
                            studio@noble.com
                        </span>
                        <span className="absolute bottom-[-5px] left-0 h-px w-full bg-camel transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out-circ"></span>
                    </motion.a>
                 </motion.div>
            </div>
        </section>
    );
};

export default Contact;