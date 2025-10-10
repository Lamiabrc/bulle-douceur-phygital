// src/pages/AboutPage.tsx
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Boxes,
  Globe2,
  ArrowRight,
  Users,
  CheckCircle,
} from "lucide-react";

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
import lamiaPortrait from "@/assets/lamia-portrait.jpg";

const brand = {
  violet: "#8B5CF6",
  turquoise: "#00B0B9",
  canard: "#005B5F",
};

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
          color: "transparent",
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
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        ogImage="/og-image.png"
        type="article"
      />
      <Navigation />

      {/* HERO */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <img
          src={heroTeam}
          alt={t("about.hero.imageAlt")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,91,95,0.85)] via-[rgba(0,91,95,0.55)] to-transparent" />
        <div className="absolute -top-10 right-10 w-48 h-48 bg-white/15 rounded-full blur-3xl animate-pulse" />

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5 shadow bg-white/90 text-[color:#005B5F]">
              <Sparkles className="h-4 w-4" />
              {t("about.hero.badge")}
            </div>

            <HeadingFR as="h1" className="mb-2">
              {t("about.hero.title")}
            </HeadingFR>
            <p className="mt-2 text-white/80 italic">{t("about.hero.subtitle")}</p>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl">
              {t("about.hero.description")}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="px-5 py-3 rounded-2xl font-medium shadow hover:shadow-lg transition bg-white text-primary"
              >
                {t("about.hero.cta1")}
              </a>
              <a
                href="/auth"
                className="px-5 py-3 rounded-2xl font-medium border hover:shadow transition text-white border-white"
              >
                {t("about.hero.cta2")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROMESSES */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-[#F2F7F6] via-white to-[#E9FAF8]">
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <HeadingFR>{t("about.promises.title")}</HeadingFR>
            <p className="text-foreground/80 mb-4">{t("about.promises.description")}</p>
            <p className="text-foreground/80 mb-6">{t("about.promises.approach")}</p>

            <p className="text-lg text-[color:#005B5F] font-semibold mb-4">
              {t("about.promises.commitment")}
            </p>

            <div className="mt-6 grid gap-3">
              {[
                { icon: <HeartHandshake className="h-5 w-5" />, text: t("about.promises.feature1") },
                { icon: <ShieldCheck className="h-5 w-5" />, text: t("about.promises.feature2") },
                { icon: <Boxes className="h-5 w-5" />, text: t("about.promises.feature3") },
                { icon: <Globe2 className="h-5 w-5" />, text: t("about.promises.feature4") },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 rounded-2xl bg-white shadow-floating border border-transparent hover:border-[#00B0B9]/50 transition-transform hover:-translate-y-1"
                >
                  <span className="mt-0.5 text-[color:#00B0B9]">{item.icon}</span>
                  <p className="leading-relaxed text-foreground/90">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[qvtBoxImage, boxPA, imgAlimentaire, imgCosmetique].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                <img src={src} alt={t("about.promises.galleryAlt")} className="w-full h-48 md:h-56 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FONDATRICE */}
      <section className="py-20 px-6 bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl top-10 left-10" />
          <div className="absolute w-80 h-80 bg-[#00B0B9]/10 rounded-full blur-3xl bottom-10 right-10" />
        </div>

        <div className="relative container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <img src={lamiaPortrait} alt="Portrait de Lamia Bréchet" className="w-full h-[420px] object-cover" loading="lazy" />
          </div>

          <div>
            <HeadingFR>{t("about.founder.title")}</HeadingFR>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Fondatrice de QVT Box, Lamia Bréchet incarne une vision simple : 
              <strong> replacer l’humain et l’émotion au cœur de la performance.</strong> 
              Après plus de dix ans dans le monde de l’entreprise et du pilotage opérationnel, 
              elle décide de créer une solution qui allie IA émotionnelle, impact social et Made in France.
            </p>

            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border-l-4 border-[color:#00B0B9] shadow-inner mb-6">
              <p className="text-[color:#005B5F] italic">
                « Je crois profondément qu’écouter, c’est déjà agir. QVT Box est née de ce besoin : 
                aider les entreprises à mieux comprendre ce que leurs collaborateurs ne disent pas toujours. »
              </p>
            </div>

            <p className="font-semibold text-[color:#005B5F] mb-8">
              – Lamia Bréchet, Fondatrice de QVT Box
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { t: "Innovation sociale", d: "Allier IA et bien-être au service du collectif." },
                { t: "Ancrage local", d: "Produits Made in France et partenariats éthiques." },
                { t: "Prévention", d: "Agir avant que la fatigue morale ne s’installe." },
                { t: "Espoir", d: "Redonner du sens, de la confiance et de la lumière." },
              ].map((c) => (
                <Card key={c.t} className="bg-white shadow-sm border hover:shadow-md transition">
                  <CardContent className="p-4">
                    <p className="font-medium text-[color:#005B5F]">{c.t}</p>
                    <p className="text-sm text-foreground/70">{c.d}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ... le reste de tes sections (manifeste, entreprises, partenaires, etc.) inchangé ... */}

      <Footer />
    </div>
  );
};

export default AboutPage;
