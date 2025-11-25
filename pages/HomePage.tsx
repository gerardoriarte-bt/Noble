import React from 'react';
import PerfectHero from '../components/PerfectHero';
import HorizontalTimeline from '../components/HorizontalTimeline';
import Metrics from '../components/Metrics';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <PerfectHero />
      <Metrics />
      <HorizontalTimeline />
      <Contact />
    </>
  );
};

export default HomePage;
