<script setup lang="ts">
const { state, canSubmit, subscribe } = useNewsletter()

const handleSubmit = async () => {
  await subscribe()
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Mensaje de éxito -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="state.isSuccess"
        class="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center"
      >
        <svg class="w-12 h-12 mx-auto text-teal-600 mb-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          Suscripción confirmada
        </h3>
        <p class="text-gray-600 text-sm">
          Revisa tu bandeja de entrada para confirmar tu email.
        </p>
      </div>
    </Transition>

    <!-- Formulario -->
    <form
      v-if="!state.isSuccess"
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <!-- Email -->
      <div>
        <label for="newsletter-email" class="sr-only">Email</label>
        <input
          id="newsletter-email"
          v-model="state.email"
          type="email"
          required
          placeholder="Tu email"
          autocomplete="email"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
          :disabled="state.isLoading"
        />
      </div>

      <!-- Nombre (opcional) -->
      <div>
        <label for="newsletter-name" class="sr-only">Nombre (opcional)</label>
        <input
          id="newsletter-name"
          v-model="state.name"
          type="text"
          placeholder="Tu nombre (opcional)"
          autocomplete="given-name"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
          :disabled="state.isLoading"
        />
      </div>

      <!-- Consentimiento GDPR -->
      <div class="flex items-start gap-3">
        <input
          id="newsletter-consent"
          v-model="state.consent"
          type="checkbox"
          required
          class="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          :disabled="state.isLoading"
        />
        <label for="newsletter-consent" class="text-sm text-gray-600 leading-tight">
          Acepto recibir comunicaciones y he leído la
          <NuxtLink to="/privacidad" class="text-teal-600 hover:text-teal-700 underline">
            política de privacidad
          </NuxtLink>
        </label>
      </div>

      <!-- Mensaje de error -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <p
          v-if="state.errorMessage"
          class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg"
          role="alert"
        >
          {{ state.errorMessage }}
        </p>
      </Transition>

      <!-- Botón submit -->
      <button
        type="submit"
        :disabled="!canSubmit"
        class="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        <span v-if="state.isLoading" class="flex items-center justify-center gap-2">
          <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Suscribiendo...
        </span>
        <span v-else>Suscribirme</span>
      </button>

      <p class="text-xs text-gray-500 text-center">
        Sin spam. Puedes darte de baja en cualquier momento.
      </p>
    </form>
  </div>
</template>
