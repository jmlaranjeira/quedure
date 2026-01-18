<script setup lang="ts">
const features = [
  {
    title: 'Investigación rigurosa',
    description: 'Analizamos la durabilidad, reparabilidad y sostenibilidad de cada producto que recomendamos.',
    icon: 'search'
  },
  {
    title: 'Sin publicidad encubierta',
    description: 'Nuestras recomendaciones son independientes. No aceptamos pagos de marcas.',
    icon: 'shield'
  },
  {
    title: 'Comunidad activa',
    description: 'Aprende de otros usuarios y comparte tu experiencia con productos duraderos.',
    icon: 'users'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div class="container-wide py-20 lg:py-28">
        <div class="max-w-3xl">
          <h1 class="text-4xl lg:text-5xl font-bold leading-tight">
            Consume menos,
            <span class="text-primary-200">elige mejor</span>
          </h1>
          <p class="mt-6 text-lg lg:text-xl text-primary-100 max-w-2xl">
            Descubre productos diseñados para durar. Guías de compra honestas,
            tutoriales de reparación y recursos para un consumo más consciente.
          </p>

          <!-- Search placeholder -->
          <div class="mt-8 max-w-xl">
            <div class="relative">
              <input
                type="text"
                placeholder="Buscar productos, marcas o guías..."
                class="w-full px-5 py-4 pr-12 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-300"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-primary-600"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink to="/aprender" class="btn-secondary">
              Empieza aquí
            </NuxtLink>
            <NuxtLink
              to="/electronica"
              class="px-6 py-3 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
            >
              Ver categorías
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <CategoryGrid />

    <!-- Why QueDure Section -->
    <section class="py-16 bg-white">
      <div class="container-wide">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-4">
          ¿Por qué QueDure?
        </h2>
        <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Creemos que comprar menos y mejor es la forma más efectiva de reducir
          nuestro impacto ambiental
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="text-center">
            <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <!-- Search icon -->
              <svg v-if="feature.icon === 'search'" class="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <!-- Shield icon -->
              <svg v-else-if="feature.icon === 'shield'" class="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <!-- Users icon -->
              <svg v-else-if="feature.icon === 'users'" class="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-100">
      <div class="container-narrow text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          ¿Listo para empezar?
        </h2>
        <p class="text-gray-600 mb-8 max-w-xl mx-auto">
          Descubre cómo elegir productos que duran, aprende a repararlos y únete
          a una comunidad que valora la calidad sobre la cantidad.
        </p>
        <NuxtLink to="/aprender" class="btn-primary inline-block">
          Comenzar ahora
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
