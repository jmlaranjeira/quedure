<script setup lang="ts">
interface Props {
  title: string
  description?: string
  onDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  onDark: false
})

const { canUseWebShare, share, generateShareLinks, copyToClipboard } = useShare()

const showDropdown = ref(false)
const copied = ref(false)

const shareLinks = computed(() => generateShareLinks({
  title: props.title,
  description: props.description
}))

const handleClick = async () => {
  if (canUseWebShare.value) {
    await share({
      title: props.title,
      description: props.description
    })
  } else {
    showDropdown.value = !showDropdown.value
  }
}

const handleCopy = async () => {
  const success = await copyToClipboard()
  if (success) {
    copied.value = true
    setTimeout(() => {
      copied.value = false
      showDropdown.value = false
    }, 1500)
  }
}

const closeDropdown = () => {
  showDropdown.value = false
}

const dropdownRef = ref<HTMLElement | null>(null)

const onClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

watch(showDropdown, (value) => {
  if (value) {
    setTimeout(() => {
      document.addEventListener('click', onClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', onClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <div class="relative inline-block">
    <button
      type="button"
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
      :class="onDark
        ? 'bg-white/15 hover:bg-white/25 text-white'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'"
      title="Compartir"
      @click="handleClick"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
      <span class="hidden sm:inline">Compartir</span>
    </button>

    <!-- Dropdown (fallback desktop) -->
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showDropdown"
        ref="dropdownRef"
        class="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-50"
      >
        <a
          :href="shareLinks.twitter"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 text-gray-700 text-sm"
          @click="closeDropdown"
        >
          <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X (Twitter)
        </a>
        <a
          :href="shareLinks.facebook"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 text-gray-700 text-sm"
          @click="closeDropdown"
        >
          <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </a>
        <a
          :href="shareLinks.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 text-gray-700 text-sm"
          @click="closeDropdown"
        >
          <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
        <a
          :href="shareLinks.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 text-gray-700 text-sm"
          @click="closeDropdown"
        >
          <svg class="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
        <div class="border-t border-gray-100 my-1"></div>
        <button
          type="button"
          class="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 text-sm w-full text-left"
          :class="copied ? 'text-emerald-600' : 'text-gray-700'"
          @click="handleCopy"
        >
          <svg v-if="!copied" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          {{ copied ? '¡Copiado!' : 'Copiar enlace' }}
        </button>
      </div>
    </Transition>
  </div>
</template>
