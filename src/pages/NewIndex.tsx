// src/pages/NewIndex.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BoxCatalog from "@/components/BoxCatalog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";

// ✅ Only use images that EXIST in /src/assets
import heroImage from "@/assets/hero-workplace-team.jpg";// src/pages/NewIndex.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BoxCatalog from "@/components/BoxCatalog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";

// ✅ Only use images that EXIST in /src/assets
import heroImage from "@/assets/hero-workplace-team.jpg";
import saasImage from "@/assets/saas-dashboard-pro.jpg";

import { Phone, BarChart3, CheckCircle, Euro } from "lucide-react";

const NewIndex = () => {
  const { t } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [offerRef, offerVisible] = useStaggeredReveal(3, 200);
  const [demoRef, demoVisible] = useScrollReveal();
  const [pricingRef, pricingVisible] = useStaggeredReveal(3, 150);
  const [testimonialsRef, testimonialsVisible] = useStaggeredReveal(3, 200);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const offers = [
    {
      title: t("offer.card.box.title", "Box & Produits"),
      subtitle: t("offer.card.box.subtitle", "Solutions physiques"),
      description: t(
        "offer.card.box.desc",
        "Box thématiques et événementielles, produits français artisanaux pour le soutien quotidien des équipes"
      ),
      icon: CheckCircle,
      features: [
        t("offer.card.box.f1", "Box Pouvoir d'Achat"),
        t("offer.card.box.f2", "Box Thématiques"),
        t("offer.card.box.f3", "Box Événementielles"),
        t("offer.card.box.f4", "Produits Made in France"),
      ],
    },
    {
      title: t("offer.card.saas.title", "Licence SaaS Entreprise"),
      subtitle: t("offer.card.saas.subtitle", "Outil numérique exclusif"),
      description: t(
        "offer.card.saas.desc",
        "Application QVT réservée aux entreprises sous forme de licence pour la prévention RPS et le suivi QVCT"
      ),
      icon: BarChart3,
      features: [
        t("offer.card.saas.f1", "Tableaux de bord RH"),
        t("offer.card.saas.f2", "Alertes RPS"),
        t("offer.card.saas.f3", "Export DUERP"),
        t("offer.card.saas.f4", "Suivi anonymisé"),
      ],
    },
    {
      title: t("offer.card.partners.title", "Boutique & Partenariats"),
      subtitle: t("offer.card.partners.subtitle", "Réseau local"),
      description: t(
        "offer.card.partners.desc",
        "Sélection de partenaires locaux et boutique en ligne pour compléter votre offre bien-être"
      ),
      icon: CheckCircle,
      features: [
        t("offer.card.partners.f1", "Partenaires locaux"),
        t("offer.card.partners.f2", "Co-branding"),
        t("offer.card.partners.f3", "Commissions"),
        t("offer.card.partners.f4", "Made in France"),
      ],
    },
  ];

  const demoFeatures = [
    {
      title: t("demo.f1.title", "Dashboard RH Global"),
      description: t(
        "demo.f1.desc",
        "Scoring QVT de 1 à 15 avec indicateurs anonymisés par équipe"
      ),
      mockup: t("demo.f1.mock", "Équipe Marketing: 12/15 • Équipe Vente: 8/15 • Global: 11/15"),
    },
    {
      title: t("demo.f2.title", "Gestion des Salariés"),
      description: t("demo.f2.desc", "Interface simple pour ajouter et gérer vos collaborateurs"),
      mockup: t("demo.f2.mock", "Ajouter un collaborateur • Gérer les équipes • Voir les profils"),
    },
    {
      title: t("demo.f3.title", "Alertes RPS"),
      description: t("demo.f3.desc", "Détection automatique des signaux faibles et alertes préventives"),
      mockup: t("demo.f3.mock", "🔴 Alerte stress élevé détectée dans l'équipe Support"),
    },
    {
      title: t("demo.f4.title", "Export DUERP"),
      description: t("demo.f4.desc", "Génération automatique des documents réglementaires"),
      mockup: t("demo.f4.mock", "Exporter DUERP • Rapport mensuel • Synthèse annuelle"),
    },
  ];

  // ✅ Source unique pour les tarifs
  const plans = [
    {
      type: t("pricing.plan.box.title", "Box Physiques"),
      price: "39,90 €",
      unit: t("pricing.plan.box.unit", "HT / box"),
      list: [
        t("pricing.plan.box.f1", "Box thématiques"),
        t("pricing.plan.box.f2", "Box événementielles"),
        t("pricing.plan.box.f3", "Produits français"),
        t("pricing.plan.box.f4", "Personnalisation"),
      ],
      popular: false,
    },
    {
      type: t("pricing.plan.saas.title", "Licence SaaS Entreprise"),
      price: "3 000 €",
      unit: t("pricing.plan.saas.unit", "/an"),
      list: [
        t("pricing.plan.saas.f1", "Dashboard RH complet"),
        t("pricing.plan.saas.f2", "Alertes RPS"),
        t("pricing.plan.saas.f3", "Export DUERP"),
        t("pricing.plan.saas.f4", "Support inclus"),
      ],
      popular: true,
    },
    {
      type: t("pricing.plan.export.title", "Box Premium Export"),
      price: "49,90 - 89,90 €",
      unit: t("pricing.plan.export.unit", "HT"),
      list: [
        t("pricing.plan.export.f1", "Export international"),
        t("pricing.plan.export.f2", "Produits premium"),
        t("pricing.plan.export.f3", "Packaging renforcé"),
        t("pricing.plan.export.f4", "Douanes incluses"),
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      quote: t(
        "testimonials.1.quote",
        "La licence QVT Box nous a permis de détecter des tensions avant qu'elles ne dégénèrent. Les alertes RPS sont un vrai plus."
      ),
      author: "Marie Dubois, DRH",
      company: "TechCorp (240 salariés)",
    },
    {
      quote: t(
        "testimonials.2.quote",
        "Les box apportent du concret à nos actions QVT. Nos salariés voient que l'entreprise s'investit vraiment."
      ),
      author: "Pierre Martin, Responsable CSE",
      company: "IndustrieXX (450 salariés)",
    },
    {
      quote: t(
        "testimonials.3.quote",
        "Une solution complète qui combine prévention et action. Le ROI est mesurable et l'impact est immédiat."
      ),
      author: "Sophie Laurent, Dirigeante",
      company: "Services+ (85 salariés)",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-[80vh] flex items-center justify-center pt-20 px-6 bg-gradient-to-br from-background via-primary/5 to-secondary/10"
        ref={heroRef}
      >
        <div className="container mx-auto text-center">
          <div className={`max-w-4xl mx-auto scroll-reveal ${heroVisible ? "visible" : ""}`}>
            <h1 className="font-inter text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-primary">QVT Box</span>
              <br />
              <span className="text-lg md:text-2xl lg:text-3xl font-normal text-foreground/80 mt-4 block">
                {t("hero.tagline")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Button
                asChild
                className="inline-flex items-center gap-2 whitespace-nowrap"
                size="lg"
              >
                <Link to="/contact">
                  <Phone className="w-5 h-5" />
                  <span className="whitespace-nowrap">{t("hero.cta.quote", "Demander un devis")}</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="inline-flex items-center gap-2 whitespace-nowrap"
                size="lg"
              >
                <Link to="/contact">
                  <BarChart3 className="w-5 h-5" />
                  <span className="whitespace-nowrap">{t("hero.cta.callback", "Recevoir une démo")}</span>
                </Link>
              </Button>
            </div>

            {/* Hero image */}
            <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-floating">
              <img
                src={heroImage}
                alt={t("hero.alt", "Équipe professionnelle QVT Box")}
                className="w-full h-[420px] md:h-[520px] object-cover"
                loading="lazy"
                decoding="async"
                width={1600}
                height={520}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* KPIs (optionnels, à valider) */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-3 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">3 000+</div>
                    <div className="text-xs text-foreground/70">{t("hero.kpi1", "Entreprises accompagnées")}</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-secondary">50+</div>
                    <div className="text-xs text-foreground/70">{t("hero.kpi2", "Pays desservis")}</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-accent">95%</div>
                    <div className="text-xs text-foreground/70">{t("hero.kpi3", "Satisfaction client")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offre */}
      <section id="offre" className="py-16 px-6 bg-background" ref={offerRef}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-inter">
              {t("offer.title")}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-lato">
              {t("offer.subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <Card
                  key={index}
                  className={`card-professional p-8 text-center stagger-item ${
                    offerVisible.has(index) ? "visible" : ""
                  }`}
                >
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-foreground">{offer.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {offer.subtitle}
                    </Badge>
                    <p className="text-foreground/70 text-sm leading-relaxed font-lato">
                      {offer.description}
                    </p>
                    <div className="space-y-2">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center text-sm text-foreground/60">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Démo SaaS */}
      <section id="demo" className="py-16 px-6 bg-gradient-to-br from-secondary/5 to-primary/5" ref={demoRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-12 scroll-reveal ${demoVisible ? "visible" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-inter">
              {t("demo.title", "Licence Entreprise – ")} <span className="text-secondary">{t("demo.badge", "Démo")}</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-4xl mx-auto font-lato">
              {t(
                "demo.subtitle",
                "Chaque entreprise dispose de son propre espace sécurisé. Les RH ajoutent les salariés, suivent les indicateurs QVT et reçoivent des alertes."
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-10">
            {demoFeatures.map((f, i) => (
              <Card key={i} className="card-professional p-6">
                <CardContent className="space-y-3">
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-foreground/70 text-sm">{f.description}</p>
                  <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm text-foreground/80">
                    {f.mockup}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-floating">
            <img
              src={saasImage}
              alt={t("demo.imageAlt", "Interface de la licence entreprise QVT Box")}
              className="w-full h-[320px] object-cover"
              loading="lazy"
              decoding="async"
              width={1600}
              height={320}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="inline-flex items-center gap-2 whitespace-nowrap">
              <Link to="/contact">
                <BarChart3 className="w-5 h-5" />
                <span className="whitespace-nowrap">{t("demo.cta", "Recevoir une démo de la licence")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nos Box */}
      <BoxCatalog />

      {/* Tarifs */}
      <section id="tarifs" className="py-16 px-6 bg-background" ref={pricingRef}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-inter">
              {t("pricing.title")}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-lato">
              {t("pricing.subtitle")}
            </p>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 max-w-2xl mx-auto mt-6">
              <p className="text-red-800 font-semibold">
                💡 {t("pricing.notice.title", "Important : La licence SaaS (3 000 € /an) est SANS box")}
              </p>
              <p className="text-red-700 text-sm mt-1">
                {t("pricing.notice.desc", "Le coût des box est supplémentaire et facturé séparément selon vos besoins")}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`card-professional p-8 text-center ${
                  plan.popular ? "border-2 border-primary" : ""
                } stagger-item ${pricingVisible.has(idx) ? "visible" : ""}`}
              >
                <CardContent className="space-y-5">
                  {plan.popular && <Badge className="bg-primary text-white">{t("pricing.recommended", "Recommandé")}</Badge>}
                  <h3 className="font-inter font-bold text-xl">{plan.type}</h3>
                  <div>
                    <div className="flex items-center justify-center">
                      <Euro className="w-5 h-5 text-primary mr-1" />
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    </div>
                    <p className="text-sm text-foreground/60">{plan.unit}</p>
                  </div>
                  <div className="space-y-2">
                    {plan.list.map((item) => (
                      <div key={item} className="flex items-center justify-center gap-2 text-sm text-foreground/70">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <Link to="/contact">
                      <Phone className="w-5 h-5" />
                      <span className="whitespace-nowrap">{t("pricing.cta", "Demander un devis")}</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="temoignages" className="py-16 px-6 bg-background" ref={testimonialsRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-12 scroll-reveal ${testimonialsVisible.has(0) ? "visible" : ""}`}>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              {t("testimonials.title", "Ils nous font ")}
              <span className="text-primary">{t("testimonials.trust", "confiance")}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((tt, i) => (
              <Card key={i} className={`card-professional p-6 stagger-item ${testimonialsVisible.has(i) ? "visible" : ""}`}>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80 italic font-lato leading-relaxed">"{tt.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground font-inter">{tt.author}</p>
                    <p className="text-sm text-foreground/60 font-lato">{tt.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section id="contact" className="py-16 px-6 bg-primary" ref={ctaRef}>
        <div className={`container mx-auto text-center scroll-reveal-scale ${ctaVisible ? "visible" : ""}`}>
          <h2 className="text-4xl font-bold text-white mb-4 font-inter">
            {t("cta.final.title", "Prêt à transformer votre QVCT ?")}
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-3xl mx-auto font-lato leading-relaxed">
            {t("cta.final.subtitle", "Contactez-nous pour un devis personnalisé ou une démonstration.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-inter inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Link to="/contact">
                <Phone className="w-5 h-5" />
                <span className="whitespace-nowrap">{t("cta.quote", "Demander un devis")}</span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-inter inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Link to="/contact">
                <BarChart3 className="w-5 h-5" />
                <span className="whitespace-nowrap">{t("cta.demo", "Recevoir une démo")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewIndex;

import saasImage from "@/assets/saas-dashboard-pro.jpg";
import boxImage from "@/assets/box-artisanal.jpg";

import {
  Phone,
  BarChart3,
  CheckCircle,
  Euro,
} from "lucide-react";

const NewIndex = () => {
  const { t } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [offerRef, offerVisible] = useStaggeredReveal(3, 200);
  const [demoRef, demoVisible] = useScrollReveal();
  const [pricingRef, pricingVisible] = useStaggeredReveal(3, 150);
  const [testimonialsRef, testimonialsVisible] = useStaggeredReveal(3, 200);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const offers = [
    {
      title: "Box & Produits",
      subtitle: "Solutions physiques",
      description:
        "Box thématiques et événementielles, produits français artisanaux pour le soutien quotidien des équipes",
      icon: CheckCircle,
      features: [
        "Box Pouvoir d'Achat",
        "Box Thématiques",
        "Box Événementielles",
        "Produits Made in France",
      ],
      color: "primary",
    },
    {
      title: "Licence SaaS Entreprise",
      subtitle: "Outil numérique exclusif",
      description:
        "Application QVT réservée aux entreprises sous forme de licence pour la prévention RPS et le suivi QVCT",
      icon: BarChart3,
      features: [
        "Tableaux de bord RH",
        "Alertes RPS",
        "Export DUERP",
        "Suivi anonymisé",
      ],
      color: "secondary",
    },
    {
      title: "Boutique & Partenariats",
      subtitle: "Réseau local",
      description:
        "Sélection de partenaires locaux et boutique en ligne pour compléter votre offre bien-être",
      icon: CheckCircle,
      features: ["Partenaires locaux", "Co-branding", "Commissions", "Made in France"],
      color: "accent",
    },
  ];

  const demoFeatures = [
    {
      title: "Dashboard RH Global",
      description: "Scoring QVT de 1 à 15 avec indicateurs anonymisés par équipe",
      mockup: "Équipe Marketing: 12/15 • Équipe Vente: 8/15 • Global: 11/15",
    },
    {
      title: "Gestion des Salariés",
      description: "Interface simple pour ajouter et gérer vos collaborateurs",
      mockup: "Ajouter un collaborateur • Gérer les équipes • Voir les profils",
    },
    {
      title: "Alertes RPS",
      description: "Détection automatique des signaux faibles et alertes préventives",
      mockup: "🔴 Alerte stress élevé détectée dans l'équipe Support",
    },
    {
      title: "Export DUERP",
      description: "Génération automatique des documents réglementaires",
      mockup: "Exporter DUERP • Rapport mensuel • Synthèse annuelle",
    },
  ];

  const pricing = [
    {
      type: "Box Physiques",
      price: "39,90 €",
      unit: "HT / box",
      features: [
        "Box thématiques",
        "Box événementielles",
        "Produits français",
        "Personnalisation",
      ],
    },
    {
      type: "Licence SaaS Entreprise",
      price: "3 000 €",
      unit: "/an",
      features: ["Dashboard RH complet", "Alertes RPS", "Export DUERP", "Support inclus"],
      popular: true,
    },
    {
      type: "Box Premium Export",
      price: "49,90 - 89,90 €",
      unit: "HT",
      features: [
        "Export international",
        "Produits premium",
        "Packaging renforcé",
        "Douanes incluses",
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        "La licence QVT Box nous a permis de détecter des tensions avant qu'elles ne dégénèrent. Les alertes RPS sont un vrai plus.",
      author: "Marie Dubois, DRH",
      company: "TechCorp (240 salariés)",
    },
    {
      quote:
        "Les box apportent du concret à nos actions QVT. Nos salariés voient que l'entreprise s'investit vraiment.",
      author: "Pierre Martin, Responsable CSE",
      company: "IndustrieXX (450 salariés)",
    },
    {
      quote:
        "Une solution complète qui combine prévention et action. Le ROI est mesurable et l'impact est immédiat.",
      author: "Sophie Laurent, Dirigeante",
      company: "Services+ (85 salariés)",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center pt-20 px-6 bg-gradient-to-br from-background via-primary/5 to-secondary/10"
        ref={heroRef}
      >
        <div className="container mx-auto text-center">
          <div className={`max-w-4xl mx-auto scroll-reveal ${heroVisible ? "visible" : ""}`}>
            <h1 className="font-inter text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-primary">QVT Box</span>
              <br />
              <span className="text-lg md:text-2xl lg:text-3xl font-normal text-foreground/80 mt-4 block">
                {t("hero.tagline")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link to="/contact" className="btn-primary">
                <Phone className="w-5 h-5 mr-2" />
                {t("hero.cta.quote")}
              </Link>
              <Link to="/contact" className="btn-outline">
                {t("hero.cta.callback")}
              </Link>
            </div>

            {/* Hero image */}
            <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-floating">
              <img
                src={heroImage}
                alt="Équipe professionnelle QVT Box"
                className="w-full h-[420px] md:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-3 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">3 000+</div>
                    <div className="text-xs text-foreground/70">Entreprises accompagnées</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-secondary">50+</div>
                    <div className="text-xs text-foreground/70">Pays desservis</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-accent">95%</div>
                    <div className="text-xs text-foreground/70">Satisfaction client</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offre */}
      <section className="py-16 px-6 bg-background" ref={offerRef}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-inter">
              {t("offer.title")}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-lato">
              {t("offer.subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <Card
                  key={index}
                  className={`card-professional p-8 text-center stagger-item ${
                    offerVisible.has(index) ? "visible" : ""
                  }`}
                >
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-foreground">{offer.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {offer.subtitle}
                    </Badge>
                    <p className="text-foreground/70 text-sm leading-relaxed font-lato">
                      {offer.description}
                    </p>
                    <div className="space-y-2">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-foreground/60">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Démo SaaS */}
      <section className="py-16 px-6 bg-gradient-to-br from-secondary/5 to-primary/5" ref={demoRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-12 scroll-reveal ${demoVisible ? "visible" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-inter">
              Licence Entreprise – <span className="text-secondary">Démo</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-4xl mx-auto font-lato">
              Chaque entreprise dispose de son propre espace sécurisé. Les RH ajoutent les salariés,
              suivent les indicateurs QVT et reçoivent des alertes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-10">
            {demoFeatures.map((f, i) => (
              <Card key={i} className="card-professional p-6">
                <CardContent className="space-y-3">
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-foreground/70 text-sm">{f.description}</p>
                  <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm text-foreground/80">
                    {f.mockup}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-floating">
            <img
              src={saasImage}
              alt="Interface de la licence entreprise QVT Box"
              className="w-full h-[320px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </div>

          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary">
              <BarChart3 className="w-5 h-5 mr-2" />
              Recevoir une démo de la licence
            </Link>
          </div>
        </div>
      </section>

      {/* Nos Box */}
      <BoxCatalog />

      {/* Tarifs */}
      <section className="py-16 px-6 bg-background" ref={pricingRef}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-inter">
              {t("pricing.title")}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-lato">
              {t("pricing.subtitle")}
            </p>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 max-w-2xl mx-auto mt-6">
              <p className="text-red-800 font-semibold">
                💡 Important : La licence SaaS (3 000 € /an) est SANS box
              </p>
              <p className="text-red-700 text-sm mt-1">
                Le coût des box est supplémentaire et facturé séparément selon vos besoins
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                type: "Box Physiques",
                price: "39,90 €",
                unit: "HT / box",
                list: ["Box thématiques", "Box événementielles", "Produits français", "Personnalisation"],
                popular: false,
              },
              {
                type: "Licence SaaS Entreprise",
                price: "3 000 €",
                unit: "/an",
                list: ["Dashboard RH complet", "Alertes RPS", "Export DUERP", "Support inclus"],
                popular: true,
              },
              {
                type: "Box Premium Export",
                price: "49,90 - 89,90 €",
                unit: "HT",
                list: ["Export international", "Produits premium", "Packaging renforcé", "Douanes incluses"],
                popular: false,
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`card-professional p-8 text-center ${
                  plan.popular ? "border-2 border-primary" : ""
                } stagger-item ${pricingVisible.has(idx) ? "visible" : ""}`}
              >
                <CardContent className="space-y-5">
                  {plan.popular && <Badge className="bg-primary text-white">{t("pricing.recommended")}</Badge>}
                  <h3 className="font-inter font-bold text-xl">{plan.type}</h3>
                  <div>
                    <div className="flex items-center justify-center">
                      <Euro className="w-5 h-5 text-primary mr-1" />
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    </div>
                    <p className="text-sm text-foreground/60">{plan.unit}</p>
                  </div>
                  <div className="space-y-2">
                    {plan.list.map((item) => (
                      <div key={item} className="flex items-center justify-center gap-2 text-sm text-foreground/70">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className={plan.popular ? "btn-primary w-full" : "btn-outline w-full"}>
                    Demander un devis
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 px-6 bg-background" ref={testimonialsRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-12 scroll-reveal ${testimonialsVisible.has(0) ? "visible" : ""}`}>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Ils nous font <span className="text-primary">confiance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className={`card-professional p-6 stagger-item ${testimonialsVisible.has(i) ? "visible" : ""}`}>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80 italic font-lato leading-relaxed">"{t.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground font-inter">{t.author}</p>
                    <p className="text-sm text-foreground/60 font-lato">{t.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-6 bg-primary" ref={ctaRef}>
        <div className={`container mx-auto text-center scroll-reveal-scale ${ctaVisible ? "visible" : ""}`}>
          <h2 className="text-4xl font-bold text-white mb-4 font-inter">Prêt à transformer votre QVCT ?</h2>
          <p className="text-white/90 text-lg mb-6 max-w-3xl mx-auto font-lato leading-relaxed">
            Contactez-nous pour un devis personnalisé ou une démonstration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-inter">
                <Phone className="w-5 h-5 mr-2" />
                Demander un devis
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-inter">
                <BarChart3 className="w-5 h-5 mr-2" />
                Recevoir une démo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewIndex;
