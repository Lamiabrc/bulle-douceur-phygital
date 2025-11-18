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
 * 🟣 Navigation premium QVT Box — Version 2025
 * - Glassmorphism doux
 * - Halo animé + bulle centrale signature
 * - CTA ZÉNA Voice priorisé
 * - Responsive impeccable
 * - Optimisé branding & conversion
 */
const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.offer"), path: "/box" },
    { name: t("nav.saas"), path: "/saas" },
    { name: t("nav.manifesto"), path: "/manifeste" },
    { name: t("nav.international"), path: "/international" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 backdrop-blur-xl bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      {/* Halo top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#5B4B8A] via-[#4FD1C5] to-[#5B4B8A] opacity-80"></div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="relative group flex items-center gap-3">
            {/* Bulle halo */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#5B4B8A]/40 to-[#4FD1C5]/40 blur-lg opacity-40 group-hover:opacity-60 transition-all"></div>

            <img
              src="/logo-qvt.jpeg"
              alt="QVT Box"
              className="relative w-12 h-12 rounded-full object-cover shadow-xl group-hover:scale-105 transition-transform"
            />

            <span className="relative text-xl font-bold bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-transparent bg-clip-text">
              QVT Box
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`text-sm transition-all ${
                    location.pathname === item.path
                      ? "text-primary font-semibold"
                      : "text-[#212121]/70 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* ZENA BUTTON */}
            <li>
              <a
                href="https://zena.qvtbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-white shadow-lg hover:scale-[1.06] transition-all"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                ZÉNA Voice
              </a>
            </li>

            {/* LANG + CTA */}
            <li className="flex items-center gap-4">
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />

              <Link
                to="/contact"
                className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-all"
              >
                Contact
              </Link>

              <Link
                to={user ? "/dashboard" : "/auth"}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
              >
                {user ? t("nav.dashboard") : t("nav.account")}
              </Link>

              {user && isAdmin && (
                <Link
                  to="/admin"
                  className="p-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition-all"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              )}
            </li>
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
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
              className="fixed right-0 top-0 h-full w-80 bg-white/90 backdrop-blur-xl shadow-xl p-6 border-l border-primary/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold">Menu</span>
                <button className="p-2" onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>

              {/* LINKS */}
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-[#212121]/80 hover:bg-primary/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* ZENA */}
                <a
                  href="https://zena.qvtbox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-white text-center font-medium shadow-lg"
                >
                  <Sparkles className="w-4 h-4 inline-block mr-2" />
                  ZÉNA Voice
                </a>
              </div>

              {/* LANG + LOGIN */}
              <div className="mt-6 pt-6 border-t border-primary/20 space-y-3">
                <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />

                <Link
                  to="/contact"
                  className="block text-center px-6 py-3 rounded-lg bg-primary text-white"
                >
                  Contact
                </Link>

                <Link
                  to={user ? "/dashboard" : "/auth"}
                  className="block text-center px-6 py-3 rounded-lg bg-secondary text-white"
                >
                  {user ? t("nav.dashboard") : t("nav.account")}
                </Link>

                {user && isAdmin && (
                  <Link
                    to="/admin"
                    className="block text-center px-6 py-3 rounded-lg bg-accent text-white"
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
