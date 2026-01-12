import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Star, Heart, PlayCircle } from "lucide-react";
import DifficultySelector from "@/components/DifficultySelector";
import { DifficultyLevel, emotionsFeelingsTaskGroups, emotionsCalmingActivities, emotionsScenarioTaskGroups, emotionsEmpathyTasks } from "@/data/taskData";
import { selectRandomTasks, getRandomElement } from "@/lib/taskUtils";
import YouTubeVideo from "@/components/YouTubeVideo";
import { emotionsVideos, getRandomVideos } from "@/data/educationalVideos";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface EmotionsTaskProps {
  activityIndex: number;
  onComplete: (correct: boolean) => void;
}

const EmotionsTask = ({ activityIndex, onComplete }: EmotionsTaskProps) => {
  const { language } = useLanguage();
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [calmingStep, setCalmingStep] = useState(0);
  const [calmingComplete, setCalmingComplete] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const { playCorrect, playIncorrect, playComplete, playClick } = useSoundEffects();

  // Get random tasks based on difficulty
  const feelingsTasks = useMemo(() => {
    const groups = emotionsFeelingsTaskGroups[difficulty];
    const randomGroup = getRandomElement(groups);
    return selectRandomTasks(randomGroup, 4);
  }, [difficulty]);

  const scenarioTasks = useMemo(() => {
    const groups = emotionsScenarioTaskGroups[difficulty];
    const randomGroup = getRandomElement(groups);
    return selectRandomTasks(randomGroup, 3);
  }, [difficulty]);

  const empathyTasksList = useMemo(() => {
    return selectRandomTasks(emotionsEmpathyTasks[difficulty], 3);
  }, [difficulty]);

  const randomVideos = useMemo(() => getRandomVideos(emotionsVideos, 2), []);

  const t = {
    howFeel: { en: "How Do They Feel?", ru: "Что они чувствуют?" },
    whatEmotion: { en: "What emotion is this?", ru: "Какая это эмоция?" },
    calmCorner: { en: "Calm Corner", ru: "Уголок спокойствия" },
    chooseActivity: { en: "Choose a calming activity", ru: "Выбери упражнение для успокоения" },
    emotionCards: { en: "Emotion Cards", ru: "Карточки эмоций" },
    empathy: { en: "Helping Others", ru: "Помощь другим" },
    whatHelps: { en: "What could help?", ru: "Что могло бы помочь?" },
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
    watchVideos: { en: "Watch Learning Videos", ru: "Смотреть обучающие видео" },
    hideVideos: { en: "Hide Videos", ru: "Скрыть видео" },
  };

  const handleSelect = (value: string) => {
    if (showResult) return;
    playClick();
    setSelected(value);
    setShowResult(true);

    let isCorrect = false;
    if (activityIndex === 0) {
      isCorrect = value === feelingsTasks[currentTask]?.emotion[language];
    } else if (activityIndex === 2) {
      isCorrect = value === scenarioTasks[currentTask]?.answer;
    } else if (activityIndex === 3) {
      isCorrect = Number(value) === empathyTasksList[currentTask]?.answer;
    }

    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  const handleNext = () => {
    const tasks = activityIndex === 0 ? feelingsTasks : activityIndex === 2 ? scenarioTasks : empathyTasksList;
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelected(null);
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
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setShowVideos(false);
  };

  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    handleRestart();
  };

  const handleCalmingNext = () => {
    const activity = emotionsCalmingActivities[currentTask];
    if (calmingStep < activity.steps[language].length - 1) {
      setCalmingStep(calmingStep + 1);
      playClick();
    } else {
      setCalmingComplete(true);
      playComplete();
    }
  };

  const handleCalmingRestart = () => {
    setCalmingStep(0);
    setCalmingComplete(false);
    setShowVideos(false);
  };

  const selectCalmingActivity = (index: number) => {
    setCurrentTask(index);
    setCalmingStep(0);
    setCalmingComplete(false);
    playClick();
  };

  if (completed && activityIndex !== 1) {
    const tasks = activityIndex === 0 ? feelingsTasks : activityIndex === 2 ? scenarioTasks : empathyTasksList;
    return (
      <Card className="bg-gradient-to-br from-warm-light to-calm-light border-warm/20">
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

  // Feelings Recognition Task
  if (activityIndex === 0) {
    const task = feelingsTasks[currentTask];
    if (!task) return null;

    return (
      <Card className="bg-card border-warm/20">
        <CardContent className="p-6">
          <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultyChange} />
          
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.howFeel[language]}</h3>
            <p className="text-sm text-muted-foreground">{t.whatEmotion[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {feelingsTasks.length}</p>
          </div>

          <div className="flex justify-center mb-8">
            <span className="text-8xl">{task.face}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {task.options[language].map((option) => (
              <Button
                key={option}
                variant={selected === option ? (option === task.emotion[language] ? "default" : "destructive") : "outline"}
                className={`h-14 text-base transition-all ${
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

  // Calming Activities
  if (activityIndex === 1) {
    const selectedActivity = currentTask < emotionsCalmingActivities.length ? emotionsCalmingActivities[currentTask] : null;

    if (!selectedActivity || calmingStep === -1) {
      return (
        <Card className="bg-gradient-to-br from-calm-light to-white border-calm/20">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{t.calmCorner[language]}</h3>
              <p className="text-sm text-muted-foreground">{t.chooseActivity[language]}</p>
            </div>

            <div className="grid gap-3">
              {emotionsCalmingActivities.map((activity, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-calm-light/50"
                  onClick={() => selectCalmingActivity(index)}
                >
                  <span className="text-4xl">{activity.icon}</span>
                  <span className="font-medium">{activity.title[language]}</span>
                  <span className="text-xs text-muted-foreground">{activity.instruction[language]}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    if (calmingComplete) {
      return (
        <Card className="bg-gradient-to-br from-calm-light to-white border-calm/20">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-pink-500 fill-pink-500 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{t.wellDone[language]}</h3>
            <div className="flex flex-col gap-3 mt-6">
              <Button onClick={handleCalmingRestart} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                {t.tryAnother[language]}
              </Button>
              <Button onClick={() => onComplete(true)}>
                {t.done[language]}
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

    return (
      <Card className="bg-gradient-to-br from-calm-light to-white border-calm/20">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-6xl">{selectedActivity.icon}</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-4">{selectedActivity.title[language]}</h3>
          
          <div className="bg-white/50 rounded-2xl p-6 mb-6">
            <p className="text-lg text-foreground">
              {selectedActivity.steps[language][calmingStep]}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {language === 'en' ? 'Step' : 'Шаг'} {calmingStep + 1} / {selectedActivity.steps[language].length}
            </p>
          </div>

          <Button onClick={handleCalmingNext} size="lg">
            {calmingStep < selectedActivity.steps[language].length - 1 ? t.nextStep[language] : t.done[language]}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Emotion Scenario Cards Task
  if (activityIndex === 2) {
    const task = scenarioTasks[currentTask];
    if (!task) return null;

    return (
      <Card className="bg-card border-warm/20">
        <CardContent className="p-6">
          <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultyChange} />
          
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.emotionCards[language]}</h3>
            <p className="text-xs text-muted-foreground">{currentTask + 1} / {scenarioTasks.length}</p>
          </div>

          <div className="bg-warm-light/50 rounded-2xl p-4 mb-6">
            <p className="text-base text-foreground mb-2">{task.scenario[language]}</p>
            <p className="text-sm font-medium text-muted-foreground">{task.question[language]}</p>
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
            <div className="space-y-3">
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
              <p className="text-sm text-muted-foreground bg-green-50 p-3 rounded-lg">
                {task.explanation[language]}
              </p>
              <div className="flex justify-end">
                <Button onClick={handleNext}>{t.next[language]}</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Empathy Task (activityIndex === 3)
  const empathyTask = empathyTasksList[currentTask];
  if (!empathyTask) return null;

  return (
    <Card className="bg-card border-warm/20">
      <CardContent className="p-6">
        <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultyChange} />
        
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">{t.empathy[language]}</h3>
          <p className="text-xs text-muted-foreground">{currentTask + 1} / {empathyTasksList.length}</p>
        </div>

        <div className="bg-warm-light/50 rounded-2xl p-4 mb-6">
          <p className="text-base text-foreground mb-2">{empathyTask.scenario[language]}</p>
          <p className="text-sm font-medium text-muted-foreground">{empathyTask.question[language]}</p>
        </div>

        <div className="grid gap-3 mb-6">
          {empathyTask.options[language].map((option, index) => (
            <Button
              key={index}
              variant={selected === String(index) ? (index === empathyTask.answer ? "default" : "destructive") : "outline"}
              className={`h-auto py-3 px-4 text-left justify-start transition-all ${
                showResult && index === empathyTask.answer ? "ring-2 ring-green-500 bg-green-100" : ""
              }`}
              onClick={() => handleSelect(String(index))}
              disabled={showResult}
            >
              {option}
            </Button>
          ))}
        </div>

        {showResult && (
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${Number(selected) === empathyTask.answer ? "text-green-600" : "text-destructive"}`}>
              {Number(selected) === empathyTask.answer ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-medium">
                {Number(selected) === empathyTask.answer ? t.correct[language] : t.tryAgain[language]}
              </span>
            </div>
            <Button onClick={handleNext}>{t.next[language]}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionsTask;
