<script setup lang="ts">
const route = useRoute()

// Try to find a specific article first
const { data: article } = await useAsyncData(`aprender-article-${route.path}`, () => {
  return queryCollection('aprender').path(route.path).first()
})

// If no article, get articles in this subcategory
const { data: subcategoryArticles } = await useAsyncData(`aprender-list-${route.path}`, async () => {
  if (article.value) return null
  const all = await queryCollection('aprender').order('updatedAt', 'DESC').all()
  return all.filter((a: any) => a.path?.startsWith(route.path + '/'))
})

// Get subcategory name from path
const subcategoryName = computed(() => {
  const slug = route.params.slug
  if (Array.isArray(slug) && slug.length > 0) {
    const name = slug[slug.length - 1]
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  return ''
})

const isSubcategoryListing = computed(() => !article.value && subcategoryArticles.value?.length)

if (!article.value && !subcategoryArticles.value?.length) {
  throw createError({ statusCode: 404, message: 'Página no encontrada' })
}

// SEO with JSON-LD Schema
if (article.value) {
  useArticleSeo({
    title: article.value.title,
    description: article.value.description,
    image: article.value.image,
    category: 'Aprender',
    modifiedTime: article.value.updatedAt
  })

  useBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Aprender', url: '/aprender' },
    { name: article.value.title, url: route.path }
  ])
} else {
  useSeo({
    title: `${subcategoryName.value} - Aprender | QueDure.es`,
    description: `Artículos sobre ${subcategoryName.value?.toLowerCase()} y consumo consciente`
  })

  useBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Aprender', url: '/aprender' },
    { name: subcategoryName.value, url: route.path }
  ])
}
</script>

<template>
  <!-- Article view -->
  <ArticleLayout
    v-if="article"
    :article="article"
    category-name="Aprender"
    category-path="/aprender"
    color-scheme="primary"
  >
    <ContentRenderer :value="article" />
  </ArticleLayout>

  <!-- Subcategory listing -->
  <div v-else-if="isSubcategoryListing">
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-primary-200 hover:text-white">Inicio</NuxtLink>
          <span class="mx-2 text-primary-300">/</span>
          <NuxtLink to="/aprender" class="text-primary-200 hover:text-white">Aprender</NuxtLink>
          <span class="mx-2 text-primary-300">/</span>
          <span>{{ subcategoryName }}</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">{{ subcategoryName }}</h1>
        <p class="text-xl text-primary-100 max-w-2xl">
          Artículos sobre {{ subcategoryName?.toLowerCase() }} y consumo consciente.
        </p>
      </div>
    </section>

    <section class="py-12">
      <div class="container-wide">
        <ArticleList
          :articles="subcategoryArticles || []"
          :empty-message="`No hay artículos en ${subcategoryName} todavía`"
        />
      </div>
    </section>
  </div>
</template>
