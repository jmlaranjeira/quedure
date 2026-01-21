<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface DondeComprar {
  nombre: string
  url: string
  precio?: string
}

interface Testimonio {
  texto: string
  autor?: string
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
    origen?: string
    price?: string
    rating?: number
    reparabilidad?: number
    reparabilidadSource?: string
    garantia?: string
    actualizaciones?: string
    image?: string
    pros?: string[]
    cons?: string[]
    donde_comprar?: DondeComprar[]
    testimonios?: Testimonio[]
    comparativa?: Comparativa
    especificaciones?: Record<string, string>
    alternativas?: string[]
    updatedAt?: string
  }
  categoryName: string
  categoryPath: string
  colorScheme?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: 'primary'
})

const imageLoaded = ref(false)
const showComparePrices = ref(false)

onMounted(() => {
  // Trigger animations after mount
})

const scoreBadgeColor = computed(() => {
  if (!props.article.reparabilidad) return 'bg-gray-500'
  if (props.article.reparabilidad >= 8) return 'bg-emerald-500 shadow-emerald-500/30'
  if (props.article.reparabilidad >= 5) return 'bg-amber-500 shadow-amber-500/30'
  return 'bg-red-500 shadow-red-500/30'
})

const primaryStore = computed(() => {
  return props.article.donde_comprar?.[0]
})

const hasMultipleStores = computed(() => {
  return (props.article.donde_comprar?.length ?? 0) > 1
})
</script>

