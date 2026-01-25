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
  TrendingUp,
  Crown,
  Medal,
  Gem,
  Gift,
  Rocket,
  Brain,
  MessageCircle,
  Award,
  Flame,
  Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Helmet } from "react-helmet-async";

const ProgressDashboard = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { progress, getTotalProgress, getStreakData, resetProgress } = useProgressTracking();

  const totalStats = getTotalProgress();
  const streakData = getStreakData();

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

  // Define achievements based on progress - expanded with more milestones
  const achievements = [
    {
      id: "first_step",
      icon: Star,
      title: t("achievements.firstStep"),
      description: t("achievements.firstStepDesc"),
      unlocked: totalStats.totalCompleted >= 1,
      color: "bg-yellow-500",
      requiredTasks: 1,
    },
    {
      id: "explorer",
      icon: Target,
      title: t("achievements.explorer"),
      description: t("achievements.explorerDesc"),
      unlocked: Object.entries(progress).filter(([key, m]) => key !== 'streak' && (m as any).completedTasks > 0).length >= 3,
      color: "bg-blue-500",
      requiredTasks: null,
    },
    {
      id: "consistent",
      icon: Calendar,
      title: t("achievements.consistent"),
      description: t("achievements.consistentDesc"),
      unlocked: totalStats.totalCompleted >= 5,
      color: "bg-green-500",
      requiredTasks: 5,
    },
    {
      id: "dedicated",
      icon: TrendingUp,
      title: t("achievements.dedicated"),
      description: t("achievements.dedicatedDesc"),
      unlocked: totalStats.totalCompleted >= 10,
      color: "bg-purple-500",
      requiredTasks: 10,
    },
    {
      id: "super_star",
      icon: Sparkles,
      title: t("achievements.superStar"),
      description: t("achievements.superStarDesc"),
      unlocked: totalStats.totalCompleted >= 15,
      color: "bg-pink-500",
      requiredTasks: 15,
    },
    {
      id: "achiever",
      icon: Award,
      title: t("achievements.achiever"),
      description: t("achievements.achieverDesc"),
      unlocked: totalStats.totalCompleted >= 20,
      color: "bg-orange-500",
      requiredTasks: 20,
    },
    {
      id: "champion",
      icon: Trophy,
      title: t("achievements.champion"),
      description: t("achievements.championDesc"),
      unlocked: totalStats.totalCompleted >= 25,
      color: "bg-amber-500",
      requiredTasks: 25,
    },
    {
      id: "legend",
      icon: Crown,
      title: t("achievements.legend"),
      description: t("achievements.legendDesc"),
      unlocked: totalStats.totalCompleted >= 50,
      color: "bg-indigo-500",
      requiredTasks: 50,
    },
    {
      id: "master",
      icon: Gem,
      title: t("achievements.master"),
      description: t("achievements.masterDesc"),
      unlocked: totalStats.totalCompleted >= 100,
      color: "bg-rose-500",
      requiredTasks: 100,
    },
    {
      id: "all_rounder",
      icon: Rocket,
      title: t("achievements.allRounder"),
      description: t("achievements.allRounderDesc"),
      unlocked: Object.entries(progress).filter(([key]) => key !== 'streak').every(([, m]) => (m as any).completedTasks >= 5),
      color: "bg-teal-500",
      requiredTasks: null,
    },
    // Streak achievements
    {
      id: "streak_3",
      icon: Flame,
      title: t("achievements.streak3"),
      description: t("achievements.streak3Desc"),
      unlocked: streakData.longestStreak >= 3,
      color: "bg-orange-400",
      requiredTasks: null,
    },
    {
      id: "streak_7",
      icon: Flame,
      title: t("achievements.streak7"),
      description: t("achievements.streak7Desc"),
      unlocked: streakData.longestStreak >= 7,
      color: "bg-orange-500",
      requiredTasks: null,
    },
    {
      id: "streak_14",
      icon: Zap,
      title: t("achievements.streak14"),
      description: t("achievements.streak14Desc"),
      unlocked: streakData.longestStreak >= 14,
      color: "bg-yellow-500",
      requiredTasks: null,
    },
    {
      id: "streak_30",
      icon: Crown,
      title: t("achievements.streak30"),
      description: t("achievements.streak30Desc"),
      unlocked: streakData.longestStreak >= 30,
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
      requiredTasks: null,
    },
    // Module-specific achievements
    {
      id: "math_whiz",
      icon: Calculator,
      title: t("achievements.mathWhiz"),
      description: t("achievements.mathWhizDesc"),
      unlocked: progress.math.completedTasks >= 10,
      color: "bg-primary",
      requiredTasks: null,
    },
    {
      id: "bookworm",
      icon: BookOpen,
      title: t("achievements.bookworm"),
      description: t("achievements.bookwormDesc"),
      unlocked: progress.reading.completedTasks >= 10,
      color: "bg-secondary",
      requiredTasks: null,
    },
    {
      id: "puzzle_pro",
      icon: Brain,
      title: t("achievements.puzzlePro"),
      description: t("achievements.puzzleProDesc"),
      unlocked: progress.logic.completedTasks >= 10,
      color: "bg-calm",
      requiredTasks: null,
    },
    {
      id: "empath",
      icon: Heart,
      title: t("achievements.empath"),
      description: t("achievements.empathDesc"),
      unlocked: progress.emotions.completedTasks >= 10,
      color: "bg-warm",
      requiredTasks: null,
    },
    {
      id: "social_butterfly",
      icon: MessageCircle,
      title: t("achievements.socialButterfly"),
      description: t("achievements.socialButterflyDesc"),
      unlocked: progress.social.completedTasks >= 10,
      color: "bg-accent",
      requiredTasks: null,
    },
  ];

  // Prizes - special rewards for milestones
  const prizes = [
    { tasks: 10, emoji: "🌟", name: { en: "Golden Star", ru: "Золотая звезда" } },
    { tasks: 25, emoji: "🏆", name: { en: "Champion Trophy", ru: "Кубок чемпиона" } },
    { tasks: 50, emoji: "👑", name: { en: "Royal Crown", ru: "Королевская корона" } },
    { tasks: 75, emoji: "💎", name: { en: "Diamond Gem", ru: "Бриллиант" } },
    { tasks: 100, emoji: "🚀", name: { en: "Space Rocket", ru: "Космическая ракета" } },
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
        
        {/* Account for fixed header height so top controls (Back button) are not hidden behind it */}
        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-8">
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
              <div className="grid sm:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 mx-auto bg-card rounded-2xl flex items-center justify-center mb-3 shadow-soft">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{totalStats.totalCompleted}</p>
                  <p className="text-sm text-muted-foreground">{t("progress.tasksCompleted")}</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto bg-card rounded-2xl flex items-center justify-center mb-3 shadow-soft">
                    <Flame className="w-8 h-8 text-orange-500" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{streakData.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">{t("streak.currentStreak")}</p>
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

          {/* Streak Section */}
          <h2 className="text-xl font-semibold text-foreground mb-4">{t("streak.title")}</h2>
          <Card className="mb-12 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                      <Flame className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold">
                        {streakData.currentStreak} {streakData.currentStreak === 1 ? t("streak.day") : t("streak.days")}
                      </p>
                      <p className="text-white/80">
                        {streakData.currentStreak > 0 ? t("streak.keepItUp") : t("streak.startStreak")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80">{t("streak.longestStreak")}</p>
                    <p className="text-2xl font-bold">
                      {streakData.longestStreak} {streakData.longestStreak === 1 ? t("streak.day") : t("streak.days")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-card">
                <div className="flex items-center justify-center gap-2 text-sm">
                  {progress.streak.lastActivityDate && 
                   progress.streak.lastActivityDate === new Date().toISOString().split('T')[0] ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <Star className="w-4 h-4 fill-green-500" />
                      {t("streak.practicedToday")}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {t("streak.practiceToday")}
                    </span>
                  )}
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

          {/* Prizes Section */}
          <h2 className="text-xl font-semibold text-foreground mb-4">{t("prizes.title")}</h2>
          <p className="text-muted-foreground mb-4">{t("prizes.subtitle")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {prizes.map((prize) => {
              const unlocked = totalStats.totalCompleted >= prize.tasks;
              const remaining = Math.max(0, prize.tasks - totalStats.totalCompleted);
              
              return (
                <Card 
                  key={prize.tasks} 
                  className={`text-center transition-all ${
                    unlocked 
                      ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:shadow-lg" 
                      : "bg-muted/30 opacity-70"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className={`text-5xl mb-3 ${unlocked ? "animate-bounce" : "grayscale"}`}>
                      {prize.emoji}
                    </div>
                    <h3 className={`font-semibold text-sm ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                      {prize.name[language]}
                    </h3>
                    {unlocked ? (
                      <span className="inline-flex items-center gap-1 text-xs text-yellow-600 mt-2">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        {t("prizes.unlocked")}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {remaining} {t("prizes.tasksNeeded")}
                      </span>
                    )}
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
        <MobileBottomNav />
        
        {/* Spacer for mobile bottom nav */}
        <div className="h-16 sm:hidden" />
      </div>
    </>
  );
};

export default ProgressDashboard;
