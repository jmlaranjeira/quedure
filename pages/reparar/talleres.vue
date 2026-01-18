<script setup lang="ts">
import type { RepairShop } from '~/components/RepairShopMap.client.vue'

useSeoMeta({
  title: 'Talleres de reparación | QueDure.es',
  description: 'Encuentra talleres de reparación cerca de ti. Electrónica, electrodomésticos, ropa, bicicletas y más.'
})

// Sample repair shops data
const shops = ref<RepairShop[]>([
  {
    id: '1',
    name: 'Repair Café Madrid Centro',
    address: 'Calle del Pez, 21',
    city: 'Madrid',
    lat: 40.4245,
    lng: -3.7025,
    phone: '+34 910 123 456',
    website: 'https://repaircafe.org/es',
    categories: ['electronica', 'electrodomesticos'],
    description: 'Evento mensual de reparación comunitaria'
  },
  {
    id: '2',
    name: 'iFixRapid Barcelona',
    address: 'Carrer de Balmes, 150',
    city: 'Barcelona',
    lat: 41.3954,
    lng: 2.1532,
    phone: '+34 932 456 789',
    website: 'https://example.com',
    categories: ['electronica'],
    description: 'Especialistas en reparación de móviles y tablets'
  },
  {
    id: '3',
    name: 'Taller de Bicicletas La Rueda',
    address: 'Calle Mayor, 45',
    city: 'Valencia',
    lat: 39.4699,
    lng: -0.3763,
    phone: '+34 963 789 012',
    categories: ['movilidad'],
    description: 'Reparación y mantenimiento de bicicletas'
  },
  {
    id: '4',
    name: 'Electrodomésticos Reparalia',
    address: 'Avenida de Andalucía, 12',
    city: 'Sevilla',
    lat: 37.3891,
    lng: -5.9845,
    phone: '+34 954 321 654',
    categories: ['electrodomesticos'],
    description: 'Reparación de lavadoras, neveras y más'
  },
  {
    id: '5',
    name: 'Sastrería El Remiendo',
    address: 'Calle San Francisco, 8',
    city: 'Bilbao',
    lat: 43.2630,
    lng: -2.9350,
    phone: '+34 944 567 890',
    categories: ['ropa'],
    description: 'Arreglos de ropa y costura'
  },
  {
    id: '6',
    name: 'TechFix Zaragoza',
    address: 'Paseo Independencia, 32',
    city: 'Zaragoza',
    lat: 41.6488,
    lng: -0.8891,
    phone: '+34 976 234 567',
    categories: ['electronica', 'electrodomesticos'],
    description: 'Centro de reparación multimarca'
  },
  {
    id: '7',
    name: 'Zapatero Artesano',
    address: 'Calle Real, 15',
    city: 'Málaga',
    lat: 36.7213,
    lng: -4.4214,
    phone: '+34 952 678 901',
    categories: ['ropa'],
    description: 'Reparación de calzado tradicional'
  },
  {
    id: '8',
    name: 'BiciTaller Coruña',
    address: 'Rúa Nova, 22',
    city: 'A Coruña',
    lat: 43.3713,
    lng: -8.3960,
    phone: '+34 981 345 678',
    categories: ['movilidad'],
    description: 'Especialistas en bicicletas eléctricas'
  }
])

const selectedCategory = ref<string>('all')

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'electronica', name: 'Electrónica' },
  { id: 'electrodomesticos', name: 'Electrodomésticos' },
  { id: 'ropa', name: 'Ropa y calzado' },
  { id: 'movilidad', name: 'Movilidad' }
]

const filteredShops = computed(() => {
  if (selectedCategory.value === 'all') {
    return shops.value
  }
  return shops.value.filter(shop =>
    shop.categories.includes(selectedCategory.value)
  )
})

const selectedShop = ref<RepairShop | null>(null)

const handleShopSelect = (shop: RepairShop) => {
  selectedShop.value = shop
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-secondary-500 to-secondary-700 text-white py-12">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-secondary-200 hover:text-white">Inicio</NuxtLink>
          <span class="mx-2 text-secondary-300">/</span>
          <NuxtLink to="/reparar" class="text-secondary-200 hover:text-white">Reparar</NuxtLink>
          <span class="mx-2 text-secondary-300">/</span>
          <span>Talleres</span>
        </nav>
        <h1 class="text-3xl font-bold mb-4">Talleres de reparación</h1>
        <p class="text-lg text-secondary-100 max-w-2xl">
          Encuentra talleres de confianza cerca de ti. Desde electrónica hasta ropa,
          estos profesionales dan una segunda vida a tus productos.
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="py-6 bg-white border-b">
      <div class="container-wide">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedCategory === cat.id
                ? 'bg-secondary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
            @click="selectedCategory = cat.id"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Map and List -->
    <section class="py-8">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Map -->
          <div class="lg:col-span-2 h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            <ClientOnly>
              <RepairShopMap
                :shops="filteredShops"
                :zoom="6"
                @select="handleShopSelect"
              />
              <template #fallback>
                <div class="h-full flex items-center justify-center text-gray-500">
                  Cargando mapa...
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- List -->
          <div class="space-y-4 max-h-[500px] overflow-y-auto">
            <p class="text-sm text-gray-600">
              {{ filteredShops.length }} taller{{ filteredShops.length !== 1 ? 'es' : '' }} encontrado{{ filteredShops.length !== 1 ? 's' : '' }}
            </p>

            <div
              v-for="shop in filteredShops"
              :key="shop.id"
              :class="[
                'card p-4 cursor-pointer transition-all',
                selectedShop?.id === shop.id ? 'ring-2 ring-secondary-500' : ''
              ]"
              @click="selectedShop = shop"
            >
              <h3 class="font-semibold text-gray-900">{{ shop.name }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ shop.address }}, {{ shop.city }}</p>

              <div class="mt-2 flex flex-wrap gap-1">
                <span
                  v-for="cat in shop.categories"
                  :key="cat"
                  class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                >
                  {{ cat }}
                </span>
              </div>

              <div v-if="shop.phone" class="mt-3">
                <a
                  :href="`tel:${shop.phone}`"
                  class="text-sm text-secondary-600 hover:underline"
                  @click.stop
                >
                  {{ shop.phone }}
                </a>
              </div>
            </div>

            <div v-if="filteredShops.length === 0" class="text-center py-8 text-gray-500">
              No hay talleres en esta categoría
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-12 bg-gray-100">
      <div class="container-narrow text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">¿Tienes un taller de reparación?</h2>
        <p class="text-gray-600 mb-6">
          Si ofreces servicios de reparación y quieres aparecer en nuestro directorio,
          ponte en contacto con nosotros.
        </p>
        <a
          href="mailto:hola@quedure.es"
          class="btn-secondary inline-block"
        >
          Contactar
        </a>
      </div>
    </section>
  </div>
</template>
