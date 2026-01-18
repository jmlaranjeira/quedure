<script setup lang="ts">
const route = useRoute()
const { searchQuery, results, isSearching, search, getCategoryLabel } = useSearch()

// Get query from URL
const initialQuery = computed(() => (route.query.q as string) || '')

// Set initial query and search
onMounted(() => {
  if (initialQuery.value) {
    searchQuery.value = initialQuery.value
    search(initialQuery.value)
  }
})

// Watch for URL changes
watch(() => route.query.q, (newQuery) => {
  if (newQuery && typeof newQuery === 'string') {
    searchQuery.value = newQuery
    search(newQuery)
  }
})

useSeoMeta({
  title: () => searchQuery.value
    ? `Resultados para "${searchQuery.value}" | QueDure.es`
    : 'Buscar | QueDure.es',
  description: 'Busca productos duraderos, tutoriales de reparación y guías de consumo consciente.'
})

// Group results by category
const groupedResults = computed(() => {
  const groups: Record<string, typeof results.value> = {}

  for (const result of results.value) {
    if (!groups[result.category]) {
      groups[result.category] = []
    }
    groups[result.category].push(result)
  }

  return groups
})

const categoryOrder = ['electronica', 'electrodomesticos', 'ropa', 'movilidad', 'reparar', 'aprender']

const sortedCategories = computed(() => {
  return Object.keys(groupedResults.value).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  })
})
</script>

<template>
  <div>
    <!-- Header -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
      <div class="container-wide">
        <h1 class="text-3xl font-bold mb-6">Buscar</h1>

        <!-- Search box -->
        <div class="max-w-2xl">
          <SearchBox />
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="py-12">
      <div class="container-wide">
        <!-- Loading state -->
        <div v-if="isSearching" class="text-center py-12">
          <svg class="w-8 h-8 animate-spin mx-auto text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-4 text-gray-600">Buscando...</p>
        </div>

        <!-- Results -->
        <div v-else-if="searchQuery && results.length > 0">
          <p class="text-gray-600 mb-8">
            {{ results.length }} resultado{{ results.length !== 1 ? 's' : '' }} para
            <span class="font-semibold text-gray-900">"{{ searchQuery }}"</span>
          </p>

          <!-- Grouped by category -->
          <div class="space-y-12">
            <div v-for="category in sortedCategories" :key="category">
              <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                {{ getCategoryLabel(category) }}
                <span class="text-sm font-normal text-gray-500">
                  ({{ groupedResults[category].length }})
                </span>
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NuxtLink
                  v-for="result in groupedResults[category]"
                  :key="result._path"
                  :to="result._path"
                  class="card p-6 group"
                >
                  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {{ result.title }}
                  </h3>
                  <p class="mt-2 text-sm text-gray-600 line-clamp-2">
                    {{ result.description }}
                  </p>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <span v-if="result.brand" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {{ result.brand }}
                    </span>
                    <span v-if="result.price" class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {{ result.price }}
                    </span>
                    <span v-if="result.rating" class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {{ result.rating }}/5
                    </span>
                    <span v-if="result.difficulty" class="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                      {{ result.difficulty }}
                    </span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- No results -->
        <div v-else-if="searchQuery && !isSearching" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron resultados</h2>
          <p class="text-gray-600 mb-6">
            No hay coincidencias para "{{ searchQuery }}". Prueba con otros términos.
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <NuxtLink to="/electronica" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors">
              Electrónica
            </NuxtLink>
            <NuxtLink to="/reparar" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors">
              Reparar
            </NuxtLink>
            <NuxtLink to="/aprender" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors">
              Aprender
            </NuxtLink>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">¿Qué estás buscando?</h2>
          <p class="text-gray-600">
            Escribe al menos 2 caracteres para buscar productos, guías o tutoriales.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
