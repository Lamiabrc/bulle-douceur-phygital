import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import FloatingBubbles from "./FloatingBubbles";
import OnboardingModal from "./OnboardingModal";

const PoeticHero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleStartJourney = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setShowOnboarding(true);
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingBubbles />
        
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Main Question */}
          <div className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-7xl font-kalam font-bold text-foreground leading-tight">
              <span className="block opacity-90">Salut,</span>
              <span className="block text-primary">ça va ?</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-light max-w-3xl mx-auto leading-relaxed">
              La question la plus simple,<br />
              <span className="text-secondary font-medium">mais la plus difficile</span>
            </p>
          </div>

          {/* Poetic Description */}
          <div className="mb-16 space-y-6">
            <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                Dans le tourbillon du quotidien, nous oublions de nous poser cette question essentielle. 
                <span className="text-primary font-medium"> QVT Box </span>
                vous invite à retrouver ce dialogue intérieur, à travers des bulles de douceur qui transforment 
                votre bien-être en <span className="text-secondary font-medium">poésie du quotidien</span> ✨
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleStartJourney}
                className="btn-bubble text-lg px-10 py-4 shadow-floating hover:shadow-bubble transform hover:scale-105 transition-all duration-300"
              >
                🫧 Commencer ma bulle
              </Button>
              
              <Button 
                onClick={() => navigate("/box")}
                className="btn-soft text-lg px-8 py-4"
                variant="outline"
              >
                📦 Commander ma box
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate("/saas")}
                className="bg-gradient-card border border-secondary/20 text-foreground px-8 py-4 rounded-full hover:bg-secondary/10 transition-all duration-300"
                variant="outline"
              >
                💭 Demander une démo SaaS
              </Button>
              
              <Button 
                onClick={() => navigate("/boutique")}
                className="bg-accent/20 border border-accent/30 text-foreground px-8 py-4 rounded-full hover:bg-accent/30 transition-all duration-300"
                variant="outline"
              >
                🛍️ Découvrir la boutique
              </Button>
            </div>
          </div>

          {/* Subtle Animation Text */}
          <div className="mt-16 animate-fade-in">
            <p className="text-foreground/50 font-light text-sm">
              Votre bien-être mérite toute l'attention du monde
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-30">
          <div className="w-32 h-32 rounded-full bg-gradient-bubble animate-float"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <div className="w-24 h-24 rounded-full bg-gradient-bubble animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      <OnboardingModal 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </>
  );
};

export default PoeticHero;