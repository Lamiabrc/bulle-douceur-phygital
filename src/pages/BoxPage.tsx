import React, { useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Package,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Shield,
  Wrench,
  Award,
  Heart,
  Gift,
  Truck,
  Clock,
  Euro,
  RefreshCw,
  Phone,
  FileCheck,
  Star,
  HelpCircle,
} from "lucide-react";

import qvtBoxImage from "@/assets/qvt-box-products.jpg";
import professionalTeam from "@/assets/professional-team-meeting.jpg";

import imgAlimentaire from "@/assets/products-alimentaire.jpg";
import imgHygiene from "@/assets/products-hygiene.jpg";
import imgCosmetique from "@/assets/products-cosmetique.jpg";
import imgSurprise from "@/assets/products-surprise.jpg";

const FEATURED_BOX = {
  name: "Box Pouvoir d'Achat",
  subtitle: "La box standard, personnalisée par les salariés, à recevoir chaque mois",
  description:
    "Un petit coup de pouce au budget avec des essentiels utiles 100% français, choisis par vos équipes selon leurs priorités.",
  price: "À partir de 29€ / mois",
  contents: [
    "Essentiels du quotidien Made in France",
    "Avantages/partenariats locaux",
    "Astuces budget & organisation",
    "Produit surprise de terroir",
  ],
  detailedFeatures: [
    "4 à 6 produits français par box selon préférences",
    "Valeur réelle: 45-60€ de produits",
    "Livraison incluse partout en France",
    "Personnalisation via questionnaire mensuel",
    "Accès plateforme d'avantages partenaires",
    "Newsletter mensuelle avec astuces économies",
  ],
  badge: "Standard mensuelle",
  icon: Gift,
} as const;

const GUARANTEES = [
  {
    icon: Shield,
    title: "100% Made in France",
    description: "Tous nos produits sont sourcés auprès d'artisans et producteurs français certifiés",
  },
  {
    icon: FileCheck,
    title: "Conformité URSSAF",
    description: "Solutions parfaitement conformes à la réglementation sociale et fiscale en vigueur",
  },
  {
    icon: Star,
    title: "Satisfaction garantie",
    description: "Engagement qualité avec possibilité d'échange si un produit ne convient pas",
  },
  {
    icon: RefreshCw,
    title: "Flexibilité totale",
    description: "Modification ou annulation de l'abonnement possible à tout moment sans frais",
  },
] as const;

const SUBSCRIPTION_OPTIONS = [
  {
    name: "Engagement 12 mois",
    price: "29€/mois",
    saving: "Économie de 18%",
    features: ["Meilleur tarif", "Livraison prioritaire", "Support dédié", "Accès plateforme illimité"],
  },
  {
    name: "Engagement 6 mois",
    price: "32€/mois",
    saving: "Économie de 10%",
    features: ["Tarif avantageux", "Livraison standard", "Support email", "Accès plateforme"],
  },
  {
    name: "Sans engagement",
    price: "35€/mois",
    saving: "Flexible",
    features: ["Stop à tout moment", "Livraison standard", "Support email", "Accès plateforme"],
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne la personnalisation ?",
    answer: "Chaque mois, vos salariés reçoivent un questionnaire leur permettant d'indiquer leurs préférences parmi différentes catégories (alimentaire, hygiène, cosmétique, etc.). Nous composons ensuite les box en fonction des choix majoritaires de votre équipe.",
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "Les box sont expédiées entre le 1er et le 10 de chaque mois. La livraison prend 2-4 jours ouvrés en France métropolitaine. Pour les DOM-TOM, prévoir 5-8 jours ouvrés.",
  },
  {
    question: "Puis-je commander pour une équipe en télétravail ?",
    answer: "Absolument ! Nous pouvons livrer directement au domicile de chaque collaborateur ou regrouper les envois sur plusieurs sites. Contactez-nous pour organiser la logistique adaptée à votre organisation.",
  },
  {
    question: "Les box sont-elles conformes aux règles URSSAF ?",
    answer: "Oui, nos solutions sont parfaitement conformes à la réglementation en vigueur. Nous fournissons tous les justificatifs nécessaires pour votre comptabilité et vos déclarations sociales.",
  },
  {
    question: "Peut-on essayer avant de s'engager ?",
    answer: "Oui ! Nous proposons une box découverte au tarif unique de 35€ pour tester le concept avec votre équipe avant de souscrire un abonnement.",
  },
  {
    question: "Proposez-vous des box pour les grandes entreprises ?",
    answer: "Oui, nous accompagnons des entreprises de 10 à 1000+ salariés. Pour les grandes structures, nous proposons des tarifs dégressifs et un accompagnement dédié.",
  },
] as const;

