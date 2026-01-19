---
name: crear-producto
description: Guía completa para crear fichas de productos duraderos y reparables en QueDure. Usar cuando el usuario diga "crear ficha de producto", "nuevo producto", "añadir producto" o invoque /crear-producto.
allowed-tools: Read, Write, Grep, Glob, WebSearch, WebFetch
---

# Skill: Crear Ficha de Producto QueDure

Esta skill te guía a través del proceso completo de crear una ficha de producto para QueDure, desde la investigación hasta la generación del archivo markdown.

---

## Fase 1: Información Inicial

Pregunta al usuario la siguiente información:

1. **Nombre del producto**: Marca + Modelo (ej: "Fairphone 6", "Miele WWI880")
2. **Categoría**: Una de las siguientes:
   - `electronica`
   - `electrodomesticos`
   - `ropa`
   - `movilidad`
3. **Subcategoría**: Según la categoría seleccionada:

| Categoría | Subcategorías disponibles |
|-----------|--------------------------|
| electronica | `moviles`, `ordenadores` |
| electrodomesticos | `lavado`, `cocina` |
| ropa | `basicos`, `calzado` |
| movilidad | `bicicletas`, `patinetes` |

> **Nota**: Si la subcategoría no existe, créala siguiendo el patrón existente.

---

## Fase 2: Investigación

Guía al usuario sobre dónde buscar información. Ofrece ayuda con WebSearch y WebFetch cuando sea útil.

### 2.1 Información Oficial del Fabricante
- **Web del fabricante**: Especificaciones técnicas, precio oficial, imágenes de producto
- **Ficha técnica PDF**: Datos detallados de rendimiento y características
- **Garantía y soporte**: Duración de garantía, disponibilidad de repuestos

### 2.2 Puntuacion de Reparabilidad

Buscar en este orden de prioridad:

