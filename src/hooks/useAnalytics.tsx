import { useCallback, useEffect, useMemo, useRef } from 'react'

type Json = Record<string, any>

interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  page?: string
  userId?: string
  properties?: Json
}

interface UserProperties {
  userId?: string
  email?: string
  company?: string
  role?: string
  teamSize?: number
}

type ConsentState = 'granted' | 'denied' | 'unknown'

/** ---------- Config ---------- **/
const ANALYTICS_ENDPOINT =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_ANALYTICS_ENDPOINT) ||
  '/api/analytics' // fallback

const GA_MEASUREMENT_ID =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GA_MEASUREMENT_ID) ||
  'GA_MEASUREMENT_ID' // remplace en prod

const BATCH_MAX = 20
const FLUSH_INTERVAL_MS = 5000
const REQUEST_TIMEOUT_MS = 3000

/** ---------- Helpers ---------- **/
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

const nowISO = () => new Date().toISOString()

const safeUA = () => (isBrowser ? navigator.userAgent.slice(0, 150) : 'server')

const currentUrl = () => (isBrowser ? window.location.href : 'server')

const referrer = () => (isBrowser ? document.referrer : '')

const hasBeacon = () => isBrowser && 'sendBeacon' in navigator

const sendWithTimeout = async (input: RequestInfo, init: RequestInit = {}) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

