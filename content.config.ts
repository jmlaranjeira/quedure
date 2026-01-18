import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Schema compartido para productos
const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  image: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  price: z.string().optional(),
  brand: z.string().optional(),
  updatedAt: z.string().optional(),
  reparabilidad: z.number().min(1).max(10).optional(),
  reparabilidadSource: z.string().optional(),
  // Nuevos campos para productos
  descripcion_corta: z.string().optional(),
  garantia: z.string().optional(),
  donde_comprar: z.array(z.object({
    nombre: z.string(),
    url: z.string()
  })).optional(),
  testimonios: z.array(z.object({
    texto: z.string(),
    fuente: z.string()
  })).optional(),
  comparativa: z.object({
    alternativa_nombre: z.string(),
    alternativa_precio: z.number(),
    alternativa_duracion: z.string(),
    alternativa_coste_10_anos: z.number(),
    producto_duracion: z.string(),
    producto_coste_10_anos: z.number()
  }).optional()
})

export default defineContentConfig({
  collections: {
    // Guías de productos por categoría
    electronica: defineCollection({
      type: 'page',
      source: 'electronica/**/*.md',
      schema: productSchema.extend({
        category: z.string().default('electronica')
      })
    }),

    electrodomesticos: defineCollection({
      type: 'page',
      source: 'electrodomesticos/**/*.md',
      schema: productSchema.extend({
        category: z.string().default('electrodomesticos')
      })
    }),

    ropa: defineCollection({
      type: 'page',
      source: 'ropa/**/*.md',
      schema: productSchema.extend({
        category: z.string().default('ropa')
      })
    }),

    movilidad: defineCollection({
      type: 'page',
      source: 'movilidad/**/*.md',
      schema: productSchema.extend({
        category: z.string().default('movilidad')
      })
    }),

    // Tutoriales de reparación
    reparar: defineCollection({
      type: 'page',
      source: 'reparar/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string().default('reparar'),
        difficulty: z.enum(['facil', 'medio', 'avanzado']).optional(),
        time: z.string().optional(),
        tools: z.array(z.string()).optional(),
        image: z.string().optional(),
        video: z.string().optional(),
        updatedAt: z.string().optional()
      })
    }),

    // Artículos educativos
    aprender: defineCollection({
      type: 'page',
      source: 'aprender/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string().default('aprender'),
        topic: z.string().optional(),
        image: z.string().optional(),
        readingTime: z.number().optional(),
        updatedAt: z.string().optional()
      })
    })
  }
})
