# Guía de contribución

Gracias por tu interés en contribuir a QueDure.es. Este documento explica cómo puedes ayudar.

## Cómo contribuir

### Reportar errores

Si encuentras un bug, abre un [issue](https://github.com/jmlaranjeira/quedure/issues) incluyendo:

- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Capturas de pantalla si es relevante
- Navegador y sistema operativo

### Sugerir mejoras

Abre un issue con la etiqueta `enhancement` describiendo:

- Qué funcionalidad propones
- Por qué sería útil
- Posible implementación (opcional)

### Contribuir contenido

QueDure.es necesita:

- **Guías de productos** duraderos y reparables
- **Tutoriales de reparación** paso a paso
- **Artículos educativos** sobre consumo consciente

Consulta el README para ver el formato de cada tipo de contenido.

### Contribuir código

1. Haz fork del repositorio
2. Clona tu fork:
   ```bash
   git clone https://github.com/TU_USUARIO/quedure.git
   cd quedure
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea una rama para tu cambio:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```
5. Haz tus cambios
6. Verifica que todo funciona:
   ```bash
   npm run dev
   npm run build
   ```
7. Haz commit de tus cambios:
   ```bash
   git commit -m "Añade nueva funcionalidad X"
   ```
8. Sube tu rama:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```
9. Abre un Pull Request

## Estándares de código

### General

- Usa TypeScript cuando sea posible
- Sigue el estilo existente del código
- Mantén los cambios enfocados y pequeños
- Escribe mensajes de commit descriptivos

### Vue/Nuxt

- Usa Composition API con `<script setup>`
- Nombra componentes en PascalCase
- Usa Tailwind CSS para estilos
- Mantén la lógica en composables cuando sea reutilizable

### Contenido Markdown

- Incluye todos los campos del frontmatter requeridos
- Usa imágenes optimizadas (WebP preferido)
- Escribe descripciones claras para SEO
- Revisa ortografía y gramática

## Configuración del entorno

### Requisitos

- Node.js 18+
- npm 9+

### Instalación

```bash
# Clonar e instalar
git clone https://github.com/jmlaranjeira/quedure.git
cd quedure
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Iniciar desarrollo
npm run dev
```

### Scripts útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run generate` | Generar sitio estático |

## Proceso de revisión

1. Un mantenedor revisará tu PR
2. Puede que te pidamos cambios o aclaraciones
3. Una vez aprobado, se fusionará a main

## Código de conducta

Este proyecto sigue el [Contributor Covenant](CODE_OF_CONDUCT.md). Al participar, te comprometes a mantener un ambiente respetuoso y constructivo.

## Preguntas

Si tienes dudas, abre un issue con la etiqueta `question` o escribe a jmlaranjeiradeveloper@gmail.com.

---

Gracias por ayudar a promover un consumo más consciente y sostenible.
