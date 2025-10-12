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

import heroImage from "@/assets/qvt experience complete.png";
import saasImage from "@/assets/saas-dashboard-pro.jpg";
import partnersLocal from "@/assets/partners-local-producers.webp";
import shippingStation from "@/assets/shipping-station-parcel.webp";
import qvtLogo from "@/assets/qvtbox-logo.png";

const NewIndex = () => {
  const { t, language } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [valueRef, valueVisible] = useStaggeredReveal(3, 160);
  const [howRef, howVisible] = useStaggeredReveal(3, 160);
  const [demoRef, demoVisible] = useScrollReveal();
  const [pricingRef, pricingVisible] = useStaggeredReveal(3, 140);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const valueProps = [
    {
      icon: Activity,
      title: t("value.measure.title"),
      desc: t("value.measure.desc"),
    },
    {
      icon: ShieldCheck,
      title: t("value.prevention.title"),
      desc: t("value.prevention.desc"),
    },
    {
      icon: CheckCircle2,
      title: t("value.actions.title"),
      desc: t("value.actions.desc"),
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: t("how.step1.title"),
      desc: t("how.step1.desc"),
    },
    {
      step: "02",
      title: t("how.step2.title"),
      desc: t("how.step2.desc"),
    },
    {
      step: "03",
      title: t("how.step3.title"),
      desc: t("how.step3.desc"),
    },
  ];

  const plans = [
    {
      badge: t("offer.license.badge"),
      title: t("offer.license.title"),
      points: [
        t("offer.license.point1"),
        t("offer.license.point2"),
        t("offer.license.point3"),
        t("offer.license.point4"),
        t("offer.license.point5"),
      ],
      cta: t("offer.license.cta"),
      icon: BarChart3,
      popular: true,
    },
    {
      badge: t("offer.boxes.badge"),
      title: t("offer.boxes.title"),
      price: t("offer.boxes.price"),
      unit: t("offer.boxes.unit"),
      points: [
        t("offer.boxes.point1"),
        t("offer.boxes.point2"),
        t("offer.boxes.point3"),
        t("offer.boxes.point4"),
      ],
      cta: t("offer.boxes.cta"),
      icon: BoxIcon,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Barre d’annonce */}
      <div className="sticky top-0 z-30 w-full bg-primary/10 backdrop-blur border-b border-primary/20">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm text-foreground/80">{t("hero.description")}</p>
        </div>
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 pt-20 pb-10 lg:pt-28 lg:pb-14">
          <div
            className={`grid lg:grid-cols-2 gap-10 items-center scroll-reveal ${
              heroVisible ? "visible" : ""
            }`}
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={qvtLogo}
                  alt="QVT Box Logo"
                  className="w-16 h-16 rounded-full shadow-lg"
                />
                <Badge className="bg-primary/15 text-primary hover:bg-primary/20">
                  {t("hero.tagline")}
                </Badge>
              </div>

              <h1 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  QVT Box
                </span>
              </h1>

              <p className="text-xl text-foreground/80 mb-7 font-medium">
                {t("hero.description")}
              </p>

              <div className="mt-7 flex gap-3">
                <Button
                  asChild
                  size="lg"
                  className="inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <Link to="/contact">
                    <Phone className="w-5 h-5" />
                    <span>{t("hero.cta.contact")}</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <Link to="/saas">
                    <BarChart3 className="w-5 h-5" />
                    <span>{t("hero.cta.demo")}</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img
                  src={heroImage}
                  alt="QVT Box"
                  className="w-full h-[440px] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -top-8 -right-10 h-28 w-28 rounded-full bg-secondary/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Section ZENA */}
      <section className="relative py-16 px-6 text-center overflow-hidden bg-gradient-to-b from-secondary/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-40" />
        <div className="container mx-auto relative z-10 max-w-4xl">
          <div className="flex flex-col items-center">
            <video
              src="/zena-avatar.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-40 h-40 mb-6 rounded-full shadow-2xl object-cover ring-4 ring-primary/20"
            />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              {language === "en"
                ? "How do you know your employees are happy when you never see them?"
                : "Comment savez-vous que vos salariés sont heureux quand vous ne les voyez jamais ?"}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-3">
              {language === "en"
                ? "When your teams are not in front of a PC..."
                : "Quand vos équipes ne sont pas devant un PC..."}
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold text-foreground">
                {language === "en"
                  ? "Discover the Emotional Weather of your company"
                  : "Découvrez la Météo Émotionnelle de votre entreprise"}
              </span>
            </div>
            <a
              href="https://zena.qvtbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 ease-out"
            >
              <span className="relative w-2.5 h-2.5 bg-[#4FD1C5] rounded-full animate-pulse" />
              <Sparkles className="w-5 h-5" />
              <span className="relative">
                {language === "en" ? "Talk to ZENA" : "Parler à ZENA"}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section ref={valueRef} className="py-12 px-6">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          {valueProps.map((v, i) => {
            const Icon = v.icon;
            return (
              <Card
                key={v.title}
                className={`stagger-item ${
                  valueVisible.has(i) ? "visible" : ""
                } border-transparent bg-gradient-to-b from-muted/40 to-background hover:from-muted/60 transition`}
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
      </section>

      {/* Comment ça marche */}
      <section
        ref={howRef}
        className="py-10 px-6 bg-gradient-to-b from-secondary/10 to-transparent"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t("how.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => (
              <Card
                key={s.step}
                className={`stagger-item ${howVisible.has(i) ? "visible" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="text-4xl font-extrabold text-primary/70">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-semibold mt-2">{s.title}</h3>
                  <p className="text-sm text-foreground/70 mt-2">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS */}
      <section ref={demoRef} className="py-14 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t("demo.title")}
          </h2>
          <p className="text-foreground/70 mb-8">{t("demo.description")}</p>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <img
              src={saasImage}
              alt="Dashboard QVT Box"
              className="w-full h-[360px] object-cover"
            />
          </div>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link to="/saas">{t("demo.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-10 px-6">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-foreground/60 mb-4">
            {language === "en" ? "Local Partners" : "Partenaires locaux"}
          </p>
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md">
            <img
              src={partnersLocal}
              alt="Local partners"
              className="w-full h-[260px] md:h-[320px] object-cover"
            />
          </div>
        </div>
      </section>

      <BoxCatalog />

      {/* Expédition */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow">
            <img
              src={shippingStation}
              alt="Shipping"
              className="w-full h-[260px] md:h-[320px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 px-6" ref={pricingRef}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-inter">
            {t("offer.title")}
          </h2>
          <p className="text-lg text-foreground/70 mb-10">
            {language === "en"
              ? "License to measure & prevent. Boxes as an option to act."
              : "Licence pour mesurer & prévenir. Box en option pour agir."}
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.title}
                  className={`stagger-item ${
                    pricingVisible.has(i) ? "visible" : ""
                  } ${p.popular ? "border-2 border-primary shadow-lg" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{p.title}</h3>
                          <Badge
                            className={
                              p.popular
                                ? "mt-1 bg-primary text-white"
                                : "mt-1"
                            }
                            variant={p.popular ? "default" : "outline"}
                          >
                            {p.badge}
                          </Badge>
                        </div>
                      </div>
                      {p.price && (
                        <div className="text-right shrink-0">
                          <div className="flex items-center justify-end">
                            <Euro className="w-4 h-4 text-primary mr-1" />
                            <span className="text-2xl font-bold text-primary">
                              {p.price}
                            </span>
                          </div>
                          <div className="text-xs text-foreground/60">
                            {p.unit}
                          </div>
                        </div>
                      )}
                    </div>

                    <ul className="mt-5 space-y-2">
                      {p.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
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
                        className="w-full inline-flex items-center justify-center gap-2"
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

      {/* Soutenir QVT Box */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#F2F7F6] to-[#EAF4F3] text-center">
        <div className="container mx-auto max-w-xl space-y-4">
          <h2 className="text-3xl font-bold text-primary font-inter">
            💚 Soutenez QVT Box
          </h2>
          <p className="text-foreground/70 mb-4 text-sm sm:text-base">
            Participez à notre campagne sur{" "}
            <strong>Kengo.bzh</strong> pour faire grandir l’innovation bien-être
            phygitale et solidaire.
          </p>
          <div className="flex justify-center">
            <iframe
              scrolling="no"
              src="https://kengo.bzh/projet-embed/5212/qvt-box"
              style={{
                border: "0",
                width: "100%",
                maxWidth: "360px",
                height: "440px",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
              title="Cagnotte Kengo QVT Box"
            />
          </div>
          <p className="text-xs text-foreground/60 mt-4">
            Ensemble, faisons briller les bulles d’espoir 💜
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section
        ref={ctaRef}
        className="py-16 px-6 bg-primary text-center text-white"
      >
        <h2 className="text-4xl font-bold mb-3 font-inter">
          {t("cta.title")}
        </h2>
        <p className="text-white/90 text-lg mb-6 max-w-3xl mx-auto">
          {t("cta.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/contact">
              <Phone className="w-5 h-5" />
              <span>{t("cta.button")}</span>
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewIndex;
