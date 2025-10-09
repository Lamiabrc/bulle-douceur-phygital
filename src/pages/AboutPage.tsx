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
import lamiaPortrait from "@/assets/lamia-portrait.jpg";

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
      <section className="relative pt-28 pb-16">
        <img
          src={heroTeam}
          alt={t("about.hero.imageAlt")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5 shadow bg-white/90 text-[color:#005B5F]">
              <Sparkles className="h-4 w-4" />
              {t("about.hero.badge")}
            </div>

            <HeadingFR as="h1" className="mb-2">
              {t("about.hero.title")}
            </HeadingFR>

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

      {/* Promesses + mosaïque */}
      <section className="py-14 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <HeadingFR>{t("about.promises.title")}</HeadingFR>
            <p className="text-foreground/80 mb-4">
              {t("about.promises.description")}
            </p>
            <p className="text-foreground/80">
              {t("about.promises.approach")}
            </p>

            <div className="mt-6 grid gap-3">
              {[
                {
                  icon: <HeartHandshake className="h-5 w-5" />,
                  text: t("about.promises.feature1"),
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  text: t("about.promises.feature2"),
                },
                {
                  icon: <Boxes className="h-5 w-5" />,
                  text: t("about.promises.feature3"),
                },
                {
                  icon: <Globe2 className="h-5 w-5" />,
                  text: t("about.promises.feature4"),
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
                  alt={t("about.promises.galleryAlt")}
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
              alt={t("about.founder.imageAlt")}
              className="w-full h-[420px] object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <HeadingFR>{t("about.founder.title")}</HeadingFR>
            <p className="text-foreground/80">
              {t("about.founder.description")}
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                { t: t("about.founder.value1"), d: t("about.founder.value1Desc") },
                { t: t("about.founder.value2"), d: t("about.founder.value2Desc") },
                { t: t("about.founder.value3"), d: t("about.founder.value3Desc") },
                { t: t("about.founder.value4"), d: t("about.founder.value4Desc") },
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
                {t("about.founder.cta1")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/about#manifeste"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border hover:shadow transition"
                style={{ borderColor: brand.canard, color: brand.canard }}
              >
                {t("about.founder.cta2")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire (timeline) */}
      <section id="manifeste" className="py-14 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline">{t("about.history.badge")}</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                year: "2024",
                title: t("about.history.milestone1Title"),
                text: t("about.history.milestone1Desc"),
              },
              {
                year: "2025",
                title: t("about.history.milestone2Title"),
                text: t("about.history.milestone2Desc"),
              },
              {
                year: "…",
                title: t("about.history.milestone3Title"),
                text: t("about.history.milestone3Desc"),
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
              alt={t("about.history.imageAlt")}
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
              alt={t("about.forCompanies.imageAlt")}
              className="w-full h-[360px] object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <HeadingFR>{t("about.forCompanies.title")}</HeadingFR>
            <p className="text-foreground/80">
              {t("about.forCompanies.description")}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {[
                { t: t("about.forCompanies.feature1"), d: t("about.forCompanies.feature1Desc") },
                { t: t("about.forCompanies.feature2"), d: t("about.forCompanies.feature2Desc") },
                { t: t("about.forCompanies.feature3"), d: t("about.forCompanies.feature3Desc") },
                { t: t("about.forCompanies.feature4"), d: t("about.forCompanies.feature4Desc") },
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
                {t("about.forCompanies.cta1")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/auth"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border hover:shadow transition"
                style={{ borderColor: brand.canard, color: brand.canard }}
              >
                {t("about.forCompanies.cta2")}
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
            <HeadingFR>{t("about.partners.title")}</HeadingFR>
          </div>
          <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md">
            <img
              src={partnersLocal}
              alt={t("about.partners.imageAlt")}
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
                  alt={t("about.forSuppliers.galleryAlt")}
                  className="w-full h-40 object-cover rounded-xl"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div>
            <HeadingFR>{t("about.forSuppliers.title")}</HeadingFR>
            <p className="mb-6 text-foreground/80">
              {t("about.forSuppliers.description")}
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: t("about.forSuppliers.benefit1"), desc: t("about.forSuppliers.benefit1Desc") },
                { title: t("about.forSuppliers.benefit2"), desc: t("about.forSuppliers.benefit2Desc") },
                { title: t("about.forSuppliers.benefit3"), desc: t("about.forSuppliers.benefit3Desc") },
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
                {t("about.forSuppliers.cta1")}
              </a>
              <a
                href="/contact"
                className="px-5 py-3 rounded-2xl text-sm font-medium border hover:shadow transition"
                style={{ borderColor: brand.violet, color: brand.violet }}
              >
                {t("about.forSuppliers.cta2")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bande d'impact */}
      <section className="py-12 px-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { k: "1–15", d: t("about.impact.metric1") },
            { k: "72h", d: t("about.impact.metric2") },
            { k: "100%", d: t("about.impact.metric3") },
            { k: "50+", d: t("about.impact.metric4") },
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
            alt={t("about.testimonial.imageAlt")}
            className="rounded-2xl shadow-floating object-cover w-full h-96"
            loading="lazy"
          />

          <div className="space-y-6">
            <div className="card-professional p-8">
              <blockquote className="text-lg italic text-foreground/90 mb-6">
                {t("about.testimonial.quote")}
              </blockquote>
              <div className="border-t pt-4">
                <p className="font-semibold text-foreground">{t("about.testimonial.author")}</p>
                <p className="text-sm text-foreground/60">{t("about.testimonial.authorRole")}</p>
              </div>
            </div>

            <ul className="space-y-2">
              {[
                t("about.testimonial.benefit1"),
                t("about.testimonial.benefit2"),
                t("about.testimonial.benefit3"),
              ].map((text) => (
                <li key={text} className="flex items-start gap-2 text-sm text-foreground/85">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <HeadingFR>{t("about.finalCta.title")}</HeadingFR>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            {t("about.finalCta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium shadow hover:shadow-lg transition bg-white text-primary"
            >
              {t("about.finalCta.cta1")}
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/auth"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium border hover:shadow transition text-white border-white"
            >
              {t("about.finalCta.cta2")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
