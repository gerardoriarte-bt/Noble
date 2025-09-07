import React from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
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

const values = [
    {
        title: "Integrity",
        description: "We build with purpose and honesty, ensuring every structure stands as a testament to our unwavering principles."
    },
    {
        title: "Timelessness",
        description: "Our design philosophy transcends trends, focusing on creating spaces with enduring relevance and lasting beauty."
    },
    {
        title: "Dignity",
        description: "We approach every project with respect for its context, its materials, and the people who will inhabit the space."
    }
];

const partners = [
  {
    name: "Javier Moreno",
    title: "Founding Partner & Lead Architect",
    bio: "With over 20 years of experience, Javier's vision is rooted in creating structures that are both monumental and deeply human. His work explores the intersection of raw materials and refined geometry.",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Elena Soto",
    title: "Founding Partner & Design Director",
    bio: "Elena believes in the power of light and space to shape experience. Her expertise lies in crafting interiors that are minimal yet warm, creating a dialogue between the inhabitant and their environment.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
];

const About: React.FC = () => {
    return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 bg-noir relative overflow-hidden">
        <motion.div 
            className="container mx-auto px-6 space-y-32 md:space-y-48"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            {/* Intro Section */}
            <motion.div className="max-w-4xl mx-auto text-center" variants={itemVariants}>
                <h2 className="text-5xl md:text-6xl font-serif leading-tight text-cloud mb-8">
                    We are architects of <span className="text-camel">timeless</span> landmarks.
                </h2>
                <p className="text-lg text-cloud/70 leading-relaxed font-sans">
                    Noble is synonymous with elevation and transformation. We act as a beacon, guiding each project towards greatness and integrity. We are architects of landmarks, crafting spaces that embody righteousness, dignity, and a timeless presence.
                </p>
            </motion.div>

            {/* Values Section */}
            <motion.div variants={containerVariants}>
                 <motion.div className="text-center mb-16" variants={itemVariants}>
                    <h3 className="text-3xl font-bold uppercase tracking-widest text-cloud/80">Our Values</h3>
                    <div className="w-24 h-px bg-camel mx-auto mt-4"></div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {values.map((value) => (
                        <motion.div key={value.title} className="text-center" variants={itemVariants}>
                            <h4 className="text-2xl font-serif text-camel mb-4">{value.title}</h4>
                            <p className="text-base text-cloud/80 font-light leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            
            {/* Team Section */}
             <motion.div variants={containerVariants}>
                 <motion.div className="text-center mb-16" variants={itemVariants}>
                    <h3 className="text-3xl font-bold uppercase tracking-widest text-cloud/80">Meet Our Founders</h3>
                    <div className="w-24 h-px bg-camel mx-auto mt-4"></div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {partners.map((partner) => (
                        <motion.div 
                            key={partner.name} 
                            className="flex flex-col items-center text-center"
                            variants={itemVariants}
                        >
                            <div className="w-48 h-48 rounded-full overflow-hidden group ring-2 ring-cloud/20 p-1 mb-6">
                                <img 
                                    src={partner.imageUrl} 
                                    alt={partner.name} 
                                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out-circ"
                                />
                            </div>
                            <h4 className="text-3xl font-serif text-camel mb-2">{partner.name}</h4>
                            <p className="text-sm uppercase tracking-wider text-cloud/60 mb-4">{partner.title}</p>
                            <p className="text-base text-cloud/80 font-light leading-relaxed max-w-sm">{partner.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </motion.div>
    </section>
  );
};

export default About;