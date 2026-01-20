import type { H3Event } from 'h3'

interface SubscribeRequest {
  email: string
  name?: string
  consent: boolean
}

interface HostingerResponse {
  data?: {
    uuid: string
    email: string
    name: string
  }
  message?: string
  errors?: Record<string, string[]>
}

// Rate limiting simple en memoria (en producción usar Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function getClientIP(event: H3Event): string {
  const forwarded = getHeader(event, 'x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return getHeader(event, 'x-real-ip') || 'unknown'
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Verificar que el token está configurado
  if (!config.hostingerApiToken) {
    console.error('NUXT_HOSTINGER_API_TOKEN no está configurado')
    throw createError({
      statusCode: 500,
      statusMessage: 'Error de configuración del servidor'
    })
  }

  // Rate limiting
  const clientIP = getClientIP(event)
  if (!checkRateLimit(clientIP)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Demasiadas solicitudes. Por favor, inténtalo de nuevo en un minuto.'
    })
  }

  // Parsear body
  const body = await readBody<SubscribeRequest>(event)

  // Validar campos requeridos
  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El email es obligatorio'
    })
  }

  if (!isValidEmail(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El formato del email no es válido'
    })
  }

  if (!body.consent) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Debes aceptar la política de privacidad para suscribirte'
    })
  }

  // Llamar a la API de Hostinger Reach
  try {
    const response = await $fetch<HostingerResponse>(
      'https://developers.hostinger.com/api/reach/v1/contacts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.hostingerApiToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: {
          email: body.email.toLowerCase().trim(),
          name: body.name?.trim() || 'Suscriptor'
        }
      }
    )

    return {
      success: true,
      message: 'Te has suscrito correctamente. Revisa tu bandeja de entrada.'
    }
  } catch (error: any) {
    console.error('Error al suscribir:', error)

    // Manejar errores específicos de la API
    if (error.statusCode === 401) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error de autenticación con el servicio de email'
      })
    }

    if (error.statusCode === 422) {
      // Email ya existe o datos inválidos
      const errorData = error.data as HostingerResponse | undefined
      if (errorData?.errors?.email) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Este email ya está suscrito'
        })
      }
      throw createError({
        statusCode: 400,
        statusMessage: 'Los datos proporcionados no son válidos'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error al procesar la suscripción. Inténtalo más tarde.'
    })
  }
})
