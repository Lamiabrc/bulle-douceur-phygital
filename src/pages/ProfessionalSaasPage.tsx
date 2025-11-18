// src/pages/ProfessionalSaasPage.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AlertDashboard from "@/components/AlertDashboard";
import EvaluationForm from "@/components/EvaluationForm";
import EmotionalWeatherMap from "@/components/EmotionalWeatherMap";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";

import {
  Shield,
  BarChart3,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Brain,
  Activity,
  Lock,
  Sparkles,
} from "lucide-react";

import saasDashboard from "@/assets/saas-dashboard-pro.jpg";
import workplaceWellness from "@/assets/workplace-wellness.jpg";

/**
 * 🌌 QVT Box — Page SaaS Professionnel (refonte premium)
 * - Univers ZÉNA + SaaS RH
 * - Émotion + conformité + pilotage
 * - Positionnement clair pour DRH, CSE, Managers
 */

const ProfessionalSaasPage = () => {
  const { user } = useAuth();

  const [heroRef, heroVisible] = useScrollReveal();
  const [featureRef, featureVisible] = useStaggeredReveal(4, 200);
  const [actorRef, actorVisible] = useStaggeredReveal(3, 200);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const corePillars = [
    {
      icon: Brain,
      title: "Écouter",
      text: "ZÉNA IA émotionnelle écoute les ressentis, capte les signaux faibles et transforme “Ça va ?” en vraie question.",
    },
    {
      icon: BarChart3,
      title: "Analyser",
      text: "Le SaaS QVT Box agrège et anonymise les données pour donner une météo émotionnelle claire, actionnable et conforme.",
    },
    {
      icon: Activity,
      title: "Agir",
      text: "Vous pilotez des plans d’actions QVT, suivez leurs impacts et rendez des comptes aux instances avec des preuves chiffrées.",
    },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Tableaux de bord émotionnels",
      badge: "DRH • Direction",
      text: "Vue consolidée par site, métier, équipe. Repérez les zones à risque avant l’explosion des arrêts.",
      bullets: [
        "Courbes d’intensité émotionnelle",
        "Zoom par équipe ou population",
        "Historique des évolutions",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Alertes RPS intelligentes",
      badge: "INRS • RPS",
      text: "Algorithmes inspirés des axes RPS (charge, reconnaissance, conflits, sens, autonomie).",
      bullets: [
        "Seuils configurables",
        "Notifications graduées",
        "Priorisation des zones critiques",
      ],
    },
    {
      icon: FileText,
      title: "Préparation DUERP & rapports",
      badge: "Code du Travail",
      text: "Export des éléments nécessaires pour le Document Unique, les CSSCT et les échanges avec l’inspection.",
      bullets: [
        "Synthèse des risques identifiés",
        "Tracer les actions réalisées",
        "Historique des plans QVT",
      ],
    },
    {
      icon: Lock,
      title: "Sécurité & anonymisation",
      badge: "RGPD",
      text: "Données pseudonymisées, seuils minimum de répondants, hébergement en Europe, droits d’accès maîtrisés.",
      bullets: [
        "Seuil minimum par groupe",
        "Aucune donnée individuelle exposée",
        "Parcours salarié volontaire",
      ],
    },
  ];

  const actors = [
    {
      avatar: "👩‍💼",
      title: "Direction & DRH",
      subtitle: "Piloter et sécuriser la stratégie sociale",
      benefits: [
        "Vision globale de l’ambiance sociale",
        "Aide à la décision basée sur des faits",
        "Alignement avec les obligations DUERP",
      ],
      quote:
        "“Enfin un outil qui parle à la fois émotions, risques et indicateurs.”",
    },
    {
      avatar: "🤝",
      title: "CSE & Représentants",
      subtitle: "Donner de la voix aux salariés",
      benefits: [
        "Données anonymisées, non manipulables",
        "Support neutre pour le dialogue social",
        "Suivi des engagements employeur",
      ],
      quote:
        "“Les échanges en CSE sont plus factuels, moins dans le ressenti brut.”",
    },
    {
      avatar: "🧑‍🏭",
      title: "Managers de terrain",
      subtitle: "Agir sans trahir la confiance",
      benefits: [
        "Alertes non nominatives sur les tensions",
        "Ressources d’accompagnement prêtes à l’emploi",
        "Support dans les discussions difficiles",
      ],
      quote:
        "“Je peux anticiper sans mettre mes équipes sous microscope permanent.”",
    },
  ];

  const compliance = [
    {
      title: "Code du Travail L4121-1",
      label: "Prévention des risques",
      status: "Aligné",
    },
    {
      title: "DUERP & CSSCT",
      label: "Traçabilité & preuves",
      status: "Structuré",
    },
    {
      title: "RGPD (art. 6 & 9)",
      label: "Données sensibles émotionnelles",
      status: "Sécurisé",
    },
    {
      title: "Recommandations INRS RPS",
      label: "Axes de risques psychosociaux",
      status: "Inspiré",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F7F6] via-[#EAF4F3] to-[#E9F9F5] text-[#212121]">
      <Navigation />

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="pt-28 pb-20 px-6 relative overflow-hidden"
      >
        {/* Halo d’ambiance */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#5B4B8A]/25 blur-[160px] opacity-60 animate-breathe -z-10" />
        <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] w-[380px] h-[380px] bg-[#4FD1C5]/30 blur-[120px] opacity-60 animate-breathe-slow -z-10" />

        {/* Lucioles */}
        <div className="absolute inset-0 -z-10 opacity-40">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/80 rounded-full animate-firefly"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div
          className={`container mx-auto grid lg:grid-cols-2 gap-10 items-center ${
            heroVisible ? "scroll-reveal visible" : "scroll-reveal"
          }`}
        >
          {/* Colonne texte */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="border-primary/40 text-primary">
                SaaS RH • IA émotionnelle • Prévention RPS
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-[#5B4B8A] via-[#4FD1C5] to-[#5B4B8A] bg-clip-text text-transparent">
              La plateforme qui écoute vos équipes
              <br />
              et sécurise vos obligations RPS
            </h1>

            <p className="text-lg text-[#212121]/75 mb-6 max-w-xl leading-relaxed">
              ZÉNA écoute les émotions. QVT Box structure les risques.  
              Ensemble, ils offrent aux RH, CSE et managers un cockpit unique pour
              prévenir les burn-out, nourrir le dialogue social et documenter les actions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Link to={user ? "/dashboard" : "/auth"}>
                <Button className="px-6 py-3 bg-[#5B4B8A] hover:bg-[#4a3d7a] text-white shadow-lg rounded-full flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Demander une démo personnalisée
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-full border-[#4FD1C5] text-[#005B5F] hover:bg-[#E9F9F5]"
                >
                  Parler à notre équipe QVT
                </Button>
              </Link>
            </div>

            <p className="text-xs text-[#212121]/60">
              Aucune donnée nominative exposée • Compatible RGPD • Pensé pour les équipes
              terrain, distantes et hybrides.
            </p>
          </div>

          {/* Colonne visuel */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white/60 backdrop-blur">
              <img
                src={saasDashboard}
                alt="Tableau de bord QVT Box SaaS"
                className="w-full h-[360px] object-cover"
              />
            </div>
            {/* Bulle ZÉNA */}
            <div className="absolute -bottom-8 -left-6 bg-white/90 rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-[#4FD1C5]/40">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5B4B8A] to-[#4FD1C5] flex items-center justify-center text-white text-sm font-bold">
                ZÉNA
              </div>
              <p className="text-xs text-[#212121]/80 leading-snug">
                “Je veille 24/7 sur l’ambiance émotionnelle de vos équipes, sans jamais
                trahir leur confiance.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PILIERS ÉCOUTER / ANALYSER / AGIR ============== */}
      <section className="py-14 px-6 bg-white/70">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ce que ZÉNA entend, ce que vous pouvez piloter
          </h2>
          <p className="text-[#212121]/70 mb-10 text-base md:text-lg">
            QVT Box fait la jonction entre le vécu émotionnel des salariés et les
            responsabilités juridiques et managériales de l’entreprise.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {corePillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.title}
                  className={`border-none shadow-md bg-white/90 backdrop-blur stagger-item ${
                    featureVisible.has(index) ? "visible" : ""
                  }`}
                  ref={index === 0 ? featureRef : undefined}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#4FD1C5]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#4FD1C5]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{pillar.title}</h3>
                    <p className="text-sm text-[#212121]/70 leading-relaxed">
                      {pillar.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== FONCTIONNALITÉS CLÉS ============== */}
      <section className="py-16 px-6 bg-gradient-to-b from-white/80 to-[#F2F7F6]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Fonctionnalités clés pour vos obligations et votre dialogue social
            </h2>
            <p className="text-[#212121]/70 max-w-3xl mx-auto">
              Un SaaS conçu avec une double exigence : parler aux RH, CSE et managers
              avec le langage de la loi, tout en respectant les émotions des salariés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className={`shadow-lg border border-white/60 bg-white/90 stagger-item ${
                    featureVisible.has(index + 1) ? "visible" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#5B4B8A]/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#5B4B8A]" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {feature.badge}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-[#212121]/80">{feature.text}</p>
                    <ul className="space-y-1 text-sm text-[#212121]/70">
                      {feature.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#4FD1C5] mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== ACTEURS ============== */}
      <section ref={actorRef} className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Une seule plateforme, trois publics clés
            </h2>
            <p className="text-[#212121]/70 max-w-3xl mx-auto">
              Tout le monde regarde les mêmes réalités, mais avec des angles différents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {actors.map((a, index) => (
              <Card
                key={a.title}
                className={`shadow-md border border-[#E5E7EB] bg-white/95 stagger-item ${
                  actorVisible.has(index) ? "visible" : ""
                }`}
              >
                <CardHeader className="pb-3 text-center">
                  <div className="text-5xl mb-3">{a.avatar}</div>
                  <CardTitle className="text-lg mb-1">{a.title}</CardTitle>
                  <p className="text-xs text-[#6B7280]">{a.subtitle}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm text-[#374151]">
                    {a.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#4FD1C5] mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-[#E5E7EB]">
                    <p className="text-xs italic text-[#4B5563]">“{a.quote}”</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CONFORMITÉ ============== */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Conformité légale & éthique au cœur du produit
              </h2>
              <p className="mb-6 text-sm md:text-base text-white/90 leading-relaxed">
                QVT Box ne se contente pas de “prendre le pouls”. La plateforme vous
                aide à documenter vos actions, préparer vos DUERP, et structurer vos
                réponses pour les CSSCT, inspecteurs du travail et partenaires sociaux.
              </p>
              <div className="flex flex-wrap gap-3">
                {compliance.map((c) => (
                  <div
                    key={c.title}
                    className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-left text-xs md:text-sm"
                  >
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-white/80">{c.label}</p>
                    <p className="text-white/60 text-[11px] mt-1">
                      Statut : <span className="font-semibold">{c.status}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-white/10 backdrop-blur">
                <img
                  src={workplaceWellness}
                  alt="Environnement de travail serein"
                  className="w-full h-[260px] md:h-[320px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-4 bg-white/90 text-[#111827] text-xs rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#5B4B8A]" />
                <span>
                  Pensé avec des professionnels de santé au travail et des experts RPS.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== DEMO INTERACTIVE (USER CONNECTÉ) ============== */}
      {user && (
        <section className="py-16 px-6 bg-white/80">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Explorer la plateforme en conditions réelles
              </h2>
              <p className="text-[#4B5563] max-w-3xl mx-auto text-sm md:text-base">
                Utilisez vos propres données de test pour voir comment les alertes,
                dashboards et évaluations s’articulent.
              </p>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Tableau de bord
                </TabsTrigger>
                <TabsTrigger value="evaluation" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Évaluation QVT
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-8">
                <AlertDashboard />
              </TabsContent>
              <TabsContent value="evaluation" className="mt-8">
                <EvaluationForm />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* ============== MÉTÉO ÉMOTIONNELLE ============== */}
      <section className="py-16 px-6 bg-[#F2F7F6]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              La météo émotionnelle de votre entreprise, en un coup d’œil
            </h2>
            <p className="text-[#4B5563] max-w-3xl mx-auto text-sm md:text-base">
              Visualisez les zones de tension, les poches d’énergie positive et
              l’effet de vos actions QVT dans le temps.
            </p>
          </div>
          <EmotionalWeatherMap />
        </div>
      </section>

      {/* ============== CTA FINAL ============== */}
      <section
        ref={ctaRef}
        className={`py-20 px-6 bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] text-white text-center ${
          ctaVisible ? "scroll-reveal visible" : "scroll-reveal"
        }`}
      >
        <div className="container mx-auto max-w-3xl">
          <Sparkles className="w-8 h-8 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à faire de la prévention RPS un avantage stratégique ?
          </h2>
          <p className="text-white/90 mb-8 text-sm md:text-base leading-relaxed">
            Demandez une démo QVT Box + ZÉNA et construisons ensemble un plan
            d’écoute émotionnelle, de prévention et de mise en conformité pour vos
            équipes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button
                size="lg"
                className="bg-white text-[#5B4B8A] hover:bg-white/90 rounded-full px-8 py-3"
              >
                Demander une démo personnalisée
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8 py-3"
              >
                Être rappelé par un expert QVT
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfessionalSaasPage;
