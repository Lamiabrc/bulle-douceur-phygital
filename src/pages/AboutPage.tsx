// src/pages/About.tsx
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Handshake,
  Target,
  Users,
  Lightbulb,
  Award,
  BookOpen,
  LineChart,
  Leaf,
  Globe,
} from "lucide-react";

// ✅ Remplace par tes images locales si besoin
import lamiaPhoto from "@/assets/lamia-portrait.jpg";
import atelierExpedition from "@/assets/atelier-expedition.jpg";
import atelierProduits from "@/assets/atelier-produits-francais.jpg";

const About: React.FC = () => {
  const values = [
    { icon: Heart, title: "Humain d’abord", desc: "Écoute active, respect, et pragmatisme. La QVT n’est pas un slogan, c’est une relation." },
    { icon: ShieldCheck, title: "Prévention RPS", desc: "Identifier tôt les signaux faibles et agir à temps, sans stigmatiser." },
    { icon: LineChart, title: "Mesure utile", desc: "Un score QVCT clair (1–15), lisible par tous, pour décider vite et bien." },
    { icon: Handshake, title: "Co-construction", desc: "RH, CSE, managers et salariés : chacun a une voix, chacun a un rôle." },
    { icon: Leaf, title: "Made in France", desc: "Des box 100% françaises, à forte valeur perçue, sans greenwashing." },
    { icon: Globe, title: "Impact à l’échelle", desc: "Livraison multi-sites et internationale, sans sacrifier la qualité." },
  ];

  const timeline = [
    {
      year: "2021",
      title: "Premières missions QVT",
      desc: "Accompagnement de PME et ETI en Bretagne — ateliers, écoute terrain, premiers indicateurs maison.",
    },
    {
      year: "2022",
      title: "Naissance de QVT Box",
      desc: "Allier mesure QVCT + action concrète : des box utiles et françaises pour matérialiser la démarche.",
    },
    {
      year: "2023",
      title: "SaaS interne",
      desc: "Un tableau de bord simple (1–15), alertes RPS, export DUERP. C’est utile ou ça n’existe pas.",
    },
    {
      year: "2024–2025",
      title: "Déploiement",
      desc: "Réseau de partenaires locaux, logistique multi-sites, et international. Montée en charge maîtrisée.",
    },
  ];

  const expertise = [
    "QVCT & Prévention des RPS",
    "Dialogue social & CSE",
    "Onboarding managers",
    "Baromètres bien-être courts",
    "DUERP et obligations légales",
    "Conception d’expériences salariés",
  ];

  const reasons = [
    { title: "Lisibilité immédiate", desc: "Un score simple (1–15) — fini les rapports illisibles. Décidez vite." },
    { title: "Action concrète", desc: "Des Box utiles et appréciées : reconnaissance, pouvoir d’achat, cohésion." },
    { title: "Conformité maîtrisée", desc: "Export DUERP, confidentialité, collecte responsable — sans frictions." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO */}
      <section className="pt-24 pb-10 px-6 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="secondary" className="mb-3">À propos</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                QVT Box — un projet utile, humain et <span className="text-primary">opérationnel</span>
              </h1>
              <p className="mt-3 text-foreground/70 text-lg">
                Je m’appelle <strong>Lamia</strong>. J’ai créé QVT Box pour rendre la QVCT
                lisible et actionnable : <em>mesurer ce qui compte</em>, <em>prévenir les RPS</em> et
                <em> matérialiser la reconnaissance</em> avec des box 100% Made in France.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="whitespace-nowrap">
                  <Link to="/contact">Parler à Lamia</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="whitespace-nowrap">
                  <Link to="/saas">Voir la licence SaaS</Link>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-foreground/60">
                <div className="inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Score QVCT 1–15
                </div>
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Export DUERP
                </div>
                <div className="inline-flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-primary" />
                  Box utiles & françaises
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img
                  src={lamiaPhoto}
                  alt="Lamia — fondatrice QVT Box"
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pointer-events-none absolute -bottom-8 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -top-8 -right-10 h-28 w-28 rounded-full bg-secondary/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Notre manière de faire</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="bg-gradient-to-b from-muted/40 to-background transition">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{v.title}</CardTitle>
                    <p className="text-sm text-foreground/70 mt-2">{v.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="py-12 px-6 bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">L’histoire en 4 étapes</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {timeline.map((t) => (
              <Card key={t.year}>
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="text-xs">{t.year}</Badge>
                  <CardTitle className="text-lg mt-1">{t.title}</CardTitle>
                  <CardDescription>{t.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ATELIER / MADE IN FRANCE */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Badge variant="secondary">100% Made in France</Badge>
              <h3 className="text-2xl font-semibold">Des box utiles, locales, et appréciées</h3>
              <p className="text-foreground/70">
                Nos box ne sont pas des goodies. Elles contiennent des produits **utiles** du quotidien (pouvoir d’achat,
                mobilité, récupération, cohésion…), sourcés auprès d’artisans et de marques françaises. L’objectif :
                un geste de reconnaissance **concret** et **crédible**.
              </p>
              <ul className="text-sm text-foreground/80 space-y-2">
                <li className="flex items-start gap-2"><Target className="w-4 h-4 text-primary mt-0.5" /> Thématiques adaptées au terrain</li>
                <li className="flex items-start gap-2"><Users className="w-4 h-4 text-primary mt-0.5" /> Personnalisation (logo, message, couleurs)</li>
                <li className="flex items-start gap-2"><Globe className="w-4 h-4 text-primary mt-0.5" /> Multi-sites & international, qualité constante</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="whitespace-nowrap">
                  <Link to="/box">Voir les box</Link>
                </Button>
                <Button asChild variant="outline" className="whitespace-nowrap">
                  <Link to="/international">Livraison internationale</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                <img
                  src={atelierProduits}
                  alt="Produits français sélectionnés pour les box"
                  className="w-full h-[240px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                <img
                  src={atelierExpedition}
                  alt="Atelier d’expédition — préparation des box QVT"
                  className="w-full h-[240px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-12 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-3">Expertise</Badge>
              <h3 className="text-2xl font-semibold">Mon approche (Lamia)</h3>
              <p className="text-foreground/70 mt-2">
                Je privilégie le **terrain** et la **lisibilité**. Pas de promesse magique ni d’usine à gaz.
                On mesure peu mais bien, on prévient sans stresser, on agit avec des gestes qui comptent.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {expertise.map((e) => (
                  <Card key={e} className="border-dashed">
                    <CardContent className="p-3 text-sm">{e}</CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg mt-2">Méthode</CardTitle>
                  <CardDescription>Entretiens, baromètres courts, ateliers managériaux, plan d’action itératif.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg mt-2">Qualité</CardTitle>
                  <CardDescription>Confidentialité, conformité, et traçabilité — sans friction pour vos équipes.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg mt-2">Concret</CardTitle>
                  <CardDescription>Box utiles quand c’est pertinent — pas par principe, toujours avec sens.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* RAISONS DE CHOISIR */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Pourquoi QVT Box ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <Card key={r.title} className="bg-gradient-to-b from-muted/40 to-background">
                <CardContent className="p-6">
                  <CardTitle className="text-lg">{r.title}</CardTitle>
                  <p className="text-sm text-foreground/70 mt-2">{r.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="whitespace-nowrap">
              <Link to="/contact">Discuter de votre contexte</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Construisons une QVCT utile, mesurable et durable
          </h2>
          <p className="text-white/90 mt-2 mb-6 max-w-3xl mx-auto">
            Un échange de 20 minutes suffit pour poser les bases : vos enjeux, votre tempo, nos options.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 whitespace-nowrap">
              <Link to="/contact">Prendre contact</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary whitespace-nowrap">
              <Link to="/box">Découvrir les box</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
