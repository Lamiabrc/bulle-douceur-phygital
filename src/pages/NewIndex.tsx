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
import boxPAA from "@/assets/box-pouvoir-achat.webp";
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

  const faq = [
    {
      q:
        language === "en"
          ? "Is QVT Box only for large companies?"
          : "QVT Box est-elle réservée aux grandes entreprises ?",
      a:
        language === "en"
          ? "No. We support SMEs, mid-sized companies and large groups. The licence adapts to your workforce and budget."
          : "Non. Nous accompagnons les PME, ETI et grands groupes. La licence s’adapte à votre effectif et à votre budget.",
    },
    {
      q:
        language === "en"
          ? "Do employees stay anonymous with ZÉNA?"
          : "Les collaborateurs restent-ils anonymes avec ZÉNA ?",
      a:
        language === "en"
          ? "Yes. Emotional signals are aggregated and anonymized for HR dashboards. Managers never see individual conversations."
          : "Oui. Les signaux émotionnels sont agrégés et anonymisés pour les tableaux de bord RH. Les managers ne voient jamais les conversations individuelles.",
    },
    {
      q:
        language === "en"
          ? "Can we activate boxes later?"
          : "Peut-on activer les box plus tard ?",
      a:
        language === "en"
          ? "Yes. You can start with the licence and activate physical boxes afterwards, when you want to take concrete action."
          : "Oui. Vous pouvez démarrer par la licence et activer les box ensuite, au moment où vous souhaitez passer à l’action concrète.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Announcement bar */}
      <div className="sticky top-0 z-30 w-full bg-primary/10 backdrop-blur border-b border-primary/20">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm text-foreground/80">
            {t("hero.description")}
          </p>
        </div>
      </div>

      {/* HERO : QVT Box + ZÉNA au centre */}
      <section
        ref={heroRef}
        className={`relative overflow-hidden ${
          heroVisible ? "scroll-reveal visible" : "scroll-reveal"
        }`}
      >
        {/* Halo de fond */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 w-80 h-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-32 -left-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />

        <div className="container mx-auto px-6 pt-16 md:pt-24 pb-12 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Colonne gauche : message */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={qvtLogo}
                  alt="QVT Box Logo"
                  className="w-16 h-16 rounded-full shadow-lg ring-2 ring-primary/20 bg-white"
                />
                <div className="flex flex-col gap-1">
                  <Badge className="bg-primary/15 text-primary hover:bg-primary/20 rounded-full">
                    {t("hero.tagline")}
                  </Badge>
                  <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                    {language === "en"
                      ? "Emotional AI • Wellbeing • Purchasing power"
                      : "IA émotionnelle • Bien-être • Pouvoir d’achat"}
                  </span>
                </div>
              </div>

              <h1 className="font-inter text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold leading-[1.05] tracking-tight mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  QVT Box & ZÉNA
                </span>
                <br />
                <span className="text-foreground">
                  {language === "en"
                    ? "The emotional safety net for your teams"
                    : "Le filet de sécurité émotionnelle de vos équipes"}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-foreground/80 mb-6 font-medium max-w-xl">
                {language === "en"
                  ? "ZÉNA listens to your employees, QVT Box turns weak signals into concrete actions and smart wellbeing boxes."
                  : "ZÉNA écoute vos salariés, QVT Box transforme les signaux faibles en actions concrètes et en box bien-être utiles."}
              </p>

              {/* Bullets bénéfices rapides */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-3 h-3" />
                  {language === "en"
                    ? "Detect burnout early"
                    : "Détecter le burn-out tôt"}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-xs font-semibold text-secondary-foreground">
                  <CheckCircle2 className="w-3 h-3" />
                  {language === "en"
                    ? "Act on purchasing power"
                    : "Agir sur le pouvoir d’achat"}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-xs font-semibold text-foreground/80">
                  <CheckCircle2 className="w-3 h-3" />
                  {language === "en"
                    ? "Protect mental health at work"
                    : "Protéger la santé mentale au travail"}
                </span>
              </div>

              {/* CTA principaux */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="inline-flex items-center gap-2 whitespace-nowrap shadow-lg shadow-primary/30"
                >
                  <Link to="/contact">
                    <Phone className="w-5 h-5" />
                    <span>
                      {language === "en"
                        ? "Book a call with us"
                        : "Parler à un expert QVT Box"}
                    </span>
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="inline-flex items-center gap-2 whitespace-nowrap border-primary/40"
                >
                  <Link to="/saas">
                    <BarChart3 className="w-5 h-5" />
                    <span>
                      {language === "en"
                        ? "See the HR dashboard"
                        : "Découvrir le tableau de bord RH"}
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Lien direct vers ZÉNA Voice */}
              <div className="mt-4 text-sm text-foreground/65">
                {language === "en" ? (
                  <>
                    Or test the emotional AI directly:{" "}
                    <a
                      href="https://zena.qvtbox.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-primary font-semibold"
                    >
                      Talk to ZÉNA
                    </a>
                  </>
                ) : (
                  <>
                    Ou testez directement l’IA émotionnelle :{" "}
                    <a
                      href="https://zena.qvtbox.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-primary font-semibold"
                    >
                      Parler à ZÉNA
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Colonne droite : visuel + box pouvoir d’achat + ZENA */}
            <div className="relative z-10">
              <div className="rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-black/5 bg-background/60 backdrop-blur">
                <img
                  src={heroImage}
                  alt={
                    language === "en"
                      ? "QVT Box – wellbeing & emotional AI experience"
                      : "QVT Box – expérience QVT & IA émotionnelle"
                  }
                  className="w-full h-[440px] object-cover"
                />
              </div>

              {/* Badge ZÉNA IA */}
              <div className="absolute -bottom-5 left-4 sm:left-8">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-background/90 shadow-xl ring-1 ring-primary/20 backdrop-blur">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5B4B8A] to-[#4FD1C5] flex items-center justify-center text-white text-xs font-bold">
                    ZÉNA
                  </div>
                  <div className="flex flex-col text-xs text-foreground/80">
                    <span className="font-semibold">
                      {language === "en"
                        ? "Emotional AI for your employees"
                        : "IA émotionnelle dédiée à vos salariés"}
                    </span>
                    <span className="text-[0.7rem]">
                      {language === "en"
                        ? "Listens, detects weak signals, guides HR."
                        : "Écoute, détecte les signaux faibles, guide les RH."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge Box Pouvoir d'Achat */}
              <div className="absolute -top-6 right-4 sm:right-8">
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-background/90 shadow-md ring-1 ring-foreground/10 backdrop-blur">
                  <img
                    src={boxPAA}
                    alt={
                      language === "en"
                        ? "QVT Box – purchasing power box"
                        : "QVT Box – box pouvoir d’achat"
                    }
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="flex flex-col text-[0.7rem] text-foreground/80">
                    <span className="font-semibold">
                      {language === "en" ? "Smart wellbeing boxes" : "Box utiles & accessibles"}
                    </span>
                    <span>
                      {language === "en"
                        ? "≤ 10€ cost price, tangible impact."
                        : "≤ 10€ de coût, impact concret."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Micro preuve sociale (texte simple pour l’instant) */}
          <div className="mt-10 text-xs md:text-sm text-foreground/60 flex flex-wrap gap-3 items-center">
            <span className="uppercase tracking-[0.25em] text-foreground/40">
              {language === "en" ? "FOR ALL WORK ENVIRONMENTS" : "POUR TOUS LES UNIVERS DE TRAVAIL"}
            </span>
            <span className="h-[1px] flex-1 bg-foreground/10" />
            <span>
              {language === "en"
                ? "Field teams • Stores • Logistics • Hybrid workers • Remote teams"
                : "Équipes terrain • Magasins • Logistique • Salariés hybrides • Télétravail"}
            </span>
          </div>
        </div>
      </section>

      {/* Section ZENA Voice - Météo Émotionnelle */}
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
              {language === "en" ? (
                <>How do you know your employees are okay<br />when you never see them?</>
              ) : (
                <>Comment savez-vous que vos salariés vont bien<br />quand vous ne les voyez jamais ?</>
              )}
            </h2>

            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-3">
              {language === "en"
                ? "When your teams are not in front of a PC, classic surveys miss the weak signals. ZÉNA listens continuously, in a human, confidential way."
                : "Quand vos équipes ne sont pas devant un PC, les baromètres classiques ratent les signaux faibles. ZÉNA écoute en continu, de façon humaine et confidentielle."}
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold text-foreground">
                {language === "en"
                  ? "Discover your company’s Emotional Weather"
                  : "Découvrez la Météo Émotionnelle de votre entreprise"}
              </span>
            </div>

            <a
              href="https://zena.qvtbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full 
                         bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-white font-bold text-lg
                         shadow-xl hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 ease-out"
            >
              <span className="relative w-2.5 h-2.5 bg-[#4FD1C5] rounded-full animate-pulse" />
              <Sparkles className="w-5 h-5" />
              <span className="relative">
                {language === "en" ? "Talk to ZÉNA" : "Parler à ZÉNA"}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section ref={valueRef} className="py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {language === "en"
              ? "A complete approach: measure, prevent, act"
              : "Une approche complète : mesurer, prévenir, agir"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* Comment ça marche */}
      <section ref={howRef} className="py-10 px-6 bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t("how.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => (
              <Card
                key={s.step}
                className={`stagger-item ${
                  howVisible.has(i) ? "visible" : ""
                }`}
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

      {/* Section SaaS – Dashboard RH */}
      <section
        ref={demoRef}
        className={`py-14 px-6 ${
          demoVisible ? "scroll-reveal visible" : "scroll-reveal"
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {language === "en"
              ? "A clear HR cockpit to act with confidence"
              : "Un cockpit RH clair pour agir en confiance"}
          </h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            {t("demo.description")}
          </p>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <img
              src={saasImage}
              alt={
                language === "en"
                  ? "QVT Box HR dashboard – emotional analytics"
                  : "Dashboard QVT Box – analyse émotionnelle"
              }
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

      {/* Partenaires locaux */}
      <section className="py-10 px-6">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-foreground/60 mb-4">
            {language === "en" ? "Local partners" : "Partenaires locaux"}
          </p>
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md">
            <img
              src={partnersLocal}
              alt={
                language === "en"
                  ? "Local partners & made in France products"
                  : "Partenaires locaux & produits Made in France"
              }
              className="w-full h-[260px] md:h-[320px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Catalogue des box */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {language === "en"
                  ? "4 core boxes, 1 intention: daily support"
                  : "4 box cœur, 1 intention : soutenir au quotidien"}
              </h2>
              <p className="text-sm text-foreground/70 mt-1 max-w-xl">
                {language === "en"
                  ? "Retirees, employees, parents, teenagers: each box is designed to be useful, affordable and emotionally supportive."
                  : "Retraités, salariés, parents, ados : chaque box est conçue pour être utile, accessible et soutenante émotionnellement."}
              </p>
            </div>
            <div className="text-xs text-foreground/60">
              {language === "en"
                ? "Average cost price ≤ 10€ / box • Made in France when possible"
                : "Coût de revient moyen ≤ 10 € / box • Made in France dès que possible"}
            </div>
          </div>
          <BoxCatalog />
        </div>
      </section>

      {/* Logistique & expéditions */}
      <section className="py-12 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {language === "en"
                ? "Industrialized logistics, human attention"
                : "Une logistique industrialisée, une attention humaine"}
            </h2>
            <p className="text-sm md:text-base text-foreground/70 mb-3">
              {language === "en"
                ? "From emotional data to delivery: QVT Box connects digital signals to physical actions (boxes, gestures, attention)."
                : "Des données émotionnelles à la livraison : QVT Box relie vos signaux digitaux à des actions physiques (box, gestes, attentions)."}
            </p>
            <p className="text-sm text-foreground/65">
              {language === "en"
                ? "You decide when to send a box: not systematic, but relevant, targeted and fair."
                : "Vous décidez quand envoyer une box : jamais automatique, toujours pertinente, ciblée et juste."}
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow">
            <img
              src={shippingStation}
              alt={
                language === "en"
                  ? "Shipping area – QVT Box parcels ready"
                  : "Zone de préparation – colis QVT Box prêts"
              }
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
              ? "A license to measure & prevent. Boxes as an option to act and support purchasing power."
              : "Une licence pour mesurer & prévenir. Des box en option pour agir et soutenir le pouvoir d’achat."}
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
                              p.popular ? "mt-1 bg-primary text-white" : "mt-1"
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

      {/* FAQ courte pour SEO & réassurance */}
      <section className="py-12 px-6 bg-muted/40">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {language === "en"
              ? "Questions HR teams often ask us"
              : "Questions que les équipes RH nous posent souvent"}
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <Card key={item.q} className="bg-background/80">
                <CardContent className="p-5">
                  <h3 className="text-sm md:text-base font-semibold mb-1">
                    {item.q}
                  </h3>
                  <p className="text-sm text-foreground/70">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        ref={ctaRef}
        className={`py-16 px-6 bg-primary text-center text-white ${
          ctaVisible ? "scroll-reveal visible" : "scroll-reveal"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 font-inter">
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
