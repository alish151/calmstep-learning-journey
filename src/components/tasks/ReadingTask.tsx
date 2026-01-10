import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Star, Volume2 } from "lucide-react";
import { DifficultyLevel, readingPictureWordTasks, readingSoundMatchTasks, readingStoryTasks, readingRhymingTasks, difficultyLabels } from "@/data/taskData";
import DifficultySelector from "@/components/DifficultySelector";

interface ReadingTaskProps {
  activityIndex: number;
  onComplete: (correct: boolean) => void;
}

const ReadingTask = ({ activityIndex, onComplete }: ReadingTaskProps) => {
  const { language } = useLanguage();
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const t = {
    pictureWords: { en: "Picture Words", ru: "Картинки и слова" },
    whatIs: { en: "What is this?", ru: "Что это?" },
    soundMatch: { en: "Sound Match", ru: "Сопоставь звуки" },
    findSound: { en: "Find the picture that starts with", ru: "Найди картинку на букву" },
    storyTime: { en: "Story Time", ru: "Время сказок" },
    rhyming: { en: "Rhyming Words", ru: "Рифмы" },
    findRhyme: { en: "Find a word that rhymes with", ru: "Найди слово, рифмующееся с" },
    correct: { en: "Correct! 🎉", ru: "Правильно! 🎉" },
    tryAgain: { en: "Try again!", ru: "Попробуй ещё!" },
    next: { en: "Next", ru: "Дальше" },
    restart: { en: "Play Again", ru: "Играть снова" },
    completed: { en: "Great job!", ru: "Отлично!" },
    score: { en: "Score", ru: "Счёт" },
    changeDifficulty: { en: "Change Difficulty", ru: "Изменить сложность" },
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "ru" ? "ru-RU" : "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const getTasks = () => {
    if (!difficulty) return [];
    switch (activityIndex) {
      case 0: return readingPictureWordTasks[difficulty];
      case 1: return readingSoundMatchTasks[difficulty];
      case 2: return readingStoryTasks[difficulty];
      case 3: return readingRhymingTasks[difficulty];
      default: return readingPictureWordTasks[difficulty];
    }
  };

  const tasks = getTasks();

  const handleSelect = (value: number | string) => {
    if (showResult) return;
    setSelected(value);
    setShowResult(true);

    let isCorrect = false;
    const task = tasks[currentTask];
    
    if (activityIndex === 0) {
      isCorrect = value === (task as typeof readingPictureWordTasks.easy[0]).word[language];
    } else if (activityIndex === 1) {
      isCorrect = value === (task as typeof readingSoundMatchTasks.easy[0]).answer;
    } else if (activityIndex === 2) {
      isCorrect = value === (task as typeof readingStoryTasks.easy[0]).answer;
    } else if (activityIndex === 3) {
      isCorrect = value === (task as typeof readingRhymingTasks.easy[0]).answer;
    }

    if (isCorrect) setScore(score + 1);
  };

  const handleNext = () => {
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

  if (!difficulty) {
    return (
      <Card className="bg-card border-secondary/20">
        <CardContent className="p-6">
          <DifficultySelector selectedDifficulty={difficulty} onSelect={setDifficulty} />
        </CardContent>
      </Card>
    );
  }

  if (completed) {
    return (
      <Card className="bg-gradient-to-br from-secondary-light to-accent-light border-secondary/20">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: Math.min(score, 5) }).map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{t.completed[language]}</h3>
          <p className="text-lg text-muted-foreground mb-2">{t.score[language]}: {score}/{tasks.length}</p>
          <p className={`text-sm mb-6 px-3 py-1 rounded-full inline-block ${difficultyLabels[difficulty].color}`}>
            {difficultyLabels[difficulty][language]}
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={handleRestart} className="gap-2"><RotateCcw className="w-4 h-4" />{t.restart[language]}</Button>
            <Button variant="outline" onClick={() => { setDifficulty(null); handleRestart(); }}>{t.changeDifficulty[language]}</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Picture Words Task
  if (activityIndex === 0) {
    const task = tasks[currentTask] as typeof readingPictureWordTasks.easy[0];
    return (
      <Card className="bg-card border-secondary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.pictureWords[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>{difficultyLabels[difficulty][language]}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t.whatIs[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {tasks.length}</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-secondary-light rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => speak(task.word[language])}>
              <span className="text-7xl">{task.image}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {task.options[language].map((option) => (
              <Button key={option} variant={selected === option ? (option === task.word[language] ? "default" : "destructive") : "outline"} className={`h-14 text-lg transition-all ${showResult && option === task.word[language] ? "ring-2 ring-green-500 bg-green-100" : ""}`} onClick={() => handleSelect(option)} disabled={showResult}>{option}</Button>
            ))}
          </div>
          {showResult && (
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${selected === task.word[language] ? "text-green-600" : "text-destructive"}`}>
                {selected === task.word[language] ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <span className="font-medium">{selected === task.word[language] ? t.correct[language] : t.tryAgain[language]}</span>
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
    const task = tasks[currentTask] as typeof readingSoundMatchTasks.easy[0];
    return (
      <Card className="bg-card border-secondary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.soundMatch[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>{difficultyLabels[difficulty][language]}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t.findSound[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {tasks.length}</p>
          </div>
          <div className="flex justify-center mb-8 gap-4 items-center">
            <div className="w-20 h-20 bg-secondary-light rounded-2xl flex items-center justify-center">
              <span className="text-4xl font-bold text-secondary">{task.letter}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-secondary-light" onClick={() => speak(task.hint[language])}>
              <Volume2 className="w-6 h-6 text-secondary" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {task.options.map((emoji) => (
              <Button key={emoji} variant={selected === emoji ? (emoji === task.answer ? "default" : "destructive") : "outline"} className={`h-20 text-4xl transition-all ${showResult && emoji === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""}`} onClick={() => handleSelect(emoji)} disabled={showResult}>{emoji}</Button>
            ))}
          </div>
          {showResult && (
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${selected === task.answer ? "text-green-600" : "text-destructive"}`}>
                {selected === task.answer ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <span className="font-medium">{selected === task.answer ? t.correct[language] : t.tryAgain[language]}</span>
              </div>
              <Button onClick={handleNext}>{t.next[language]}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Story Task
  if (activityIndex === 2) {
    const task = tasks[currentTask] as typeof readingStoryTasks.easy[0];
    return (
      <Card className="bg-card border-secondary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.storyTime[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>{difficultyLabels[difficulty][language]}</span>
            </div>
            <p className="text-xs text-muted-foreground">{currentTask + 1} / {tasks.length}</p>
          </div>
          <div className="bg-secondary-light/50 rounded-2xl p-4 mb-6">
            <p className="text-lg text-foreground italic cursor-pointer" onClick={() => speak(task.story[language])}>"{task.story[language]}"</p>
          </div>
          <p className="text-center font-medium text-foreground mb-4">{task.question[language]}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {task.options[language].map((option, idx) => (
              <Button key={option} variant={selected === idx ? (idx === task.answer ? "default" : "destructive") : "outline"} className={`h-14 text-sm transition-all ${showResult && idx === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""}`} onClick={() => handleSelect(idx)} disabled={showResult}>{option}</Button>
            ))}
          </div>
          {showResult && (
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${selected === task.answer ? "text-green-600" : "text-destructive"}`}>
                {selected === task.answer ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <span className="font-medium">{selected === task.answer ? t.correct[language] : t.tryAgain[language]}</span>
              </div>
              <Button onClick={handleNext}>{t.next[language]}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Rhyming Task
  if (activityIndex === 3) {
    const task = tasks[currentTask] as typeof readingRhymingTasks.easy[0];
    return (
      <Card className="bg-card border-secondary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.rhyming[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>{difficultyLabels[difficulty][language]}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t.findRhyme[language]} <span className="font-bold text-primary">{task.word[language]}</span></p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {tasks.length}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {task.options[language].map((option, idx) => (
              <Button key={option} variant={selected === idx ? (idx === task.answer ? "default" : "destructive") : "outline"} className={`h-14 text-lg transition-all ${showResult && idx === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""}`} onClick={() => handleSelect(idx)} disabled={showResult}>{option}</Button>
            ))}
          </div>
          {showResult && (
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${selected === task.answer ? "text-green-600" : "text-destructive"}`}>
                {selected === task.answer ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <span className="font-medium">{selected === task.answer ? t.correct[language] : t.tryAgain[language]}</span>
              </div>
              <Button onClick={handleNext}>{t.next[language]}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default ReadingTask;
