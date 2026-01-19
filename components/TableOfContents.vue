<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

interface Props {
  links: TocLink[]
  keyTakeaways?: string[]
}

defineProps<Props>()

const activeId = ref<string | null>(null)
const isAtBottom = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    { rootMargin: '-80px 0px -80% 0px' }
  )

  // Observe all heading elements
  document.querySelectorAll('h2[id], h3[id]').forEach((heading) => {
    observer.observe(heading)
  })

  // Check if user is at the bottom of the article
  const checkBottom = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    isAtBottom.value = docHeight > 0 && scrollTop / docHeight > 0.85
  }

  window.addEventListener('scroll', checkBottom, { passive: true })
  checkBottom()

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('scroll', checkBottom)
  })
})

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <nav class="text-sm">
    <!-- Table of Contents -->
    <div v-if="!isAtBottom">
      <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
        En este artículo
      </h4>
      <ul class="space-y-1">
        <li v-for="link in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            :class="[
              'block py-1.5 transition-colors duration-200 border-l-2 pl-3 -ml-px',
              activeId === link.id
                ? 'text-primary-600 border-primary-500 font-medium'
                : 'text-gray-600 border-transparent hover:text-primary-600 hover:border-primary-300'
            ]"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>
          <ul v-if="link.children && link.children.length" class="pl-4 space-y-1">
            <li v-for="child in link.children" :key="child.id">
              <a
                :href="`#${child.id}`"
                :class="[
                  'block py-1 text-xs transition-colors duration-200 border-l-2 pl-3 -ml-px',
                  activeId === child.id
                    ? 'text-primary-600 border-primary-500 font-medium'
                    : 'text-gray-500 border-transparent hover:text-primary-600 hover:border-primary-300'
                ]"
                @click.prevent="scrollToHeading(child.id)"
              >
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- CTA when at bottom -->
    <div v-else class="bg-primary-50 rounded-lg p-4">
      <div class="flex items-center gap-2 mb-2">
        <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-medium text-gray-900 text-sm">¡Has terminado!</span>
      </div>
      <p class="text-xs text-gray-600 mb-3">
        ¿Te ha sido útil este artículo?
      </p>
      <div class="space-y-2">
        <NuxtLink
          to="/aprender"
          class="block text-center text-xs bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Más artículos
        </NuxtLink>
        <NuxtLink
          to="/electronica"
          class="block text-center text-xs bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Ver productos
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
