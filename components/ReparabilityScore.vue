<script setup lang="ts">
interface Props {
  score: number
  source?: string
  compact?: boolean
  onDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
  onDark: false
})

const barColor = computed(() => {
  if (props.score >= 8) return props.onDark ? 'bg-emerald-400' : 'bg-emerald-500'
  if (props.score >= 5) return props.onDark ? 'bg-orange-400' : 'bg-orange-500'
  return props.onDark ? 'bg-red-400' : 'bg-red-500'
})

const textColor = computed(() => {
  if (props.score >= 8) return props.onDark ? 'text-emerald-400' : 'text-emerald-500'
  if (props.score >= 5) return props.onDark ? 'text-orange-400' : 'text-orange-500'
  return props.onDark ? 'text-red-400' : 'text-red-500'
})

const emptyBarColor = computed(() => props.onDark ? 'bg-white/20' : 'bg-gray-200')
const sourceClass = computed(() => props.onDark ? 'text-white/60 bg-white/10' : 'text-gray-400 bg-gray-100')
const dividerColor = computed(() => props.onDark ? 'text-white/40' : 'text-gray-400')
</script>

<template>
  <!-- Versión compacta para cards -->
  <div v-if="compact" class="flex items-center gap-2">
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

  <!-- Versión completa -->
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
