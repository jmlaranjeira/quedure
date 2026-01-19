/**
 * Composable para SEO centralizado
 * Maneja Open Graph, Twitter Cards, Canonical URLs y JSON-LD Schema
 */

interface SeoConfig {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

interface ProductSeoConfig extends SeoConfig {
  brand?: string
  price?: string
  rating?: number
  reparabilidad?: number
  reparabilidadSource?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  offers?: Array<{
    nombre: string
    url: string
    precio?: string
  }>
}

interface ArticleSeoConfig extends SeoConfig {
  category?: string
  tags?: string[]
}

interface BreadcrumbItem {
  name: string
  url: string
}

const SITE_URL = 'https://quedure.es'
const SITE_NAME = 'QueDure.es'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

/**
 * SEO base para cualquier página
 */
export const useSeo = (config: SeoConfig) => {
  const route = useRoute()
  const canonicalUrl = config.url || `${SITE_URL}${route.path}`
  const imageUrl = config.image || DEFAULT_IMAGE

  useSeoMeta({
    title: config.title,
    description: config.description,

    // Open Graph
    ogTitle: config.title,
    ogDescription: config.description,
    ogImage: imageUrl,
    ogImageAlt: config.title,
    ogUrl: canonicalUrl,
    ogType: config.type || 'website',
    ogSiteName: SITE_NAME,
    ogLocale: 'es_ES',

    // Twitter Cards
    twitterCard: 'summary_large_image',
    twitterTitle: config.title,
    twitterDescription: config.description,
    twitterImage: imageUrl,
    twitterImageAlt: config.title,

    // Article specific
    ...(config.type === 'article' && {
      articlePublishedTime: config.publishedTime,
      articleModifiedTime: config.modifiedTime,
      articleAuthor: config.author || SITE_NAME
    })
  })

  // Canonical URL
  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  })
}

/**
 * SEO para páginas de producto con JSON-LD Schema
 */
export const useProductSeo = (config: ProductSeoConfig) => {
  // Aplicar SEO base
  useSeo({
    ...config,
    type: 'product',
    title: `${config.title} | ${SITE_NAME}`
  })

  const route = useRoute()
  const canonicalUrl = config.url || `${SITE_URL}${route.path}`

  // Extraer precio numérico
  const extractPrice = (priceStr?: string): string | undefined => {
    if (!priceStr) return undefined
    const match = priceStr.match(/[\d.,]+/)
    return match ? match[0].replace(',', '.') : undefined
  }

  // JSON-LD Product Schema
  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: config.title,
    description: config.description,
    image: config.image || DEFAULT_IMAGE,
    url: canonicalUrl,
    ...(config.brand && {
      brand: {
        '@type': 'Brand',
        name: config.brand
      }
    }),
    ...(config.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: config.rating,
        bestRating: 5,
        worstRating: 1,
        ratingCount: 1
      }
    }),
    ...(config.offers && config.offers.length > 0 && {
      offers: config.offers.map(offer => ({
        '@type': 'Offer',
        url: offer.url,
        priceCurrency: 'EUR',
        price: extractPrice(offer.precio),
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: offer.nombre
        }
      }))
    }),
    // Custom extension for repairability
    ...(config.reparabilidad && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Repairability Score',
          value: config.reparabilidad,
          maxValue: 10,
          ...(config.reparabilidadSource && {
            description: `Score by ${config.reparabilidadSource}`
          })
        }
      ]
    })
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(productSchema)
      }
    ]
  })
}

/**
 * SEO para artículos con JSON-LD Schema
 */
export const useArticleSeo = (config: ArticleSeoConfig) => {
  // Aplicar SEO base
  useSeo({
    ...config,
    type: 'article',
    title: `${config.title} | ${SITE_NAME}`
  })

  const route = useRoute()
  const canonicalUrl = config.url || `${SITE_URL}${route.path}`

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    image: config.image || DEFAULT_IMAGE,
    url: canonicalUrl,
    datePublished: config.publishedTime,
    dateModified: config.modifiedTime || config.publishedTime,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    ...(config.category && {
      articleSection: config.category
    }),
    ...(config.tags && {
      keywords: config.tags.join(', ')
    })
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(articleSchema)
      }
    ]
  })
}

/**
 * JSON-LD BreadcrumbList Schema
 */
export const useBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbSchema)
      }
    ]
  })
}

/**
 * JSON-LD Organization Schema (para usar en layout global)
 */
export const useOrganizationSchema = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: 'Guía de productos duraderos y reparables para un consumo más consciente',
    email: 'hola@quedure.es',
    sameAs: [
      'https://instagram.com/quedure.es'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hola@quedure.es'
    }
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(organizationSchema)
      }
    ]
  })
}

/**
 * JSON-LD WebSite Schema con SearchAction
 */
export const useWebsiteSchema = () => {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Guía de productos duraderos y reparables para un consumo más consciente',
    inLanguage: 'es',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/buscar?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(websiteSchema)
      }
    ]
  })
}

/**
 * JSON-LD LocalBusiness Schema para talleres de reparación
 */
export const useLocalBusinessSchema = (business: {
  name: string
  description?: string
  address: {
    streetAddress?: string
    addressLocality: string
    postalCode?: string
    addressCountry?: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  telephone?: string
  url?: string
  openingHours?: string[]
  priceRange?: string
}) => {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry || 'ES'
    },
    ...(business.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude
      }
    }),
    ...(business.telephone && { telephone: business.telephone }),
    ...(business.url && { url: business.url }),
    ...(business.openingHours && { openingHours: business.openingHours }),
    ...(business.priceRange && { priceRange: business.priceRange })
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(localBusinessSchema)
      }
    ]
  })
}
