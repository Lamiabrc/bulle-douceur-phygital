import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  page?: string;
  userId?: string;
  properties?: Record<string, any>;
}

interface UserProperties {
  userId?: string;
  email?: string;
  company?: string;
  role?: string;
  teamSize?: number;
  // QVCT / segmentation
  segment?: 'enterprise' | 'family';
  sector?: string;
  country?: string;
}

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Enrichissement “safe” côté client
    const analyticsData = {
      ...event,
      timestamp: new Date().toISOString(),
      url: isBrowser ? window.location.href : 'server',
      referrer: isBrowser ? document.referrer : '',
      userAgent: isBrowser ? navigator.userAgent.substring(0, 150) : 'server',
      platform: 'web',
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event (enriched):', analyticsData);
    }

    try {
      // GA4 best-effort
      if (isBrowser && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          ...event.properties,
        });
      }

      // Endpoint custom – on envoie la version enrichie (correctif)
      if (isBrowser) {
        const payload = JSON.stringify(analyticsData);
        if ('sendBeacon' in navigator) {
          const blob = new Blob([payload], { type: 'application/json' });
          (navigator as any).sendBeacon('/api/analytics', blob);
        } else {
          fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
          }).catch(() => {});
        }
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }, []);

  // Pages
  const trackPageView = useCallback((page: string, title?: string) => {
    trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: page,
      properties: {
        title: isBrowser ? (title || document.title) : title,
        referrer: isBrowser ? document.referrer : undefined,
      },
    });
  }, [trackEvent]);

  // CTA
  const trackCTAClick = useCallback((ctaName: string, location: string, destination?: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: ctaName,
      properties: { location, destination, ts: Date.now() },
    });
  }, [trackEvent]);

  // E-commerce / catalogue
  const trackProductView = useCallback((productId: string, productName: string, category: string, price?: number) => {
    trackEvent({
      action: 'product_view',
      category: 'ecommerce',
      label: productName,
      value: price,
      properties: { product_id: productId, product_category: category },
    });
  }, [trackEvent]);

  const trackAddToCart = useCallback((productId: string, productName: string, price: number, quantity: number = 1) => {
    trackEvent({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: productName,
      value: price * quantity,
      properties: { product_id: productId, quantity, currency: 'EUR' },
    });
  }, [trackEvent]);

  // Forms
  const trackFormSubmission = useCallback((formName: string, success: boolean, errors?: string[]) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'forms',
      label: formName,
      properties: { errors: errors?.join(', '), form_name: formName },
    });
  }, [trackEvent]);

  // Interactions
  const trackUserInteraction = useCallback((interaction: string, element: string, details?: Record<string, any>) => {
    trackEvent({
      action: 'user_interaction',
      category: 'engagement',
      label: `${interaction}_${element}`,
      properties: details,
    });
  }, [trackEvent]);

  // Perf
  const trackPerformance = useCallback((metric: string, value: number, context?: string) => {
    trackEvent({
      action: 'performance_metric',
      category: 'performance',
      label: metric,
      value: Math.round(value),
      properties: {
        context,
        user_agent: isBrowser ? navigator.userAgent : 'server',
        connection: isBrowser ? (navigator as any).connection?.effectiveType : undefined,
      },
    });
  }, [trackEvent]);

  // Search
  const trackSearch = useCallback((query: string, resultsCount: number, filters?: Record<string, any>) => {
    trackEvent({
      action: 'search',
      category: 'search',
      label: query,
      value: resultsCount,
      properties: { filters, query_length: query.length },
    });
  }, [trackEvent]);

  // Identification (GA4 best-effort + contexte QVCT)
  const identifyUser = useCallback((userProperties: UserProperties) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('👤 User Identified:', userProperties);
    }
    try {
      if (isBrowser && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          user_id: userProperties.userId,
          // NB: la map de dimensions custom se fait côté GA (interface) ; ici on pousse juste des champs
        });
      }
      // Envoie côté backend si besoin (profilage analytics)
      if (isBrowser) {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'identify', category: 'user', properties: userProperties }),
        }).catch(() => {});
      }
    } catch (e) {
      console.warn('User identification failed:', e);
    }
  }, []);

  /** ====== Helpers orientés QVCT/ROI/Partenariats ====== */

  // 1) Détection RPS / niveau de risque
  const trackRPSRisk = useCallback(
    (level: 'low' | 'medium' | 'high', domain: 'stress' | 'workload' | 'relationships' | 'ergonomics' | 'other') => {
      trackEvent({
        action: 'rps_risk',
        category: 'qvct',
        label: domain,
        properties: { level },
      });
    },
    [trackEvent]
  );

  // 2) Recommandation de box (personnalisation)
  const trackBoxRecommended = useCallback(
    (boxType: string, rationale?: string, expectedValueEur?: number) => {
      trackEvent({
        action: 'box_recommended',
        category: 'personalization',
        label: boxType,
        value: expectedValueEur,
        properties: { rationale },
      });
    },
    [trackEvent]
  );

  // 3) Économies accordées (ROI concret, €)
  const trackSavings = useCallback(
    (amountEur: number, category: 'leisure' | 'travel' | 'health' | 'parenting' | 'groceries' | 'other', partner?: string) => {
      trackEvent({
        action: 'savings_awarded',
        category: 'roi',
        label: category,
        value: Math.round(amountEur),
        properties: { partner },
      });
    },
    [trackEvent]
  );

  // 4) Clic sur un partenaire (visibilité des partenariats)
  const trackPartnershipClick = useCallback((partnerName: string, partnerType?: string) => {
    trackEvent({
      action: 'partner_click',
      category: 'partnerships',
      label: partnerName,
      properties: { partner_type: partnerType },
    });
  }, [trackEvent]);

  return {
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
    // Nouveaux helpers QVCT/ROI
    trackRPSRisk,
    trackBoxRecommended,
    trackSavings,
    trackPartnershipClick,
  };
};
