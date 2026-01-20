<script setup lang="ts">
useSeoMeta({
  title: 'Lecturas | QueDure.es',
  description: 'Artículos sobre consumo consciente, obsolescencia programada, derecho a reparar y economía circular. Guías para un consumo más responsable.'
})

// Section configuration with topic mapping
const sectionConfig = [
  {
    id: 'guia-comprador',
    title: 'Guías de compra',
    description: 'Aprende a evaluar la durabilidad antes de comprar',
    topics: ['guia-comprador'],
    icon: 'guide'
  },
  {
    id: 'obsolescencia',
    title: 'Obsolescencia programada',
    description: 'Qué es y cómo evitar caer en ella',
    topics: ['obsolescencia-programada'],
    icon: 'warning'
  },
  {
    id: 'derecho-reparar',
    title: 'Derecho a reparar',
    description: 'La lucha por productos reparables y la economía circular',
    topics: ['derecho-reparar', 'indices-reparabilidad', 'economia-circular'],
    icon: 'circular'
  },
  {
    id: 'tips',
    title: 'Tips y consejos',
    description: 'Consejos prácticos para el día a día',
    topics: ['tips'],
    icon: 'badge'
  }
]

// Fetch all articles from the aprender collection
const { data: articles } = await useAsyncData('lecturas-articles', () => {
  return queryCollection('aprender').order('updatedAt', 'DESC').all()
})

// Group articles by section
const articlesBySection = computed(() => {
  if (!articles.value) return []

  const result = []
  const assignedPaths = new Set<string>()

  // Process configured sections
  for (const section of sectionConfig) {
    const sectionArticles = articles.value.filter(
      article => section.topics.includes(article.topic) && !assignedPaths.has(article.path)
    )
    sectionArticles.forEach(a => assignedPaths.add(a.path))

    if (sectionArticles.length > 0) {
      result.push({
        ...section,
        articles: sectionArticles
      })
    }
  }

  // Collect unassigned articles for "Otros temas" section
  const unassignedArticles = articles.value.filter(
    article => !assignedPaths.has(article.path)
  )

  if (unassignedArticles.length > 0) {
    result.push({
      id: 'otros',
      title: 'Otros temas',
      description: 'Más lecturas sobre consumo consciente',
      topics: [],
      icon: 'badge',
      articles: unassignedArticles
    })
  }

  return result
})
</script>

<template>
  <div>
    <!-- Hero compacto -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-primary-200 hover:text-white">Inicio</NuxtLink>
          <span class="mx-2 text-primary-300">/</span>
          <span>Lecturas</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">Lecturas</h1>
        <p class="text-xl text-primary-100 max-w-2xl">
          Artículos sobre consumo consciente, obsolescencia programada
          y el derecho a reparar. Conocimiento para consumir mejor.
        </p>
      </div>
    </section>

    <!-- Secciones de artículos -->
    <template v-for="(section, index) in articlesBySection" :key="section.id">
      <section
        class="py-12"
        :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
      >
        <div class="container-wide">
          <!-- Section header -->
          <div class="flex items-start gap-4 mb-8">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg v-if="section.icon === 'guide'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <svg v-else-if="section.icon === 'warning'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <svg v-else-if="section.icon === 'circular'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <svg v-else-if="section.icon === 'badge'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ section.title }}</h2>
              <p class="text-gray-600 mt-1">{{ section.description }}</p>
            </div>
          </div>

          <!-- Articles -->
          <ArticleList
            :articles="section.articles"
            empty-message="No hay artículos en esta sección"
          />
        </div>
      </section>
    </template>

    <!-- Empty state if no articles at all -->
    <section v-if="!articlesBySection.length" class="py-16">
      <div class="container-wide text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Próximamente</h2>
        <p class="text-gray-600">Estamos preparando artículos sobre consumo consciente.</p>
      </div>
    </section>
  </div>
</template>
