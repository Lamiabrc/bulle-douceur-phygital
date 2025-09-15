// src/contexts/AuthContext.tsx
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react'
import { User, Session, Provider } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useLocation, useNavigate } from 'react-router-dom'

type Role = 'admin' | 'rh' | 'manager' | 'employee' | 'parent' | 'teen' | 'guest'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  signInWithMagicLink: (email: string, returnTo?: string) => Promise<{ error?: any }>
  signInWithProvider: (provider: Provider, returnTo?: string) => Promise<{ error?: any }>
  resetPassword: (email: string) => Promise<{ error?: any }>
  updatePassword: (newPassword: string) => Promise<{ error?: any }>
  getRole: () => Role
  hasRole: (roles: Role | Role[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

const isBrowser = typeof window !== 'undefined'

function getReturnToFromQuery(locationSearch: string): string | undefined {
  const params = new URLSearchParams(locationSearch)
  const r = params.get('returnTo') || params.get('redirect') || undefined
  return r || undefined
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true

    // 1) Récupérer la session initiale
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // 2) Écouter les changements d’auth
    const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
      setSession(sess ?? null)
      setUser(sess?.user ?? null)

      // Gestion des cas spéciaux
      if (event === 'PASSWORD_RECOVERY') {
        // Supabase redirige vers ton redirectTo avec un type=recovery
        // On pousse l’utilisateur sur la page de reset si besoin
        navigate('/reset-password', { replace: true })
      }

      if (event === 'SIGNED_IN') {
        // Redirection post-login (si returnTo présent)
        const fromQuery = getReturnToFromQuery(location.search)
        if (fromQuery && isBrowser) {
          navigate(fromQuery, { replace: true })
        }
      }
    })

    return () => {
      isMounted = false
      sub.subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // on ne dépend pas de navigate/location pour ne pas recréer l’abonnement

  /** ---------- Actions ---------- **/
  const signOut = async () => {
    await supabase.auth.signOut()
    // Optionnel : revenir à l’accueil
    navigate('/', { replace: true })
  }

  const callbackUrl = useMemo(() => {
    if (!isBrowser) return undefined
    return `${window.location.origin}/auth/callback`
  }, [])

  const signInWithMagicLink = async (email: string, returnTo?: string) => {
    // Ajoute returnTo en query pour le callback
    const redirect = callbackUrl
      ? `${callbackUrl}${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`
      : undefined

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirect },
    })
    return { error }
  }

  const signInWithProvider = async (provider: Provider, returnTo?: string) => {
    const redirectTo = callbackUrl
      ? `${callbackUrl}${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`
      : undefined

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        // PKCE activé par défaut en v2
      },
    })
    return { error }
  }

  const resetPassword = async (email: string) => {
    const redirectTo = isBrowser
      ? `${window.location.origin}/reset-password`
      : undefined
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    return { error }
  }

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    return { error }
  }

  /** ---------- Rôles (via user metadata) ---------- **/
  // Convention : user.user_metadata.role stocke le rôle applicatif
  const getRole = (): Role => {
    const r = (user?.user_metadata as any)?.role as Role | undefined
    return r || 'guest'
  }

  const hasRole = (roles: Role | Role[]) => {
    const current = getRole()
    return Array.isArray(roles) ? roles.includes(current) : current === roles
  }

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      loading,
      signOut,
      signInWithMagicLink,
      signInWithProvider,
      resetPassword,
      updatePassword,
      getRole,
      hasRole,
    }),
    [user, session, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/* ===========================
   Auth Guards (hook + component)
   =========================== */

export const useAuthGuard = (opts?: { roles?: Role[]; redirectTo?: string }) => {
  const { user, loading, hasRole } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (loading) return
    if (!user) {
      // Redirige vers login avec retour à la page actuelle
      const ret = encodeURIComponent(location.pathname + location.search)
      navigate(`/auth/login?returnTo=${ret}`, { replace: true })
      return
    }
    if (opts?.roles && !hasRole(opts.roles)) {
      navigate('/403', { replace: true })
    }
  }, [user, loading, navigate, location, opts, hasRole])
}

export const RequireAuth: React.FC<{ roles?: Role[]; children: React.ReactNode }> = ({ roles, children }) => {
  useAuthGuard({ roles })
  const { loading, user } = useAuth()
  if (loading) return <div className="p-6 text-center">Chargement…</div>
  if (!user) return null // redirigé par le hook
  return <>{children}</>
}
