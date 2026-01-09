import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Star } from "lucide-react";

interface LogicTaskProps {
  activityIndex: number;
  onComplete: (correct: boolean) => void;
}

const patternTasks = [
  { pattern: ["🔴", "🔵", "🔴", "🔵", "?"], options: ["🔴", "🔵", "🟢", "🟡"], answer: "🔴" },
  { pattern: ["⭐", "⭐", "🌙", "⭐", "⭐", "?"], options: ["⭐", "🌙", "☀️", "🌈"], answer: "🌙" },
  { pattern: ["🍎", "🍌", "🍎", "🍌", "?"], options: ["🍇", "🍎", "🍌", "🍊"], answer: "🍎" },
  { pattern: ["🔺", "🔺", "⬛", "🔺", "🔺", "?"], options: ["🔺", "⬛", "🔵", "🔷"], answer: "⬛" },
  { pattern: ["🐱", "🐶", "🐱", "🐶", "?"], options: ["🐱", "🐶", "🐟", "🐦"], answer: "🐱" },
  { pattern: ["🟢", "🟢", "🟡", "🟢", "🟢", "?"], options: ["🟢", "🟡", "🔴", "🔵"], answer: "🟡" },
  { pattern: ["🌸", "🌻", "🌸", "🌻", "?"], options: ["🌸", "🌻", "🌹", "🌺"], answer: "🌸" },
  { pattern: ["1️⃣", "2️⃣", "1️⃣", "2️⃣", "?"], options: ["1️⃣", "2️⃣", "3️⃣", "4️⃣"], answer: "1️⃣" },
  { pattern: ["🔵", "🔵", "🔴", "🔵", "🔵", "?"], options: ["🔵", "🔴", "🟢", "🟡"], answer: "🔴" },
  { pattern: ["🚗", "🚌", "🚗", "🚌", "?"], options: ["🚗", "🚌", "✈️", "🚂"], answer: "🚗" },
  { pattern: ["⬜", "⬛", "⬜", "⬛", "?"], options: ["⬜", "⬛", "🔲", "🔳"], answer: "⬜" },
  { pattern: ["🌈", "☀️", "🌈", "☀️", "?"], options: ["🌈", "☀️", "🌙", "⭐"], answer: "🌈" },
  { pattern: ["🎈", "🎈", "🎁", "🎈", "🎈", "?"], options: ["🎈", "🎁", "🎂", "🎉"], answer: "🎁" },
  { pattern: ["🦋", "🐛", "🦋", "🐛", "?"], options: ["🦋", "🐛", "🐜", "🐝"], answer: "🦋" },
  { pattern: ["❤️", "💛", "❤️", "💛", "?"], options: ["❤️", "💛", "💚", "💙"], answer: "❤️" },
];

