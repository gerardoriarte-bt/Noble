import React from 'react';
import PerfectHero from '../components/PerfectHero';
import HorizontalTimeline from '../components/HorizontalTimeline';
import Metrics from '../components/Metrics';
import ImprovedPortfolio from '../components/ImprovedPortfolio';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <PerfectHero />
      <HorizontalTimeline />
      <Metrics />
      <ImprovedPortfolio />
      <Contact />
    </>
  );
};

export default HomePage;
