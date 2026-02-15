import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Crown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSubscription } from "@/hooks/useSubscription";

interface SubscriptionGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const SubscriptionGate = ({ children, fallback }: SubscriptionGateProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, hasAccess, isLoading, isTrialActive, getTrialDaysRemaining } = useSubscription();

  const texts = {
    locked: language === "ru" ? "Доступ ограничен" : "Access Locked",
    signIn: language === "ru" ? "Войдите, чтобы начать бесплатный пробный период" : "Sign in to start your free trial",
    subscribe: language === "ru" ? "Подпишитесь для полного доступа" : "Subscribe for full access",
    trialEnded: language === "ru" ? "Пробный период завершён" : "Trial period ended",
    signInBtn: language === "ru" ? "Войти" : "Sign In",
    subscribeBtn: language === "ru" ? "Подписаться" : "Subscribe",
    trialInfo: language === "ru" ? "3 дня бесплатного доступа!" : "3 days free access!",
    trialActive: language === "ru" ? "Пробный период" : "Trial Active",
    daysLeft: language === "ru" ? "дней осталось" : "days left",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // User has access (subscription or trial)
  if (hasAccess()) {
    const trialActive = isTrialActive();
    const trialDays = getTrialDaysRemaining();

    return (
      <div className="relative">
        {/* Trial banner */}
        {trialActive && (
          <div className="mb-4 p-3 bg-accent-light rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent-foreground">
                {texts.trialActive}: {trialDays} {texts.daysLeft}
              </span>
            </div>
            <Button
              variant="soft"
              size="sm"
              onClick={() => navigate("/pricing")}
            >
              {texts.subscribeBtn}
            </Button>
          </div>
        )}
        {children}
      </div>
    );
  }

  // Custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default locked state
  return (
    <Card className="border-2 border-dashed border-muted-foreground/30 bg-muted/30">
      <CardContent className="p-4 sm:p-8 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-muted rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 sm:mb-2">
          {texts.locked}
        </h3>
        
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto">
          {!user ? texts.signIn : texts.subscribe}
        </p>

        {!user && (
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent-light rounded-full">
            <Crown className="w-4 h-4 text-accent" />
            <span className="text-xs sm:text-sm font-medium text-accent-foreground">
              {texts.trialInfo}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!user ? (
            <Button variant="hero" size="lg" className="w-full sm:w-auto" onClick={() => navigate("/auth")}>
              {texts.signInBtn}
            </Button>
          ) : (
            <Button variant="hero" size="lg" className="w-full sm:w-auto" onClick={() => navigate("/pricing")}>
              {texts.subscribeBtn}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionGate;
