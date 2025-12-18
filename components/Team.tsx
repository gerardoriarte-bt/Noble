import React, { useEffect } from 'react';
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
    image: '/Equipo/JUAN CARLOS MARTINEZ (GEENTE GENERAL).jpeg'
  },
  {
    name: 'Gustavo Duque Izquierdo',
    role: 'Gerente de Diseño',
    image: '/Equipo/GUSTAVO DUQUE IZQUIERDO ( GERENTE DE DISEÑO).jpeg'
  },
  {
    name: 'Jhonatan Jimenez',
    role: 'Gerente de Proyectos',
    image: '/Equipo/JHONATAN JIMENEZ ( GERENTE DE PROYECTOS).jpeg'
  },
  {
    name: 'José David Fandiño',
    role: 'Arquitecto Junior',
    image: '/Equipo/JOSÉ DAVID FANDIÑO ( ARQUITECTO JUNIOR).jpeg'
  },
  {
    name: 'Karen Tovar',
    role: 'Contabilidad',
    image: '/Equipo/KAREN TOVAR ( CONTABILIDAD).jpeg'
  },
  {
    name: 'Ingrid Kemes',
    role: 'Administrativo',
    image: '/Equipo/INGRID KEMES (  ADMINISTRATIVO).jpeg'
  }
];

// ============================================================================
// [HELPER] normalizeImagePath - Normaliza la ruta de imagen para manejar caracteres especiales
// ============================================================================
const normalizeImagePath = (path: string): string => {
  // Normalizar a NFD (descompuesto) para que coincida con los nombres de archivo del sistema
  // Los archivos tienen caracteres combinados (NFD), no precompuestos (NFC)
  const normalized = path.normalize('NFD');
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/fd2f8a6c-9d69-45b6-ba9e-7a4c38f77a5f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Team.tsx:normalizeImagePath',message:'Path normalization NFD',data:{originalPath:path,normalizedPath:normalized,originalBytes:Array.from(new TextEncoder().encode(path)).map(b=>b.toString(16).padStart(2,'0')).join(' '),normalizedBytes:Array.from(new TextEncoder().encode(normalized)).map(b=>b.toString(16).padStart(2,'0')).join(' ')},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  return normalized;
};

// ============================================================================
// [COMPONENTE] Team - Sección de equipo
// ============================================================================
const Team: React.FC = () => {
  // #region agent log
  useEffect(() => {
      teamMembers.forEach((member, idx) => {
        const normalizedPath = normalizeImagePath(member.image);
        fetch('http://127.0.0.1:7242/ingest/fd2f8a6c-9d69-45b6-ba9e-7a4c38f77a5f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Team.tsx:useEffect',message:'Team member data initialized',data:{index:idx,memberName:member.name,imagePath:member.image,normalizedPath:normalizedPath},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'C'})}).catch(()=>{});
      });
  }, []);
  // #endregion
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
                  onLoad={() => {
                    // #region agent log
                    const normalizedPath = normalizeImagePath(member.image);
                    fetch('http://127.0.0.1:7242/ingest/fd2f8a6c-9d69-45b6-ba9e-7a4c38f77a5f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Team.tsx:onLoad',message:'Image loaded successfully',data:{memberName:member.name,imagePath:member.image,normalizedPath:normalizedPath},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'A'})}).catch(()=>{});
                    // #endregion
                  }}
                  onError={(e) => {
                    // #region agent log
                    const target = e.target as HTMLImageElement;
                    const originalSrc = member.image;
                    const normalizedPath = normalizeImagePath(member.image);
                    fetch('http://127.0.0.1:7242/ingest/fd2f8a6c-9d69-45b6-ba9e-7a4c38f77a5f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Team.tsx:onError',message:'Image load error',data:{memberName:member.name,originalPath:originalSrc,normalizedPath:normalizedPath,currentSrc:target.src,errorType:'onError triggered'},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'A'})}).catch(()=>{});
                    // #endregion
                    console.error('Error loading team member image:', member.image);
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-noir/30 text-sm">Imagen no disponible</div>`;
                    }
                  }}
                  onLoadStart={() => {
                    // #region agent log
                    const normalizedPath = normalizeImagePath(member.image);
                    fetch('http://127.0.0.1:7242/ingest/fd2f8a6c-9d69-45b6-ba9e-7a4c38f77a5f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Team.tsx:onLoadStart',message:'Image load started',data:{memberName:member.name,imagePath:member.image,normalizedPath:normalizedPath},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'B'})}).catch(()=>{});
                    // #endregion
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

