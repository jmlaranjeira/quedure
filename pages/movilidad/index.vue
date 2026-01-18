<script setup lang="ts">
useSeoMeta({
  title: 'Movilidad sostenible | QueDure.es',
  description: 'Bicicletas, patinetes eléctricos y vehículos de movilidad personal duraderos y reparables.'
})

const subcategories = [
  {
    title: 'Bicicletas',
    description: 'Bicis urbanas, de montaña y eléctricas de calidad',
    href: '/movilidad/bicicletas',
    icon: 'bike'
  },
  {
    title: 'Patinetes',
    description: 'Patinetes eléctricos con repuestos disponibles',
    href: '/movilidad/patinetes',
    icon: 'scooter'
  },
  {
    title: 'Accesorios',
    description: 'Cascos, luces y equipamiento de seguridad',
    href: '/movilidad/accesorios',
    icon: 'helmet'
  },
  {
    title: 'Mantenimiento',
    description: 'Herramientas y productos para cuidar tu vehículo',
    href: '/movilidad/mantenimiento',
    icon: 'tools'
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
          <span>Movilidad</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">Movilidad sostenible</h1>
        <p class="text-xl text-primary-100 max-w-2xl">
          Muévete de forma limpia y económica con vehículos que duran.
          Bicicletas, patinetes y más, con repuestos garantizados.
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
              <svg v-if="sub.icon === 'bike'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <svg v-else-if="sub.icon === 'scooter'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <svg v-else-if="sub.icon === 'helmet'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <svg v-else-if="sub.icon === 'tools'" class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
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

    <!-- Content placeholder -->
    <section class="py-12 bg-gray-100">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Últimas guías</h2>
        <div class="bg-white rounded-lg p-8 text-center text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <p>Próximamente: guías y recomendaciones de movilidad sostenible</p>
        </div>
      </div>
    </section>
  </div>
</template>
