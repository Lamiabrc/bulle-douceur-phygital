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

  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "QVT Box", path: "/boutique" },
    { label: "Zéna Entreprise", path: "/zena" },
    { label: "Zéna Family", path: "/zena-family" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="
      fixed top-0 left-0 right-0 z-50
      bg-white/60 backdrop-blur-xl
      border-b border-white/30
      shadow-[0_4px_25px_rgba(0,0,0,0.08)]
    ">
      {/* Halo supérieur */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] 
          bg-gradient-to-r from-[#8B5CF6] via-[#4FD1C5] to-[#8B5CF6] opacity-80"></div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="relative flex items-center gap-3 group">
            <div className="
              absolute -inset-3 rounded-full
              bg-gradient-to-br from-[#8B5CF6]/40 to-[#4FD1C5]/40
              blur-xl opacity-40 group-hover:opacity-60 transition-all
            "></div>

            <img
              src="/logo-qvt.jpeg"
              alt="QVT Box logo"
              className="
                relative w-12 h-12 rounded-full object-cover shadow-lg
                group-hover:scale-105 transition-transform
              "
            />

            <span className="
              relative text-xl font-semibold
              bg-gradient-to-r from-[#8B5CF6] to-[#4FD1C5]
              text-transparent bg-clip-text
            ">
              QVT Box
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    text-sm transition-all
                    ${location.pathname === item.path
                      ? "text-[#8B5CF6] font-semibold"
                      : "text-[#333]/70 hover:text-[#8B5CF6]"
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* LANG */}
            <li>
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </li>

            {/* COMPTE */}
            <li>
              <Link
                to={user ? "/dashboard" : "/auth"}
                className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-[#8B5CF6] to-[#4FD1C5]
                  text-white shadow hover:opacity-90 transition-all
                "
              >
                {user ? "Tableau de bord" : "Mon compte"}
              </Link>
            </li>

            {/* ADMIN */}
            {user && isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="p-2 rounded-lg bg-black text-white hover:bg-zinc-800 transition"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              </li>
            )}
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 text-[#8B5CF6]" />
            ) : (
              <Menu className="w-7 h-7 text-[#8B5CF6]" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="
              fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl 
              shadow-xl p-6 border-l border-[#8B5CF6]/20
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-semibold">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-7 h-7 text-[#8B5CF6]" />
              </button>
            </div>

            {/* LINKS */}
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg
                    ${location.pathname === item.path
                      ? "bg-[#8B5CF6]/10 text-[#8B5CF6] font-semibold"
                      : "text-[#333] hover:bg-[#8B5CF6]/10"
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* FOOTER MOBILE */}
            <div className="mt-6 pt-6 border-t border-[#8B5CF6]/20 space-y-3">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />

              <Link
                to={user ? "/dashboard" : "/auth"}
                className="block text-center px-6 py-3 rounded-lg bg-[#8B5CF6] text-white"
              >
                {user ? "Tableau de bord" : "Mon compte"}
              </Link>

              {user && isAdmin && (
                <Link
                  to="/admin"
                  className="block text-center px-6 py-3 rounded-lg bg-black text-white"
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
