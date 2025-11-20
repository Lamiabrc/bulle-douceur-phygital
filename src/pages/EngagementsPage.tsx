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
        {/* HERO — MANIFESTE CALME & FORT */}
        <section className="pt-32 pb-20 px-8 md:px-16 bg-[#FAF6EE]">
          <div className="max-w-4xl mx-auto">
            <p className="uppercase tracking-[0.18em] text-[11px] text-[#9C8D77] mb-4">
              QVT Box · Notre engagement
            </p>

            <h1 className="text-3xl md:text-4xl font-light leading-tight mb-5">
              Nous construisons une technologie
              <br />
              qui prend soin des gens.
            </h1>

            <p className="text-sm md:text-base text-[#6F6454] max-w-2xl">
              Beaucoup d’outils mesurent, tracent, analysent.
              <br className="hidden md:block" />
              QVT Box a choisi une autre voie&nbsp;: écouter, protéger, apaiser.
              ZÉNA n’est pas là pour contrôler les émotions, mais pour leur
              laisser un espace sûr.
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

        {/* TEXTE STYLE SANDBAR */}
        <section className="py-28 bg-[#FDF9F0] border-y border-[#E8DCC8]">
          <p className="max-w-3xl mx-auto px-8 md:px-16 text-center text-lg md:text-xl text-[#4A4134] leading-relaxed">
            La technologie peut fatiguer, surveiller, blesser.
            <br className="hidden md:block" />
            Ou elle peut faire l’inverse&nbsp;:
            <br />
            ralentir, protéger, réparer.
          </p>
        </section>

        {/* BLOC ENGAGEMENTS PRINCIPAUX */}
        <section className="py-24 px-8 md:px-16 bg-[#FAF6EE]">
          <div className="max-w-5xl mx-auto mb-14">
            <p className="uppercase tracking-[0.18em] text-xs text-[#9C8D77] mb-3">
              Une boussole éthique, pas un argument marketing
            </p>
            <h2 className="text-2xl md:text-3xl font-light mb-4">
              Nos engagements ne sont pas des promesses.
              <br />
              Ce sont des limites que nous nous imposons.
            </h2>
            <p className="text-sm md:text-base text-[#6F6454] max-w-2xl">
              Chaque choix de design, de donnée, d’IA et de box physique est
              passé au filtre de ces engagements. Si cela ne sert pas
              vraiment les personnes, on ne le fait pas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* ETHIQUE */}
            <div className="rounded-3xl bg-[#FDF9F0] border border-[#E8DCC8] px-6 py-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#9C8D77]" />
                <h3 className="text-lg font-medium">Technologie éthique</h3>
              </div>
              <p className="text-sm text-[#6F6454] leading-relaxed">
                ZÉNA ne remplace pas un humain, elle prépare le terrain
                pour une vraie rencontre. Nous refusons les logiques
                de scoring caché, de nudging agressif ou de manipulation
                des émotions pour pousser à la performance.
              </p>
            </div>

            {/* DONNÉES */}
            <div className="rounded-3xl bg-[#FDF9F0] border border-[#E8DCC8] px-6 py-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-[#9C8D77]" />
                <h3 className="text-lg font-medium">Protection des données</h3>
              </div>
              <p className="text-sm text-[#6F6454] leading-relaxed">
                Vos émotions ne sont pas une ressource exploitable.
                Les données sensibles sont minimisées, protégées,
                jamais revendues ni partagées à des fins commerciales.
                Ce que vous confiez à QVT Box reste sous votre contrôle.
              </p>
            </div>

            {/* ACCÈS GRATUIT / ISOLÉS */}
            <div className="rounded-3xl bg-[#FDF9F0] border border-[#E8DCC8] px-6 py-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <HeartHandshake className="w-5 h-5 text-[#9C8D77]" />
                <h3 className="text-lg font-medium">
                  Un accès gratuit pour ceux qui sont seuls
                </h3>
              </div>
              <p className="text-sm text-[#6F6454] leading-relaxed">
                Nous voulons que ZÉNA reste accessible aux personnes
                isolées, fragilisées, qui n’ont ni accompagnement, ni
                espace pour déposer ce qu’elles vivent. L’écoute ne
                doit pas être un privilège, mais une main tendue.
              </p>
            </div>

            {/* IMPACT SOCIAL */}
            <div className="rounded-3xl bg-[#FDF9F0] border border-[#E8DCC8] px-6 py-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-[#9C8D77]" />
                <h3 className="text-lg font-medium">
                  Réparer les fractures du quotidien
                </h3>
              </div>
              <p className="text-sm text-[#6F6454] leading-relaxed">
                Salariés épuisés, parents sous pression, ados saturés,
                grands-parents isolés&nbsp;: QVT Box est pensée pour ceux
                qui tiennent tout ensemble en silence. Nous dessinons
                des solutions concrètes, ancrées dans la vie réelle, pas
                dans les slides.
              </p>
            </div>
          </div>
        </section>

        {/* TEXTE MANIFESTE 2 */}
        <section className="py-28 bg-[#FDF9F0] border-y border-[#E8DCC8]">
          <p className="max-w-3xl mx-auto px-8 md:px-16 text-center text-lg md:text-xl text-[#4A4134] leading-relaxed">
            On ne demande pas aux gens d’être résilients.
            <br className="hidden md:block" />
            On leur construit enfin des appuis.
          </p>
        </section>

        {/* POUR QUI & COMMENT ? */}
        <section className="py-24 px-8 md:px-16 bg-[#FAF6EE]">
          <div className="max-w-5xl mx-auto grid gap-16 md:grid-cols-2">
            <div>
              <p className="uppercase tracking-[0.18em] text-xs text-[#9C8D77] mb-3">
                Pour qui nous le faisons
              </p>
              <h2 className="text-xl md:text-2xl font-light mb-4">
                Ceux qui tiennent, mais à quel prix&nbsp;?
              </h2>
              <p className="text-sm md:text-base text-[#6F6454] leading-relaxed">
                Managers en tension, opérateurs de terrain, parents
                épuisés, ados en surcharge mentale, proches aidants,
                retraités isolés…  
                Tous ces rôles invisibles qui accumulent la charge
                sans trouver d’espace pour dire «&nbsp;ça ne va plus&nbsp;».
              </p>
            </div>

            <div>
              <p className="uppercase tracking-[0.18em] text-xs text-[#9C8D77] mb-3">
                Concrètement, ça change quoi&nbsp;?
              </p>
              <ul className="space-y-3 text-sm md:text-base text-[#6F6454]">
                <li>• Une écoute émotionnelle sans jugement, 24h/24.</li>
                <li>• Des signaux faibles identifiés sans fliquer les personnes.</li>
                <li>• Des box utiles, jamais gadget, pour agir dans la vraie vie.</li>
                <li>• Des tableaux de bord pensés pour protéger, pas pour punir.</li>
                <li>• Des décisions QVT alignées sur la réalité du terrain.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA FINAL — FOND SOMBRE COMME L’INDEX */}
        <section className="py-32 bg-[#151515] text-[#FDF9F0] text-center">
          <div className="max-w-3xl mx-auto px-8 md:px-16">
            <p className="uppercase tracking-[0.2em] text-[11px] text-[#E5D7BF]/80 mb-5">
              Une technologie qui prend soin
            </p>

            <h2 className="text-2xl md:text-3xl font-light mb-6">
              Si vous cherchez un outil pour surveiller vos équipes,
              <br />
              QVT Box n’est pas fait pour vous.
            </h2>

            <p className="text-sm md:text-base text-[#E5D7BF]/85 mb-10">
              Si vous cherchez une façon plus juste, plus humaine, plus
              responsable de prendre soin de ceux qui tiennent votre
              organisation debout, alors on peut travailler ensemble.
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
