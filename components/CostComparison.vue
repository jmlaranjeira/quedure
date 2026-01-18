<script setup lang="ts">
interface Props {
  comparativa: {
    alternativa_nombre: string
    alternativa_precio: number
    alternativa_duracion: string
    alternativa_coste_10_anos: number
    producto_duracion: string
    producto_coste_10_anos: number
  }
  productName: string
  productPrice: string
}

const props = defineProps<Props>()

// Calculate bar widths as percentages
const maxCost = computed(() =>
  Math.max(props.comparativa.alternativa_coste_10_anos, props.comparativa.producto_coste_10_anos)
)

const alternativaWidth = computed(() =>
  (props.comparativa.alternativa_coste_10_anos / maxCost.value) * 100
)

const productoWidth = computed(() =>
  (props.comparativa.producto_coste_10_anos / maxCost.value) * 100
)

const ahorro = computed(() =>
  props.comparativa.alternativa_coste_10_anos - props.comparativa.producto_coste_10_anos
)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<template>
  <section class="bg-gray-50 rounded-xl p-6 lg:p-8">
    <h3 class="text-xl font-bold text-gray-900 mb-2">
      Coste real a 10 años
    </h3>
    <p class="text-gray-600 mb-6">
      Comparativa del coste total considerando reemplazos necesarios
    </p>

    <div class="space-y-6">
      <!-- Alternativa (más caro) -->
      <div>
        <div class="flex justify-between items-baseline mb-2">
          <span class="font-medium text-gray-700">{{ comparativa.alternativa_nombre }}</span>
          <span class="text-sm text-gray-500">{{ comparativa.alternativa_duracion }}</span>
        </div>
        <div class="relative">
          <div class="h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-red-400 rounded-full transition-all duration-500"
              :style="{ width: `${alternativaWidth}%` }"
            />
          </div>
          <span class="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-800">
            {{ formatPrice(comparativa.alternativa_coste_10_anos) }}
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-1">
          Precio inicial: {{ formatPrice(comparativa.alternativa_precio) }}
        </p>
      </div>

      <!-- Producto recomendado (más barato a largo plazo) -->
      <div>
        <div class="flex justify-between items-baseline mb-2">
          <span class="font-medium text-primary-700">{{ productName }}</span>
          <span class="text-sm text-gray-500">{{ comparativa.producto_duracion }}</span>
        </div>
        <div class="relative">
          <div class="h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-primary-500 rounded-full transition-all duration-500"
              :style="{ width: `${productoWidth}%` }"
            />
          </div>
          <span class="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-800">
            {{ formatPrice(comparativa.producto_coste_10_anos) }}
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-1">
          Precio inicial: {{ productPrice }}
        </p>
      </div>
    </div>

    <!-- Ahorro -->
    <div v-if="ahorro > 0" class="mt-6 pt-6 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <span class="text-gray-700">Ahorro estimado en 10 años:</span>
        <span class="text-2xl font-bold text-emerald-600">{{ formatPrice(ahorro) }}</span>
      </div>
    </div>
  </section>
</template>
