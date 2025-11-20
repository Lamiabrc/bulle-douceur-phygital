// src/pages/SimulateurPage.tsx
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingBubbles from "@/components/FloatingBubbles";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import {
  Heart,
  Settings,
  Users,
  Star,
  Smile,
  Baby,
  Briefcase,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Moon,
  Globe2,
  ArrowRight,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// ---- Types ----
type ProfileId = "salarie" | "parent" | "ado" | "senior" | "autre";

type DimensionKey = "stress" | "organisation" | "relations" | "energie" | "equilibre";

type QuestionOption = {
  value: number; // 1 à 4
  label: string;
};

type Question = {
  id: string;
  dimension: DimensionKey;
  title: string;
  question: string;
  helper?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  options: QuestionOption[];
};

// ---- Profils ----
const profiles: {
  id: ProfileId;
  label: string;
  emoji: string;
  description: string;
}[] = [
  {
    id: "salarie",
    label: "Salarié(e)",
    emoji: "💼",
    description: "Vous travaillez actuellement (CDI, CDD, intérim, fonction publique…).",
  },
  {
    id: "parent",
    label: "Parent",
    emoji: "👨‍👩‍👧",
    description: "Vous avez au moins un enfant à charge (ou au quotidien).",
  },
  {
    id: "ado",
    label: "Adolescent(e)",
    emoji: "🧑‍🎓",
    description: "Collégien·ne, lycéen·ne ou étudiant·e qui vit une période chargée.",
  },
  {
    id: "senior",
    label: "Grand-parent / Senior",
    emoji: "👵",
    description: "Vous êtes à la retraite ou en transition, avec ou sans petits-enfants.",
  },
  {
    id: "autre",
    label: "Autre situation",
    emoji: "🌈",
    description: "Vous ne vous retrouvez pas dans ces catégories, mais vous avez besoin d’un coup de pouce.",
  },
];

// ---- Questions par profil ----
// Les dimensions sont stables pour ton futur modèle ML.
// Les formulations changent selon le profil pour rester pertinentes.
const questionsByProfile: Record<ProfileId, Question[]> = {
  salarie: [
    {
      id: "stress_salarie",
      dimension: "stress",
      title: "Pression & charge mentale",
      question: "En ce moment, comment vivez-vous votre niveau de pression au travail ?",
      helper: "On parle autant du mental que du corps : sommeil, tensions, fatigue…",
      icon: Heart,
      options: [
        { value: 1, label: "Ça ne va pas du tout, je suis épuisé(e)" },
        { value: 2, label: "C’est compliqué, je tiens mais c’est lourd" },
        { value: 3, label: "Globalement ça va, quelques journées difficiles" },
        { value: 4, label: "Je me sens plutôt serein(e) au quotidien" },
      ],
    },
    {
      id: "orga_salarie",
      dimension: "organisation",
      title: "Organisation & charge de travail",
      question: "Comment ressentez-vous votre organisation et votre charge de travail ?",
      icon: Settings,
      options: [
        { value: 1, label: "Je suis souvent débordé(e), rien n’est clair" },
        { value: 2, label: "C’est souvent chargé, j’ai du mal à tout suivre" },
        { value: 3, label: "C’est assez fluide, même si ça pourrait être mieux" },
        { value: 4, label: "Je suis bien organisé(e) et je maîtrise ma charge" },
      ],
    },
    {
      id: "relations_salarie",
      dimension: "relations",
      title: "Relations avec l’équipe",
      question: "Comment ça se passe avec vos collègues et votre hiérarchie ?",
      icon: Users,
      options: [
        { value: 1, label: "Tendu ou conflictuel, je me sens isolé(e)" },
        { value: 2, label: "Des tensions et malentendus fréquents" },
        { value: 3, label: "Globalement correct, avec quelques frictions" },
        { value: 4, label: "Très bonnes relations, je me sens soutenu(e)" },
      ],
    },
    {
      id: "energie_salarie",
      dimension: "energie",
      title: "Énergie & motivation",
      question: "Quel est votre niveau d’énergie et de motivation ces dernières semaines ?",
      icon: Star,
      options: [
        { value: 1, label: "Je suis vidé(e), j’ai du mal à me lever pour aller travailler" },
        { value: 2, label: "Je fatigue vite, la motivation fluctue" },
        { value: 3, label: "Je tiens la route, même si je suis parfois à plat" },
        { value: 4, label: "Je me sens dynamique et plutôt motivé(e)" },
      ],
    },
    {
      id: "equilibre_salarie",
      dimension: "equilibre",
      title: "Équilibre vie pro / perso",
      question: "Comment jugez-vous l’équilibre entre votre travail et votre vie personnelle ?",
      icon: Moon,
      options: [
        { value: 1, label: "Le travail prend toute la place, je n’ai plus de marge" },
        { value: 2, label: "L’équilibre est fragile, je fais au mieux" },
        { value: 3, label: "C’est plutôt équilibré, avec des pics de charge" },
        { value: 4, label: "Je protège bien mes temps perso et mes limites" },
      ],
    },
  ],

  parent: [
    {
      id: "stress_parent",
      dimension: "stress",
      title: "Fatigue parentale",
      question: "Comment vous sentez-vous dans votre rôle de parent en ce moment ?",
      icon: Heart,
      options: [
        { value: 1, label: "Épuisé(e), à bout de souffle" },
        { value: 2, label: "Très fatigué(e), je fais comme je peux" },
        { value: 3, label: "Souvent fatigué(e), mais ça reste gérable" },
        { value: 4, label: "Plutôt serein(e), même s’il y a des journées sport" },
      ],
    },
    {
      id: "orga_parent",
      dimension: "organisation",
      title: "Organisation du quotidien",
      question: "Comment se passe l’organisation du quotidien (repas, devoirs, RDV, activités) ?",
      icon: Settings,
      options: [
        { value: 1, label: "C’est le chaos, je cours tout le temps" },
        { value: 2, label: "C’est souvent la course, j’improvise beaucoup" },
        { value: 3, label: "C’est globalement structuré, même si ça déborde parfois" },
        { value: 4, label: "Je me sens bien organisé(e), chacun a ses repères" },
      ],
    },
    {
      id: "relations_parent",
      dimension: "relations",
      title: "Relations avec vos enfants",
      question: "Comment décririez-vous la relation avec vos enfants en ce moment ?",
      icon: Users,
      options: [
        { value: 1, label: "Très tendue, beaucoup de conflits ou de distance" },
        { value: 2, label: "Souvent compliquée, on se comprend mal" },
        { value: 3, label: "Plutôt correcte, malgré quelques tensions" },
        { value: 4, label: "Complice et ouverte, on arrive à se parler" },
      ],
    },
    {
      id: "energie_parent",
      dimension: "energie",
      title: "Énergie & temps pour soi",
      question: "Avez-vous encore du temps et de l’énergie pour vous-même ?",
      icon: Star,
      options: [
        { value: 1, label: "Presque jamais, je m’oublie complètement" },
        { value: 2, label: "Rarement, et je culpabilise quand je le prends" },
        { value: 3, label: "Par moments, j’essaie de me préserver" },
        { value: 4, label: "Oui, j’arrive à garder du temps pour moi" },
      ],
    },
    {
      id: "equilibre_parent",
      dimension: "equilibre",
      title: "Équilibre famille / le reste",
      question: "Comment se combine votre vie de parent avec le reste (travail, couple, loisirs) ?",
      icon: Globe2,
      options: [
        { value: 1, label: "Tout tourne autour de la famille, le reste est sacrifié" },
        { value: 2, label: "L’équilibre est fragile, je jongle tout le temps" },
        { value: 3, label: "Ça tient, même si ce n’est pas parfait" },
        { value: 4, label: "J’ai trouvé un équilibre qui me convient" },
      ],
    },
  ],

  ado: [
    {
      id: "stress_ado",
      dimension: "stress",
      title: "Émotions & pression",
      question: "En ce moment, comment tu te sens dans ta tête ?",
      icon: Heart,
      options: [
        { value: 1, label: "Pas bien du tout, je me sens noyé(e)" },
        { value: 2, label: "Souvent stressé(e), j’ai du mal à gérer" },
        { value: 3, label: "Ça va, même si parfois c’est lourd" },
        { value: 4, label: "Plutôt bien, je gère globalement" },
      ],
    },
    {
      id: "orga_ado",
      dimension: "organisation",
      title: "Cours & organisation",
      question: "Comment ça se passe pour les cours / études / devoirs ?",
      icon: Settings,
      options: [
        { value: 1, label: "Je suis complètement perdu(e), je ne m’en sors pas" },
        { value: 2, label: "Je galère, c’est dur de m’y mettre" },
        { value: 3, label: "Je m’en sors à peu près" },
        { value: 4, label: "Je suis plutôt organisé(e) et à l’aise" },
      ],
    },
    {
      id: "relations_ado",
      dimension: "relations",
      title: "Relations & entourage",
      question: "Et avec les autres (amis, famille, proches), comment ça va ?",
      icon: Users,
      options: [
        { value: 1, label: "Je me sens seul(e) ou incompris(e)" },
        { value: 2, label: "Beaucoup de tensions ou de prises de tête" },
        { value: 3, label: "Mitigé : parfois cool, parfois compliqué" },
        { value: 4, label: "Globalement ça va, je me sens entouré(e)" },
      ],
    },
    {
      id: "energie_ado",
      dimension: "energie",
      title: "Énergie & fatigue",
      question: "Comment tu te sens physiquement en ce moment ?",
      icon: Star,
      options: [
        { value: 1, label: "Épuisé(e), je n’ai envie de rien" },
        { value: 2, label: "Souvent fatigué(e), je traîne" },
        { value: 3, label: "Ça va, même si j’ai des coups de mou" },
        { value: 4, label: "Plutôt en forme" },
      ],
    },
    {
      id: "equilibre_ado",
      dimension: "equilibre",
      title: "Écran / vie réelle",
      question: "Entre les écrans et la “vraie vie”, comment tu trouves ton équilibre ?",
      icon: Moon,
      options: [
        { value: 1, label: "Je suis tout le temps sur les écrans, ça m’échappe" },
        { value: 2, label: "Je sais que c’est trop, mais c’est dur d’arrêter" },
        { value: 3, label: "Je fais attention, même si c’est pas parfait" },
        { value: 4, label: "Je gère bien, j’ai trouvé un bon équilibre" },
      ],
    },
  ],

  senior: [
    {
      id: "stress_senior",
      dimension: "stress",
      title: "Sérénité au quotidien",
      question: "Comment vous sentez-vous dans votre quotidien actuel ?",
      icon: Heart,
      options: [
        { value: 1, label: "Anxieux(se), préoccupé(e) très souvent" },
        { value: 2, label: "Souvent inquiet(ète), je rumine beaucoup" },
        { value: 3, label: "Plutôt serein(e), avec quelques inquiétudes" },
        { value: 4, label: "Globalement apaisé(e) et confiant(e)" },
      ],
    },
    {
      id: "orga_senior",
      dimension: "organisation",
      title: "Rythme de vie",
      question: "Comment vivez-vous votre rythme de vie (temps, activités, soins…) ?",
      icon: Settings,
      options: [
        { value: 1, label: "Je me sens perdu(e) ou désorganisé(e)" },
        { value: 2, label: "Je peine à trouver un rythme qui me convient" },
        { value: 3, label: "Je commence à trouver mes repères" },
        { value: 4, label: "J’ai un rythme qui me va bien" },
      ],
    },
    {
      id: "relations_senior",
      dimension: "relations",
      title: "Lien social & famille",
      question: "Comment sentez-vous vos liens avec la famille, les amis, le voisinage ?",
      icon: Users,
      options: [
        { value: 1, label: "Je me sens isolé(e) et très seul(e)" },
        { value: 2, label: "Je vois des gens, mais pas assez à mon goût" },
        { value: 3, label: "Je garde un lien régulier" },
        { value: 4, label: "Je me sens bien entouré(e)" },
      ],
    },
    {
      id: "energie_senior",
      dimension: "energie",
      title: "Énergie & santé",
      question: "Comment décririez-vous votre énergie globale ces derniers temps ?",
      icon: Star,
      options: [
        { value: 1, label: "Très faible, j’ai du mal à faire le minimum" },
        { value: 2, label: "Fatigable, j’ai besoin de beaucoup de récupération" },
        { value: 3, label: "Correcte, je fais ce que j’ai à faire" },
        { value: 4, label: "Plutôt bonne, je reste actif(ve)" },
      ],
    },
    {
      id: "equilibre_senior",
      dimension: "equilibre",
      title: "Sens & projets",
      question: "Avez-vous l’impression de garder des projets, des envies, des choses à transmettre ?",
      icon: Globe2,
      options: [
        { value: 1, label: "Peu ou pas, je me sens vide ou inutile" },
        { value: 2, label: "Quelques envies, mais je ne les concrétise pas" },
        { value: 3, label: "Oui, j’ai encore des projets en tête" },
        { value: 4, label: "Oui, j’ai une vraie envie de transmettre et d’agir" },
      ],
    },
  ],

  autre: [
    {
      id: "stress_autre",
      dimension: "stress",
      title: "État intérieur",
      question: "Globalement, comment vous sentez-vous en ce moment ?",
      icon: Heart,
      options: [
        { value: 1, label: "Pas bien du tout, je suis au bout" },
        { value: 2, label: "Plutôt mal, c’est très lourd" },
        { value: 3, label: "Mitigé, il y a du bon et du moins bon" },
        { value: 4, label: "Plutôt bien, je tiens le cap" },
      ],
    },
    {
      id: "orga_autre",
      dimension: "organisation",
      title: "Organisation & charge",
      question: "Comment vous vivez votre charge mentale et vos responsabilités ?",
      icon: Settings,
      options: [
        { value: 1, label: "Tout s’accumule, je n’arrive plus à gérer" },
        { value: 2, label: "C’est souvent trop, je m’éparpille" },
        { value: 3, label: "Je fais au mieux, ça tient à peu près" },
        { value: 4, label: "Je me sens globalement organisé(e)" },
      ],
    },
    {
      id: "relations_autre",
      dimension: "relations",
      title: "Relation aux autres",
      question: "Comment ça se passe avec votre entourage principal ?",
      icon: Users,
      options: [
        { value: 1, label: "Conflits, distance ou incompréhensions fortes" },
        { value: 2, label: "Des tensions fréquentes, mais pas tout le temps" },
        { value: 3, label: "Assez neutre, ça varie selon les jours" },
        { value: 4, label: "Plutôt bien, je me sens entouré(e)" },
      ],
    },
    {
      id: "energie_autre",
      dimension: "energie",
      title: "Énergie globale",
      question: "Quelle est votre énergie générale (corps + mental) ?",
      icon: Star,
      options: [
        { value: 1, label: "Très basse, je n’ai plus de ressources" },
        { value: 2, label: "Faible, je tiens mais c’est dur" },
        { value: 3, label: "Correcte, avec des coups de mou" },
        { value: 4, label: "Bonne, je me sens plutôt solide" },
      ],
    },
    {
      id: "equilibre_autre",
      dimension: "equilibre",
      title: "Équilibre de vie",
      question: "Avez-vous l’impression que votre vie est “équilibrée” entre les différentes sphères ?",
      icon: Moon,
      options: [
        { value: 1, label: "Pas du tout, une sphère écrase tout le reste" },
        { value: 2, label: "Très fragile, j’essaie de tout tenir" },
        { value: 3, label: "C’est imparfait mais acceptable" },
        { value: 4, label: "Je suis assez aligné(e) avec ce que je veux" },
      ],
    },
  ],
};

// ---- Reco de box selon profil + dimension la plus fragile ----
type BoxReco = {
  name: string;
  description: string;
  bullets: string[];
  badge: string;
};

function getBoxRecommendation(profile: ProfileId, weakestDimension: DimensionKey): BoxReco {
  // On définit quelques “templates” par profil
  const genericByDimension: Record<DimensionKey, BoxReco> = {
    stress: {
      name: "Box Bulle Anti-Pression",
      description: "Une bulle de récupération pour apaiser le mental et le corps.",
      badge: "Soutien émotionnel",
      bullets: ["Rituels de décompression", "Tisanes & douceurs", "Micro-pauses guidées", "Carnet d’émotions"],
    },
    organisation: {
      name: "Box Bulle Organisation",
      description: "Pour remettre de la clarté, des repères et du rythme dans le quotidien.",
      badge: "Clarté & structure",
      bullets: ["Planner simplifié", "Outils d’organisation visuelle", "Méthodes pas à pas", "Astuce anti-charge mentale"],
    },
    relations: {
      name: "Box Bulle Relations",
      description: "Une invitation à renouer le dialogue, la confiance et la complicité.",
      badge: "Lien & communication",
      bullets: ["Jeux ou activités à partager", "Cartes pour lancer la discussion", "Mini-guides de communication", "Rituels de gratitude"],
    },
    energie: {
      name: "Box Bulle Énergie",
      description: "Pour recharger progressivement les batteries sans se brusquer.",
      badge: "Vitalité douce",
      bullets: ["Infusions & snacks réconfort", "Mouvements doux", "Micro-objectifs d’énergie", "Routine de sommeil apaisante"],
    },
    equilibre: {
      name: "Box Bulle Équilibre",
      description: "Pour remettre un peu de place pour soi et ce qui compte vraiment.",
      badge: "Vie pro / perso / soi",
      bullets: ["Exercices pour poser ses limites", "Carnet de priorités essentielles", "Rituels courts de recentrage", "Moments qualitatifs à planifier"],
    },
  };

  // Ajustements par profil (nom/description)
  const base = genericByDimension[weakestDimension];

  if (profile === "salarie") {
    return {
      ...base,
      name:
        weakestDimension === "organisation"
          ? "Box Efficacité Douce au Travail"
          : weakestDimension === "relations"
          ? "Box Cohésion & Dialogue"
          : weakestDimension === "stress"
          ? "Box Focus & Reset"
          : base.name,
      badge: "Salariés & équipes",
    };
  }

  if (profile === "parent") {
    return {
      ...base,
      name:
        weakestDimension === "relations"
          ? "Box Parent–Enfant, Parlons Vrai"
          : weakestDimension === "organisation"
          ? "Box Famille Organisée"
          : weakestDimension === "stress"
          ? "Box Souffle de Parent"
          : base.name,
      badge: "Parents & famille",
    };
  }

  if (profile === "ado") {
    return {
      ...base,
      name:
        weakestDimension === "stress"
          ? "Box Ado Douceur & Confiance"
          : weakestDimension === "relations"
          ? "Box Lien & Amitiés"
          : weakestDimension === "organisation"
          ? "Box Organisation School Life"
          : base.name,
      badge: "Ados & jeunes",
    };
  }

  if (profile === "senior") {
    return {
      ...base,
      name:
        weakestDimension === "relations"
          ? "Box Lien & Transmission"
          : weakestDimension === "stress"
          ? "Box Sérénité & Souvenirs"
          : base.name,
      badge: "Grands-parents & seniors",
    };
  }

  return {
    ...base,
    badge: "Bulle sur-mesure",
  };
}

// ---- Calcul des scores pour la BDD ----
type Scores = {
  scores_sante: number;
  scores_orga: number;
  scores_cohesion: number;
  scores_devperso: number;
  note_globale: number;
  weakestDimension: DimensionKey;
};

function computeScores(profile: ProfileId, answers: Record<string, number>): Scores {
  const questions = questionsByProfile[profile];

  const byDimension: Record<DimensionKey, number[]> = {
    stress: [],
    organisation: [],
    relations: [],
    energie: [],
    equilibre: [],
  };

  questions.forEach((q) => {
    const v = answers[q.id];
    if (v != null) {
      byDimension[q.dimension].push(v);
    }
  });

  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  const stressAvg = avg(byDimension.stress);
  const orgaAvg = avg(byDimension.organisation);
  const relAvg = avg(byDimension.relations);
  const energieAvg = avg(byDimension.energie);
  const equilibreAvg = avg(byDimension.equilibre);

  // Scores sur 100 (1 à 4 → 25 à 100)
  const to100 = (x: number) => Math.round((x / 4) * 100);

  const scores_sante = to100(stressAvg);
  const scores_orga = to100(orgaAvg);
  const scores_cohesion = to100(relAvg);
  const scores_devperso = to100((energieAvg + equilibreAvg) / 2 || 0);

  const allDims: { key: DimensionKey; score: number }[] = [
    { key: "stress", score: stressAvg },
    { key: "organisation", score: orgaAvg },
    { key: "relations", score: relAvg },
    { key: "energie", score: energieAvg },
    { key: "equilibre", score: equilibreAvg },
  ].filter((d) => d.score > 0);

  // Dimension la plus fragile = score moyen le plus bas
  const weakest =
    allDims.length > 0
      ? allDims.reduce((min, curr) => (curr.score < min.score ? curr : min)).key
      : "stress";

  const note_globale = Math.round(
    (scores_sante + scores_orga + scores_cohesion + scores_devperso) / 4
  );

  return {
    scores_sante,
    scores_orga,
    scores_cohesion,
    scores_devperso,
    note_globale,
    weakestDimension: weakest,
  };
}

// ---- Composant principal ----
const SimulateurPage = () => {
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const questions = useMemo(
    () => (profile ? questionsByProfile[profile] : []),
    [profile]
  );

  const totalSteps = questions.length;
  const currentQuestion = profile && questions[currentStep];
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  const handleProfileSelect = (p: ProfileId) => {
    setProfile(p);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (!profile || !currentQuestion) return;

    if (!answers[currentQuestion.id]) {
      toast({
        title: "Une petite réponse avant de continuer 💬",
        description: "Choisissez une option pour continuer l’évaluation.",
      });
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (!profile) return;
    if (currentStep === 0) {
      setProfile(null);
      setAnswers({});
      setShowResults(false);
      return;
    }
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleRestart = () => {
    setProfile(null);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleSaveAndGoDashboard = async (scores: Scores, reco: BoxReco) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase.from("needs_assessments").insert([
        {
          scores_sante: scores.scores_sante,
          scores_orga: scores.scores_orga,
          scores_cohesion: scores.scores_cohesion,
          scores_devperso: scores.scores_devperso,
          box_recommandee: reco.name,
          note_globale: scores.note_globale,
          source: `simulateur_box_${profile ?? "inconnu"}`,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Évaluation enregistrée 💾",
        description: "Vos résultats ont été ajoutés à votre tableau de bord.",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Erreur d’enregistrement:", err);
      toast({
        title: "Impossible d’enregistrer pour le moment",
        description: "Vous pouvez réessayer plus tard, vos réponses restent valables.",
        variant: "destructive",
      });
    }
  };

  // ---- Écran résultats ----
  if (profile && showResults) {
    const scores = computeScores(profile, answers);
    const reco = getBoxRecommendation(profile, scores.weakestDimension);

    const profileLabel = profiles.find((p) => p.id === profile)?.label ?? "Profil";

    return (
      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />
        <div className="relative z-10 pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-2xl">
            <Button
              variant="outline"
              className="mb-6"
              onClick={handleRestart}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Refaire une évaluation
            </Button>

            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Ma Bulle Attentionnée • Résultats
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-inter text-foreground mb-3">
                Votre{" "}
                <span className="text-primary">
                  météo émotionnelle
                </span>{" "}
                {profile === "ado" ? "du moment" : "du moment"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Profil analysé : <strong>{profileLabel}</strong>
              </p>
            </div>

            {/* Carte scores */}
            <div className="card-professional p-6 mb-6">
              <div className="flex items-center justify-between mb-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Note globale de votre bulle
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {scores.note_globale}/100
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                  <span>
                    Santé émotionnelle :{" "}
                    <strong>{scores.scores_sante}/100</strong>
                  </span>
                  <span>
                    Organisation / charge :{" "}
                    <strong>{scores.scores_orga}/100</strong>
                  </span>
                  <span>
                    Relations / lien :{" "}
                    <strong>{scores.scores_cohesion}/100</strong>
                  </span>
                  <span>
                    Énergie & équilibre :{" "}
                    <strong>{scores.scores_devperso}/100</strong>
                  </span>
                </div>
              </div>

              <Progress value={scores.note_globale} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                Ce score n’est pas un diagnostic médical, mais un indicateur pour mieux
                choisir la prochaine petite action à poser.
              </p>
            </div>

            {/* Box recommandée */}
            <div className="card-professional p-6 mb-8 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Box recommandée
                  </p>
                  <h2 className="text-xl font-semibold text-foreground">
                    {reco.name}
                  </h2>
                  <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                    {reco.badge}
                  </span>
                </div>
              </div>

              <p className="text-sm text-foreground/80">
                {reco.description}
              </p>

              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  À l’intérieur de cette bulle, vous pourriez retrouver :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {reco.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-xs text-foreground/80">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA ZÉNA + Box */}
            <div className="space-y-4 mb-10">
              <div className="card-professional p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Envie d’aller un peu plus loin, sans tout garder pour vous ?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ZÉNA peut vous écouter à l’oral, tous les jours, sans jugement.
                    Elle vous aide à mettre des mots sur ce que vous ressentez, et
                    nourrit votre météo émotionnelle dans QVT Box.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  <Link to="/zena">
                    Parler à ZÉNA
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="flex-1"
                >
                  <Link to="/box">
                    Découvrir les Box QVT
                  </Link>
                </Button>

                {user ? (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleSaveAndGoDashboard(scores, reco)}
                  >
                    Sauvegarder et voir mon dashboard
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/auth")}
                  >
                    Créer mon espace QVT Box
                  </Button>
                )}
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground text-center">
              Si vous vivez une détresse intense ou des idées noires, ce simulateur ne
              suffit pas : rapprochez-vous d’un professionnel de santé ou des numéros
              d’écoute disponibles 24/7.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ---- Écran choix du profil ----
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />
        <div className="relative z-10 pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Ma Bulle Attentionnée
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-inter">
                À qui appartient cette{" "}
                <span className="text-primary">bulle émotionnelle</span> ?
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Avant de commencer, dites-nous simplement qui vous êtes. Cela nous
                permet d’adapter les questions, le ton… et la Box qui en ressortira.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {profiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProfileSelect(p.id)}
                  className="card-professional p-4 text-left flex gap-3 items-center hover:shadow-floating transition-all"
                >
                  <div className="text-3xl">{p.emoji}</div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {p.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground text-center">
              Vos réponses restent confidentielles. Elles servent uniquement à mieux
              orienter votre Bulle QVT, et potentiellement à entraîner une IA
              émotionnelle bienveillante – jamais à vous juger.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ---- Écran questionnaire ----
  const Icon = currentQuestion?.icon ?? Smile;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />

      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <Button
              variant="outline"
              className="mb-4"
              onClick={handlePrevious}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 0 ? "Changer de profil" : "Question précédente"}
            </Button>

            <div className="text-center mb-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Ma Bulle Attentionnée
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-inter">
                Comment ça va <span className="text-primary">vraiment</span> ?
              </h1>
              <p className="text-xs text-muted-foreground">
                Question {currentStep + 1} sur {totalSteps}
              </p>
            </div>

            <Progress value={progress} className="h-2 mb-6" />

            {currentQuestion && (
              <div className="card-professional p-6 space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                    {currentQuestion.title}
                  </h2>
                  <p className="text-sm text-foreground/80 mb-1">
                    {currentQuestion.question}
                  </p>
                  {currentQuestion.helper && (
                    <p className="text-xs text-muted-foreground">
                      {currentQuestion.helper}
                    </p>
                  )}
                </div>

                <RadioGroup
                  value={
                    answers[currentQuestion.id]
                      ? String(answers[currentQuestion.id])
                      : ""
                  }
                  onValueChange={(value) =>
                    handleAnswerChange(currentQuestion.id, Number(value))
                  }
                  className="space-y-3"
                >
                  {currentQuestion.options.map((opt) => (
                    <Label
                      key={opt.value}
                      htmlFor={`${currentQuestion.id}_${opt.value}`}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/80 hover:bg-muted/60 cursor-pointer text-sm"
                    >
                      <RadioGroupItem
                        id={`${currentQuestion.id}_${opt.value}`}
                        value={String(opt.value)}
                      />
                      <span>{opt.label}</span>
                    </Label>
                  ))}
                </RadioGroup>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Précédent
                  </Button>
                  <Button onClick={handleNext}>
                    {currentStep === totalSteps - 1
                      ? "Voir ma bulle recommandée"
                      : "Suivant"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SimulateurPage;
