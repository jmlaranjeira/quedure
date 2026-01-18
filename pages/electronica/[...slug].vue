<script setup lang="ts">
const route = useRoute()

// Try to find a specific article first
const { data: article } = await useAsyncData(`electronica-article-${route.path}`, () => {
  return queryCollection('electronica').path(route.path).first()
})

// If no article, get articles in this subcategory
const { data: subcategoryArticles } = await useAsyncData(`electronica-list-${route.path}`, async () => {
  if (article.value) return null
  const all = await queryCollection('electronica').order('updatedAt', 'DESC').all()
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
    : `${subcategoryName.value} - Electrónica | QueDure.es`,
  description: () => article.value?.description || `Guías y recomendaciones de ${subcategoryName.value?.toLowerCase()} duraderos`
})
</script>

<template>
  <!-- Product view -->
  <ProductLayout
    v-if="article"
    :article="article"
    category-name="Electrónica"
    category-path="/electronica"
    color-scheme="primary"
  >
    <ContentRenderer :value="article" />
  </ProductLayout>

  <!-- Subcategory listing -->
  <div v-else-if="isSubcategoryListing">
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-primary-200 hover:text-white">Inicio</NuxtLink>
          <span class="mx-2 text-primary-300">/</span>
          <NuxtLink to="/electronica" class="text-primary-200 hover:text-white">Electrónica</NuxtLink>
          <span class="mx-2 text-primary-300">/</span>
          <span>{{ subcategoryName }}</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">{{ subcategoryName }}</h1>
        <p class="text-xl text-primary-100 max-w-2xl">
          Guías y recomendaciones de {{ subcategoryName?.toLowerCase() }} duraderos y reparables.
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
