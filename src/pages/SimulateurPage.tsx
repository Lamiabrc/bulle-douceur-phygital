import { useState } from "react";
import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, Settings, Users, Star, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const SimulateurPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // 🫧 univers = "pro" (par défaut) ou "famille" (projet Bulle)
  const [searchParams] = useSearchParams();
  const univers = searchParams.get("univers") || "pro";
  const isFamily = univers === "famille";

  const questions = [
    {
      id: "stress",
      title: isFamily ? "Tension émotionnelle" : "Gestion du stress",
      question: isFamily
        ? "Comment évaluez-vous la tension émotionnelle dans votre vie au quotidien (travail, maison, charge mentale) ?"
        : "Comment évaluez-vous votre niveau de stress au travail ?",
      icon: Heart,
      color: "text-green-500",
      pillar: isFamily ? "Émotions & Charge mentale" : "Santé & Équilibre",
      options: [
        {
          value: "low",
          label: isFamily
            ? "Faible – Globalement serein(e) sur la période"
            : "Faible – Je me sens serein(e) au quotidien",
        },
        {
          value: "medium",
          label: isFamily
            ? "Modérée – Quelques tensions mais gérables"
            : "Modéré – Quelques moments de tension",
        },
        {
          value: "high",
          label: isFamily
            ? "Élevée – Je me sens souvent sous pression"
            : "Élevé – Je ressens souvent du stress",
        },
        {
          value: "very-high",
          label: isFamily
            ? "Très élevée – J’ai l’impression d’être à bout"
            : "Très élevé – Le stress m'impacte beaucoup",
        },
      ],
    },
    {
      id: "organization",
      title: isFamily ? "Organisation du quotidien" : "Organisation & Productivité",
      question: isFamily
        ? "Comment vivez-vous l’organisation de votre quotidien (planning, tâches, to-do listes) ?"
        : "Comment vous sentez-vous par rapport à votre organisation au travail ?",
      icon: Settings,
      color: "text-blue-500",
      pillar: isFamily ? "Organisation & Routines" : "Organisation & Efficacité",
      options: [
        {
          value: "excellent",
          label: isFamily
            ? "Très fluide – J’ai l’impression que tout est plutôt bien calé"
            : "Excellente – Je maîtrise parfaitement",
        },
        {
          value: "good",
          label: isFamily
            ? "Plutôt correcte – Quelques ajustements possibles"
            : "Bonne – Quelques améliorations possibles",
        },
        {
          value: "average",
          label: isFamily
            ? "Moyenne – Je cours souvent après le temps"
            : "Moyenne – J'ai besoin d'aide",
        },
        {
          value: "poor",
          label: isFamily
            ? "Difficile – J’ai l’impression d’être débordé(e)"
            : "Difficile – Je me sens débordé(e)",
        },
      ],
    },
    {
      id: "team",
      title: isFamily ? "Relations & entourage" : "Relations d'équipe",
      question: isFamily
        ? "Comment décririez-vous vos relations avec les personnes importantes pour vous (famille, amis, proches) ?"
        : "Comment qualifiez-vous les relations avec vos collègues ?",
      icon: Users,
      color: "text-orange-500",
      pillar: isFamily ? "Lien & Soutien" : "Cohésion & Relations",
      options: [
        {
          value: "excellent",
          label: isFamily
            ? "Très positives – Je me sens bien entouré(e)"
            : "Excellentes – Ambiance très positive",
        },
        {
          value: "good",
          label: isFamily
            ? "Plutôt bonnes – Quelques tensions ponctuelles"
            : "Bonnes – Quelques tensions ponctuelles",
        },
        {
          value: "average",
          label: isFamily
            ? "Correctes – On se parle mais en surface"
            : "Correctes – Relations professionnelles",
        },
        {
          value: "poor",
          label: isFamily
            ? "Difficiles – Conflits, distance ou isolement"
            : "Difficiles – Conflits ou isolement",
        },
      ],
    },
    {
      id: "development",
      title: isFamily ? "Temps pour soi" : "Développement personnel",
      question: isFamily
        ? "Avez-vous l’impression d’avoir des moments à vous, pour souffler, vous ressourcer, faire ce qui vous fait du bien ?"
        : "Où en êtes-vous dans votre développement professionnel ?",
      icon: Star,
      color: "text-purple-500",
      pillar: isFamily ? "Self-care & Ressources" : "Développement & Inspiration",
      options: [
        {
          value: "motivated",
          label: isFamily
            ? "Oui, régulièrement – J’arrive à garder des rituels pour moi"
            : "Très motivé(e) – Plein de projets",
        },
        {
          value: "interested",
          label: isFamily
            ? "Oui, de temps en temps – Je pourrais en faire un peu plus"
            : "Intéressé(e) – Ouvert(e) aux opportunités",
        },
        {
          value: "neutral",
          label: isFamily
            ? "Très peu – C’est rarement une priorité"
            : "Neutre – Pas de priorité particulière",
        },
        {
          value: "stuck",
          label: isFamily
            ? "Quasi jamais – Je n’ai plus vraiment de temps pour moi"
            : "Bloqué(e) – Manque d'inspiration",
        },
      ],
    },
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    setShowResults(true);
  };

  const getRecommendedBox = () => {
    const scores = {
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

    const maxScore = Math.max(...Object.values(scores));
    const maxKeys = Object.keys(scores).filter(
      (key) => scores[key as keyof typeof scores] === maxScore
    );

    // Recos : on garde ta logique, mais les textes fonctionnent aussi pour la famille
    const recommendations = {
      stress: {
        name: isFamily ? "Bulle Reset Douceur" : "Box Focus & Reset",
        description: isFamily
          ? "Pour apaiser la tension émotionnelle et remettre un peu de douceur dans le quotidien"
          : "Parfaite pour retrouver sérénité et équilibre au quotidien",
        color: "bg-green-500",
        products: [
          "Tisanes relaxantes",
          "Huiles essentielles",
          "Guide respiration / méditation",
          "Accessoires bien-être",
        ],
      },
      organization: {
        name: isFamily ? "Bulle Organisation Douce" : "Box Efficacité Pro",
        description: isFamily
          ? "Pour simplifier l’organisation du quotidien et alléger la charge mentale"
          : "Les outils indispensables pour optimiser votre organisation",
        color: "bg-blue-500",
        products: [
          "Planner personnalisé",
          "Outils d’organisation",
          "Guide priorisation",
          "Supports pratiques",
        ],
      },
      team: {
        name: isFamily ? "Bulle Lien & Dialogue" : "Box Cohésion",
        description: isFamily
          ? "Pour nourrir les liens, relancer le dialogue et recréer des moments de connexion"
          : "Renforcez les liens et améliorez la communication d'équipe",
        color: "bg-orange-500",
        products: [
          "Jeux ou activités à partager",
          "Guide communication bienveillante",
          "Idées de rituels en commun",
          "Petites attentions à offrir",
        ],
      },
      development: {
        name: isFamily ? "Bulle Temps pour Soi" : "Box Inspiration",
        description: isFamily
          ? "Pour recréer des espaces rien que pour vous, souffler et vous ressourcer"
          : "Trouvez motivation et nouvelles perspectives pour évoluer",
        color: "bg-purple-500",
        products: [
          "Carnet ou journal",
          "Rituel de self-care",
          "Inspiration audio/lecture",
          "Outils de projection",
        ],
      },
    };

    return recommendations[maxKeys[0] as keyof typeof recommendations];
  };

  const handleGoToBoxes = () => {
    navigate("/box");
  };

  const handleGoToDashboard = async () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    const recommendation = getRecommendedBox();

    // Scores (même logique que ton code original)
    const scores = {
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

    const globalScore = Math.round(
      (Object.values(scores).reduce((a, b) => a + b, 0) * 25) / 4
    );

    try {
      // Si tu préfères ne pas stocker le mode famille dans cette table,
      // tu peux conditionner sur !isFamily.
      const { error } = await supabase.from("needs_assessments").insert([
        {
          scores_sante: scores.stress * 25,
          scores_orga: scores.organization * 25,
          scores_cohesion: scores.team * 25,
          scores_devperso: scores.development * 25,
          box_recommandee: recommendation.name,
          note_globale: globalScore,
          source: isFamily ? "simulateur_bulle_famille" : "simulateur_box",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Évaluation sauvegardée",
        description: "Vos résultats ont été ajoutés à votre profil.",
      });
    } catch (error) {
      console.error("Error saving assessment:", error);
    }

    navigate("/dashboard");
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion?.icon;

  if (showResults) {
    const recommendation = getRecommendedBox();

    return (
      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />

        <div className="relative z-10 pt-24 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <Button onClick={() => navigate("/box")} variant="outline" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isFamily ? "Retour" : "Retour aux box"}
              </Button>

              <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-2">
                🎉 Votre{" "}
                <span className="text-primary">
                  {isFamily ? "bulle recommandée" : "Box recommandée"}
                </span>
              </h1>
              <p className="text-sm md:text-base text-foreground/70">
                {isFamily
                  ? "Un petit coup de pouce pour prendre soin de votre bulle familiale et de votre équilibre."
                  : "Une suggestion pour soutenir votre qualité de vie au travail, de façon concrète."}
              </p>
            </div>

            <div className="card-professional p-8 space-y-6">
              <div className="text-center">
                <div
                  className={`w-20 h-20 ${recommendation.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-kalam font-bold text-foreground mb-2">
                  {recommendation.name}
                </h3>
                <p className="text-foreground/70 text-lg">
                  {recommendation.description}
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  🎁 Contenu de votre {isFamily ? "bulle" : "box"} :
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {recommendation.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-foreground/80">{product}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {user ? (
                  <Button onClick={handleGoToDashboard} className="flex-1">
                    Voir mon tableau de bord
                  </Button>
                ) : (
                  <Button onClick={() => navigate("/auth/login")} className="flex-1">
                    Me connecter
                  </Button>
                )}
                {!isFamily && (
                  <Button
                    variant="outline"
                    onClick={handleGoToBoxes}
                    className="flex-1"
                  >
                    Explorer toutes les box
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />

      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <Button
              onClick={() => (isFamily ? navigate(-1) : navigate("/box"))}
              variant="outline"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isFamily ? "Retour" : "Retour aux box"}
            </Button>

            <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-4">
              {isFamily ? (
                <>
                  Ma <span className="text-primary">Bulle Famille</span>
                </>
              ) : (
                <>
                  Évaluez vos <span className="text-primary">besoins QVT</span>
                </>
              )}
            </h1>
            <div className="space-y-2 max-w-xl mx-auto">
              <Progress value={progress} className="w-full h-2" />
              <p className="text-sm text-center text-foreground/60">
                Question {currentStep + 1} sur {questions.length}
              </p>
              <p className="text-xs md:text-sm text-center text-foreground/60">
                {isFamily
                  ? "Répondez spontanément. Ce questionnaire est là pour vous aider à voir où en est votre bulle émotionnelle."
                  : "Répondez spontanément. Ce simulateur vous aide à identifier la box la plus utile pour vous."}
              </p>
            </div>
          </div>

          <div className="card-professional p-8 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className={`w-8 h-8 ${currentQuestion.color}`} />
              </div>
              <h3 className="text-xl font-kalam font-bold text-foreground mb-2">
                {currentQuestion.title}
              </h3>
              <p className="text-foreground/70">{currentQuestion.question}</p>
            </div>

            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Précédent
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                {currentStep === questions.length - 1
                  ? isFamily
                    ? "Voir ma bulle"
                    : "Voir ma recommandation"
                  : "Suivant"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SimulateurPage;
