// src/contexts/LanguageContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type Language = "fr" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  /** t("clé", { name: "Lamia" }) */
  t: (key: string, params?: Record<string, string | number>) => string;
};

/** -------------------- Dictionnaires (tu peux compléter plus tard) -------------------- **/
const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.offer": "Notre Offre",
    "nav.saas": "Licence SaaS",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.international": "International",
    "nav.quote": "Demander un devis",
    "nav.dashboard": "Mon Tableau de Bord",
    "nav.account": "Mon Espace",

    "hero.tagline": "« Sortez de votre bulle, on veille sur vous »",
    "hero.description":
      "Solutions phygitales B2B pour améliorer la Qualité de Vie au Travail. Nous combinons attention quotidienne et outils de prévention pour vos équipes.",
    "hero.cta.quote": "Demander un devis",
    "hero.cta.callback": "Être recontacté",

    "offer.title": "Notre Offre Complète",
    "offer.subtitle":
      "Trois familles de solutions pour répondre à tous les besoins de vos équipes",
    "offer.box.title": "Box & Produits",
    "offer.box.subtitle": "Solutions physiques",
    "offer.box.description":
      "Box thématiques et événementielles, produits français artisanaux pour le soutien quotidien des équipes",

    "offer.saas.title": "Licence SaaS Entreprise",
    "offer.saas.subtitle": "Outil numérique exclusif",
    "offer.saas.description":
      "Application QVT réservée aux entreprises sous forme de licence pour la prévention RPS et le suivi QVCT",
    "offer.saas.warning":
      "⚠️ L'application QVT Box est réservée aux entreprises sous forme de licence",

    "offer.boutique.title": "Boutique & Partenariats",
    "offer.boutique.subtitle": "Réseau local",
    "offer.boutique.description":
      "Sélection de partenaires locaux et boutique en ligne pour compléter votre offre bien-être",

    "pricing.title": "Tarifs Indicatifs",
    "pricing.subtitle":
      "Des solutions adaptées à tous les budgets et toutes les tailles d'entreprise",
    "pricing.saas.note": "3 000 € /an + Box (coût supplémentaire)",
    "pricing.recommended": "Recommandé",

    "demo.title": "Licence Entreprise – Démo",
    "demo.description":
      "Chaque entreprise dispose de son propre espace sécurisé. Les RH peuvent ajouter leurs salariés, suivre les indicateurs QVT et recevoir des alertes.",
    "demo.no_individual":
      "QVT Box ne vend pas l'application aux particuliers.",
    "demo.cta": "Recevoir une démo de la licence",

    "contact.title": "Contactez-nous",
    "contact.subtitle":
      "Parlons de vos besoins en qualité de vie au travail",
    "contact.form.name": "Nom",
    "contact.form.company": "Entreprise",
    "contact.form.email": "Email",
    "contact.form.phone": "Téléphone",
    "contact.form.employees": "Nombre d'employés",
    "contact.form.offer": "Type d'offre souhaitée",
    "contact.form.message": "Message",
    "contact.form.send": "Envoyer",

    "boxes.title": "Nos Box Exceptionnelles",
    "boxes.subtitle":
      "Offrez à vos équipes un cadeau exceptionnel : une box française expédiée directement dans votre entreprise",
    "boxes.thematic": "Box Thématiques",
    "boxes.events": "Box Événementielles",
    "boxes.customization": "Options de Personnalisation",
    "boxes.international.title": "Cadeau Exceptionnel International",
    "boxes.international.description":
      "Offrez l'excellence française à vos équipes internationales. Nos box sont expédiées dans le monde entier avec le même niveau de qualité et d'attention.",
    "boxes.cta.quote": "Demander un devis pour cette box",
    "boxes.cta.order": "Commander cette box",
    "boxes.cta.international": "Demander un devis international",

    "international.title": "QVT Box International",
    "international.subtitle": "L'excellence française exportée dans le monde entier",
    "international.hero.title": "Vos Équipes Internationales Méritent le Meilleur",
    "international.hero.description":
      "QVT Box étend son savoir-faire au-delà des frontières. Offrez à vos collaborateurs internationaux l'authenticité et la qualité des produits français, avec la même attention et le même professionnalisme.",
  },
  en: {
    "nav.home": "Home",
    "nav.offer": "Our Offer",
    "nav.saas": "SaaS License",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.international": "International",
    "nav.quote": "Request Quote",
    "nav.dashboard": "My Dashboard",
    "nav.account": "My Account",

    "hero.tagline": "« Get out of your bubble, we're watching over you »",
    "hero.description":
      "Phygital B2B solutions to improve Workplace Quality of Life. We combine daily attention and prevention tools for your teams.",
    "hero.cta.quote": "Request a quote",
    "hero.cta.callback": "Get called back",

    "offer.title": "Our Complete Offer",
    "offer.subtitle":
      "Three solution families to meet all your team needs",
    "offer.box.title": "Boxes & Products",
    "offer.box.subtitle": "Physical solutions",
    "offer.box.description":
      "Thematic and event boxes, French artisanal products for daily team support",

    "offer.saas.title": "Enterprise SaaS License",
    "offer.saas.subtitle": "Exclusive digital tool",
    "offer.saas.description":
      "QVT application reserved for companies under license for RPS prevention and QVCT monitoring",
    "offer.saas.warning":
      "⚠️ The QVT Box application is reserved for companies under license",

    "offer.boutique.title": "Shop & Partnerships",
    "offer.boutique.subtitle": "Local network",
    "offer.boutique.description":
      "Selection of local partners and online shop to complement your wellness offer",

    "pricing.title": "Indicative Pricing",
    "pricing.subtitle":
      "Solutions adapted to all budgets and company sizes",
    "pricing.saas.note": "€3,000 /year + Box (additional cost)",
    "pricing.recommended": "Recommended",

    "demo.title": "Enterprise License – Demo",
    "demo.description":
      "Each company has its own secure space. HR can add employees, monitor QVT indicators and receive alerts.",
    "demo.no_individual":
      "QVT Box does not sell the application to individuals.",
    "demo.cta": "Get a license demo",

    "contact.title": "Contact Us",
    "contact.subtitle": "Let's talk about your QWL needs",
    "contact.form.name": "Name",
    "contact.form.company": "Company",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.employees": "Number of employees",
    "contact.form.offer": "Desired offer type",
    "contact.form.message": "Message",
    "contact.form.send": "Send",

    "boxes.title": "Our Exceptional Boxes",
    "boxes.subtitle":
      "Offer your teams an exceptional gift: a French box shipped directly to your company",
    "boxes.thematic": "Thematic Boxes",
    "boxes.events": "Event Boxes",
    "boxes.customization": "Customization Options",
    "boxes.international.title": "Exceptional International Gift",
    "boxes.international.description":
      "Offer French excellence to your international teams. Our boxes ship worldwide with the same level of quality and attention.",
    "boxes.cta.quote": "Request a quote for this box",
    "boxes.cta.order": "Order this box",
    "boxes.cta.international": "Request international quote",

    "international.title": "QVT Box International",
    "international.subtitle": "French excellence exported worldwide",
    "international.hero.title": "Your International Teams Deserve the Best",
    "international.hero.description":
      "QVT Box extends its expertise beyond borders. Offer authenticity and quality of French products with the same attention and professionalism.",
  },
} as const;

