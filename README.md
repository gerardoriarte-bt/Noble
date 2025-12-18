# Noble Architecture Studio

Sitio web moderno y minimalista para Noble Architecture Studio, un estudio de arquitectura especializado en crear proyectos residenciales y comerciales que encarnan rectitud, dignidad y una presencia atemporal.

## 🚀 Características

- **Diseño Minimalista**: Interfaz limpia y elegante en modo claro
- **Timeline Interactivo**: Navegación horizontal y vertical de proyectos
- **Galería de Proyectos**: Visualización detallada de cada proyecto con modales
- **Sección de Equipo**: Presentación del equipo de trabajo
- **SEO Optimizado**: Meta tags, Schema.org, sitemap y robots.txt
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Animaciones Suaves**: Transiciones con Framer Motion

## 🛠️ Stack Tecnológico

- **React 18.3.1** - Biblioteca de UI
- **TypeScript 5.8.2** - Tipado estático
- **Vite 6.2.0** - Build tool y dev server
- **Tailwind CSS 3.4.17** - Framework de estilos
- **Framer Motion 10.16.16** - Animaciones

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/gerardoriarte-bt/Noble.git
cd Noble

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

## 🏗️ Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Previsualiza el build de producción
```

## 📁 Estructura del Proyecto

```
Noble/
├── components/          # Componentes React
│   ├── Header.tsx       # Navegación principal
│   ├── Footer.tsx       # Pie de página
│   ├── PerfectHero.tsx  # Sección hero
│   ├── Metrics.tsx      # Métricas/estadísticas
│   ├── HorizontalTimeline.tsx # Timeline de proyectos
│   ├── ProjectModal.tsx # Modal de detalles de proyecto
│   ├── Team.tsx         # Sección de equipo
│   ├── Contact.tsx      # Sección de contacto
│   └── SEOHead.tsx      # Componente SEO dinámico
├── pages/               # Páginas
│   └── HomePage.tsx     # Página principal
├── public/              # Archivos estáticos
│   ├── Equipo/          # Fotos del equipo
│   ├── Proyectos/       # Imágenes de proyectos
│   ├── image/           # Imágenes generales
│   ├── robots.txt       # Configuración SEO
│   └── sitemap.xml      # Sitemap SEO
└── dist/                # Build de producción (generado)
```

## 🌐 Despliegue

### Despliegue en AWS EC2

El proyecto incluye scripts de despliegue para AWS EC2 con el dominio noble.com:

1. **Configuración inicial:**
   ```bash
   sudo bash ec2-setup-noble.sh
   ```

2. **Configurar dominio y SSL:**
   ```bash
   sudo bash setup-domain-noble.sh
   ```

3. **Desplegar aplicación:**
   ```bash
   bash deploy-noble.sh
   ```

Para más detalles, consulta [DEPLOYMENT-GUIDE-NOBLE.md](./DEPLOYMENT-GUIDE-NOBLE.md)

## 📊 SEO

El proyecto incluye implementación completa de SEO técnico:

- Meta tags (Open Graph, Twitter Cards)
- Schema.org JSON-LD
- Sitemap.xml
- Robots.txt
- Alt texts optimizados

Ver [SEO-IMPLEMENTATION.md](./SEO-IMPLEMENTATION.md) para más detalles.

## 📝 Documentación

- [DEPLOYMENT-GUIDE-NOBLE.md](./DEPLOYMENT-GUIDE-NOBLE.md) - Guía de despliegue
- [SEO-IMPLEMENTATION.md](./SEO-IMPLEMENTATION.md) - Implementación SEO
- [CLEANUP-SUMMARY.md](./CLEANUP-SUMMARY.md) - Resumen de limpieza del proyecto

## 🎨 Diseño

- **Colores principales:**
  - Cloud: `#f2f2f1` (fondo)
  - Noir: `#121212` (texto)
  - Camel: `#c9a961` (acentos)

- **Tipografía:**
  - Fuente personalizada: CasagrandeCasabau-Bold
  - Font family: Sans-serif

## 📄 Licencia

Este proyecto es privado y propiedad de Noble Architecture Studio.

## 👥 Equipo

- **Juan Carlos Martinez** - Gerente General
- **Gustavo Duque Izquierdo** - Gerente de Diseño
- **Jhonatan Jimenez** - Gerente de Proyectos
- **José David Fandiño** - Arquitecto Junior
- **Karen Tovar** - Contabilidad
- **Ingrid Kemes** - Administrativo

---

**Noble Architecture Studio** - Creadores de Hitos Arquitectónicos