const sortingTasks = [
  {
    title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" },
    items: ["🐘", "🐱", "🐭"],
    correctOrder: ["🐭", "🐱", "🐘"],
  },
  {
    title: { en: "Sort by color: Light to Dark", ru: "Сортировка по цвету: от светлого к тёмному" },
    items: ["⬛", "⬜", "🔲"],
    correctOrder: ["⬜", "🔲", "⬛"],
  },
  {
    title: { en: "Sort by speed: Slow to Fast", ru: "Сортировка по скорости: от медленного к быстрому" },
    items: ["🚀", "🐌", "🚗"],
    correctOrder: ["🐌", "🚗", "🚀"],
  },
  {
    title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" },
    items: ["🏠", "🏰", "🏚️"],
    correctOrder: ["🏚️", "🏠", "🏰"],
  },
  {
    title: { en: "Sort by age: Young to Old", ru: "Сортировка по возрасту: от молодого к старому" },
    items: ["👴", "👶", "👦"],
    correctOrder: ["👶", "👦", "👴"],
  },
  {
    title: { en: "Sort by temperature: Cold to Hot", ru: "Сортировка по температуре: от холодного к горячему" },
    items: ["☀️", "❄️", "🌤️"],
    correctOrder: ["❄️", "🌤️", "☀️"],
  },
  {
    title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" },
    items: ["🐋", "🐟", "🦐"],
    correctOrder: ["🦐", "🐟", "🐋"],
  },
  {
    title: { en: "Sort by time: Morning to Night", ru: "Сортировка по времени: от утра к ночи" },
    items: ["🌙", "🌅", "☀️"],
    correctOrder: ["🌅", "☀️", "🌙"],
  },
  {
    title: { en: "Sort by height: Short to Tall", ru: "Сортировка по высоте: от низкого к высокому" },
    items: ["🌲", "🌱", "🌿"],
    correctOrder: ["🌱", "🌿", "🌲"],
  },
  {
    title: { en: "Sort by weight: Light to Heavy", ru: "Сортировка по весу: от лёгкого к тяжёлому" },
    items: ["🪨", "🪶", "📦"],
    correctOrder: ["🪶", "📦", "🪨"],
  },
  {
    title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" },
    items: ["🍇", "🍉", "🍓"],
    correctOrder: ["🍓", "🍇", "🍉"],
  },
  {
    title: { en: "Sort by loudness: Quiet to Loud", ru: "Сортировка по громкости: от тихого к громкому" },
    items: ["📢", "🔔", "🔇"],
    correctOrder: ["🔇", "🔔", "📢"],
  },
  {
    title: { en: "Sort by sweetness: Less to More", ru: "Сортировка по сладости: от менее к более" },
    items: ["🍬", "🥒", "🍎"],
    correctOrder: ["🥒", "🍎", "🍬"],
  },
  {
    title: { en: "Sort by distance: Near to Far", ru: "Сортировка по расстоянию: от ближнего к дальнему" },
    items: ["🌍", "🏠", "🌙"],
    correctOrder: ["🏠", "🌍", "🌙"],
  },
  {
    title: { en: "Sort by age: New to Old", ru: "Сортировка по возрасту: от нового к старому" },
    items: ["🏛️", "🏗️", "🏠"],
    correctOrder: ["🏗️", "🏠", "🏛️"],
  },
];

