import React from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// [INTERFACE] TeamMember - Estructura de datos para cada miembro del equipo
// ============================================================================
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

// ============================================================================
// [DATA] teamMembers - Array con la información del equipo
// ============================================================================
const teamMembers: TeamMember[] = [
  {
    name: 'Juan Carlos Martinez',
    role: 'Gerente General',
    image: '/Equipo/juan-carlos.jpeg'
  },
  {
    name: 'Gustavo Duque Izquierdo',
    role: 'Gerente de Diseño',
    image: '/Equipo/gustavo-duque.jpeg'
  },
  {
    name: 'Jhonatan Jimenez',
    role: 'Gerente de Proyectos',
    image: '/Equipo/jhonatan-jimenez.jpeg'
  },
  {
    name: 'José David Fandiño',
    role: 'Arquitecto Junior',
    image: '/Equipo/jose-david.jpeg'
  },
  {
    name: 'Karen Tovar',
    role: 'Contabilidad',
    image: '/Equipo/karen-tovar.jpeg'
  },
  {
    name: 'Ingrid Kemes',
    role: 'Administrativo',
    image: '/Equipo/ingrid-kemes.jpeg'
  }
];

// ============================================================================
// [HELPER] normalizeImagePath - Normaliza la ruta de imagen para la web
// ============================================================================
const normalizeImagePath = (path: string): string => {
  // Ahora que no hay caracteres especiales, un encodeURI es suficiente y seguro
  return encodeURI(path);
};

// ============================================================================
// [COMPONENTE] Team - Sección de equipo
// ============================================================================
const Team: React.FC = () => {
  return (
    <section id="equipo" className="w-full bg-cloud py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Título de la sección */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-noir font-light mb-4">
              Nuestro Equipo
            </h2>
            <div className="w-24 h-px bg-noir/20 mx-auto"></div>
          </motion.div>
        </div>

        {/* Grid de miembros del equipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center">
              {/* Contenedor de imagen con proporción fija */}
              <div className="w-full aspect-square mb-6 overflow-hidden bg-noir/5 rounded-sm">
                <img
                  src={normalizeImagePath(member.image)}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  onError={(e) => {
                    console.error('Error loading team member image:', member.image);
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-noir/30 text-sm">Imagen no disponible</div>`;
                    }
                  }}
                  loading="lazy"
                />
              </div>

              {/* Información del miembro */}
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-serif text-noir font-light mb-2">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-noir/60 uppercase tracking-widest font-light">
                  {member.role}
                </p>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
