import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Subscription {
  id: string;
  user_id: string;
  plan_type: "monthly" | "quarterly" | "semi_annual" | "annual";
  status: "active" | "canceled" | "past_due" | "trialing" | "incomplete";
  current_period_end: string;
  cancel_at_period_end: boolean;
}

interface Profile {
  id: string;
  user_id: string;
  trial_started_at: string;
}

const TRIAL_DAYS = 3;

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const fetchSubscriptionData = useCallback(async (userId: string) => {
    try {
      // Fetch subscription
      const { data: subData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .maybeSingle();

      setSubscription(subData as Subscription | null);

      // Fetch profile for trial info
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      setProfile(profileData as Profile | null);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => {
            fetchSubscriptionData(session.user.id);
          }, 0);
        } else {
          setSubscription(null);
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSubscriptionData(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => authSubscription.unsubscribe();
  }, [fetchSubscriptionData]);

  const isTrialActive = useCallback(() => {
    if (!profile?.trial_started_at) return false;
    
    const trialStart = new Date(profile.trial_started_at);
    const trialEnd = new Date(trialStart);
    trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS);
    
    return new Date() < trialEnd;
  }, [profile]);

  const getTrialDaysRemaining = useCallback(() => {
    if (!profile?.trial_started_at) return 0;
    
    const trialStart = new Date(profile.trial_started_at);
    const trialEnd = new Date(trialStart);
    trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS);
    
    const now = new Date();
    const remaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, remaining);
  }, [profile]);

  const hasActiveSubscription = useCallback(() => {
    if (!subscription) return false;
    return subscription.status === "active" && new Date(subscription.current_period_end) > new Date();
  }, [subscription]);

  const hasAccess = useCallback(() => {
    return hasActiveSubscription() || isTrialActive();
  }, [hasActiveSubscription, isTrialActive]);

  const createCheckoutSession = async (planType: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("Please sign in to subscribe");
    }

    const response = await supabase.functions.invoke("create-checkout", {
      body: {
        planType,
        successUrl: `${window.location.origin}/progress?subscription=success`,
        cancelUrl: `${window.location.origin}/pricing?subscription=canceled`,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    if (response.data?.url) {
      window.location.href = response.data.url;
    }
  };

  return {
    user,
    subscription,
    profile,
    isLoading,
    isTrialActive,
    getTrialDaysRemaining,
    hasActiveSubscription,
    hasAccess,
    createCheckoutSession,
    refetch: () => user && fetchSubscriptionData(user.id),
  };
};
