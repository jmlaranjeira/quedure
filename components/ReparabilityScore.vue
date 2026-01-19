<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  score: number
  source?: string
  compact?: boolean
  onDark?: boolean
  variant?: 'default' | 'hero'
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
  onDark: false,
  variant: 'default'
})

const animatedScore = ref(0)

onMounted(() => {
  if (props.variant === 'hero') {
    setTimeout(() => {
      animatedScore.value = props.score
    }, 300)
  } else {
    animatedScore.value = props.score
  }
})

const barColor = computed(() => {
  if (props.score >= 8) return props.onDark ? 'bg-emerald-400' : 'bg-emerald-500'
  if (props.score >= 5) return props.onDark ? 'bg-amber-400' : 'bg-amber-500'
  return props.onDark ? 'bg-red-400' : 'bg-red-500'
})

const textColor = computed(() => {
  if (props.score >= 8) return props.onDark ? 'text-emerald-400' : 'text-emerald-600'
  if (props.score >= 5) return props.onDark ? 'text-amber-400' : 'text-amber-600'
  return props.onDark ? 'text-red-400' : 'text-red-600'
})

const label = computed(() => {
  if (props.score >= 8) return { text: 'Excelente', color: 'text-emerald-600' }
  if (props.score >= 5) return { text: 'Aceptable', color: 'text-amber-600' }
  return { text: 'Difícil', color: 'text-red-600' }
})

const emptyBarColor = computed(() => props.onDark ? 'bg-white/20' : 'bg-gray-200')
const sourceClass = computed(() => props.onDark ? 'text-white/60 bg-white/10' : 'text-gray-400 bg-gray-100')
const dividerColor = computed(() => props.onDark ? 'text-white/40' : 'text-gray-400')

const getBarStyle = (index: number) => {
  if (props.variant === 'hero') {
    return {
      transitionDelay: `${index * 50}ms`,
      transform: index < animatedScore.value ? 'scaleY(1)' : 'scaleY(0.6)'
    }
  }
  return {}
}
</script>

<template>
  <!-- Hero variant for product detail page -->
  <div v-if="variant === 'hero'" class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-gray-500 uppercase tracking-wider font-body">
        Índice de reparabilidad
      </span>
      <span class="text-sm font-bold" :class="label.color">{{ label.text }}</span>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex gap-1 flex-1">
        <div
          v-for="i in 10"
          :key="i"
          class="h-3 flex-1 rounded-full transition-all duration-500"
          :class="i <= animatedScore ? barColor : emptyBarColor"
          :style="getBarStyle(i - 1)"
        />
      </div>
      <span class="text-3xl font-black text-gray-900 tabular-nums w-12 text-right">
        {{ animatedScore }}
      </span>
    </div>
    <p class="text-xs text-gray-400 font-body">
      <template v-if="source">
        Basado en criterios {{ source }}
      </template>
      <template v-else>
        Basado en criterios iFixit
      </template>
      · Puntuación oficial verificada
    </p>
  </div>

  <!-- Compact variant for cards -->
  <div v-else-if="compact" class="flex items-center gap-2">
    <div class="flex gap-px">
      <div
        v-for="i in 10"
        :key="i"
        class="w-1.5 h-3 rounded-sm"
        :class="i <= score ? barColor : emptyBarColor"
      />
    </div>
    <span class="text-sm font-semibold" :class="textColor">{{ score }}/10</span>
    <span v-if="source" class="text-xs px-1.5 py-0.5 rounded" :class="sourceClass">
      {{ source }}
    </span>
  </div>

  <!-- Default variant -->
  <div v-else class="flex items-center gap-3">
    <!-- Barra de segmentos -->
    <div class="flex gap-0.5">
      <div
        v-for="i in 10"
        :key="i"
        class="w-2 h-5 rounded-sm"
        :class="i <= score ? barColor : emptyBarColor"
      />
    </div>

    <!-- Score numérico -->
    <div class="flex items-baseline gap-1">
      <span class="text-xl font-bold" :class="textColor">{{ score }}</span>
      <span class="text-sm" :class="dividerColor">/10</span>
    </div>

    <!-- Fuente opcional -->
    <span v-if="source" class="text-xs px-2 py-0.5 rounded" :class="sourceClass">
      {{ source }}
    </span>
  </div>
</template>
