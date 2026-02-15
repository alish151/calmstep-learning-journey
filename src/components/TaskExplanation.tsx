import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface TaskExplanationProps {
  taskDescription: string;
  wasCorrect: boolean;
  correctAnswer: string;
  userAnswer: string;
  module: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

const TaskExplanation = ({ taskDescription, wasCorrect, correctAnswer, userAnswer, module }: TaskExplanationProps) => {
  const { language } = useLanguage();
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const texts = {
    askAI: language === "ru" ? "🤖 Объясни мне!" : "🤖 Explain to me!",
    thinking: language === "ru" ? "Думаю..." : "Thinking...",
    aiHelper: language === "ru" ? "Помощник" : "Helper",
  };

  const requestExplanation = async () => {
    setIsLoading(true);
    setHasRequested(true);
    setExplanation("");

    const prompt = language === "ru"
      ? `Ребёнок ${wasCorrect ? "правильно ответил" : "ошибся"} в задании: "${taskDescription}". Правильный ответ: "${correctAnswer}". ${!wasCorrect ? `Ребёнок ответил: "${userAnswer}".` : ""} Объясни простыми словами по-русски.`
      : `The child ${wasCorrect ? "answered correctly" : "made a mistake"} on the task: "${taskDescription}". The correct answer is: "${correctAnswer}". ${!wasCorrect ? `The child answered: "${userAnswer}".` : ""} Explain simply.`;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          mode: "explain",
          taskContext: `${module} module, ${language === "ru" ? "Russian" : "English"} language`,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!resp.ok || !resp.body) {
        setExplanation(language === "ru" ? "Не удалось получить объяснение. Попробуй ещё раз! 💙" : "Couldn't get explanation. Try again! 💙");
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setExplanation(fullText);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error("Explanation error:", err);
      setExplanation(language === "ru" ? "Не удалось получить объяснение 😔" : "Couldn't get explanation 😔");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasRequested) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={requestExplanation}
        className="gap-2 border-primary/30 text-primary hover:bg-primary-light"
      >
        <Sparkles className="w-4 h-4" />
        {texts.askAI}
      </Button>
    );
  }

  return (
    <Card className="bg-primary-light/50 border-primary/20 mt-3">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary mb-1">{texts.aiHelper}</p>
            {isLoading && !explanation ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-sm">{texts.thinking}</span>
              </div>
            ) : (
              <p className="text-sm text-foreground leading-relaxed">{explanation}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskExplanation;
