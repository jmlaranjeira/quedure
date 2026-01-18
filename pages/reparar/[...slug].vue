<script setup lang="ts">
const route = useRoute()

// Try to find a specific article first
const { data: article } = await useAsyncData(`reparar-article-${route.path}`, () => {
  return queryCollection('reparar').path(route.path).first()
})

// If no article, get articles in this subcategory
const { data: subcategoryArticles } = await useAsyncData(`reparar-list-${route.path}`, async () => {
  if (article.value) return null
  const all = await queryCollection('reparar').order('updatedAt', 'DESC').all()
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

useSeoMeta({
  title: () => article.value
    ? `${article.value.title} | QueDure.es`
    : `${subcategoryName.value} - Reparar | QueDure.es`,
  description: () => article.value?.description || `Tutoriales de ${subcategoryName.value?.toLowerCase()} para alargar la vida de tus productos`
})
</script>

<template>
  <!-- Article view -->
  <ArticleLayout
    v-if="article"
    :article="article"
    category-name="Reparar"
    category-path="/reparar"
    color-scheme="secondary"
  >
    <ContentRenderer :value="article" />
  </ArticleLayout>

  <!-- Subcategory listing -->
  <div v-else-if="isSubcategoryListing">
    <section class="bg-gradient-to-br from-secondary-500 to-secondary-700 text-white py-16">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-secondary-200 hover:text-white">Inicio</NuxtLink>
          <span class="mx-2 text-secondary-300">/</span>
          <NuxtLink to="/reparar" class="text-secondary-200 hover:text-white">Reparar</NuxtLink>
          <span class="mx-2 text-secondary-300">/</span>
          <span>{{ subcategoryName }}</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">{{ subcategoryName }}</h1>
        <p class="text-xl text-secondary-100 max-w-2xl">
          Tutoriales de {{ subcategoryName?.toLowerCase() }} para alargar la vida de tus productos.
        </p>
      </div>
    </section>

    <section class="py-12">
      <div class="container-wide">
        <ArticleList
          :articles="subcategoryArticles || []"
          :empty-message="`No hay tutoriales en ${subcategoryName} todavía`"
        />
      </div>
    </section>
  </div>
</template>