const THEMATIC_BOXES = [
  {
    name: "Box Focus & Performance",
    description:
      "Solutions pour améliorer la concentration et réduire le stress professionnel",
    price: "À partir de 45€",
    contents: [
      "Produits ergonomiques français",
      "Guide ANACT bien-être",
      "Outils anti-stress certifiés",
      "Accompagnement personnalisé",
    ],
    icon: Shield,
    compliance: "Conforme aux recommandations INRS",
  },
  {
    name: "Box Mobilité & Ergonomie",
    description: "Prévention des TMS et amélioration des conditions de travail",
    price: "À partir de 55€",
    contents: [
      "Accessoires ergonomiques",
      "Programme d'exercices validé",
      "Conseils posturaux INRS",
      "Suivi personnalisé",
    ],
    icon: Wrench,
    compliance: "Validé par des kinésithérapeutes",
  },
  {
    name: "Box Pénibilité & Récupération",
    description: "Solutions pour soulager la pénibilité physique au travail",
    price: "À partir de 65€",
    contents: [
      "Produits de récupération bio",
      "Protocoles de soulagement",
      "Guide prévention TMS",
      "Coaching bien-être",
    ],
    icon: Heart,
    compliance: "Produits certifiés biologiques",
  },
  {
    name: "Box Cohésion & Reconnaissance",
    description: "Renforcement du lien social et valorisation des équipes",
    price: "À partir de 40€",
    contents: [
      "Activités team-building",
      "Outils de reconnaissance",
      "Guide management bienveillant",
      "Rituels d'équipe",
    ],
    icon: Award,
    compliance: "Basé sur les pratiques ANACT",
  },
] as const;

const EVENT_BOXES = [
  {
    event: "Départ à la retraite",
    description: "Accompagnement bienveillant pour cette transition de vie",
    icon: Gift,
    customization: "Personnalisable selon les goûts et l'histoire professionnelle",
  },
  {
    event: "Naissance / Adoption",
    description: "Félicitations et soutien pour les nouveaux parents",
    icon: Heart,
    customization: "Produits pour bébé français et conseils parentalité",
  },
  {
    event: "Promotion / Évolution",
    description: "Reconnaissance des efforts et accompagnement du changement",
    icon: Award,
    customization: "Adapté au nouveau poste et aux défis à venir",
  },
  {
    event: "Anniversaire entreprise",
    description: "Célébration de l'ancienneté et fidélisation",
    icon: Calendar,
    customization: "Rétrospective personnalisée et cadeaux adaptés",
  },
] as const;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Diagnostic participatif",
    description:
      "Les salariés expriment leurs besoins via notre outil d'évaluation anonyme",
  },
  {
    step: "02",
    title: "Co-construction des box",
    description:
      "Sélection collaborative des produits selon les priorités identifiées",
  },
  {
    step: "03",
    title: "Livraison et suivi",
    description:
      "Distribution sur site avec accompagnement et mesure d'impact",
  },
] as const;

