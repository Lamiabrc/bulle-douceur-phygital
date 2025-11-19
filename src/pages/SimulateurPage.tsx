// src/pages/SimulateurPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import {
  ArrowLeft,
  Heart,
  Settings,
  Users,
  Star,
  SmilePlus,
  Baby,
  Briefcase,
  UserRound,
  Sparkles,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type RoleKey = "salarie" | "parent" | "ado" | "grandparent" | "autre";

interface RoleConfig {
  key: RoleKey;
  label: string;
  emoji: string;
  description: string;
  color: string;
  bg: string;
}

interface QuestionOption {
  value: string;
  label: string;
}

interface Question {
  id: string;
  title: string;
  question: string;
  icon: any;
  color: string;
  pillar: "sante" | "orga" | "cohesion" | "devperso";
  options: QuestionOption[];
}

interface Recommendation {
  name: string;
  description: string;
  color: string;
  products: string[];
  tagline: string;
}

const ROLE_CONFIG: RoleConfig[] = [
  {
    key: "salarie",
    label: "Salarié(e)",
    emoji: "👔",
    description: "Je veux mieux vivre mon quotidien au travail.",
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
  },
  {
    key: "parent",
    label: "Parent",
    emoji: "👪",
    description: "Je jongle entre le boulot, la maison et la charge mentale.",
    color: "text-[#00B0B9]",
    bg: "bg-[#00B0B9]/10",
  },
  {
    key: "ado",
    label: "Adolescent(e)",
    emoji: "🧑‍🎓",
    description: "Je veux mieux gérer mes émotions et mes relations.",
    color: "text-[#F97316]",
    bg: "bg-[#F97316]/10",
  },
  {
    key: "grandparent",
    label: "Grand-parent / Retraité",
    emoji: "👵",
    description: "Je cherche du lien, du rythme et de la douceur.",
    color: "text-[#22C55E]",
    bg: "bg-[#22C55E]/10",
  },
  {
    key: "autre",
    label: "Autre adulte",
    emoji: "🧑",
    description: "Je veux simplement prendre soin de ma santé émotionnelle.",
    color: "text-[#0EA5E9]",
    bg: "bg-[#0EA5E9]/10",
  },
];

