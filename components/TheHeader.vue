<script setup lang="ts">
const isMenuOpen = ref(false)
const isCategoriesOpen = ref(false)
const isMobileCategoriesOpen = ref(false)

const categories = [
  { name: 'Electrónica', href: '/electronica' },
  { name: 'Electrodomésticos', href: '/electrodomesticos' },
  { name: 'Ropa', href: '/ropa' },
  { name: 'Movilidad', href: '/movilidad' }
]

const navigation = [
  { name: 'Reparar', href: '/reparar' },
  { name: 'Lecturas', href: '/lecturas' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    isMobileCategoriesOpen.value = false
  }
}

const toggleMobileCategories = () => {
  isMobileCategoriesOpen.value = !isMobileCategoriesOpen.value
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container-wide">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/favicon.svg" alt="QueDure logo" class="h-8 w-8" />
          <span class="text-2xl font-bold text-primary-600">QueDure</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <!-- Categories Dropdown -->
          <div
            class="relative"
            @mouseenter="isCategoriesOpen = true"
            @mouseleave="isCategoriesOpen = false"
          >
            <button
              type="button"
              class="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              :class="{ 'text-primary-600 bg-gray-50': isCategoriesOpen }"
            >
              Categorías
              <svg
                class="h-4 w-4 transition-transform"
                :class="{ 'rotate-180': isCategoriesOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="isCategoriesOpen"
                class="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1"
              >
                <NuxtLink
                  v-for="category in categories"
                  :key="category.name"
                  :to="category.href"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                >
                  {{ category.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- Aprender destacado -->
          <NuxtLink
            to="/aprender"
            class="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50"
          >
            Aprender
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
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
            <!-- Mobile Categories -->
            <button
              type="button"
              class="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              @click="toggleMobileCategories"
            >
              Categorías
              <svg
                class="h-4 w-4 transition-transform"
                :class="{ 'rotate-180': isMobileCategoriesOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="isMobileCategoriesOpen" class="pl-4 flex flex-col space-y-1">
                <NuxtLink
                  v-for="category in categories"
                  :key="category.name"
                  :to="category.href"
                  class="px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  @click="isMenuOpen = false"
                >
                  {{ category.name }}
                </NuxtLink>
              </div>
            </Transition>

            <!-- Other navigation items -->
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              @click="isMenuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>

            <!-- Aprender destacado -->
            <NuxtLink
              to="/aprender"
              class="flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50"
              @click="isMenuOpen = false"
            >
              Aprender
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
