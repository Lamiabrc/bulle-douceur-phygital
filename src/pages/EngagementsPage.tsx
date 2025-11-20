// src/pages/EngagementsPage.tsx
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, ShieldCheck, Lock, HeartHandshake, Users } from "lucide-react";

export default function EngagementsPage() {
  return (
    <div className="bg-[#FAF6EE] text-[#1B1A18]">
      <Navigation />

      <main>
        {/* HERO VISUEL AVEC IMAGE */}
        <section className="pt-32 pb-20 px-8 md:px-16 bg-[#FAF6EE]">
          <div className="max-w-6xl mx-auto">
            {/* IMAGE PLEIN FORMAT */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm mb-10">
              <img
                src="/engagements-hero.jpg"
                alt="Technologie qui prend soin"
                className="w-full h-[420px] md:h-[500px] object-cover object-center"
              />
            </div>

            <p className="uppercase tracking-[0.18em] text-[11px] text-[#9C8D77] mb-4">
              QVT Box · Notre engagement
            </p>

            <h1 className="text-3xl md:text-4xl font-light leading-tight mb-5">
              Nous construisons une technologie<br />
              qui prend soin des gens.
            </h1>

            <p className="text-sm md:text-base text-[#6F6454] max-w-2xl">
              Beaucoup d’outils mesurent, tracent, analysent.
              QVT Box choisit une autre voie : écouter, protéger, apaiser.
              ZÉNA n’est pas un micro caché ; c’est une main posée sur l’épaule.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B1A18] text-[#FAF6EE] text-sm font-medium hover:bg-[#2A2722] transition"
              >
                Parler de vos enjeux QVT
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/simulateur"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D4C7B3] text-sm text-[#4A4134] hover:bg-white/40 transition"
              >
                Tester « Ma bulle attentionnée »
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION TEXTE - STYLE SANDBAR */}
        <section className="py-28 bg-[#FDF9F0] border-y border-[#E8DCC8]">
          <p className="max-w-3xl mx-auto px-8 md:px-16 text-center text-lg md:text-xl text-[#4A4134] leading-relaxed">
            La technologie peut fatiguer.  
            Elle peut aussi réparer.  
            Tout dépend de ce qu’on en fait.
          </p>
        </section>

        {/* BLOC ENGAGEMENTS AVEC IMAGES */}
        <section className="py-24 px-8 md:px-16 bg-[#FAF6EE]">
          <div className="max-w-5xl mx-auto mb-14">
            <p className="uppercase tracking-[0.18em] text-xs text-[#9C8D77] mb-3">
              Une boussole éthique
            </p>
            <h2 className="text-2xl md:text-3xl font-light mb-4">
              Nos engagements guident chaque choix.
            </h2>
            <p className="text-sm md:text-base text-[#6F6454] max-w-2xl">
              Ce ne sont pas des arguments commerciaux — 
              mais des limites fermes.  
              Si cela n’aide pas les personnes, on ne le fait pas.
            </p>
          </div>

          <div className="grid gap-14 md:grid-cols-2">
            {/* 1. ETHIQUE */}
            <div>
              <img
                src="/engagements-social-thread.jpg"
                alt="Technologie éthique"
                className="rounded-3xl w-full h-64 object-cover object-center border border-[#E8DCC8] mb-5"
              />

              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#9C8D77]" />
                <h3 className="text-lg font-medium">Technologie éthique</h3>
              </div>

              <p className="text-sm text-[#6F6454] leading-relaxed">
                ZÉNA ne manipule pas, ne classe pas, ne note pas les émotions.  
                Elle prépare le terrain pour une vraie rencontre humaine.
              </p>
            </div>

            {/* 2. DONNÉES */}
            <div>
              <img
                src="/engagements-data-bubble.jpg"
                alt="Protection des données"
                className="rounded-3xl w-full h-64 object-cover border border-[#E8DCC8] mb-5"
              />

              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-[#9C8D77]" />
                <h3 className="text-lg font-medium">Protection des données</h3>
              </div>

              <p className="text-sm text-[#6F6454] leading-relaxed">
                Vos émotions restent à vous.  
                Données minimisées, sécurisées, jamais revendues.
              </p>
            </div>

            {/* 3. GRATUITÉ ISOLÉS */}
            <div>
              <img
                src="/engagements-isolation-support.jpg"
                alt="Soutien aux personnes isolées"
                className="rounded-3xl w-full h-64 object-cover border border-[#E8DCC8] mb-5"
              />

              <div className="flex items-center gap-3 mb-3">
                <HeartHandshake className="w-5 h-5 text-[#9C8D77]" />
                <h3 className="text-lg font-medium">
                  Un accès gratuit pour ceux qui sont seuls
                </h3>
              </div>

              <p className="text-sm text-[#6F6454] leading-relaxed">
                L’écoute émotionnelle ne doit pas être un luxe.  
                ZÉNA reste accessible à ceux qui n’ont personne.
              </p>
            </div>

            {/* 4. IMPACT SOCIAL */}
            <div>
              <img
                src="/engagements-social-thread.jpg"
                alt="Impact social"
                className="rounded-3xl w-full h-64 object-cover border border-[#E8DCC8] mb-5"
              />

              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-[#9C8D77]" />
                <h3 className="text-lg font-medium">
                  Réparer les fractures du quotidien
                </h3>
              </div>

              <p className="text-sm text-[#6F6454] leading-relaxed">
                Parents, ados, salariés, retraités.  
                Une seule promesse : agir sans jamais juger.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL MANIFESTO AVEC IMAGE SOMBRE */}
        <section className="py-32 bg-[#151515] text-[#FDF9F0] text-center relative">
          <img
            src="/engagements-dark-halo.jpg"
            alt="Halo espoir"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-8 md:px-16">
            <p className="uppercase tracking-[0.2em] text-[11px] text-[#E5D7BF]/80 mb-5">
              Une technologie qui prend soin
            </p>

            <h2 className="text-2xl md:text-3xl font-light mb-6">
              Nous ne surveillons pas les gens.
              <br />
              Nous les aidons à mieux respirer.
            </h2>

            <p className="text-sm md:text-base text-[#E5D7BF]/85 mb-10">
              Si vous cherchez un système humain, utile, juste,
              alors nous pouvons travailler ensemble.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#F3E0B9] text-[#151515] hover:bg-[#F7E7C5] transition"
              >
                Échanger sur vos enjeux
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/saas"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#EADCC7] text-[#FDF9F0] hover:bg-white/10 transition"
              >
                Voir la solution entreprise
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
