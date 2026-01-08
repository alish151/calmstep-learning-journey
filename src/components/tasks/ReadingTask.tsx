import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Star, Volume2 } from "lucide-react";

interface ReadingTaskProps {
  activityIndex: number;
  onComplete: (correct: boolean) => void;
}

const pictureWordTasks = [
  { image: "🍎", word: { en: "Apple", ru: "Яблоко" }, options: { en: ["Apple", "Banana", "Orange", "Grape"], ru: ["Яблоко", "Банан", "Апельсин", "Виноград"] } },
  { image: "🐱", word: { en: "Cat", ru: "Кот" }, options: { en: ["Dog", "Cat", "Bird", "Fish"], ru: ["Собака", "Кот", "Птица", "Рыба"] } },
  { image: "🌞", word: { en: "Sun", ru: "Солнце" }, options: { en: ["Moon", "Star", "Sun", "Cloud"], ru: ["Луна", "Звезда", "Солнце", "Облако"] } },
  { image: "🏠", word: { en: "House", ru: "Дом" }, options: { en: ["Tree", "House", "Car", "Flower"], ru: ["Дерево", "Дом", "Машина", "Цветок"] } },
];

const soundMatchTasks = [
  { letter: "A", sound: "/a/", options: ["🍎", "🐶", "🏠", "🌸"], answer: "🍎", hint: { en: "Apple", ru: "Яблоко" } },
  { letter: "B", sound: "/b/", options: ["🍌", "🐱", "🌈", "⭐"], answer: "🍌", hint: { en: "Banana", ru: "Банан" } },
  { letter: "C", sound: "/k/", options: ["🐱", "🦋", "🌸", "🍎"], answer: "🐱", hint: { en: "Cat", ru: "Кот" } },
  { letter: "D", sound: "/d/", options: ["🐶", "🐱", "🦋", "🐟"], answer: "🐶", hint: { en: "Dog", ru: "Собака" } },
];

const storyTasks = [
  {
    story: { en: "The little cat sat on the mat.", ru: "Маленький кот сидел на коврике." },
    question: { en: "Where did the cat sit?", ru: "Где сидел кот?" },
    options: { en: ["On the mat", "On the bed", "On the chair", "On the floor"], ru: ["На коврике", "На кровати", "На стуле", "На полу"] },
    answer: 0,
  },
  {
    story: { en: "The sun was bright and yellow.", ru: "Солнце было ярким и жёлтым." },
    question: { en: "What color was the sun?", ru: "Какого цвета было солнце?" },
    options: { en: ["Blue", "Red", "Yellow", "Green"], ru: ["Синее", "Красное", "Жёлтое", "Зелёное"] },
    answer: 2,
  },
  {
    story: { en: "The dog ran to the park.", ru: "Собака побежала в парк." },
    question: { en: "Where did the dog go?", ru: "Куда побежала собака?" },
    options: { en: ["Home", "Park", "School", "Store"], ru: ["Домой", "В парк", "В школу", "В магазин"] },
    answer: 1,
  },
];