/** ---------- useAnalytics ---------- **/
export const useAnalytics = (opts?: {
  /** RGPD: si tu gères un bandeau, passe l’état ici */
  consent?: ConsentState
  /** Anonymiser (ne jamais envoyer userId/email) si true */
  anonymous?: boolean
}) => {
  const consent = opts?.consent ?? 'unknown'
  const anonymous = !!opts?.anonymous

  // File d’attente mémoire
  const queueRef = useRef<AnalyticsEvent[]>([])
  const userRef = useRef<UserProperties | null>(null)
  const flushingRef = useRef<boolean>(false)
  const timerRef = useRef<number | null>(null)

  const canSend = consent === 'granted'

  const enrichEvent = useCallback(
    (event: AnalyticsEvent): AnalyticsEvent & Json => {
      const basics: Json = {
        timestamp: nowISO(),
        url: currentUrl(),
        userAgent: safeUA(),
        referrer: referrer(),
      }

      const userFields =
        userRef.current && !anonymous
          ? {
              userId: userRef.current.userId,
              user_email: userRef.current.email,
              user_company: userRef.current.company,
              user_role: userRef.current.role,
              user_teamSize: userRef.current.teamSize,
            }
          : {}

      return {
        ...event,
        ...basics,
        ...userFields,
      }
    },
    [anonymous]
  )

  const flush = useCallback(async () => {
    if (!isBrowser || !canSend || flushingRef.current) return
    if (queueRef.current.length === 0) return

    flushingRef.current = true
    const batch = queueRef.current.splice(0, BATCH_MAX)

    try {
      // 1) GA4 (best-effort)
      const w = window as any
      if (typeof w?.gtag === 'function' && GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID') {
        for (const ev of batch) {
          w.gtag('event', ev.action, {
            event_category: ev.category,
            event_label: ev.label,
            value: ev.value,
            ...(ev.properties || {}),
          })
        }
      }

      // 2) Endpoint custom (batch)
      const payload = JSON.stringify({ events: batch })
      if (hasBeacon()) {
        // `sendBeacon` est non-bloquant et fiable à la fermeture
        const blob = new Blob([payload], { type: 'application/json' })
        navigator.sendBeacon(ANALYTICS_ENDPOINT, blob)
      } else {
        await sendWithTimeout(ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        })
      }
    } catch {
      // Échec silencieux : on ré-injecte le batch en tête pour retenter plus tard
      queueRef.current = [...batch, ...queueRef.current]
    } finally {
      flushingRef.current = false
    }
  }, [canSend])

  // Flush périodique
  useEffect(() => {
    if (!isBrowser || !canSend) return
    timerRef.current = window.setInterval(() => flush(), FLUSH_INTERVAL_MS) as unknown as number
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [flush, canSend])

  // Flush à la fermeture / perte de visibilité
  useEffect(() => {
    if (!isBrowser || !canSend) return
    const handler = () => flush()
    window.addEventListener('visibilitychange', handler)
    window.addEventListener('pagehide', handler)
    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('visibilitychange', handler)
      window.removeEventListener('pagehide', handler)
      window.removeEventListener('beforeunload', handler)
    }
  }, [flush, canSend])

  /** ---------- API publique (compatible avec la tienne) ---------- **/
  const trackEvent = useCallback(
    (event: AnalyticsEvent) => {
      // Pas de consentement => on log en dev, on n’envoie pas
      if (process.env.NODE_ENV === 'development') {
        // utile pour deboguer, même sans consentement
        // eslint-disable-next-line no-console
        console.log('📊 Analytics Event (queued):', event)
      }
      const enriched = enrichEvent(event)
      queueRef.current.push(enriched)
      // Batching opportuniste
      if (queueRef.current.length >= BATCH_MAX) {
        flush()
      }
    },
    [enrichEvent, flush]
  )

  const trackPageView = useCallback(
    (page: string, title?: string) => {
      trackEvent({
        action: 'page_view',
        category: 'navigation',
        label: page,
        properties: {
          title: title || (isBrowser ? document.title : undefined),
          referrer: referrer(),
        },
      })
    },
    [trackEvent]
  )

  const trackCTAClick = useCallback(
    (ctaName: string, location: string, destination?: string) => {
      trackEvent({
        action: 'cta_click',
        category: 'engagement',
        label: ctaName,
        properties: {
          location,
          destination,
          ts: Date.now(),
        },
      })
    },
    [trackEvent]
  )

  const trackProductView = useCallback(
    (productId: string, productName: string, category: string, price?: number) => {
      trackEvent({
        action: 'product_view',
        category: 'ecommerce',
        label: productName,
        value: price,
        properties: {
          product_id: productId,
          product_category: category,
        },
      })
    },
    [trackEvent]
  )

  const trackAddToCart = useCallback(
    (productId: string, productName: string, price: number, quantity: number = 1) => {
      trackEvent({
        action: 'add_to_cart',
        category: 'ecommerce',
        label: productName,
        value: price * quantity,
        properties: {
          product_id: productId,
          quantity,
          currency: 'EUR',
        },
      })
    },
    [trackEvent]
  )

  const trackFormSubmission = useCallback(
    (formName: string, success: boolean, errors?: string[]) => {
      trackEvent({
        action: success ? 'form_submit_success' : 'form_submit_error',
        category: 'forms',
        label: formName,
        properties: {
          errors: errors?.join(', '),
          form_name: formName,
        },
      })
    },
    [trackEvent]
  )

  const trackUserInteraction = useCallback(
    (interaction: string, element: string, details?: Json) => {
      trackEvent({
        action: 'user_interaction',
        category: 'engagement',
        label: `${interaction}_${element}`,
        properties: details,
      })
    },
    [trackEvent]
  )

  const trackPerformance = useCallback(
    (metric: string, value: number, context?: string) => {
      trackEvent({
        action: 'performance_metric',
        category: 'performance',
        label: metric,
        value: Math.round(value),
        properties: {
          context,
          user_agent: safeUA(),
          connection: isBrowser ? (navigator as any).connection?.effectiveType : undefined,
        },
      })
    },
    [trackEvent]
  )

  const trackSearch = useCallback(
    (query: string, resultsCount: number, filters?: Json) => {
      trackEvent({
        action: 'search',
        category: 'search',
        label: query,
        value: resultsCount,
        properties: {
          filters,
          query_length: query.length,
        },
      })
    },
    [trackEvent]
  )

  const identifyUser = useCallback((userProperties: UserProperties) => {
    userRef.current = { ...userProperties }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('👤 User Identified:', anonymous ? '(anonymous)' : userRef.current)
    }
    try {
      const w = window as any
      if (isBrowser && typeof w?.gtag === 'function' && GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID') {
        w.gtag('config', GA_MEASUREMENT_ID, {
          user_id: anonymous ? undefined : userProperties.userId,
          // Exemple de custom_map si tu as des dimensions GA4 configurées
          custom_map: {
            custom_dimension_1: 'company',
            custom_dimension_2: 'role',
          },
        })
      }
    } catch {
      // no-op
    }
  }, [anonymous])

  // Pour éviter de recréer l’API à chaque render
  return useMemo(
    () => ({
      trackEvent,
      trackPageView,
      trackCTAClick,
      trackProductView,
      trackAddToCart,
      trackFormSubmission,
      trackUserInteraction,
      trackPerformance,
      trackSearch,
      identifyUser,
      /** utilitaire si tu veux forcer un envoi (ex: fin d’un tunnel) */
      flushNow: flush,
    }),
    [
      trackEvent,
      trackPageView,
      trackCTAClick,
      trackProductView,
      trackAddToCart,
      trackFormSubmission,
      trackUserInteraction,
      trackPerformance,
      trackSearch,
      identifyUser,
      flush,
    ]
  )
}
