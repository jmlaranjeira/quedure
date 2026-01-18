<script setup lang="ts">
useSeoMeta({
  title: 'Aprende a reparar | QueDure.es',
  description: 'Tutoriales y guías de reparación para electrónica, electrodomésticos y más. Alarga la vida de tus productos.'
})

// Fetch articles from the reparar collection
const { data: articles } = await useAsyncData('reparar-articles', () => {
  return queryCollection('reparar').order('updatedAt', 'DESC').all()
})

const resources = [
  {
    title: 'Tutoriales',
    description: 'Guías paso a paso para reparar tus productos',
    href: '/reparar/tutoriales',
    icon: 'video'
  },
  {
    title: 'Talleres',
    description: 'Encuentra talleres de reparación cerca de ti',
    href: '/reparar/talleres',
    icon: 'location'
  },
  {
    title: 'Repuestos',
    description: 'Dónde comprar piezas y componentes',
    href: '/reparar/repuestos',
    icon: 'parts'
  },
  {
    title: 'Comunidad',
    description: 'Conecta con otros reparadores',
    href: '/reparar/comunidad',
    icon: 'community'
  }
]

const tips = [
  {
    title: 'Antes de tirar, intenta reparar',
    description: 'El 80% de los productos que tiramos podrían repararse con conocimientos básicos.'
  },
  {
    title: 'El derecho a reparar',
    description: 'La UE está impulsando leyes que obligan a los fabricantes a proporcionar repuestos.'
  },
  {
    title: 'Repair Cafés',
    description: 'Eventos comunitarios donde voluntarios te ayudan a reparar tus objetos gratis.'
  }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-secondary-500 to-secondary-700 text-white py-16">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-secondary-200 hover:text-white">Inicio</NuxtLink>
          <span class="mx-2 text-secondary-300">/</span>
          <span>Reparar</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">Aprende a reparar</h1>
        <p class="text-xl text-secondary-100 max-w-2xl">
          La reparación es el acto más sostenible. Encuentra tutoriales,
          talleres y recursos para dar una segunda vida a tus productos.
        </p>
      </div>
    </section>

    <!-- Resources -->
    <section class="py-12">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Recursos</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="resource in resources"
            :key="resource.title"
            :to="resource.href"
            class="card p-6 group"
          >
            <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary-200 transition-colors">
              <svg v-if="resource.icon === 'video'" class="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              <svg v-else-if="resource.icon === 'location'" class="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <svg v-else-if="resource.icon === 'parts'" class="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              <svg v-else-if="resource.icon === 'community'" class="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-secondary-600 transition-colors">
              {{ resource.title }}
            </h3>
            <p class="mt-2 text-sm text-gray-600">{{ resource.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Tips -->
    <section class="py-12 bg-gray-100">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">¿Sabías que...?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="tip in tips" :key="tip.title" class="bg-white rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-2">{{ tip.title }}</h3>
            <p class="text-sm text-gray-600">{{ tip.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tutorials -->
    <section class="py-12">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Últimos tutoriales</h2>
        <ArticleList
          :articles="articles || []"
          empty-message="Próximamente: tutoriales de reparación paso a paso"
        />
      </div>
    </section>

    <!-- CTA -->
    <section class="py-12">
      <div class="container-narrow text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h2>
        <p class="text-gray-600 mb-6">
          Nuestra comunidad puede ayudarte. Pregunta en el foro o busca un Repair Café cerca de ti.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/reparar/comunidad" class="btn-secondary">
            Ir a la comunidad
          </NuxtLink>
          <NuxtLink to="/reparar/talleres" class="btn-primary">
            Buscar talleres
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
