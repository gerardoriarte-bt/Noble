import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface TimelineItem {
  year: number;
  title: string;
  description: string;
  image: string;
  location: string;
}

const timelineData: TimelineItem[] = [
  {
    year: 2018,
    title: "Baltique",
    description: "EDIFICIO DE 13 PISOS | 165 APARTAMENTOS | 1 Y 2 HAB. DE 50 M2 A 105 M2",
    image: "/images/portfolio/baltique.jpg",
    location: "DESARROLLO - GERENCIA - DISEÑO - CONSTRUCCIÓN - OPERACIÓN TURÍSTICA"
  },
  {
    year: 2019,
    title: "First Residential",
    description: "Our first residential project established our signature minimalist aesthetic.",
    image: "/images/portfolio/images (1).jpeg",
    location: "Guadalajara"
  },
  {
    year: 2020,
    title: "Commercial Breakthrough",
    description: "Expanded into commercial architecture with award-winning office spaces.",
    image: "/images/portfolio/images (2).jpeg",
    location: "Monterrey"
  },
  {
    year: 2021,
    title: "Cultural Landmark",
    description: "Designed our first cultural institution, blending tradition with modernity.",
    image: "/images/portfolio/The-origins-and-essence-of-minimalism-in-Design-and-Architecture-_-Breeze-house-by-Fran-Silvestre-arquitectos.webp",
    location: "Oaxaca"
  },
  {
    year: 2022,
    title: "International Recognition",
    description: "Received international awards for sustainable design practices.",
    image: "/images/portfolio/A3404-10-Things-minimalist-architecture-IMAGE-17.webp",
    location: "Barcelona"
  },
  {
    year: 2023,
    title: "Urban Innovation",
    description: "Pioneered new approaches to urban living and community spaces.",
    image: "/images/portfolio/blurred-lines-of-monochrome-stone-and-concrete-create-a-dreamy-backdrop-for-the-stark-minimalist-architecture-evoking-a-sense-of-contemporary-sophistication-photo.jpg",
    location: "New York"
  },
  {
    year: 2024,
    title: "Future Vision",
    description: "Continuing to push boundaries in architectural innovation and sustainable design.",
    image: "/images/portfolio/images.jpeg",
    location: "Global"
  }
];

const HorizontalTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
    horizontal: true
  });

  const x = useTransform(scrollXProgress, [0, 1], ['0%', '-85%']);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsubscribe = scrollXProgress.onChange((latest) => {
      const index = Math.round(latest * (timelineData.length - 1));
      setActiveIndex(index);
    });
    return unsubscribe;
  }, [scrollXProgress]);

  return (
    <section className="py-32 md:py-48 bg-cloud overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-noir leading-tight mb-6">
            Our Journey Through Time
          </h2>
          <div className="w-24 h-px bg-camel mx-auto mb-8"></div>
          <p className="text-noir/60 max-w-2xl mx-auto mb-12">
            Six years of architectural innovation, each project building upon the last, 
            creating a legacy of transformative design.
          </p>
        </div>

        {/* Year Counter */}
        <div className="text-center mb-16">
          <motion.div 
            className="text-8xl md:text-9xl font-serif text-camel/20 font-bold"
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {timelineData[activeIndex]?.year || 2024}
          </motion.div>
        </div>
      </div>

      {/* Horizontal Timeline */}
      <div 
        ref={containerRef}
        className="relative h-[600px] overflow-x-auto overflow-y-hidden"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <motion.div 
          className="flex h-full"
          style={{ x: springX }}
        >
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-cloud/40"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h3 className="text-5xl md:text-6xl font-serif text-noir mb-6 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-noir/80 mb-8 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 text-noir/60">
                    <span className="text-base">{item.location}</span>
                    {item.year !== 2018 && (
                      <>
                        <div className="w-8 h-px bg-camel"></div>
                        <span className="text-base">{item.year}</span>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Year Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2">
                  {timelineData.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === index ? 'bg-camel w-8' : 'bg-noir/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="text-center mt-12">
        <motion.div
          className="inline-flex items-center gap-3 text-noir/60"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm uppercase tracking-wider">Scroll horizontally</span>
          <div className="w-8 h-px bg-camel"></div>
          <span className="text-sm">→</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalTimeline;
