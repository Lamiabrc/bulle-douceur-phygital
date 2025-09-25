import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useCart } from "@/hooks/useCart";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "@/components/LanguageSelector";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Settings, Menu, X } from "lucide-react";

// ✅ Logo local — remplace le nom si besoin
import logo from "@/assets/logo-qvt.jpeg";

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { totalItems, setIsOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.offer"), path: "/box" },
    { name: t("nav.saas"), path: "/saas" },
    { name: t("nav.international"), path: "/international" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ] as const;

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Focus close button for accessibility
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Helper to check active link
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group"
            aria-label="Aller à l’accueil"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
              <img
                src={logo}
                alt="QVT Box Logo"
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback visuel si le logo n’est pas présent
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const sibling = e.currentTarget.nextElementSibling as HTMLDivElement | null;
                  if (sibling) sibling.style.display = "flex";
                }}
              />
              {/* Fallback badge si l'image échoue */}
              <div
                className="hidden relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center text-xs md:text-sm font-bold text-white shadow-lg"
                aria-hidden="true"
              >
                QVT
              </div>
            </div>
            <span className="text-xl md:text-2xl font-inter font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              QVT Box
            </span>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={[
                    "nav-link transition-all duration-300 font-montserrat hover:scale-105",
                    isActive(item.path) ? "text-primary font-semibold" : "text-foreground/90",
                  ].join(" ")}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Language */}
            <li>
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            </li>

            {/* Panier */}
            <li>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition whitespace-nowrap"
                aria-label={t("nav.cart") || "Ouvrir le panier"}
              >
                <ShoppingBag className="w-5 h-5 text-foreground" />
                <span className="hidden lg:inline text-sm">{t("nav.cart") || "Panier"}</span>
                {totalItems > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] rounded-full"
                    aria-label={`${totalItems} articles dans le panier`}
                  >
                    {totalItems}
                  </Badge>
                )}
              </button>
            </li>

            {/* CTA devis */}
            <li>
              <Link
                to="/contact"
                className="bg-primary text-white px-5 py-2 rounded-lg font-medium transition-all hover:bg-primary/90 font-inter whitespace-nowrap"
              >
                {t("nav.quote")}
              </Link>
            </li>

            {/* Compte / Dashboard */}
            <li>
              <Link
                to={user ? "/dashboard" : "/auth"}
                className="bg-secondary text-white px-5 py-2 rounded-lg font-medium transition-all hover:bg-secondary/90 font-inter whitespace-nowrap"
              >
                {user ? t("nav.dashboard") : t("nav.account")}
              </Link>
            </li>

            {/* Admin */}
            {user && isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="bg-accent text-white px-3 py-2 rounded-lg font-medium transition-all hover:bg-accent/90 font-inter inline-flex items-center justify-center"
                  aria-label="Administration"
                  title="Administration"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile: right controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative inline-flex items-center justify-center rounded-lg p-2 hover:bg-muted transition"
              aria-label={t("nav.cart") || "Ouvrir le panier"}
            >
              <ShoppingBag className="w-6 h-6 text-foreground" />
              {totalItems > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-[10px] rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </button>

            {/* Burger */}
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              <Menu className="w-7 h-7 text-primary" />
            </button>
          </div>
        </div>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-[60] bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          >
            <div
              id="mobile-menu-panel"
              ref={panelRef}
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-xl p-6 focus:outline-none"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-inter font-bold text-foreground">Menu</span>
                <button
                  ref={closeBtnRef}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="flex flex-col space-y-2 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    className={[
                      "text-base font-montserrat py-3 px-4 rounded-lg transition-colors",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <div className="px-2">
                  <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                </div>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-primary/90 font-inter text-center whitespace-nowrap"
                >
                  {t("nav.quote")}
                </Link>

                <Link
                  to={user ? "/dashboard" : "/auth"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-secondary text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-secondary/90 font-inter text-center whitespace-nowrap"
                >
                  {user ? t("nav.dashboard") : t("nav.account")}
                </Link>

                {user && isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-accent text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-accent/90 font-inter flex items-center justify-center gap-2"
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
