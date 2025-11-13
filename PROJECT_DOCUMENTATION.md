# Noble Architecture Studio - Documentación del Proyecto

## 📋 Información General

**Nombre del Proyecto:** Noble Architecture Studio  
**Versión:** 0.0.0  
**Tipo:** Single Page Application (SPA)  
**Fecha de Documentación:** Enero 2025  
**Estado:** Producción - Light Mode

## 🎨 Descripción

Noble Architecture Studio es un sitio web moderno y minimalista para un estudio de arquitectura. El sitio presenta proyectos arquitectónicos, un timeline interactivo horizontal, y una estética limpia y profesional en modo claro (light mode).

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.3.1** - Biblioteca de UI
- **TypeScript 5.8.2** - Tipado estático
- **Vite 6.2.0** - Build tool y dev server
- **Tailwind CSS 3.4.17** - Framework de estilos
- **Framer Motion 10.16.16** - Animaciones
- **React Three Fiber 8.15.11** - Renderizado 3D (actualmente no utilizado)
- **Three.js 0.158.0** - Biblioteca 3D (actualmente no utilizado)

### Herramientas de Desarrollo
- **PostCSS 8.5.6** - Procesamiento de CSS
- **Autoprefixer 10.4.21** - Compatibilidad de navegadores

## 📁 Estructura del Proyecto

```
Noble/
├── components/          # Componentes React
│   ├── Header.tsx       # Navegación principal
│   ├── Footer.tsx      # Pie de página
│   ├── PerfectHero.tsx # Sección hero principal
│   ├── HorizontalTimeline.tsx # Timeline interactivo
│   ├── ImprovedPortfolio.tsx  # Galería de proyectos
│   ├── Metrics.tsx     # Métricas/estadísticas
│   ├── Contact.tsx     # Formulario de contacto
│   ├── MinimalistAbout.tsx # Página About
│   └── StaticRockModel.tsx  # Modelo 3D (no utilizado)
├── pages/              # Páginas principales
│   ├── HomePage.tsx    # Página principal
│   └── AboutPage.tsx   # Página About
├── public/             # Archivos estáticos
│   ├── image/          # Imágenes del hero
│   ├── images/portfolio/ # Imágenes del portfolio
│   ├── models/         # Modelos 3D (no utilizados)
│   └── Noble-logo-*.png # Logos
├── App.tsx             # Componente raíz
├── index.tsx           # Punto de entrada
├── index.css           # Estilos globales
├── tailwind.config.js  # Configuración Tailwind
├── vite.config.ts      # Configuración Vite
└── package.json        # Dependencias
```

## 🎨 Sistema de Diseño

