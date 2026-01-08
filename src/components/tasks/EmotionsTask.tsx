import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Star, Heart } from "lucide-react";

interface EmotionsTaskProps {
  activityIndex: number;
  onComplete: (correct: boolean) => void;
}

const feelingsTasks = [
  { face: "😊", emotion: { en: "Happy", ru: "Счастливый" }, options: { en: ["Happy", "Sad", "Angry", "Scared"], ru: ["Счастливый", "Грустный", "Злой", "Испуганный"] } },
  { face: "😢", emotion: { en: "Sad", ru: "Грустный" }, options: { en: ["Happy", "Sad", "Angry", "Surprised"], ru: ["Счастливый", "Грустный", "Злой", "Удивлённый"] } },
  { face: "😠", emotion: { en: "Angry", ru: "Злой" }, options: { en: ["Happy", "Sad", "Angry", "Tired"], ru: ["Счастливый", "Грустный", "Злой", "Уставший"] } },
  { face: "😨", emotion: { en: "Scared", ru: "Испуганный" }, options: { en: ["Excited", "Sad", "Scared", "Happy"], ru: ["Взволнованный", "Грустный", "Испуганный", "Счастливый"] } },
  { face: "😮", emotion: { en: "Surprised", ru: "Удивлённый" }, options: { en: ["Surprised", "Sad", "Angry", "Tired"], ru: ["Удивлённый", "Грустный", "Злой", "Уставший"] } },
];

const calmingActivities = [
  {
    title: { en: "Deep Breathing", ru: "Глубокое дыхание" },
    instruction: { en: "Breathe in slowly... and out...", ru: "Вдохни медленно... и выдохни..." },
    icon: "🌬️",
    steps: { 
      en: ["Breathe in for 4 seconds", "Hold for 4 seconds", "Breathe out for 4 seconds", "Repeat 3 times"],
      ru: ["Вдохни на 4 секунды", "Задержи на 4 секунды", "Выдохни на 4 секунды", "Повтори 3 раза"]
    },
  },
  {
    title: { en: "Body Scan", ru: "Сканирование тела" },
    instruction: { en: "Notice how your body feels", ru: "Почувствуй своё тело" },
    icon: "🧘",
    steps: {
      en: ["Close your eyes", "Feel your feet on the ground", "Feel your hands relaxing", "Take a deep breath"],
      ru: ["Закрой глаза", "Почувствуй ноги на земле", "Почувствуй как расслабляются руки", "Сделай глубокий вдох"]
    },
  },
  {
    title: { en: "Happy Place", ru: "Счастливое место" },
    instruction: { en: "Think of a place that makes you happy", ru: "Подумай о месте, где тебе хорошо" },
    icon: "🏖️",
    steps: {
      en: ["Close your eyes", "Imagine your favorite place", "What do you see there?", "How does it feel?"],
      ru: ["Закрой глаза", "Представь своё любимое место", "Что ты там видишь?", "Как ты себя чувствуешь?"]
    },
  },
];

const emotionCardsTasks = [
  {
    scenario: { en: "Your friend shared their toy with you", ru: "Друг поделился с тобой игрушкой" },
    question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" },
    options: ["😊", "😢", "😠", "😨"],
    answer: "😊",
    explanation: { en: "Happy! It feels nice when friends share", ru: "Счастливый! Приятно когда друзья делятся" },
  },
  {
    scenario: { en: "You lost your favorite toy", ru: "Ты потерял любимую игрушку" },
    question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" },
    options: ["😊", "😢", "😠", "😴"],
    answer: "😢",
    explanation: { en: "Sad. It's okay to feel sad when we lose something", ru: "Грустный. Нормально грустить когда что-то теряешь" },
  },
  {
    scenario: { en: "Someone took your turn in line", ru: "Кто-то занял твою очередь" },
    question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" },
    options: ["😊", "😢", "😠", "😨"],
    answer: "😠",
    explanation: { en: "Angry. It's normal to feel upset, but we can talk about it calmly", ru: "Злой. Нормально расстроиться, но можно поговорить спокойно" },
  },
];

