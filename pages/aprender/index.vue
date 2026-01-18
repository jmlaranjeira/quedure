<script setup lang="ts">
useSeoMeta({
  title: 'Aprende sobre consumo consciente | QueDure.es',
  description: 'Guías y recursos para un consumo más responsable. Aprende a elegir productos duraderos y reducir tu impacto ambiental.'
})

// Fetch articles from the aprender collection
const { data: articles } = await useAsyncData('aprender-articles', () => {
  return queryCollection('aprender').order('updatedAt', 'DESC').all()
})

const topics = [
  {
    title: 'Guía del comprador',
    description: 'Cómo evaluar la durabilidad antes de comprar',
    href: '/aprender/guia-comprador',
    icon: 'guide'
  },
  {
    title: 'Obsolescencia programada',
    description: 'Qué es y cómo evitar caer en ella',
    href: '/aprender/obsolescencia',
    icon: 'warning'
  },
  {
    title: 'Economía circular',
    description: 'El modelo que sustituye al usar y tirar',
    href: '/aprender/economia-circular',
    icon: 'circular'
  },
  {
    title: 'Certificaciones',
    description: 'Sellos y etiquetas que garantizan calidad',
    href: '/aprender/certificaciones',
    icon: 'badge'
  }
]

const steps = [
  {
    number: '01',
    title: 'Pregúntate si lo necesitas',
    description: 'El producto más sostenible es el que no compras. Evalúa si realmente lo necesitas o si puedes reparar, alquilar o pedir prestado.'
  },
  {
    number: '02',
    title: 'Investiga antes de comprar',
    description: 'Busca reseñas de durabilidad, disponibilidad de repuestos y experiencias de otros usuarios a largo plazo.'
  },
  {
    number: '03',
    title: 'Prioriza la reparabilidad',
    description: 'Elige productos con piezas reemplazables, manuales de reparación disponibles y garantía extendida.'
  },
  {
    number: '04',
    title: 'Cuida lo que tienes',
    description: 'El mantenimiento preventivo alarga significativamente la vida útil de tus productos.'
  }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-accent-600 to-accent-800 text-white py-16">
      <div class="container-wide">
        <nav class="text-sm mb-4">
          <NuxtLink to="/" class="text-accent-200 hover:text-white">Inicio</NuxtLink>
          <span class="mx-2 text-accent-300">/</span>
          <span>Aprender</span>
        </nav>
        <h1 class="text-4xl font-bold mb-4">Aprende a consumir mejor</h1>
        <p class="text-xl text-accent-100 max-w-2xl">
          El conocimiento es poder. Descubre cómo tomar mejores decisiones
          de compra y reducir tu impacto en el planeta.
        </p>
      </div>
    </section>

    <!-- Getting started -->
    <section class="py-12">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Empieza aquí</h2>
        <p class="text-gray-600 mb-8 max-w-2xl">
          Cuatro pasos sencillos para transformar tu forma de consumir
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="step in steps" :key="step.number" class="relative">
            <div class="text-6xl font-bold text-primary-100 absolute -top-2 -left-2">
              {{ step.number }}
            </div>
            <div class="card p-6 pt-8 relative z-10">
              <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
              <p class="text-sm text-gray-600">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topics -->
    <section class="py-12 bg-gray-100">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Temas</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="topic in topics"
            :key="topic.title"
            :to="topic.href"
            class="card p-6 group bg-white"
          >
            <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
              <svg v-if="topic.icon === 'guide'" class="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <svg v-else-if="topic.icon === 'warning'" class="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <svg v-else-if="topic.icon === 'circular'" class="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <svg v-else-if="topic.icon === 'badge'" class="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-accent-600 transition-colors">
              {{ topic.title }}
            </h3>
            <p class="mt-2 text-sm text-gray-600">{{ topic.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <section class="py-12">
      <div class="container-wide">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Últimos artículos</h2>
        <ArticleList
          :articles="articles || []"
          empty-message="Próximamente: guías y artículos sobre consumo consciente"
        />
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="py-12 bg-gray-100">
      <div class="container-narrow">
        <div class="bg-primary-50 rounded-2xl p-8 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Mantente informado
          </h2>
          <p class="text-gray-600 mb-6 max-w-md mx-auto">
            Recibe consejos de consumo consciente, alertas de productos problemáticos
            y las últimas guías directamente en tu correo.
          </p>
          <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button type="submit" class="btn-primary whitespace-nowrap">
              Suscribirme
            </button>
          </form>
          <p class="text-xs text-gray-500 mt-3">
            Sin spam. Puedes darte de baja cuando quieras.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
