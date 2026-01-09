import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Star } from "lucide-react";

interface MathTaskProps {
  activityIndex: number;
  onComplete: (correct: boolean) => void;
}

const countingTasks = [
  { items: ["⭐", "⭐", "⭐"], answer: 3 },
  { items: ["🍎", "🍎", "🍎", "🍎", "🍎"], answer: 5 },
  { items: ["🌸", "🌸"], answer: 2 },
  { items: ["🦋", "🦋", "🦋", "🦋"], answer: 4 },
  { items: ["🌈"], answer: 1 },
  { items: ["🐶", "🐶", "🐶", "🐶", "🐶", "🐶"], answer: 6 },
  { items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], answer: 7 },
  { items: ["🐱", "🐱", "🐱", "🐱", "🐱", "🐱", "🐱", "🐱"], answer: 8 },
  { items: ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"], answer: 9 },
  { items: ["🌟", "🌟", "🌟", "🌟", "🌟", "🌟", "🌟", "🌟", "🌟", "🌟"], answer: 10 },
  { items: ["🚗"], answer: 1 },
  { items: ["🎁", "🎁", "🎁"], answer: 3 },
  { items: ["🍭", "🍭", "🍭", "🍭", "🍭", "🍭"], answer: 6 },
  { items: ["🎵", "🎵", "🎵", "🎵"], answer: 4 },
  { items: ["🌻", "🌻", "🌻", "🌻", "🌻", "🌻", "🌻", "🌻"], answer: 8 },
];

const shapeTasks = [
  { shape: "🔵", shapeName: { en: "Circle", ru: "Круг" }, options: ["🔵", "🔷", "🔺", "⬛"], answer: "🔵" },
  { shape: "🔷", shapeName: { en: "Diamond", ru: "Ромб" }, options: ["🔵", "🔷", "🔺", "⬛"], answer: "🔷" },
  { shape: "🔺", shapeName: { en: "Triangle", ru: "Треугольник" }, options: ["🔵", "🔷", "🔺", "⬛"], answer: "🔺" },
  { shape: "⬛", shapeName: { en: "Square", ru: "Квадрат" }, options: ["🔵", "🔷", "🔺", "⬛"], answer: "⬛" },
  { shape: "⬜", shapeName: { en: "White Square", ru: "Белый квадрат" }, options: ["⬜", "🔷", "🔺", "🔵"], answer: "⬜" },
  { shape: "🟢", shapeName: { en: "Green Circle", ru: "Зелёный круг" }, options: ["🔵", "🟢", "🟡", "🔴"], answer: "🟢" },
  { shape: "🟡", shapeName: { en: "Yellow Circle", ru: "Жёлтый круг" }, options: ["🔵", "🟢", "🟡", "🔴"], answer: "🟡" },
  { shape: "🔴", shapeName: { en: "Red Circle", ru: "Красный круг" }, options: ["🔵", "🟢", "🟡", "🔴"], answer: "🔴" },
  { shape: "🟣", shapeName: { en: "Purple Circle", ru: "Фиолетовый круг" }, options: ["🟣", "🟢", "🟡", "🔴"], answer: "🟣" },
  { shape: "🟠", shapeName: { en: "Orange Circle", ru: "Оранжевый круг" }, options: ["🟠", "🟢", "🟡", "🔴"], answer: "🟠" },
  { shape: "⭐", shapeName: { en: "Star", ru: "Звезда" }, options: ["⭐", "🔷", "🔺", "⬛"], answer: "⭐" },
  { shape: "❤️", shapeName: { en: "Heart", ru: "Сердце" }, options: ["❤️", "⭐", "🔺", "🔵"], answer: "❤️" },
  { shape: "🌙", shapeName: { en: "Moon", ru: "Луна" }, options: ["🌙", "⭐", "☀️", "🔵"], answer: "🌙" },
  { shape: "☀️", shapeName: { en: "Sun", ru: "Солнце" }, options: ["🌙", "⭐", "☀️", "🔵"], answer: "☀️" },
  { shape: "💎", shapeName: { en: "Gem", ru: "Драгоценный камень" }, options: ["💎", "🔷", "🔺", "⬛"], answer: "💎" },
];

const numberTasks = [
  { target: 3, options: [1, 2, 3, 4] },
  { target: 5, options: [3, 4, 5, 6] },
  { target: 7, options: [5, 6, 7, 8] },
  { target: 2, options: [1, 2, 3, 4] },
  { target: 1, options: [1, 2, 3, 4] },
  { target: 8, options: [6, 7, 8, 9] },
  { target: 4, options: [2, 3, 4, 5] },
  { target: 6, options: [4, 5, 6, 7] },
  { target: 9, options: [7, 8, 9, 10] },
  { target: 10, options: [8, 9, 10, 11] },
  { target: 0, options: [0, 1, 2, 3] },
  { target: 11, options: [9, 10, 11, 12] },
  { target: 12, options: [10, 11, 12, 13] },
  { target: 15, options: [13, 14, 15, 16] },
  { target: 20, options: [18, 19, 20, 21] },
];

