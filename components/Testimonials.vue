<script setup lang="ts">
interface Testimonio {
  texto: string
  fuente: string
}

interface Props {
  testimonios: Testimonio[]
}

defineProps<Props>()
</script>

<template>
  <section class="bg-gray-50 rounded-xl p-6 lg:p-8">
    <h3 class="text-xl font-bold text-gray-900 mb-6">
      Lo que dicen los usuarios
    </h3>

    <div class="space-y-6">
      <blockquote
        v-for="(testimonio, index) in testimonios"
        :key="index"
        class="relative pl-6 border-l-4 border-primary-300"
      >
        <svg
          class="absolute -left-3 -top-2 w-6 h-6 text-primary-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p class="text-gray-700 italic mb-2">
          "{{ testimonio.texto }}"
        </p>
        <cite class="text-sm text-gray-500 not-italic">
          — {{ testimonio.fuente }}
        </cite>
      </blockquote>
    </div>
  </section>
</template>
