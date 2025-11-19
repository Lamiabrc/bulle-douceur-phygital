// src/components/Footer.tsx
import { Link } from "react-router-dom";
import {
  Heart,
  Linkedin,
  Youtube,
  Instagram,
  Twitch,
  Facebook,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2A2520] bg-[#151515] text-[#FDF9F0]">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* TOP ROW */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* BRAND + TAGLINE */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#F3E0B9]/30 blur-lg" />
              <img
                src="/logo-qvt.jpeg"
                alt="QVT Box"
                className="relative h-12 w-12 rounded-full object-cover border border-[#F3E0B9]/40 shadow-md"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tight">
                  QVT Box
                </span>
                <span className="inline-block rounded-full border border-[#F3E0B9]/40 px-3 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[#E5D7BF]">
                  Santé émotionnelle & QVCT
                </span>
              </div>
              <p className="mt-1 text-xs md:text-sm text-[#D5C8B0]">
                « Sortez de votre bulle, on veille sur vous. »
              </p>
            </div>
          </div>

          {/* MAIN LINKS */}
          <nav className="text-sm">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[#E5D7BF]/80">
              <li>
                <Link to="/" className="hover:text-[#F3E0B9] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/box"
                  className="hover:text-[#F3E0B9] transition-colors"
                >
                  QVT Box & Box bien-être
                </Link>
              </li>
              <li>
                <Link
                  to="/saas"
                  className="hover:text-[#F3E0B9] transition-colors"
                >
                  Licence SaaS entreprise
                </Link>
              </li>
              <li>
                <a
                  href="https://zena.qvtbox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3E0B9] transition-colors"
                >
                  ZÉNA Entreprise
                </a>
              </li>
              <li>
                <a
                  href="https://zena-family.qvtbox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3E0B9] transition-colors"
                >
                  ZÉNA Family
                </a>
              </li>
              <li>
                <Link
                  to="/simulateur"
                  className="hover:text-[#F3E0B9] transition-colors"
                >
                  Ma bulle attentionnée
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* SEPARATOR */}
        <div className="mt-8 border-t border-[#2A2520]" />

        {/* BOTTOM ROW */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* LEGAL & SITE LINKS */}
          <div className="space-y-2 text-xs text-[#C9BDA7]">
            <div className="flex flex-wrap gap-4">
              <Link
                to="/cgv"
                className="hover:text-[#F3E0B9] transition-colors"
              >
                CGV
              </Link>
              <Link
                to="/mentions-legales"
                className="hover:text-[#F3E0B9] transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                to="/politique-confidentialite"
                className="hover:text-[#F3E0B9] transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                to="/contact"
                className="hover:text-[#F3E0B9] transition-colors"
              >
                Contact
              </Link>
            </div>

            <p className="text-[11px] text-[#AFA291]">
              © {year} QVT Box — Conçu avec{" "}
              <Heart className="inline-block h-3 w-3 text-red-400 align-text-bottom" />{" "}
              et beaucoup d’espoir pour les salariés, les parents et les ados.
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              {
                name: "LinkedIn",
                icon: Linkedin,
                href: "https://www.linkedin.com/company/qvt-box",
              },
              {
                name: "YouTube",
                icon: Youtube,
                href: "https://www.youtube.com/@qvtbox",
              },
              {
                name: "Instagram",
                icon: Instagram,
                href: "https://www.instagram.com/qvtbox",
              },
              {
                name: "Facebook",
                icon: Facebook,
                href: "https://www.facebook.com/QVTBOX/",
              },
              {
                name: "Twitch",
                icon: Twitch,
                href: "https://www.twitch.tv/lamiazaina",
              },
            ].map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 rounded-full border border-[#2F2923] bg-[#1B1916] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#E5D7BF]/85 hover:border-[#F3E0B9]/70 hover:text-[#F3E0B9] transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
