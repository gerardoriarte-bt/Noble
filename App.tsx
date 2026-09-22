import React from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import NotFoundPage from './pages/NotFoundPage';
import { resolveRoute } from './seo/head';

// La ruta llega como prop para que el mismo componente sirva en el navegador
// y en el pre-renderizado (scripts/prerender.mjs), donde no existe window.
const App: React.FC<{ path: string }> = ({ path }) => {
  const route = resolveRoute(path);

  let component;
  switch (route.kind) {
    case 'home':
      component = <HomePage />;
      break;
    case 'project':
      component = <ProjectPage project={route.project} />;
      break;
    default:
      component = <NotFoundPage />;
  }

  return (
    <MotionConfig transition={{ duration: 0.7, ease: "easeInOut" }}>
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
