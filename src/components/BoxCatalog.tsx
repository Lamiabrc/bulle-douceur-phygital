// src/components/BoxCatalog.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle, Gift, Star, Globe, Package } from "lucide-react";

// ✅ IMAGES (place-les dans /src/assets)
import boxFocus from "@/assets/box-bien-etre-anti-stress.webp";
import boxMobilite from "@/assets/box-mobilite-terrain.webp";
import boxPenibilite from "@/assets/box-penibilite-recuperation.webp";
import boxPAA from "@/assets/box-pouvoir-achat.webp";

import imgRetraite from "@/assets/box-evenement-retraite.webp";
import imgNaissance from "@/assets/box-evenement-naissance.webp";
import imgAnniversaire from "@/assets/box-evenement-anniversaire.webp";
import imgPromotion from "@/assets/box-evenement-promotion.webp";
import imgMariage from "@/assets/box-evenement-mariage.webp";

import madeInFranceBadge from "@/assets/label-made-in-france-badge.svg";

const BoxCatalog = () => {
  const [catalogRef, catalogVisible] = useScrollReveal();

  // -------------------- BOX THÉMATIQUES --------------------
  const thematicBoxes = [
    {
      name: "Focus & Reset",
      price: "29,90 €",
      description: "Concentration, gestion du stress et clarté mentale",
      image: boxFocus,
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
      description: "Soutien pour les salariés nomades et terrain",
      image: boxMobilite,
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
      description: "Récupération après effort, soulagement des tensions",
      image: boxPenibilite,
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
    {
      name: "Pouvoir d’Achat",
      price: "34,90 €",
      description: "Produits utiles du quotidien & coups de pouce",
      image: boxPAA,
      contents: [
        "Sélection de produits du quotidien",
        "Gourmandises artisanales locales",
        "Carnet astuces budget",
        "Bon/coupon symbolique (option)",
        "Carte message entreprise",
      ],
      benefits: ["Concret et utile", "Valeur perçue forte", "Made in France"],
      madeInFrance: true,
      customizable: true,
      premium: false,
    },
  ];

  // -------------------- BOX ÉVÉNEMENTIELLES --------------------
  const eventBoxes = [
    {
      name: "Box Retraite",
      price: "59,90 €",
      description: "Célébrer une carrière et souhaiter le meilleur",
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
      description: "Partager la joie d'une nouvelle vie",
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
      description: "Marquer une date importante",
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
      description: "Célébrer les succès et évolutions",
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
      description: "Partager les moments de bonheur",
      image: imgMariage,
      contents: [
        "Chocolats fins & bougie",
        "Thé/infusion premium",
        "Carte de vœux",
        "Présentation élégante",
      ],
    },
  ];

  const customizationOptions = [
    {
      title: "Personnalisation Complète",
      description: "Logo entreprise, couleurs, message personnalisé",
      icon: Star,
    },
    {
      title: "Produits Locaux",
      description: "Sélection de producteurs de votre région",
      icon: Package,
    },
    {
      title: "Quantités Flexibles",
      description: "De 10 à 1000+ box selon vos besoins",
      icon: Package,
    },
    {
      title: "Livraison Internationale",
      description: "Expédition partout dans le monde",
      icon: Globe,
    },
  ];

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
            Offrez à vos équipes un cadeau exceptionnel : une box française expédiée directement
            dans votre entreprise. Conçues pour marquer les moments importants, une à deux fois par an.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl px-4 py-2">
            <img
              src={madeInFranceBadge}
              alt="Made in France"
              className="h-5 w-5"
              loading="lazy"
              decoding="async"
              width={20}
              height={20}
            />
            <p className="text-sm font-semibold text-foreground">
              100% Made in France • Artisanat Local • Impact Mesurable
            </p>
          </div>
        </div>

        {/* ---------- Thématiques ---------- */}
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
                    {"madeInFrance" in box && (box as any).madeInFrance && (
                      <Badge className="bg-primary text-white inline-flex items-center gap-1">
                        <img
                          src={madeInFranceBadge}
                          alt="Made in France"
                          className="h-4 w-4"
                          loading="lazy"
                          decoding="async"
                          width={16}
                          height={16}
                        />
                        Made in France
                      </Badge>
                    )}
                    {"customizable" in box && (box as any).customizable && (
                      <Badge variant="outline" className="bg-white/90">Personnalisable</Badge>
                    )}
                    {"premium" in box && (box as any).premium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">Premium</Badge>
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
                  {"contents" in box && (
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2 text-foreground">Contenu de la box :</h5>
                      <div className="grid gap-2">
                        {(box as any).contents.map((item: string) => (
                          <div key={item} className="flex items-center text-sm text-foreground/70">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {"benefits" in box && (
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2 text-foreground">Bénéfices :</h5>
                      <div className="flex flex-wrap gap-2">
                        {(box as any).benefits.map((benefit: string) => (
                          <Badge key={benefit} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

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

                  {"contents" in box && (
                    <div className="mb-4">
                      <div className="grid gap-1">
                        {(box as any).contents.map((item: string) => (
                          <div key={item} className="flex items-center text-xs text-foreground/60">
                            <Gift className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/contact">Commander cette box</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ---------- Personnalisation ---------- */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter">
            Options de <span className="text-primary">Personnalisation</span>
          </h3>

          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {customizationOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card key={option.title} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{option.title}</h4>
                    <p className="text-foreground/70 text-sm">{option.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <h4 className="text-2xl font-bold text-foreground mb-4">Cadeau Exceptionnel International</h4>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
              Offrez l'excellence française à vos équipes internationales. Nos box sont expédiées
              dans le monde entier avec le même niveau de qualité et d'attention.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
            >
              <Link to="/contact">
                <Globe className="w-5 h-5 mr-2" />
                Demander un devis international
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxCatalog;
