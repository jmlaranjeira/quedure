---
name: crear-articulo
description: Guía para crear artículos educativos sobre consumo consciente, obsolescencia y derecho a reparar. Usar cuando el usuario diga "crear articulo", "nuevo articulo", "escribir articulo sobre" o invoque /crear-articulo.
allowed-tools: Read, Write, Grep, Glob, WebSearch, WebFetch
---

# Crear Artículo Educativo QueDure

Guía al usuario a través del proceso completo de crear un artículo educativo para la sección "Aprender" de QueDure.

---

## Fase 1: Tema y Enfoque

Pregunta al usuario:

1. **Tema principal**: ¿Sobre qué quieres escribir?
2. **Categoría temática**:

| Categoría | Descripción |
|-----------|-------------|
| `obsolescencia-programada` | Historia, casos y denuncia de la obsolescencia |
| `derecho-reparar` | Legislación, movimiento repair, comunidades |
| `consumo-consciente` | Decisiones de compra, minimalismo, segunda mano |
| `impacto-ambiental` | Residuos electrónicos, huella de carbono, recursos |
| `historia-industrial` | Casos históricos, evolución de la industria |
| `legislacion-consumidor` | Leyes, garantías, derechos del consumidor |

3. **Ángulo específico**: ¿Qué aspecto concreto del tema quieres abordar?
4. **Mensaje clave**: ¿Qué quieres que el lector recuerde?

---

## Fase 2: Investigación Guiada

Ofrece ayuda con WebSearch y WebFetch para buscar información.

### Fuentes recomendadas

| Tipo de contenido | Fuentes recomendadas |
|-------------------|----------------------|
| Historia y casos | Wikipedia, Archive.org, Google Scholar |
| Legislación | EUR-Lex, BOE, Legifrance |
| Denuncias y multas | HOP Francia, iFixit News, autoridades de consumo |
| Datos ambientales | Ellen MacArthur Foundation, UNEP, Eurostat |
| Reparabilidad | iFixit, Repair.eu, índices franceses |

### Recursos clave

| Tema | Fuente | URL |
|------|--------|-----|
| Reparabilidad | iFixit | ifixit.com |
| Legislación UE | EUR-Lex | eur-lex.europa.eu |
| Derecho a reparar | Repair.eu | repair.eu |
| Obsolescencia | HOP Francia | halteobsolescence.org |
| Economía circular | Ellen MacArthur Foundation | ellenmacarthurfoundation.org |

### Checklist de verificación

- [ ] Fuente primaria identificada
- [ ] Datos actualizados (últimos 3 años)
- [ ] Fuente reconocida (instituciones, medios serios)
- [ ] Corroborable con otra fuente
- [ ] Contexto claro (país, año, metodología)

---

## Fase 3: Estructura del Artículo

1. **Introducción**: Definición + por qué importa
2. **Contexto/Historia**: Origen, evolución, tablas si aplica
3. **Casos Concretos**: 2-4 documentados con nombres, fechas, cifras
4. **Situación Actual**: Legislación, tendencias, avances
5. **Qué Puedes Hacer Tú**: Acciones prácticas
6. **Conclusión**: Mensaje + empoderamiento
7. **Fuentes**: Links a fuentes citadas

---

## Fase 4: Guía de Estilo

### Tono QueDure

| Aspecto | Descripción |
|---------|-------------|
| **Educativo** | Explicar conceptos, no asumir conocimiento previo |
| **Crítico pero constructivo** | Denunciar prácticas, ofrecer alternativas |
| **Empoderador** | El lector puede hacer algo |
| **Honesto** | Reconocer matices |

### SÍ hacer
- Citar datos verificables con fuentes
- Proponer acciones prácticas
- Reconocer avances y buenas prácticas
- Lenguaje accesible
- Tablas para comparativas

### NO hacer
- Greenwashing
- Amarillismo
- Generalizaciones sin matizar
- Fatalismo
- Publicidad encubierta
- Datos sin fuente

---

## Fase 5: Plantilla YAML

```yaml
---
title: "{Título descriptivo}"
description: "{120-160 caracteres para SEO}"
type: article
category: aprender
topic: {slug-categoria}
author: "QueDure"
tags:
  - {tag1}
  - {tag2}
  - {tag3}
readingTime: {minutos}
updatedAt: "{YYYY-MM-DD}"
keyTakeaways:
  - "Punto clave 1"
  - "Punto clave 2"
  - "Punto clave 3"
---
```

### Campos obligatorios
- `title`, `description`, `type: article`, `category: aprender`, `topic`, `updatedAt`

### Campos recomendados
- `author`, `tags`, `readingTime`, `keyTakeaways`

---

## Fase 6: Validación

### Campos obligatorios
- [ ] title, description, type, category, topic, updatedAt

### Calidad del contenido
- [ ] Fuentes citadas
- [ ] Tono educativo y constructivo
- [ ] Sección "Qué puedes hacer tú"
- [ ] Sin greenwashing ni amarillismo
- [ ] Equilibrado

### SEO
- [ ] Título < 60 chars
- [ ] Descripción 120-160 chars
- [ ] keyTakeaways (mínimo 3)
- [ ] Párrafos cortos

---

## Fase 7: Crear Archivo

Ruta: `content/aprender/{topic-slug}.md`

1. Crear archivo con Write
2. Confirmar ruta
3. URL preview: `http://localhost:3000/aprender/{slug}`

---

## Referencia

Ver ejemplo de formato y tono: `content/aprender/obsolescencia.md`