const EmotionsTask = ({ activityIndex, onComplete }: EmotionsTaskProps) => {
  const { language } = useLanguage();
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [calmingStep, setCalmingStep] = useState(0);
  const [calmingComplete, setCalmingComplete] = useState(false);

  const t = {
    howFeel: { en: "How Do They Feel?", ru: "Что они чувствуют?" },
    whatEmotion: { en: "What emotion is this?", ru: "Какая это эмоция?" },
    calmCorner: { en: "Calm Corner", ru: "Уголок спокойствия" },
    chooseActivity: { en: "Choose a calming activity", ru: "Выбери упражнение для успокоения" },
    emotionCards: { en: "Emotion Cards", ru: "Карточки эмоций" },
    correct: { en: "Correct! 🎉", ru: "Правильно! 🎉" },
    tryAgain: { en: "Try again!", ru: "Попробуй ещё!" },
    next: { en: "Next", ru: "Дальше" },
    restart: { en: "Play Again", ru: "Играть снова" },
    completed: { en: "Great job!", ru: "Отлично!" },
    score: { en: "Score", ru: "Счёт" },
    start: { en: "Start", ru: "Начать" },
    nextStep: { en: "Next Step", ru: "Следующий шаг" },
    done: { en: "I feel calmer!", ru: "Мне стало спокойнее!" },
    tryAnother: { en: "Try Another", ru: "Попробовать другое" },
    wellDone: { en: "Well done! You practiced calming down", ru: "Молодец! Ты потренировался успокаиваться" },
  };

  const handleSelect = (value: string) => {
    if (showResult) return;
    setSelected(value);
    setShowResult(true);

    let isCorrect = false;
    if (activityIndex === 0) {
      isCorrect = value === feelingsTasks[currentTask].emotion[language];
    } else if (activityIndex === 2) {
      isCorrect = value === emotionCardsTasks[currentTask].answer;
    }

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const tasks = activityIndex === 0 ? feelingsTasks : emotionCardsTasks;
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      onComplete(score >= Math.floor(tasks.length / 2));
    }
  };

  const handleRestart = () => {
    setCurrentTask(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  const handleCalmingNext = () => {
    const activity = calmingActivities[currentTask];
    if (calmingStep < activity.steps[language].length - 1) {
      setCalmingStep(calmingStep + 1);
    } else {
      setCalmingComplete(true);
    }
  };

  const handleCalmingRestart = () => {
    setCalmingStep(0);
    setCalmingComplete(false);
  };

  const selectCalmingActivity = (index: number) => {
    setCurrentTask(index);
    setCalmingStep(0);
    setCalmingComplete(false);
  };

  if (completed && activityIndex !== 1) {
    const tasks = activityIndex === 0 ? feelingsTasks : emotionCardsTasks;
    return (
      <Card className="bg-gradient-to-br from-warm-light to-calm-light border-warm/20">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: score }).map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{t.completed[language]}</h3>
          <p className="text-lg text-muted-foreground mb-6">
            {t.score[language]}: {score}/{tasks.length}
          </p>
          <Button onClick={handleRestart} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            {t.restart[language]}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // How Do They Feel Task
  if (activityIndex === 0) {
    const task = feelingsTasks[currentTask];
    return (
      <Card className="bg-card border-warm/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.howFeel[language]}</h3>
            <p className="text-sm text-muted-foreground">{t.whatEmotion[language]}</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-warm-light rounded-2xl flex items-center justify-center">
              <span className="text-8xl">{task.face}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {task.options[language].map((option) => (
              <Button
                key={option}
                variant={selected === option ? (option === task.emotion[language] ? "default" : "destructive") : "outline"}
                className={`h-14 text-lg transition-all ${
                  showResult && option === task.emotion[language] ? "ring-2 ring-green-500 bg-green-100" : ""
                }`}
                onClick={() => handleSelect(option)}
                disabled={showResult}
              >
                {option}
              </Button>
            ))}
          </div>

          {showResult && (
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${selected === task.emotion[language] ? "text-green-600" : "text-destructive"}`}>
                {selected === task.emotion[language] ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {selected === task.emotion[language] ? t.correct[language] : t.tryAgain[language]}
                </span>
              </div>
              <Button onClick={handleNext}>{t.next[language]}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Calm Corner - Interactive calming activities
  if (activityIndex === 1) {
    if (calmingComplete) {
      return (
        <Card className="bg-gradient-to-br from-calm-light to-warm-light border-calm/20">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-green-600 fill-green-200" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{t.wellDone[language]}</h3>
            <div className="flex gap-3 justify-center mt-6">
              <Button variant="outline" onClick={handleCalmingRestart}>
                {t.restart[language]}
              </Button>
              <Button onClick={() => selectCalmingActivity((currentTask + 1) % calmingActivities.length)}>
                {t.tryAnother[language]}
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    const activity = calmingActivities[currentTask];
    const currentStepText = activity.steps[language][calmingStep];

    return (
      <Card className="bg-card border-calm/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.calmCorner[language]}</h3>
          </div>

          {/* Activity selection */}
          <div className="flex justify-center gap-3 mb-6">
            {calmingActivities.map((act, i) => (
              <Button
                key={i}
                variant={currentTask === i ? "default" : "outline"}
                className="flex-col h-auto py-3 px-4"
                onClick={() => selectCalmingActivity(i)}
              >
                <span className="text-2xl mb-1">{act.icon}</span>
                <span className="text-xs">{act.title[language]}</span>
              </Button>
            ))}
          </div>

          {/* Current activity */}
          <div className="bg-calm-light rounded-2xl p-6 mb-6">
            <div className="text-center">
              <span className="text-6xl block mb-4">{activity.icon}</span>
              <h4 className="text-xl font-bold text-foreground mb-2">{activity.title[language]}</h4>
              <p className="text-lg text-foreground animate-pulse">{currentStepText}</p>
              <div className="flex justify-center gap-2 mt-4">
                {activity.steps[language].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${i <= calmingStep ? "bg-calm" : "bg-muted"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleCalmingNext} className="w-full">
            {calmingStep < activity.steps[language].length - 1 ? t.nextStep[language] : t.done[language]}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Emotion Cards Task
  const task = emotionCardsTasks[currentTask];
  return (
    <Card className="bg-card border-warm/20">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">{t.emotionCards[language]}</h3>
        </div>

        <div className="bg-warm-light rounded-2xl p-4 mb-6">
          <p className="text-lg text-center text-foreground">{task.scenario[language]}</p>
        </div>

        <p className="text-center font-medium text-foreground mb-4">{task.question[language]}</p>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {task.options.map((emoji) => (
            <Button
              key={emoji}
              variant={selected === emoji ? (emoji === task.answer ? "default" : "destructive") : "outline"}
              className={`h-16 text-3xl transition-all ${
                showResult && emoji === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""
              }`}
              onClick={() => handleSelect(emoji)}
              disabled={showResult}
            >
              {emoji}
            </Button>
          ))}
        </div>

        {showResult && (
          <div className="space-y-4">
            <div className="bg-muted rounded-xl p-3 text-center">
              <p className="text-sm text-foreground">{task.explanation[language]}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${selected === task.answer ? "text-green-600" : "text-destructive"}`}>
                {selected === task.answer ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {selected === task.answer ? t.correct[language] : t.tryAgain[language]}
                </span>
              </div>
              <Button onClick={handleNext}>{t.next[language]}</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionsTask;
