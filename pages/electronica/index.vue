<script setup lang="ts">
useSeoMeta({
  title: 'Electrónica duradera | QueDure.es',
  description: 'Guías de compra para móviles, ordenadores y gadgets diseñados para durar. Encuentra tecnología reparable y sostenible.'
})

// Fetch articles from the electronica collection
const { data: articles } = await useAsyncData('electronica-articles', () => {
  return queryCollection('electronica').order('updatedAt', 'DESC').all()
})

const subcategories = [
  {
    title: 'Móviles',
    description: 'Smartphones con baterías reemplazables y actualizaciones prolongadas',
    href: '/electronica/moviles',
    icon: 'phone'
  },
  {
    title: 'Ordenadores',
    description: 'Portátiles y PCs modulares y fácilmente reparables',
    href: '/electronica/ordenadores',
    icon: 'laptop'
  },
  {
    title: 'Audio',
    description: 'Auriculares y altavoces de calidad que perduran',
    href: '/electronica/audio',
    icon: 'audio'
  },
  {
    title: 'Cámaras',
    description: 'Equipos fotográficos con vida útil extendida',
    href: '/electronica/camaras',
    icon: 'camera'
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
          <span>Electrónica</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">Electrónica duradera</h1>
        <p class="text-xl text-primary-100 max-w-2xl">
          Móviles, ordenadores y gadgets diseñados para durar años, no meses.
          Encuentra tecnología que puedes reparar y actualizar.
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
              <svg v-if="sub.icon === 'phone'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              <svg v-else-if="sub.icon === 'laptop'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              <svg v-else-if="sub.icon === 'audio'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              <svg v-else-if="sub.icon === 'camera'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
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
          empty-message="Próximamente: guías y recomendaciones de electrónica duradera"
        />
      </div>
    </section>
  </div>
</template>
