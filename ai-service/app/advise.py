import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Globe,
  Package,
  Shield,
  Users,
  CheckCircle,
  Plane,
  Heart,
  Truck,
} from "lucide-react";

import internationalHero from "@/assets/hero-spectacular-impact.jpg";
import partnersLocal from "@/assets/partners-local-producers.webp";
import shippingStation from "@/assets/shipping-station-parcel.webp";

// Helpers couleurs sûres (pas de classes dynamiques)
type Tone = "primary" | "secondary" | "accent";
const toneClasses = (tone: Tone) => {
  switch (tone) {
    case "primary":
      return { bg: "bg-primary/10", text: "text-primary" };
    case "secondary":
      return { bg: "bg-secondary/10", text: "text-secondary" };
    case "accent":
    default:
      return { bg: "bg-accent/10", text: "text-accent" };
  }
};

const InternationalPage = () => {
  const { t } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [servicesRef, servicesVisible] = useStaggeredReveal(3, 200);
  const [processRef, processVisible] = useStaggeredReveal(4, 150);
  const [testimonialsRef, testimonialsVisible] = useStaggeredReveal(3, 200);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const internationalServices: Array<{
    title: string;
    description: string;
    icon: any;
    features: string[];
    price: string;
    tone: Tone;
  }> = [
    {
      title: "Box Premium International",
      description:
        "Des box exceptionnelles conçues pour l'export avec packaging renforcé.",
      icon: Package,
      features: [
        "Emballage sécurisé pour l'international",
        "Produits français certifiés export",
        "Documentation douanière incluse",
        "Suivi de livraison mondial",
      ],
      price: "49,90 - 89,90 €",
      tone: "primary",
    },
    {
      title: "Licence SaaS Globale",
      description:
        "Solution digitale déployable dans tous vos bureaux internationaux.",
      icon: Globe,
      features: [
        "Interface multilingue",
        "Conformité RGPD internationale",
        "Support 24h/7j multi-fuseaux",
        "Rapports consolidés globaux",
      ],
      price: "Sur devis",
      tone: "secondary",
    },
    {
      title: "Accompagnement Culturel",
      description:
        "Adaptation de nos solutions aux spécificités culturelles locales.",
      icon: Users,
      features: [
        "Analyse des besoins locaux",
        "Personnalisation culturelle",
        "Formation équipes locales",
        "Support multilingue",
      ],
      price: "Inclus",
      tone: "accent",
    },
  ];

  const deliveryZones = [
    { zone: "Europe", countries: "27 pays", delivery: "3-5 jours", customs: "Incluses", icon: "🇪🇺" },
    { zone: "Amérique du Nord", countries: "USA, Canada", delivery: "5-8 jours", customs: "Incluses", icon: "🇺🇸" },
    { zone: "Asie-Pacifique", countries: "Japon, Singapour, Australie", delivery: "7-12 jours", customs: "Incluses", icon: "🌏" },
    { zone: "Moyen-Orient & Afrique", countries: "Émirats, Maroc, Afrique du Sud", delivery: "8-15 jours", customs: "Incluses", icon: "🌍" },
  ];

  const internationalProcess = [
    {
      step: "01",
      title: "Consultation Globale",
      description:
        "Analyse de vos besoins multi-sites et définition de la stratégie QVT internationale.",
      icon: Globe,
    },
    {
      step: "02",
      title: "Personnalisation Locale",
      description:
        "Adaptation des box et solutions aux spécificités culturelles de chaque pays.",
      icon: Heart,
    },
    {
      step: "03",
      title: "Logistique Mondiale",
      description:
        "Organisation des expéditions internationales avec gestion des douanes.",
      icon: Truck,
    },
    {
      step: "04",
      title: "Suivi & Support",
      description:
        "Accompagnement continu avec support multilingue et rapports consolidés.",
      icon: Shield,
    },
  ];

  const internationalTestimonials = [
    {
      quote:
        "Nos équipes de Londres, Berlin et Tokyo reçoivent désormais les mêmes attentions. La qualité française fait l'unanimité !",
      author: "Sarah Chen, Global HR Director",
      company: "TechCorp International (2,400 employés, 15 pays)",
      flag: "🌍",
    },
    {
      quote:
        "L'impact sur nos collaborateurs américains a été immédiat. Ils découvrent l'art de vivre français au bureau.",
      author: "Michael Rodriguez, VP Operations",
      company: "French-American Corp (800 employés, USA)",
      flag: "🇺🇸",
    },
    {
      quote:
        "La logistique est parfaite. Nos bureaux de Singapour et Sydney reçoivent leurs box en parfait état.",
      author: "Yuki Tanaka, Regional Manager",
      company: "Asian Solutions Ltd (1,200 employés, Asie)",
      flag: "🇸🇬",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO (overlay + texte blanc pour contraste) */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 px-6" ref={heroRef}>
        <div className="absolute inset-0">
          <img
            src={internationalHero}
            alt="QVT Box International - Équipes mondiales"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative container mx-auto text-center text-white">
          <div className={`max-w-5xl mx-auto scroll-reveal ${heroVisible ? "visible" : ""}`}>
            <div className="mb-8">
              <Badge className="bg-white/15 text-white border-white/30 mb-6 px-6 py-2 text-lg">
                <Globe className="w-5 h-5 mr-2" />
                {t("international.subtitle") || "Déploiement international sans friction"}
              </Badge>

              <h1 className="font-inter text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                QVT Box <span className="text-primary">International</span>
              </h1>

              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white">
                {t("international.hero.title") || "L’excellence française pour toutes vos équipes, partout."}
              </h2>

              <p className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-4xl mx-auto leading-relaxed">
                {t("international.hero.description") ||
                  "Nous expédions des box 100% Made in France et déployons notre licence SaaS dans plus de 50 pays, avec un accompagnement culturel et une logistique maîtrisée."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/contact">
                    <Plane className="w-5 h-5 mr-2" />
                    Demander un devis international
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  <Link to="/contact">
                    <Users className="w-5 h-5 mr-2" />
                    Consultation gratuite
                  </Link>
                </Button>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-white/80 text-sm">Pays desservis</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-white/80 text-sm">Made in France</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-white/80 text-sm">Langues disponibles</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white">72h</div>
                  <div className="text-white/80 text-sm">Délai moyen mondial</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-background" ref={servicesRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Solutions <span className="text-primary">Internationales</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Des solutions QVT pensées pour vos équipes dispersées dans le monde entier
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {internationalServices.map((service, index) => {
              const Icon = service.icon;
              const tones = toneClasses(service.tone);
              return (
                <Card
                  key={service.title}
                  className={`card-professional p-8 hover:shadow-floating transition-all duration-300 stagger-item ${
                    servicesVisible.has(index) ? "visible" : ""
                  }`}
                >
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      <div className={`w-20 h-20 ${tones.bg} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-10 h-10 ${tones.text}`} />
                      </div>
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-foreground text-center">
                      {service.title}
                    </h3>
                    <p className="text-foreground/70 text-center leading-relaxed font-lato">
                      {service.description}
                    </p>

                    <div className="space-y-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-foreground/70">
                          <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4 border-t border-border">
                      <div className="text-lg font-bold text-primary">{service.price}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Zones de Livraison */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Livraison <span className="text-secondary">Mondiale</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              Nous livrons dans plus de 50 pays avec la même qualité et le même soin
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {deliveryZones.map((zone) => (
              <Card key={zone.zone} className="card-professional text-center p-6 hover:shadow-lg transition-all">
                <CardContent>
                  <div className="text-4xl mb-4">{zone.icon}</div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{zone.zone}</h3>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <div className="flex items-center justify-between">
                      <span>Pays:</span>
                      <span className="font-semibold">{zone.countries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Livraison:</span>
                      <span className="font-semibold text-primary">{zone.delivery}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Douanes:</span>
                      <span className="font-semibold text-green-600">{zone.customs}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-20 px-6 bg-background" ref={processRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Notre <span className="text-primary">Processus</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              Un accompagnement sur-mesure pour déployer QVT Box à l'international
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {internationalProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.title}
                  className={`card-professional p-8 hover:shadow-lg transition-all stagger-item ${
                    processVisible.has(index) ? "visible" : ""
                  }`}
                >
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-xs font-bold text-center text-primary">{step.step}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-foreground mb-3">{step.title}</h3>
                        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-secondary/5" ref={testimonialsRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Témoignages <span className="text-primary">Mondiaux</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {internationalTestimonials.map((t, index) => (
              <Card
                key={t.author}
                className={`card-professional p-6 text-center hover:shadow-lg transition-all stagger-item ${
                  testimonialsVisible.has(index) ? "visible" : ""
                }`}
              >
                <CardContent className="space-y-4">
                  <div className="text-4xl mb-4">{t.flag}</div>
                  <blockquote className="text-foreground/80 italic leading-relaxed mb-4">"{t.quote}"</blockquote>
                  <div className="border-t border-border pt-4">
                    <div className="font-semibold text-foreground">{t.author}</div>
                    <div className="text-sm text-foreground/60">{t.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-secondary text-white" ref={ctaRef}>
        <div className="container mx-auto text-center">
          <div className={`scroll-reveal ${ctaVisible ? "visible" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-inter">Prêt à Conquérir le Monde ?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto font-lato">
              Rejoignez les entreprises qui font confiance à QVT Box pour prendre soin de leurs équipes internationales
              avec l'excellence française.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/contact">
                  <Globe className="w-5 h-5 mr-2" />
                  Démarrer votre projet international
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Planifier une démo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rassurance logistique / partenaires */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md mb-8">
            <img
              src={partnersLocal}
              alt="Artisans et producteurs locaux partenaires"
              className="w-full h-[260px] md:h-[320px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow">
            <img
              src={shippingStation}
              alt="Préparation d’envois de Box dans l’atelier d’expédition"
              className="w-full h-[260px] md:h-[320px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternationalPage;