const sequenceTasks = [
  { 
    sequence: ["🥚", "🐣", "🐥", "?"], 
    question: { en: "What comes next?", ru: "Что дальше?" },
    options: ["🐔", "🥚", "🐣", "🦆"], 
    answer: "🐔" 
  },
  { 
    sequence: ["🌱", "🌿", "🌳", "?"], 
    question: { en: "What comes next?", ru: "Что дальше?" },
    options: ["🌱", "🍎", "🌸", "🍂"], 
    answer: "🍂" 
  },
  { 
    sequence: ["☀️", "🌅", "🌙", "?"], 
    question: { en: "What comes next?", ru: "Что дальше?" },
    options: ["⭐", "☀️", "🌧️", "🌈"], 
    answer: "⭐" 
  },
  { 
    sequence: ["🐛", "🐚", "🦋", "?"], 
    question: { en: "What comes after the butterfly?", ru: "Что после бабочки?" },
    options: ["🐛", "🥚", "🌸", "💀"], 
    answer: "🌸" 
  },
  { 
    sequence: ["❄️", "🌸", "☀️", "?"], 
    question: { en: "What season comes next?", ru: "Какое время года следующее?" },
    options: ["🍂", "❄️", "🌸", "☀️"], 
    answer: "🍂" 
  },
  { 
    sequence: ["👶", "👦", "👨", "?"], 
    question: { en: "What comes next?", ru: "Что дальше?" },
    options: ["👴", "👶", "👦", "🧒"], 
    answer: "👴" 
  },
  { 
    sequence: ["🌑", "🌓", "🌕", "?"], 
    question: { en: "Moon phase: What comes next?", ru: "Фаза луны: Что дальше?" },
    options: ["🌗", "🌑", "🌓", "☀️"], 
    answer: "🌗" 
  },
  { 
    sequence: ["1️⃣", "2️⃣", "3️⃣", "?"], 
    question: { en: "What number comes next?", ru: "Какое число следующее?" },
    options: ["4️⃣", "1️⃣", "5️⃣", "0️⃣"], 
    answer: "4️⃣" 
  },
  { 
    sequence: ["🚶", "🏃", "🚴", "?"], 
    question: { en: "What comes next (faster)?", ru: "Что дальше (быстрее)?" },
    options: ["🚗", "🚶", "🐌", "🦥"], 
    answer: "🚗" 
  },
  { 
    sequence: ["📕", "📗", "📘", "?"], 
    question: { en: "What color book comes next?", ru: "Какого цвета книга следующая?" },
    options: ["📙", "📕", "📗", "📓"], 
    answer: "📙" 
  },
  { 
    sequence: ["🌧️", "🌈", "☀️", "?"], 
    question: { en: "Weather sequence: What next?", ru: "Последовательность погоды: Что дальше?" },
    options: ["🌤️", "🌧️", "⛈️", "❄️"], 
    answer: "🌤️" 
  },
  { 
    sequence: ["🥛", "🧀", "🐄", "?"], 
    question: { en: "Reverse process: What started it?", ru: "Обратный процесс: Что началo?" },
    options: ["🌾", "🥛", "🧈", "🍦"], 
    answer: "🌾" 
  },
  { 
    sequence: ["🍞", "🥪", "😋", "?"], 
    question: { en: "What happens after eating?", ru: "Что происходит после еды?" },
    options: ["😴", "🍞", "🥪", "😢"], 
    answer: "😴" 
  },
  { 
    sequence: ["🧵", "👕", "👔", "?"], 
    question: { en: "Clothing evolution: What next?", ru: "Эволюция одежды: Что дальше?" },
    options: ["🎩", "🧵", "👗", "🩳"], 
    answer: "🎩" 
  },
  { 
    sequence: ["🌍", "🚀", "🌙", "?"], 
    question: { en: "Space journey: What comes next?", ru: "Космическое путешествие: Что дальше?" },
    options: ["⭐", "🌍", "🌞", "🛸"], 
    answer: "⭐" 
  },
];

