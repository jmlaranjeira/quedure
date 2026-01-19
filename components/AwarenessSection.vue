<script setup lang="ts">
const stats = [
  {
    value: '35M',
    unit: 'toneladas',
    description: 'de residuos electrónicos al año en la UE por desecho prematuro',
    icon: 'trash'
  },
  {
    value: '€12.000M',
    unit: 'perdidos',
    description: 'por consumidores que reemplazan en lugar de reparar',
    icon: 'money'
  },
  {
    value: '77%',
    unit: 'de europeos',
    description: 'prefieren reparar pero no encuentran opciones viables',
    icon: 'users'
  }
]
</script>

<template>
  <section class="py-16 lg:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
    <!-- Decorative salmon - swimming against the current -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      class="absolute -bottom-8 -right-8 w-64 h-64 opacity-[0.07] rotate-[-30deg] pointer-events-none"
      aria-hidden="true"
    >
      <path d="M32 4 C20 10, 16 22, 18 32 C16 42, 20 54, 32 58 C44 54, 48 42, 46 32 C48 22, 44 10, 32 4Z" fill="currentColor" class="text-secondary-400"/>
      <path d="M32 58 Q24 60, 20 68 Q28 62, 32 60 Q36 62, 44 68 Q40 60, 32 58Z" fill="currentColor" class="text-secondary-400"/>
      <circle cx="32" cy="18" r="4" fill="currentColor" class="text-gray-800"/>
      <circle cx="32" cy="18" r="2" fill="currentColor" class="text-secondary-400"/>
    </svg>

    <div class="container-wide relative z-10">
      <!-- Headline -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold leading-tight">
          El sistema está diseñado para que
          <span class="text-secondary-400">compres más</span>
        </h2>
        <p class="mt-4 text-lg text-gray-300">
          La obsolescencia programada no es una teoría de la conspiración.
          Es un modelo de negocio.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div
          v-for="stat in stats"
          :key="stat.value"
          class="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
        >
          <!-- Icon -->
          <div class="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <!-- Trash icon -->
            <svg v-if="stat.icon === 'trash'" class="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <!-- Money icon -->
            <svg v-else-if="stat.icon === 'money'" class="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
            <!-- Users icon -->
            <svg v-else-if="stat.icon === 'users'" class="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>

          <!-- Value -->
          <div class="text-4xl lg:text-5xl font-bold text-white mb-1">
            {{ stat.value }}
          </div>
          <div class="text-secondary-400 font-medium mb-2">
            {{ stat.unit }}
          </div>
          <p class="text-sm text-gray-400">
            {{ stat.description }}
          </p>
        </div>
      </div>

      <!-- Empowerment Message -->
      <div class="text-center max-w-2xl mx-auto">
        <p class="text-xl lg:text-2xl font-medium text-white mb-2">
          Pero tú puedes romper el ciclo.
        </p>
        <p class="text-gray-300 mb-8">
          Cada vez que eliges un producto diseñado para durar,
          votas por un modelo económico diferente.
        </p>

        <NuxtLink
          to="/aprender"
          class="inline-flex items-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors"
        >
          Aprende a elegir mejor
          <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>

        <!-- Sources -->
        <p class="mt-8 text-xs text-gray-500">
          Datos:
          <a
            href="https://commission.europa.eu/energy-climate-change-environment/standards-tools-and-labels/products-labelling-rules-and-requirements/sustainable-products/ecodesign-sustainable-products-regulation_en"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-gray-400"
          >Comisión Europea</a>,
          <a
            href="https://www.europarl.europa.eu/topics/en/article/20201208STO93327/the-right-to-repair-what-the-eu-is-doing-to-make-repair-easier"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-gray-400"
          >Parlamento Europeo</a>
        </p>
      </div>
    </div>
  </section>
</template>
