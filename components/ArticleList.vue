<script setup lang="ts">
interface Article {
  _path: string
  title: string
  description: string
  brand?: string
  price?: string
  rating?: number
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
        :key="article._path"
        :to="article._path"
        class="card p-6 group"
      >
        <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {{ article.title }}
        </h3>

        <p class="mt-2 text-sm text-gray-600 line-clamp-3">
          {{ article.description }}
        </p>

        <!-- Meta info -->
        <div class="mt-4 flex flex-wrap gap-2">
          <span v-if="article.brand" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {{ article.brand }}
          </span>
          <span v-if="article.price" class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
            {{ article.price }}
          </span>
          <span v-if="article.rating" class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {{ article.rating }}/5
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
