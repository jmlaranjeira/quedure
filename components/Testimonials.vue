<script setup lang="ts">
interface Testimonio {
  texto: string
  autor?: string
  fuente: string
}

interface Props {
  testimonios: Testimonio[]
}

defineProps<Props>()

// Get first letter of author name for avatar
const getInitial = (autor?: string, fuente?: string) => {
  if (autor) return autor[0].toUpperCase()
  if (fuente) return fuente[0].toUpperCase()
  return 'U'
}

// Get display name
const getDisplayName = (autor?: string) => {
  return autor || 'Usuario anónimo'
}
</script>

<template>
  <section class="py-16 bg-stone-50">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="font-display text-3xl text-gray-900 text-center mb-12">
        Quienes ya lo tienen dicen...
      </h2>

      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          v-for="(testimonio, index) in testimonios"
          :key="index"
          class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative"
        >
          <!-- Comilla decorativa -->
          <div class="absolute -top-4 left-8 text-6xl text-teal-200 font-serif leading-none">"</div>

          <!-- Texto del testimonio -->
          <blockquote class="font-body text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
            {{ testimonio.texto }}
          </blockquote>

          <!-- Footer con avatar y autor -->
          <footer class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ getInitial(testimonio.autor, testimonio.fuente) }}
            </div>
            <div>
              <div class="font-body font-medium text-gray-900">
                {{ getDisplayName(testimonio.autor) }}
              </div>
              <div class="font-body text-sm text-gray-400">
                {{ testimonio.fuente }}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>
