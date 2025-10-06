import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "@/components/LanguageSelector";
import { Settings, Menu, X, Sparkles } from "lucide-react";

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
    { name: t("nav.international"), path: "/international" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-primary/20 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary opacity-70" />
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-90 transition-all duration-200 group"
          >
            <div className="relative">
              {/* Halo lumineux */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 blur-md opacity-60 group-hover:blur-xl transition-all duration-500" />
              <img
                src="https://2d181cb9-4143-4c90-9e92-77eb836ddc8b.lovableproject.com/logo-qvt.jpeg"
                alt="QVT Box Logo"
                className="relative w-10 h-10 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <span className="text-xl font-inter font-bold text-foreground group-hover:text-primary transition-colors">
              QVT Box
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`font-montserrat text-sm transition-colors ${
                    location.pathname === item.path
                      ? "text-primary font-semibold"
                      : "text-foreground/85 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* ZENA Voice (desktop only) */}
            <li>
              <Link
                to="https://zena.qvtbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:scale-[1.05] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                ZENA Voice
              </Link>
            </li>

            {/* Langue + CTA */}
            <li className="flex items-center gap-3">
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />

              <Link
                to="/contact"
                className="bg-primary text-white px-5 py-2 rounded-md font-medium transition-colors hover:bg-primary/90 font-inter"
              >
                {t("nav.contact") || "Contact"}
              </Link>

              <Link
                to={user ? "/dashboard" : "/auth"}
                className="bg-secondary text-white px-5 py-2 rounded-md font-medium transition-colors hover:bg-secondary/90 font-inter"
              >
                {user ? t("nav.dashboard") : t("nav.account")}
              </Link>

              {user && isAdmin && (
                <Link
                  to="/admin"
                  className="bg-accent text-white px-3 py-2 rounded-md transition-colors hover:bg-accent/90"
                  aria-label="Administration"
                  title="Administration"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              )}
            </li>
          </ul>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="fixed right-0 top-0 h-full w-80 bg-background shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-inter font-bold text-foreground">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2" aria-label="Fermer">
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="flex flex-col space-y-3 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-montserrat py-3 px-4 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* ZENA mobile */}
                <Link
                  to="https://zena.qvtbox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
                             bg-gradient-to-r from-primary to-secondary text-white font-semibold 
                             hover:scale-[1.03] transition-all"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  ZENA Voice
                </Link>
              </div>

              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <div className="px-1 mb-2">
                  <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                </div>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 text-center"
                >
                  {t("nav.contact") || "Contact"}
                </Link>

                <Link
                  to={user ? "/dashboard" : "/auth"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 text-center"
                >
                  {user ? t("nav.dashboard") : t("nav.account")}
                </Link>

                {user && isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 flex items-center justify-center gap-2"
                  >
                    <Settings className="w-5 h-5" />
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