const MathTask = ({ activityIndex, onComplete }: MathTaskProps) => {
  const { language } = useLanguage();
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const t = {
    countStars: { en: "Count the Stars", ru: "Посчитай звёзды" },
    howMany: { en: "How many items do you see?", ru: "Сколько предметов ты видишь?" },
    shapeMatch: { en: "Find the Shape", ru: "Найди фигуру" },
    findShape: { en: "Find the", ru: "Найди" },
    numberHunt: { en: "Find the Number", ru: "Найди число" },
    findNumber: { en: "Find number", ru: "Найди число" },
    correct: { en: "Correct! 🎉", ru: "Правильно! 🎉" },
    tryAgain: { en: "Try again!", ru: "Попробуй ещё!" },
    next: { en: "Next", ru: "Дальше" },
    restart: { en: "Play Again", ru: "Играть снова" },
    completed: { en: "Great job!", ru: "Отлично!" },
    score: { en: "Score", ru: "Счёт" },
  };

  const handleSelect = (value: number | string) => {
    if (showResult) return;
    setSelected(value);
    setShowResult(true);

    let isCorrect = false;
    if (activityIndex === 0) {
      isCorrect = value === countingTasks[currentTask].answer;
    } else if (activityIndex === 1) {
      isCorrect = value === shapeTasks[currentTask].answer;
    } else {
      isCorrect = value === numberTasks[currentTask].target;
    }

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const tasks = activityIndex === 0 ? countingTasks : activityIndex === 1 ? shapeTasks : numberTasks;
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

  if (completed) {
    const tasks = activityIndex === 0 ? countingTasks : activityIndex === 1 ? shapeTasks : numberTasks;
    return (
      <Card className="bg-gradient-to-br from-primary-light to-secondary-light border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: Math.min(score, 10) }).map((_, i) => (
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

  // Counting Task
  if (activityIndex === 0) {
    const task = countingTasks[currentTask];
    const maxAnswer = Math.max(task.answer + 2, 5);
    const minAnswer = Math.max(1, task.answer - 2);
    const answerOptions = Array.from({ length: maxAnswer - minAnswer + 1 }, (_, i) => minAnswer + i);
    
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.countStars[language]}</h3>
            <p className="text-sm text-muted-foreground">{t.howMany[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {countingTasks.length}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8 py-6 bg-primary-light/50 rounded-2xl">
            {task.items.map((item, i) => (
              <span key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {item}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-3 mb-6">
            {answerOptions.map((num) => (
              <Button
                key={num}
                variant={selected === num ? (num === task.answer ? "default" : "destructive") : "outline"}
                className={`h-14 text-xl font-bold transition-all ${
                  showResult && num === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""
                }`}
                onClick={() => handleSelect(num)}
                disabled={showResult}
              >
                {num}
              </Button>
            ))}
          </div>

          {showResult && (
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
          )}
        </CardContent>
      </Card>
    );
  }

  // Shape Match Task
  if (activityIndex === 1) {
    const task = shapeTasks[currentTask];
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.shapeMatch[language]}</h3>
            <p className="text-sm text-muted-foreground">
              {t.findShape[language]} <span className="font-bold">{task.shapeName[language]}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {shapeTasks.length}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {task.options.map((shape) => (
              <Button
                key={shape}
                variant={selected === shape ? (shape === task.answer ? "default" : "destructive") : "outline"}
                className={`h-24 text-5xl transition-all ${
                  showResult && shape === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""
                }`}
                onClick={() => handleSelect(shape)}
                disabled={showResult}
              >
                {shape}
              </Button>
            ))}
          </div>

          {showResult && (
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
          )}
        </CardContent>
      </Card>
    );
  }

  // Number Hunt Task
  const task = numberTasks[currentTask];
  return (
    <Card className="bg-card border-primary/20">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">{t.numberHunt[language]}</h3>
          <p className="text-sm text-muted-foreground">
            {t.findNumber[language]} <span className="font-bold text-2xl text-primary">{task.target}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {numberTasks.length}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {task.options.map((num) => (
            <Button
              key={num}
              variant={selected === num ? (num === task.target ? "default" : "destructive") : "outline"}
              className={`h-20 text-3xl font-bold transition-all ${
                showResult && num === task.target ? "ring-2 ring-green-500 bg-green-100" : ""
              }`}
              onClick={() => handleSelect(num)}
              disabled={showResult}
            >
              {num}
            </Button>
          ))}
        </div>

        {showResult && (
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${selected === task.target ? "text-green-600" : "text-destructive"}`}>
              {selected === task.target ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-medium">
                {selected === task.target ? t.correct[language] : t.tryAgain[language]}
              </span>
            </div>
            <Button onClick={handleNext}>{t.next[language]}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MathTask;
