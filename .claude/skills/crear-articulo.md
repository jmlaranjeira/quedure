---
name: crear-articulo
description: Guía completa para crear artículos educativos sobre consumo consciente, obsolescencia y derecho a reparar en QueDure
triggers:
  - /crear-articulo
  - crear articulo
  - nuevo articulo
  - escribir articulo sobre
---

# Skill: Crear Artículo Educativo QueDure

Esta skill te guía a través del proceso completo de crear un artículo educativo para la sección "Aprender" de QueDure, desde la investigación hasta la publicación.

---

## Fase 1: Tema y Enfoque

Pregunta al usuario la siguiente información:

1. **Tema principal**: ¿Sobre qué quieres escribir?
2. **Categoría temática**: Una de las siguientes:

| Categoría | Descripción |
|-----------|-------------|
| `obsolescencia-programada` | Historia, casos y denuncia de la obsolescencia |
| `derecho-reparar` | Legislación, movimiento repair, comunidades |
| `consumo-consciente` | Decisiones de compra, minimalismo, segunda mano |
| `impacto-ambiental` | Residuos electrónicos, huella de carbono, recursos |
| `historia-industrial` | Casos históricos, evolución de la industria |
| `legislacion-consumidor` | Leyes, garantías, derechos del consumidor |

3. **Ángulo específico**: ¿Qué aspecto concreto del tema quieres abordar?
4. **Mensaje clave**: ¿Qué quieres que el lector recuerde después de leer el artículo?

---

## Fase 2: Investigación Guiada

Guía al usuario sobre dónde buscar información según el tipo de contenido. Ofrece ayuda con WebSearch y WebFetch cuando sea útil.

### Fuentes recomendadas por tipo de contenido

| Tipo de contenido | Fuentes recomendadas |
|-------------------|----------------------|
| Historia y casos | Wikipedia, Archive.org, Google Scholar |
| Legislación | EUR-Lex, BOE, Legifrance, Diario Oficial UE |
| Denuncias y multas | HOP Francia, iFixit News, autoridades de consumo |
| Datos ambientales | Ellen MacArthur Foundation, UNEP, Eurostat |
| Reparabilidad | iFixit, Repair.eu, índices franceses |
| Economía circular | Ellen MacArthur Foundation, WRAP, Fundación para la Economía Circular |

### Recursos clave de investigación

| Tema | Fuente | URL |
|------|--------|-----|
| Reparabilidad | iFixit | ifixit.com |
| Legislación UE | EUR-Lex | eur-lex.europa.eu |
| Derecho a reparar | Repair.eu | repair.eu |
| Obsolescencia | HOP Francia | halteobsolescence.org |
| Economía circular | Ellen MacArthur Foundation | ellenmacarthurfoundation.org |
| Estadísticas UE | Eurostat | ec.europa.eu/eurostat |
| Legislación España | BOE | boe.es |

### Checklist de verificación de datos

Antes de incluir cualquier dato en el artículo, verifica:

- [ ] **Fuente primaria**: ¿Es una fuente original o cita otra fuente?
- [ ] **Fecha**: ¿Los datos están actualizados? (preferir últimos 3 anos)
- [ ] **Credibilidad**: ¿La fuente es reconocida? (instituciones, medios serios, academia)
- [ ] **Corroboración**: ¿Se puede verificar con otra fuente independiente?
- [ ] **Contexto**: ¿Se entiende el contexto del dato? (país, año, metodología)

---

## Fase 3: Estructura del Artículo

Los artículos de QueDure siguen esta estructura recomendada:

### 1. Introducción
- Definición clara del concepto
- Por qué importa al lector
- Gancho que capture la atención

### 2. Contexto o Historia
- Origen del problema o tema
- Evolución temporal
- Usar tablas cuando haya datos comparativos

### 3. Casos Concretos (2-4 documentados)
- Casos reales y verificables
- Nombres de empresas, fechas, cifras
- Consecuencias legales o de mercado

### 4. Situación Actual
- Estado de la legislación
- Tendencias del mercado
- Avances recientes

### 5. Qué Puedes Hacer Tú
- Acciones prácticas y concretas
- Antes de comprar / Cuando algo falla / Como ciudadano
- Recursos locales cuando sea posible

### 6. Conclusión
- Mensaje principal resumido
- Tono empoderador, no fatalista
- Llamada a la acción

### 7. Fuentes y Recursos
- Links a fuentes citadas
- Recursos adicionales para profundizar

---

## Fase 4: Guía de Estilo

### Tono QueDure

| Aspecto | Descripción |
|---------|-------------|
| **Educativo** | Explicar conceptos, no asumir conocimiento previo |
| **Crítico pero constructivo** | Denunciar prácticas, pero ofrecer alternativas |
| **Empoderador** | El lector puede hacer algo al respecto |
| **Honesto** | Reconocer matices, no todo es blanco o negro |

### SÍ hacer

- ✅ Citar datos verificables con fuentes
- ✅ Proponer acciones prácticas y realistas
- ✅ Reconocer avances y empresas que lo hacen bien
- ✅ Usar lenguaje accesible, evitar jerga técnica innecesaria
- ✅ Incluir tablas para comparativas y datos
- ✅ Usar ejemplos concretos y cercanos

