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

// ✅ Images présentes dans tes assets (déjà utilisées ailleurs)
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

const brand = {
  violet: "#8B5CF6",
  turquoise: "#00B0B9",
  canard: "#005B5F",
  noir: "#212121",
  blancCasse: "#F2F7F6",
} as const;

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="À propos — Manifeste QVT Box"
        description="QVT Box : IA qui écoute, box qui agissent. Une démarche phygitale française, utile et exportable. Découvrez notre manifeste et notre histoire."
        ogImage="/og-image.png"
        type="article"
      />

      <Navigation />

      {/* HERO avec image + overlay pour lisibilité */}
      <section className="relative pt-28 pb-16">
        <img
          src={heroTeam}
          alt="Équipe au travail dans une ambiance positive"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/30" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5 shadow bg-white/90 text-[color:var(--canard)]"
              style={{ color: brand.canard }}
            >
              <Sparkles className="h-4 w-4" />
              Manifeste — « La luciole » QVT
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.06] text-white">
              S’occuper des salariés :
              <span className="block text-[color:#8B5CF6]">notre fierté française</span>
              <span className="block text-[color:#00B0B9]">notre force exportable</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl">
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

      {/* 4 promesses avec mosaïque images */}
      <section className="py-14 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Écouter, prévenir, <span className="text-primary">agir</span>
            </h2>
            <p className="mt-3 text-foreground/80">
              Notre approche phygitale : l’app détecte les besoins, la box répond.
              Simple, lisible, responsabilisante — pour les salariés, les managers, les RH et le CSE.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                {
                  icon: <HeartHandshake className="h-5 w-5" />,
                  text: 'Écoute sincère (« Ça va ? » → score QVT 1→15)',
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  text: "Alertes RPS et tendances anonymisées en temps réel",
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
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur border">
                  <span className="mt-0.5 text-[color:#00B0B9]">{item.icon}</span>
                  <p className="leading-relaxed text-foreground/90">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mosaïque visuelle 2x2 */}
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

      {/* Histoire de Lamia + timeline + image pleine largeur */}
      <section className="py-14 px-6 bg-muted/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline">Notre Histoire</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">De l’expérience au terrain, à l’action</h2>
            <p className="text-foreground/70 mt-2 max-w-3xl mx-auto">
              Après <strong>15 ans de salariat</strong> et d’accompagnement d’équipes,
              Lamia lance QVT Box en <strong>2024</strong> : une démarche lisible et utile, pensée avec et pour les salariés.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                year: "2024",
                title: "Idée & cadrage",
                text: "Un score QVT 1→15 compréhensible par tous et des actions concrètes.",
              },
              {
                year: "2025",
                title: "Pilotes & itérations",
                text: "Co-construction avec les équipes. Lancement de la Box Pouvoir d’Achat.",
              },
              {
                year: "…",
                title: "Déploiement international",
                text: "Réseau de producteurs français, logistique export, support multi-sites.",
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

      {/* Pour les entreprises (avec image) */}
      <section id="entreprise" className="py-16 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <img
              src={shippingStation}
              alt="Préparation et expédition soignée des Box"
              className="w-full h-[360px] object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-semibold" style={{ color: brand.canard }}>
              Pour les entreprises
            </h3>
            <p className="text-foreground/80">
              L’app détecte les besoins, la box répond. Politique QVT tangible, mesurable,
              et appréciée. Marque employeur renforcée, absentéisme réduit, engagement accru.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
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

            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-start gap-3">
                <Building2 className="h-6 w-6" style={{ color: brand.violet }} />
                <div className="space-y-2">
                  <p className="font-semibold">Nos engagements</p>
                  <ul className="space-y-1 text-sm text-foreground/80">
                    <li className="flex gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                      Respect RGPD, données anonymisées, éthique IA
                    </li>
                    <li className="flex gap-2">
                      <Leaf className="h-4 w-4 text-primary mt-0.5" />
                      Circuits courts, produits responsables, savoir-faire local
                    </li>
                    <li className="flex gap-2">
                      <Megaphone className="h-4 w-4 text-primary mt-0.5" />
                      Kit de communication interne (lancement & embarquement)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
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

      {/* Preuve sociale / partenaires français */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm uppercase tracking-wider text-foreground/60">Partenaires & producteurs locaux</p>
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

      {/* Pour les fournisseurs (avec images de contenu) */}
      <section id="fournisseurs" className="py-16 px-6 bg-muted/40">
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
            <div className="flex items-center gap-3 mb-5">
              <Factory className="h-6 w-6" style={{ color: brand.violet }} />
              <h3 className="text-2xl md:text-3xl font-semibold" style={{ color: brand.canard }}>
                Pour nos fournisseurs partenaires
              </h3>
            </div>

            <p className="mb-6 text-foreground/80">
              QVT Box est une <strong>vitrine collective</strong> : une exigence sociale française
              + une qualité « Made in France » = un <strong>rayonnement international</strong>.
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

      {/* Bande d’impact (statistiques) */}
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

      {/* Témoignage + image */}
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
          <h2 className="text-4xl font-bold text-white mb-4">Envie d’une QVT utile et sensible ?</h2>
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