<template>
  <div class="min-h-screen bg-stone-50">
    <!-- Header breadcrumb -->
    <div class="bg-white border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <nav class="flex items-center gap-2 text-sm font-body text-gray-500">
          <NuxtLink to="/" class="hover:text-teal-600 transition-colors">QueDure</NuxtLink>
          <span class="text-gray-300">/</span>
          <NuxtLink :to="categoryPath" class="hover:text-teal-600 transition-colors">{{ categoryName }}</NuxtLink>
          <span class="text-gray-300">/</span>
          <span class="text-gray-900">{{ article.title }}</span>
        </nav>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="bg-white">
      <div class="max-w-6xl mx-auto px-6 py-12">
        <div :class="article.image ? 'grid lg:grid-cols-2 gap-12 lg:gap-16 items-start' : 'max-w-2xl'">

          <!-- Imagen -->
          <div v-if="article.image" class="relative animate-scale-in">
            <div class="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 shadow-2xl shadow-stone-200/50">
              <NuxtImg
                :src="article.image"
                :alt="article.title"
                width="600"
                height="750"
                loading="lazy"
                format="webp"
                quality="80"
                class="w-full h-full object-cover transition-opacity duration-700"
                :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
                @load="imageLoaded = true"
              />
            </div>

            <!-- Badge de reparabilidad flotante -->
            <div
              v-if="article.reparabilidad"
              class="absolute -bottom-4 -right-4 lg:bottom-6 lg:-right-6 text-white rounded-2xl p-4 shadow-xl animate-fade-in-up stagger-3"
              :class="scoreBadgeColor"
            >
              <div class="text-center">
                <div class="text-4xl font-black">{{ article.reparabilidad }}</div>
                <div class="text-xs font-medium opacity-90">{{ article.reparabilidadSource || 'iFixit' }} Score</div>
              </div>
            </div>

            <!-- Etiqueta marca -->
            <div
              v-if="article.brand"
              class="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-fade-in-up stagger-1"
            >
              <span class="text-sm font-medium text-gray-700">
                {{ article.brand }}
                <template v-if="article.origen"> · {{ article.origen }}</template>
              </span>
            </div>
          </div>

          <!-- Info -->
          <div class="flex flex-col gap-8">

            <!-- Título y descripción -->
            <div class="animate-fade-in-up stagger-1">
              <h1 class="font-display text-5xl lg:text-6xl text-gray-900 mb-4">
                {{ article.title }}
              </h1>
              <p class="font-body text-xl text-gray-600 leading-relaxed">
                {{ article.descripcion_corta || article.description }}
              </p>
              <div class="mt-4">
                <ShareButton
                  :title="article.title"
                  :description="article.descripcion_corta || article.description"
                />
              </div>
            </div>

            <!-- Precio -->
            <div v-if="article.price" class="animate-fade-in-up stagger-2">
              <div class="flex items-baseline gap-3">
                <span class="font-display text-4xl text-gray-900">{{ article.price }}</span>
                <span class="text-sm text-gray-400 font-body">PVP recomendado</span>
              </div>
            </div>

            <!-- Score de reparabilidad -->
            <div v-if="article.reparabilidad" class="bg-stone-100 rounded-2xl p-6 animate-fade-in-up stagger-3">
              <ReparabilityScore
                :score="article.reparabilidad"
                :source="article.reparabilidadSource"
                variant="hero"
              />
            </div>

            <!-- Datos clave -->
            <div class="grid grid-cols-2 gap-4 animate-fade-in-up stagger-4">
              <div v-if="article.garantia" class="bg-white border border-gray-100 rounded-xl p-4">
                <div class="text-xs text-gray-400 uppercase tracking-wider mb-1 font-body">Garantía</div>
                <div class="font-display text-2xl text-gray-900">{{ article.garantia }}</div>
              </div>
              <div v-if="article.actualizaciones" class="bg-white border border-gray-100 rounded-xl p-4">
                <div class="text-xs text-gray-400 uppercase tracking-wider mb-1 font-body">Actualizaciones</div>
                <div class="font-body text-lg font-medium text-gray-900">{{ article.actualizaciones }}</div>
              </div>
            </div>

            <!-- CTAs -->
            <div v-if="primaryStore" class="flex flex-col sm:flex-row gap-3 animate-fade-in-up stagger-4">
              <a
                :href="primaryStore.url"
                target="_blank"
                rel="noopener"
                class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-body font-medium py-4 px-6 rounded-xl text-center transition-all hover:shadow-lg hover:shadow-teal-600/25 hover:-translate-y-0.5"
              >
                Ver en {{ primaryStore.nombre }}
                <template v-if="primaryStore.precio"> · {{ primaryStore.precio }}</template>
              </a>
              <button
                v-if="hasMultipleStores"
                @click="showComparePrices = !showComparePrices"
                class="flex-1 bg-white border-2 border-gray-200 hover:border-teal-600 text-gray-700 hover:text-teal-700 font-body font-medium py-4 px-6 rounded-xl transition-all"
              >
                {{ showComparePrices ? 'Ocultar precios' : 'Comparar precios' }}
              </button>
            </div>

            <!-- Lista de tiendas expandible -->
            <div v-if="showComparePrices && article.donde_comprar && article.donde_comprar.length > 1" class="space-y-3 animate-fade-in-up">
              <a
                v-for="(tienda, i) in article.donde_comprar.slice(1)"
                :key="i"
                :href="tienda.url"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-between p-4 bg-stone-50 hover:bg-teal-50 border border-stone-200 hover:border-teal-200 rounded-xl transition-all group"
              >
                <span class="font-body font-medium text-gray-900 group-hover:text-teal-700">
                  {{ tienda.nombre }}
                </span>
                <div class="flex items-center gap-3">
                  <span v-if="tienda.precio" class="font-display text-lg text-gray-900">{{ tienda.precio }}</span>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pros y Contras -->
    <section v-if="article.pros || article.cons" class="py-16 bg-stone-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-8">

          <!-- Pros -->
          <div v-if="article.pros" class="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 class="font-display text-2xl text-emerald-900">Lo mejor</h2>
            </div>
            <ul class="space-y-4">
              <li v-for="pro in article.pros" :key="pro" class="flex gap-3 font-body text-emerald-800">
                <span class="text-emerald-500 mt-1 flex-shrink-0">✓</span>
                <span>{{ pro }}</span>
              </li>
            </ul>
          </div>

          <!-- Contras -->
          <div v-if="article.cons" class="bg-amber-50 border border-amber-100 rounded-2xl p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 class="font-display text-2xl text-amber-900">A tener en cuenta</h2>
            </div>
            <ul class="space-y-4">
              <li v-for="con in article.cons" :key="con" class="flex gap-3 font-body text-amber-800">
                <span class="text-amber-500 mt-1 flex-shrink-0">→</span>
                <span>{{ con }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenido principal (tabs) -->
    <article class="py-12 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <ProductTabs
          :description="article.description"
          :especificaciones="article.especificaciones"
          :donde-comprar="article.donde_comprar"
          :alternativas="article.alternativas"
          :product-name="article.title"
          :category-path="categoryPath"
        />
      </div>
    </article>

    <!-- Comparativa de coste -->
    <div v-if="article.comparativa">
      <CostComparison
        :comparativa="article.comparativa"
        :product-name="article.title"
        :product-price="article.price || ''"
      />
    </div>

    <!-- Testimonios -->
    <div v-if="article.testimonios && article.testimonios.length > 0">
      <Testimonials :testimonios="article.testimonios" />
    </div>

    <!-- CTA final -->
    <section v-if="primaryStore" class="py-16 bg-white border-t border-gray-100">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="font-display text-3xl text-gray-900 mb-4">
          ¿Te convence?
        </h2>
        <p class="font-body text-gray-600 mb-8 max-w-xl mx-auto">
          Si decides comprarlo, estarás apoyando un modelo de negocio que prioriza la longevidad sobre la obsolescencia.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            :href="primaryStore.url"
            target="_blank"
            rel="noopener"
            class="bg-teal-600 hover:bg-teal-700 text-white font-body font-medium py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-teal-600/25 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
          >
            Comprar {{ article.title }}
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <NuxtLink
            :to="categoryPath"
            class="bg-stone-100 hover:bg-stone-200 text-gray-700 font-body font-medium py-4 px-8 rounded-xl transition-all inline-flex items-center justify-center gap-2"
          >
            Ver alternativas
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Updated date -->
    <div v-if="article.updatedAt" class="bg-stone-50 py-6">
      <div class="container-narrow text-sm text-gray-500 text-center">
        Última actualización: {{ article.updatedAt }}
      </div>
    </div>

    <!-- Floating share button -->
    <FloatingShareButton
      :title="article.title"
      :description="article.descripcion_corta || article.description"
    />
  </div>
</template>
