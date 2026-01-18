<script setup lang="ts">
const route = useRoute()

const { data: article } = await useAsyncData(`electronica-${route.path}`, () => {
  return queryCollection('electronica').path(route.path).first()
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
    category-name="Electrónica"
    category-path="/electronica"
    color-scheme="primary"
  >
    <ContentRenderer :value="article" />
  </ArticleLayout>
</template>
