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
  CheckCircle,
} from "lucide-react";

// Images existantes de ton projet
import heroTeam from "@/assets/hero-workplace-team.jpg";
import qvtBoxImage from "@/assets/qvt-box-products.jpg";
import teamPro from "@/assets/professional-team-meeting.jpg";
import partnersLocal from "@/assets/partners-local-producers.webp";
import shippingStation from "@/assets/shipping-station-parcel.webp";
import boxPA from "@/assets/box-pouvoir-achat.webp";
import imgAlimentaire from "@/assets/products-alimentaire.jpg";
import imgHygiene from "@/assets/products-hygiene.jpg";
import imgCosmetique from "@/assets/products-cosmetique.jpg";
import imgSurprise from "@/assets/products-surprise.jpg";

// 👉 Si tu as un portrait fondateur : place "lamia-portrait.jpg" dans src/assets/
import lamiaPortrait from "@/assets/lamia-portrait.jpg"; // si le fichier n’existe pas, remplace par teamPro

const brand = {
  violet: "#8B5CF6",
  turquoise: "#00B0B9",
  canard: "#005B5F",
};

// Titre tricolore 🇫🇷 + petite barre décorative
function HeadingFR({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  return (
    <div className={`mb-6 ${className}`}>
      <Tag
        className="font-bold leading-tight tracking-tight text-3xl md:text-4xl"
        style={{
          background:
            "linear-gradient(90deg, #2563EB 0%, #ffffff 50%, #DC2626 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          // ombre légère pour que le “blanc” se lise sur fond clair
          textShadow:
            "0 0 1px rgba(0,0,0,0.07), 0 0 12px rgba(255,255,255,0.35)",
        }}
      >
        {children}
      </Tag>
      <div className="mt-3 h-1.5 w-28 rounded-full overflow-hidden flex">
        <span className="flex-1 bg-blue-600" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-red-600" />
      </div>
    </div>
  );
}

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="À propos — Manifeste QVT Box"
        description="QVT Box : IA qui écoute, box qui agissent. Une démarche phygitale française, utile et exportable. Découvrez notre manifeste, la fondatrice et nos engagements."
        ogImage="/og-image.png"
        type="article"
      />

      <Navigation />

      {/* HERO */}
      <section className="relative pt-28 pb-16">
        <img
          src={heroTeam}
          alt="Équipe au travail dans une ambiance positive"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5 shadow bg-white/90 text-[color:#005B5F]">
              <Sparkles className="h-4 w-4" />
              Manifeste — « La luciole » QVT
            </div>

            <HeadingFR as="h1" className="mb-2" >
              S’occuper des salariés : notre fierté française — notre force exportable
            </HeadingFR>

            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl">
              QVT Box réunit une application d’<strong>écoute émotionnelle</strong> et des
              <strong> box utiles</strong> 100% françaises. On mesure simplement, on prévient tôt,
              on agit concrètement. Résultat : des équipes soutenues, un dialogue social vivant,
              un impact immédiat.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="px-5 py-3 rounded-2xl font-medium shadow hover:shadow-lg transition bg-white text-primary"
              >
                Nous contacter
              </a>
              <a
                href="/auth"
                className="px-5 py-3 rounded-2xl font-medium border hover:shadow transition text-white border-white"
              >
                Commencer l’évaluation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Promesses + mosaïque */}
      <section className="py-14 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <HeadingFR>Écouter, prévenir, agir</HeadingFR>
            <p className="text-foreground/80">
              Notre approche phygitale : l’app détecte les besoins, la box répond.
              Simple, lisible, responsabilisante — pour salariés, managers, RH et CSE.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                {
                  icon: <HeartHandshake className="h-5 w-5" />,
                  text: 'Écoute sincère : « Ça va ? » → score QVT 1→15',
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  text: "Alertes RPS & tendances anonymisées en temps réel",
                },
                {
                  icon: <Boxes className="h-5 w-5" />,
                  text: "Box utiles & locales : passer du discours à l’acte",
                },
                {
                  icon: <Globe2 className="h-5 w-5" />,
                  text: "Savoir-faire français qui rayonne à l’international",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/85 backdrop-blur border">
                  <span className="mt-0.5 text-[color:#00B0B9]">{item.icon}</span>
                  <p className="leading-relaxed text-foreground/90">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[qvtBoxImage, boxPA, imgAlimentaire, imgCosmetique].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                <img
                  src={src}
                  alt="Sélection visuelle QVT Box"
                  className="w-full h-48 md:h-56 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎯 Fondatrice */}
      <section className="py-14 px-6 bg-muted/40">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <img
              src={lamiaPortrait || teamPro}
              alt="Lamia — fondatrice de QVT Box"
              className="w-full h-[420px] object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <HeadingFR>La fondatrice — Lamia</HeadingFR>
            <p className="text-foreground/80">
              Après <strong>15 ans de salariat</strong> et d’accompagnement d’équipes,
              Lamia lance QVT Box en <strong>2024</strong>. Une conviction : la question
              « Ça va ? » peut devenir un **levier d’écoute et d’action**, si on
              la mesure simplement et qu’on y répond concrètement. D’où l’union
              d’une app claire (score 1→15, tendances, alertes) et de box utiles
              **Made in France** qui soulagent le quotidien.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                { t: "Pragmatisme", d: "Mesurer utile, agir vite" },
                { t: "Bienveillance", d: "Aucune stigmatisation, données anonymisées" },
                { t: "Ancrage local", d: "Producteurs & artisans français" },
                { t: "Ouverture", d: "Déploiement multi-sites & international" },
              ].map((c) => (
                <Card key={c.t} className="bg-white shadow-sm border">
                  <CardContent className="p-4">
                    <p className="font-medium">{c.t}</p>
                    <p className="text-sm text-foreground/70">{c.d}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium shadow hover:shadow-lg transition"
                style={{ backgroundColor: brand.violet, color: "#fff" }}
              >
                Écrire à Lamia
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/about#manifeste"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border hover:shadow transition"
                style={{ borderColor: brand.canard, color: brand.canard }}
              >
                Lire le manifeste
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire (timeline) */}
      <section id="manifeste" className="py-14 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline">Notre Histoire</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                year: "2024",
                title: "Idée & cadrage",
                text: "Un score QVT 1→15 pour parler vrai, et des actions concrètes pour soutenir vraiment.",
              },
              {
                year: "2025",
                title: "Pilotes & itérations",
                text: "Co-construction avec les équipes. Lancement de la Box Pouvoir d’Achat.",
              },
              {
                year: "…",
                title: "Déploiement international",
                text: "Producteurs français, logistique export, support multi-sites.",
              },
            ].map((b) => (
              <Card key={b.year} className="card-professional">
                <CardContent className="p-6">
                  <div className="text-primary font-bold text-sm">{b.year}</div>
                  <HeadingFR as="h3" className="mb-1 text-2xl">{b.title}</HeadingFR>
                  <p className="text-sm text-foreground/70">{b.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-3xl overflow-hidden ring-1 ring-black/5 shadow">
            <img
              src={teamPro}
              alt="Réunion d'équipe autour de la transformation QVT"
              className="w-full h-[320px] md:h-[420px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Pour les entreprises */}
      <section className="py-16 px-6 bg-muted/40">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <img
              src={shippingStation}
              alt="Préparation et expédition soignée des Box"
              className="w-full h-[360px] object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <HeadingFR>Pour les entreprises</HeadingFR>
            <p className="text-foreground/80">
              L’app détecte les besoins, la box répond. Politique QVT tangible, mesurable,
              et appréciée. Marque employeur renforcée, absentéisme réduit, engagement accru.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {[
                { t: "Score QVT 1→15", d: "Question simple, insights actionnables" },
                { t: "Alertes RPS", d: "Prévention en temps réel" },
                { t: "Dashboard RH/CSE", d: "Tendances anonymisées, heatmaps" },
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

      {/* Partenaires */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <HeadingFR>Partenaires & producteurs locaux</HeadingFR>
          </div>
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md">
            <img
              src={partnersLocal}
              alt="Producteurs et artisans partenaires en France"
              className="w-full h-[260px] md:h-[320px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Fournisseurs */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <div className="grid grid-cols-2 gap-2 p-2 bg-white">
              {[imgHygiene, imgSurprise, imgAlimentaire, imgCosmetique].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Exemples de produits français"
                  className="w-full h-40 object-cover rounded-xl"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div>
            <HeadingFR>Pour nos fournisseurs partenaires</HeadingFR>
            <p className="mb-6 text-foreground/80">
              QVT Box est une <strong>vitrine collective</strong> : une exigence sociale française
              + une qualité « Made in France » = un <strong>rayonnement international</strong>.
              Chaque box exporte un morceau de notre savoir-faire vers de nouveaux marchés.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Accès marchés B2B", desc: "Grandes entreprises, ETI, administrations" },
                { title: "Visibilité co-marque", desc: "Présence dans les box & médias QVT Box" },
                { title: "Données marché", desc: "Tendances d’usage agrégées" },
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

      {/* Bande d’impact */}
      <section className="py-12 px-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { k: "1–15", d: "Score QVT lisible" },
            { k: "72h", d: "Déploiement pilote" },
            { k: "100%", d: "Made in France" },
            { k: "50+", d: "Pays desservis" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-white/10 p-4">
              <div className="text-2xl font-bold">{s.k}</div>
              <div className="text-sm opacity-90">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignage */}
      <section className="py-16 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={qvtBoxImage}
            alt="Produits QVT Box en situation"
            className="rounded-2xl shadow-floating object-cover w-full h-96"
            loading="lazy"
          />

          <div className="space-y-6">
            <div className="card-professional p-8">
              <blockquote className="text-lg italic text-foreground/90 mb-6">
                « On a enfin une QVT qui parle vrai : on écoute simplement, on voit les tendances,
                et surtout on agit. Les box font un bien fou. »
              </blockquote>
              <div className="border-t pt-4">
                <p className="font-semibold text-foreground">Catherine Moreau</p>
                <p className="text-sm text-foreground/60">DRH, TechnoServices (320 salariés)</p>
              </div>
            </div>

            <ul className="space-y-2">
              {[
                "Export DUERP/CSV prêt à l’emploi",
                "Alertes RPS automatiques et bienveillantes",
                "Box Pouvoir d’Achat — standard mensuelle",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-foreground/85">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <HeadingFR>Envie d’une QVT utile et sensible ?</HeadingFR>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            Lancez une démarche participative alignée ANACT : écoute, prévention, action.
            Une IA qui comprend — des gestes concrets qui soulagent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium shadow hover:shadow-lg transition bg-white text-primary"
            >
              Nous contacter
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/auth"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium border hover:shadow transition text-white border-white"
            >
              Commencer l’évaluation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
