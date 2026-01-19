interface ShareData {
  title: string
  description?: string
  url?: string
}

interface ShareLinks {
  twitter: string
  facebook: string
  linkedin: string
  whatsapp: string
  email: string
}

export function useShare() {
  const route = useRoute()

  const isPwa = ref(false)
  const canUseWebShare = ref(false)

  onMounted(() => {
    // Detectar modo PWA (standalone)
    isPwa.value = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone === true

    // Detectar Web Share API
    canUseWebShare.value = typeof navigator !== 'undefined' && !!navigator.share
  })

  const getPageUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href
    }
    return `https://quedure.es${route.fullPath}`
  }

  const generateShareLinks = (data: ShareData): ShareLinks => {
    const url = data.url || getPageUrl()
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(data.title)
    const encodedDescription = encodeURIComponent(data.description || '')

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
    }
  }

  const share = async (data: ShareData): Promise<boolean> => {
    const url = data.url || getPageUrl()

    if (canUseWebShare.value) {
      try {
        await navigator.share({
          title: data.title,
          text: data.description,
          url
        })
        return true
      } catch (error) {
        // Usuario canceló o error - no es un problema
        if ((error as Error).name !== 'AbortError') {
          console.warn('Error sharing:', error)
        }
        return false
      }
    }

    return false
  }

  const copyToClipboard = async (text?: string): Promise<boolean> => {
    const url = text || getPageUrl()

    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch {
      // Fallback para navegadores antiguos
      try {
        const textArea = document.createElement('textarea')
        textArea.value = url
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        return true
      } catch {
        return false
      }
    }
  }

  return {
    isPwa,
    canUseWebShare,
    getPageUrl,
    generateShareLinks,
    share,
    copyToClipboard
  }
}
