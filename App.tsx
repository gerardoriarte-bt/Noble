import React from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  let component;
  
  // Simple router based on the window's pathname
  switch (window.location.pathname) {
    case '/about':
      component = <AboutPage />;
      break;
    case '/':
    default:
      component = <HomePage />;
      break;
  }

  return (
    <MotionConfig transition={{ duration: 0.7, ease: "easeInOut" }}>
      <CustomCursor />
      <div className="bg-noir text-cloud font-sans antialiased overflow-x-hidden cursor-none">
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