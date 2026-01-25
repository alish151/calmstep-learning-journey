import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, ArrowLeft, Loader2, Crown, Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Helmet } from "react-helmet-async";

const Pricing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, hasActiveSubscription, isTrialActive, getTrialDaysRemaining, createCheckoutSession, isLoading } = useSubscription();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const texts = {
    pageTitle: language === "ru" ? "Тарифы" : "Pricing",
    title: language === "ru" ? "Выберите свой план" : "Choose Your Plan",
    subtitle: language === "ru" ? "Разблокируйте полный доступ ко всем модулям обучения" : "Unlock full access to all learning modules",
    trialActive: language === "ru" ? "Пробный период активен" : "Trial Active",
    trialDaysLeft: language === "ru" ? "дней осталось" : "days left",
    subscribed: language === "ru" ? "Вы подписаны" : "You're subscribed",
    features: language === "ru" 
      ? ["Все модули обучения", "Социальные сценарии", "Отслеживание прогресса", "Достижения и награды", "Без рекламы"]
      : ["All learning modules", "Social scenarios", "Progress tracking", "Achievements & rewards", "Ad-free experience"],
    month: language === "ru" ? "месяц" : "month",
    months: language === "ru" ? "месяцев" : "months",
    year: language === "ru" ? "год" : "year",
    popular: language === "ru" ? "Популярный" : "Popular",
    bestValue: language === "ru" ? "Лучшая цена" : "Best Value",
    subscribe: language === "ru" ? "Подписаться" : "Subscribe",
    signInFirst: language === "ru" ? "Сначала войдите" : "Sign in first",
    currentPlan: language === "ru" ? "Текущий план" : "Current Plan",
    errorOccurred: language === "ru" ? "Произошла ошибка" : "An error occurred",
  };

  const plans = [
    {
      id: "monthly",
      name: language === "ru" ? "Месячный" : "Monthly",
      price: "$9.99",
      period: `/${texts.month}`,
      description: language === "ru" ? "Гибкий вариант" : "Flexible option",
      icon: Star,
      color: "primary",
    },
    {
      id: "quarterly",
      name: language === "ru" ? "3 месяца" : "3 Months",
      price: "$24.99",
      period: `/3 ${texts.months}`,
      description: language === "ru" ? "Экономия 17%" : "Save 17%",
      icon: Sparkles,
      color: "secondary",
      badge: texts.popular,
    },
    {
      id: "semi_annual",
      name: language === "ru" ? "6 месяцев" : "6 Months",
      price: "$39.99",
      period: `/6 ${texts.months}`,
      description: language === "ru" ? "Экономия 33%" : "Save 33%",
      icon: Crown,
      color: "accent",
    },
    {
      id: "annual",
      name: language === "ru" ? "Годовой" : "Annual",
      price: "$59.99",
      period: `/${texts.year}`,
      description: language === "ru" ? "Экономия 50%" : "Save 50%",
      icon: Crown,
      color: "warm",
      badge: texts.bestValue,
    },
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoadingPlan(planId);
    try {
      await createCheckoutSession(planId);
    } catch (error) {
      toast({
        title: texts.errorOccurred,
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const isSubscribed = hasActiveSubscription();
  const trialActive = isTrialActive();
  const trialDays = getTrialDaysRemaining();

  return (
    <>
      <Helmet>
        <title>{texts.pageTitle} - CalmStep</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-8">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "ru" ? "Назад" : "Back"}
          </Button>

          {/* Status banner */}
          {(isSubscribed || trialActive) && (
            <div className={`mb-8 p-4 rounded-2xl text-center ${isSubscribed ? "bg-green-100 text-green-800" : "bg-accent-light text-accent-foreground"}`}>
              {isSubscribed ? (
                <p className="font-semibold">{texts.subscribed} ✨</p>
              ) : (
                <p className="font-semibold">
                  🎉 {texts.trialActive} — {trialDays} {texts.trialDaysLeft}
                </p>
              )}
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-heading text-foreground mb-4">{texts.title}</h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {texts.subtitle}
            </p>
          </div>

          {/* Plans grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = false; // Would check against actual subscription
              
              return (
                <Card 
                  key={plan.id}
                  className={`relative overflow-hidden border-2 transition-all hover:shadow-lg ${
                    plan.badge ? "border-primary shadow-card" : "border-border/50"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-xl">
                      {plan.badge}
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-2">
                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-${plan.color}-light flex items-center justify-center mb-3`}>
                      <Icon className={`w-7 h-7 text-${plan.color}`} />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="text-center">
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-6 text-left">
                      {texts.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.badge ? "hero" : "outline"}
                      size="lg"
                      className="w-full"
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isLoading || loadingPlan !== null || isSubscribed}
                    >
                      {loadingPlan === plan.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : isCurrentPlan ? (
                        texts.currentPlan
                      ) : !user ? (
                        texts.signInFirst
                      ) : (
                        texts.subscribe
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom spacer for mobile nav */}
          <div className="h-16 sm:hidden" />
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default Pricing;
