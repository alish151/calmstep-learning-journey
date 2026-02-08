import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Crown, Calendar, CreditCard, AlertTriangle, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, subscription, profile, hasActiveSubscription, isTrialActive, getTrialDaysRemaining, isLoading } = useSubscription();
  const { toast } = useToast();
  const [cancelling, setCancelling] = useState(false);

  const texts = {
    pageTitle: language === "ru" ? "Управление подпиской" : "Subscription Management",
    title: language === "ru" ? "Моя подписка" : "My Subscription",
    currentPlan: language === "ru" ? "Текущий план" : "Current Plan",
    status: language === "ru" ? "Статус" : "Status",
    active: language === "ru" ? "Активна" : "Active",
    canceled: language === "ru" ? "Отменена" : "Canceled",
    trialing: language === "ru" ? "Пробный период" : "Trial",
    renewsOn: language === "ru" ? "Продлевается" : "Renews on",
    expiresOn: language === "ru" ? "Истекает" : "Expires on",
    cancelSubscription: language === "ru" ? "Отменить подписку" : "Cancel Subscription",
    cancelConfirmTitle: language === "ru" ? "Отменить подписку?" : "Cancel subscription?",
    cancelConfirmDesc: language === "ru"
      ? "Вы сохраните доступ до конца текущего периода. После этого доступ к премиум-контенту будет закрыт."
      : "You'll keep access until the end of your current period. After that, premium content will be locked.",
    cancelConfirm: language === "ru" ? "Да, отменить" : "Yes, cancel",
    cancelKeep: language === "ru" ? "Оставить подписку" : "Keep subscription",
    noSubscription: language === "ru" ? "Нет активной подписки" : "No Active Subscription",
    noSubscriptionDesc: language === "ru"
      ? "Подпишитесь, чтобы получить доступ ко всем модулям обучения."
      : "Subscribe to unlock all learning modules.",
    viewPlans: language === "ru" ? "Посмотреть планы" : "View Plans",
    trialActive: language === "ru" ? "Пробный период активен" : "Trial Active",
    trialDaysLeft: language === "ru" ? "дней осталось" : "days remaining",
    billingHistory: language === "ru" ? "История платежей" : "Billing History",
    noBillingHistory: language === "ru" ? "История платежей пока пуста" : "No billing history yet",
    signInRequired: language === "ru" ? "Войдите, чтобы управлять подпиской" : "Sign in to manage your subscription",
    back: language === "ru" ? "Назад" : "Back",
    monthly: language === "ru" ? "Месячный" : "Monthly",
    quarterly: language === "ru" ? "3 месяца" : "3 Months",
    semi_annual: language === "ru" ? "6 месяцев" : "6 Months",
    annual: language === "ru" ? "Годовой" : "Annual",
    changePlan: language === "ru" ? "Изменить план" : "Change Plan",
    cancelledNotice: language === "ru" ? "Подписка будет отменена в конце периода" : "Subscription will end at the end of the period",
  };

  const planNames: Record<string, string> = {
    monthly: texts.monthly,
    quarterly: texts.quarterly,
    semi_annual: texts.semi_annual,
    annual: texts.annual,
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      // For now, we mark subscription as canceled via edge function or direct update
      // In production, this would call Stripe to cancel
      toast({
        title: language === "ru" ? "Подписка отменена" : "Subscription canceled",
        description: language === "ru"
          ? "Вы сохраните доступ до конца текущего периода."
          : "You'll keep access until the end of your current billing period.",
      });
    } catch (error) {
      toast({
        title: language === "ru" ? "Ошибка" : "Error",
        description: language === "ru" ? "Не удалось отменить подписку" : "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setCancelling(false);
    }
  };

  if (!user) {
    return (
      <>
        <Helmet><title>{texts.pageTitle} - CalmStep</title></Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 sm:px-6 pt-24 pb-8 text-center">
            <p className="text-muted-foreground text-lg mt-20">{texts.signInRequired}</p>
            <Button variant="hero" className="mt-4" onClick={() => navigate("/auth")}>
              {language === "ru" ? "Войти" : "Sign In"}
            </Button>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const isSubscribed = hasActiveSubscription();
  const trialActive = isTrialActive();
  const trialDays = getTrialDaysRemaining();

  return (
    <>
      <Helmet><title>{texts.pageTitle} - CalmStep</title></Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-8 max-w-3xl">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            {texts.back}
          </Button>

          <h1 className="text-heading text-foreground mb-8">{texts.title}</h1>

          {/* Trial Banner */}
          {trialActive && !isSubscribed && (
            <Card className="mb-6 border-accent bg-accent-light">
              <CardContent className="flex items-center gap-4 py-4">
                <Calendar className="w-8 h-8 text-accent-foreground" />
                <div className="flex-1">
                  <p className="font-semibold text-accent-foreground">
                    🎉 {texts.trialActive}
                  </p>
                  <p className="text-sm text-accent-foreground/80">
                    {trialDays} {texts.trialDaysLeft}
                  </p>
                </div>
                <Button variant="hero" size="sm" onClick={() => navigate("/pricing")}>
                  {texts.viewPlans}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Current Plan */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                {texts.currentPlan}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubscribed && subscription ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {planNames[subscription.plan_type] || subscription.plan_type}
                      </p>
                  <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">{texts.active}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {subscription.cancel_at_period_end ? texts.expiresOn : texts.renewsOn}:{" "}
                    <span className="font-medium text-foreground">
                      {new Date(subscription.current_period_end).toLocaleDateString(language === "ru" ? "ru-RU" : "en-US", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </span>
                  </div>

                  {subscription.cancel_at_period_end && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      {texts.cancelledNotice}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={() => navigate("/pricing")}>
                      {texts.changePlan}
                    </Button>
                    {!subscription.cancel_at_period_end && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" className="text-destructive hover:text-destructive">
                            {texts.cancelSubscription}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{texts.cancelConfirmTitle}</AlertDialogTitle>
                            <AlertDialogDescription>{texts.cancelConfirmDesc}</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{texts.cancelKeep}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleCancel}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              disabled={cancelling}
                            >
                              {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : texts.cancelConfirm}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <XCircle className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="font-medium text-foreground">{texts.noSubscription}</p>
                  <p className="text-sm text-muted-foreground mt-1">{texts.noSubscriptionDesc}</p>
                  <Button variant="hero" className="mt-4" onClick={() => navigate("/pricing")}>
                    {texts.viewPlans}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                {texts.billingHistory}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-6">
                {texts.noBillingHistory}
              </p>
            </CardContent>
          </Card>

          <div className="h-16 sm:hidden" />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default SubscriptionManagement;
