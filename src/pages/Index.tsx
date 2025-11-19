// src/pages/Index.tsx
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mic, ArrowRight, HeartHandshake, BarChart3, Sparkles, Users } from "lucide-react";
import boucheVideo from "@/assets/bouche.mp4";

/**
 * Page d'accueil QVT Box — version "Sandbar"
 * - Hero image pleine largeur (cicatrices + lumière)
 * - Section vidéo bouche.mp4
 * - Narratif simple : Écouter · Voir · Agir
 * - ZÉNA + SaaS + Box + Famille
 */

export default function Index() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#111827] flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden">
          {/* Image de fond */}
          <div className="absolute inset-0">
            <img
              src="/hero-cicatrices-lumiere.jpg"
              alt="Lumière qui jaillit des cicatrices du quotidien"
              className="w-full h-full object-cover"
            />
            {/* Voiles pour lisibilité texte */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A09]/65 via-[#0B0A09]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0A09]/45 to-transparent" />
          </div>

          <div className="relative z-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-end">
              {/* Bloc texte principal */}
              <div className="flex-1 max-w-xl">
                <p className="uppercase tracking-[0.18em] text-xs md:text-sm text-[#E5DFD0]/80 mb-4">
                  QVT BOX · ZÉNA IA ÉMOTIONNELLE
                </p>

                <h1 className="text-3xl md:text-5xl lg:text-[3.2rem] font-semibold text-[#FDFBF6] leading-tight">
                  Le quotidien laisse des traces.
                  <br />
                  <span className="text-[#F3E0B9]">
                    La lumière les efface.
                  </span>
                </h1>

                <p className="mt-5 md:mt-6 text-sm md:text-base text-[#E7E0D2] leading-relaxed max-w-md">
                  QVT Box écoute ce qui ne se voit pas : fatigue, surcharge,
                  non-dits. ZÉNA transforme ces cicatrices invisibles en signaux
                  clairs pour agir sans attendre le burn-out.
                </p>

                <div className="mt-7 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/saas"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3E0B9] bg-[#F3E0B9]/95 text-[#151515] px-6 py-3 text-sm md:text-base font-medium hover:bg-[#F7E7C5] transition-colors"
                  >
                    Découvrir QVT Box en entreprise
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="https://zena.qvtbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3E0B9]/50 bg-black/20 text-[#F9F4EB] px-6 py-3 text-sm md:text-base hover:bg-black/35 transition-colors"
                  >
                    <Mic className="w-4 h-4" />
                    Parler à ZÉNA
                  </a>
                </div>

                <p className="mt-4 text-[0.78rem] md:text-xs uppercase tracking-[0.18em] text-[#E0D7C7]/75">
                  Salariés · Parents · Adolescents · Seniors
                </p>
              </div>

              {/* Bloc info / chiffres / petit résumé */}
              <div className="w-full md:w-[320px] lg:w-[360px] bg-[#151515]/55 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
                <p className="text-xs font-medium tracking-[0.18em] text-[#F3E0B9]/85 uppercase mb-3">
                  Une seule question, tous les jours :
                </p>
                <p className="text-lg md:text-xl text-[#FDFBF6] mb-3">
                  « Salut, ça va ? »
                </p>
                <p className="text-sm text-[#E5DFD0]/80 mb-4">
                  Sauf qu’ici, la réponse compte vraiment. QVT Box mesure la
                  météo émotionnelle et alerte avant que les cicatrices ne
                  deviennent des ruptures.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#F3E0B9]/90">
                  <div className="border border-white/10 rounded-xl px-3 py-2">
                    <p className="uppercase tracking-[0.18em] mb-1">SaaS</p>
                    <p className="text-[0.8rem] text-[#E5DFD0]">
                      Tableau de bord QVCT & RPS en temps réel.
                    </p>
                  </div>
                  <div className="border border-white/10 rounded-xl px-3 py-2">
                    <p className="uppercase tracking-[0.18em] mb-1">Box</p>
                    <p className="text-[0.8rem] text-[#E5DFD0]">
                      Box bien-être ciblées, pas de gadgets inutiles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION VIDÉO ZÉNA / BOUCHE */}
        <section className="py-16 md:py-20 bg-[#FAF6EE]">
          <div className="px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-10">
                <p className="uppercase tracking-[0.18em] text-xs text-[#9C8D77] mb-3">
                  LA VOIX QUI ENTEND LES MICRO-CICATRICES
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1B1A18] mb-3">
                  Écouter ce qui ne se dit pas en réunion.
                </h2>
                <p className="text-sm md:text-base text-[#5E5547] max-w-xl">
                  ZÉNA, l’IA émotionnelle de QVT Box, capte les nuances de ton,
                  les hésitations, les silences. Elle ne remplace pas l’humain :
                  elle lui donne des repères pour agir au bon moment.
                </p>
              </div>

              <div className="relative rounded-[1.75rem] overflow-hidden border border-[#E0D7C7] bg-[#151515]">
                <div className="aspect-[16/9] w-full">
                  <video
                    src={boucheVideo}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-xs md:text-sm text-[#7B6F5D]">
                <span className="px-3 py-1 rounded-full border border-[#D8CCB8] bg-[#F7F1E4]">
                  Analyse émotionnelle vocale
                </span>
                <span className="px-3 py-1 rounded-full border border-[#D8CCB8] bg-[#F7F1E4]">
                  Sans jugement, 24/7
                </span>
                <span className="px-3 py-1 rounded-full border border-[#D8CCB8] bg-[#F7F1E4]">
                  Intégrée à vos rituels QVT
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TEXTE DIVIDER */}
        <section className="py-14 md:py-16 border-y border-[#E3D8C7] bg-[#FDF9F0]">
          <div className="px-6">
            <p className="max-w-3xl mx-auto text-center text-base md:text-xl text-[#4A4134] leading-relaxed">
              Le quotidien va vite. Les émotions, moins.
              <br className="hidden md:block" />
              QVT Box ralentit juste assez pour entendre : « Là, ça commence à
              faire mal. »
            </p>
          </div>
        </section>

        {/* ÉCOUTER / VOIR / AGIR */}
        <section className="py-18 md:py-20 bg-[#FAF6EE]">
          <div className="px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <p className="uppercase tracking-[0.18em] text-xs text-[#9C8D77] mb-3">
                    ÉCOUTER · VOIR · AGIR
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#1B1A18]">
                    Une seule plateforme, trois façons de protéger vos équipes.
                  </h2>
                </div>
                <p className="text-sm md:text-base text-[#6A5F4E] max-w-md">
                  On ne soigne pas un climat social avec un mug et un tote bag.
                  QVT Box s’intéresse à ce que vivent vraiment les salariés, les
                  parents et les ados.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-7">
                {/* Carte ZÉNA */}
                <div className="bg-[#FDF9F0] border border-[#E3D8C7] rounded-2xl p-5 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#151515] text-[#F3E0B9] flex items-center justify-center mb-4">
                      <Mic className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1B1A18] mb-2">
                      Écouter avec ZÉNA
                    </h3>
                    <p className="text-sm text-[#5E5547] mb-4">
                      IA émotionnelle, météo du moral, signaux faibles. Une
                      voix qui écoute sans noter, sans sanctionner.
                    </p>
                  </div>
                  <a
                    href="https://zena.qvtbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#1F2933] hover:underline"
                  >
                    Découvrir ZÉNA Voice
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Carte SaaS / Dashboard */}
                <div className="bg-[#FDF9F0] border border-[#E3D8C7] rounded-2xl p-5 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#151515] text-[#F3E0B9] flex items-center justify-center mb-4">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1B1A18] mb-2">
                      Voir avec le SaaS QVT Box
                    </h3>
                    <p className="text-sm text-[#5E5547] mb-4">
                      Tableaux de bord QVCT, RPS et DUERP. Une vue claire sur
                      les zones qui tiennent, celles qui fissurent.
                    </p>
                  </div>
                  <Link
                    to="/saas"
                    className="inline-flex items-center gap-2 text-sm text-[#1F2933] hover:underline"
                  >
                    Explorer la licence SaaS
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Carte Box & Famille */}
                <div className="bg-[#FDF9F0] border border-[#E3D8C7] rounded-2xl p-5 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#151515] text-[#F3E0B9] flex items-center justify-center mb-4">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1B1A18] mb-2">
                      Agir avec les box & la famille
                    </h3>
                    <p className="text-sm text-[#5E5547] mb-4">
                      Box bien-être ciblées (salariés, parents, ados,
                      grands-parents) et pont vers ZÉNA Famille pour continuer
                      l’écoute à la maison.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/box"
                      className="inline-flex items-center gap-2 text-sm text-[#1F2933] hover:underline"
                    >
                      Voir les box QVT
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href="https://zena-family.qvtbox.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#4B5563] hover:underline"
                    >
                      Ouvrir ZÉNA Famille
                      <Users className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 md:py-20 bg-[#151515] text-[#FDF9F0]">
          <div className="px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="uppercase tracking-[0.2em] text-xs text-[#E5D7BF]/80 mb-3">
                LE COUP DE POUCE QVT BOX
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Vos équipes n’ont pas besoin d’un énième gadget.
                <br className="hidden md:block" />
                Elles ont besoin qu’on les entende vraiment.
              </h2>
              <p className="text-sm md:text-base text-[#E5D7BF]/90 max-w-xl mx-auto mb-8">
                Parlez-nous de votre contexte, de vos cicatrices du quotidien.
                On construit ensemble un dispositif discret, réaliste, qui
                s’intègre à vos contraintes terrain.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F3E0B9] text-[#151515] px-7 py-3 text-sm md:text-base font-medium hover:bg-[#F7E7C5] transition-colors"
                >
                  Prendre contact avec QVT Box
                  <Sparkles className="w-4 h-4" />
                </Link>

                <Link
                  to="/simulateur"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3E0B9]/60 text-[#FDF9F0] px-7 py-3 text-sm md:text-base hover:bg-white/5 transition-colors"
                >
                  Tester « Ma bulle attentionnée »
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