const QUESTION_SETS: Record<RoleKey, Question[]> = {
  salarie: [
    {
      id: "stress",
      title: "Gestion du stress",
      question: "Comment évaluez-vous votre niveau de stress au travail en ce moment ?",
      icon: Heart,
      color: "text-[#EF4444]",
      pillar: "sante",
      options: [
        { value: "low", label: "Ça va bien, je me sens globalement serein(e)" },
        { value: "medium", label: "Quelques tensions mais ça reste gérable" },
        { value: "high", label: "Je me sens souvent tendu(e) ou fatigué(e)" },
        { value: "very-high", label: "Je suis au bord du craquage ou épuisé(e)" },
      ],
    },
    {
      id: "organization",
      title: "Charge & organisation",
      question: "Comment vivez-vous votre charge de travail et votre organisation ?",
      icon: Settings,
      color: "text-[#3B82F6]",
      pillar: "orga",
      options: [
        { value: "excellent", label: "J'ai un bon rythme, bien cadré" },
        { value: "good", label: "Plutôt correct, avec quelques périodes chargées" },
        { value: "average", label: "Je cours souvent après le temps" },
        { value: "poor", label: "Je suis débordé(e), je n'y arrive plus" },
      ],
    },
    {
      id: "team",
      title: "Relations d'équipe",
      question: "Comment se passent vos relations avec vos collègues / manager ?",
      icon: Users,
      color: "text-[#F97316]",
      pillar: "cohesion",
      options: [
        { value: "excellent", label: "Très bonnes, ambiance vraiment positive" },
        { value: "good", label: "Globalement bonnes, quelques tensions ponctuelles" },
        { value: "average", label: "Correct, plutôt neutre" },
        { value: "poor", label: "Compliqué : conflits, isolement ou manque de soutien" },
      ],
    },
    {
      id: "development",
      title: "Motivation & sens",
      question: "Où en êtes-vous dans votre motivation et votre envie d'évoluer ?",
      icon: Star,
      color: "text-[#A855F7]",
      pillar: "devperso",
      options: [
        { value: "motivated", label: "Très motivé(e), j'ai des projets clairs" },
        { value: "interested", label: "Plutôt motivé(e), ouvert(e) aux opportunités" },
        { value: "neutral", label: "Je fais le job, sans plus" },
        { value: "stuck", label: "Je me sens bloqué(e), démotivé(e) ou perdu(e)" },
      ],
    },
  ],

  parent: [
    {
      id: "parent_fatigue",
      title: "Charge mentale & fatigue",
      question: "Comment vous sentez-vous en ce moment dans votre rôle de parent ?",
      icon: Heart,
      color: "text-[#EF4444]",
      pillar: "sante",
      options: [
        { value: "ok", label: "Ça va, je tiens le rythme" },
        { value: "tired", label: "Je suis fatigué(e), mais je gère encore" },
        { value: "overwhelmed", label: "Je me sens souvent débordé(e)" },
        { value: "exhausted", label: "Je suis épuisé(e), au bout du rouleau" },
      ],
    },
    {
      id: "parent_orga",
      title: "Organisation familiale",
      question: "Comment se passe l'organisation du quotidien (devoirs, repas, rendez-vous...) ?",
      icon: Settings,
      color: "text-[#3B82F6]",
      pillar: "orga",
      options: [
        { value: "smooth", label: "Plutôt fluide, bien cadré" },
        { value: "ok", label: "Ça va, même si parfois improvisé" },
        { value: "chaotic", label: "C'est souvent la course" },
        { value: "out-of-control", label: "J'ai l'impression que tout m'échappe" },
      ],
    },
    {
      id: "parent_relation",
      title: "Lien avec les enfants / ados",
      question: "Comment décririez-vous la qualité de la relation avec vos enfants / ados ?",
      icon: Users,
      color: "text-[#F97316]",
      pillar: "cohesion",
      options: [
        { value: "very-good", label: "Très bonne, on communique facilement" },
        { value: "good", label: "Bonne, malgré quelques tensions normales" },
        { value: "distant", label: "On se parle peu de choses importantes" },
        { value: "conflict", label: "C'est souvent tendu ou conflictuel" },
      ],
    },
    {
      id: "parent_selftime",
      title: "Temps pour soi",
      question: "Avez-vous du temps pour vous ressourcer (sans enfants, sans travail) ?",
      icon: SmilePlus,
      color: "text-[#A855F7]",
      pillar: "devperso",
      options: [
        { value: "enough", label: "Oui, régulièrement" },
        { value: "sometimes", label: "Parfois, mais pas assez" },
        { value: "rarely", label: "Très rarement" },
        { value: "never", label: "Quasi jamais" },
      ],
    },
  ],

  ado: [
    {
      id: "ado_comm",
      title: "Parler avec tes parents",
      question: "À quel point tu arrives à parler de ce que tu ressens avec tes parents / adultes de confiance ?",
      icon: Users,
      color: "text-[#F97316]",
      pillar: "cohesion",
      options: [
        { value: "easy", label: "Facile, je peux tout dire" },
        { value: "sometimes", label: "Parfois, selon les sujets" },
        { value: "hard", label: "Difficile, je garde beaucoup pour moi" },
        { value: "blocked", label: "Quasi impossible, je ne me sens pas écouté(e)" },
      ],
    },
    {
      id: "ado_stress",
      title: "Stress & pression",
      question: "En ce moment, ton niveau de stress (école, amis, réseaux, famille...) c’est plutôt :",
      icon: Heart,
      color: "text-[#EF4444]",
      pillar: "sante",
      options: [
        { value: "chill", label: "Ça va, je gère plutôt bien" },
        { value: "sometimes", label: "Ça monte parfois, mais ça va" },
        { value: "often", label: "Je suis souvent stressé(e)" },
        { value: "max", label: "Je suis au max, ça déborde" },
      ],
    },
    {
      id: "ado_selfesteem",
      title: "Confiance en toi",
      question: "Comment tu te sens par rapport à toi-même en ce moment ?",
      icon: Star,
      color: "text-[#A855F7]",
      pillar: "devperso",
      options: [
        { value: "confident", label: "Plutôt confiant(e)" },
        { value: "ok", label: "Ça dépend des jours" },
        { value: "low", label: "Je me trouve souvent nul(le)" },
        { value: "very-low", label: "Je me dévalorise beaucoup" },
      ],
    },
    {
      id: "ado_balance",
      title: "Équilibre vie / écrans / sommeil",
      question: "Si tu regardes ton équilibre entre écrans, vie sociale, sommeil…",
      icon: Settings,
      color: "text-[#3B82F6]",
      pillar: "orga",
      options: [
        { value: "balanced", label: "Plutôt équilibré" },
        { value: "okay", label: "Un peu chaotique mais ça va" },
        { value: "tired", label: "Je suis souvent crevé(e) / décalé(e)" },
        { value: "lost", label: "Je n’ai plus vraiment de rythme" },
      ],
    },
  ],

  grandparent: [
    {
      id: "gp_energy",
      title: "Énergie & forme",
      question: "Comment vous sentez-vous physiquement et moralement ces derniers temps ?",
      icon: Heart,
      color: "text-[#22C55E]",
      pillar: "sante",
      options: [
        { value: "good", label: "Plutôt bien, je garde un bon rythme" },
        { value: "tired", label: "Un peu fatigué(e), mais ça va" },
        { value: "low", label: "Je me sens souvent sans énergie" },
        { value: "very-low", label: "Je suis très fatigué(e) ou découragé(e)" },
      ],
    },
    {
      id: "gp_social",
      title: "Lien social",
      question: "Avez-vous régulièrement des contacts (famille, amis, voisins, activités...) ?",
      icon: Users,
      color: "text-[#3B82F6]",
      pillar: "cohesion",
      options: [
        { value: "often", label: "Souvent, je vois du monde" },
        { value: "sometimes", label: "Parfois, mais pas chaque semaine" },
        { value: "rarely", label: "Rarement, je me sens un peu isolé(e)" },
        { value: "never", label: "Presque jamais, je me sens seul(e)" },
      ],
    },
    {
      id: "gp_memory",
      title: "Stimulation & mémoire",
      question: "Vous sentez-vous suffisamment stimulé(e) intellectuellement ?",
      icon: Star,
      color: "text-[#A855F7]",
      pillar: "devperso",
      options: [
        { value: "enough", label: "Oui, j’ai des activités variées" },
        { value: "ok", label: "Un peu, mais je pourrais en faire plus" },
        { value: "low", label: "Peu, j’ai perdu des habitudes" },
        { value: "none", label: "Non, je ne fais presque plus d’activités" },
      ],
    },
    {
      id: "gp_transmission",
      title: "Transmission & partage",
      question: "Avez-vous l’occasion de transmettre votre expérience ou vos histoires ?",
      icon: Baby,
      color: "text-[#F97316]",
      pillar: "orga",
      options: [
        { value: "often", label: "Souvent, avec mes proches" },
        { value: "sometimes", label: "Parfois, mais je voudrais plus" },
        { value: "rarely", label: "Rarement" },
        { value: "never", label: "Non, presque jamais" },
      ],
    },
  ],

  autre: [
    {
      id: "other_stress",
      title: "Stress du quotidien",
      question: "Globalement, comment est votre niveau de stress en ce moment ?",
      icon: Heart,
      color: "text-[#EF4444]",
      pillar: "sante",
      options: [
        { value: "low", label: "Plutôt calme" },
        { value: "medium", label: "Ça monte parfois" },
        { value: "high", label: "Souvent élevé" },
        { value: "very-high", label: "Très élevé / difficile à gérer" },
      ],
    },
    {
      id: "other_sleep",
      title: "Sommeil & récupération",
      question: "Votre sommeil vous permet-il de récupérer correctement ?",
      icon: Settings,
      color: "text-[#3B82F6]",
      pillar: "orga",
      options: [
        { value: "good", label: "Oui, la plupart du temps" },
        { value: "ok", label: "Correct, mais améliorable" },
        { value: "bad", label: "Souvent agité ou trop court" },
        { value: "very-bad", label: "Je dors très mal / très peu" },
      ],
    },
    {
      id: "other_relations",
      title: "Relations & entourage",
      question: "Comment vous sentez-vous dans vos relations (famille, amis, collègues…) ?",
      icon: Users,
      color: "text-[#F97316]",
      pillar: "cohesion",
      options: [
        { value: "good", label: "Globalement bien entouré(e)" },
        { value: "mixed", label: "Mitigé, selon les personnes" },
        { value: "lonely", label: "Souvent seul(e) ou incompris(e)" },
        { value: "isolated", label: "Très isolé(e) ou en conflit" },
      ],
    },
    {
      id: "other_sense",
      title: "Motivation & sens",
      question: "Vous avez le sentiment que votre quotidien a du sens ?",
      icon: Star,
      color: "text-[#A855F7]",
      pillar: "devperso",
      options: [
        { value: "yes", label: "Oui, plutôt" },
        { value: "sometimes", label: "Par moments seulement" },
        { value: "rarely", label: "Rarement" },
        { value: "no", label: "Non, je suis un peu perdu(e)" },
      ],
    },
  ],
};

