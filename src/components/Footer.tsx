// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useMemo } from "react";

// ✅ Logo local (remplace le nom si besoin)
import logo from "@/assets/logo-qvt.jpeg";

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-foreground/5 border-t border-primary/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo + marque */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
              <img
                src={logo}
                alt="QVT Box — logo"
                className="relative w-14 h-14 rounded-full object-cover shadow-xl group-hover:scale-110 transition-all duration-300"
                onError={(e) => {
                  // Fallback visuel si le logo n’est pas présent
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const sibling = e.currentTarget.nextElementSibling as HTMLDivElement | null;
                  if (sibling) sibling.style.display = "flex";
                }}
              />
              {/* Fallback badge si l'image échoue */}
              <div
                className="hidden relative w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent items-center justify-center text-sm font-bold text-white shadow-xl"
                aria-hidden="true"
              >
                QVT
              </div>
            </div>
            <span className="text-3xl font-bold font-inter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              QVT Box
            </span>
          </div>

          {/* Accroche */}
          <p className="text-foreground/70 mb-8 font-lato font-light mx-auto">
            QVT Box est un compagnon professionnel du quotidien, conçu pour les salariés, les managers,
            les RH et les représentants du personnel. Ensemble, faisons de la question
            <span className="whitespace-nowrap"> “Ça va ?” </span>
            un vrai levier de dialogue social et de bien-être durable.
          </p>

          {/* Liens principaux */}
          <nav aria-label="Liens de pied de page" className="mb-8">
            <ul className="flex flex-wrap justify-center gap-8">
              <li>
                <Link to="/box" className="nav-link hover:scale-105 transition-transform font-inter whitespace-nowrap">
                  Notre Offre
                </Link>
              </li>
              <li>
                <Link to="/saas" className="nav-link hover:scale-105 transition-transform font-inter whitespace-nowrap">
                  Licence SaaS
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav-link hover:scale-105 transition-transform font-inter whitespace-nowrap">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/auth" className="nav-link hover:scale-105 transition-transform font-inter whitespace-nowrap">
                  Mon Espace
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link hover:scale-105 transition-transform font-inter whitespace-nowrap">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Coordonnées */}
          <div className="border-t border-primary/10 pt-6">
            <div className="space-y-3 mb-6 text-sm text-foreground/70">
              <h3 className="font-semibold text-foreground mb-2">Coordonnées QVT Box</h3>
              <p>
                📧 Email :
                {" "}
                <a href="mailto:contact@qvtbox.fr" className="text-primary hover:underline">
                  contact@qvtbox.fr
                </a>
                {" / "}
                <a href="mailto:lamia.brechet@outlook.fr" className="text-primary hover:underline">
                  lamia.brechet@outlook.fr
                </a>
              </p>
              <p>
                📞 Téléphone :
                {" "}
                <a href="tel:+33676435551" className="text-primary hover:underline whitespace-nowrap">
                  +33 (0)6 76 43 55 51
                </a>
                {" / "}
                <a href="tel:+33223242845" className="text-primary hover:underline whitespace-nowrap">
                  02 23 24 28 45
                </a>
              </p>
              <p>📍 Adresse : Rennes, France</p>
            </div>

            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
              <Link to="/cgv" className="text-foreground/60 hover:text-primary transition-colors font-inter">
                CGV
              </Link>
              <Link to="/mentions-legales" className="text-foreground/60 hover:text-primary transition-colors font-inter">
                Mentions Légales
              </Link>
              <Link to="/politique-confidentialite" className="text-foreground/60 hover:text-primary transition-colors font-inter">
                RGPD
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-foreground/50 font-inter text-center">
              © {year} QVT Box — Solutions phygitales B2B pour la qualité de vie au travail — Fait avec{" "}
              <Heart className="inline w-4 h-4 text-red-400" aria-hidden="true" /> en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
