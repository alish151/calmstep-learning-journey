import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye, Lightbulb, Shield, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ParentDashboardSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: TrendingUp,
      titleKey: "parents.progressTracking",
      descKey: "parents.progressTrackingDesc",
    },
    {
      icon: Eye,
      titleKey: "parents.interestInsights",
      descKey: "parents.interestInsightsDesc",
    },
    {
      icon: Lightbulb,
      titleKey: "parents.recommendations",
      descKey: "parents.recommendationsDesc",
    },
    {
      icon: Shield,
      titleKey: "parents.privacy",
      descKey: "parents.privacyDesc",
    },
  ];

  return (
    <section id="parents" className="py-24 gradient-warm">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-warm-light text-warm-foreground rounded-full text-sm font-medium mb-4 border border-warm/30">
            {t("parents.badge")}
          </span>
          <h2 className="text-heading text-foreground mb-4">
            {t("parents.title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">
            {t("parents.subtitle")}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {features.map((feature) => (
            <Card key={feature.titleKey} className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-light flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-warm" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-card">
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-lg">👧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("parents.emmaProgress")}</h4>
                    <p className="text-sm text-muted-foreground">{t("parents.weekSummary")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {t("parents.viewDetails")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Activity card */}
                <div className="p-4 bg-primary-light rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1">{t("parents.sessionsWeek")}</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-xs text-primary mt-1">{t("parents.comfortablePace")}</p>
                </div>

                {/* Favorite module */}
                <div className="p-4 bg-secondary-light rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1">{t("parents.favoriteTopic")}</p>
                  <p className="text-2xl font-bold text-foreground">{t("parents.shapes")}</p>
                  <p className="text-xs text-secondary-foreground mt-1">{t("parents.inMathModule")}</p>
                </div>

                {/* Comfort level */}
                <div className="p-4 bg-calm-light rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1">{t("parents.comfortLevel")}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-3 bg-calm/30 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-calm rounded-full" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{t("parents.high")}</span>
                  </div>
                </div>
              </div>

              {/* Gentle recommendation */}
              <div className="mt-6 p-4 bg-muted rounded-2xl flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm">{t("parents.gentleSuggestion")}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("parents.suggestionText")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ParentDashboardSection;
