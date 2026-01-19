<script setup lang="ts">
// Global SEO schemas for all pages
useOrganizationSchema()
useWebsiteSchema()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <TheHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
