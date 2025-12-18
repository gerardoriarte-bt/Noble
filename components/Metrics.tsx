import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const metricsData = [
  { value: 20, label: 'Años de Experiencia', prefix: '+' },
  { value: 17, label: 'Proyectos y en Proceso', prefix: '+' },
  { value: 229000, label: 'MM Ventas', prefix: '+' },
  { value: 50000, label: 'm² como Gerencia de Interventoría y Supervisión Técnica', prefix: '+' },
  { value: 425, label: 'Apartamentos Residenciales y en Desarrollo', prefix: '+' },
];

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString('es-ES')
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2.5,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const Metrics: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="metrics" className="py-24 md:py-32 bg-cloud">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-noir">
            En Números
          </h2>
          <p className="text-noir/60 mt-2 max-w-2xl mx-auto">
            Nuestro legado se basa en una base de resultados tangibles y
            excelencia arquitectónica.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center w-full sm:w-[calc(50%-2rem)] md:w-[calc(33.33%-3rem)]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.15,
                ease: 'easeOut',
              }}
            >
              <p className="text-4xl md:text-5xl lg:text-6xl font-serif text-camel whitespace-nowrap">
                {metric.prefix}
                {isInView && <AnimatedNumber value={metric.value} />}
              </p>
              <h3 className="mt-3 text-xs md:text-sm uppercase tracking-wider text-noir/70 max-w-[200px] mx-auto leading-relaxed">
                {metric.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
