export interface NewsletterState {
  email: string
  name: string
  consent: boolean
  isLoading: boolean
  isSuccess: boolean
  errorMessage: string
}

export interface SubscribeResponse {
  success: boolean
  message: string
}

export const useNewsletter = () => {
  const state = reactive<NewsletterState>({
    email: '',
    name: '',
    consent: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
  })

  const canSubmit = computed(() => {
    return state.email.length > 0 && state.consent && !state.isLoading
  })

  const resetForm = () => {
    state.email = ''
    state.name = ''
    state.consent = false
    state.errorMessage = ''
  }

  const subscribe = async (): Promise<boolean> => {
    state.isLoading = true
    state.errorMessage = ''
    state.isSuccess = false

    try {
      const response = await $fetch<SubscribeResponse>('/api/subscribe', {
        method: 'POST',
        body: {
          email: state.email,
          name: state.name || undefined,
          consent: state.consent
        }
      })

      state.isSuccess = true
      resetForm()
      return true
    } catch (error: any) {
      state.errorMessage = error.data?.statusMessage
        || error.statusMessage
        || 'Ha ocurrido un error. Inténtalo de nuevo.'
      return false
    } finally {
      state.isLoading = false
    }
  }

  return {
    state,
    canSubmit,
    subscribe,
    resetForm
  }
}
