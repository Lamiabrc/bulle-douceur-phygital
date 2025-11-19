// src/components/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "@/components/LanguageSelector";
import { Settings, Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /** 🌐 Items parfaitement alignés avec App.tsx */
  const mainNavItems = [
    { label: "Accueil", path: "/" },
    { label: "Entreprise", path: "/saas" },
    { label: "Box QVT", path: "/box" },
    { label: "Boutique", path: "/boutique" },
    { label: "Ma bulle attentionnée", path: "/simulateur" },
    { label: "À propos", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  /** Liens ZÉNA = routes internes (App.tsx redirige vers les sous-domaines) */
  const zenaLinks = [
    { label: "ZÉNA Entreprise", path: "/zena" },
    { label: "ZÉNA Family", path: "/zena-family" },
  ];

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 backdrop-blur-xl bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Halo top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#5B4B8A] via-[#4FD1C5] to-[#5B4B8A] opacity-80"></div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link to="/" className="relative group flex items-center gap-3">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#5B4B8A]/35 to-[#4FD1C5]/35 blur-lg opacity-40 group-hover:opacity-60 transition-all" />

            <img
              src="/logo-qvt.jpeg"
              alt="QVT Box"
              className="relative w-11 h-11 rounded-full object-cover shadow-xl group-hover:scale-105 transition-transform"
            />

            <div className="relative flex flex-col">
              <span className="text-lg font-semibold bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-transparent bg-clip-text leading-tight">
                QVT Box
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B]">
                Santé émotionnelle & QVCT
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {/* Liens principaux */}
            <ul className="flex items-center gap-6 text-sm">
              {mainNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`transition-all ${
                      isActive(item.path)
                        ? "text-[#1B1A18] font-semibold"
                        : "text-[#4B4B4B] hover:text-[#111111]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Séparateur */}
            <span className="h-6 w-px bg-black/10" />

            {/* ZÉNA pill */}
            <div className="flex items-center gap-3">
              <Link
                to="/zena"
                className="inline-flex items-center gap-2 rounded-full border border-[#E2D6C3] bg-[#FDF9F0] px-4 py-1.5 text-xs font-medium text-[#1B1A18] hover:bg-[#F3E0B9]/70 hover:border-[#F3E0B9] transition"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ZÉNA Entreprise
              </Link>

              <Link
                to="/zena-family"
                className="text-[11px] text-[#6F6454] hover:text-[#1B1A18] transition"
              >
                ZÉNA Family
              </Link>
            </div>

            {/* Langue */}
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />

            {/* Compte / Dashboard */}
            <Link
              to={user ? "/dashboard" : "/auth"}
              className="px-4 py-2 rounded-full bg-[#151515] text-white text-xs font-medium hover:bg-black transition-all"
            >
              {user ? "Tableau de bord" : "Mon compte"}
            </Link>

            {/* Admin */}
            {user && isAdmin && (
              <Link
                to="/admin"
                className="p-2 rounded-full border border-[#E2D6C3] text-[#6F6454] hover:bg-[#FDF9F0] transition"
              >
                <Settings className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#151515]" />
            ) : (
              <Menu className="w-6 h-6 text-[#151515]" />
            )}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="fixed right-0 top-0 h-full w-80 bg-[#FDF9F0]/95 backdrop-blur-xl shadow-xl p-6 border-l border-[#E2D6C3]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold tracking-[0.18em] uppercase text-[#6F6454]">
                  Menu
                </span>
                <button
                  className="p-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5 text-[#151515]" />
                </button>
              </div>

              {/* Liens principaux */}
              <div className="flex flex-col space-y-2">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm ${
                      isActive(item.path)
                        ? "bg-[#151515] text-[#FDF9F0]"
                        : "text-[#4B4B4B] bg-white/70 hover:bg-[#F3E0B9]/60"
                    } transition`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* ZÉNA */}
              <div className="mt-6 space-y-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#9C8D77]">
                  ZÉNA · IA émotionnelle
                </p>
                {zenaLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-full border border-[#E2D6C3] bg-white/80 text-xs text-[#1B1A18] hover:bg-[#F3E0B9]/70 hover:border-[#F3E0B9] transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Langue + compte */}
              <div className="mt-6 pt-6 border-t border-[#E2D6C3] space-y-3">
                <LanguageSelector
                  currentLanguage={language}
                  onLanguageChange={setLanguage}
                />

                <Link
                  to={user ? "/dashboard" : "/auth"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-6 py-3 rounded-full bg-[#151515] text-white text-sm"
                >
                  {user ? "Tableau de bord" : "Mon compte"}
                </Link>

                {user && isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center px-6 py-3 rounded-full border border-[#151515] text-[#151515] text-sm bg-white"
                  >
                    Administration
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
