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
  { image: "🐕", word: { en: "Dog", ru: "Собака" }, options: { en: ["Cat", "Dog", "Bird", "Mouse"], ru: ["Кот", "Собака", "Птица", "Мышь"] } },
  { image: "🌸", word: { en: "Flower", ru: "Цветок" }, options: { en: ["Flower", "Tree", "Leaf", "Grass"], ru: ["Цветок", "Дерево", "Лист", "Трава"] } },
  { image: "🚗", word: { en: "Car", ru: "Машина" }, options: { en: ["Bus", "Car", "Bike", "Train"], ru: ["Автобус", "Машина", "Велосипед", "Поезд"] } },
  { image: "🌳", word: { en: "Tree", ru: "Дерево" }, options: { en: ["Tree", "Flower", "Bush", "Grass"], ru: ["Дерево", "Цветок", "Куст", "Трава"] } },
  { image: "⭐", word: { en: "Star", ru: "Звезда" }, options: { en: ["Moon", "Sun", "Star", "Cloud"], ru: ["Луна", "Солнце", "Звезда", "Облако"] } },
  { image: "🐟", word: { en: "Fish", ru: "Рыба" }, options: { en: ["Fish", "Bird", "Cat", "Dog"], ru: ["Рыба", "Птица", "Кот", "Собака"] } },
  { image: "🍌", word: { en: "Banana", ru: "Банан" }, options: { en: ["Apple", "Banana", "Orange", "Grape"], ru: ["Яблоко", "Банан", "Апельсин", "Виноград"] } },
  { image: "🦋", word: { en: "Butterfly", ru: "Бабочка" }, options: { en: ["Butterfly", "Bird", "Bee", "Ant"], ru: ["Бабочка", "Птица", "Пчела", "Муравей"] } },
  { image: "🌈", word: { en: "Rainbow", ru: "Радуга" }, options: { en: ["Rainbow", "Cloud", "Sun", "Rain"], ru: ["Радуга", "Облако", "Солнце", "Дождь"] } },
  { image: "🎈", word: { en: "Balloon", ru: "Шарик" }, options: { en: ["Balloon", "Ball", "Kite", "Bird"], ru: ["Шарик", "Мяч", "Воздушный змей", "Птица"] } },
  { image: "🐻", word: { en: "Bear", ru: "Медведь" }, options: { en: ["Bear", "Lion", "Tiger", "Wolf"], ru: ["Медведь", "Лев", "Тигр", "Волк"] } },
];

