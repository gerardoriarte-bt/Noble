import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const metricsData = [
  { value: 20, label: 'Years of Experience', suffix: '+' },
  { value: 150, label: 'Projects Completed', suffix: '+' },
  { value: 500, label: 'Thousand Sq. Ft. Designed', suffix: 'K' },
  { value: 25, label: 'International Awards', suffix: '' },
];

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString()
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
    <section id="metrics" className="py-24 md:py-32 bg-noir">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-cloud">
            By The Numbers
          </h2>
          <p className="text-cloud/60 mt-2 max-w-2xl mx-auto">
            Our legacy is built on a foundation of tangible results and
            architectural excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.15,
                ease: 'easeOut',
              }}
            >
              <p className="text-5xl md:text-7xl font-serif text-camel">
                {isInView && <AnimatedNumber value={metric.value} />}
                {metric.suffix}
              </p>
              <h3 className="mt-3 text-sm uppercase tracking-wider text-cloud/70">
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
