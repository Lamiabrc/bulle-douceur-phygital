// src/components/BoxCatalog.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle, Gift, Star, Globe, Package } from "lucide-react";

// ------------------------------------
// ✅ IMPORTS IMAGES (assure-toi qu'elles existent)
// Thématiques
import imgPAA from "@/assets/box-pouvoir-achat.webp";                  // Pouvoir d’Achat (TOP de page)
import imgFocus from "@/assets/box-bien-etre-anti-stress.webp";        // Focus & Reset
import imgMobilite from "@/assets/box-mobilite-terrain.webp";          // Mobilité & Terrain
import imgPenibilite from "@/assets/box-penibilite-recuperation.webp"; // Pénibilité & Récupération

// Événementielles
import imgRetraite from "@/assets/box-evenement-retraite.webp";
import imgNaissance from "@/assets/box-evenement-naissance.webp";
import imgAnniversaire from "@/assets/box-evenement-anniversaire.webp";
import imgPromotion from "@/assets/box-evenement-promotion.webp";
import imgMariage from "@/assets/box-evenement-mariage.webp";

// Export (section dédiée tout en bas)
import imgExport from "@/assets/box-premium-export-packaging.webp";
// ------------------------------------

const BoxCatalog = () => {
  const [catalogRef, catalogVisible] = useScrollReveal();

  // -------------------- BOX THÉMATIQUES (Pouvoir d'Achat en premier) --------------------
  const thematicBoxes = [
    {
      name: "Pouvoir d’Achat",
      price: "34,90 €",
      description: "Produits utiles du quotidien & coups de pouce concrets pour vos équipes.",
      image: imgPAA,
      contents: [
        "Sélection de produits du quotidien",
        "Gourmandises artisanales locales",
        "Carnet astuces budget",
        "Bon/coupon symbolique (option)",
        "Carte message entreprise",
      ],
      benefits: ["Concret et utile", "Valeur perçue forte", "100% Made in France"],
      madeInFrance: true,
      customizable: true,
      premium: false,
    },
    {
      name: "Focus & Reset",
      price: "29,90 €",
      description: "Concentration, gestion du stress et clarté mentale.",
      image: imgFocus,
      contents: [
        "Carnet & stylo éco-conçu",
        "Tisane bio relax premium",
        "Balle anti-stress naturelle",
        "Spray anti-fatigue aux huiles essentielles",
        "Carte rituel focus personnalisée",
      ],
      benefits: ["Améliore la concentration", "Réduit le stress", "Favorise la détente"],
      madeInFrance: true,
      customizable: true,
    },
    {
      name: "Mobilité & Terrain",
      price: "34,90 €",
      description: "Soutien pour les salariés nomades et sur le terrain.",
      image: imgMobilite,
      contents: [
        "Gourde/mug isotherme français",
        "Lingettes biodégradables",
        "Snack sain et énergétique",
        "Crème mains protection",
        "Carte pause mobilité",
      ],
      benefits: ["Confort en déplacement", "Hydratation optimale", "Protection cutanée"],
      madeInFrance: true,
      customizable: true,
    },
    {
      name: "Pénibilité & Récupération",
      price: "34,90 €",
      description: "Récupération après effort, soulagement des tensions.",
      image: imgPenibilite,
      contents: [
        "Patch chauffant naturel",
        "Crème articulations & muscles",
        "Infusion détente bio",
        "Balle de massage ergonomique",
        "Carte rituel récupération",
      ],
      benefits: ["Soulage les tensions", "Accélère la récupération", "Détente musculaire"],
      madeInFrance: true,
      customizable: true,
    },
  ] as const;

  // -------------------- BOX ÉVÉNEMENTIELLES (chacune sa propre image) --------------------
  const eventBoxes = [
    {
      name: "Box Retraite",
      price: "59,90 €",
      description: "Célébrer une carrière et souhaiter le meilleur.",
      image: imgRetraite,
      contents: [
        "Livre d'or personnalisé",
        "Douceurs artisanales françaises",
        "Carte de remerciements",
        "Souvenir gravé",
        "Coffret présentation premium",
      ],
    },
    {
      name: "Box Naissance",
      price: "49,90 €",
      description: "Partager la joie d'une nouvelle vie.",
      image: imgNaissance,
      contents: [
        "Produits bio pour bébé",
        "Carte félicitations",
        "Cadeau symbolique",
        "Douceurs pour les parents",
      ],
    },
    {
      name: "Box Anniversaire",
      price: "39,90 €",
      description: "Marquer une date importante avec élégance.",
      image: imgAnniversaire,
      contents: [
        "Friandises artisanales",
        "Carte personnalisée",
        "Petit cadeau surprise",
        "Emballage festif",
      ],
    },
    {
      name: "Box Promotion/Réussite",
      price: "49,90 €",
      description: "Célébrer les succès et évolutions.",
      image: imgPromotion,
      contents: [
        "Accessoire professionnel",
        "Produit bien-être",
        "Carte de félicitations",
        "Symbole de réussite",
      ],
    },
    {
      name: "Box Mariage/Événement",
      price: "59,90 €",
      description: "Partager les moments de bonheur avec raffinement.",
      image: imgMariage,
      contents: [
        "Chocolats fins & bougie",
        "Thé/infusion premium",
        "Carte de vœux",
        "Présentation élégante",
      ],
    },
  ] as const;

  const customizationOptions = [
    {
      title: "Personnalisation Complète",
      description: "Logo entreprise, couleurs, message personnalisé.",
      icon: Star,
    },
    {
      title: "Produits Locaux",
      description: "Sélection de producteurs de votre région.",
      icon: Package,
    },
    {
      title: "Quantités Flexibles",
      description: "De 10 à 1000+ box selon vos besoins.",
      icon: Package,
    },
    {
      title: "Livraison Internationale",
      description: "Expédition partout dans le monde.",
      icon: Globe,
    },
  ] as const;

  return (
    <section
      className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-secondary/10"
      ref={catalogRef}
    >
      <div className="container mx-auto">
        <div className={`text-center mb-16 scroll-reveal ${catalogVisible ? "visible" : ""}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
            Nos <span className="text-primary">Box Exceptionnelles</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato mb-8 leading-relaxed">
            Offrez à vos équipes un cadeau d’impact : des box utiles, 100% Made in France, envoyées au bon moment.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl px-4 py-2">
            <span role="img" aria-label="Made in France">🇫🇷</span>
            <p className="text-sm font-semibold text-foreground">
              100% Made in France • Artisanat Local • Impact Mesurable
            </p>
          </div>
        </div>

        {/* ---------- Thématiques (PAA en premier) ---------- */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter">
            Box <span className="text-primary">Thématiques</span>
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {thematicBoxes.map((box) => (
              <Card
                key={box.name}
                className="card-professional overflow-hidden hover:shadow-floating transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={box.image}
                    alt={`Box ${box.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={240}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary text-white inline-flex items-center gap-1">
                      <span role="img" aria-label="Made in France">🇫🇷</span>
                      Made in France
                    </Badge>
                    {box.customizable && (
                      <Badge variant="outline" className="bg-white/90">
                        Personnalisable
                      </Badge>
                    )}
                    {"premium" in box && (box as any).premium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                        Premium
                      </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-xl font-bold text-white mb-1">{box.name}</h4>
                    <p className="text-white/80 text-sm">{box.description}</p>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 px-3 py-1 rounded-full">
                      <span className="font-bold text-primary">{box.price}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2 text-foreground">Contenu de la box :</h5>
                    <div className="grid gap-2">
                      {box.contents.map((item) => (
                        <div key={item} className="flex items-center text-sm text-foreground/70">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold mb-2 text-foreground">Bénéfices :</h5>
                    <div className="flex flex-wrap gap-2">
                      {box.benefits.map((benefit) => (
                        <Badge key={benefit} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link to="/contact">Demander un devis pour cette box</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ---------- Événementielles ---------- */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter">
            Box <span className="text-secondary">Événementielles</span>
          </h3>
        <div className="grid lg:grid-cols-3 gap-6">
            {eventBoxes.map((box) => (
              <Card
                key={box.name}
                className="card-professional text-center hover:shadow-floating transition-all duration-300 group"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={box.image}
                    alt={box.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={128}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-white/90 px-2 py-1 rounded">
                      <span className="font-bold text-secondary text-sm">{box.price}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h4 className="font-bold text-lg text-foreground mb-2">{box.name}</h4>
                  <p className="text-foreground/70 text-sm mb-4">{box.description}</p>

                  <div className="mb-4">
                    <div className="grid gap-1">
                      {box.contents.map((item) => (
                        <div key={item} className="flex items-center text-xs text-foreground/60">
                          <Gift className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/contact">Commander cette box</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ---------- SECTION EXPORT (TOUT EN BAS) ---------- */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-6 font-inter">
            Box <span className="text-secondary">Premium Export</span>
          </h3>
          <p className="text-center text-foreground/80 max-w-3xl mx-auto mb-10">
            Nous livrons **dans le monde entier** des <strong>box cadeaux salariés 100% Made in France</strong>, avec un
            **impact salarié luxueux et unique**. Packaging renforcé, formalités douanières simplifiées, et suivi
            de livraison pour une expérience sans friction.
          </p>

          <Card className="card-professional overflow-hidden hover:shadow-floating transition-all duration-300 group max-w-5xl mx-auto">
            <div className="relative h-64 overflow-hidden">
              <img
                src={imgExport}
                alt="Box Premium Export — packaging renforcé et expédition internationale"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width={1600}
                height={320}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">Premium</Badge>
                <Badge className="bg-primary text-white inline-flex items-center gap-1">
                  <span role="img" aria-label="Made in France">🇫🇷</span>
                  Made in France
                </Badge>
                <Badge variant="outline" className="bg-white/90">International</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-2xl font-bold text-white mb-2">Cadeau salarié haut de gamme, partout dans le monde</h4>
                <p className="text-white/85 text-sm">
                  Produits premium, message personnalisé multilingue, option tracking & preuve de livraison.
                </p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-2 text-foreground">Contenu premium :</h5>
                  <div className="grid gap-2">
                    {[
                      "Sélection premium (bien-être + gourmandises)",
                      "Protection colis renforcée",
                      "Message personnalisé multilingue",
                      "Finitions soignées (sceau, ruban, papier de soie)",
                    ].map((item) => (
                      <div key={item} className="flex items-center text-sm text-foreground/70">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-foreground">Atouts logistiques :</h5>
                  <div className="grid gap-2">
                    {[
                      "Étiquette douane & conformité",
                      "Options de suivi & preuve de livraison",
                      "Réseau export multi-pays / multi-sites",
                      "Service client dédié",
                    ].map((item) => (
                      <div key={item} className="flex items-center text-sm text-foreground/70">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild size="lg" className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap">
                  <Link to="/contact">
                    <Globe className="w-5 h-5" />
                    Demander un devis Export (monde entier)
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BoxCatalog;
