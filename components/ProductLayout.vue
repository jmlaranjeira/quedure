<script setup lang="ts">
interface DondeComprar {
  nombre: string
  url: string
}

interface Testimonio {
  texto: string
  fuente: string
}

interface Comparativa {
  alternativa_nombre: string
  alternativa_precio: number
  alternativa_duracion: string
  alternativa_coste_10_anos: number
  producto_duracion: string
  producto_coste_10_anos: number
}

interface Props {
  article: {
    title: string
    description: string
    descripcion_corta?: string
    category?: string
    subcategory?: string
    brand?: string
    price?: string
    rating?: number
    reparabilidad?: number
    reparabilidadSource?: string
    garantia?: string
    image?: string
    pros?: string[]
    cons?: string[]
    donde_comprar?: DondeComprar[]
    testimonios?: Testimonio[]
    comparativa?: Comparativa
    updatedAt?: string
  }
  categoryName: string
  categoryPath: string
  colorScheme?: 'primary' | 'secondary' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: 'primary'
})

const bgColorClass = computed(() => {
  const schemes = {
    primary: 'bg-primary-50',
    secondary: 'bg-secondary-50',
    accent: 'bg-accent-50'
  }
  return schemes[props.colorScheme]
})

const lightBgClass = computed(() => {
  const schemes = {
    primary: 'bg-primary-100',
    secondary: 'bg-secondary-100',
    accent: 'bg-accent-100'
  }
  return schemes[props.colorScheme]
})

const textColorClass = computed(() => {
  const schemes = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    accent: 'text-accent-600'
  }
  return schemes[props.colorScheme]
})

const placeholderIconColor = computed(() => {
  const schemes = {
    primary: 'text-primary-300',
    secondary: 'text-secondary-300',
    accent: 'text-accent-300'
  }
  return schemes[props.colorScheme]
})
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <section :class="['py-4', bgColorClass]">
      <div class="container-wide">
        <nav class="text-sm">
          <NuxtLink to="/" :class="[textColorClass, 'hover:underline']">Inicio</NuxtLink>
          <span class="mx-2 text-gray-400">/</span>
          <NuxtLink :to="categoryPath" :class="[textColorClass, 'hover:underline']">{{ categoryName }}</NuxtLink>
          <span class="mx-2 text-gray-400">/</span>
          <span class="text-gray-600">{{ article.title }}</span>
        </nav>
      </div>
    </section>

    <!-- Hero: 2 columnas -->
    <section :class="['py-8 lg:py-12', bgColorClass]">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Columna izquierda: Imagen -->
          <div class="flex items-center justify-center">
            <div
              v-if="article.image"
              class="w-full max-w-md aspect-square rounded-xl overflow-hidden bg-white shadow-lg"
            >
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Placeholder si no hay imagen -->
            <div
              v-else
              :class="['w-full max-w-md aspect-square rounded-xl flex items-center justify-center', lightBgClass]"
            >
              <svg
                :class="['w-24 h-24', placeholderIconColor]"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          </div>

          <!-- Columna derecha: Info -->
          <div class="flex flex-col justify-center">
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              {{ article.title }}
            </h1>

            <p class="text-lg text-gray-600 mb-6">
              {{ article.descripcion_corta || article.description }}
            </p>

            <!-- Reparability Score -->
            <div v-if="article.reparabilidad" class="mb-6">
              <div class="text-xs text-gray-500 mb-2 uppercase tracking-wide">Puntuación de reparabilidad</div>
              <ReparabilityScore
                :score="article.reparabilidad"
                :source="article.reparabilidadSource"
              />
            </div>

            <!-- Meta info -->
            <div class="flex flex-wrap gap-3 mb-6">
              <span v-if="article.brand" class="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                {{ article.brand }}
              </span>
              <span v-if="article.price" class="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                {{ article.price }}
              </span>
              <span v-if="article.garantia" class="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                Garantía: {{ article.garantia }}
              </span>
            </div>

            <!-- CTAs de compra -->
            <div v-if="article.donde_comprar && article.donde_comprar.length > 0" class="flex flex-wrap gap-3">
              <a
                v-for="tienda in article.donde_comprar"
                :key="tienda.nombre"
                :href="tienda.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                <span>Comprar en {{ tienda.nombre }}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenido principal -->
    <article class="py-12">
      <div class="container-narrow">
        <!-- Pros/Cons -->
        <div v-if="article.pros || article.cons" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div v-if="article.pros" class="bg-green-50 rounded-lg p-6">
            <h3 class="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Ventajas
            </h3>
            <ul class="space-y-2">
              <li v-for="pro in article.pros" :key="pro" class="text-green-700 text-sm flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                {{ pro }}
              </li>
            </ul>
          </div>
          <div v-if="article.cons" class="bg-red-50 rounded-lg p-6">
            <h3 class="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Desventajas
            </h3>
            <ul class="space-y-2">
              <li v-for="con in article.cons" :key="con" class="text-red-700 text-sm flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                {{ con }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Tabs con contenido -->
        <div class="mb-12">
          <ProductTabs :color-scheme="colorScheme">
            <slot />
          </ProductTabs>
        </div>

        <!-- Comparativa de coste -->
        <div v-if="article.comparativa" class="mb-12">
          <CostComparison
            :comparativa="article.comparativa"
            :product-name="article.title"
            :product-price="article.price || ''"
          />
        </div>

        <!-- Testimonios -->
        <div v-if="article.testimonios && article.testimonios.length > 0" class="mb-12">
          <Testimonials :testimonios="article.testimonios" />
        </div>

        <!-- Updated date -->
        <div v-if="article.updatedAt" class="pt-6 border-t border-gray-200 text-sm text-gray-500">
          Última actualización: {{ article.updatedAt }}
        </div>
      </div>
    </article>
  </div>
</template>