### Colores (Light Mode)
- **Cloud (#f2f2f1)**: Fondo principal
- **Stone (#e6dfda)**: Fondo secundario
- **Noir (#121212)**: Texto principal
- **Camel (#b9a695)**: Acentos y detalles
- **Khaki (#B2806d)**: Acentos secundarios
- **Fossil (#373c37)**: Gris oscuro

### Tipografía
- **Sans-serif**: Inter (300, 400, 500, 700)
- **Serif**: Playfair Display (400, 700)

## 📄 Páginas y Secciones

### Homepage (`/`)
1. **Hero Section** (`PerfectHero.tsx`)
   - Imagen de fondo: `hero-background.jpg`
   - Logo isotipo de Noble
   - Texto: "CREATORS OF LANDMARKS"
   - Indicador de scroll animado

2. **Our Journey Through Time** (`HorizontalTimeline.tsx`)
   - Timeline horizontal interactivo
   - Scroll horizontal para navegar entre años
   - Proyectos destacados:
     - **2018 - Baltique**: Edificio de 13 pisos, 165 apartamentos
     - 2019 - First Residential
     - 2020 - Commercial Breakthrough
     - 2021 - Cultural Landmark
     - 2022 - International Recognition
     - 2023 - Urban Innovation
     - 2024 - Future Vision

3. **Metrics** (`Metrics.tsx`)
   - Estadísticas del estudio

4. **Featured Works** (`ImprovedPortfolio.tsx`)
   - Galería de proyectos con hover effects
   - Grid responsivo

5. **Contact** (`Contact.tsx`)
   - Formulario de contacto

### About Page (`/about`)
- **MinimalistAbout** (`MinimalistAbout.tsx`)
  - Diseño minimalista y desestructurado
  - Valores del estudio
  - Equipo

## 🚀 Scripts Disponibles

```bash
# Desarrollo local
npm run dev          # Inicia servidor de desarrollo (localhost:5173)

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza el build de producción
```

## 📦 Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd Noble

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🌐 Despliegue

### Despliegue Local
El proyecto está configurado para ejecutarse en `http://localhost:5173` durante el desarrollo.

### Despliegue en EC2
Scripts disponibles:
- `ec2-setup.sh` - Configuración inicial del servidor
- `deploy-local.sh` - Despliegue desde máquina local
- `setup-domain.sh` - Configuración de dominio y SSL

### Despliegue en AWS Amplify
- Configuración en `amplify.yml`
- Redirecciones SPA en `public/_redirects`

## 🎯 Características Principales

### 1. Light Mode UI
- Interfaz completamente en modo claro
- Fondos claros (#f2f2f1, #e6dfda)
- Textos oscuros (#121212)
- Contraste optimizado para legibilidad

### 2. Timeline Horizontal Interactivo
- Scroll horizontal suave
- Navegación entre años/proyectos
- Indicadores visuales
- Animaciones con Framer Motion

### 3. Portfolio Interactivo
- Grid responsivo
- Hover effects sutiles
- Overlays dinámicos
- Micro-interacciones

### 4. Diseño Responsive
- Mobile-first approach
- Breakpoints: md, lg, xl
- Navegación móvil con menú hamburguesa

### 5. Animaciones
- Transiciones suaves con Framer Motion
- Scroll-based animations
- Hover effects
- Parallax effects (en Hero)

## 📝 Configuración Actual

### Header
- Logo: `Noble-logo-blanco.png` (tamaño: h-24)
- Menú: About, Process, Portfolio, Contact
- Color del menú antes del scroll: #1C352D
- Color del menú después del scroll: oscuro (#121212)
- Fondo transparente que se vuelve opaco al hacer scroll

### Hero
- Imagen de fondo: `hero-background.jpg` (Asset 2-100.jpg)
- Logo isotipo centrado
- Texto "CREATORS OF LANDMARKS" en la esquina inferior derecha
- Overlay claro para legibilidad

### Timeline
- Proyecto destacado: Baltique (2018)
- Ubicación: "DESARROLLO - GERENCIA - DISEÑO - CONSTRUCCIÓN - OPERACIÓN TURÍSTICA"
- Sin año visible para Baltique
- Tipografía de ubicación: text-base

## 🔧 Configuración de Archivos

### `tailwind.config.js`
- Colores personalizados definidos
- Fuentes personalizadas (Inter, Playfair Display)
- Transiciones personalizadas

### `vite.config.ts`
- Configuración de Vite para React
- Build optimizado

### `index.css`
- Estilos globales
- Reset CSS
- Estilos de scrollbar
- Configuración de modo claro

## 📸 Assets

### Imágenes
- **Hero**: `public/image/hero-background.jpg`
- **Portfolio**: `public/images/portfolio/*`
- **Baltique**: `public/images/portfolio/baltique.jpg`
- **Logos**: 
  - `Noble-logo-blanco.png` (header/footer)
  - `Noble-logo-isotipo-blanco.png` (hero)

### Modelos 3D (No utilizados actualmente)
- `public/models/rock-model.obj`
- `public/models/rock-model.mtl`

## 🐛 Estado Actual

### Funcionalidades Activas
✅ Light mode completo  
✅ Timeline horizontal funcional  
✅ Portfolio con hover effects  
✅ Navegación responsive  
✅ Animaciones suaves  
✅ Despliegue en EC2 configurado  

### Funcionalidades Desactivadas
❌ Modelo 3D de roca (removido del Hero y Timeline)  
❌ Scroll parallax en roca 3D  

## 📋 Notas de Desarrollo

### Cambios Recientes
1. Migración completa a Light Mode
2. Remoción de elementos 3D
3. Actualización del proyecto Baltique en timeline
4. Ajustes de tipografía y colores
5. Optimización de imágenes

### Consideraciones
- El logo blanco en el header puede necesitar versión oscura para mejor visibilidad
- Los textos sobre imágenes en el portfolio se mantienen blancos para legibilidad
- El timeline usa scroll horizontal nativo del navegador

## 🔐 Seguridad

- No hay datos sensibles en el código
- Variables de entorno en `.env.local` (si aplica)
- Archivos `.pem` para EC2 no deben subirse al repositorio

## 📞 Soporte

Para más información sobre el proyecto, consultar:
- `EC2-DEPLOYMENT-GUIDE.md` - Guía de despliegue en EC2
- `PLAN_TRABAJO_LOCAL.md` - Plan de trabajo local
- `PRD_Noble_Architecture_Studio.md` - Documento de requisitos (si existe)

---

**Última actualización:** Enero 2025  
**Versión del documento:** 1.0