const NewBoxPage: React.FC = () => {
  const [heroRef, heroVisible] = useScrollReveal();
  const [boxesRef, boxesVisible] = useStaggeredReveal(5, 200);
  const [processRef, processVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "Product",
          position: 1,
          name: FEATURED_BOX.name,
          description: FEATURED_BOX.description,
          brand: { "@type": "Brand", name: "QVT Box" },
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: FEATURED_BOX.price.replace(/[^0-9]/g, ""),
            availability: "https://schema.org/InStock",
          },
        },
        ...THEMATIC_BOXES.map((b, i) => ({
          "@type": "Product",
          position: i + 2,
          name: b.name,
          description: b.description,
          brand: { "@type": "Brand", name: "QVT Box" },
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: b.price.replace(/[^0-9]/g, ""),
            availability: "https://schema.org/PreOrder",
          },
        })),
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Box QVT – Pouvoir d'Achat (standard) & Thématiques | QVT Box"
        description="La Box Pouvoir d'Achat, standard mensuelle co-personnalisée par les salariés, et nos box thématiques ergonomie, pénibilité, cohésion."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      {/* Hero */}
      <section
        className={`pt-24 pb-16 px-6 bg-gradient-hero scroll-reveal ${
          heroVisible ? "visible" : ""
        }`}
        ref={heroRef}
        aria-labelledby="box-hero-title"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-8 h-8 text-primary" aria-hidden="true" />
                <Badge variant="outline">Solution QVT certifiée</Badge>
              </div>

              <h1
                id="box-hero-title"
                className="text-4xl md:text-6xl font-bold text-foreground mb-3 font-inter"
              >
                Box <span className="text-primary">Thématiques & Événementielles</span>
              </h1>
              <p className="text-primary/90 font-medium mb-6">
                + <strong>Box Pouvoir d'Achat</strong> — la box standard mensuelle
                personnalisée par les salariés
              </p>

              <div className="card-professional p-6 mb-8">
                <p className="text-lg text-foreground leading-relaxed font-lato mb-4">
                  <span className="text-primary font-medium">
                    Nos box sont co-construites avec les salariés, conformément aux
                    recommandations de l'ANACT sur la participation et le dialogue social.
                  </span>
                </p>
                <p className="text-foreground/70 font-lato">
                  Une approche participative qui garantit l'adhésion des équipes et l'utilité
                  immédiate des solutions proposées.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-primary text-lg px-8 py-4 font-inter">
                  <Link to="/boutique?preselect=pouvoir-achat" aria-label="Commander la Box Pouvoir d'Achat">
                    Commander la Box Pouvoir d'Achat
                  </Link>
                </Button>
                <Button asChild variant="outline" className="text-lg px-8 py-4 font-inter">
                  <Link to="/auth" aria-label="Évaluer mes besoins">
                    Évaluer mes besoins
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={qvtBoxImage}
                alt="Produits QVT Box professionnels"
                className="rounded-lg shadow-floating w-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 px-6 bg-gradient-to-b from-secondary/5 to-transparent" aria-labelledby="guarantees-title">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 id="guarantees-title" className="text-3xl font-bold text-foreground mb-3 font-inter">
              Nos <span className="text-primary">garanties</span>
            </h2>
            <p className="text-foreground/70 font-lato">Qualité, conformité et transparence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUARANTEES.map((g) => {
              const Icon = g.icon;
              return (
                <Card key={g.title} className="card-professional text-center p-6">
                  <CardContent className="space-y-3">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg font-inter">{g.title}</h3>
                    <p className="text-sm text-foreground/70 font-lato">{g.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mise en avant */}
      <section id="featured" className="py-10 px-6 bg-background" aria-labelledby="featured-title">
        <div className="container mx-auto">
          <h2 id="featured-title" className="sr-only">
            Box standard mise en avant
          </h2>
          <Card className="card-professional ring-2 ring-secondary">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start gap-6 justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-secondary text-white">{FEATURED_BOX.badge}</Badge>
                    <span className="text-secondary font-medium">Abonnement mensuel</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{FEATURED_BOX.name}</h3>
                  <p className="text-foreground/70 mb-4">{FEATURED_BOX.subtitle}</p>
                  <p className="text-foreground/80 mb-6">{FEATURED_BOX.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-foreground">Contenu mensuel :</h4>
                    <div className="grid sm:grid-cols-2 gap-2 mb-4">
                      {FEATURED_BOX.contents.map((c) => (
                        <div key={c} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-secondary mt-0.5" aria-hidden="true" />
                          {c}
                        </div>
                      ))}
                    </div>
                    <details className="mt-4">
                      <summary className="cursor-pointer text-primary font-medium text-sm hover:underline">
                        Voir les détails complets →
                      </summary>
                      <ul className="mt-3 space-y-2 pl-4">
                        {FEATURED_BOX.detailedFeatures.map((f) => (
                          <li key={f} className="text-sm text-foreground/70 list-disc">{f}</li>
                        ))}
                      </ul>
                    </details>
                  </div>

                  <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
                    aria-label="Aperçu du contenu typique"
                  >
                    {[
                      { label: "Alimentaire", img: imgAlimentaire },
                      { label: "Hygiène", img: imgHygiene },
                      { label: "Cosmétique", img: imgCosmetique },
                      { label: "Surprise", img: imgSurprise },
                    ].map(({ label, img }) => (
                      <figure key={label} className="rounded-lg overflow-hidden border">
                        <img
                          src={img}
                          alt={`${label} – sélection Made in France`}
                          className="w-full h-28 object-cover"
                          loading="lazy"
                        />
                        <figcaption className="px-2 py-1 text-sm text-foreground/70">{label}</figcaption>
                      </figure>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary">{FEATURED_BOX.price}</div>
                    <Button asChild className="btn-secondary">
                      <Link to="/boutique?preselect=pouvoir-achat">Choisir cette box</Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-full bg-secondary/10">
                  <FEATURED_BOX.icon className="w-12 h-12 text-secondary" aria-hidden="true" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Box Thématiques */}
      <section className="py-20 px-6 section-professional" ref={boxesRef} aria-labelledby="thematic-title">
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${boxesVisible.has(0) ? "visible" : ""}`}>
            <h2 id="thematic-title" className="text-4xl font-bold text-foreground mb-6 font-inter">
              Box <span className="text-secondary">Thématiques</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Solutions ciblées pour répondre aux défis identifiés par les études DARES et INRS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {THEMATIC_BOXES.map((box, index) => {
              const IconComponent = box.icon;
              return (
                <Card
                  key={box.name}
                  className={`card-professional overflow-hidden card-hover stagger-item ${
                    boxesVisible.has(index + 1) ? "visible" : ""
                  }`}
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent className="w-10 h-10 text-primary" aria-hidden="true" />
                      {box.compliance && (
                        <Badge variant="outline" className="text-xs">
                          {box.compliance}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-inter text-foreground" itemProp="name">
                      {box.name}
                    </CardTitle>
                    <p className="text-foreground/70 font-lato" itemProp="description">
                      {box.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div
                        className="text-2xl font-bold text-primary font-inter"
                        itemProp="offers"
                        itemScope
                        itemType="https://schema.org/Offer"
                      >
                        <meta itemProp="priceCurrency" content="EUR" />
                        <span itemProp="price" content={box.price.replace(/[^0-9]/g, "")}>
                          {box.price}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 font-inter">Contenu de la box :</h4>
                        <ul className="space-y-1">
                          {box.contents.map((item) => (
                            <li key={`${box.name}-${item}`} className="flex items-start gap-2 text-sm font-lato">
                              <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild className="w-full btn-outline button-hover" aria-label={`Personnaliser la ${box.name}`}>
                        <Link to="/contact">Personnaliser cette box</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Box Événementielles */}
      <section className="py-20 px-6 bg-background" aria-labelledby="event-title">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="event-title" className="text-4xl font-bold text-foreground mb-6 font-inter">
              Box <span className="text-primary">Événementielles</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Marquer les moments importants de la vie professionnelle avec bienveillance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {EVENT_BOXES.map((eventBox) => {
              const IconComponent = eventBox.icon;
              return (
                <Card key={eventBox.event} className="card-professional p-6 text-center">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg font-inter">{eventBox.event}</h3>
                    <p className="text-sm text-foreground/70 font-lato">{eventBox.description}</p>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-primary font-medium font-lato">{eventBox.customization}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Options d'abonnement */}
      <section className="py-16 px-6 bg-gradient-to-b from-primary/5 to-transparent" aria-labelledby="subscription-title">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 id="subscription-title" className="text-3xl font-bold text-foreground mb-3 font-inter">
              Formules d'<span className="text-primary">abonnement</span>
            </h2>
            <p className="text-foreground/70 font-lato max-w-2xl mx-auto">
              Choisissez la formule adaptée à votre budget et vos besoins
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SUBSCRIPTION_OPTIONS.map((option, idx) => (
              <Card key={option.name} className={`card-professional ${idx === 0 ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-6">
                  {idx === 0 && (
                    <Badge className="mb-3 bg-primary text-white">Le plus populaire</Badge>
                  )}
                  <h3 className="text-xl font-bold mb-2 font-inter">{option.name}</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{option.price}</span>
                      <span className="text-sm text-foreground/60">par salarié</span>
                    </div>
                    <Badge variant="outline" className="mt-2">{option.saving}</Badge>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {option.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={idx === 0 ? 'w-full btn-primary' : 'w-full btn-outline'}>
                    <Link to="/contact">Choisir cette formule</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/60 font-lato">
              💡 <strong>Besoin d'une solution sur-mesure ?</strong>{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contactez-nous
              </Link>{" "}
              pour un devis personnalisé
            </p>
          </div>
        </div>
      </section>

      {/* Livraison et support */}
      <section className="py-16 px-6 bg-background" aria-labelledby="logistics-title">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 id="logistics-title" className="text-3xl font-bold text-foreground mb-3 font-inter">
              Livraison & <span className="text-secondary">accompagnement</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-professional text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">Livraison flexible</h3>
                <p className="text-sm text-foreground/70 font-lato">
                  Sur site, au domicile ou en point relais. Livraison gratuite dès 10 box.
                </p>
              </CardContent>
            </Card>
            <Card className="card-professional text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">Délais garantis</h3>
                <p className="text-sm text-foreground/70 font-lato">
                  Expédition entre le 1er et 10 du mois. Livraison en 2-4 jours ouvrés.
                </p>
              </CardContent>
            </Card>
            <Card className="card-professional text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">Support réactif</h3>
                <p className="text-sm text-foreground/70 font-lato">
                  Équipe dédiée disponible par email, téléphone et chat du lundi au vendredi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Processus participatif */}
      <section className="py-20 px-6 section-professional" ref={processRef} aria-labelledby="process-title">
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${processVisible ? "visible" : ""}`}>
            <h2 id="process-title" className="text-4xl font-bold text-foreground mb-6 font-inter">
              Un processus <span className="text-secondary">clair et participatif</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Conformément aux recommandations ANACT : participation, dialogue social et co-construction
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.step} className="flex items-center gap-8 mb-12 last:mb-0">
                <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold font-inter">
                  {step.step}
                </div>

                <div className="flex-1 card-professional p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-inter">{step.title}</h3>
                  <p className="text-foreground/70 font-lato leading-relaxed">{step.description}</p>
                </div>

                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block" aria-hidden="true">
                    <ArrowRight className="w-8 h-8 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="py-16 px-6 bg-background" aria-labelledby="testimonial-title">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={professionalTeam}
              alt="Équipe professionnelle en réunion QVT"
              className="rounded-lg shadow-floating object-cover w-full h-96"
              loading="lazy"
            />

            <div className="space-y-6">
              <div className="card-professional p-8">
                <h3 id="testimonial-title" className="sr-only">
                  Témoignage client
                </h3>
                <blockquote className="text-lg italic text-foreground/80 mb-6 font-lato">
                  "La démarche participative de QVT Box a transformé notre approche du bien-être au travail.
                  Les salariés se sentent écoutés et les box répondent vraiment à leurs besoins quotidiens."
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground font-inter">Catherine Moreau</p>
                  <p className="text-sm text-foreground/60 font-lato">DRH, TechnoServices (320 salariés)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-background" aria-labelledby="faq-title">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 id="faq-title" className="text-3xl font-bold text-foreground mb-3 font-inter">
              Questions <span className="text-primary">fréquentes</span>
            </h2>
            <p className="text-foreground/70 font-lato">Tout ce que vous devez savoir sur nos box</p>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <Card key={idx} className="card-professional">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex items-start gap-3 cursor-pointer list-none">
                      <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg font-inter group-open:text-primary transition-colors">
                          {item.question}
                        </h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-foreground/40 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="mt-4 pl-8 text-foreground/70 font-lato leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-foreground/70 font-lato mb-4">
              Vous avez d'autres questions ?
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Contactez notre équipe
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 px-6 bg-primary scroll-reveal-scale ${ctaVisible ? "visible" : ""}`} ref={ctaRef} aria-labelledby="cta-title">
        <div className="container mx-auto text-center">
          <h2 id="cta-title" className="text-4xl font-bold text-white mb-6 font-inter">
            Prêt à co-construire avec vos équipes ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto font-lato">
            Lancez une démarche participative alignée avec les recommandations ANACT et offrez des solutions concrètes à vos collaborateurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-inter button-hover">
              <Link to="/auth">
                <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                Commencer l'évaluation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-inter button-hover">
              <Link to="/contact">Demander une présentation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewBoxPage;