const LogicTask = ({ activityIndex, onComplete }: LogicTaskProps) => {
  const { language } = useLanguage();
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const t = {
    findPattern: { en: "Find the Pattern", ru: "Найди паттерн" },
    whatNext: { en: "What comes next in the pattern?", ru: "Что дальше в паттерне?" },
    sortIt: { en: "Sort It Out", ru: "Рассортируй" },
    tapToSort: { en: "Tap items in order", ru: "Нажимай по порядку" },
    sequence: { en: "What Comes Next?", ru: "Что дальше?" },
    correct: { en: "Correct! 🎉", ru: "Правильно! 🎉" },
    tryAgain: { en: "Try again!", ru: "Попробуй ещё!" },
    next: { en: "Next", ru: "Дальше" },
    restart: { en: "Play Again", ru: "Играть снова" },
    completed: { en: "Great job!", ru: "Отлично!" },
    score: { en: "Score", ru: "Счёт" },
    reset: { en: "Reset", ru: "Сброс" },
    check: { en: "Check", ru: "Проверить" },
  };

  const handleSelect = (value: string) => {
    if (showResult) return;
    setSelected(value);
    setShowResult(true);

    let isCorrect = false;
    if (activityIndex === 0) {
      isCorrect = value === patternTasks[currentTask].answer;
    } else if (activityIndex === 2) {
      isCorrect = value === sequenceTasks[currentTask].answer;
    }

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleSortSelect = (item: string) => {
    if (showResult || sortOrder.includes(item)) return;
    setSortOrder([...sortOrder, item]);
  };

  const handleCheckSort = () => {
    const task = sortingTasks[currentTask];
    const isCorrect = JSON.stringify(sortOrder) === JSON.stringify(task.correctOrder);
    setShowResult(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleResetSort = () => {
    setSortOrder([]);
  };

  const handleNext = () => {
    const tasks = activityIndex === 0 ? patternTasks : activityIndex === 1 ? sortingTasks : sequenceTasks;
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelected(null);
      setSortOrder([]);
      setShowResult(false);
    } else {
      setCompleted(true);
      onComplete(score >= Math.floor(tasks.length / 2));
    }
  };

  const handleRestart = () => {
    setCurrentTask(0);
    setSelected(null);
    setSortOrder([]);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const tasks = activityIndex === 0 ? patternTasks : activityIndex === 1 ? sortingTasks : sequenceTasks;
    return (
      <Card className="bg-gradient-to-br from-accent-light to-primary-light border-accent/20">
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

  // Pattern Task
  if (activityIndex === 0) {
    const task = patternTasks[currentTask];
    return (
      <Card className="bg-card border-accent/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.findPattern[language]}</h3>
            <p className="text-sm text-muted-foreground">{t.whatNext[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {patternTasks.length}</p>
          </div>

          <div className="flex justify-center gap-3 mb-8 py-4 bg-accent-light/50 rounded-2xl flex-wrap">
            {task.pattern.map((item, i) => (
              <span key={i} className={`text-4xl ${item === "?" ? "animate-pulse text-muted-foreground" : ""}`}>
                {item}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {task.options.map((option) => (
              <Button
                key={option}
                variant={selected === option ? (option === task.answer ? "default" : "destructive") : "outline"}
                className={`h-16 text-3xl transition-all ${
                  showResult && option === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""
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

  // Sorting Task
  if (activityIndex === 1) {
    const task = sortingTasks[currentTask];
    const availableItems = task.items.filter(item => !sortOrder.includes(item));
    const isCorrect = JSON.stringify(sortOrder) === JSON.stringify(task.correctOrder);

    return (
      <Card className="bg-card border-accent/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.sortIt[language]}</h3>
            <p className="text-sm text-muted-foreground">{task.title[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {sortingTasks.length}</p>
          </div>

          {/* Selected order display */}
          <div className="flex justify-center gap-4 mb-6 py-4 bg-accent-light/50 rounded-2xl min-h-[80px]">
            {sortOrder.length === 0 ? (
              <span className="text-muted-foreground">{t.tapToSort[language]}</span>
            ) : (
              sortOrder.map((item, i) => (
                <span key={i} className="text-5xl">{item}</span>
              ))
            )}
          </div>

          {/* Available items */}
          <div className="flex justify-center gap-4 mb-6">
            {availableItems.map((item) => (
              <Button
                key={item}
                variant="outline"
                className="h-20 w-20 text-4xl"
                onClick={() => handleSortSelect(item)}
                disabled={showResult}
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              variant="outline"
              onClick={handleResetSort}
              disabled={showResult || sortOrder.length === 0}
              className="flex-1"
            >
              {t.reset[language]}
            </Button>
            <Button
              onClick={handleCheckSort}
              disabled={showResult || sortOrder.length !== task.items.length}
              className="flex-1"
            >
              {t.check[language]}
            </Button>
          </div>

          {showResult && (
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${isCorrect ? "text-green-600" : "text-destructive"}`}>
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {isCorrect ? t.correct[language] : t.tryAgain[language]}
                </span>
              </div>
              <Button onClick={handleNext}>{t.next[language]}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Sequence Task
  const task = sequenceTasks[currentTask];
  return (
    <Card className="bg-card border-accent/20">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">{t.sequence[language]}</h3>
          <p className="text-sm text-muted-foreground">{task.question[language]}</p>
          <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {sequenceTasks.length}</p>
        </div>

        <div className="flex justify-center gap-4 mb-8 py-4 bg-accent-light/50 rounded-2xl flex-wrap">
          {task.sequence.map((item, i) => (
            <span key={i} className={`text-4xl ${item === "?" ? "animate-pulse text-muted-foreground" : ""}`}>
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {task.options.map((option) => (
            <Button
              key={option}
              variant={selected === option ? (option === task.answer ? "default" : "destructive") : "outline"}
              className={`h-16 text-3xl transition-all ${
                showResult && option === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""
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
};

export default LogicTask;
