// src/pages/Index.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Brain,
  Users,
  Home,
  Briefcase,
  Smile,
  Box,
} from "lucide-react";

/**
 * 🌟 Page d'accueil QVT Box – Hub 3 univers (2025)
 * - QVT Box (phygital & box)
 * - Zéna Entreprise (avec vidéo)
 * - Zéna Family & Ado
 * - Fil rouge : "Salut, ça va vraiment ?"
 */

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F7F6] via-[#FFF3EA] to-[#E9F9F5] overflow-hidden text-[#212121] font-sans">
      <Navigation />

      {/* ======================= HERO ======================= */}
      <section className="relative pt-24 pb-16 px-6">
        {/* Halo central froid + chaud */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[620px] h-[620px] bg-primary/20 blur-[180px] opacity-40 animate-breathe -z-10" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[420px] h-[420px] bg-[#FDBA74]/40 blur-[160px] opacity-50 -z-10" />

        {/* Lucioles */}
        <div className="absolute inset-0 -z-10">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="firefly absolute w-2 h-2 bg-secondary/70 rounded-full"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
            {/* Texte hero */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo-qvt.jpeg"
                  alt="QVT Box"
                  className="w-14 h-14 rounded-full shadow-xl border border-white"
                />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary/70">
                    QVT Box · Zéna · Famille
                  </p>
                  <p className="text-xs text-[#212121]/60">
                    La bulle attentionnée pour les salariés, les parents et les ados
                  </p>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-[#5B4B8A] via-[#4FD1C5] to-[#FDBA74] bg-clip-text text-transparent">
                Salut, ça va vraiment&nbsp;?
              </h1>

              <p className="text-lg md:text-2xl text-[#212121]/75 mt-6 max-w-xl leading-relaxed">
                Une seule question, mais tellement de choses derrière. QVT Box + Zéna
                créent une bulle où l’on peut enfin répondre honnêtement – au travail
                comme à la maison.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/simulateur"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#5B4B8A] via-[#4FD1C5] to-[#FDBA74] text-white shadow-lg hover:scale-[1.05] transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Tester “Ma bulle attentionnée”
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary/80 text-primary hover:bg-primary/10 transition-all bg-white/70"
                >
                  Parler de votre contexte
                </Link>
              </div>

              <p className="mt-5 text-xs text-[#7C2D12] bg-[#FFEDD5]/80 inline-flex px-3 py-1 rounded-full">
                ✨ Une passerelle entre vie pro, vie de famille et santé mentale des jeunes.
              </p>
            </div>

            {/* Bloc ZÉNA avec vidéo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#5B4B8A]/20 via-[#4FD1C5]/10 to-[#FDBA74]/30 rounded-[2rem] blur-xl -z-10" />

              <div className="rounded-[2rem] bg-white/90 border border-primary/10 shadow-xl overflow-hidden">
                <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70">
                      Zéna · IA émotionnelle
                    </p>
                    <p className="text-xs text-[#4B5563]">
                      La voix douce qui demande “comment tu te sens ?”
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5]">
                    Bêta privée
                  </span>
                </div>

                <div className="w-full h-[260px] bg-black/5">
                  <video
                    src="/zena-avatar.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="px-5 py-4 space-y-2 text-left">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    🧠 Zéna écoute, analyse et remonte les signaux faibles.
                  </p>
                  <p className="text-xs text-[#4B5563]">
                    Check-ins réguliers, météo émotionnelle, alertes discrètes pour les
                    RH et, demain, pour les parents. Une présence qui ne juge pas et ne
                    remplace pas l’humain.
                  </p>
                  <Link
                    to="/zena"
                    className="inline-flex items-center gap-2 text-xs text-primary font-semibold hover:underline"
                  >
                    Découvrir Zéna Entreprise
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-[#6B7280] text-center">
            Une question simple, plusieurs univers : entreprise, famille, ado, retraite.
          </p>
        </div>
      </section>

      {/* ======================= SECTION 3 UNIVERS ======================= */}
      <section className="py-16 px-6 bg-white/80 backdrop-blur">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
            Un seul concept, trois univers complémentaires
          </h2>
          <p className="text-sm md:text-base text-[#374151] text-center max-w-3xl mx-auto mb-10">
            QVT Box est le chapeau. Zéna est la voix. Les box sont les gestes concrets.
            Vous choisissez où commencer : au travail, à la maison ou avec vos ados.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* QVT BOX */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white to-[#F5FFFB] border border-primary/10 shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Box className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">QVT Box</h3>
              <p className="text-sm text-[#4B5563] mb-4 flex-1">
                Une box phygitale pour remettre de la douceur, de l’organisation
                et des petites attentions dans le quotidien : salariés, parents,
                ados, grands-parents.
              </p>
              <ul className="text-xs text-[#6B7280] mb-4 space-y-1">
                <li>• Box ciblées (salarié, parent, ado, retraité)</li>
                <li>• Contenu utile, pas gadget</li>
                <li>• Coût maîtrisé, gestes concrets</li>
              </ul>
              <Link
                to="/boutique"
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-auto"
              >
                Découvrir les box
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* ZÉNA ENTREPRISE */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white to-[#F4F2FF] border border-primary/10 shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Zéna Entreprise</h3>
              <p className="text-sm text-[#4B5563] mb-4 flex-1">
                L’IA émotionnelle qui écoute vos équipes, détecte les signaux
                faibles et aide les RH à agir avant les crises.
              </p>
              <ul className="text-xs text-[#6B7280] mb-4 space-y-1">
                <li>• Check-ins émotionnels simples</li>
                <li>• Tendances anonymisées pour les RH</li>
                <li>• Passerelle vers des actions QVT & box</li>
              </ul>
              <Link
                to="/zena"
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-auto"
              >
                Découvrir Zéna Entreprise
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* ZÉNA FAMILY */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white to-[#FFF7F2] border border-primary/10 shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-[#FDBA74]/20 flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-[#EA580C]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Zéna Family & Ado</h3>
              <p className="text-sm text-[#4B5563] mb-4 flex-1">
                Un espace bienveillant pour parler des émotions en famille,
                aider les ados à se comprendre et soutenir les parents sans
                jugement.
              </p>
              <ul className="text-xs text-[#6B7280] mb-4 space-y-1">
                <li>• Question “Ça va vraiment ?” pour les ados</li>
                <li>• Bulle parent pour garder le lien</li>
                <li>• Box parent / ado pour créer des moments</li>
              </ul>
              <Link
                to="/zena-family"
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-auto"
              >
                Découvrir Zéna Family
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= COMMENT ÇA MARCHE ? ======================= */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
            Comment fonctionne “Ma bulle attentionnée” ?
          </h2>
          <p className="text-sm md:text-base text-[#374151] text-center max-w-3xl mx-auto mb-12">
            Pas de questionnaire de 40 minutes, pas d’usine à gaz. Juste quelques
            questions simples, un score émotionnel et, si besoin, une petite
            action concrète pour aller mieux.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white shadow-sm border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Smile className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-base">1. Tu réponds</h3>
              <p className="text-sm text-[#4B5563]">
                Quelques questions rapides : comment ça va, ce qui pèse, ce qui
                fait du bien. Tu peux ajouter un commentaire si tu veux.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-base">2. On analyse</h3>
              <p className="text-sm text-[#4B5563]">
                La plateforme calcule un score simple, détecte les signaux
                d’alerte et repère les tendances émotionnelles dans le temps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-base">3. On agit</h3>
              <p className="text-sm text-[#4B5563]">
                Recommandations, micro-pauses, box ciblées, alertes discrètes
                pour les RH ou les parents selon l’univers. Toujours avec
                bienveillance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= BLOC "POUR QUI ?" ======================= */}
      <section className="py-16 px-6 bg-white/80">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
            Pour qui est faite QVT Box ?
          </h2>
          <p className="text-sm md:text-base text-[#374151] text-center max-w-3xl mx-auto mb-10">
            Une seule question, plusieurs vies. QVT Box s’adapte aux réalités
            de chacun, sans opposer vie pro et vie perso.
          </p>

          <div className="grid gap-6 md:grid-cols-4 text-sm">
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-primary/10 text-center">
              <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-semibold mb-1">Salariés</p>
              <p className="text-xs text-[#6B7280]">
                Ceux qui jonglent entre objectifs, mails et charge mentale.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-primary/10 text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-semibold mb-1">Parents</p>
              <p className="text-xs text-[#6B7280]">
                Ceux qui gèrent tout, tout le temps, et se mettent souvent en
                dernier.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-primary/10 text-center">
              <Smile className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-semibold mb-1">Ados</p>
              <p className="text-xs text-[#6B7280]">
                Ceux qui ne trouvent pas toujours les mots mais ressentent
                beaucoup.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-primary/10 text-center">
              <HeartHandshake className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-semibold mb-1">Retraités</p>
              <p className="text-xs text-[#6B7280]">
                Ceux qui transmettent, prennent soin, et ont aussi besoin de
                douceur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= CTA FINAL ======================= */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#5B4B8A] via-[#4FD1C5] to-[#FDBA74] text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          On commence par une simple question.
        </h2>

        <p className="text-lg opacity-90 max-w-3xl mx-auto mb-10">
          “Salut, ça va vraiment ?”  
          Derrière cette question, QVT Box et Zéna créent un espace où les
          émotions ont leur place – au travail comme à la maison.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/simulateur"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Tester “Ma bulle attentionnée”
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#111827] hover:bg-[#F2F7F6] transition-all"
          >
            <Users className="w-5 h-5" />
            Échanger sur votre besoin
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
