<script setup lang="ts">
interface Props {
  colorScheme?: 'primary' | 'secondary' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: 'primary'
})

const activeTab = ref(0)
const tabs = ref<{ id: string; title: string; content: string }[]>([])
const contentContainer = ref<HTMLElement | null>(null)

const activeColorClass = computed(() => {
  const schemes = {
    primary: 'border-primary-500 text-primary-600',
    secondary: 'border-secondary-500 text-secondary-600',
    accent: 'border-accent-500 text-accent-600'
  }
  return schemes[props.colorScheme]
})

const extractTabs = () => {
  if (!contentContainer.value) return

  const container = contentContainer.value
  const headings = container.querySelectorAll('h2')

  if (headings.length === 0) {
    // No h2 headings, show all content as single tab
    tabs.value = [{
      id: 'descripcion',
      title: 'Descripción',
      content: container.innerHTML
    }]
    return
  }

  const extractedTabs: typeof tabs.value = []

  // Get content before first h2 as "Descripción" tab
  let firstH2 = headings[0]
  let beforeContent = ''
  let currentNode = container.firstChild

  while (currentNode && currentNode !== firstH2) {
    if (currentNode instanceof Element) {
      beforeContent += currentNode.outerHTML
    } else if (currentNode instanceof Text && currentNode.textContent?.trim()) {
      beforeContent += currentNode.textContent
    }
    currentNode = currentNode.nextSibling
  }

  if (beforeContent.trim()) {
    extractedTabs.push({
      id: 'descripcion',
      title: 'Descripción',
      content: beforeContent
    })
  }

  // Extract content for each h2 section
  headings.forEach((h2, index) => {
    const title = h2.textContent || `Sección ${index + 1}`
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    let sectionContent = ''
    let sibling = h2.nextElementSibling

    while (sibling && sibling.tagName !== 'H2') {
      sectionContent += sibling.outerHTML
      sibling = sibling.nextElementSibling
    }

    extractedTabs.push({
      id,
      title,
      content: sectionContent
    })
  })

  tabs.value = extractedTabs
}

onMounted(() => {
  nextTick(() => {
    extractTabs()
  })
})
</script>

<template>
  <div>
    <!-- Hidden container to capture slot content -->
    <div ref="contentContainer" class="hidden">
      <slot />
    </div>

    <!-- Tabs navigation -->
    <div v-if="tabs.length > 1" class="border-b border-gray-200 mb-6">
      <nav class="flex gap-6 -mb-px overflow-x-auto">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          @click="activeTab = index"
          class="py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors"
          :class="activeTab === index
            ? activeColorClass
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          {{ tab.title }}
        </button>
      </nav>
    </div>

    <!-- Tab content -->
    <div
      v-if="tabs.length > 0"
      class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900"
      v-html="tabs[activeTab]?.content"
    />
  </div>
</template>
