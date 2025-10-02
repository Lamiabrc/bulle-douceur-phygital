// src/pages/AboutPage.tsx
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Boxes,
  Globe2,
  Building2,
  Leaf,
  Megaphone,
  Factory,
  ArrowRight,
  Users,
} from "lucide-react";

const brand = {
  violet: "#8B5CF6", // primary accent (violet)
  turquoise: "#00B0B9", // turquoise accent
  canard: "#005B5F", // teal de ta charte
  noir: "#212121",
  blancCasse: "#F2F7F6",
} as const;

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="À propos — Manifeste QVT Box"
        description="QVT Box : une approche phygitale pour écouter, prévenir et agir. Manifeste entreprise & partenaires — IA émotionnelle + box utiles 100% Made in France."
        ogImage="/og-image.png"
        type="article"
      />

      <Navigation />

      {/* HERO + Manifeste intégré */}
      <section
        className="relative pt-28 pb-16 px-6"
        aria-labelledby="about-hero-title"
        style={{
          background: `radial-gradient(1200px 800px at 10% -10%, rgba(139,92,246,0.16), transparent 60%),
                       radial-gradient(900px 600px at 90% 10%, rgba(0,176,185,0.12), transparent 60%),
                       linear-gradient(180deg, ${brand.blancCasse}, #ffffff)`,
        }}
      >
        {/* petites lucioles CSS (sans framer-motion) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-2 w-2 rounded-full animate-pulse"
              style={{
                background: `radial-gradient(circle, ${brand.turquoise}, transparent 60%)`,
                opacity: 0.35,
                transform: `translate(${(Math.random() * 100).toFixed(2)}vw, ${(Math.random() * 40).toFixed(2)}vh) scale(${0.7 + Math.random() * 0.6})`,
                animationDelay: `${i * 120}ms`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5 shadow bg-white text-[color:var(--canard)]"
                 style={{ color: brand.canard }}>
              <Sparkles className="h-4 w-4" />
              Manifeste — « La luciole » QVT
            </div>

            <h1 id="about-hero-title" className="text-4xl md:text-6xl font-extrabold leading-[1.08]">
              <span className="block" style={{ color: brand.noir }}>
                S’occuper des salariés :
              </span>
              <span className="block" style={{ color: brand.violet }}>
                notre fierté française
              </span>
              <span className="block" style={{ color: brand.canard }}>
                notre force exportable
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              QVT Box transforme l’exigence sociale française en avantage compétitif.
              Nous allions une application d’IA émotionnelle et des box utiles, fabriquées en France,
              pour <strong>écouter</strong>, <strong>prévenir</strong> et <strong>agir concrètement</strong> au bénéfice des salariés.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a
                href="#entreprise"
                className="px-5 py-3 rounded-2xl bg-white shadow hover:shadow-md transition text-sm font-medium"
              >
                Pour les Entreprises
              </a>
              <a
                href="#fournisseurs"
                className="px-5 py-3 rounded-2xl text-sm font-medium shadow hover:shadow-md transition"
                style={{ backgroundColor: brand.violet, color: "#fff" }}
              >
                Pour les Fournisseurs
              </a>
            </div>
          </div>

          {/* 4 promesses clés */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              {
                icon: <HeartHandshake className="h-5 w-5" />,
                text:
                  'Écouter vraiment les salariés (« Ça va ? » mesuré en score QVT 1→15)',
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                text: "Prévenir les RPS et agir rapidement (alertes, tendances anonymisées)",
              },
              {
                icon: <Boxes className="h-5 w-5" />,
                text: "Apporter des réponses concrètes via des box utiles, Made in France",
              },
              {
                icon: <Globe2 className="h-5 w-5" />,
                text: "Ouvrir un rayonnement international à nos partenaires",
              },
            ].map((item, idx) => (
              <Card key={idx} className="bg-white/80 backdrop-blur border">
                <CardContent className="p-4 flex gap-3">
                  <span className="mt-1 text-[color:#00B0B9]">{item.icon}</span>
                  <p className="leading-relaxed text-foreground/90">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline – Lamia & la genèse (2024 -> …) */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline">Notre Histoire</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">De l’expérience terrain à l’action</h2>
            <p className="text-foreground/70 mt-2 max-w-3xl mx-auto">
              15 ans de salariat, d’accompagnement d’équipes et de dialogue social. En <strong>2024</strong>, Lamia lance QVT Box :
              une démarche phygitale simple, utile et collective — pensée pour les salariés, les managers, les RH et les représentants du personnel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                year: "2024",
                title: "Idée & cadrage",
                text:
                  "Après 15 ans de salariat et d’observation des besoins, conception d’un score QVT lisible (1→15) et d’actions concrètes.",
              },
              {
                year: "2025",
                title: "Pilotes & itérations",
                text:
                  "Lancement des pilotes, co-conception avec des équipes. Première Box Pouvoir d’Achat (standard mensuelle).",
              },
              {
                year: "…",
                title: "Déploiement international",
                text:
                  "Partenariats fournisseurs français, export, accompagnement multi-sites.",
              },
            ].map((b) => (
              <Card key={b.year} className="card-professional">
                <CardContent className="p-6">
                  <div className="text-primary font-bold text-sm">{b.year}</div>
                  <h3 className="text-xl font-semibold mt-1">{b.title}</h3>
                  <p className="text-sm text-foreground/70 mt-2">{b.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pour les entreprises */}
      <section id="entreprise" className="py-16 px-6">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-semibold" style={{ color: brand.canard }}>
              Pour les entreprises
            </h3>
            <p className="text-foreground/80">
              Une approche phygitale simple : l’app détecte les besoins, la box répond.
              Résultat : une politique QVT tangible, mesurable et appréciée des équipes.
              Marque employeur renforcée, absentéisme réduit, engagement accru.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { t: "Score QVT 1→15", d: "Question simple, insights actionnables" },
                { t: "Alertes RPS", d: "Prévention en temps réel" },
                { t: "Dashboard RH/CSE", d: "Heatmaps & tendances anonymisées" },
                { t: "Box utiles", d: "Alimentaire / hygiène / ergonomie Made in France" },
              ].map((c) => (
                <Card key={c.t} className="bg-white shadow-sm border">
                  <CardContent className="p-4">
                    <p className="font-medium">{c.t}</p>
                    <p className="text-sm text-foreground/70">{c.d}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-gradient-to-br from-white to-white/70 shadow-xl border">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-6 w-6" style={{ color: brand.violet }} />
              <h4 className="text-xl font-semibold">Engagements QVT Box</h4>
            </div>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5" style={{ color: brand.canard }} />
                <span>Respect RGPD, données anonymisées, éthique IA.</span>
              </li>
              <li className="flex gap-3">
                <Leaf className="h-5 w-5" style={{ color: brand.canard }} />
                <span>Produits responsables, circuits courts, fournisseurs français.</span>
              </li>
              <li className="flex gap-3">
                <Megaphone className="h-5 w-5" style={{ color: brand.canard }} />
                <span>Kit de communication interne fourni (lancement & embarquement).</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium shadow hover:shadow-lg transition"
                style={{ backgroundColor: brand.violet, color: "#fff" }}
              >
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/auth"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border hover:shadow transition"
                style={{ borderColor: brand.canard, color: brand.canard }}
              >
                Commencer l’évaluation
                <Users className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pour les fournisseurs */}
      <section id="fournisseurs" className="py-16 px-6 bg-muted/40">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-3xl p-8 shadow-xl bg-white/90 backdrop-blur border">
            <div className="flex items-center gap-3 mb-5">
              <Factory className="h-6 w-6" style={{ color: brand.violet }} />
              <h3 className="text-2xl md:text-3xl font-semibold" style={{ color: brand.canard }}>
                Pour nos fournisseurs partenaires
              </h3>
            </div>

            <p className="mb-6 text-foreground/80">
              QVT Box est une <strong>vitrine collective</strong> : en unifiant l’exigence sociale française
              et la qualité « made in France », nous ouvrons à nos partenaires un <strong>rayonnement international</strong>.
              Chaque box exporte un morceau de notre savoir-faire vers de nouveaux marchés.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Accès marchés B2B", desc: "Grandes entreprises, ETI, administrations" },
                { title: "Visibilité co-marque", desc: "Présence dans les box & médias QVT Box" },
                { title: "Données marché", desc: "Tendances d’usage agrégées pour innover" },
              ].map((c) => (
                <Card key={c.title} className="bg-white shadow-sm border">
                  <CardContent className="p-5">
                    <p className="font-medium">{c.title}</p>
                    <p className="text-sm text-foreground/70">{c.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:contact@qvtbox.com?subject=Partenariat%20Fournisseur%20QVT%20Box"
                className="px-5 py-3 rounded-2xl text-sm font-medium shadow hover:shadow-lg transition"
                style={{ backgroundColor: brand.turquoise, color: "#fff" }}
              >
                Proposer un produit
              </a>
              <a
                href="/contact"
                className="px-5 py-3 rounded-2xl text-sm font-medium border hover:shadow transition"
                style={{ borderColor: brand.violet, color: brand.violet }}
              >
                Demander le guide fournisseur (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Manifeste */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: brand.canard }}>
            Manifeste
          </h3>
          <p className="text-lg leading-relaxed text-foreground/90">
            La France sait s’occuper de ses salariés. Cette exigence sociale est notre fierté —
            et désormais notre <strong>force exportable</strong>. Avec QVT Box, nous la transformons en valeur :
            une IA qui écoute, des actions concrètes qui soulagent, et un écosystème de fournisseurs français
            qui rayonne à l’international. <strong>Entreprise par entreprise, box après box, nous faisons grandir
            une économie de la considération.</strong>
          </p>

          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium shadow hover:shadow-lg transition"
              style={{ backgroundColor: brand.violet, color: "#fff" }}
            >
              Demander une présentation
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
