<script setup lang="ts">
interface Article {
  path: string
  title: string
  description: string
  category?: string
  readingTime?: number
}

interface Props {
  articles: Article[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Sigue aprendiendo'
})

const getCategoryLabel = (category?: string) => {
  const labels: Record<string, string> = {
    aprender: 'Aprender',
    electronica: 'Electrónica',
    electrodomesticos: 'Electrodomésticos',
    ropa: 'Ropa',
    movilidad: 'Movilidad',
    reparar: 'Reparar'
  }
  return category ? labels[category] || category : ''
}
</script>

<template>
  <section v-if="articles.length > 0" class="mt-12 pt-8 border-t border-gray-200">
    <h3 class="text-xl font-semibold text-gray-900 mb-6">{{ title }}</h3>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="article in articles"
        :key="article.path"
        :to="article.path"
        class="group block bg-white border border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-md transition-all"
      >
        <div v-if="article.category" class="text-xs font-medium text-primary-600 mb-2">
          {{ getCategoryLabel(article.category) }}
        </div>
        <h4 class="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
          {{ article.title }}
        </h4>
        <p class="text-sm text-gray-600 line-clamp-2 mb-3">
          {{ article.description }}
        </p>
        <div v-if="article.readingTime" class="text-xs text-gray-500">
          {{ article.readingTime }} min lectura
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
