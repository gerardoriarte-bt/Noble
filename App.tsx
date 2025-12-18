import React from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SEOHead from './components/SEOHead';

const App: React.FC = () => {
  let component;
  
  // Simple router based on the window's pathname
  switch (window.location.pathname) {
    case '/':
    default:
      component = <HomePage />;
      break;
  }

  return (
    <MotionConfig transition={{ duration: 0.7, ease: "easeInOut" }}>
      <SEOHead />
      <div className="bg-cloud text-noir font-sans antialiased overflow-x-hidden">
        <Header />
        <main>
          {component}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default App;