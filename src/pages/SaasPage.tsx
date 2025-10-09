// src/pages/Saas.tsx
import React, { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EmotionalWeatherMap from "@/components/EmotionalWeatherMap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Check,
  Crown,
  Shield,
  Sparkles,
  Star,
  Zap,
  ArrowRight,
} from "lucide-react";

// ✅ Image démo (assure-toi qu’elle existe)
import saasImage from "@/assets/saas-dashboard-pro.jpg";

type Currency = "EUR" | "USD";

type Plan = {
  name: "Starter" | "Professional" | "Enterprise";
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  monthlyEUR: number;
  annualEUR: number;
  maxUsers: number | "Illimité";
  features: string[];
  popular?: boolean;
  ctaTo?: string;
};

const BASE_PLANS: Plan[] = [
  {
    name: "Starter",
    description: "Parfait pour les petites équipes",
    icon: Zap,
    monthlyEUR: 29,
    annualEUR: 290, // ~2 mois off
    maxUsers: 25,
    features: [
      "Tableau de bord basique",
      "Sondages bien-être mensuels",
      "Alertes email simples",
      "Rapports standards",
      "Support email",
    ],
  },
  {
    name: "Professional",
    description: "Pour les entreprises en croissance",
    icon: Star,
    monthlyEUR: 79,
    annualEUR: 790, // ~2 mois off
    maxUsers: 100,
    features: [
      "Tableau de bord avancé",
      "IA prédictive",
      "Alertes RPS en temps réel",
      "Analyse par département",
      "Plans d'action automatisés",
      "Intégrations HR",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Solution complète pour grandes organisations",
    icon: Crown,
    monthlyEUR: 199,
    annualEUR: 1990,
    maxUsers: "Illimité",
    features: [
      "Toutes les fonctionnalités Pro",
      "IA prédictive avancée",
      "Tableaux de bord personnalisés",
      "API complète",
      "Conformité RGPD renforcée",
      "Formation équipes",
      "Support dédié 24/7",
      "Déploiement on-premise",
    ],
    ctaTo: "/contact",
  },
];

function formatMoney(value: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "EUR" ? "fr-FR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function getSavingsPercent(monthly: number, annual: number) {
  const monthlyTotal = monthly * 12;
  if (annual >= monthlyTotal) return 0;
  return Math.round(((monthlyTotal - annual) / monthlyTotal) * 100);
}

const SaaS: React.FC = () => {
  // --- Devise ---
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  // ⚖️ Taux simple (statique) — ajuste si besoin
  const FX = 1.08; // 1 EUR ~ 1.08 USD

  const plans = useMemo(() => {
    return BASE_PLANS.map((p) => {
      const monthly = currency === "EUR" ? p.monthlyEUR : p.monthlyEUR * FX;
      const annual = currency === "EUR" ? p.annualEUR : p.annualEUR * FX;
      return {
        ...p,
        monthly,
        annual,
      };
    });
  }, [currency]);

  const arrangedPlans = useMemo(() => {
    const idx = plans.findIndex((p: any) => p.popular);
    if (idx === -1) return plans;
    const arr = [...plans];
    const [pro] = arr.splice(idx, 1);
    arr.splice(1, 0, pro);
    return arr;
  }, [plans]);

  // --- ROI Calculator ---
  const [employees, setEmployees] = useState<number>(100);
  const [benefitPerEmp, setBenefitPerEmp] = useState<number>(8); // € / mois
  const [selectedPlan, setSelectedPlan] = useState<Plan["name"]>("Professional");

  const selected = useMemo(
    () => plans.find((p) => p.name === selectedPlan)!,
    [plans, selectedPlan]
  );

  const annualCost =
    (isAnnual ? selected.annual : selected.monthly) * (isAnnual ? 1 : 12);
  const annualBenefit = employees * benefitPerEmp * 12;
  const roiPct =
    annualCost > 0 ? Math.round(((annualBenefit - annualCost) / annualCost) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Top bar */}
      <div className="sticky top-0 z-30 w-full bg-primary/10 backdrop-blur border-b border-primary/20">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm text-foreground/80">
            Licence SaaS QVT — claire, mesurable, actionnable.
          </p>
        </div>
      </div>

      {/* HERO / DEMO */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Mesurez, prévenez, <span className="text-primary">agissez</span>
            </h1>
            <p className="mt-3 text-foreground/70">
              Score QVCT lisible (1–15), alertes RPS automatiques, export DUERP prêt.
            </p>
          </div>

          <div className="mt-8 relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Link to="/contact">Parler à un expert</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PRICING + CURRENCY TOGGLE */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Tarifs transparents</h2>
            <p className="text-muted-foreground">
              Choisissez le plan adapté à votre organisation
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <span className={`${currency === "EUR" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                EUR €
              </span>
              <Switch
                checked={currency === "USD"}
                onCheckedChange={(checked) => setCurrency(checked ? "USD" : "EUR")}
                aria-label="Basculer EUR/USD"
                className="data-[state=checked]:bg-primary"
              />
              <span className={`${currency === "USD" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                USD $
              </span>

              <div className="mx-4 h-6 w-px bg-border" />
              <span className={`${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Mensuel
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                aria-label="Basculer mensuel/annuel"
                className="data-[state=checked]:bg-primary"
              />
              <span className={`${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Annuel
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2">Jusqu’à 20% d’économie</Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {arrangedPlans.map((plan) => {
              const Icon = plan.icon;
              const price = isAnnual ? (plan as any).annual : (plan as any).monthly;
              const savings = getSavingsPercent(
                (plan as any).monthlyEUR || plan.monthlyEUR,
                (plan as any).annualEUR || plan.annualEUR
              );

              return (
                <Card key={plan.name} className={`relative h-full ${plan.popular ? "border-primary shadow-lg md:scale-105" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Le plus populaire</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon className="text-primary w-6 h-6" />
                </div>
              </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>

                    <div className="mt-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">
                          {formatMoney(price, currency)}
                        </span>
                        <span className="text-muted-foreground ml-1">/{isAnnual ? "an" : "mois"}</span>
                      </div>
                      {isAnnual && savings > 0 && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          Économisez {savings}% vs mensuel
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground mt-2">
                        Jusqu’à {plan.maxUsers} utilisateurs
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {plan.name === "Enterprise" ? (
                      <Button asChild size="lg" className="w-full mb-6 whitespace-nowrap">
                        <Link to={plan.ctaTo || "/contact"}>Nous contacter</Link>
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className={`w-full mb-6 whitespace-nowrap ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Essai gratuit 14 jours
                      </Button>
                    )}

                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <Check className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-sm">{feature}</span>
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

      {/* ROI CALCULATOR */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <CardTitle className="text-2xl">Calculateur de ROI</CardTitle>
                  <CardDescription>
                    Estimez vos gains annuels vs. coût de la licence sélectionnée.
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="whitespace-nowrap">
                  Simple & indicatif
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="grid lg:grid-cols-2 gap-6">
              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Plan</label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as Plan["name"])}
                    className="mt-1 w-full rounded-md border bg-background p-2"
                  >
                    {plans.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} — {formatMoney(isAnnual ? (p as any).annual : (p as any).monthly, currency)}
                        {isAnnual ? "/an" : "/mois"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Nombre de salariés</label>
                  <input
                    type="number"
                    min={1}
                    value={employees}
                    onChange={(e) => setEmployees(Math.max(1, Number(e.target.value || 1)))}
                    className="mt-1 w-full rounded-md border bg-background p-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Gain estimé par salarié / mois ({currency})
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={benefitPerEmp}
                    onChange={(e) => setBenefitPerEmp(Math.max(0, Number(e.target.value || 0)))}
                    className="mt-1 w-full rounded-md border bg-background p-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Exemples : baisse de l’absentéisme, micro-gains de productivité, climat social…
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Résultat indicatif</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Coût licence (annuel)</span>
                    <strong>{formatMoney(annualCost, currency)}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Gains estimés (annuel)</span>
                    <strong>{formatMoney(annualBenefit, currency)}</strong>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span>ROI estimé</span>
                    <strong className={roiPct >= 0 ? "text-green-600" : "text-red-600"}>
                      {roiPct >= 0 ? "+" : ""}
                      {roiPct}%
                    </strong>
                  </div>
                </div>

                <CardFooter className="mt-4 justify-end">
                  <Button asChild size="lg" className="whitespace-nowrap">
                    <Link to="/contact">Obtenir une estimation détaillée</Link>
                  </Button>
                </CardFooter>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Météo Émotionnelle */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Visualisez l'ambiance de votre entreprise</h2>
            <p className="text-muted-foreground">Dashboard en temps réel de la météo émotionnelle par département</p>
          </div>
          <EmotionalWeatherMap />
        </div>
      </section>

      {/* Rassurance */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <Card className="max-w-5xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="text-primary" />
                <h3 className="text-xl font-semibold">Garanties & Sécurité</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mt-4 w-full">
                  <div>
                    <div className="font-medium mb-1">Essai gratuit</div>
                    <div className="text-muted-foreground">14 jours sans engagement</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Conformité RGPD</div>
                    <div className="text-muted-foreground">Données hébergées en France</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Support inclus</div>
                    <div className="text-muted-foreground">Formation & accompagnement</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaaS;
