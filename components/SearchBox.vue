<script setup lang="ts">
const { searchQuery, results, isSearching, getCategoryLabel } = useSearch()
const router = useRouter()
const showResults = ref(false)
const searchInput = ref<HTMLInputElement>()

const handleSubmit = () => {
  if (searchQuery.value.length >= 2) {
    router.push(`/buscar?q=${encodeURIComponent(searchQuery.value)}`)
    showResults.value = false
  }
}

const handleFocus = () => {
  if (searchQuery.value.length >= 2) {
    showResults.value = true
  }
}

const handleBlur = () => {
  // Delay to allow click on results
  setTimeout(() => {
    showResults.value = false
  }, 200)
}

watch(searchQuery, (val) => {
  showResults.value = val.length >= 2
})
</script>

<template>
  <div class="relative">
    <form @submit.prevent="handleSubmit">
      <div class="relative">
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="Buscar productos, marcas o guías..."
          class="w-full px-5 py-4 pr-12 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-300"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <button
          type="submit"
          class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-primary-600"
        >
          <svg v-if="!isSearching" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </div>
    </form>

    <!-- Dropdown results -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="showResults && searchQuery.length >= 2"
        class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50"
      >
        <div v-if="results.length > 0" class="py-2">
          <NuxtLink
            v-for="result in results.slice(0, 6)"
            :key="result.path"
            :to="result.path"
            class="block px-4 py-3 hover:bg-gray-50 transition-colors"
            @click="showResults = false"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 truncate">{{ result.title }}</p>
                <p class="text-sm text-gray-500 truncate">{{ result.description }}</p>
              </div>
              <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded whitespace-nowrap">
                {{ getCategoryLabel(result.category) }}
              </span>
            </div>
          </NuxtLink>

          <div v-if="results.length > 6" class="px-4 py-2 border-t border-gray-100">
            <button
              type="button"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
              @click="handleSubmit"
            >
              Ver todos los resultados ({{ results.length }})
            </button>
          </div>
        </div>

        <div v-else-if="!isSearching" class="px-4 py-6 text-center text-gray-500">
          <p>No se encontraron resultados para "{{ searchQuery }}"</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
