// src/pages/Index.tsx
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BoxCatalog from "@/components/BoxCatalog";
import { LazyImage } from "@/components/LazyImage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";

import {
  Phone,
  BarChart3,
  CheckCircle,
  Euro,
  AlertTriangle,
  UserPlus,
  Download,
} from "lucide-react";

// ===== IMAGES (mets-les dans /src/assets/ avec ces noms ou change les imports) =====
import heroImage from "@/assets/hero-workplace-team@md.webp";
import heroLqip from "@/assets/hero-workplace-team-lqip.jpg";
import saasImage from "@/assets/saas-dashboard-pro@md.webp";
import saasLqip from "@/assets/saas-dashboard-pro-lqip.jpg";
import boxImage from "@/assets/box-artisanal@2x.webp";

// ===================================================================================

const Index = () => {
  const { t } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [offerRef, offerVisible] = useStaggeredReveal(3, 160);
  const [demoRef, demoVisible] = useScrollReveal();
  const [pricingRef, pricingVisible] = useStaggeredReveal(3, 140);
  const [testimonialsRef, testimonialsVisible] = useStaggeredReveal(3, 140);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const offers = [
    {
      title: "Box & Produits",
      subtitle: "Solutions physiques",
      description:
        "Box thématiques & événementielles avec produits français artisanaux — des attentions concrètes qui comptent.",
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
        "Suivi QVCT, alertes RPS, export DUERP — une vue claire, des alertes utiles, des actions concrètes.",
      features: ["Tableaux de bord RH", "Alertes RPS", "Export DUERP", "Suivi anonymisé"],
      color: "secondary",
    },
    {
      title: "Boutique & Partenariats",
      subtitle: "Réseau local",
      description:
        "Partenaires de confiance, co-branding, commissions — amplifiez vos actions au plus près du terrain.",
      features: ["Partenaires locaux", "Co-branding", "Commissions", "Made in France"],
      color: "accent",
    },
  ];

  const demoFeatures = [
    {
      title: "Dashboard RH Global",
      description: "Scores QVT par équipes (1 à 15), tendances et signaux faibles.",
      mockup: "Équipe Marketing: 12/15 • Équipe Vente: 8/15 • Global: 11/15",
      icon: BarChart3,
      tone: "primary",
    },
    {
      title: "Gestion des Salariés",
      description: "Ajout en 2 clics, rôles, affectations par équipe/site.",
      mockup: "Ajouter un collaborateur • Gérer les équipes • Voir les profils",
      icon: UserPlus,
      tone: "primary",
    },
    {
      title: "Alertes RPS",
      description: "Détection automatique & alertes préventives utiles (pas de bruit).",
      mockup: "🔴 Alerte stress élevé détectée dans l'équipe Support",
      icon: AlertTriangle,
      tone: "secondary",
    },
    {
      title: "Export DUERP",
      description: "Rapports prêts à l'emploi — mensuels & annuels.",
      mockup: "Exporter DUERP • Rapport mensuel • Synthèse annuelle",
      icon: Download,
      tone: "secondary",
    },
  ];

  const pricing = [
    {
      type: "Box Physiques",
      price: "39,90 €",
      unit: "HT / box",
      features: ["Box thématiques", "Box événementielles", "Produits français", "Personnalisation"],
      popular: false,
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
      price: "49,90 – 89,90 €",
      unit: "HT",
      features: ["Export international", "Produits premium", "Packaging renforcé", "Douanes incluses"],
      popular: false,
    },
  ];

  const testimonials = [
    {
      quote:
        "On détecte des tensions avant qu’elles n’explosent. Les alertes RPS sont un vrai plus pour notre prévention.",
      author: "Marie Dubois, DRH",
      company: "TechCorp (240 salariés)",
    },
    {
      quote:
        "Les box rendent nos actions visibles et appréciées. Les équipes sentent l’attention au quotidien.",
      author: "Pierre Martin, Responsable CSE",
      company: "IndustrieXX (450 salariés)",
    },
    {
      quote:
        "Phygital efficace : du concret + des mesures. ROI clair et adoption rapide par les équipes.",
      author: "Sophie Laurent, Dirigeante",
      company: "Services+ (85 salariés)",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ========= HERO ========= */}
      <section
        className="relative min-h-[88vh] flex items-center justify-center pt-20 px-6"
        ref={heroRef}
      >
        <div className="absolute inset-0">
          {/* Lazy hero image + gradients */}
          <LazyImage
            src={heroImage}
            alt="Équipe au travail souriante dans des bureaux modernes – QVT Box"
            className="w-full h-full object-cover"
            placeholder={heroLqip}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/30 to-black/10" />
        </div>

        <div className="relative container mx-auto text-center text-white">
          <div className={`max-w-5xl mx-auto scroll-reveal ${heroVisible ? "visible" : ""}`}>
            {/* Badge + titre */}
            <Badge className="bg-white/15 text-white border-white/25 mb-6 px-4 py-2">
              QVT Box — Box + SaaS QVCT
            </Badge>

            <h1 className="font-inter text-4xl md:text-6xl font-bold leading-tight">
              Prenez soin de vos équipes.
              <br />
              <span className="text-primary">Mesurez. Prévenez. Agissez.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Des box artisanales françaises qui font du bien + une licence SaaS pour piloter la QVCT,
              prévenir les RPS et générer vos exports DUERP — simplement.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Phone className="w-5 h-5 mr-2" />
                  Demander un devis
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Recevoir une démo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Entreprises accompagnées", value: "3 000+" },
                { label: "Pays desservis", value: "50+" },
                { label: "Satisfaction client", value: "95%" },
                { label: "Made in France", value: "100%" },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-white/80 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========= OFFRE (3 cartes) ========= */}
      <section className="py-20 px-6 bg-background" ref={offerRef}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-inter">
              Une offre <span className="text-primary">claire</span> et complète
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mt-4">
              Du concret pour vos équipes, du pilotage pour vos RH, du mesurable pour la direction.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <Card
                key={offer.title}
                className={`card-professional p-8 text-center stagger-item ${offerVisible.has(index) ? "visible" : ""}`}
              >
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-inter font-bold text-2xl">{offer.title}</h3>
                    <Badge variant="outline" className="text-xs">{offer.subtitle}</Badge>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">{offer.description}</p>

                  <div className="space-y-2">
                    {offer.features.map((f) => (
                      <div key={f} className="flex items-center justify-center text-sm text-foreground/70">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bandeau comparatif simple */}
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6">Physique “Only” vs Phygital</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardContent className="space-y-3">
                  <h4 className="font-semibold text-orange-600">Physique Only</h4>
                  <ul className="text-sm text-foreground/70 space-y-2">
                    <li>• Box visibles et appréciées</li>
                    <li>• Produits français & premium</li>
                    <li>• Simple et sans outil numérique</li>
                    <li>• Impact non mesuré</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 border-2 border-primary">
                <CardContent className="space-y-3">
                  <h4 className="font-semibold text-primary">Phygital (recommandé)</h4>
                  <ul className="text-sm text-foreground/70 space-y-2">
                    <li>• Box + Licence SaaS</li>
                    <li>• Prévention RPS, alertes utiles</li>
                    <li>• Dashboards & exports DUERP</li>
                    <li>• Impact mesuré et pilotable</li>
                  </ul>
                  <p className="text-sm text-foreground/60">
                    La licence SaaS (3 000 €/an) est **sans box** — les box sont facturées à part selon vos besoins.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========= DEMO SAAS ========= */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/5 to-primary/5" ref={demoRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-14 scroll-reveal ${demoVisible ? "visible" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold font-inter">
              Licence Entreprise — <span className="text-secondary">Démo</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-4xl mx-auto mt-4">
              Un espace sécurisé pour vos RH. Ajoutez vos équipes, suivez les indicateurs QVT,
              recevez des alertes RPS et exportez votre DUERP — sans friction.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            {demoFeatures.map(({ title, description, mockup, icon: Icon, tone }, i) => (
              <Card key={i} className="card-professional p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tone === "primary" ? "bg-primary/10" : "bg-secondary/10"}`}>
                      <Icon className={`w-6 h-6 ${tone === "primary" ? "text-primary" : "text-secondary"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <p className="text-sm text-foreground/70 mb-3">{description}</p>
                      <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm text-foreground/80">
                        {mockup}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-floating">
            <LazyImage
              src={saasImage}
              alt="Dashboard QVT — scores, alertes, exports DUERP"
              className="w-full h-[320px] md:h-[420px] object-cover"
              placeholder={saasLqip}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-white/95 px-4 py-2 rounded-lg shadow">
              <p className="text-xs font-semibold">Interface réelle de la licence entreprise</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary inline-flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Recevoir une démo de la licence
            </Link>
          </div>
        </div>
      </section>

      {/* ========= BOX (catalogue) ========= */}
      <section className="py-10 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-[1.1fr,1fr] gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">
                Nos Box <span className="text-primary">exceptionnelles</span>
              </h2>
              <p className="text-foreground/70 max-w-xl">
                Des sélections fines, locales et utiles. Un geste visible qui change l’ambiance
                — et des produits dont on se sert vraiment.
              </p>
            </div>
            <Card className="card-professional overflow-hidden">
              <LazyImage
                src={boxImage}
                alt="Box QVT artisanale — produits français"
                className="w-full h-[260px] object-cover"
              />
            </Card>
          </div>
        </div>
      </section>

      <BoxCatalog />

      {/* ========= PRICING ========= */}
      <section className="py-20 px-6 bg-background" ref={pricingRef}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-inter">Tarifs indicatifs</h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mt-4">
              Adaptons ensemble selon votre taille, vos sites et vos objectifs. Transparence & simplicité.
            </p>
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-5 max-w-2xl mx-auto mt-6">
              <p className="text-red-800 font-semibold">
                💡 La licence SaaS (3 000 €/an) est SANS box.
              </p>
              <p className="text-red-700 text-sm">
                Les box sont facturées à part en fonction de vos besoins.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card
                key={plan.type}
                className={`card-professional p-8 text-center stagger-item ${
                  plan.popular ? "border-2 border-primary" : ""
                } ${pricingVisible.has(index) ? "visible" : ""}`}
              >
                <CardContent className="space-y-6">
                  {plan.popular && <Badge className="bg-primary text-white">Recommandé</Badge>}
                  <h3 className="font-inter font-bold text-xl">{plan.type}</h3>
                  <div>
                    <div className="flex items-center justify-center">
                      <Euro className="w-5 h-5 text-primary mr-1" />
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    </div>
                    <p className="text-sm text-foreground/60">{plan.unit}</p>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center justify-center text-sm text-foreground/70">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        {f}
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

      {/* ========= TEMOIGNAGES ========= */}
      <section className="py-20 px-6 bg-background" ref={testimonialsRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-12 scroll-reveal ${testimonialsVisible.has(0) ? "visible" : ""}`}>
            <h2 className="text-4xl font-bold font-inter">
              Ils nous font <span className="text-primary">confiance</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className={`card-professional p-6 stagger-item ${testimonialsVisible.has(i) ? "visible" : ""}`}>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80 italic leading-relaxed">“{t.quote}”</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-foreground/60">{t.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========= CTA FINAL ========= */}
      <section className="py-20 px-6 bg-primary" ref={ctaRef}>
        <div className={`container mx-auto text-center scroll-reveal ${ctaVisible ? "visible" : ""}`}>
          <h2 className="text-4xl font-bold text-white">
            Clair, mesurable, utile — pour de vrai.
          </h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mt-4">
            Parlons de vos enjeux et voyons ensemble la meilleure combinaison Box + SaaS pour vos équipes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Phone className="w-5 h-5 mr-2" />
                Demander un devis
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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

export default Index;