/** -------------------- Contexte -------------------- **/
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "qvtbox-language";
const isBrowser = typeof window !== "undefined";

function getInitialLanguage(): Language {
  if (!isBrowser) return "fr";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "fr" || saved === "en") return saved;
  const nav = (navigator.language || navigator.languages?.[0] || "fr").toLowerCase();
  return nav.startsWith("fr") ? "fr" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Persistance + attribut <html lang="...">
  useEffect(() => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  // Sync entre onglets
  useEffect(() => {
    if (!isBrowser) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const val = e.newValue;
        if (val === "fr" || val === "en") setLanguage(val);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const dict = translations[language] as Record<string, string>;
      const en = translations.en as Record<string, string>;
      let str = dict[key] ?? en[key] ?? key;

      if (import.meta.env.DEV && (str === key || !(key in dict))) {
        // Aide dev : log des clés manquantes en dev
        // eslint-disable-next-line no-console
        console.warn(`[i18n] Missing key "${key}" for "${language}"`);
      }

      if (params) {
        str = str.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ""));
      }
      return str;
    },
    [language]
  );

  const value = useMemo<LanguageContextType>(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** ✅ Hook infaillible : ne jette JAMAIS (fallback fr) */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context) return context;

  console.warn('[i18n] LanguageProvider manquant — fallback "fr" appliqué.');
  return {
    language: "fr",
    setLanguage: () => {},
    t: (key: string, params?: Record<string, string | number>) => {
      const en = translations.en as Record<string, string>;
      let str = en[key] ?? String(key);
      if (params) {
        str = str.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ""));
      }
      return str;
    },
  };
}
