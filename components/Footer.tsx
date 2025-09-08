import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-noir border-t border-cloud/10 py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
              <img 
                  src="/Noble-logo-blanco.png" 
                  alt="Noble Architecture Studio" 
                  className="h-8 w-auto"
              />
          </div>
          <p className="text-sm text-cloud/60 max-w-xs">
            Crafting spaces that embody righteousness, dignity, and a timeless presence.
          </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
                <h4 className="font-bold uppercase tracking-widest text-camel mb-4">Navigation</h4>
                <ul className="space-y-3 text-sm text-cloud/70">
                    <li><a href="/" className="hover:text-cloud transition-colors">Home</a></li>
                    <li><a href="/about" className="hover:text-cloud transition-colors">About</a></li>
                    <li><a href="/#portfolio" className="hover:text-cloud transition-colors">Portfolio</a></li>
                    <li><a href="/#contact" className="hover:text-cloud transition-colors">Contact</a></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold uppercase tracking-widest text-camel mb-4">Social</h4>
                <ul className="space-y-3 text-sm text-cloud/70">
                    <li><a href="#" className="hover:text-cloud transition-colors">Instagram</a></li>
                    <li><a href="#" className="hover:text-cloud transition-colors">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-cloud transition-colors">Twitter</a></li>
                </ul>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 border-t border-cloud/10 pt-8 text-center">
        <p className="text-xs text-cloud/50 tracking-wider">&copy; {new Date().getFullYear()} Noble Architecture Studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;