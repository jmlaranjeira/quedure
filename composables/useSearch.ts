export interface SearchResult {
  _path: string
  title: string
  description: string
  category: string
  brand?: string
  price?: string
  rating?: number
  difficulty?: string
}

// Simple debounce implementation
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export const useSearch = () => {
  const searchQuery = ref('')
  const results = ref<SearchResult[]>([])
  const isSearching = ref(false)

  const collections = ['electronica', 'electrodomesticos', 'ropa', 'movilidad', 'reparar', 'aprender'] as const

  const search = async (query: string) => {
    if (!query || query.length < 2) {
      results.value = []
      return
    }

    isSearching.value = true
    const allResults: SearchResult[] = []

    try {
      // Search in all collections
      for (const collection of collections) {
        const items = await queryCollection(collection).all()

        const filtered = items.filter((item: any) => {
          const searchText = `${item.title} ${item.description} ${item.brand || ''}`.toLowerCase()
          return searchText.includes(query.toLowerCase())
        })

        allResults.push(...filtered.map((item: any) => ({
          _path: item._path,
          title: item.title,
          description: item.description,
          category: collection,
          brand: item.brand,
          price: item.price,
          rating: item.rating,
          difficulty: item.difficulty
        })))
      }

      results.value = allResults
    } catch (error) {
      console.error('Search error:', error)
      results.value = []
    } finally {
      isSearching.value = false
    }
  }

  const debouncedSearch = debounce(search, 300)

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery)
  })

  const categoryLabels: Record<string, string> = {
    electronica: 'Electrónica',
    electrodomesticos: 'Electrodomésticos',
    ropa: 'Ropa',
    movilidad: 'Movilidad',
    reparar: 'Reparar',
    aprender: 'Aprender'
  }

  const getCategoryLabel = (category: string) => categoryLabels[category] || category

  return {
    searchQuery,
    results,
    isSearching,
    search,
    getCategoryLabel
  }
}
