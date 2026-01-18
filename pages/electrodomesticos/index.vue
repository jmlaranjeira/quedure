<script setup lang="ts">
useSeoMeta({
  title: 'Electrodomésticos duraderos | QueDure.es',
  description: 'Encuentra electrodomésticos fiables y reparables para tu hogar. Guías de compra para lavadoras, frigoríficos y más.'
})

// Fetch articles from the electrodomesticos collection
const { data: articles } = await useAsyncData('electrodomesticos-articles', () => {
  return queryCollection('electrodomesticos').order('updatedAt', 'DESC').all()
})

const subcategories = [
  {
    title: 'Cocina',
    description: 'Hornos, neveras y pequeños electrodomésticos de calidad',
    href: '/electrodomesticos/cocina',
    icon: 'kitchen'
  },
  {
    title: 'Lavado',
    description: 'Lavadoras y secadoras diseñadas para décadas de uso',
    href: '/electrodomesticos/lavado',
    icon: 'washing'
  },
  {
    title: 'Climatización',
    description: 'Aires acondicionados y calefacción eficientes',
    href: '/electrodomesticos/climatizacion',
    icon: 'climate'
  },
  {
    title: 'Limpieza',
    description: 'Aspiradoras y robots de limpieza reparables',
    href: '/electrodomesticos/limpieza',
    icon: 'cleaning'
  }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-primary-200 hover:text-white">Inicio</NuxtLink>
          <span class="mx-2 text-primary-300">/</span>
          <span>Electrodomésticos</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">Electrodomésticos duraderos</h1>
        <p class="text-xl text-primary-100 max-w-2xl">
          Aparatos fiables para tu hogar que no te dejarán tirado.
          Marcas con repuestos disponibles y fácil reparación.
        </p>
      </div>
    </section>

    <!-- Subcategories -->
    <section class="py-12">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Categorías</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="sub in subcategories"
            :key="sub.title"
            :to="sub.href"
            class="card p-6 group"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
              <svg v-if="sub.icon === 'kitchen'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
              <svg v-else-if="sub.icon === 'washing'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <svg v-else-if="sub.icon === 'climate'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
              <svg v-else-if="sub.icon === 'cleaning'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {{ sub.title }}
            </h3>
            <p class="mt-2 text-sm text-gray-600">{{ sub.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <section class="py-12 bg-gray-100">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Últimas guías</h2>
        <ArticleList
          :articles="articles || []"
          empty-message="Próximamente: guías y recomendaciones de electrodomésticos duraderos"
        />
      </div>
    </section>
  </div>
</template>
