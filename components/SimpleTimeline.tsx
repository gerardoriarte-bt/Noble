import React from 'react';
import { motion } from 'framer-motion';

const SimpleTimeline: React.FC = () => {
  return (
    <section className="py-32 md:py-48 bg-noir">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-cloud leading-tight mb-6">
            Our Journey Through Time
          </h2>
          <div className="w-24 h-px bg-camel mx-auto mb-8"></div>
          <p className="text-cloud/60 max-w-2xl mx-auto">
            Six years of architectural innovation, each project building upon the last, 
            creating a legacy of transformative design.
          </p>
        </div>

        <div className="text-center">
          <motion.div 
            className="text-8xl md:text-9xl font-serif text-camel/20 font-bold mb-16"
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            2024
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Future Vision
            </h3>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Continuing to push boundaries in architectural innovation and sustainable design.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-white/60">
              <span className="text-lg">Global</span>
              <div className="w-8 h-px bg-camel"></div>
              <span className="text-lg">2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleTimeline;
