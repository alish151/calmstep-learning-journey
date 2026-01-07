import { User, Clock, Trophy, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: User,
      titleKey: "how.personalProfile",
      descKey: "how.personalProfileDesc",
      color: "primary",
    },
    {
      icon: Clock,
      titleKey: "how.microLessons",
      descKey: "how.microLessonsDesc",
      color: "secondary",
    },
    {
      icon: Trophy,
      titleKey: "how.noPressure",
      descKey: "how.noPressureDesc",
      color: "accent",
    },
    {
      icon: Palette,
      titleKey: "how.adaptiveLearning",
      descKey: "how.adaptiveLearningDesc",
      color: "calm",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "bg-primary-light text-primary",
      secondary: "bg-secondary-light text-secondary-foreground",
      accent: "bg-accent-light text-accent-foreground",
      calm: "bg-calm-light text-calm-foreground",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section id="how-it-works" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 gradient-calm opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary-light text-secondary-foreground rounded-full text-sm font-medium mb-4">
            {t("how.badge")}
          </span>
          <h2 className="text-heading text-foreground mb-4">
            {t("how.title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">
            {t("how.subtitle")}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.titleKey} 
              className="group border-none bg-card hover:bg-card/80"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl ${getColorClasses(feature.color)} flex items-center justify-center mb-5 transition-calm group-hover:scale-105`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 p-8 rounded-3xl gradient-warm border border-warm/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-warm flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🌟</span>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("how.everyChild")}
              </h3>
              <p className="text-muted-foreground max-w-2xl">
                {t("how.everyChildDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
