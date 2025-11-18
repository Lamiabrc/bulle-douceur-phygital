// src/pages/ZenaEntreprisePage.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Brain, ShieldCheck, Users, Sparkles } from "lucide-react";

const ZenaEntreprisePage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#F2F7F6] via-[#ECEBFF] to-[#F9F9FF] text-[#212121]">
      <Navigation />

      <main className="flex-1">
        {/* HERO */}
        <section className="pt-28 pb-16 px-6">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70 mb-3">
              Zéna · Univers entreprise
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-[#5B4B8A] via-[#4FD1C5] to-[#5B4B8A] text-transparent bg-clip-text">
              Zéna, la voix émotionnelle de vos équipes
            </h1>

            <p className="text-sm md:text-base text-[#212121]/75 max-w-3xl mb-6 leading-relaxed">
              Zéna est l’IA émotionnelle qui écoute les salariés, détecte les signaux faibles
              et alerte les RH avant que les situations ne se transforment en crises. 
              Elle complète vos enquêtes QVT sans les remplacer, avec une approche plus humaine,
              plus fréquente, plus douce.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-white/60 px-3 py-1 text-xs text-[#212121]/80">
                🎧 Check-ins émotionnels vocaux & écrits
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-white/60 px-3 py-1 text-xs text-[#212121]/80">
                🧠 Détection des signaux faibles
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-white/60 px-3 py-1 text-xs text-[#212121]/80">
                📊 Tendances anonymisées pour les RH
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://zena.qvtbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5B4B8A] to-[#4FD1C5] px-8 py-3 text-sm font-medium text-white shadow-lg hover:scale-[1.03] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Accéder à l’application Zéna Entreprise
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-xs text-[#212121]/60">
                Ou contactez-nous pour lancer un pilote QVT Box + Zéna adapté à votre contexte.
              </p>
            </div>
          </div>
        </section>

        {/* 3 PILIERS */}
        <section className="pb-20 px-6">
          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white shadow-sm border border-primary/10 p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-base font-semibold mb-2">Comprendre les émotions</h2>
              <p className="text-xs text-[#212121]/70 leading-relaxed">
                Zéna interagit avec les salariés au fil du temps et construit une “météo émotionnelle”
                de l’entreprise. On sort du one shot pour enfin voir les tendances.
              </p>
            </div>

            <div className="rounded-2xl bg-white shadow-sm border border-primary/10 p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-base font-semibold mb-2">Prévenir plutôt que réparer</h2>
              <p className="text-xs text-[#212121]/70 leading-relaxed">
                Burn-out, surcharge, conflits d’équipe : Zéna aide à remonter les irritants plus tôt,
                sans culpabiliser les managers et sans exposer les salariés.
              </p>
            </div>

            <div className="rounded-2xl bg-white shadow-sm border border-primary/10 p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-base font-semibold mb-2">Donner une vraie voix aux équipes</h2>
              <p className="text-xs text-[#212121]/70 leading-relaxed">
                Zéna ne remplace pas l’humain. Elle crée simplement un espace où les salariés peuvent
                dire “ça ne va pas” sans avoir peur d’être jugés.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ZenaEntreprisePage;