const soundMatchTasks = [
  { letter: "A", sound: "/a/", options: ["🍎", "🐶", "🏠", "🌸"], answer: "🍎", hint: { en: "Apple", ru: "Яблоко" } },
  { letter: "B", sound: "/b/", options: ["🍌", "🐱", "🌈", "⭐"], answer: "🍌", hint: { en: "Banana", ru: "Банан" } },
  { letter: "C", sound: "/k/", options: ["🐱", "🦋", "🌸", "🍎"], answer: "🐱", hint: { en: "Cat", ru: "Кот" } },
  { letter: "D", sound: "/d/", options: ["🐶", "🐱", "🦋", "🐟"], answer: "🐶", hint: { en: "Dog", ru: "Собака" } },
  { letter: "E", sound: "/e/", options: ["🥚", "🍎", "🐶", "🌸"], answer: "🥚", hint: { en: "Egg", ru: "Яйцо" } },
  { letter: "F", sound: "/f/", options: ["🐟", "🐶", "🐱", "🦋"], answer: "🐟", hint: { en: "Fish", ru: "Рыба" } },
  { letter: "G", sound: "/g/", options: ["🍇", "🐶", "🐱", "🍎"], answer: "🍇", hint: { en: "Grapes", ru: "Виноград" } },
  { letter: "H", sound: "/h/", options: ["🏠", "🐶", "🐱", "🌸"], answer: "🏠", hint: { en: "House", ru: "Дом" } },
  { letter: "L", sound: "/l/", options: ["🦁", "🐶", "🐱", "🐟"], answer: "🦁", hint: { en: "Lion", ru: "Лев" } },
  { letter: "M", sound: "/m/", options: ["🌙", "🐶", "🐱", "🐟"], answer: "🌙", hint: { en: "Moon", ru: "Луна" } },
  { letter: "O", sound: "/o/", options: ["🍊", "🍎", "🍌", "🍇"], answer: "🍊", hint: { en: "Orange", ru: "Апельсин" } },
  { letter: "P", sound: "/p/", options: ["🐷", "🐶", "🐱", "🐟"], answer: "🐷", hint: { en: "Pig", ru: "Свинья" } },
  { letter: "R", sound: "/r/", options: ["🌈", "🐶", "🐱", "🐟"], answer: "🌈", hint: { en: "Rainbow", ru: "Радуга" } },
  { letter: "S", sound: "/s/", options: ["☀️", "🌙", "⭐", "🌈"], answer: "☀️", hint: { en: "Sun", ru: "Солнце" } },
  { letter: "T", sound: "/t/", options: ["🌳", "🌸", "🍎", "🍌"], answer: "🌳", hint: { en: "Tree", ru: "Дерево" } },
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
  {
    story: { en: "Tom ate three apples for lunch.", ru: "Том съел три яблока на обед." },
    question: { en: "How many apples did Tom eat?", ru: "Сколько яблок съел Том?" },
    options: { en: ["One", "Two", "Three", "Four"], ru: ["Одно", "Два", "Три", "Четыре"] },
    answer: 2,
  },
  {
    story: { en: "The bird flew high in the sky.", ru: "Птица летела высоко в небе." },
    question: { en: "Where did the bird fly?", ru: "Где летела птица?" },
    options: { en: ["In the water", "In the sky", "On the ground", "In the tree"], ru: ["В воде", "В небе", "На земле", "На дереве"] },
    answer: 1,
  },
  {
    story: { en: "Mary picked red flowers from the garden.", ru: "Маша собрала красные цветы в саду." },
    question: { en: "What color were the flowers?", ru: "Какого цвета были цветы?" },
    options: { en: ["Blue", "Yellow", "Red", "White"], ru: ["Синие", "Жёлтые", "Красные", "Белые"] },
    answer: 2,
  },
  {
    story: { en: "The frog jumped into the pond.", ru: "Лягушка прыгнула в пруд." },
    question: { en: "Where did the frog jump?", ru: "Куда прыгнула лягушка?" },
    options: { en: ["Into the pond", "On the rock", "Under the tree", "Into the house"], ru: ["В пруд", "На камень", "Под дерево", "В дом"] },
    answer: 0,
  },
  {
    story: { en: "Ben has a big brown bear toy.", ru: "У Бена есть большой коричневый игрушечный медведь." },
    question: { en: "What toy does Ben have?", ru: "Какая игрушка есть у Бена?" },
    options: { en: ["A car", "A bear", "A doll", "A ball"], ru: ["Машинка", "Медведь", "Кукла", "Мяч"] },
    answer: 1,
  },
  {
    story: { en: "It rained all day yesterday.", ru: "Вчера весь день шёл дождь." },
    question: { en: "What was the weather like?", ru: "Какая была погода?" },
    options: { en: ["Sunny", "Snowy", "Rainy", "Windy"], ru: ["Солнечная", "Снежная", "Дождливая", "Ветреная"] },
    answer: 2,
  },
  {
    story: { en: "Lisa gave her mom a hug.", ru: "Лиза обняла маму." },
    question: { en: "Who did Lisa hug?", ru: "Кого обняла Лиза?" },
    options: { en: ["Her dad", "Her mom", "Her friend", "Her sister"], ru: ["Папу", "Маму", "Подругу", "Сестру"] },
    answer: 1,
  },
  {
    story: { en: "The train stopped at the station.", ru: "Поезд остановился на станции." },
    question: { en: "Where did the train stop?", ru: "Где остановился поезд?" },
    options: { en: ["At home", "At school", "At the station", "At the park"], ru: ["Дома", "В школе", "На станции", "В парке"] },
    answer: 2,
  },
  {
    story: { en: "Sam found a shiny coin on the ground.", ru: "Сэм нашёл блестящую монету на земле." },
    question: { en: "What did Sam find?", ru: "Что нашёл Сэм?" },
    options: { en: ["A rock", "A coin", "A leaf", "A toy"], ru: ["Камень", "Монету", "Лист", "Игрушку"] },
    answer: 1,
  },
  {
    story: { en: "The baby laughed when she saw the balloon.", ru: "Малышка засмеялась, когда увидела шарик." },
    question: { en: "What did the baby do?", ru: "Что сделала малышка?" },
    options: { en: ["Cried", "Laughed", "Slept", "Ran"], ru: ["Заплакала", "Засмеялась", "Уснула", "Побежала"] },
    answer: 1,
  },
  {
    story: { en: "Dad made pancakes for breakfast.", ru: "Папа приготовил блины на завтрак." },
    question: { en: "What did Dad make?", ru: "Что приготовил папа?" },
    options: { en: ["Soup", "Salad", "Pancakes", "Pizza"], ru: ["Суп", "Салат", "Блины", "Пиццу"] },
    answer: 2,
  },
  {
    story: { en: "The butterfly landed on the flower.", ru: "Бабочка села на цветок." },
    question: { en: "Where did the butterfly land?", ru: "Куда села бабочка?" },
    options: { en: ["On the tree", "On the flower", "On the rock", "On the water"], ru: ["На дерево", "На цветок", "На камень", "На воду"] },
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

  // Picture Words Task
  if (activityIndex === 0) {
    const task = pictureWordTasks[currentTask];
    return (
      <Card className="bg-card border-secondary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.pictureWords[language]}</h3>
            <p className="text-sm text-muted-foreground">{t.whatIs[language]}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {pictureWordTasks.length}</p>
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
            <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {soundMatchTasks.length}</p>
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
          <p className="text-xs text-muted-foreground mt-1">{currentTask + 1} / {storyTasks.length}</p>
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
