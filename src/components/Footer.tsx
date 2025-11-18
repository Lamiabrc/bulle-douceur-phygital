// src/components/Footer.tsx
import { Link } from "react-router-dom";
import {
  Heart,
  Sparkles,
  Linkedin,
  Youtube,
  Instagram,
  Twitch,
  Facebook,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-white/70 to-[#F2F7F6] border-t border-primary/10 py-20 px-6">
      {/* ======= Halos ======= */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/20 blur-[160px] opacity-30 animate-breathe pointer-events-none" />

      {/* ======= Lucioles ======= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 -z-10">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-secondary/70 rounded-full animate-firefly"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ======= Content ======= */}
      <div className="container mx-auto relative z-10 max-w-5xl text-center flex flex-col items-center">
        {/* LOGO */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5B4B8A]/40 to-[#4FD1C5]/40 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-all" />
            <img
              src="/logo-qvt.jpeg"
              alt="QVT Box"
              className="relative w-16 h-16 rounded-full object-cover shadow-xl group-hover:scale-[1.07] transition-all"
            />
          </div>

          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#5B4B8A] via-[#4FD1C5] to-[#5B4B8A] text-transparent bg-clip-text tracking-tight">
            QVT Box
          </h2>
        </div>

        {/* SLOGAN */}
        <p className="text-lg text-[#212121]/70 leading-relaxed max-w-3xl mb-10">
          QVT Box combine <strong>écoute émotionnelle</strong>,{" "}
          <strong>IA bienveillante</strong> et{" "}
          <strong>solutions concrètes</strong> pour améliorer durablement la
          qualité de vie au travail.
          <br />
          Ensemble, faisons de “Ça va ?” une vraie question.
        </p>

        {/* CTA ZÉNA */}
        <a
          href="https://zena.qvtbox.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-white font-semibold text-lg shadow-lg hover:scale-[1.06] transition-all mb-12"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          Parler à <strong>ZÉNA Voice</strong>
        </a>

        {/* ======= Réseaux ======= */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            {
              name: "LinkedIn",
              icon: Linkedin,
              link: "https://www.linkedin.com/company/qvt-box",
            },
            {
              name: "YouTube",
              icon: Youtube,
              link: "https://www.youtube.com/@qvtbox",
            },
            {
              name: "Instagram",
              icon: Instagram,
              link: "https://www.instagram.com/qvtbox",
            },
            {
              name: "Facebook",
              icon: Facebook,
              link: "https://www.facebook.com/QVTBOX/",
            },
            {
              name: "Twitch",
              icon: Twitch,
              link: "https://www.twitch.tv/lamiazaina",
            },
          ].map(({ name, icon: Icon, link }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-md border border-primary/10 hover:shadow-lg hover:bg-primary/10 transition-all"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{name}</span>
            </a>
          ))}
        </div>

        {/* ======= Link Rows ======= */}
        <nav className="mb-10">
          <ul className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-[#212121]/70">
            <li>
              <Link to="/box" className="hover:text-primary">
                Notre offre
              </Link>
            </li>
            <li>
              <Link to="/saas" className="hover:text-primary">
                Licence SaaS
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-primary">
                Mon espace
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* ======= Legal ======= */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm text-[#212121]/60">
          <Link to="/cgv" className="hover:text-primary">
            CGV
          </Link>
          <Link to="/mentions-legales" className="hover:text-primary">
            Mentions légales
          </Link>
          <Link to="/politique-confidentialite" className="hover:text-primary">
            Politique de confidentialité
          </Link>
        </div>

        {/* ======= Copyright ======= */}
        <p className="text-sm text-[#212121]/50">
          © {year} QVT Box — Créé avec{" "}
          <Heart className="inline-block w-4 h-4 text-red-400" /> et beaucoup
          d’espoir 💜
        </p>
      </div>
    </footer>
  );
};

export default Footer;
