<script setup lang="ts">
const categories = [
  {
    title: 'Electrónica',
    description: 'Móviles, ordenadores y gadgets que duran',
    href: '/electronica',
    icon: 'device'
  },
  {
    title: 'Electrodomésticos',
    description: 'Aparatos fiables para tu hogar',
    href: '/electrodomesticos',
    icon: 'home'
  },
  {
    title: 'Ropa',
    description: 'Moda ética y duradera',
    href: '/ropa',
    icon: 'shirt'
  },
  {
    title: 'Movilidad',
    description: 'Bicicletas, patinetes y más',
    href: '/movilidad',
    icon: 'bike'
  }
]
</script>

<template>
  <section class="py-16">
    <div class="container-wide">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-4">
        Explora por categoría
      </h2>
      <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Encuentra productos diseñados para durar en cada área de tu vida
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.title"
          :to="category.href"
          class="card p-6 group cursor-pointer"
        >
          <!-- Icon -->
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
            <!-- Device icon -->
            <svg v-if="category.icon === 'device'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            <!-- Home icon -->
            <svg v-else-if="category.icon === 'home'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <!-- Shirt icon -->
            <svg v-else-if="category.icon === 'shirt'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <!-- Bike icon -->
            <svg v-else-if="category.icon === 'bike'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {{ category.title }}
          </h3>
          <p class="mt-2 text-sm text-gray-600">
            {{ category.description }}
          </p>

          <div class="mt-4 flex items-center text-primary-600 text-sm font-medium">
            <span>Explorar</span>
            <svg class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
