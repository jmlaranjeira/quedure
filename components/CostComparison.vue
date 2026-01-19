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

// Calculate annual cost
const alternativaAnual = computed(() => {
  return Math.round(props.comparativa.alternativa_coste_10_anos / 10)
})

const productoAnual = computed(() => {
  return Math.round(props.comparativa.producto_coste_10_anos / 10)
})

const ahorroAnual = computed(() => {
  return alternativaAnual.value - productoAnual.value
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<template>
  <section class="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl lg:text-4xl text-white mb-4">
          La matemática de lo duradero
        </h2>
        <p class="font-body text-gray-400 max-w-xl mx-auto">
          Un producto más caro hoy puede ser más barato a largo plazo. Haz las cuentas.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        <!-- Alternativa convencional -->
        <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
          <div class="text-gray-400 text-sm uppercase tracking-wider mb-2 font-body">
            {{ comparativa.alternativa_nombre }}
          </div>
          <div class="font-display text-3xl text-white mb-6">
            {{ formatPrice(comparativa.alternativa_precio) }}
          </div>

          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-gray-300 font-body">
              <span>Vida útil media</span>
              <span>{{ comparativa.alternativa_duracion }}</span>
            </div>
            <div class="flex justify-between text-gray-300 font-body">
              <span>Coste por año</span>
              <span class="text-amber-400 font-medium">{{ formatPrice(alternativaAnual) }}/año</span>
            </div>
          </div>

          <!-- Barra visual -->
          <div class="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
              :style="{ width: `${alternativaWidth}%` }"
            />
          </div>

          <div class="mt-4 text-sm text-gray-500 font-body">
            Coste total en 10 años: {{ formatPrice(comparativa.alternativa_coste_10_anos) }}
          </div>
        </div>

        <!-- Producto recomendado -->
        <div class="bg-teal-900/30 border border-teal-700/50 rounded-2xl p-8 relative overflow-hidden">
          <div class="absolute top-4 right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full font-body">
            RECOMENDADO
          </div>

          <div class="text-teal-400 text-sm uppercase tracking-wider mb-2 font-body">
            {{ productName }}
          </div>
          <div class="font-display text-3xl text-white mb-6">
            {{ productPrice || formatPrice(Math.round(comparativa.producto_coste_10_anos / 2)) }}
          </div>

          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-gray-300 font-body">
              <span>Vida útil media</span>
              <span>{{ comparativa.producto_duracion }}</span>
            </div>
            <div class="flex justify-between text-gray-300 font-body">
              <span>Coste por año</span>
              <span class="text-emerald-400 font-medium">{{ formatPrice(productoAnual) }}/año</span>
            </div>
          </div>

          <!-- Barra visual -->
          <div class="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              :style="{ width: `${productoWidth}%` }"
            />
          </div>

          <div class="mt-4 text-sm text-gray-500 font-body">
            Coste total en 10 años: {{ formatPrice(comparativa.producto_coste_10_anos) }}
          </div>
        </div>
      </div>

      <!-- Resumen ahorro -->
      <div v-if="ahorroAnual > 0" class="text-center mt-12">
        <div class="inline-block bg-emerald-500/20 border border-emerald-500/30 rounded-2xl px-8 py-6">
          <div class="text-emerald-400 text-sm uppercase tracking-wider mb-2 font-body">Ahorro anual</div>
          <div class="font-display text-5xl text-white">{{ formatPrice(ahorroAnual) }}</div>
          <div class="text-gray-400 mt-2 font-body">por elegir lo que dura</div>
        </div>
      </div>
    </div>
  </section>
</template>
