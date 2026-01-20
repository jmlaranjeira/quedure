<script setup lang="ts">
useSeoMeta({
  title: 'Newsletter - QueDure.es',
  description: 'Suscríbete a nuestra newsletter y recibe consejos de consumo consciente, alertas de productos problemáticos y guías de reparación.'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="py-16 bg-gradient-to-br from-teal-600 to-teal-700">
      <div class="container-narrow text-center text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Mantente informado
        </h1>
        <p class="text-xl text-teal-100 max-w-2xl mx-auto">
          Únete a nuestra comunidad de consumidores conscientes y recibe contenido
          exclusivo directamente en tu correo.
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="container-narrow">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <!-- Beneficios -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              ¿Qué recibirás?
            </h2>
            <ul class="space-y-4">
              <li class="flex gap-4">
                <img src="/icons/check-orange.svg" alt="" class="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="font-semibold text-gray-900">Guías de productos duraderos</h3>
                  <p class="text-gray-600 text-sm">
                    Análisis detallados de productos diseñados para durar años, no meses.
                  </p>
                </div>
              </li>
              <li class="flex gap-4">
                <img src="/icons/check-orange.svg" alt="" class="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="font-semibold text-gray-900">Alertas de obsolescencia</h3>
                  <p class="text-gray-600 text-sm">
                    Te avisamos cuando detectamos productos con problemas de durabilidad.
                  </p>
                </div>
              </li>
              <li class="flex gap-4">
                <img src="/icons/check-orange.svg" alt="" class="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="font-semibold text-gray-900">Tutoriales de reparación</h3>
                  <p class="text-gray-600 text-sm">
                    Aprende a reparar tus objetos y alargar su vida útil.
                  </p>
                </div>
              </li>
              <li class="flex gap-4">
                <img src="/icons/check-orange.svg" alt="" class="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="font-semibold text-gray-900">Noticias del sector</h3>
                  <p class="text-gray-600 text-sm">
                    Novedades sobre derecho a reparar, legislación y consumo sostenible.
                  </p>
                </div>
              </li>
            </ul>

            <div class="mt-8 p-4 bg-gray-50 rounded-xl">
              <p class="text-sm text-gray-600">
                <strong class="text-gray-900">Sin spam.</strong>
                Enviamos 1-2 emails al mes con contenido de valor.
                Puedes darte de baja en cualquier momento.
              </p>
            </div>
          </div>

          <!-- Formulario -->
          <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 class="text-xl font-bold text-gray-900 mb-6 text-center">
              Suscríbete gratis
            </h2>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
