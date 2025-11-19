// src/components/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "@/components/LanguageSelector";
import { Settings, Menu, X, Sparkles } from "lucide-react";

/**
 * 🌓 Navigation QVT Box — vibe premium à la Sandbar
 * - Barre sombre, fine, légèrement translucide
 * - Logo rond QVT Box + glow doux
 * - Liens simples & lisibles
 * - CTA ZÉNA Voice très visible
 */

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /** 🧭 Onglets principaux */
  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Entreprise", path: "/saas" },
    { label: "Family", path: "/boutique" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Ligne lumineuse en haut */}
      <div className="pointer-events-none h-[2px] w-full bg-gradient-to-r from-amber-400 via-rose-400 to-teal-300 opacity-80" />

      {/* Barre principale */}
      <div className="backdrop-blur-xl bg-[#050816]/85 border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-18 md:px-6 lg:px-8">
          {/* Logo + titre */}
          <Link to="/" className="relative flex items-center gap-3">
            {/* Glow discret derrière le logo */}
            <span className="pointer-events-none absolute inset-[-6px] rounded-full bg-gradient-to-br from-amber-300/30 via-rose-300/30 to-teal-300/30 blur-md opacity-70" />

            <img
              src="/logo-qvt.jpeg"
              alt="QVT Box"
              className="relative h-10 w-10 rounded-full object-cover shadow-lg"
            />

            <div className="relative hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-wide text-white">
                QVT Box
              </span>
              <span className="text-[11px] uppercase tracking-[0.12em] text-zinc-400">
                Sortir de sa bulle, ensemble
              </span>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-5 text-sm">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative inline-flex items-center pb-0.5 transition-colors ${
                      isActive(item.path)
                        ? "text-amber-200"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-teal-300" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Bouton ZÉNA */}
            <a
              href="https://zena.qvtbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-100 via-rose-100 to-teal-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] shadow-[0_0_40px_rgba(251,191,36,0.25)] hover:brightness-105 transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
              </span>
              ZÉNA Voice
              <Sparkles className="h-4 w-4" />
            </a>

            {/* Langue + compte */}
            <div className="flex items-center gap-3">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />

              <Link
                to={user ? "/dashboard" : "/auth"}
                className="rounded-full border border-zinc-600/70 px-4 py-1.5 text-xs font-medium text-zinc-100 hover:border-amber-300/70 hover:text-amber-100 transition-colors"
              >
                {user ? "Tableau de bord" : "Mon compte"}
              </Link>

              {user && isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-amber-200 hover:bg-zinc-700 transition-colors"
                  title="Administration"
                >
                  <Settings className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Bouton mobile */}
          <button
            className="md:hidden rounded-full border border-zinc-700/70 bg-[#050816]/80 p-2 text-zinc-100"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-72 border-l border-zinc-800 bg-[#050816]/95 p-5 shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-100">
                Menu
              </span>
              <button
                className="rounded-full border border-zinc-700 bg-zinc-900/80 p-1.5 text-zinc-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    isActive(item.path)
                      ? "bg-amber-400/10 text-amber-100"
                      : "text-zinc-200 hover:bg-zinc-800/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="https://zena.qvtbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-teal-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] shadow-[0_0_40px_rgba(251,191,36,0.25)]"
              >
                <Sparkles className="h-4 w-4" />
                ZÉNA Voice
              </a>
            </div>

            <div className="mt-6 border-t border-zinc-800 pt-4 space-y-3">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />

              <Link
                to={user ? "/dashboard" : "/auth"}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-full bg-zinc-900/80 px-4 py-2 text-center text-xs font-medium text-zinc-100 border border-zinc-700 hover:border-amber-300/70 hover:text-amber-100"
              >
                {user ? "Tableau de bord" : "Mon compte"}
              </Link>

              {user && isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-full bg-zinc-900/80 px-4 py-2 text-center text-xs font-medium text-amber-100 border border-amber-400/70"
                >
                  Administration
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
