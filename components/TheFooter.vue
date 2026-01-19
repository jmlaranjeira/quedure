<script setup lang="ts">
const currentYear = new Date().getFullYear()

const sections = [
  {
    title: 'Categorías',
    links: [
      { name: 'Electrónica', href: '/electronica' },
      { name: 'Electrodomésticos', href: '/electrodomesticos' },
      { name: 'Ropa', href: '/ropa' },
      { name: 'Movilidad', href: '/movilidad' }
    ]
  },
  {
    title: 'Recursos',
    links: [
      { name: 'Reparar', href: '/reparar' },
      { name: 'Talleres', href: '/reparar/talleres' },
      { name: 'Aprender', href: '/aprender' }
    ]
  }
]
</script>

<template>
  <footer class="bg-gray-800 text-gray-300">
    <div class="container-wide py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-2 text-2xl font-bold text-white">
            <img src="/favicon.svg" alt="QueDure logo" class="h-8 w-8" />
            QueDure
          </NuxtLink>
          <p class="mt-3 text-sm text-gray-400 max-w-md">
            Tu guía para encontrar productos duraderos, reparables y sostenibles.
            Consume mejor, consume menos.
          </p>
        </div>

        <!-- Links -->
        <div v-for="section in sections" :key="section.title">
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider">
            {{ section.title }}
          </h3>
          <ul class="mt-4 space-y-2">
            <li v-for="link in section.links" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-sm hover:text-white transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-8 pt-8 border-t border-gray-700">
        <p class="text-sm text-gray-400 text-center">
          &copy; {{ currentYear }} QueDure.es - Hecho con cuidado para un consumo consciente
        </p>
      </div>
    </div>
  </footer>
</template>
