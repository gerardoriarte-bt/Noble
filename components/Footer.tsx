import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone border-t border-noir/10 py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <img
              src="/Noble-logo-blanco.png"
              alt="Noble Architecture Studio"
              className="h-20 md:h-24 w-auto"
              style={{
                filter: 'invert(1) brightness(0.15) contrast(1.2)'
              }}
            />
          </div>
          <p className="text-sm text-noir/60 max-w-xs">
            Creando espacios que encarnan rectitud, dignidad y una presencia atemporal.
          </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-camel mb-4">Navegación</h4>
            <ul className="space-y-3 text-sm text-noir/70">
              <li><a href="/#inicio" className="hover:text-noir transition-colors">Inicio</a></li>
              <li><a href="/#proyectos" className="hover:text-noir transition-colors">Proyectos</a></li>
              <li><a href="/#equipo" className="hover:text-noir transition-colors">Equipo</a></li>
              <li><a href="/#contact" className="hover:text-noir transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-camel mb-4">Redes</h4>
            <ul className="space-y-3 text-sm text-noir/70">
              <li><a href="#" className="hover:text-noir transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-noir transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-noir transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="hidden md:flex justify-end items-center">
          <img
            src="/Noble-logo-isotipo-negro.png"
            alt="Noble Isotipo"
            className="h-16 md:h-20 w-auto opacity-60"
          />
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 border-t border-noir/10 pt-8 text-center">
        <p className="text-xs text-noir/50 tracking-wider">&copy; {new Date().getFullYear()} Noble Architecture Studio. Todos los derechos reservados.</p>
      </div>
    </footer >
  );
};

export default Footer;