// Transformation d'une réponse en score de besoin (25 → 100)
const mapAnswerToScore = (value: string): number => {
  // On considère que plus on est vers la "fin" de la liste, plus le besoin est élevé.
  const intensityKeywords = ["very", "max", "exhausted", "out-of-control", "conflict", "never", "isolated"];
  if (intensityKeywords.some((k) => value.includes(k))) return 100;

  if (
    value === "high" ||
    value === "often" ||
    value === "low" ||
    value === "lost" ||
    value === "very-low" ||
    value === "none"
  ) {
    return 75;
  }

  if (
    value === "medium" ||
    value === "tired" ||
    value === "chaotic" ||
    value === "distant" ||
    value === "rarely" ||
    value === "mixed" ||
    value === "sometimes" ||
    value === "ok"
  ) {
    return 50;
  }

  // cas "ça va"
  return 25;
};

type PillarKey = "sante" | "orga" | "cohesion" | "devperso";

const getScoresAndRecommendation = (
  role: RoleKey,
  answers: Record<string, string>
): { scores: Record<PillarKey, number>; globalScore: number; recommendation: Recommendation } => {
  const questions = QUESTION_SETS[role];

  const scoresByPillar: Record<PillarKey, number[]> = {
    sante: [],
    orga: [],
    cohesion: [],
    devperso: [],
  };

  questions.forEach((q) => {
    const answerValue = answers[q.id];
    if (!answerValue) return;
    const score = mapAnswerToScore(answerValue);
    scoresByPillar[q.pillar].push(score);
  });

  const averagedScores: Record<PillarKey, number> = {
    sante:
      scoresByPillar.sante.length > 0
        ? Math.round(scoresByPillar.sante.reduce((a, b) => a + b, 0) / scoresByPillar.sante.length)
        : 25,
    orga:
      scoresByPillar.orga.length > 0
        ? Math.round(scoresByPillar.orga.reduce((a, b) => a + b, 0) / scoresByPillar.orga.length)
        : 25,
    cohesion:
      scoresByPillar.cohesion.length > 0
        ? Math.round(scoresByPillar.cohesion.reduce((a, b) => a + b, 0) / scoresByPillar.cohesion.length)
        : 25,
    devperso:
      scoresByPillar.devperso.length > 0
        ? Math.round(scoresByPillar.devperso.reduce((a, b) => a + b, 0) / scoresByPillar.devperso.length)
        : 25,
  };

  const globalScore = Math.round(
    (averagedScores.sante + averagedScores.orga + averagedScores.cohesion + averagedScores.devperso) / 4
  );

  // On choisit le pilier avec le besoin le plus fort
  const maxPillar = (Object.keys(averagedScores) as PillarKey[]).reduce((best, current) =>
    averagedScores[current] > averagedScores[best] ? current : best
  , "sante");

  const diffLevel = averagedScores[maxPillar];

  const recMatrix: Record<RoleKey, Record<PillarKey, Recommendation>> = {
    salarie: {
      sante: {
        name: "Box Reset & Sérénité",
        description: "Pour apaiser la charge mentale, mieux dormir et relâcher la pression.",
        color: "bg-[#22C55E]",
        products: [
          "Tisanes relaxantes & rituels du soir",
          "Outils de respiration guidée",
          "Accessoires anti-stress Made in France",
          "Mini-guide “Faire redescendre la pression au travail”",
        ],
        tagline: "On commence par prendre soin de toi, avant de prendre soin des chiffres.",
      },
      orga: {
        name: "Box Efficacité & Rythme",
        description: "Pour reprendre le contrôle sur ton agenda, ta charge et tes priorités.",
        color: "bg-[#3B82F6]",
        products: [
          "Planner hebdo & to-do list intelligente",
          "Accessoire ergonomique pour ton poste de travail",
          "Mini-guide “Dire non sans culpabiliser”",
          "Rituels de début / fin de journée",
        ],
        tagline: "Moins subir, plus choisir : on remet du cadre, pas du contrôle.",
      },
      cohesion: {
        name: "Box Cohésion d’Équipe",
        description: "Pour recréer du lien, de la confiance et du plaisir à travailler ensemble.",
        color: "bg-[#F97316]",
        products: [
          "Jeux de cohésion ultra simples",
          "Cartes brise-glace pour réunions",
          "Mini-guide de feedback bienveillant",
          "Goodies à partager en équipe",
        ],
        tagline: "Parce que la météo émotionnelle d’une équipe, ça se travaille à plusieurs.",
      },
      devperso: {
        name: "Box Inspiration & Évolution",
        description: "Pour retrouver de l’élan, clarifier la suite et réveiller tes envies.",
        color: "bg-[#A855F7]",
        products: [
          "Livre ou livret de développement professionnel",
          "Carnet de projection & questions puissantes",
          "Sélection de contenus audio inspirants",
          "Rituels pour faire le point tous les mois",
        ],
        tagline: "Ta trajectoire mérite mieux que le mode pilote automatique.",
      },
    },

    parent: {
      sante: {
        name: "Box Parent Respire",
        description: "Pour alléger la charge mentale et retrouver un peu d’oxygène.",
        color: "bg-[#22C55E]",
        products: [
          "Rituels rapides de pause pour parents pressés",
          "Tisane ou douceurs réconfortantes",
          "Mini-guide “Je fais de mon mieux (et c’est déjà énorme)”",
          "Petits outils pour demander de l’aide sans culpabiliser",
        ],
        tagline: "Tu n’as pas besoin d’être parfait(e), juste de ne plus être seul(e) face à tout.",
      },
      orga: {
        name: "Box Organisation Familiale",
        description: "Pour fluidifier les routines du matin, du soir et du week-end.",
        color: "bg-[#3B82F6]",
        products: [
          "Planning familial magnétique ou mural",
          "Tableau des missions partagées (adapté aux enfants)",
          "Rituels du soir pour préparer le lendemain",
          "Idées de micro-routines gagnantes",
        ],
        tagline: "On ne supprime pas le bazar, mais on remet un peu de tempo dedans.",
      },
      cohesion: {
        name: "Box Lien Parent-Ado",
        description: "Pour rouvrir le dialogue sans forcer, et créer de vrais moments ensemble.",
        color: "bg-[#F97316]",
        products: [
          "Jeu de cartes “questions qui comptent”",
          "Activités sans écrans à partager",
          "Guide pour mieux écouter sans juger",
          "Mini-rituels de check-in émotionnel en famille",
        ],
        tagline: "Ce n’est pas trop tard pour se comprendre un peu mieux, pas à pas.",
      },
      devperso: {
        name: "Box Parent Temps Pour Soi",
        description: "Pour te remettre aussi dans la to-do, pas seulement au service des autres.",
        color: "bg-[#A855F7]",
        products: [
          "Carnet de reconnexion à soi",
          "Idées de micro-moments rien que pour toi",
          "Douceurs bien-être (lecture, self-care, petit objet)",
          "Mini-guide “Me remettre sur la liste des priorités”",
        ],
        tagline: "Tu as le droit d’exister en dehors des lessives et des réunions parents-profs.",
      },
    },

    ado: {
      sante: {
        name: "Box Ado Respire",
        description: "Pour t’aider à faire redescendre la pression (école, réseaux, regard des autres…).",
        color: "bg-[#EF4444]",
        products: [
          "Cartes d’exercices simples pour gérer le stress",
          "Rituels express pour dormir un peu mieux",
          "Affiche ou support “Ma météo émotionnelle”",
          "Accès à des contenus audio d’apaisement",
        ],
        tagline: "Tu as le droit d’être stressé(e), mais pas de rester seul(e) avec ça.",
      },
      orga: {
        name: "Box Ado Organisation",
        description: "Pour t’aider à gérer un peu mieux devoirs, écrans, sommeil et temps pour toi.",
        color: "bg-[#3B82F6]",
        products: [
          "Planner simple et visuel",
          "Outils pour mieux gérer les écrans",
          "Astuce pour réviser sans t’arracher les cheveux",
          "Rituels de début / fin de journée",
        ],
        tagline: "Pas besoin d’être parfait(e), juste de trouver un rythme qui te ressemble.",
      },
      cohesion: {
        name: "Box Ado Lien & Expression",
        description: "Pour t’aider à mettre des mots sur ce que tu ressens et à te faire entendre.",
        color: "bg-[#F97316]",
        products: [
          "Carnet d’expression sans jugement",
          "Cartes pour parler avec un parent ou un adulte",
          "Mini-guide sur les émotions (sans blabla inutile)",
          "Idées de phrases pour dire ce que tu ressens",
        ],
        tagline: "Tu as le droit d’avoir ta voix et ton espace, sans être parfait(e).",
      },
      devperso: {
        name: "Box Ado Confiance",
        description: "Pour renforcer ton estime de toi et te rappeler que tu vaux bien plus que des notes.",
        color: "bg-[#A855F7]",
        products: [
          "Carnet de fiertés & réussites",
          "Affirmations positives adaptées aux ados",
          "Activités pour explorer qui tu es",
          "Mini-guide “Je ne suis pas que mes résultats”",
        ],
        tagline: "Ton histoire ne se résume pas à ce qu’on écrit sur un bulletin.",
      },
    },

    grandparent: {
      sante: {
        name: "Box Douceur & Routine",
        description: "Pour prendre soin de votre énergie et installer des petits rituels réconfortants.",
        color: "bg-[#22C55E]",
        products: [
          "Tisanes ou douceurs réconfortantes",
          "Idées de rituels matin / soir doux",
          "Mini-guide “Prendre soin de soi en douceur”",
          "Support pour suivre son humeur et son énergie",
        ],
        tagline: "Chaque journée mérite sa petite lumière, même les plus calmes.",
      },
      orga: {
        name: "Box Transmission & Mémoire",
        description: "Pour garder vivants vos souvenirs, vos histoires et votre expérience.",
        color: "bg-[#3B82F6]",
        products: [
          "Carnet de mémoire et anecdotes",
          "Idées de jeux de mémoire simples",
          "Activités à faire avec petits-enfants ou proches",
          "Mini-guide pour transmettre en douceur",
        ],
        tagline: "Vos histoires sont des trésors, on vous aide à les partager.",
      },
      cohesion: {
        name: "Box Lien & Rencontres",
        description: "Pour nourrir les liens avec votre entourage et rompre l’isolement.",
        color: "bg-[#F97316]",
        products: [
          "Idées d’activités à deux ou en groupe",
          "Supports pour lancer la conversation",
          "Propositions de rituels avec proches ou voisins",
          "Mini-guide “Recréer du lien pas à pas”",
        ],
        tagline: "Vous n’avez pas à rester seul(e) sur votre île, même si elle est jolie.",
      },
      devperso: {
        name: "Box Découverte & Curiosité",
        description: "Pour garder l’esprit vivant, curieux, et continuer à apprendre.",
        color: "bg-[#A855F7]",
        products: [
          "Suggestions de lectures accessibles",
          "Jeux ou activités de découverte",
          "Idées de sorties ou explorations locales",
          "Mini-guide pour nourrir sa curiosité au quotidien",
        ],
        tagline: "Il n’y a pas d’âge pour s’émerveiller encore un peu.",
      },
    },

    autre: {
      sante: {
        name: "Box Bien-Être Essentiel",
        description: "Pour apaiser le stress et retrouver un peu de marge de manœuvre.",
        color: "bg-[#22C55E]",
        products: [
          "Outils anti-stress simples",
          "Petits rituels de pause",
          "Tisanes ou douceurs calmantes",
          "Mini-guide pour mieux écouter son corps",
        ],
        tagline: "On commence par t’offrir un peu d’air dans ta journée.",
      },
      orga: {
        name: "Box Sommeil & Rythme",
        description: "Pour t’aider à reconstruire un rythme plus doux et récupérateur.",
        color: "bg-[#3B82F6]",
        products: [
          "Rituels du soir & routine de sommeil",
          "Mini-guide sur les écrans & le soir",
          "Outils pour préparer calmement le lendemain",
          "Support pour suivre ton sommeil",
        ],
        tagline: "Un meilleur sommeil, ce n’est pas du luxe, c’est une base.",
      },
      cohesion: {
        name: "Box Lien & Entourage",
        description: "Pour t’aider à ne plus te sentir seul(e) avec ce que tu traverses.",
        color: "bg-[#F97316]",
        products: [
          "Cartes de discussion à partager",
          "Idées de petites actions pour recréer du lien",
          "Guide “Demander du soutien sans honte”",
          "Rituels pour prendre des nouvelles ou en donner",
        ],
        tagline: "Tu as le droit d’être entouré(e), même si tu n’aimes pas déranger.",
      },
      devperso: {
        name: "Box Sens & Reconnexion",
        description: "Pour t’aider à retrouver un fil conducteur dans ton quotidien.",
        color: "bg-[#A855F7]",
        products: [
          "Carnet de questions pour faire le point",
          "Exercices de projection simple",
          "Mini-guide “Retrouver un peu de sens”",
          "Rituels de gratitude & d’ancrage",
        ],
        tagline: "On n’a pas toutes les réponses, mais on peut déjà rallumer une petite luciole.",
      },
    },
  };

  let recommendation = recMatrix[role][maxPillar];

  // Si les scores sont tous très bas, on peut orienter vers une box de consolidation douce
  if (diffLevel <= 35) {
    recommendation = {
      ...recommendation,
      tagline:
        "Bonne nouvelle : ta météo n’est pas en alerte rouge. On va surtout t’aider à consolider ce qui va déjà bien.",
    };
  }

  return { scores: averagedScores, globalScore, recommendation };
};