const ReadingTask = ({ activityIndex, onComplete }: ReadingTaskProps) => {
  const { language } = useLanguage();
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const t = {
    pictureWords: { en: "Picture Words", ru: "Картинки и слова" },
    whatIs: { en: "What is this?", ru: "Что это?" },
    soundMatch: { en: "Sound Match", ru: "Сопоставь звуки" },
    findSound: { en: "Find the picture that starts with", ru: "Найди картинку, которая начинается на" },
    storyTime: { en: "Story Time", ru: "Время сказок" },
    readStory: { en: "Read the story and answer:", ru: "Прочитай историю и ответь:" },
    correct: { en: "Correct! 🎉", ru: "Правильно! 🎉" },
    tryAgain: { en: "Try again!", ru: "Попробуй ещё!" },
    next: { en: "Next", ru: "Дальше" },
    restart: { en: "Play Again", ru: "Играть снова" },
    completed: { en: "Great job!", ru: "Отлично!" },
    score: { en: "Score", ru: "Счёт" },
    listen: { en: "Listen", ru: "Послушать" },
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "ru" ? "ru-RU" : "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleSelect = (value: number | string) => {
    if (showResult) return;
    setSelected(value);
    setShowResult(true);

    let isCorrect = false;
    if (activityIndex === 0) {
      isCorrect = value === pictureWordTasks[currentTask].word[language];
    } else if (activityIndex === 1) {
      isCorrect = value === soundMatchTasks[currentTask].answer;
    } else {
      isCorrect = value === storyTasks[currentTask].answer;
    }

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const tasks = activityIndex === 0 ? pictureWordTasks : activityIndex === 1 ? soundMatchTasks : storyTasks;
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
    const tasks = activityIndex === 0 ? pictureWordTasks : activityIndex === 1 ? soundMatchTasks : storyTasks;
    return (
      <Card className="bg-gradient-to-br from-secondary-light to-accent-light border-secondary/20">
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

  // Picture Words Task
  if (activityIndex === 0) {
    const task = pictureWordTasks[currentTask];
    return (
      <Card className="bg-card border-secondary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.pictureWords[language]}</h3>
            <p className="text-sm text-muted-foreground">{t.whatIs[language]}</p>
          </div>

          <div className="flex justify-center mb-8">
            <div 
              className="w-32 h-32 bg-secondary-light rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => speak(task.word[language])}
            >
              <span className="text-7xl">{task.image}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {task.options[language].map((option) => (
              <Button
                key={option}
                variant={selected === option ? (option === task.word[language] ? "default" : "destructive") : "outline"}
                className={`h-14 text-lg transition-all ${
                  showResult && option === task.word[language] ? "ring-2 ring-green-500 bg-green-100" : ""
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
              <div className={`flex items-center gap-2 ${selected === task.word[language] ? "text-green-600" : "text-destructive"}`}>
                {selected === task.word[language] ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {selected === task.word[language] ? t.correct[language] : t.tryAgain[language]}
                </span>
              </div>
              <Button onClick={handleNext}>{t.next[language]}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Sound Match Task
  if (activityIndex === 1) {
    const task = soundMatchTasks[currentTask];
    return (
      <Card className="bg-card border-secondary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.soundMatch[language]}</h3>
            <p className="text-sm text-muted-foreground">{t.findSound[language]}</p>
          </div>

          <div className="flex justify-center mb-8 gap-4 items-center">
            <div className="w-20 h-20 bg-secondary-light rounded-2xl flex items-center justify-center">
              <span className="text-4xl font-bold text-secondary">{task.letter}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-secondary-light"
              onClick={() => speak(task.hint[language])}
            >
              <Volume2 className="w-6 h-6 text-secondary" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {task.options.map((emoji) => (
              <Button
                key={emoji}
                variant={selected === emoji ? (emoji === task.answer ? "default" : "destructive") : "outline"}
                className={`h-20 text-4xl transition-all ${
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

  // Story Time Task
  const task = storyTasks[currentTask];
  return (
    <Card className="bg-card border-secondary/20">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">{t.storyTime[language]}</h3>
          <p className="text-sm text-muted-foreground">{t.readStory[language]}</p>
        </div>

        <div 
          className="p-4 bg-secondary-light rounded-2xl mb-6 cursor-pointer hover:bg-secondary-light/80 transition-colors"
          onClick={() => speak(task.story[language])}
        >
          <p className="text-lg text-center text-foreground leading-relaxed flex items-center justify-center gap-2">
            <Volume2 className="w-5 h-5 text-secondary flex-shrink-0" />
            {task.story[language]}
          </p>
        </div>

        <p className="text-center font-medium text-foreground mb-4">{task.question[language]}</p>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {task.options[language].map((option, index) => (
            <Button
              key={index}
              variant={selected === index ? (index === task.answer ? "default" : "destructive") : "outline"}
              className={`h-12 text-left justify-start px-4 transition-all ${
                showResult && index === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""
              }`}
              onClick={() => handleSelect(index)}
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

export default ReadingTask;
