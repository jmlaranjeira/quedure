# QueDure.es

Guía de productos duraderos y reparables. Consume menos, elige mejor.

## Sobre el proyecto

QueDure.es es una plataforma web que ayuda a los consumidores a encontrar productos diseñados para durar, con información sobre reparabilidad, sostenibilidad y calidad a largo plazo.

### Características

- **Guías de productos** por categoría (electrónica, electrodomésticos, ropa, movilidad)
- **Tutoriales de reparación** paso a paso
- **Artículos educativos** sobre consumo consciente
- **Sistema de valoración** con pros/contras y puntuación
- **Diseño responsive** optimizado para móvil y escritorio

## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) con TypeScript
- **Contenido**: [Nuxt Content v3](https://content.nuxt.com/) (markdown con colecciones tipadas)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) con paleta personalizada
- **Imágenes**: [@nuxt/image](https://image.nuxt.com/)

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/jmlaranjeira/quedure.git
cd quedure

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## Estructura del proyecto

```
quedure/
├── assets/css/          # Estilos globales
├── components/          # Componentes Vue
│   ├── ArticleLayout.vue    # Layout para artículos
│   ├── ArticleList.vue      # Grid de tarjetas
│   ├── CategoryGrid.vue     # Grid de categorías
│   ├── TheHeader.vue        # Navegación principal
│   └── TheFooter.vue        # Pie de página
├── content/             # Contenido en Markdown
│   ├── electronica/
│   ├── electrodomesticos/
│   ├── ropa/
│   ├── movilidad/
│   ├── reparar/
│   └── aprender/
├── layouts/             # Layouts de página
├── pages/               # Rutas de la aplicación
├── public/              # Archivos estáticos
├── content.config.ts    # Configuración de colecciones
├── nuxt.config.ts       # Configuración de Nuxt
└── tailwind.config.ts   # Configuración de Tailwind
```

## Añadir contenido

### Guía de producto

Crea un archivo `.md` en la carpeta de categoría correspondiente:

```markdown
---
title: "Nombre del producto"
description: "Descripción breve para SEO"
category: electronica
subcategory: moviles
brand: "Marca"
price: "299€"
rating: 4
pros:
  - "Ventaja 1"
  - "Ventaja 2"
cons:
  - "Desventaja 1"
updatedAt: "2024-01-15"
---

## Contenido del artículo

Tu análisis aquí en Markdown...
```

### Tutorial de reparación

```markdown
---
title: "Cómo reparar X"
description: "Tutorial paso a paso"
category: reparar
difficulty: medio  # facil, medio, avanzado
time: "30 minutos"
tools:
  - "Destornillador"
  - "Pinzas"
updatedAt: "2024-01-15"
---

## Paso 1: Preparación

Instrucciones...
```

### Artículo educativo

```markdown
---
title: "Título del artículo"
description: "Descripción para SEO"
category: aprender
topic: "economia-circular"
readingTime: 5
updatedAt: "2024-01-15"
---

Contenido del artículo...
```

## Paleta de colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary | `#0D9488` | Acciones principales, enlaces |
| Secondary | `#F97316` | Sección "Reparar", CTAs secundarios |
| Accent | `#0891B2` | Sección "Aprender" |
| Text | `#1F2937` | Texto principal |
| Background | `#FAFAFA` | Fondo de página |

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run generate # Generar sitio estático
```

## Despliegue

El proyecto está configurado para desplegar en Node.js (Railway, Render, etc.):

```bash
npm run build
node .output/server/index.mjs
```

Para sitio estático:

```bash
npm run generate
# Subir contenido de .output/public/
```

## Contribuir

1. Fork del repositorio
2. Crear rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit (`git commit -m 'Añade nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## Licencia

MIT

---

Hecho con cuidado para un consumo consciente.
