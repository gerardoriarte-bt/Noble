import React from 'react';
import PerfectHero from '../components/PerfectHero';
import HorizontalTimeline from '../components/HorizontalTimeline';
import Metrics from '../components/Metrics';
import Team from '../components/Team';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <PerfectHero />
      <Metrics />
      <HorizontalTimeline />
      <Team />
      <Contact />
    </>
  );
};

export default HomePage;
