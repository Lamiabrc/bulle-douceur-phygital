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

import {
  Phone,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Euro,
  Box as BoxIcon,
  Activity,
} from "lucide-react";

// ✅ IMAGES (assure-toi qu’elles existent)
import heroImage from "@/assets/hero-workplace-team.jpg";
import saasImage from "@/assets/saas-dashboard-pro.jpg";
import partnersLocal from "@/assets/partners-local-producers.webp";
import shippingStation from "@/assets/shipping-station-parcel.webp";

const NewIndex = () => {
  const { t } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [valueRef, valueVisible] = useStaggeredReveal(3, 160);
  const [howRef, howVisible] = useStaggeredReveal(3, 160);
  const [demoRef, demoVisible] = useScrollReveal();
  const [pricingRef, pricingVisible] = useStaggeredReveal(3, 140);
  const [logosRef, logosVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const valueProps = [
    {
      icon: Activity,
      title: "Mesure QVCT simple",
      desc: "Un score clair (1–15), des tendances 7/30j, des signaux faibles détectés.",
    },
    {
      icon: ShieldCheck,
      title: "Prévention RPS",
      desc: "Alertes bienveillantes + Export DUERP prêt pour vos obligations.",
    },
    {
      icon: CheckCircle2,
      title: "Actions concrètes",
      desc: "Box utiles 100% Made in France, pour passer du discours à l’acte.",
    },
  ] as const;

  const howItWorks = [
    {
      step: "01",
      title: "Installez la licence",
      desc: "Espace sécurisé par entreprise. Onboardez vos équipes en quelques minutes.",
    },
    {
      step: "02",
      title: "Mesurez & surveillez",
      desc: "Check-ins courts, indicateurs anonymisés, alertes automatiques.",
    },
    {
      step: "03",
      title: "Agissez utile",
      desc: "Déployez des Box ciblées (en option) quand c’est pertinent — pas par défaut.",
    },
  ] as const;

  const plans = [
    {
      badge: "Populaire",
      title: "Licence SaaS Entreprise",
      price: "3 000 €",
      unit: "/an",
      points: [
        "Dashboard RH complet",
        "Scores & tendances QVCT",
        "Alertes RPS automatiques",
        "Export DUERP (PDF/CSV)",
        "Support inclus",
      ],
      cta: "Recevoir une démo",
      icon: BarChart3,
      popular: true,
    },
    {
      badge: "Option",
      title: "Box QVT (à la demande)",
      price: "39,90 €",
      unit: "HT / box",
      points: [
        "Produits 100% Made in France",
        "Thématiques utiles (pouvoir d’achat, cohésion, etc.)",
        "Personnalisation possible",
        "Expédition à la demande",
      ],
      cta: "Demander un devis Box",
      icon: BoxIcon,
      popular: false,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Announcement bar */}
      <div className="sticky top-0 z-30 w-full bg-primary/10 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm text-foreground/80">
            QVT Box = <strong>Licence SaaS</strong> ✚ <strong>Box utiles (en option)</strong> — simple & actionnable.
          </p>
        </div>
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-6 pt-20 pb-10 lg:pt-28 lg:pb-14">
          <div className={`grid lg:grid-cols-2 gap-10 items-center scroll-reveal ${heroVisible ? "visible" : ""}`}>
            <div>
              <Badge className="mb-4 bg-primary/15 text-primary hover:bg-primary/20">
                Nouveau • QVT lisible et actionnable
              </Badge>
              <h1 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  La QVT qui se voit
                </span>
                <br />
                <span className="text-foreground">et qui sert vraiment</span>
              </h1>
              <p className="mt-5 text-lg text-foreground/70 max-w-xl">
                Mesurez l’essentiel, détectez les risques, et passez à l’action avec des Box utiles, au bon moment.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Link to="/contact">
                    <BarChart3 className="w-5 h-5" />
                    <span>Recevoir une démo</span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Link to="/contact">
                    <Phone className="w-5 h-5" />
                    <span>Parler à un expert</span>
                  </Link>
                </Button>
              </div>

              {/* Metrics mini */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <div className="rounded-2xl border bg-white/70 dark:bg-white/5 p-4 text-center">
                  <div className="text-xl font-bold text-primary">95%</div>
                  <div className="text-xs text-foreground/60">Satisfaction</div>
                </div>
                <div className="rounded-2xl border bg-white/70 dark:bg-white/5 p-4 text-center">
                  <div className="text-xl font-bold text-secondary">1–15</div>
                  <div className="text-xs text-foreground/60">Score lisible</div>
                </div>
                <div className="rounded-2xl border bg-white/70 dark:bg-white/5 p-4 text-center">
                  <div className="text-xl font-bold text-accent">DUERP</div>
                  <div className="text-xs text-foreground/60">Export auto</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img
                  src={heroImage}
                  alt="Équipe au travail — esprit positif"
                  className="w-full h-[440px] object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={440}
                />
              </div>
              <div className="pointer-events-none absolute -bottom-8 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -top-8 -right-10 h-28 w-28 rounded-full bg-secondary/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 bénéfices clés */}
      <section ref={valueRef} className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {valueProps.map((v, i) => {
              const Icon = v.icon;
              return (
                <Card
                  key={v.title}
                  className={`stagger-item ${valueVisible.has(i) ? "visible" : ""} border-transparent bg-gradient-to-b from-muted/40 to-background hover:from-muted/60 transition`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{v.title}</h3>
                    <p className="text-sm text-foreground/70 mt-2">{v.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section ref={howRef} className="py-10 px-6 bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
            Comprendre en <span className="text-primary">3 étapes</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => (
              <Card key={s.step} className={`stagger-item ${howVisible.has(i) ? "visible" : ""}`}>
                <CardContent className="p-6">
                  <div className="text-4xl font-extrabold text-primary/70">{s.step}</div>
                  <h3 className="text-xl font-semibold mt-2">{s.title}</h3>
                  <p className="text-sm text-foreground/70 mt-2">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo visuelle */}
      <section ref={demoRef} className="py-14 px-6">
        <div className="container mx-auto">
          <div className={`text-center mb-8 scroll-reveal ${demoVisible ? "visible" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold">
              La licence <span className="text-secondary">en action</span>
            </h2>
            <p className="text-foreground/70 mt-2">
              Un tableau de bord clair, des alertes automatiques et un Export DUERP prêt à l’emploi.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <img
              src={saasImage}
              alt="Dashboard QVT Box — démonstration"
              className="w-full h-[360px] object-cover"
              loading="lazy"
              decoding="async"
              width={1400}
              height={360}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent" />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="inline-flex items-center gap-2 whitespace-nowrap">
              <Link to="/contact">
                <BarChart3 className="w-5 h-5" />
                <span>Recevoir une démo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="inline-flex items-center gap-2 whitespace-nowrap">
              <Link to="/contact">
                <Phone className="w-5 h-5" />
                <span>Parler à un expert</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Preuve sociale / Partenaires */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <div className={`text-center mb-6 scroll-reveal ${logosVisible ? "visible" : ""}`}>
            <p className="text-sm uppercase tracking-wider text-foreground/60">Partenaires & producteurs locaux</p>
          </div>
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md">
            <img
              src={partnersLocal}
              alt="Artisans et producteurs locaux partenaires"
              className="w-full h-[260px] md:h-[320px] object-cover"
              loading="lazy"
              decoding="async"
              width={1600}
              height={320}
            />
          </div>
        </div>
      </section>

      {/* CATALOGUE COMPLET */}
      <BoxCatalog />

      {/* Logistique (rassurance) */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow">
            <img
              src={shippingStation}
              alt="Préparation d’envois de Box dans l’atelier d’expédition"
              className="w-full h-[260px] md:h-[320px] object-cover"
              loading="lazy"
              decoding="async"
              width={1600}
              height={320}
            />
          </div>
        </div>
      </section>

      {/* Tarifs (rappel simple) */}
      <section className="py-16 px-6" ref={pricingRef}>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-inter">
              {t("pricing?.title") || "Tarifs simples"}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-lato">
              Licence pour mesurer & prévenir. Box **en option** pour agir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.title}
                  className={`stagger-item ${pricingVisible.has(i) ? "visible" : ""} ${
                    p.popular ? "border-2 border-primary shadow-lg" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{p.title}</h3>
                          {p.popular ? (
                            <Badge className="mt-1 bg-primary text-white">Populaire</Badge>
                          ) : (
                            <Badge variant="outline" className="mt-1">
                              Option
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center justify-end">
                          <Euro className="w-4 h-4 text-primary mr-1" />
                          <span className="text-2xl font-bold text-primary">{p.price}</span>
                        </div>
                        <div className="text-xs text-foreground/60">{p.unit}</div>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      <Button
                        asChild
                        size="lg"
                        variant={p.popular ? "default" : "outline"}
                        className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <Link to="/contact">
                          <span>{p.cta}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section ref={ctaRef} className="py-16 px-6 bg-primary">
        <div className={`container mx-auto text-center scroll-reveal-scale ${ctaVisible ? "visible" : ""}`}>
          <h2 className="text-4xl font-bold text-white mb-3 font-inter">Passez à une QVT utile</h2>
          <p className="text-white/90 text-lg mb-6 max-w-3xl mx-auto">
            Mesurez ce qui compte, agissez quand il faut. Une démo ? Un devis Box ?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Link to="/contact">
                <BarChart3 className="w-5 h-5" />
                <span>Recevoir une démo</span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Link to="/contact">
                <Phone className="w-5 h-5" />
                <span>Demander un devis</span>
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
