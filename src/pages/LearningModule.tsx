import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Calculator, BookOpen, Puzzle, Heart, MessageCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAIChat } from "@/hooks/useAIChat";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const moduleData = {
  math: {
    icon: Calculator,
    emoji: "🔢",
    color: "primary",
    bgColor: "bg-primary-light",
    activities: [
      { title: { en: "Count the Stars", ru: "Посчитай звёзды" }, emoji: "⭐" },
      { title: { en: "Shape Match", ru: "Найди фигуру" }, emoji: "🔷" },
      { title: { en: "Number Hunt", ru: "Найди число" }, emoji: "🔍" },
    ],
  },
  reading: {
    icon: BookOpen,
    emoji: "📖",
    color: "secondary",
    bgColor: "bg-secondary-light",
    activities: [
      { title: { en: "Picture Words", ru: "Картинки и слова" }, emoji: "🖼️" },
      { title: { en: "Sound Match", ru: "Сопоставь звуки" }, emoji: "🔊" },
      { title: { en: "Story Time", ru: "Время сказок" }, emoji: "📚" },
    ],
  },
  logic: {
    icon: Puzzle,
    emoji: "🧩",
    color: "accent",
    bgColor: "bg-accent-light",
    activities: [
      { title: { en: "Find the Pattern", ru: "Найди паттерн" }, emoji: "🔄" },
      { title: { en: "Sort It Out", ru: "Рассортируй" }, emoji: "📦" },
      { title: { en: "What Comes Next?", ru: "Что дальше?" }, emoji: "➡️" },
    ],
  },
  emotions: {
    icon: Heart,
    emoji: "💭",
    color: "warm",
    bgColor: "bg-warm-light",
    activities: [
      { title: { en: "How Do They Feel?", ru: "Что они чувствуют?" }, emoji: "😊" },
      { title: { en: "Calm Corner", ru: "Уголок спокойствия" }, emoji: "🌿" },
      { title: { en: "Emotion Cards", ru: "Карточки эмоций" }, emoji: "🎴" },
    ],
  },
};

const LearningModule = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [inputValue, setInputValue] = useState("");

  const module = moduleData[moduleId as keyof typeof moduleData];
  
  const moduleContext = moduleId === "math" 
    ? "Math - counting, shapes, numbers, patterns"
    : moduleId === "reading"
    ? "Reading - letters, words, phonics, stories"
    : moduleId === "logic"
    ? "Logic - patterns, sorting, puzzles, sequences"
    : "Emotions - feelings, calm strategies, understanding emotions";

  const { messages, isLoading, error, sendMessage } = useAIChat(moduleContext);

  if (!module) {
    navigate("/");
    return null;
  }

  const Icon = module.icon;
  const moduleName = t(`learning.${moduleId}`);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Helmet>
        <title>{moduleName} - CalmStep</title>
        <meta name="description" content={t(`learning.${moduleId}Desc`)} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${module.bgColor} flex items-center justify-center`}>
                  <span className="text-2xl">{module.emoji}</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{moduleName}</h1>
                  <p className="text-sm text-muted-foreground">{t("learning.module")}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Activities Section */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">{t("module.activities")}</h2>
              <div className="space-y-3">
                {module.activities.map((activity, index) => (
                  <Card 
                    key={index}
                    className={`${module.bgColor} border-2 border-${module.color}/20 cursor-pointer hover:border-${module.color}/40 transition-calm`}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center">
                        <span className="text-2xl">{activity.emoji}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {activity.title[language]}
                        </h3>
                        <p className="text-sm text-muted-foreground">{t("module.tryActivity")}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Chat Section */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {t("module.askQuestion")} {moduleName}
              </h2>
              <Card className="h-[500px] flex flex-col">
                <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center">
                          <MessageCircle className="w-8 h-8 text-primary" />
                        </div>
                        <p>{t("module.askQuestion")} {moduleName.toLowerCase()}!</p>
                      </div>
                    )}
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted text-foreground rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-foreground rounded-2xl rounded-bl-md p-4">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">{t("module.thinking")}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t("module.placeholder")}
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button 
                      onClick={handleSend} 
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LearningModule;
