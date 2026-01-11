import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Star, Video } from "lucide-react";
import { 
  DifficultyLevel, 
  mathCountingTaskGroups,
  mathShapeTasks, 
  mathNumberTasks,
  mathAdditionTaskGroups,
  mathComparisonTasks,
  difficultyLabels
} from "@/data/taskData";
import { getRandomElement, shuffleArray } from "@/lib/taskUtils";
import DifficultySelector from "@/components/DifficultySelector";
import YouTubeVideo from "@/components/YouTubeVideo";
import { mathVideos, getRandomVideos } from "@/data/educationalVideos";

interface MathTaskProps {
  activityIndex: number;
  onComplete: (correct: boolean) => void;
}

const MathTask = ({ activityIndex, onComplete }: MathTaskProps) => {
  const { language } = useLanguage();
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  // Get random task group when difficulty is selected
  const tasks = useMemo(() => {
    if (!difficulty) return [];
    
    switch (activityIndex) {
      case 0: {
        const groups = mathCountingTaskGroups[difficulty];
        const randomGroup = getRandomElement(groups);
        return shuffleArray(randomGroup);
      }
      case 1: return shuffleArray(mathShapeTasks[difficulty]);
      case 2: return shuffleArray(mathNumberTasks[difficulty]);
      case 3: {
        const groups = mathAdditionTaskGroups[difficulty];
        const randomGroup = getRandomElement(groups);
        return shuffleArray(randomGroup);
      }
      case 4: return shuffleArray(mathComparisonTasks[difficulty]);
      default: {
        const groups = mathCountingTaskGroups[difficulty];
        const randomGroup = getRandomElement(groups);
        return shuffleArray(randomGroup);
      }
    }
  }, [difficulty, activityIndex]);

  // Get random videos for this module
  const videos = useMemo(() => getRandomVideos(mathVideos, 2), []);

  const t = {
    countStars: { en: "Count the Stars", ru: "Посчитай звёзды" },
    howMany: { en: "How many items do you see?", ru: "Сколько предметов ты видишь?" },
    shapeMatch: { en: "Find the Shape", ru: "Найди фигуру" },
    findShape: { en: "Find the", ru: "Найди" },
    numberHunt: { en: "Find the Number", ru: "Найди число" },
    findNumber: { en: "Find number", ru: "Найди число" },
    addition: { en: "Simple Addition", ru: "Простое сложение" },
    whatIs: { en: "What is", ru: "Сколько будет" },
    comparison: { en: "Bigger or Smaller", ru: "Больше или меньше" },
    whichBigger: { en: "Which is the relationship?", ru: "Какое соотношение?" },
    bigger: { en: "Bigger", ru: "Больше" },
    smaller: { en: "Smaller", ru: "Меньше" },
    equal: { en: "Equal", ru: "Равно" },
    correct: { en: "Correct! 🎉", ru: "Правильно! 🎉" },
    tryAgain: { en: "Try again!", ru: "Попробуй ещё!" },
    next: { en: "Next", ru: "Дальше" },
    restart: { en: "Play Again", ru: "Играть снова" },
    completed: { en: "Great job!", ru: "Отлично!" },
    score: { en: "Score", ru: "Счёт" },
    changeDifficulty: { en: "Change Difficulty", ru: "Изменить сложность" },
    watchVideos: { en: "Watch Learning Videos", ru: "Посмотреть обучающие видео" },
    hideVideos: { en: "Hide Videos", ru: "Скрыть видео" },
  };

  const handleSelect = (value: number | string) => {
    if (showResult) return;
    setSelected(value);
    setShowResult(true);

    let isCorrect = false;
    const task = tasks[currentTask];
    
    if (activityIndex === 0) {
      isCorrect = value === (task as { items: string[]; answer: number }).answer;
    } else if (activityIndex === 1) {
      isCorrect = value === (task as typeof mathShapeTasks.easy[0]).answer;
    } else if (activityIndex === 2) {
      isCorrect = value === (task as typeof mathNumberTasks.easy[0]).target;
    } else if (activityIndex === 3) {
      isCorrect = value === (task as { num1: number; num2: number; answer: number }).answer;
    } else if (activityIndex === 4) {
      isCorrect = value === (task as typeof mathComparisonTasks.easy[0]).answer;
    }

    if (isCorrect) {
      setScore(score + 1);
    }
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

  const handleChangeDifficulty = () => {
    setDifficulty(null);
    handleRestart();
  };

  // Show difficulty selector first
  if (!difficulty) {
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="p-6">
          <DifficultySelector selectedDifficulty={difficulty} onSelect={setDifficulty} />
        </CardContent>
      </Card>
    );
  }

  if (completed) {
    return (
      <Card className="bg-gradient-to-br from-primary-light to-secondary-light border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: Math.min(score, 5) }).map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{t.completed[language]}</h3>
          <p className="text-lg text-muted-foreground mb-2">
            {t.score[language]}: {score}/{tasks.length}
          </p>
          <p className={`text-sm mb-6 px-3 py-1 rounded-full inline-block ${difficultyLabels[difficulty!].color}`}>
            {difficultyLabels[difficulty!][language]}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button onClick={handleRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              {t.restart[language]}
            </Button>
            <Button variant="outline" onClick={handleChangeDifficulty}>
              {t.changeDifficulty[language]}
            </Button>
          </div>
          
          {/* Video section */}
          <div className="mt-6">
            <Button 
              variant="ghost" 
              className="gap-2 text-primary"
              onClick={() => setShowVideos(!showVideos)}
            >
              <Video className="w-4 h-4" />
              {showVideos ? t.hideVideos[language] : t.watchVideos[language]}
            </Button>
            {showVideos && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {videos.map((video) => (
                  <YouTubeVideo key={video.id} video={video} />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Counting Task
  if (activityIndex === 0) {
    const task = tasks[currentTask] as { items: string[]; answer: number };
    const maxAnswer = Math.max(task.answer + 2, 5);
    const minAnswer = Math.max(1, task.answer - 2);
    const answerOptions = Array.from({ length: maxAnswer - minAnswer + 1 }, (_, i) => minAnswer + i);
    
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.countStars[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>
                {difficultyLabels[difficulty][language]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{t.howMany[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {tasks.length}</p>
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
    const task = tasks[currentTask] as typeof mathShapeTasks.easy[0];
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.shapeMatch[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>
                {difficultyLabels[difficulty][language]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.findShape[language]} <span className="font-bold">{task.shapeName[language]}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {tasks.length}</p>
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
  if (activityIndex === 2) {
    const task = tasks[currentTask] as typeof mathNumberTasks.easy[0];
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.numberHunt[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>
                {difficultyLabels[difficulty][language]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.findNumber[language]} <span className="font-bold text-2xl text-primary">{task.target}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {tasks.length}</p>
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
  }

  // Addition Task
  if (activityIndex === 3) {
    const task = tasks[currentTask] as { num1: number; num2: number; answer: number };
    const options = [task.answer - 1, task.answer, task.answer + 1, task.answer + 2].filter(n => n > 0);
    
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.addition[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>
                {difficultyLabels[difficulty][language]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {tasks.length}</p>
          </div>

          <div className="flex justify-center items-center gap-4 mb-8 py-6 bg-primary-light/50 rounded-2xl">
            <span className="text-5xl font-bold text-primary">{task.num1}</span>
            <span className="text-4xl font-bold text-muted-foreground">+</span>
            <span className="text-5xl font-bold text-primary">{task.num2}</span>
            <span className="text-4xl font-bold text-muted-foreground">=</span>
            <span className="text-5xl font-bold text-muted-foreground">?</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {options.map((num) => (
              <Button
                key={num}
                variant={selected === num ? (num === task.answer ? "default" : "destructive") : "outline"}
                className={`h-20 text-3xl font-bold transition-all ${
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

  // Comparison Task
  if (activityIndex === 4) {
    const task = tasks[currentTask] as typeof mathComparisonTasks.easy[0];
    const options: Array<'bigger' | 'smaller' | 'equal'> = ['bigger', 'smaller', 'equal'];
    
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{t.comparison[language]}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[difficulty].color}`}>
                {difficultyLabels[difficulty][language]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{t.whichBigger[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {tasks.length}</p>
          </div>

          <div className="flex justify-center items-center gap-6 mb-8 py-6 bg-primary-light/50 rounded-2xl">
            <span className="text-5xl font-bold text-primary">{task.left}</span>
            <span className="text-4xl font-bold text-muted-foreground">?</span>
            <span className="text-5xl font-bold text-primary">{task.right}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {options.map((option) => (
              <Button
                key={option}
                variant={selected === option ? (option === task.answer ? "default" : "destructive") : "outline"}
                className={`h-16 text-lg font-bold transition-all ${
                  showResult && option === task.answer ? "ring-2 ring-green-500 bg-green-100" : ""
                }`}
                onClick={() => handleSelect(option)}
                disabled={showResult}
              >
                {option === 'bigger' ? '>' : option === 'smaller' ? '<' : '='}
                <span className="ml-2 text-sm">{t[option][language]}</span>
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

  return null;
};

export default MathTask;
