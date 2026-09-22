// ============================================================================
// [INTERFACE] TeamMember - Estructura de datos para cada miembro del equipo
// ============================================================================
export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

// ============================================================================
// [DATA] teamMembers - Array con la información del equipo
// ============================================================================
export const teamMembers: TeamMember[] = [
  {
    name: 'Juan Carlos Martinez',
    role: 'Gerente General',
    image: '/Equipo/Juan-Carlos-Martinez.webp'
  },
  {
    name: 'Gustavo Duque Izquierdo',
    role: 'Gerente de Diseño',
    image: '/Equipo/Gustavo-Duque-Izquierdo.webp'
  },
  {
    name: 'Julio Salazar',
    role: 'Gerente Financiero',
    image: '/Equipo/Julio-Salazar.webp'
  },
  {
    name: 'Maru Mendoza',
    role: 'Gerente Administrativa',
    image: '/Equipo/Maru-Mendoza.webp'
  },
  {
    name: 'Yeni Briceño',
    role: 'Contabilidad',
    image: '/Equipo/Karen-Tovar.webp'
  },
  {
    name: 'Lina Zhang',
    role: 'Arquitecta',
    image: '/Equipo/Lina-Zhang.webp'
  },
  {
    name: 'Miguel Forero',
    role: 'Administrativo',
    image: '/Equipo/Miguel-Forero.webp'
  },
  {
    name: 'José David Fandiño',
    role: 'Arquitecto',
    image: '/Equipo/Jose-David-Fandino.webp'
  }
];
