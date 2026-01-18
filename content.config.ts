import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Guías de productos por categoría
    electronica: defineCollection({
      type: 'page',
      source: 'electronica/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string().default('electronica'),
        subcategory: z.string().optional(),
        image: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        pros: z.array(z.string()).optional(),
        cons: z.array(z.string()).optional(),
        price: z.string().optional(),
        brand: z.string().optional(),
        updatedAt: z.string().optional()
      })
    }),

    electrodomesticos: defineCollection({
      type: 'page',
      source: 'electrodomesticos/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string().default('electrodomesticos'),
        subcategory: z.string().optional(),
        image: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        pros: z.array(z.string()).optional(),
        cons: z.array(z.string()).optional(),
        price: z.string().optional(),
        brand: z.string().optional(),
        updatedAt: z.string().optional()
      })
    }),

    ropa: defineCollection({
      type: 'page',
      source: 'ropa/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string().default('ropa'),
        subcategory: z.string().optional(),
        image: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        pros: z.array(z.string()).optional(),
        cons: z.array(z.string()).optional(),
        price: z.string().optional(),
        brand: z.string().optional(),
        updatedAt: z.string().optional()
      })
    }),

    movilidad: defineCollection({
      type: 'page',
      source: 'movilidad/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string().default('movilidad'),
        subcategory: z.string().optional(),
        image: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        pros: z.array(z.string()).optional(),
        cons: z.array(z.string()).optional(),
        price: z.string().optional(),
        brand: z.string().optional(),
        updatedAt: z.string().optional()
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
