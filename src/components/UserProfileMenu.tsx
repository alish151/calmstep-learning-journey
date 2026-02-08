import { useNavigate } from "react-router-dom";
import { User, LogOut, Crown, BarChart3, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const UserProfileMenu = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, hasActiveSubscription, isTrialActive, getTrialDaysRemaining } = useSubscription();

  if (!user) return null;

  const isSubscribed = hasActiveSubscription();
  const trialActive = isTrialActive();
  const trialDays = getTrialDaysRemaining();

  const email = user.email || "";
  const initials = email.substring(0, 2).toUpperCase();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const texts = {
    account: language === "ru" ? "Аккаунт" : "Account",
    progress: language === "ru" ? "Прогресс" : "Progress",
    subscription: language === "ru" ? "Подписка" : "Subscription",
    pricing: language === "ru" ? "Тарифы" : "Pricing",
    signOut: language === "ru" ? "Выйти" : "Sign Out",
    trial: language === "ru" ? "Пробный" : "Trial",
    daysLeft: language === "ru" ? "д." : "d",
    active: language === "ru" ? "Активна" : "Active",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full hover:bg-primary-light transition-calm p-1 pr-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {trialActive && !isSubscribed && (
            <Badge variant="secondary" className="text-xs px-2 py-0">
              {texts.trial} {trialDays}{texts.daysLeft}
            </Badge>
          )}
          {isSubscribed && (
            <Badge className="text-xs px-2 py-0 bg-primary text-primary-foreground">
              <Crown className="w-3 h-3 mr-1" />
              {texts.active}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover border border-border shadow-card z-50">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium text-foreground">{texts.account}</p>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/progress")} className="cursor-pointer">
          <BarChart3 className="w-4 h-4 mr-2" />
          {texts.progress}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/subscription")} className="cursor-pointer">
          <CreditCard className="w-4 h-4 mr-2" />
          {texts.subscription}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/pricing")} className="cursor-pointer">
          <Crown className="w-4 h-4 mr-2" />
          {texts.pricing}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          {texts.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
