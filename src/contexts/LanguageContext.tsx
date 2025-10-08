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
    "nav.manifesto": "Manifeste",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.international": "International",
    "nav.quote": "Demander un devis",
    "nav.dashboard": "Mon Tableau de Bord",
    "nav.account": "Mon Espace",

    // Hero principal
    "hero.tagline": "« Sortez de votre bulle, on veille sur vous »",
    "hero.description": "QVT Box combine mesure QVCT + prévention RPS + actions terrain. Une seule licence, un accompagnement utile, des résultats concrets.",
    "hero.cta.contact": "Demander un devis",
    "hero.cta.demo": "Voir la démo",

    // Value props
    "value.measure.title": "Mesure QVCT simple",
    "value.measure.desc": "Un score clair (1–15), des tendances 7/30j, des signaux faibles détectés.",
    "value.prevention.title": "Prévention RPS",
    "value.prevention.desc": "Alertes bienveillantes + Export DUERP prêt pour vos obligations.",
    "value.actions.title": "Actions concrètes",
    "value.actions.desc": "Box utiles 100% Made in France, pour passer du discours à l'acte.",

    // Comment ça marche
    "how.step1.title": "Installez la licence",
    "how.step1.desc": "Espace sécurisé par entreprise. Onboardez vos équipes en quelques minutes.",
    "how.step2.title": "Mesurez & surveillez",
    "how.step2.desc": "Check-ins courts, indicateurs anonymisés, alertes automatiques.",
    "how.step3.title": "Agissez utile",
    "how.step3.desc": "Déployez des Box ciblées (en option) quand c'est pertinent — pas par défaut.",
    "how.title": "Comment ça marche ?",

    // Offre simplifiée
    "offer.title": "Notre Offre Complète",
    "offer.license.title": "Licence SaaS Entreprise",
    "offer.license.badge": "Populaire",
    "offer.license.point1": "Dashboard RH complet",
    "offer.license.point2": "Scores & tendances QVCT",
    "offer.license.point3": "Alertes RPS automatiques",
    "offer.license.point4": "Export DUERP (PDF/CSV)",
    "offer.license.point5": "Support inclus",
    "offer.license.cta": "Nous contacter",

    "offer.boxes.title": "Box QVT (à la demande)",
    "offer.boxes.badge": "Option",
    "offer.boxes.price": "39,90 €",
    "offer.boxes.unit": "HT / box",
    "offer.boxes.point1": "Produits français 100%",
    "offer.boxes.point2": "4 thématiques (alimentaire, hygiène, bien-être, surprise)",
    "offer.boxes.point3": "Livraison en entreprise",
    "offer.boxes.point4": "Personnalisation possible",
    "offer.boxes.cta": "Découvrir les box",

    "offer.boutique.title": "Boutique & Partenariats",
    "offer.boutique.badge": "Bientôt",
    "offer.boutique.point1": "Partenaires locaux vérifiés",
    "offer.boutique.point2": "Produits artisanaux",
    "offer.boutique.point3": "Accompagnement CSE",
    "offer.boutique.cta": "En savoir plus",

    // Demo
    "demo.title": "Licence Entreprise – Démo",
    "demo.description": "Chaque entreprise dispose de son propre espace sécurisé. Les RH peuvent ajouter leurs salariés, suivre les indicateurs QVT et recevoir des alertes.",
    "demo.no_individual": "QVT Box ne vend pas l'application aux particuliers.",
    "demo.cta": "Recevoir une démo de la licence",

    // Contact
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Parlons de vos besoins en qualité de vie au travail",
    "contact.form.name": "Nom",
    "contact.form.company": "Entreprise",
    "contact.form.email": "Email",
    "contact.form.phone": "Téléphone",
    "contact.form.employees": "Nombre d'employés",
    "contact.form.offer": "Type d'offre souhaitée",
    "contact.form.message": "Message",
    "contact.form.send": "Envoyer",
    
    // Footer CTA
    "cta.title": "Prêt à améliorer la QVT ?",
    "cta.description": "Parlons de votre projet. Démo gratuite, sans engagement.",
    "cta.button": "Demander une démo",

    // Boxes
    "boxes.title": "Nos Box Exceptionnelles",
    "boxes.subtitle": "Offrez à vos équipes un cadeau exceptionnel : une box française expédiée directement dans votre entreprise",
    "boxes.thematic": "Box Thématiques",
    "boxes.events": "Box Événementielles",
    "boxes.customization": "Options de Personnalisation",
    "boxes.cta.quote": "Demander un devis pour cette box",
    "boxes.cta.order": "Commander cette box",
    "boxes.cta.international": "Demander un devis international",

    // International
    "international.title": "QVT Box International",
    "international.subtitle": "L'excellence française exportée dans le monde entier",
    "international.hero.title": "Vos Équipes Internationales Méritent le Meilleur",
    "international.hero.description": "QVT Box étend son savoir-faire au-delà des frontières. Offrez à vos collaborateurs internationaux l'authenticité et la qualité des produits français, avec la même attention et le même professionnalisme.",

    // Pricing
    "pricing.title": "Tarifs Indicatifs",
    "pricing.subtitle": "Des solutions adaptées à tous les budgets et toutes les tailles d'entreprise",
  },
  en: {
    "nav.home": "Home",
    "nav.offer": "Our Offer",
    "nav.saas": "SaaS License",
    "nav.manifesto": "Manifesto",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.international": "International",
    "nav.quote": "Request Quote",
    "nav.dashboard": "My Dashboard",
    "nav.account": "My Account",

    // Main hero
    "hero.tagline": "« Get out of your bubble, we're watching over you »",
    "hero.description": "QVT Box combines QWL measurement + RPS prevention + field actions. One license, practical support, concrete results.",
    "hero.cta.contact": "Request a quote",
    "hero.cta.demo": "See demo",

    // Value props
    "value.measure.title": "Simple QWL Measurement",
    "value.measure.desc": "Clear score (1-15), 7/30-day trends, early warning signals detected.",
    "value.prevention.title": "RPS Prevention",
    "value.prevention.desc": "Caring alerts + Ready-made DUERP export for your compliance.",
    "value.actions.title": "Concrete Actions",
    "value.actions.desc": "Useful 100% Made in France boxes to move from talk to action.",

    // How it works
    "how.step1.title": "Install the license",
    "how.step1.desc": "Secure space per company. Onboard your teams in minutes.",
    "how.step2.title": "Measure & monitor",
    "how.step2.desc": "Short check-ins, anonymized indicators, automatic alerts.",
    "how.step3.title": "Act usefully",
    "how.step3.desc": "Deploy targeted boxes (optional) when relevant — not by default.",
    "how.title": "How does it work?",

    // Simplified offer
    "offer.title": "Our Complete Offer",
    "offer.license.title": "Enterprise SaaS License",
    "offer.license.badge": "Popular",
    "offer.license.point1": "Complete HR dashboard",
    "offer.license.point2": "QWL scores & trends",
    "offer.license.point3": "Automatic RPS alerts",
    "offer.license.point4": "DUERP Export (PDF/CSV)",
    "offer.license.point5": "Support included",
    "offer.license.cta": "Contact us",

    "offer.boxes.title": "QWL Boxes (on-demand)",
    "offer.boxes.badge": "Option",
    "offer.boxes.price": "€39.90",
    "offer.boxes.unit": "excl. VAT / box",
    "offer.boxes.point1": "100% French products",
    "offer.boxes.point2": "4 themes (food, hygiene, wellness, surprise)",
    "offer.boxes.point3": "Company delivery",
    "offer.boxes.point4": "Customization available",
    "offer.boxes.cta": "Discover boxes",

    "offer.boutique.title": "Shop & Partnerships",
    "offer.boutique.badge": "Coming soon",
    "offer.boutique.point1": "Verified local partners",
    "offer.boutique.point2": "Artisanal products",
    "offer.boutique.point3": "CSE support",
    "offer.boutique.cta": "Learn more",

    // Demo
    "demo.title": "Enterprise License – Demo",
    "demo.description": "Each company has its own secure space. HR can add employees, monitor QWL indicators and receive alerts.",
    "demo.no_individual": "QVT Box does not sell the application to individuals.",
    "demo.cta": "Get a license demo",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Let's talk about your workplace quality of life needs",
    "contact.form.name": "Name",
    "contact.form.company": "Company",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.employees": "Number of employees",
    "contact.form.offer": "Desired offer type",
    "contact.form.message": "Message",
    "contact.form.send": "Send",

    // Footer CTA
    "cta.title": "Ready to improve QWL?",
    "cta.description": "Let's talk about your project. Free demo, no commitment.",
    "cta.button": "Request a demo",

    // Boxes
    "boxes.title": "Our Exceptional Boxes",
    "boxes.subtitle": "Offer your teams an exceptional gift: a French box shipped directly to your company",
    "boxes.thematic": "Thematic Boxes",
    "boxes.events": "Event Boxes",
    "boxes.customization": "Customization Options",
    "boxes.cta.quote": "Request a quote for this box",
    "boxes.cta.order": "Order this box",
    "boxes.cta.international": "Request international quote",

    // International
    "international.title": "QVT Box International",
    "international.subtitle": "French excellence exported worldwide",
    "international.hero.title": "Your International Teams Deserve the Best",
    "international.hero.description": "QVT Box extends its expertise beyond borders. Offer your international colleagues the authenticity and quality of French products with the same attention and professionalism.",

    // Pricing
    "pricing.title": "Indicative Pricing",
    "pricing.subtitle": "Solutions adapted to all budgets and company sizes",
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
