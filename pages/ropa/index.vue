<script setup lang="ts">
useSeoMeta({
  title: 'Ropa duradera y ética | QueDure.es',
  description: 'Moda sostenible y duradera. Encuentra marcas de ropa ética, calzado de calidad y accesorios que duran años.'
})

// Fetch articles from the ropa collection
const { data: articles } = await useAsyncData('ropa-articles', () => {
  return queryCollection('ropa').order('updatedAt', 'DESC').all()
})

const subcategories = [
  {
    title: 'Básicos',
    description: 'Camisetas, pantalones y prendas esenciales de calidad',
    href: '/ropa/basicos',
    icon: 'tshirt'
  },
  {
    title: 'Calzado',
    description: 'Zapatos y botas reparables y duraderos',
    href: '/ropa/calzado',
    icon: 'shoe'
  },
  {
    title: 'Abrigos',
    description: 'Chaquetas y abrigos para toda la vida',
    href: '/ropa/abrigos',
    icon: 'jacket'
  },
  {
    title: 'Accesorios',
    description: 'Bolsos, cinturones y complementos de calidad',
    href: '/ropa/accesorios',
    icon: 'bag'
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
          <span>Ropa</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">Ropa duradera y ética</h1>
        <p class="text-xl text-primary-100 max-w-2xl">
          Moda que respeta el planeta y tu bolsillo a largo plazo.
          Prendas de calidad que mejoran con el tiempo.
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
              <svg v-if="sub.icon === 'tshirt'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <svg v-else-if="sub.icon === 'shoe'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
              </svg>
              <svg v-else-if="sub.icon === 'jacket'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <svg v-else-if="sub.icon === 'bag'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
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
          empty-message="Próximamente: guías y recomendaciones de moda duradera"
        />
      </div>
    </section>
  </div>
</template>
