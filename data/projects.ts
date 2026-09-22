// ============================================================================
// [INTERFACE] Project - Estructura de datos para cada proyecto
// ============================================================================
export interface Project {
  year: number;
  title: string;
  slug: string; // URL de la página del proyecto: /proyectos/<slug>
  seoDescription: string; // Resumen para meta description y schema
  description: string;
  image: string;
  verticalImage?: string;
  horizontalImage?: string;
  location: string;
  detailedDescription?: string;
  gallery?: string[];
  specifications?: string[];
}

// ============================================================================
// [DATA] projects - Fuente única de los proyectos (carrusel, páginas y SEO)
// ============================================================================
export const projects: Project[] = [
  {
    year: 2026,
    title: "Casa Pizano",
    slug: "casa-pizano",
    seoDescription: "Torre residencial boutique de 7 plantas con entre 10 y 11 apartamentos en un lote de 806,3 m² en El Chicó, Bogotá. Inicio de obra en octubre de 2026.",
    description: "Un proyecto residencial boutique donde la arquitectura se integra con la naturaleza para crear una experiencia de vida exclusiva.",
    image: "/Proyectos/CASA-PIZANO/IMG-GENERAL.webp",
    horizontalImage: "/Proyectos/CASA-PIZANO/IMG-GENERAL.webp",
    verticalImage: "/Proyectos/CASA-PIZANO/IMG-INTERNA.webp",
    location: "El Chicó, Bogotá",
    detailedDescription: "Un proyecto residencial boutique donde la arquitectura se integra con la naturaleza para crear una experiencia de vida exclusiva. Ubicado en El Chicó, Bogotá, en una zona de alto valor residencial y comercial.\n\nCasa Pizano se desarrolla en un lote de 806,3 m² y contempla una torre residencial boutique de 7 plantas, con entre 10 y 11 apartamentos de diferentes tipologías. El proyecto combina espacios privados y áreas comunes como terraza, gimnasio, zona BBQ, salón, oficina, lobby y piso multifuncional.\n\nInicio de obra: octubre 2026.",
    gallery: [
      "/Proyectos/CASA-PIZANO/IMG-GENERAL.webp",
      "/Proyectos/CASA-PIZANO/IMG-INTERNA.webp"
    ],
    specifications: [
      "Torre residencial boutique de 7 plantas",
      "Entre 10 y 11 apartamentos",
      "Lote de 806,3 m²",
      "Terraza, gimnasio y zona BBQ",
      "Salón, oficina, lobby y piso multifuncional",
      "Inicio de obra: octubre 2026"
    ]
  },
  {
    year: 2022,
    title: "Dominique",
    slug: "dominique",
    seoDescription: "Edificio de 14 pisos con 120 apartamentos en el barrio Cielomar de Cartagena, a 200 metros de la playa de la zona norte.",
    description: "Estratégicamente ubicado en el barrio Cielomar, a solo 200 metros de la mejor y más exclusiva playa de la zona norte.",
    image: "/Proyectos/DOMINIQUE/IMG-GENERAL.webp",
    horizontalImage: "/Proyectos/DOMINIQUE/IMG-GENERAL.webp",
    verticalImage: "/Proyectos/DOMINIQUE/IMG-INTERNA.webp",
    location: "Cartagena de Indias",
    detailedDescription: "Estratégicamente ubicado en el barrio Cielomar, Dominique está a solo 200 metros de la mejor y más exclusiva playa de la zona norte, contigua al hotel Las Américas, y en el corazón de la recuperada ciénaga de la virgen.",
    gallery: [
      "/Proyectos/DOMINIQUE/IMG-GENERAL.webp",
      "/Proyectos/DOMINIQUE/IMG-INTERNA.webp"
    ],
    specifications: [
      "Edificio de 14 pisos",
      "120 apartamentos",
      "1 y 2 habitaciones entre 62 m² hasta 110 m²",
      "105 estacionamientos privados",
      "17 de visitantes",
      "3 ascensores"
    ]
  },
  {
    year: 2019,
    title: "Martinique",
    slug: "martinique",
    seoDescription: "Edificio de 15 pisos con 99 apartamentos en el barrio Cielomar de Cartagena, a 200 metros de la playa de la zona norte.",
    description: "Estratégicamente ubicado en el barrio Cielomar, a solo 200 metros de la mejor y más exclusiva playa de la zona norte.",
    image: "/Proyectos/MARTINIQUE/IMG-GENERAL.webp",
    horizontalImage: "/Proyectos/MARTINIQUE/IMG-GENERAL.webp",
    verticalImage: "/Proyectos/MARTINIQUE/IMG-INTERNA.webp",
    location: "Cartagena de Indias",
    detailedDescription: "Estratégicamente ubicado en el barrio Cielomar, Martinique está a solo 200 metros de la mejor y más exclusiva playa de la zona norte, contigua al hotel Las Américas, y en el corazón de la recuperada ciénaga de la virgen.",
    gallery: [
      "/Proyectos/MARTINIQUE/IMG-GENERAL.webp",
      "/Proyectos/MARTINIQUE/IMG-INTERNA.webp"
    ],
    specifications: [
      "Edificio de 15 pisos",
      "99 apartamentos",
      "1 y 2 habitaciones entre 65 m² hasta 110 m²",
      "105 estacionamientos privados",
      "17 de visitantes",
      "3 ascensores"
    ]
  },
  {
    year: 2020,
    title: "Antique",
    slug: "antique",
    seoDescription: "Edificio de apartamentos de 5 pisos y 7.200 m² de construcción en el barrio Nuevo Country de Bogotá, con zona verde a lo ancho del proyecto.",
    description: "Ya no tienes que salir de la ciudad para encontrar comodidad y poder disfrutar de zonas verdes. El proyecto Antique traerá la calidad de vida que tú y tu familia estaban buscando.",
    image: "/Proyectos/ANTIQUE/IMG-GENERAL.webp",
    horizontalImage: "/Proyectos/ANTIQUE/IMG-GENERAL.webp",
    verticalImage: "/Proyectos/ANTIQUE/IMG-INTERNA.webp",
    location: "Bogotá",
    detailedDescription: "ANTIQUE es un proyecto de vivienda con 36 unidades de apartamentos en 5 pisos de altura que ofrece una excelente ubicación en un sector residencial consolidado de la ciudad de Bogotá. El proyecto es el marco y fondo de un agradable y reservado parque que ofrece una ventaja única para sus propietarios y habitantes ya que cuenta con una zona verde a lo ancho del proyecto.\n\nEstructuración, Diseño, Promoción, Gerencia y Construcción Edificio de Apartamentos Antique en Bogotá, Colombia. Desarrollo propio en consorcio con CLV Arquitectura y Construcción y Mas Ingeniería SC. Fiduciaria Fidubogotá y crédito constructor Banco de Bogotá. Proyecto de 7200m² de construcción, COP 22,000 millones en ventas, 40 apartamentos y 5 pisos de altura en el barrio Nuevo Country (sector Antigua). Proyecto culminado exitosamente.",
    gallery: [
      "/Proyectos/ANTIQUE/IMG-GENERAL.webp",
      "/Proyectos/ANTIQUE/IMG-INTERNA.webp"
    ],
    specifications: [
      "Edificio de 5 pisos",
      "40 apartamentos",
      "7200 m² de construcción",
      "Barrio Nuevo Country (sector Antigua)",
      "Zona verde a lo ancho del proyecto",
      "Sector residencial consolidado"
    ]
  },
  {
    year: 2023,
    title: "Baruq",
    slug: "baruq",
    seoDescription: "Proyecto de 360 unidades en 3 edificios de 5 pisos más altillo, para uso residencial y turístico, en la milla de oro de Barú, Cartagena.",
    description: "Proyecto único de 360 unidades, 3 edificios, cada uno de 5 pisos más altillo. Un proyecto que se desarrollará en 3 etapas de venta.",
    image: "/Proyectos/BARUQ/PLANTA-BARUQ-general.webp",
    horizontalImage: "/Proyectos/BARUQ/PLANTA-BARUQ-general.webp",
    verticalImage: "/Proyectos/BARUQ/IMG-INTERNA.webp",
    location: "Cartagena",
    detailedDescription: "Proyecto único de 360 unidades, 3 edificios, cada uno de 5 pisos más altillo. Un proyecto que se desarrollará en 3 etapas de venta. Iniciando con 120 unidades en la primera etapa, cada etapa para uso residencial y turístico.\n\nSOSTENIBLE: Construcción consciente con el entorno.\n\nINVERSIÓN INTELIGENTE: Diseñado para maximizar la inversión, con un modelo mixto de rentabilidad y experiencia.\n\nEXPERIENCIA: La localización garantiza el mejor spot marino del caribe colombiano. Ubicado en la milla de oro de Barú.\n\nÚNICO: Único proyecto de villas hoteleras o turística en Cartagena.\n\nLUJO: Diseño original de la reconocida firma Duque Martínez, mezclando el ambiente de la playa costera con el paisaje caribeño.",
    gallery: [
      "/Proyectos/BARUQ/PLANTA-BARUQ-general.webp",
      "/Proyectos/BARUQ/IMG-INTERNA.webp"
    ],
    specifications: [
      "Estructura: 5 pisos + altillo",
      "Área lote: 3.3 hectáreas",
      "Área vendible: 19.800 m²",
      "Áreas comunes: 1.200 m²",
      "Unidades residenciales: 320 unidades",
      "360 unidades totales",
      "3 edificios",
      "3 etapas de venta"
    ]
  },
  {
    year: 2019,
    title: "Emaus",
    slug: "emaus",
    seoDescription: "Diseño, gerencia y construcción de la Parroquia Discípulos de Emaús en Bogotá: 1.500 m² de facilidades parroquiales.",
    description: "Diseño, gerencia y construcción Parroquia Discípulos de Emaús en Bogotá, Colombia.",
    image: "/Proyectos/EMAUS/IMG-GENERAL.webp",
    verticalImage: "/Proyectos/EMAUS/IMG-INTERNA.webp",
    location: "Bogotá",
    detailedDescription: "Diseño, gerencia y construcción Parroquia Discípulos de Emaús en Bogotá, Colombia. Diseño, construcción y gerencia de proyecto para las facilidades parroquiales de 1500m² incluyendo el espacio de congregación. Proyecto culminado exitosamente.",
    gallery: [
      "/Proyectos/EMAUS/IMG-GENERAL.webp",
      "/Proyectos/EMAUS/IMG-INTERNA.webp"
    ],
    specifications: [
      "1500 m² de facilidades parroquiales",
      "Espacio de congregación",
      "Diseño, construcción y gerencia",
      "Proyecto culminado exitosamente"
    ]
  },
  {
    year: 2019,
    title: "Serrezuela",
    slug: "serrezuela",
    seoDescription: "Centro comercial de lujo Plaza La Serrezuela en Cartagena: 22.400 m² construidos con centro cultural y centro de convenciones.",
    description: "Centro comercial de lujo con arquitectura grandiosa que remite a una parte importante de la historia colombiana.",
    image: "/Proyectos/SERREZUELA/IMG-GENERAL.webp",
    horizontalImage: "/Proyectos/SERREZUELA/IMG-GENERAL.webp",
    verticalImage: "/Proyectos/SERREZUELA/IMG-INTERNA.webp",
    location: "Cartagena de Indias",
    detailedDescription: "El centro comercial de lujo Plaza La Serrezuela es imponente: la construcción de una arquitectura grandiosa, que remite a una parte importante de la historia colombiana, suma 22.400 m2 de área construida, de los cuales más de 10.000 m2 se configuran como ABA. Esta división se debe a que, además de ser un lujoso centro comercial, el emprendimiento también alberga un centro cultural y un centro de convenciones. Todo esto en el corazón de Cartagena.",
    gallery: [
      "/Proyectos/SERREZUELA/IMG-GENERAL.webp",
      "/Proyectos/SERREZUELA/IMG-INTERNA.webp"
    ],
    specifications: [
      "22.000 m² de área total",
      "22.400 m² de área construida",
      "Más de 10.000 m² de ABA",
      "Centro comercial de lujo",
      "Centro cultural",
      "Centro de convenciones"
    ]
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
