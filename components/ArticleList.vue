<script setup lang="ts">
interface Article {
  path: string
  _path?: string // fallback for compatibility
  title: string
  description: string
  brand?: string
  price?: string
  rating?: number
  reparabilidad?: number
  reparabilidadSource?: string
  difficulty?: string
  time?: string
  readingTime?: number
  updatedAt?: string
}

interface Props {
  articles: Article[]
  emptyMessage?: string
}

withDefaults(defineProps<Props>(), {
  emptyMessage: 'No hay artículos disponibles todavía'
})
</script>

<template>
  <div>
    <div v-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="article in articles"
        :key="article.path || article._path"
        :to="article.path || article._path"
        class="card p-6 group"
      >
        <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {{ article.title }}
        </h3>

        <p class="mt-2 text-sm text-gray-600 line-clamp-3">
          {{ article.description }}
        </p>

        <!-- Reparability Score (prominente) -->
        <div v-if="article.reparabilidad" class="mt-3">
          <ReparabilityScore
            :score="article.reparabilidad"
            :source="article.reparabilidadSource"
            compact
          />
        </div>

        <!-- Meta info -->
        <div class="mt-3 flex flex-wrap gap-2">
          <span v-if="article.brand" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {{ article.brand }}
          </span>
          <span v-if="article.price" class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
            {{ article.price }}
          </span>
          <span v-if="article.difficulty" class="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
            {{ article.difficulty }}
          </span>
          <span v-if="article.time" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {{ article.time }}
          </span>
          <span v-if="article.readingTime" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {{ article.readingTime }} min
          </span>
        </div>

        <div class="mt-4 flex items-center text-primary-600 text-sm font-medium">
          <span>Leer más</span>
          <svg class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div v-else class="bg-white rounded-lg p-8 text-center text-gray-500">
      <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
      <p>{{ emptyMessage }}</p>
    </div>
  </div>
</template>
