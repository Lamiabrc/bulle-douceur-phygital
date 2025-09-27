// src/components/Hero.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Gift, ShieldCheck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-workplace.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[86vh] flex items-center justify-center pt-24 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <Badge variant="secondary" className="whitespace-nowrap">Né en 2024</Badge>
            <span className="text-sm text-foreground/60">
              après ~15 ans de salariat — par Lamia
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-inter text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
            Mesurer ce qui compte.<br className="hidden md:block" />
            Prévenir à temps.<br className="hidden md:block" />
            <span className="text-primary">Reconnaître vraiment.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-5 text-lg md:text-xl text-foreground/80 font-light max-w-3xl mx-auto">
            QVT Box rend la QVCT lisible (score 1–15), déclenche des alertes RPS utiles
            et matérialise la reconnaissance grâce à des box 100% Made in France.
            Clair, actionnable, et respectueux des équipes.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="whitespace-nowrap">
              <Link to="/saas">
                <BarChart3 className="w-5 h-5" />
                <span>Demander une démo SaaS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="whitespace-nowrap">
              <Link to="/box">
                <Gift className="w-5 h-5" />
                <span>Découvrir les Box</span>
              </Link>
            </Button>
          </div>

          {/* Trust row */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="rounded-xl border bg-background/70 p-4">
              <div className="text-sm text-foreground/60">Score QVCT</div>
              <div className="text-lg font-semibold">Clair 1–15</div>
            </div>
            <div className="rounded-xl border bg-background/70 p-4">
              <div className="text-sm text-foreground/60">Prévention RPS</div>
              <div className="text-lg font-semibold">Alertes utiles</div>
            </div>
            <div className="rounded-xl border bg-background/70 p-4">
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Made in France
              </div>
              <div className="text-lg font-semibold">Reconnaissance concrète</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
