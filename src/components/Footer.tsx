import { Link } from "react-router-dom";
import { Heart, Sparkles, Linkedin, Youtube, Instagram, Twitch, Facebook } from "lucide-react";
import { useMemo } from "react";
import logo from "@/assets/logo-qvt.jpeg";

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background via-background/80 to-primary/5 border-t border-primary/10 py-16 px-6">
      {/* Halo lumineux */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-40 animate-breathe pointer-events-none" />

      {/* Lucioles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-secondary rounded-full animate-firefly"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-lg group-hover:blur-xl transition-all duration-700" />
            <img
              src={logo}
              alt="QVT Box — logo"
              className="relative w-16 h-16 rounded-full object-cover shadow-xl group-hover:scale-110 transition-all duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const fallback = e.currentTarget.nextElementSibling as HTMLDivElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              className="hidden relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent items-center justify-center text-base font-bold text-white shadow-xl"
              aria-hidden="true"
            >
              QVT
            </div>
          </div>
          <span className="text-3xl font-extrabold font-inter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
            QVT Box
          </span>
        </div>

        {/* Accroche */}
        <p className="text-foreground/70 mb-8 font-lato max-w-3xl mx-auto leading-relaxed">
          QVT Box est un compagnon phygital conçu pour les salariés, managers, RH et représentants du personnel.  
          Ensemble, faisons de la question <span className="font-semibold text-primary">“Ça va ?”</span>  
          un vrai levier de dialogue social, d’attention et d’espoir 🌱
        </p>

        {/* ZENA */}
        <div className="mb-10">
          <a
            href="https://zena.qvtbox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:scale-[1.05] transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Parler à <strong>ZENA Voice</strong></span>
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="mb-10">
          <h3 className="font-semibold text-foreground mb-3 text-center">
            Suivez <span className="text-primary">QVT Box</span> sur les réseaux
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/qvt-box"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@qvtbox"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/qvtbox"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/QVTBOX/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>

            {/* Twitch */}
            <a
              href="https://www.twitch.tv/lamiazaina"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <Twitch className="w-4 h-4" />
              <span>Twitch</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@qvtbox?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg"
                alt="TikTok"
                className="w-4 h-4"
              />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Liens simples */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <li><Link to="/box" className="hover:text-primary">Notre Offre</Link></li>
            <li><Link to="/saas" className="hover:text-primary">Licence SaaS</Link></li>
            <li><Link to="/about" className="hover:text-primary">À propos</Link></li>
            <li><Link to="/auth" className="hover:text-primary">Mon Espace</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </nav>

        {/* Légales */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm text-foreground/60">
          <Link to="/cgv" className="hover:text-primary">CGV</Link>
          <Link to="/mentions-legales" className="hover:text-primary">Mentions légales</Link>
          <Link to="/politique-confidentialite" className="hover:text-primary">RGPD</Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-foreground/50 font-inter text-center">
          © {year} QVT Box — Solutions phygitales B2B pour la qualité de vie au travail.  
          <br />Fait avec <Heart className="inline w-4 h-4 text-red-400" /> et beaucoup d’<span className="text-secondary">espoir</span> 💜
        </p>
      </div>
    </footer>
  );
};

export default Footer;