### NO hacer

- ❌ **Greenwashing**: No exagerar credenciales ecológicas
- ❌ **Amarillismo**: No sensacionalizar ni exagerar
- ❌ **Generalizaciones**: No decir "todas las empresas" sin matizar
- ❌ **Fatalismo**: No transmitir que no hay solución
- ❌ **Publicidad encubierta**: No promocionar marcas sin justificación
- ❌ **Datos sin fuente**: No incluir estadísticas sin origen verificable

### Formato Markdown

- Usar encabezados jerárquicos (##, ###)
- Listas con viñetas para enumeraciones
- Tablas para datos comparativos
- **Negrita** para conceptos clave
- Links descriptivos (no "click aquí")

---

## Fase 5: Plantilla YAML

El frontmatter debe incluir todos los campos del schema de la colección `aprender`:

```yaml
---
title: "{Título descriptivo y atractivo}"
description: "{Descripción de 120-160 caracteres para SEO}"
type: article
category: aprender
topic: {slug-de-categoria}
author: "QueDure"
tags:
  - {tag1}
  - {tag2}
  - {tag3}
readingTime: {minutos-estimados}
updatedAt: "{YYYY-MM-DD}"
keyTakeaways:
  - "Punto clave 1 que el lector debe recordar"
  - "Punto clave 2 que el lector debe recordar"
  - "Punto clave 3 que el lector debe recordar"
  - "Punto clave 4 que el lector debe recordar"
---
```

### Campos obligatorios

| Campo | Descripción |
|-------|-------------|
| `title` | Título del artículo |
| `description` | Descripción SEO (120-160 chars) |
| `type` | Siempre `article` para artículos |
| `category` | Siempre `aprender` |
| `topic` | Slug de la categoría temática |
| `updatedAt` | Fecha en formato YYYY-MM-DD |

### Campos recomendados

| Campo | Descripción |
|-------|-------------|
| `author` | Normalmente "QueDure" |
| `tags` | 3-5 etiquetas relevantes |
| `readingTime` | Minutos de lectura (cuenta palabras / 200) |
| `keyTakeaways` | 3-5 puntos clave del artículo |

---

## Fase 6: Validación

Antes de crear el archivo, verifica estos checklists:

### Campos obligatorios del frontmatter

- [ ] `title` - Título descriptivo
- [ ] `description` - 120-160 caracteres
- [ ] `type: article`
- [ ] `category: aprender`
- [ ] `topic` - Categoría temática correcta
- [ ] `updatedAt` - Fecha actual

### Calidad del contenido

- [ ] **Fuentes citadas**: Todos los datos tienen fuente
- [ ] **Tono correcto**: Educativo, crítico pero constructivo
- [ ] **Acciones prácticas**: Sección "Qué puedes hacer tú" incluida
- [ ] **Sin greenwashing**: No exagera beneficios ambientales
- [ ] **Sin amarillismo**: No sensacionaliza
- [ ] **Equilibrado**: Reconoce matices y avances

### SEO y legibilidad

- [ ] Título < 60 caracteres
- [ ] Descripción 120-160 caracteres
- [ ] `keyTakeaways` incluidos (mínimo 3)
- [ ] Encabezados jerárquicos correctos
- [ ] Párrafos cortos (máx 4-5 líneas)
- [ ] Enlaces internos a otros contenidos de QueDure si aplica

---

## Fase 7: Crear Archivo

### Determinar la ruta

La ruta del archivo sigue este patrón:
```
content/aprender/{topic-slug}.md
```

**Reglas para el slug:**
- Minúsculas
- Espacios convertidos a guiones
- Sin caracteres especiales ni tildes
- Solo letras, números y guiones

**Ejemplos:**
- `content/aprender/obsolescencia-programada.md`
- `content/aprender/derecho-reparar-europa.md`
- `content/aprender/residuos-electronicos.md`

### Crear el archivo

1. **Crear el archivo** con la herramienta Write
2. **Confirmar la ruta** al usuario
3. **Proporcionar URL de preview**: `http://localhost:3000/aprender/{slug}`

---

## Ejemplo de Referencia

Ver este artículo como ejemplo de formato y tono correcto:
- `content/aprender/obsolescencia.md` - Artículo completo sobre obsolescencia programada

### Estructura del ejemplo

El artículo de referencia incluye:
- Introducción con definición clara
- Historia documentada (Cártel Phoebus)
- Caso emblemático (Bombilla Centenaria)
- Casos modernos (Impresoras, Batterygate)
- Tipología (tipos de obsolescencia)
- Legislación (Francia, UE)
- Acciones prácticas (antes de comprar, cuando falla, como ciudadano)
- Conclusión empoderadora
- Fuentes con enlaces

---

## Resumen del Proceso

1. **Tema y enfoque** → Definir qué y cómo
2. **Investigación** → Buscar datos verificables
3. **Estructura** → Seguir plantilla de secciones
4. **Estilo** → Tono educativo y empoderador
5. **Frontmatter** → Completar campos YAML
6. **Validación** → Verificar checklists
7. **Crear** → Escribir archivo y confirmar
