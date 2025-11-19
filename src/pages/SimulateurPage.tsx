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
import { Textarea } from "@/components/ui/textarea";

import {
  Heart,
  Settings,
  Users,
  Star,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type QuestionId = "stress" | "organization" | "team" | "development";

type Question = {
  id: QuestionId;
  title: string;
  question: string;
  icon: typeof Heart;
  color: string;
  pillar: string;
  helper: string;
  options: { value: string; label: string }[];
};

const questions: Question[] = [
  {
    id: "stress",
    title: "Votre niveau de fatigue / stress",
    question: "En ce moment, comment vous sentez-vous émotionnellement au travail ?",
    icon: Heart,
    color: "text-red-500",
    pillar: "Santé & équilibre",
    helper: "Fatigue, charge mentale, tensions qui restent après la journée…",
    options: [
      { value: "low", label: "Plutôt serein(e) – ça va globalement bien" },
      { value: "medium", label: "Quelques tensions mais ça reste gérable" },
      { value: "high", label: "Souvent stressé(e), ça pèse sur mon moral" },
      { value: "very-high", label: "À bout / au bord du craquage" },
    ],
  },
  {
    id: "organization",
    title: "Votre organisation & charge de travail",
    question: "Quelle est votre sensation face au volume et au rythme de travail ?",
    icon: Settings,
    color: "text-blue-500",
    pillar: "Organisation & clarté",
    helper: "Priorités, interruptions, imprévus, charge qui déborde sur le perso…",
    options: [
      { value: "excellent", label: "Claire, maîtrisée – tout est sous contrôle" },
      { value: "good", label: "Globalement OK, quelques périodes chargées" },
      { value: "average", label: "Souvent débordé(e), j’ai du mal à suivre" },
      { value: "poor", label: "Je ne tiens plus le rythme, ça déborde" },
    ],
  },
  {
    id: "team",
    title: "Relations avec l’équipe",
    question: "Comment décririez-vous l’ambiance avec vos collègues / manager ?",
    icon: Users,
    color: "text-amber-500",
    pillar: "Cohésion & sécurité",
    helper: "Sentiment d’écoute, soutien, tensions, conflits, isolement…",
    options: [
      { value: "excellent", label: "Très bonne – soutien, confiance, humour" },
      { value: "good", label: "Correcte – quelques tensions mais ça va" },
      { value: "average", label: "Professionnelle – chacun dans sa bulle" },
      { value: "poor", label: "Compliquée – conflits, non-dits, isolement" },
    ],
  },
  {
    id: "development",
    title: "Sens & développement",
    question: "Et votre envie d’évoluer / votre motivation dans ce poste ?",
    icon: Star,
    color: "text-purple-500",
    pillar: "Sens & projection",
    helper: "Motivation, perspectives, reconnaissance, sentiment d’utilité…",
    options: [
      { value: "motivated", label: "Très motivé(e) – envie, projets, énergie" },
      { value: "interested", label: "Plutôt motivé(e) – ouvert(e) aux opportunités" },
      { value: "neutral", label: "Mitigé(e) – ça tourne un peu en rond" },
      { value: "stuck", label: "À plat – plus d’envie / plus de sens" },
    ],
  },
];

type Scores = {
  stress: number;
  organization: number;
  team: number;
  development: number;
};

function computeScores(answers: Record<string, string>): Scores {
  return {
    stress:
      answers.stress === "very-high"
        ? 4
        : answers.stress === "high"
        ? 3
        : answers.stress === "medium"
        ? 2
        : 1,
    organization:
      answers.organization === "poor"
        ? 4
        : answers.organization === "average"
        ? 3
        : answers.organization === "good"
        ? 2
        : 1,
    team:
      answers.team === "poor"
        ? 4
        : answers.team === "average"
        ? 3
        : answers.team === "good"
        ? 2
        : 1,
    development:
      answers.development === "stuck"
        ? 4
        : answers.development === "neutral"
        ? 3
        : answers.development === "interested"
        ? 2
        : 1,
  };
}

function computeGlobalScore(scores: Scores): number {
  const raw = Object.values(scores).reduce((a, b) => a + b, 0); // 4 à 16
  // On ramène sur une échelle 0–100
  return Math.round(((raw - 4) / (16 - 4)) * 100);
}

function getRecommendation(scores: Scores) {
  const scoresArray = Object.entries(scores);
  const maxValue = Math.max(...scoresArray.map(([, v]) => v));
  const [worstKey] =
    scoresArray.find(([_, v]) => v === maxValue) ?? scoresArray[0];

  const recommendations = {
    stress: {
      name: "Box Focus & Reset",
      description:
        "Une bulle pour souffler, apaiser la charge mentale et retrouver un peu de légèreté au quotidien.",
      color: "bg-emerald-500",
      products: [
        "Tisanes / infusions relaxantes",
        "Petits rituels de pause guidés",
        "Accessoires de respiration / détente",
        "Micro-contenus sur le stress et le sommeil",
      ],
    },
    organization: {
      name: "Box Efficacité Pro",
      description:
        "Pour reprendre la main sur votre organisation et éviter que les urgences ne pilotent vos journées.",
      color: "bg-sky-500",
      products: [
        "Planner simple et visuel",
        "Astuces d’organisation concrètes",
        "Outils ergonomiques de bureau",
        "Mini-guides anti-procrastination",
      ],
    },
    team: {
      name: "Box Cohésion",
      description:
        "Pour remettre du lien, du sourire et des temps d’échanges dans l’équipe, même à distance.",
      color: "bg-amber-500",
      products: [
        "Jeux / icebreakers prêts à l’emploi",
        "Idées de rituels d’équipe",
        "Supports de discussion bienveillante",
        "Petits goodies à partager",
      ],
    },
    development: {
      name: "Box Inspiration",
      description:
        "Pour rallumer l’envie, clarifier vos envies d’évolution et reprendre confiance dans votre valeur.",
      color: "bg-violet-500",
      products: [
        "Carnet d’auto-bilan guidé",
        "Contenus inspirants (livres, podcasts)",
        "Exercices de projection / reconversion",
        "Mini-coaching digital",
      ],
    },
  } as const;

  return recommendations[worstKey as keyof typeof recommendations];
}

const SimulateurPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [comment, setComment] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion.icon;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) {
      toast({
        title: "Réponse manquante",
        description: "Choisissez une réponse avant de continuer.",
        variant: "destructive",
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
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/box");
    }
  };

  const handleGoToBoxes = () => {
    navigate("/box");
  };

  const handleSaveAndGoToDashboard = async () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    const scores = computeScores(answers);
    const globalScore = computeGlobalScore(scores);
    const recommendation = getRecommendation(scores);

    setIsSaving(true);
    try {
      const { error } = await supabase.from("needs_assessments").insert([
        {
          scores_sante: scores.stress * 25,
          scores_orga: scores.organization * 25,
          scores_cohesion: scores.team * 25,
          scores_devperso: scores.development * 25,
          box_recommandee: recommendation.name,
          note_globale: globalScore,
          source: "simulateur_box",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Évaluation enregistrée",
        description: "Vos résultats ont été ajoutés à votre tableau de bord.",
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving assessment:", err);
      toast({
        title: "Enregistrement impossible",
        description:
          "Vos résultats sont visibles ci-dessous mais n’ont pas pu être sauvegardés.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ==== VUE RÉSULTATS ====
  if (showResults) {
    const scores = computeScores(answers);
    const globalScore = computeGlobalScore(scores);
    const recommendation = getRecommendation(scores);

    let moodLabel = "État émotionnel équilibré";
    let moodColor = "text-emerald-600";
    if (globalScore >= 70) {
      moodLabel = "Zone de vigilance renforcée";
      moodColor = "text-amber-600";
    }
    if (globalScore >= 85) {
      moodLabel = "Zone rouge – besoin de soutien";
      moodColor = "text-red-600";
    }

    return (
      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />

        <main className="relative z-10 pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-3xl space-y-10">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(0);
                }}
                className="w-fit"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Recommencer l’évaluation
              </Button>

              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-inter mb-2">
                  Votre météo QVT du moment
                </h1>
                <p className="text-sm md:text-base text-foreground/70 max-w-xl mx-auto font-lato">
                  En quelques questions, vous venez de prendre la température de
                  votre quotidien au travail. Voici une lecture simple de vos
                  signaux du moment.
                </p>
              </div>
            </div>

            {/* Bloc Météo globale */}
            <div className="card-professional p-6 md:p-8 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">
                    Score global d’alerte
                  </p>
                  <p className={`text-xl font-semibold ${moodColor}`}>
                    {moodLabel}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary font-inter">
                    {globalScore}/100
                  </span>
                  <p className="text-xs text-muted-foreground">
                    (0 = tout va bien • 100 = niveau d’alerte)
                  </p>
                </div>
              </div>

              <Progress value={globalScore} className="h-2" />

              <p className="text-xs text-muted-foreground">
                Ce score n’est pas un diagnostic médical. C’est un thermomètre
                émotionnel pour ouvrir le dialogue, faire un pas de côté et
                choisir une action concrète.
              </p>
            </div>

            {/* Recommandation de box */}
            <div className="card-professional p-6 md:p-8 space-y-6">
              <div className="text-center">
                <div
                  className={`w-20 h-20 ${recommendation.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-inter mb-2">
                  Votre Box recommandée
                </h2>
                <p className="text-lg font-semibold text-foreground mb-1 font-lato">
                  {recommendation.name}
                </p>
                <p className="text-sm text-foreground/70 font-lato">
                  {recommendation.description}
                </p>
              </div>

              <div className="bg-muted/40 rounded-xl p-5 space-y-3">
                <p className="font-medium text-foreground text-sm mb-2">
                  🎁 Ce que pourrait contenir votre prochaine QVT Box :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendation.products.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-foreground/80 font-lato">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commentaire libre */}
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-sm font-medium">
                  Vous souhaitez ajouter un mot sur votre situation ?
                  <span className="text-muted-foreground text-xs ml-1">
                    (optionnel, pour vous ou pour en parler ensuite)
                  </span>
                </Label>
                <Textarea
                  id="comment"
                  rows={3}
                  placeholder="Par exemple : ce qui pèse le plus, ce qui vous aide, ce que vous aimeriez changer…"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {user ? (
                  <Button
                    className="flex-1"
                    onClick={handleSaveAndGoToDashboard}
                    disabled={isSaving}
                  >
                    {isSaving
                      ? "Enregistrement en cours..."
                      : "Voir ces résultats dans mon tableau de bord"}
                  </Button>
                ) : (
                  <Button
                    className="flex-1"
                    onClick={() => navigate("/auth/login")}
                  >
                    Créer / accéder à mon espace
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleGoToBoxes}
                >
                  Explorer toutes les box QVT
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ==== VUE QUESTIONNAIRE ====
  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />

      <main className="relative z-10 pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-3xl space-y-10">
          {/* Intro */}
          <header className="text-center space-y-4">
            <Button
              variant="outline"
              onClick={() => navigate("/box")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux box QVT
            </Button>

            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Ma bulle attentionnée
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-inter">
              « Salut, ça va vraiment&nbsp;? »
            </h1>
            <p className="text-sm md:text-base text-foreground/70 max-w-xl mx-auto font-lato">
              En <strong>4 questions</strong>, prenez la température de votre
              QVT au travail. Pas de jugement, juste une météo émotionnelle pour
              savoir par où commencer.
            </p>

            <div className="space-y-2 max-w-md mx-auto mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-foreground/60">
                Question {currentStep + 1} sur {totalSteps}
              </p>
            </div>
          </header>

          {/* Carte question */}
          <section className="card-professional p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Icon className={`w-8 h-8 ${currentQuestion.color}`} />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {currentQuestion.pillar}
              </p>
              <h2 className="text-xl md:text-2xl font-semibold font-inter">
                {currentQuestion.title}
              </h2>
              <p className="text-sm md:text-base text-foreground/80 font-lato">
                {currentQuestion.question}
              </p>
              <p className="text-xs text-foreground/60 font-lato italic">
                {currentQuestion.helper}
              </p>
            </div>

            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(v) => handleAnswer(currentQuestion.id, v)}
              className="space-y-3 mt-4"
            >
              {currentQuestion.options.map((option) => (
                <label
                  key={option.value}
                  htmlFor={`${currentQuestion.id}-${option.value}`}
                  className={`flex items-center gap-3 rounded-xl border bg-white/70 backdrop-blur px-3 py-3 cursor-pointer transition-colors ${
                    answers[currentQuestion.id] === option.value
                      ? "border-primary/70 bg-primary/5"
                      : "border-muted hover:bg-muted/40"
                  }`}
                >
                  <RadioGroupItem
                    id={`${currentQuestion.id}-${option.value}`}
                    value={option.value}
                  />
                  <span className="text-sm text-foreground/90 font-lato">
                    {option.label}
                  </span>
                </label>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Précédent
              </Button>
              <Button onClick={handleNext}>
                {currentStep === totalSteps - 1
                  ? "Voir ma météo QVT"
                  : "Question suivante"}
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SimulateurPage;
