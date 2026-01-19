<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

interface RelatedArticle {
  path: string
  title: string
  description: string
  category?: string
  readingTime?: number
}

interface Props {
  article: {
    title: string
    description: string
    type?: 'product' | 'tutorial' | 'article'
    category?: string
    subcategory?: string
    brand?: string
    price?: string
    rating?: number
    reparabilidad?: number
    reparabilidadSource?: string
    pros?: string[]
    cons?: string[]
    difficulty?: string
    time?: string
    tools?: string[]
    readingTime?: number
    updatedAt?: string
    author?: string
    tags?: string[]
    keyTakeaways?: string[]
    image?: string
    body?: {
      toc?: {
        links: TocLink[]
      }
    }
  }
  categoryName: string
  categoryPath: string
  colorScheme?: 'primary' | 'secondary'
  relatedArticles?: RelatedArticle[]
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: 'primary',
  relatedArticles: () => []
})

// Compute article type with backwards compatibility
const articleType = computed(() => {
  if (props.article.type) return props.article.type
  if (props.article.reparabilidad || props.article.pros || props.article.cons) return 'product'
  if (props.article.tools || props.article.difficulty) return 'tutorial'
  return 'article'
})

const isArticle = computed(() => articleType.value === 'article')
const isProduct = computed(() => articleType.value === 'product')
const isTutorial = computed(() => articleType.value === 'tutorial')

const tocLinks = computed(() => props.article.body?.toc?.links || [])
const hasToc = computed(() => tocLinks.value.length > 0)

const gradientClass = computed(() => {
  const schemes = {
    primary: 'from-primary-600 to-primary-800',
    secondary: 'from-secondary-500 to-secondary-700'
  }
  return schemes[props.colorScheme]
})
</script>

<template>
  <div>
    <!-- Reading Progress Bar (article type only) -->
    <ReadingProgress v-if="isArticle" />

    <!-- Hero -->
    <section :class="['bg-gradient-to-br text-white py-12', gradientClass]">
      <div class="container-wide">
        <!-- Breadcrumbs with better contrast -->
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-white/80 hover:text-white transition-colors">Inicio</NuxtLink>
          <span class="mx-2 text-white/50">/</span>
          <NuxtLink :to="categoryPath" class="text-white/80 hover:text-white transition-colors">{{ categoryName }}</NuxtLink>
          <span class="mx-2 text-white/50">/</span>
          <span class="text-white/90">{{ article.title }}</span>
        </nav>

        <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ article.title }}</h1>
        <p class="text-lg max-w-2xl text-white/90">{{ article.description }}</p>

        <!-- Reparability Score (product type) -->
        <div v-if="isProduct && article.reparabilidad" class="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
          <div class="text-xs text-white/70 mb-2">Puntuación de reparabilidad</div>
          <ReparabilityScore
            :score="article.reparabilidad"
            :source="article.reparabilidadSource"
            on-dark
          />
        </div>

        <!-- Meta info -->
        <div class="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <!-- Product meta -->
          <span v-if="isProduct && article.brand" class="bg-white/15 px-3 py-1.5 rounded-full">
            {{ article.brand }}
          </span>
          <span v-if="isProduct && article.price" class="bg-white/15 px-3 py-1.5 rounded-full">
            {{ article.price }}
          </span>

          <!-- Tutorial meta -->
          <span v-if="isTutorial && article.difficulty" class="bg-white/15 px-3 py-1.5 rounded-full">
            Dificultad: {{ article.difficulty }}
          </span>
          <span v-if="isTutorial && article.time" class="bg-white/15 px-3 py-1.5 rounded-full">
            {{ article.time }}
          </span>

          <!-- Article meta -->
          <span v-if="isArticle && article.author" class="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {{ article.author }}
          </span>

          <!-- Common meta -->
          <span v-if="article.readingTime" class="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ article.readingTime }} min lectura
          </span>

          <!-- Share button -->
          <ShareButton :title="article.title" :description="article.description" on-dark />

          <span v-if="article.updatedAt" class="text-white/70 text-xs">
            Actualizado: {{ article.updatedAt }}
          </span>
        </div>

        <!-- Tags (article type) with better hover states -->
        <div v-if="isArticle && article.tags && article.tags.length" class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="bg-white/20 hover:bg-white/40 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 cursor-pointer"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </section>

    <!-- Content: Article type with sidebar -->
    <article v-if="isArticle" class="py-12">
      <div class="container-wide">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Main content -->
          <div class="flex-1 min-w-0">
            <!-- Key Takeaways -->
            <KeyTakeaways
              v-if="article.keyTakeaways && article.keyTakeaways.length"
              :takeaways="article.keyTakeaways"
            />

            <!-- Article body -->
            <div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900 prose-li:text-gray-700">
              <slot />
            </div>

            <!-- Share and meta section -->
            <div class="mt-10 pt-6 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <SocialShare :title="article.title" :description="article.description" />
                <div v-if="article.updatedAt" class="text-sm text-gray-500">
                  Última actualización: {{ article.updatedAt }}
                </div>
              </div>
            </div>

            <!-- Related Articles -->
            <RelatedArticles
              v-if="relatedArticles && relatedArticles.length"
              :articles="relatedArticles"
            />

            <!-- Newsletter CTA -->
            <div class="mt-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 text-center">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                ¿Te ha sido útil este artículo?
              </h3>
              <p class="text-gray-600 mb-6 max-w-md mx-auto">
                Descubre más guías sobre consumo consciente y productos que duran.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <NuxtLink
                  to="/aprender"
                  class="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  Ver más artículos
                </NuxtLink>
                <NuxtLink
                  to="/electronica"
                  class="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 border border-gray-200 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  Explorar productos
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Sidebar with ToC -->
          <aside v-if="hasToc" class="hidden lg:block w-64 flex-shrink-0">
            <div class="sticky top-20">
              <TableOfContents :links="tocLinks" :key-takeaways="article.keyTakeaways" />
            </div>
          </aside>
        </div>
      </div>
    </article>

    <!-- Content: Product and Tutorial types (original layout) -->
    <article v-else class="py-12">
      <div class="container-narrow">
        <!-- Tools needed (for repair tutorials) -->
        <div v-if="isTutorial && article.tools && article.tools.length > 0" class="bg-gray-100 rounded-lg p-6 mb-10">
          <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
            Herramientas necesarias
          </h3>
          <ul class="flex flex-wrap gap-2">
            <li v-for="tool in article.tools" :key="tool" class="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
              {{ tool }}
            </li>
          </ul>
        </div>

        <!-- Pros/Cons (for products) -->
        <div v-if="isProduct && (article.pros || article.cons)" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div v-if="article.pros" class="bg-green-50 rounded-lg p-6">
            <h3 class="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Ventajas
            </h3>
            <ul class="space-y-2">
              <li v-for="pro in article.pros" :key="pro" class="text-green-700 text-sm flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                {{ pro }}
              </li>
            </ul>
          </div>
          <div v-if="article.cons" class="bg-red-50 rounded-lg p-6">
            <h3 class="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Desventajas
            </h3>
            <ul class="space-y-2">
              <li v-for="con in article.cons" :key="con" class="text-red-700 text-sm flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                {{ con }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Article body -->
        <div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900">
          <slot />
        </div>

        <!-- Updated date -->
        <div v-if="article.updatedAt" class="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500">
          Última actualización: {{ article.updatedAt }}
        </div>
      </div>
    </article>

    <!-- Floating share button -->
    <FloatingShareButton
      :title="article.title"
      :description="article.description"
    />
  </div>
</template>
