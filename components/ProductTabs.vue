<script setup lang="ts">
interface DondeComprar {
  nombre: string
  url: string
  precio?: string
}

interface Props {
  description: string
  especificaciones?: Record<string, string>
  dondeComprar?: DondeComprar[]
  alternativas?: string[]
  productName: string
  categoryPath: string
}

const props = defineProps<Props>()

const activeTab = ref('descripcion')

// Determine which tabs to show based on available data
const availableTabs = computed(() => {
  const tabs = [{ id: 'descripcion', label: 'Descripción' }]

  if (props.especificaciones && Object.keys(props.especificaciones).length > 0) {
    tabs.push({ id: 'especificaciones', label: 'Especificaciones' })
  }

  if (props.dondeComprar && props.dondeComprar.length > 0) {
    tabs.push({ id: 'comprar', label: 'Dónde comprar' })
  }

  if (props.alternativas && props.alternativas.length > 0) {
    tabs.push({ id: 'alternativas', label: 'Alternativas' })
  }

  return tabs
})
</script>

<template>
  <div>
    <!-- Tab navigation -->
    <div v-if="availableTabs.length > 1" class="flex gap-2 border-b border-gray-100 mb-8 overflow-x-auto">
      <button
        v-for="tab in availableTabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap"
        :class="activeTab === tab.id
          ? 'text-teal-700'
          : 'text-gray-500 hover:text-gray-700'"
      >
        {{ tab.label }}
        <div
          v-if="activeTab === tab.id"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full"
        />
      </button>
    </div>

    <!-- Tab content -->
    <div class="min-h-[200px]">

      <!-- Descripción -->
      <div v-if="activeTab === 'descripcion'" class="max-w-3xl">
        <p class="font-body text-lg text-gray-600 leading-relaxed mb-8">
          {{ description }}
        </p>
        <div class="bg-teal-50 border border-teal-100 rounded-xl p-6">
          <h3 class="font-display text-xl text-teal-900 mb-3 flex items-center gap-2">
            <span>💡</span>
            ¿Por qué es importante la reparabilidad?
          </h3>
          <p class="font-body text-teal-800">
            Un producto reparable significa que cuando algo falle (y eventualmente fallará),
            podrás arreglarlo en lugar de tirarlo. Esto no solo ahorra dinero a largo plazo,
            sino que reduce drásticamente el impacto ambiental de tu consumo.
          </p>
        </div>
      </div>

      <!-- Especificaciones -->
      <div v-else-if="activeTab === 'especificaciones'" class="max-w-2xl">
        <div class="divide-y divide-gray-100">
          <div
            v-for="(value, key) in especificaciones"
            :key="key"
            class="flex justify-between py-4"
          >
            <span class="font-body text-gray-500">{{ key }}</span>
            <span class="font-body font-medium text-gray-900">{{ value }}</span>
          </div>
        </div>
      </div>

      <!-- Dónde comprar -->
      <div v-else-if="activeTab === 'comprar'" class="max-w-2xl">
        <div class="space-y-4">
          <a
            v-for="(tienda, i) in dondeComprar"
            :key="i"
            :href="tienda.url"
            target="_blank"
            rel="noopener"
            class="flex items-center justify-between p-5 bg-stone-50 hover:bg-teal-50 border border-stone-200 hover:border-teal-200 rounded-xl transition-all group"
          >
            <span class="font-body font-medium text-gray-900 group-hover:text-teal-700">
              {{ tienda.nombre }}
            </span>
            <div class="flex items-center gap-3">
              <span v-if="tienda.precio" class="font-display text-xl text-gray-900">{{ tienda.precio }}</span>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>
        </div>
        <p class="text-sm text-gray-400 mt-6 font-body">
          * QueDure no recibe comisiones de estas tiendas.
        </p>
      </div>

      <!-- Alternativas -->
      <div v-else-if="activeTab === 'alternativas'" class="max-w-2xl">
        <p class="font-body text-gray-600 mb-6">
          Si {{ productName }} no encaja con lo que buscas, aquí tienes otras opciones duraderas:
        </p>
        <div class="space-y-3">
          <div
            v-for="(alt, i) in alternativas"
            :key="i"
            class="flex items-center gap-4 p-4 bg-stone-50 rounded-xl"
          >
            <div class="w-12 h-12 bg-stone-200 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="font-body font-medium text-gray-900">{{ alt }}</span>
          </div>
        </div>
        <NuxtLink
          :to="categoryPath"
          class="inline-flex items-center gap-2 mt-6 text-teal-600 hover:text-teal-700 font-medium font-body"
        >
          Ver todos los productos de esta categoría
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
