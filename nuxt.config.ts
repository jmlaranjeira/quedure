// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Runtime config - variables de entorno
  runtimeConfig: {
    // Solo disponible en el servidor
    hostingerApiToken: ''
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap'
  ],

  // Sitemap configuration
  site: {
    url: 'https://quedure.es',
    name: 'QueDure.es'
  },

  sitemap: {
    xsl: false
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      title: 'QueDure.es - Guía de productos duraderos y reparables',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Descubre productos diseñados para durar. Guías de compra, reparación y consumo consciente para un estilo de vida sostenible.'
        },
        { name: 'theme-color', content: '#0D9488' },
        // Open Graph defaults
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'QueDure.es' },
        { property: 'og:locale', content: 'es_ES' },
        { property: 'og:title', content: 'QueDure.es - Guía de productos duraderos y reparables' },
        { property: 'og:description', content: 'Descubre productos diseñados para durar. Guías de compra, reparación y consumo consciente para un estilo de vida sostenible.' },
        { property: 'og:image', content: 'https://quedure.es/og-image.png' },
        { property: 'og:url', content: 'https://quedure.es' },
        // Twitter Card defaults
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'QueDure.es - Guía de productos duraderos y reparables' },
        { name: 'twitter:description', content: 'Descubre productos diseñados para durar. Guías de compra, reparación y consumo consciente para un estilo de vida sostenible.' },
        { name: 'twitter:image', content: 'https://quedure.es/og-image.png' },
        // Additional SEO
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'QueDure.es' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap' }
      ]
    }
  },

  nitro: {
    preset: 'node-server'
  },

  css: ['~/assets/css/main.css']
})
