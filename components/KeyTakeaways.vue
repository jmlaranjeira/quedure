<script setup lang="ts">
interface Props {
  takeaways: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
    <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <span class="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-lg">
        <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      </span>
      Puntos clave
    </h3>
    <div class="grid gap-3">
      <div
        v-for="(takeaway, index) in takeaways"
        :key="index"
        class="flex items-start gap-3 bg-gray-50 rounded-lg p-4"
      >
        <span class="flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">
          {{ index + 1 }}
        </span>
        <span class="text-gray-700">{{ takeaway }}</span>
      </div>
    </div>
  </div>
</template>