1. **iFixit** (https://www.ifixit.com): Puntuacion oficial de desmontaje
2. **Indice frances de reparabilidad**: Para productos vendidos en Francia (obligatorio por ley)
3. **Evaluacion QueDure**: Si no hay puntuacion oficial, evaluar segun la metodologia documentada en `/aprender/indices-reparabilidad`:
   - Disponibilidad de repuestos (25%)
   - Facilidad de desmontaje (25%)
   - Documentacion (20%)
   - Herramientas necesarias (15%)
   - Red de reparacion (15%)

> **Ver metodologia completa**: [/aprender/indices-reparabilidad](/aprender/indices-reparabilidad)

### 2.3 Testimonios Reales de Usuarios

Buscar experiencias de usuarios con **más de 1 año de uso**:

- **Reddit**: r/BuyItForLife, r/spain, r/es, subreddits específicos del producto
- **Trustpilot**: Reseñas verificadas
- **Amazon**: Reseñas verificadas (filtrar por "compra verificada" y antigüedad)
- **Foros españoles**: Forocoches, Mediavida, HTCMania

### 2.4 Dónde Comprar

Buscar precios en:
- Web oficial del fabricante
- Amazon.es
- PcComponentes
- El Corte Inglés
- MediaMarkt
- Tiendas especializadas

---

## Fase 3: Cálculo de Comparativa

Calcular el coste real a 10-20 anos comparando con alternativas convencionales.

### Fórmula para alternativa convencional:
```
coste_10_anos = precio × (10 / anos_duración)
```

**Ejemplo**: Lavadora convencional 550€, dura 5 anos
```
coste_10_anos = 550 × (10 / 5) = 1.100€
```

### Fórmula para producto duradero:
```
coste_10_anos = precio + mantenimiento_estimado
```

**Ejemplo**: Miele 1.899€, dura 20 anos, mantenimiento mínimo
```
coste_10_anos = 1.899€ (el producto dura más de 10 anos sin reemplazo)
```

---

## Fase 4: Determinar Ruta del Archivo

La ruta sigue este patrón:
```
content/{categoria}/{subcategoria}/{marca}-{modelo-slug}.md
```

**Reglas para el slug:**
- Minúsculas
- Espacios convertidos a guiones
- Sin caracteres especiales
- Solo letras, números y guiones

**Ejemplos:**
- `content/electronica/moviles/fairphone-6.md`
- `content/electrodomesticos/lavado/miele-wwi880.md`
- `content/ropa/calzado/red-wing-iron-ranger.md`

---

## Fase 5: Generar Plantilla del Producto

Usa esta plantilla completa con todos los campos del schema:

```yaml
---
title: "{Marca} {Modelo}"
description: "{Descripción larga de 2-3 oraciones sobre la marca, el producto y por qué es duradero/reparable}"
descripcion_corta: "{Frase corta de marketing, máx 50 caracteres}"
category: {categoria}
subcategory: {subcategoria}
brand: "{Marca}"
origen: "{País de fabricación}"
price: "{precio}€"
rating: {1-5}
reparabilidad: {1-10}
reparabilidadSource: "{iFixit|Índice francés|QueDure}"
garantia: "{duración garantía}"
actualizaciones: "{anos de actualizaciones/soporte}"
image: "{URL de imagen del producto}"
pros:
  - "{Ventaja 1}"
  - "{Ventaja 2}"
  - "{Ventaja 3}"
  - "{Ventaja 4}"
cons:
  - "{Desventaja 1}"
  - "{Desventaja 2}"
  - "{Desventaja 3}"
donde_comprar:
  - nombre: "{Tienda 1}"
    url: "{URL}"
    precio: "{precio}€"
  - nombre: "{Tienda 2}"
    url: "{URL}"
    precio: "{precio}€"
especificaciones:
  {Spec1}: "{Valor1}"
  {Spec2}: "{Valor2}"
  {Spec3}: "{Valor3}"
alternativas:
  - "{Alternativa 1}"
  - "{Alternativa 2}"
testimonios:
  - texto: "{Testimonio real de usuario}"
    autor: "{Nombre o iniciales}"
    fuente: "{Reddit r/Spain|Trustpilot|Amazon|etc}"
  - texto: "{Otro testimonio}"
    autor: "{Nombre}"
    fuente: "{Fuente}"
comparativa:
  alternativa_nombre: "{Producto convencional genérico}"
  alternativa_precio: {precio_numero}
  alternativa_duracion: "{X-Y anos}"
  alternativa_coste_10_anos: {coste_numero}
  producto_duracion: "{X+ anos}"
  producto_coste_10_anos: {coste_numero}
updatedAt: "{YYYY-MM-DD}"
---
```

> **Nota**: El contenido markdown después del frontmatter es opcional. La ficha se genera automáticamente desde los campos YAML.

---

## Fase 6: Validación

Antes de crear el archivo, verifica:

### Campos Obligatorios
- [ ] `title`
- [ ] `description`
- [ ] `category`
- [ ] `subcategory`
- [ ] `brand`
- [ ] `price`
- [ ] `pros` (mínimo 3)
- [ ] `cons` (mínimo 2)
- [ ] `donde_comprar` (mínimo 1)
- [ ] `updatedAt`

### Campos Recomendados
- [ ] `descripcion_corta`
- [ ] `origen`
- [ ] `reparabilidad` + `reparabilidadSource`
- [ ] `garantia`
- [ ] `image`
- [ ] `especificaciones`
- [ ] `testimonios` (mínimo 1 real)
- [ ] `comparativa`
- [ ] `rating`

### Calidad del Contenido
- [ ] Descripción honesta, sin exageraciones
- [ ] Pros y cons equilibrados (no solo positivo)
- [ ] Testimonios de usuarios reales (no inventados)
- [ ] Precios actualizados
- [ ] URLs de compra funcionando

---

## Fase 7: Crear Archivo

1. **Crear el archivo** con la herramienta Write
2. **Confirmar la ruta** al usuario
3. **Proporcionar URL de preview**: `http://localhost:3000/{categoria}/{subcategoria}/{slug}`

---

## Guía de Estilo QueDure

### Tono
- **Directo**: Sin rodeos ni relleno
- **Honesto**: Mencionar limitaciones y desventajas reales
- **Práctico**: Enfocado en información útil para decisiones de compra
- **Sin greenwashing**: No exagerar credenciales ecológicas

### Descripciones
- Empezar con la marca y su historia/reputación
- Explicar POR QUÉ el producto es duradero, no solo QUE lo es
- Incluir datos concretos (anos de garantía, ciclos probados, etc.)

### Pros y Cons
- Pros específicos y verificables, no genéricos
- Cons honestos que ayuden al usuario a decidir
- Evitar "precio elevado" como único con (es obvio en productos premium)

### Testimonios
- Solo testimonios reales encontrados en fuentes públicas
- Preferir usuarios con más de 1 año de experiencia
- Citar la fuente exacta

---

## Ejemplo de Referencia

Ver estos productos como ejemplo de formato correcto:
- `content/electronica/moviles/fairphone-6.md`
- `content/electrodomesticos/lavado/miele-wwi880.md`
- `content/electronica/ordenadores/framework-laptop-16.md`
