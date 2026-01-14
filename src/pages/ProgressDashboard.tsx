import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Calculator, 
  BookOpen, 
  Puzzle, 
  Heart, 
  Users,
  Trophy,
  Star,
  Sparkles,
  Target,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

const ProgressDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { progress, getTotalProgress, resetProgress } = useProgressTracking();

  const totalStats = getTotalProgress();

  const modules = [
    {
      key: "math" as const,
      icon: Calculator,
      label: t("modules.math"),
      color: "bg-primary",
      lightColor: "bg-primary-light",
      textColor: "text-primary",
    },
    {
      key: "reading" as const,
      icon: BookOpen,
      label: t("modules.reading"),
      color: "bg-secondary",
      lightColor: "bg-secondary-light",
      textColor: "text-secondary",
    },
    {
      key: "logic" as const,
      icon: Puzzle,
      label: t("modules.logic"),
      color: "bg-calm",
      lightColor: "bg-calm-light",
      textColor: "text-calm",
    },
    {
      key: "emotions" as const,
      icon: Heart,
      label: t("modules.emotions"),
      color: "bg-warm",
      lightColor: "bg-warm-light",
      textColor: "text-warm",
    },
    {
      key: "social" as const,
      icon: Users,
      label: t("modules.social"),
      color: "bg-accent",
      lightColor: "bg-accent/20",
      textColor: "text-accent",
    },
  ];

  // Define achievements based on progress
  const achievements = [
    {
      id: "first_step",
      icon: Star,
      title: t("achievements.firstStep"),
      description: t("achievements.firstStepDesc"),
      unlocked: totalStats.totalCompleted >= 1,
      color: "bg-primary",
    },
    {
      id: "explorer",
      icon: Target,
      title: t("achievements.explorer"),
      description: t("achievements.explorerDesc"),
      unlocked: Object.values(progress).filter(m => m.completedTasks > 0).length >= 3,
      color: "bg-secondary",
    },
    {
      id: "consistent",
      icon: Calendar,
      title: t("achievements.consistent"),
      description: t("achievements.consistentDesc"),
      unlocked: totalStats.totalCompleted >= 5,
      color: "bg-calm",
    },
    {
      id: "dedicated",
      icon: TrendingUp,
      title: t("achievements.dedicated"),
      description: t("achievements.dedicatedDesc"),
      unlocked: totalStats.totalCompleted >= 10,
      color: "bg-warm",
    },
    {
      id: "champion",
      icon: Trophy,
      title: t("achievements.champion"),
      description: t("achievements.championDesc"),
      unlocked: totalStats.totalCompleted >= 25,
      color: "bg-accent",
    },
    {
      id: "master",
      icon: Sparkles,
      title: t("achievements.master"),
      description: t("achievements.masterDesc"),
      unlocked: Object.values(progress).every(m => m.completedTasks >= 5),
      color: "bg-primary",
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  const formatLastPlayed = (dateString: string | null) => {
    if (!dateString) return t("progress.notYet");
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t("progress.today");
    if (diffDays === 1) return t("progress.yesterday");
    if (diffDays < 7) return `${diffDays} ${t("progress.daysAgo")}`;
    return date.toLocaleDateString();
  };
  return (
    <>
      <Helmet>
        <title>{t("progress.pageTitle")} - CalmStep</title>
        <meta name="description" content={t("progress.pageDescription")} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 py-8">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.back")}
          </Button>

          {/* Page header */}
          <div className="text-center mb-12">
            <h1 className="text-heading text-foreground mb-4">
              {t("progress.title")}
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t("progress.subtitle")}
            </p>
          </div>

          {/* Overall progress summary */}
          <Card className="mb-8 bg-gradient-to-br from-primary-light to-secondary-light border-none">
            <CardContent className="p-8">
              <div className="grid sm:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 mx-auto bg-card rounded-2xl flex items-center justify-center mb-3 shadow-soft">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{totalStats.totalCompleted}</p>
                  <p className="text-sm text-muted-foreground">{t("progress.tasksCompleted")}</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto bg-card rounded-2xl flex items-center justify-center mb-3 shadow-soft">
                    <Sparkles className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{totalStats.totalAttempts}</p>
                  <p className="text-sm text-muted-foreground">{t("progress.totalSessions")}</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto bg-card rounded-2xl flex items-center justify-center mb-3 shadow-soft">
                    <Trophy className="w-8 h-8 text-warm" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{unlockedAchievements.length}</p>
                  <p className="text-sm text-muted-foreground">{t("progress.achievementsUnlocked")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module progress */}
          <h2 className="text-xl font-semibold text-foreground mb-4">{t("progress.moduleProgress")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {modules.map((module) => {
              const moduleProgress = progress[module.key];
              const progressPercent = moduleProgress.totalAttempts > 0 
                ? Math.min((moduleProgress.completedTasks / 10) * 100, 100) 
                : 0;

              return (
                <Card key={module.key} className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${module.lightColor} flex items-center justify-center`}>
                        <module.icon className={`w-6 h-6 ${module.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{module.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatLastPlayed(moduleProgress.lastPlayed)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("progress.completed")}</span>
                        <span className="font-medium text-foreground">{moduleProgress.completedTasks} {t("progress.tasks")}</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => {
                        if (module.key === "social") {
                          navigate("/social-scenarios");
                        } else {
                          navigate(`/learn/${module.key}`);
                        }
                      }}
                    >
                      {t("progress.continue")}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Achievements section */}
          <h2 className="text-xl font-semibold text-foreground mb-4">{t("progress.achievements")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`transition-all ${
                  achievement.unlocked 
                    ? "bg-card hover:shadow-medium" 
                    : "bg-muted/50 opacity-60"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      achievement.unlocked ? achievement.color : "bg-muted"
                    }`}>
                      <achievement.icon className={`w-6 h-6 ${
                        achievement.unlocked ? "text-white" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && (
                        <span className="inline-flex items-center gap-1 text-xs text-primary mt-2">
                          <Star className="w-3 h-3" />
                          {t("progress.unlocked")}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reset progress option (for parents) */}
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                {t("progress.resetInfo")}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  if (confirm(t("progress.resetConfirm"))) {
                    resetProgress();
                  }
                }}
              >
                {t("progress.resetButton")}
              </Button>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProgressDashboard;
