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

/** ✅ images qui existent dans /src/assets */
import internationalHero from "@/assets/hero-spectacular-impact.jpg";

const InternationalPage = () => {
  const { t } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [servicesRef, servicesVisible] = useStaggeredReveal(3, 200);
  const [processRef, processVisible] = useStaggeredReveal(4, 150);
  const [testimonialsRef, testimonialsVisible] = useStaggeredReveal(3, 200);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const internationalServices = [
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
      price: "49,90 – 89,90 €",
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
    },
  ];

  const deliveryZones = [
    { zone: "Europe", countries: "27 pays", delivery: "3–5 jours", customs: "Incluses", icon: "🇪🇺" },
    { zone: "Amérique du Nord", countries: "USA, Canada", delivery: "5–8 jours", customs: "Incluses", icon: "🇺🇸" },
    { zone: "Asie-Pacifique", countries: "Japon, Singapour, Australie", delivery: "7–12 jours", customs: "Incluses", icon: "🌏" },
    { zone: "Moyen-Orient & Afrique", countries: "Émirats, Maroc, Afrique du Sud", delivery: "8–15 jours", customs: "Incluses", icon: "🌍" },
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
      company: "TechCorp International (2 400 employés, 15 pays)",
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
      company: "Asian Solutions Ltd (1 200 employés, Asie)",
      flag: "🇸🇬",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO — contraste fort + overlay */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center pt-20 px-6"
        ref={heroRef}
      >
        <div className="absolute inset-0">
          <img
            src={internationalHero}
            alt="QVT Box International - Équipes mondiales"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-black/30" />
        </div>

        <div className="relative container mx-auto text-center text-white">
          <div
            className={`max-w-5xl mx-auto scroll-reveal ${
              heroVisible ? "visible" : ""
            }`}
          >
            <Badge className="bg-white text-primary font-semibold px-4 py-1.5 rounded-full inline-flex items-center justify-center gap-2 mb-6 shadow-lg">
              <Globe className="w-4 h-4" />
              {t("international.subtitle")}
            </Badge>

            <h1 className="font-inter text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              QVT Box <span className="text-primary">International</span>
            </h1>

            <h2 className="text-xl md:text-3xl font-semibold mb-6 text-white">
              {t("international.hero.title")}
            </h2>

            <p className="text-base md:text-lg text-white/90 mb-10 font-light max-w-4xl mx-auto leading-relaxed">
              {t("international.hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-14">
              <Link
                to="/contact"
                className="btn-primary bg-white text-primary hover:bg-white/90 px-7 py-3 text-base md:text-lg font-semibold shadow-primary"
              >
                <Plane className="w-5 h-5 mr-2" />
                Demander un devis international
              </Link>
              <Link
                to="/contact"
                className="btn-outline border-2 border-white text-white hover:bg-white hover:text-primary px-7 py-3 text-base md:text-lg font-semibold"
              >
                <Users className="w-5 h-5 mr-2" />
                Consultation gratuite
              </Link>
            </div>

            {/* Stats contrastées */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
              {[
                { k: "50+", v: "Pays desservis" },
                { k: "100%", v: "Made in France" },
                { k: "15+", v: "Langues disponibles" },
                { k: "72h", v: "Délai moyen mondial" },
              ].map((item) => (
                <div
                  key={item.v}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/25"
                >
                  <div className="text-2xl md:text-3xl font-extrabold text-white">
                    {item.k}
                  </div>
                  <div className="text-white/90 text-xs md:text-sm font-medium">
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — contraste fort, textes foncés */}
      <section className="py-20 px-6 bg-background" ref={servicesRef}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 font-inter tracking-tight">
              Solutions <span className="text-primary">Internationales</span>
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto font-lato">
              Des solutions QVT pensées pour vos équipes dispersées dans le
              monde entier.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {internationalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.title}
                  className={`p-7 md:p-8 hover:shadow-floating transition-all duration-300 border-2 border-border/70 bg-card/95 ${
                    servicesVisible.has(index) ? "visible" : "stagger-item"
                  }`}
                >
                  <CardContent className="space-y-6 p-0">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                        <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="font-inter font-bold text-xl md:text-2xl text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-foreground/80 mt-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start text-sm text-foreground/90"
                        >
                          <CheckCircle className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4 border-t border-border/70">
                      <div className="text-lg font-extrabold text-primary">
                        {service.price}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ZONES DE LIVRAISON — cartes nettes */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 font-inter tracking-tight">
              Livraison <span className="text-secondary">Mondiale</span>
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto font-lato">
              Nous livrons dans plus de 50 pays avec la même qualité et le même
              soin.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {deliveryZones.map((zone) => (
              <Card
                key={zone.zone}
                className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 border-border/70 bg-card/95"
              >
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{zone.icon}</div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {zone.zone}
                  </h3>
                  <div className="space-y-2 text-sm text-foreground/90">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Pays :</span>
                      <span className="font-semibold">{zone.countries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Livraison :</span>
                      <span className="font-semibold text-primary">
                        {zone.delivery}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Douanes :</span>
                      <span className="font-semibold text-green-600">
                        {zone.customs}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS — blocs très lisibles */}
      <section className="py-20 px-6 bg-background" ref={processRef}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 font-inter tracking-tight">
              Notre <span className="text-primary">Processus</span>
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto font-lato">
              Un accompagnement sur-mesure pour déployer QVT Box à
              l'international.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {internationalProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card
                  key={step.title}
                  className={`p-7 hover:shadow-lg transition-all duration-300 border-2 border-border/70 bg-card/95 ${
                    processVisible.has(index) ? "visible" : "stagger-item"
                  }`}
                >
                  <CardContent className="space-y-4 p-0">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 text-center">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 border border-primary/20">
                          <IconComponent className="w-7 h-7 text-primary" />
                        </div>
                        <div className="text-xs font-bold text-primary">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-foreground/85 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES — contraste soigné */}
      <section
        className="py-20 px-6 bg-gradient-to-br from-primary/10 to-secondary/10"
        ref={testimonialsRef}
      >
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 font-inter tracking-tight">
              Témoignages <span className="text-primary">Mondiaux</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {internationalTestimonials.map((t, index) => (
              <Card
                key={t.author}
                className={`p-6 text-center hover:shadow-lg transition-all duration-300 border-2 border-border/70 bg-card/95 ${
                  testimonialsVisible.has(index) ? "visible" : "stagger-item"
                }`}
              >
                <CardContent className="space-y-4 p-0">
                  <div className="text-4xl mb-2">{t.flag}</div>
                  <blockquote className="text-foreground/90 italic leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <div className="border-t border-border/70 pt-4">
                    <div className="font-semibold text-foreground">{t.author}</div>
                    <div className="text-sm text-foreground/80">{t.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — très lisible */}
      <section
        className="py-20 px-6 bg-gradient-to-r from-primary to-secondary text-white"
        ref={ctaRef}
      >
        <div className="container mx-auto text-center">
          <div className={`scroll-reveal ${ctaVisible ? "visible" : ""}`}>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 font-inter tracking-tight">
              Prêt à conquérir le monde ?
            </h2>
            <p className="text-base md:text-lg text-white/95 mb-10 max-w-3xl mx-auto font-lato">
              Rejoignez les entreprises qui font confiance à QVT Box pour prendre
              soin de leurs équipes internationales avec l'excellence française.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="btn-primary bg-white text-primary hover:bg-white/90 px-7 py-3 text-base md:text-lg font-semibold shadow-primary"
              >
                <Globe className="w-5 h-5 mr-2" />
                Démarrer votre projet international
              </Link>
              <Link
                to="/contact"
                className="btn-outline border-2 border-white text-white hover:bg-white hover:text-primary px-7 py-3 text-base md:text-lg font-semibold"
              >
                <Users className="w-5 h-5 mr-2" />
                Planifier une démo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternationalPage;
