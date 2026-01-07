import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, BookOpen, Puzzle, Heart, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const LearningModulesSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const modules = [
    {
      icon: Calculator,
      emoji: "🔢",
      id: "math",
      titleKey: "learning.math",
      descKey: "learning.mathDesc",
      topics: ["learning.mathTopic1", "learning.mathTopic2", "learning.mathTopic3"],
      color: "primary",
      bgColor: "bg-primary-light",
      borderColor: "border-primary/20",
    },
    {
      icon: BookOpen,
      emoji: "📖",
      id: "reading",
      titleKey: "learning.reading",
      descKey: "learning.readingDesc",
      topics: ["learning.readingTopic1", "learning.readingTopic2", "learning.readingTopic3"],
      color: "secondary",
      bgColor: "bg-secondary-light",
      borderColor: "border-secondary/30",
    },
    {
      icon: Puzzle,
      emoji: "🧩",
      id: "logic",
      titleKey: "learning.logic",
      descKey: "learning.logicDesc",
      topics: ["learning.logicTopic1", "learning.logicTopic2", "learning.logicTopic3"],
      color: "accent",
      bgColor: "bg-accent-light",
      borderColor: "border-accent/20",
    },
    {
      icon: Heart,
      emoji: "💭",
      id: "emotions",
      titleKey: "learning.emotions",
      descKey: "learning.emotionsDesc",
      topics: ["learning.emotionsTopic1", "learning.emotionsTopic2", "learning.emotionsTopic3"],
      color: "warm",
      bgColor: "bg-warm-light",
      borderColor: "border-warm/20",
    },
  ];

  const socialTags = [
    "learning.schoolSituations",
    "learning.makingFriends",
    "learning.askingHelp",
    "learning.takingTurns",
  ];

  return (
    <section id="learning" className="py-24 gradient-calm">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary-foreground rounded-full text-sm font-medium mb-4">
            {t("learning.badge")}
          </span>
          <h2 className="text-heading text-foreground mb-4">
            {t("learning.title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">
            {t("learning.subtitle")}
          </p>
        </div>

        {/* Modules grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className={`group overflow-hidden ${module.bgColor} ${module.borderColor} border-2 hover:border-opacity-40`}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{module.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{t(module.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t("learning.module")}</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t(module.descKey)}
                </p>

                <div className="space-y-2 mb-6">
                  {module.topics.map((topicKey) => (
                    <div 
                      key={topicKey}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {t(topicKey)}
                    </div>
                  ))}
                </div>

                <Button 
                  variant="soft" 
                  size="sm" 
                  className="group/btn"
                  onClick={() => navigate(`/learn/${module.id}`)}
                >
                  {t("learning.explore")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social scenarios callout */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-card border-calm/30 border-2">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-8 bg-calm-light flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl block mb-4">🤝</span>
                    <h3 className="text-xl font-bold text-foreground">{t("learning.socialScenarios")}</h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {t("learning.practiceReal")}
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    {t("learning.socialDesc")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socialTags.map((tagKey) => (
                      <span 
                        key={tagKey}
                        className="px-3 py-1 bg-calm-light text-calm-foreground rounded-full text-sm font-medium"
                      >
                        {t(tagKey)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LearningModulesSection;