const SimulateurPage = () => {
  const [role, setRole] = useState<RoleKey | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const currentQuestions = role ? QUESTION_SETS[role] : [];
  const currentQuestion = currentQuestions[currentStep];

  const handleRoleSelect = (selected: RoleKey) => {
    setRole(selected);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (!role) return;
    if (currentStep < currentQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      setRole(null);
      setAnswers({});
      setShowResults(false);
      return;
    }
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleGoToBoxes = () => {
    navigate("/box");
  };

  const handleSaveAndGoDashboard = async () => {
    if (!role) return;

    const { scores, globalScore, recommendation } = getScoresAndRecommendation(role, answers);

    if (!user) {
      navigate("/auth/login");
      return;
    }

    try {
      const { error } = await supabase.from("needs_assessments").insert([
        {
          scores_sante: scores.sante,
          scores_orga: scores.orga,
          scores_cohesion: scores.cohesion,
          scores_devperso: scores.devperso,
          box_recommandee: recommendation.name,
          note_globale: globalScore,
          source: `simulateur_${role}`,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Évaluation sauvegardée",
        description: "Vos résultats ont été ajoutés à votre profil.",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving assessment:", err);
      toast({
        title: "Enregistrement impossible",
        description: "Votre évaluation est visible, mais n’a pas pu être sauvegardée.",
        variant: "destructive",
      });
    }
  };

  // === CALCUL PROGRESSION ===
  const progress =
    role && currentQuestions.length > 0 ? ((currentStep + 1) / currentQuestions.length) * 100 : 0;

  // === ÉTAT RÉSULTATS ===
  if (showResults && role) {
    const { scores, globalScore, recommendation } = getScoresAndRecommendation(role, answers);
    const roleInfo = ROLE_CONFIG.find((r) => r.key === role)!;

    return (
      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />

        <div className="relative z-10 pt-24 px-6 pb-16">
          <div className="container mx-auto max-w-2xl">
            <Button
              onClick={() => {
                setShowResults(false);
                setCurrentStep(0);
              }}
              variant="outline"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Refaire l’évaluation
            </Button>

            <div className="text-center mb-8">
              <p className="text-sm text-foreground/60 mb-2">
                Profil sélectionné : <span className="font-semibold">{roleInfo.emoji} {roleInfo.label}</span>
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-inter">
                🎉 Votre <span className="text-primary">Box recommandée</span>
              </h1>
              <p className="text-foreground/70 font-lato">
                Voici la box QVT Box la plus adaptée à votre météo émotionnelle actuelle.
              </p>
            </div>

            <div className="card-professional p-8 space-y-6">
              <div className="text-center">
                <div
                  className={`w-20 h-20 ${recommendation.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2 font-inter">
                  {recommendation.name}
                </h2>
                <p className="text-foreground/70 text-base font-lato mb-3">
                  {recommendation.description}
                </p>
                <p className="text-sm text-foreground/60 italic">{recommendation.tagline}</p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  🎁 Dans votre box, vous trouverez :
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendation.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-foreground/80 font-lato">{product}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground/60 font-semibold mb-1">
                    Votre météo globale
                  </p>
                  <p className="text-lg font-bold text-foreground font-inter">
                    {globalScore} / 100
                  </p>
                  <p className="text-xs text-foreground/60 font-lato">
                    Plus le score est élevé, plus le besoin d’attention est important.
                  </p>
                </div>
                <div className="w-full sm:w-1/2 space-y-2">
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>Santé & énergie</span>
                    <span>{scores.sante} / 100</span>
                  </div>
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>Organisation & rythme</span>
                    <span>{scores.orga} / 100</span>
                  </div>
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>Relations & lien</span>
                    <span>{scores.cohesion} / 100</span>
                  </div>
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>Sens & projection</span>
                    <span>{scores.devperso} / 100</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {user ? (
                  <Button onClick={handleSaveAndGoDashboard} className="flex-1">
                    Enregistrer et voir dans mon tableau de bord
                  </Button>
                ) : (
                  <Button onClick={() => navigate("/auth/login")} className="flex-1">
                    Créer mon espace pour suivre mes résultats
                  </Button>
                )}

                <Button variant="outline" onClick={handleGoToBoxes} className="flex-1">
                  Explorer toutes les box
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // === ÉTAT SÉLECTION DE RÔLE ===
  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />

        <div className="relative z-10 pt-24 px-6 pb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-primary shadow">
                <Sparkles className="w-4 h-4" />
                Ma bulle attentionnée – version multi-profils
              </p>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold text-foreground font-inter">
                Avant de commencer, par qui{" "}
                <span className="text-primary">parle-t-on vraiment ?</span>
              </h1>
              <p className="mt-3 text-foreground/70 font-lato max-w-2xl mx-auto">
                QVT Box ne pose pas les mêmes questions à un salarié, un parent, un ado ou un
                grand-parent. Choisissez le profil qui vous correspond le mieux aujourd’hui :
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROLE_CONFIG.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleRoleSelect(r.key)}
                  className={`card-professional p-4 text-left flex flex-col gap-2 hover:shadow-floating transition group ${r.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-lg">
                      {r.emoji}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${r.color}`}>{r.label}</p>
                      <p className="text-xs text-foreground/60">Cliquer pour continuer</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mt-2 font-lato">
                    {r.description}
                  </p>
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs text-foreground/60 text-center font-lato">
              Vous pourrez toujours refaire l’évaluation plus tard avec un autre profil
              (parent, ado, salarié, grand-parent…).
            </p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // === ÉTAT QUESTIONS ===
  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />

      <div className="relative z-10 pt-24 px-6 pb-16">
        <div className="container mx-auto max-w-2xl">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 0 ? "Changer de profil" : "Question précédente"}
          </Button>

          <div className="text-center mb-8">
            <p className="text-xs text-foreground/60 mb-1">
              Étape {currentStep + 1} sur {currentQuestions.length}
            </p>
            <Progress value={progress} className="w-full h-2 mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground font-inter mb-2">
              Ma bulle attentionnée –{" "}
              <span className="text-primary">
                {ROLE_CONFIG.find((r) => r.key === role)?.label}
              </span>
            </h1>
            <p className="text-sm text-foreground/70 font-lato">
              Répondez simplement, sans vous juger. Il n’y a pas de bonne ou de mauvaise réponse.
            </p>
          </div>

          {currentQuestion && (
            <div className="card-professional p-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <currentQuestion.icon className={`w-8 h-8 ${currentQuestion.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1 font-inter">
                  {currentQuestion.title}
                </h3>
                <p className="text-foreground/70 font-lato">
                  {currentQuestion.question}
                </p>
              </div>

              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      answers[currentQuestion.id] === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/60"
                    }`}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-sm font-lato">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                >
                  {currentStep === currentQuestions.length - 1
                    ? "Voir ma box recommandée"
                    : "Question suivante"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SimulateurPage;
