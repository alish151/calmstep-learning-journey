import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Star, PlayCircle } from "lucide-react";
import DifficultySelector from "@/components/DifficultySelector";
import { DifficultyLevel, logicPatternTaskGroups, logicSortingTaskGroups, logicSequenceTaskGroups, logicOddOneOutTasks } from "@/data/taskData";
import { selectRandomTasks, getRandomElement } from "@/lib/taskUtils";
import YouTubeVideo from "@/components/YouTubeVideo";
import { logicVideos, getRandomVideos } from "@/data/educationalVideos";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface LogicTaskProps {
  activityIndex: number;
  onComplete: (correct: boolean) => void;
}

const LogicTask = ({ activityIndex, onComplete }: LogicTaskProps) => {
  const { language } = useLanguage();
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const { playCorrect, playIncorrect, playComplete, playClick } = useSoundEffects();

  // Get random tasks based on activity and difficulty
  const patternTasks = useMemo(() => {
    const groups = logicPatternTaskGroups[difficulty];
    const randomGroup = getRandomElement(groups);
    return selectRandomTasks(randomGroup, 5);
  }, [difficulty]);

  const sortingTasks = useMemo(() => {
    const groups = logicSortingTaskGroups[difficulty];
    const randomGroup = getRandomElement(groups);
    return selectRandomTasks(randomGroup, 3);
  }, [difficulty]);

  const sequenceTasks = useMemo(() => {
    const groups = logicSequenceTaskGroups[difficulty];
    const randomGroup = getRandomElement(groups);
    return selectRandomTasks(randomGroup, 4);
  }, [difficulty]);

  const oddOneOutTasksList = useMemo(() => {
    return selectRandomTasks(logicOddOneOutTasks[difficulty], 3);
  }, [difficulty]);

  const randomVideos = useMemo(() => getRandomVideos(logicVideos, 2), []);

  const t = {
    findPattern: { en: "Find the Pattern", ru: "Найди паттерн" },
    whatNext: { en: "What comes next in the pattern?", ru: "Что дальше в паттерне?" },
    sortIt: { en: "Sort It Out", ru: "Рассортируй" },
    tapToSort: { en: "Tap items in order", ru: "Нажимай по порядку" },
    sequence: { en: "What Comes Next?", ru: "Что дальше?" },
    oddOneOut: { en: "Odd One Out", ru: "Найди лишнее" },
    findOdd: { en: "Find the one that doesn't belong", ru: "Найди то, что не подходит" },
    correct: { en: "Correct! 🎉", ru: "Правильно! 🎉" },
    tryAgain: { en: "Try again!", ru: "Попробуй ещё!" },
    next: { en: "Next", ru: "Дальше" },
    restart: { en: "Play Again", ru: "Играть снова" },
    completed: { en: "Great job!", ru: "Отлично!" },
    score: { en: "Score", ru: "Счёт" },
    reset: { en: "Reset", ru: "Сброс" },
    check: { en: "Check", ru: "Проверить" },
    watchVideos: { en: "Watch Learning Videos", ru: "Смотреть обучающие видео" },
    hideVideos: { en: "Hide Videos", ru: "Скрыть видео" },
    reason: { en: "Because:", ru: "Потому что:" },
  };

  const handleSelect = (value: string) => {
    if (showResult) return;
    playClick();
    setSelected(value);
    setShowResult(true);

    let isCorrect = false;
    if (activityIndex === 0) {
      isCorrect = value === patternTasks[currentTask]?.answer;
    } else if (activityIndex === 2) {
      isCorrect = value === sequenceTasks[currentTask]?.answer;
    } else if (activityIndex === 3) {
      isCorrect = value === oddOneOutTasksList[currentTask]?.answer;
    }

    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  const handleSortSelect = (item: string) => {
    if (showResult || sortOrder.includes(item)) return;
    playClick();
    setSortOrder([...sortOrder, item]);
  };

  const handleCheckSort = () => {
    const task = sortingTasks[currentTask];
    const isCorrect = JSON.stringify(sortOrder) === JSON.stringify(task?.correctOrder);
    setShowResult(true);
    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  const handleResetSort = () => {
    setSortOrder([]);
  };

  const handleNext = () => {
    const tasks = activityIndex === 0 ? patternTasks : activityIndex === 1 ? sortingTasks : activityIndex === 2 ? sequenceTasks : oddOneOutTasksList;
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelected(null);
      setSortOrder([]);
      setShowResult(false);
    } else {
      setCompleted(true);
      playComplete();
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
    setShowVideos(false);
  };

  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    handleRestart();
  };

  if (completed) {
    const tasks = activityIndex === 0 ? patternTasks : activityIndex === 1 ? sortingTasks : activityIndex === 2 ? sequenceTasks : oddOneOutTasksList;
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
          
          <div className="flex flex-col gap-3">
            <Button onClick={handleRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              {t.restart[language]}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowVideos(!showVideos)}
              className="gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              {showVideos ? t.hideVideos[language] : t.watchVideos[language]}
            </Button>
          </div>

          {showVideos && (
            <div className="mt-6 grid gap-4">
              {randomVideos.map((video) => (
                <YouTubeVideo key={video.id} video={video} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Pattern Task
  if (activityIndex === 0) {
    const task = patternTasks[currentTask];
    if (!task) return null;
    
    return (
      <Card className="bg-card border-accent/20">
        <CardContent className="p-6">
          <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultyChange} />
          
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
    if (!task) return null;
    
    const availableItems = task.items.filter(item => !sortOrder.includes(item));
    const isCorrect = JSON.stringify(sortOrder) === JSON.stringify(task.correctOrder);

    return (
      <Card className="bg-card border-accent/20">
        <CardContent className="p-6">
          <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultyChange} />
          
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
  if (activityIndex === 2) {
    const task = sequenceTasks[currentTask];
    if (!task) return null;

    return (
      <Card className="bg-card border-accent/20">
        <CardContent className="p-6">
          <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultyChange} />
          
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.sequence[language]}</h3>
            <p className="text-sm text-muted-foreground">{task.question[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {sequenceTasks.length}</p>
          </div>

          <div className="flex justify-center gap-3 mb-8 py-4 bg-accent-light/50 rounded-2xl flex-wrap">
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
  }

  // Odd One Out Task (activityIndex === 3)
  const oddTask = oddOneOutTasksList[currentTask];
  if (!oddTask) return null;

  return (
    <Card className="bg-card border-accent/20">
      <CardContent className="p-6">
        <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultyChange} />
        
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">{t.oddOneOut[language]}</h3>
          <p className="text-sm text-muted-foreground">{t.findOdd[language]}</p>
          <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {oddOneOutTasksList.length}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {oddTask.items.map((item) => (
            <Button
              key={item}
              variant={selected === item ? (item === oddTask.answer ? "default" : "destructive") : "outline"}
              className={`h-20 text-4xl transition-all ${
                showResult && item === oddTask.answer ? "ring-2 ring-green-500 bg-green-100" : ""
              }`}
              onClick={() => handleSelect(item)}
              disabled={showResult}
            >
              {item}
            </Button>
          ))}
        </div>

        {showResult && (
          <div className="space-y-3">
            <div className={`flex items-center gap-2 ${selected === oddTask.answer ? "text-green-600" : "text-destructive"}`}>
              {selected === oddTask.answer ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-medium">
                {selected === oddTask.answer ? t.correct[language] : t.tryAgain[language]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.reason[language]} {oddTask.reason[language]}
            </p>
            <div className="flex justify-end">
              <Button onClick={handleNext}>{t.next[language]}</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogicTask;
