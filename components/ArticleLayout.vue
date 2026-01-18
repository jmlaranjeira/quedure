<script setup lang="ts">
interface Props {
  article: {
    title: string
    description: string
    category?: string
    subcategory?: string
    brand?: string
    price?: string
    rating?: number
    reparabilidad?: number
    reparabilidadSource?: string
    pros?: string[]
    cons?: string[]
    difficulty?: string
    time?: string
    tools?: string[]
    readingTime?: number
    updatedAt?: string
  }
  categoryName: string
  categoryPath: string
  colorScheme?: 'primary' | 'secondary' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: 'primary'
})

const gradientClass = computed(() => {
  const schemes = {
    primary: 'from-primary-600 to-primary-800',
    secondary: 'from-secondary-500 to-secondary-700',
    accent: 'from-accent-600 to-accent-800'
  }
  return schemes[props.colorScheme]
})

const lightColorClass = computed(() => {
  const schemes = {
    primary: 'text-primary-200',
    secondary: 'text-secondary-200',
    accent: 'text-accent-200'
  }
  return schemes[props.colorScheme]
})

const mutedColorClass = computed(() => {
  const schemes = {
    primary: 'text-primary-300',
    secondary: 'text-secondary-300',
    accent: 'text-accent-300'
  }
  return schemes[props.colorScheme]
})

const contentColorClass = computed(() => {
  const schemes = {
    primary: 'text-primary-100',
    secondary: 'text-secondary-100',
    accent: 'text-accent-100'
  }
  return schemes[props.colorScheme]
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section :class="['bg-gradient-to-br text-white py-12', gradientClass]">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" :class="[lightColorClass, 'hover:text-white']">Inicio</NuxtLink>
          <span :class="['mx-2', mutedColorClass]">/</span>
          <NuxtLink :to="categoryPath" :class="[lightColorClass, 'hover:text-white']">{{ categoryName }}</NuxtLink>
          <span :class="['mx-2', mutedColorClass]">/</span>
          <span>{{ article.title }}</span>
        </nav>
        <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ article.title }}</h1>
        <p :class="['text-lg max-w-2xl', contentColorClass]">{{ article.description }}</p>

        <!-- Reparability Score (prominente) -->
        <div v-if="article.reparabilidad" class="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
          <div class="text-xs text-white/70 mb-2">Puntuación de reparabilidad</div>
          <ReparabilityScore
            :score="article.reparabilidad"
            :source="article.reparabilidadSource"
            on-dark
          />
        </div>

        <!-- Meta info -->
        <div class="mt-4 flex flex-wrap gap-3 text-sm">
          <span v-if="article.brand" class="bg-white/10 px-3 py-1 rounded-full">
            {{ article.brand }}
          </span>
          <span v-if="article.price" class="bg-white/10 px-3 py-1 rounded-full">
            {{ article.price }}
          </span>
          <span v-if="article.difficulty" class="bg-white/10 px-3 py-1 rounded-full">
            Dificultad: {{ article.difficulty }}
          </span>
          <span v-if="article.time" class="bg-white/10 px-3 py-1 rounded-full">
            {{ article.time }}
          </span>
          <span v-if="article.readingTime" class="bg-white/10 px-3 py-1 rounded-full">
            {{ article.readingTime }} min lectura
          </span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <article class="py-12">
      <div class="container-narrow">
        <!-- Tools needed (for repair tutorials) -->
        <div v-if="article.tools && article.tools.length > 0" class="bg-gray-100 rounded-lg p-6 mb-10">
          <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
            Herramientas necesarias
          </h3>
          <ul class="flex flex-wrap gap-2">
            <li v-for="tool in article.tools" :key="tool" class="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
              {{ tool }}
            </li>
          </ul>
        </div>

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

        <!-- Article body -->
        <div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900">
          <slot />
        </div>

        <!-- Updated date -->
        <div v-if="article.updatedAt" class="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500">
          Última actualización: {{ article.updatedAt }}
        </div>
      </div>
    </article>
  </div>
</template>
