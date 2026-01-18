<script setup lang="ts">
const route = useRoute()

const { data: article } = await useAsyncData(`reparar-${route.path}`, () => {
  return queryCollection('reparar').path(route.path).first()
})

if (!article.value) {
  throw createError({ statusCode: 404, message: 'Artículo no encontrado' })
}

useSeoMeta({
  title: () => `${article.value?.title} | QueDure.es`,
  description: () => article.value?.description
})
</script>

<template>
  <ArticleLayout
    v-if="article"
    :article="article"
    category-name="Reparar"
    category-path="/reparar"
    color-scheme="secondary"
  >
    <ContentRenderer :value="article" />
  </ArticleLayout>
</template>
