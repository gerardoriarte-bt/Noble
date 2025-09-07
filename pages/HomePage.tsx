import React from 'react';
import Hero from '../components/Hero';
import Process from '../components/Process';
import Metrics from '../components/Metrics';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Process />
      <Metrics />
      <Portfolio />
      <Contact />
    </>
  );
};

export default HomePage;
