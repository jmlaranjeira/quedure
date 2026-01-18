<script setup lang="ts">
const isMenuOpen = ref(false)

const navigation = [
  { name: 'Electrónica', href: '/electronica' },
  { name: 'Electrodomésticos', href: '/electrodomesticos' },
  { name: 'Ropa', href: '/ropa' },
  { name: 'Movilidad', href: '/movilidad' },
  { name: 'Reparar', href: '/reparar' },
  { name: 'Aprender', href: '/aprender' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container-wide">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="h-8 w-8">
            <path d="M32 4 C20 10, 16 22, 18 32 C16 42, 20 54, 32 58 C44 54, 48 42, 46 32 C48 22, 44 10, 32 4Z" fill="#F97316"/>
            <path d="M32 58 Q24 60, 20 68 Q28 62, 32 60 Q36 62, 44 68 Q40 60, 32 58Z" fill="#F97316"/>
            <circle cx="32" cy="18" r="4" fill="white"/>
            <circle cx="32" cy="18" r="2" fill="#1F2937"/>
          </svg>
          <span class="text-2xl font-bold text-primary-600">QueDure</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
        >
          <span class="sr-only">Abrir menú</span>
          <!-- Hamburger icon -->
          <svg
            v-if="!isMenuOpen"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <!-- Close icon -->
          <svg
            v-else
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="isMenuOpen" id="mobile-menu" class="md:hidden pb-4">
          <div class="flex flex-col space-y-1 pt-2">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              @click="isMenuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
