import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthForm from "./AuthForm";
import { cn } from "@/lib/utils";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRoleQVT = "salarié" | "manager" | "rh" | "admin";
type UserJourneyQVT = "physique_only" | "saas_box";

const ROLES: Array<{
  id: UserRoleQVT;
  title: string;
  emoji: string;
  description: string;
  tone: "primary" | "secondary" | "accent" | "muted";
}> = [
  { id: "salarié", title: "Salarié", emoji: "👤", description: "Je souhaite prendre soin de mon bien-être au quotidien", tone: "primary" },
  { id: "manager", title: "Manager", emoji: "👥", description: "Je veux accompagner le bien-être de mon équipe", tone: "secondary" },
  { id: "rh", title: "RH", emoji: "🤝", description: "Je pilote la stratégie QVT de l'entreprise", tone: "accent" },
  { id: "admin", title: "Admin", emoji: "⚙️", description: "Je gère la plateforme et les utilisateurs", tone: "muted" },
];

const JOURNEYS: Array<{
  id: UserJourneyQVT;
  title: string;
  emoji: string;
  description: string;
  benefits: string[];
}> = [
  {
    id: "physique_only",
    title: "Box Physique Only",
    emoji: "📦",
    description: "Je préfère recevoir uniquement des box physiques avec des produits sélectionnés",
    benefits: ["Box mensuelles personnalisées", "Produits artisanaux français", "Rituels bien-être"],
  },
  {
    id: "saas_box",
    title: "SaaS + Box",
    emoji: "💻📦",
    description: "Je veux l'expérience complète : suivi digital + box physiques",
    benefits: ["Dashboard personnel", "Analyse IA des humeurs", "Box adaptées aux tendances", "Insights équipe"],
  },
];

// Styles sûrs (évite les classes Tailwind dynamiques)
const toneClasses = {
  primary: { border: "border-primary", bg: "bg-primary/5" },
  secondary: { border: "border-secondary", bg: "bg-secondary/5" },
  accent: { border: "border-accent", bg: "bg-accent/5" },
  muted: { border: "border-border", bg: "bg-muted/20" },
};

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<UserRoleQVT | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<UserJourneyQVT | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Récup user (CSR) pour savoir si on doit afficher l'auth à l'étape 3
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setIsLogged(!!data?.user);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const selectedRoleObj = useMemo(() => ROLES.find(r => r.id === selectedRole), [selectedRole]);
  const selectedJourneyObj = useMemo(() => JOURNEYS.find(j => j.id === selectedJourney), [selectedJourney]);

  const handleRoleSelect = (role: UserRoleQVT) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleJourneySelect = (journey: UserJourneyQVT) => {
    setSelectedJourney(journey);
    setStep(3);
  };

  const handleAuthSuccess = async () => {
    setAuthOpen(false);
    // Après auth, finalise
    await handleCompleteOnboarding();
  };

  const handleCompleteOnboarding = async () => {
    if (!selectedRole || !selectedJourney) {
      toast({ title: "Choix incomplet", description: "Merci de sélectionner votre rôle et votre parcours.", variant: "destructive" });
      return;
    }

    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Pas connecté → ouvrir l'auth dans le même Dialog
        setAuthOpen(true);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          user_role: selectedRole as any,
          user_journey: selectedJourney as any,
          onboarding_completed: true,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Bienvenue dans votre bulle ! 🫧",
        description: "Votre parcours personnalisé est maintenant configuré.",
      });

      onClose();
      navigate("/dashboard");
    } catch (err) {
      console.error("Error completing onboarding:", err);
      toast({
        title: "Erreur",
        description: "Impossible de finaliser votre inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-kalam text-3xl text-primary">
            ✨ Créons votre bulle personnalisée
          </DialogTitle>
        </DialogHeader>

        {/* Étape Auth (dans le même Dialog) */}
        {authOpen ? (
          <div className="max-w-md mx-auto w-full">
            <h3 className="text-center font-kalam text-2xl mb-3">🫧 Créer votre bulle</h3>
            <AuthForm onSuccess={handleAuthSuccess} />
          </div>
        ) : (
          <>
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-foreground/70">Dites-nous qui vous êtes pour personnaliser votre expérience</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {ROLES.map((role) => {
                    const active = selectedRole === role.id;
                    const tone = toneClasses[role.tone];

                    return (
                      <Card
                        key={role.id}
                        role="button"
                        aria-pressed={active}
                        aria-label={`Sélectionner le rôle ${role.title}`}
                        tabIndex={0}
                        onClick={() => handleRoleSelect(role.id)}
                        onKeyDown={(e) => e.key === "Enter" && handleRoleSelect(role.id)}
                        className={cn(
                          "p-6 cursor-pointer transition-all duration-300 hover:shadow-floating border-2 focus:outline-none",
                          active ? `${tone.border} ${tone.bg}` : "border-border hover:border-primary/30"
                        )}
                      >
                        <div className="text-center space-y-3">
                          <div className="text-4xl" aria-hidden>{role.emoji}</div>
                          <h3 className="font-kalam text-xl font-semibold">{role.title}</h3>
                          <p className="text-sm text-foreground/70">{role.description}</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Journey Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-foreground/70 mb-2">Parfait ! Maintenant, choisissez votre parcours bien-être</p>
                  <p className="text-sm text-foreground/50">
                    Vous êtes <span className="text-primary font-medium">{selectedRoleObj?.title}</span>
                  </p>
                </div>

                <div className="grid gap-6">
                  {JOURNEYS.map((journey) => {
                    const active = selectedJourney === journey.id;
                    return (
                      <Card
                        key={journey.id}
                        role="button"
                        aria-pressed={active}
                        aria-label={`Sélectionner le parcours ${journey.title}`}
                        tabIndex={0}
                        onClick={() => handleJourneySelect(journey.id)}
                        onKeyDown={(e) => e.key === "Enter" && handleJourneySelect(journey.id)}
                        className={cn(
                          "p-6 cursor-pointer transition-all duration-300 hover:shadow-floating border-2 focus:outline-none",
                          active ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/30"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-3xl" aria-hidden>{journey.emoji}</div>
                          <div className="flex-1">
                            <h3 className="font-kalam text-xl font-semibold mb-2">{journey.title}</h3>
                            <p className="text-foreground/70 mb-3">{journey.description}</p>
                            <div className="space-y-1">
                              {journey.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-foreground/60">
                                  <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                                  {benefit}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <Button onClick={() => setStep(1)} variant="outline" className="btn-soft">
                    ← Retour
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4" aria-hidden>🎉</div>
                  <h3 className="font-kalam text-2xl font-semibold mb-4">Votre bulle est presque prête !</h3>
                  <p className="text-foreground/70">Récapitulatif de votre configuration personnalisée</p>
                </div>

                <div className="glass-effect rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Rôle :</span>
                    <span className="text-primary font-semibold">{selectedRoleObj?.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Parcours :</span>
                    <span className="text-secondary font-semibold">{selectedJourneyObj?.title}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setStep(2)} variant="outline" className="btn-soft">
                    ← Modifier
                  </Button>
                  <Button
                    onClick={handleCompleteOnboarding}
                    className="btn-bubble"
                    disabled={saving}
                  >
                    {saving ? "Configuration…" : "🫧 Finaliser ma bulle"}
                  </Button>
                </div>

                {/* Si on sait déjà que l’utilisateur n’est pas loggé */}
                {isLogged === false && (
                  <p className="text-center text-sm text-foreground/60">
                    Vous devrez créer un compte pour sauvegarder votre configuration.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
