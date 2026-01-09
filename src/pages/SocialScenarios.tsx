import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const socialScenarios = [
  {
    category: { en: "School", ru: "Школа" },
    icon: "🏫",
    scenarios: [
      {
        situation: { en: "A classmate asks to borrow your pencil", ru: "Одноклассник просит одолжить карандаш" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Say 'Sure, here you go!'", "Ignore them", "Say 'No, go away!'", "Hide your pencil"],
          ru: ["Сказать 'Конечно, держи!'", "Проигнорировать", "Сказать 'Нет, уходи!'", "Спрятать карандаш"]
        },
        correctAnswer: 0,
        explanation: { en: "Sharing is kind! You can say 'Sure!' and lend your pencil.", ru: "Делиться — это добро! Ты можешь сказать 'Конечно!' и одолжить карандаш." }
      },
      {
        situation: { en: "The teacher asks the class a question and you know the answer", ru: "Учитель задаёт классу вопрос и ты знаешь ответ" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Raise your hand and wait to be called", "Shout out the answer", "Stay quiet", "Tell your neighbor"],
          ru: ["Поднять руку и ждать", "Выкрикнуть ответ", "Молчать", "Сказать соседу"]
        },
        correctAnswer: 0,
        explanation: { en: "Raise your hand politely and wait for the teacher to call on you!", ru: "Подними руку вежливо и жди, когда учитель вызовет тебя!" }
      },
      {
        situation: { en: "You don't understand the homework assignment", ru: "Ты не понимаешь домашнее задание" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Ask the teacher for help", "Don't do the homework", "Cry", "Copy from a friend"],
          ru: ["Попросить помощи у учителя", "Не делать домашнее задание", "Плакать", "Списать у друга"]
        },
        correctAnswer: 0,
        explanation: { en: "It's great to ask for help when you need it! Teachers want to help you learn.", ru: "Отлично просить о помощи когда она нужна! Учителя хотят помочь тебе учиться." }
      }
    ]
  },
  {
    category: { en: "Making Friends", ru: "Заводить друзей" },
    icon: "🤝",
    scenarios: [
      {
        situation: { en: "You see a new kid sitting alone at lunch", ru: "Ты видишь нового ребёнка, сидящего одного за обедом" },
        question: { en: "What could you do?", ru: "Что ты мог бы сделать?" },
        options: {
          en: ["Say 'Hi! Do you want to sit with me?'", "Ignore them", "Point at them and laugh", "Run away"],
          ru: ["Сказать 'Привет! Хочешь сесть со мной?'", "Проигнорировать", "Показать на них и смеяться", "Убежать"]
        },
        correctAnswer: 0,
        explanation: { en: "Being friendly and inviting them is very kind! Everyone likes to have friends.", ru: "Быть дружелюбным и пригласить их — это очень мило! Всем нравится иметь друзей." }
      },
      {
        situation: { en: "Your friend is playing with a toy you want", ru: "Твой друг играет с игрушкой, которую ты хочешь" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Ask politely 'Can I play when you're done?'", "Grab the toy", "Cry and scream", "Tell an adult they won't share"],
          ru: ["Вежливо спросить 'Можно мне поиграть, когда ты закончишь?'", "Забрать игрушку", "Плакать и кричать", "Сказать взрослому, что они не делятся"]
        },
        correctAnswer: 0,
        explanation: { en: "Asking politely and waiting is the best way! You can play together too.", ru: "Вежливо спросить и подождать — лучший способ! Вы также можете играть вместе." }
      },
      {
        situation: { en: "Someone calls you a mean name", ru: "Кто-то обзывает тебя обидным словом" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Walk away and tell a trusted adult", "Call them a mean name back", "Hit them", "Cry and hide"],
          ru: ["Уйти и сказать взрослому, которому доверяешь", "Обозвать их в ответ", "Ударить их", "Плакать и прятаться"]
        },
        correctAnswer: 0,
        explanation: { en: "Walking away and telling a trusted adult is the best choice. Mean words can hurt, but you don't have to respond the same way.", ru: "Уйти и сказать взрослому, которому доверяешь — лучший выбор. Обидные слова могут ранить, но тебе не нужно отвечать так же." }
      }
    ]
  },
  {
    category: { en: "Asking for Help", ru: "Просить помощь" },
    icon: "🙋",
    scenarios: [
      {
        situation: { en: "You're lost in a store and can't find your parent", ru: "Ты потерялся в магазине и не можешь найти родителя" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Find a store worker and say you're lost", "Wander around the store", "Go outside to look", "Start crying loudly"],
          ru: ["Найти работника магазина и сказать, что ты потерялся", "Бродить по магазину", "Выйти наружу искать", "Начать громко плакать"]
        },
        correctAnswer: 0,
        explanation: { en: "Finding a store worker is safe! They can help you find your parent. Store workers wear special clothes or name tags.", ru: "Найти работника магазина безопасно! Они могут помочь найти твоего родителя. Работники магазина носят специальную одежду или бейджи." }
      },
      {
        situation: { en: "You can't open your juice box", ru: "Ты не можешь открыть коробочку с соком" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Ask an adult 'Can you help me please?'", "Throw the juice box", "Squeeze it until it bursts", "Give up and don't drink"],
          ru: ["Попросить взрослого 'Можете мне помочь, пожалуйста?'", "Бросить коробочку с соком", "Сжать её пока не лопнет", "Сдаться и не пить"]
        },
        correctAnswer: 0,
        explanation: { en: "Asking politely for help is great! Everyone needs help sometimes.", ru: "Вежливо просить о помощи — это отлично! Всем иногда нужна помощь." }
      },
      {
        situation: { en: "You feel sick at school", ru: "Тебе стало плохо в школе" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Tell your teacher you don't feel well", "Keep it to yourself", "Go home by yourself", "Pretend nothing is wrong"],
          ru: ["Сказать учителю, что тебе плохо", "Держать это в себе", "Идти домой самому", "Притворяться, что всё в порядке"]
        },
        correctAnswer: 0,
        explanation: { en: "Always tell a teacher or adult if you feel sick! They will help you feel better.", ru: "Всегда говори учителю или взрослому, если тебе плохо! Они помогут тебе почувствовать себя лучше." }
      }
    ]
  },
  {
    category: { en: "Taking Turns", ru: "Очередность" },
    icon: "🔄",
    scenarios: [
      {
        situation: { en: "You're playing a board game and it's not your turn yet", ru: "Вы играете в настольную игру и ещё не твоя очередь" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Wait patiently for your turn", "Move their piece for them", "Say it's taking too long", "Start playing another game"],
          ru: ["Терпеливо ждать своей очереди", "Передвинуть их фишку за них", "Сказать, что это слишком долго", "Начать играть в другую игру"]
        },
        correctAnswer: 0,
        explanation: { en: "Waiting patiently shows good manners! Your turn will come soon.", ru: "Терпеливо ждать — это хорошие манеры! Твоя очередь скоро придёт." }
      },
      {
        situation: { en: "There's only one swing and another kid is using it", ru: "Есть только одни качели и другой ребёнок катается на них" },
        question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
        options: {
          en: ["Ask 'Can I have a turn after you?'", "Push them off the swing", "Tell a teacher they won't share", "Stand there and stare"],
          ru: ["Спросить 'Можно мне покачаться после тебя?'", "Столкнуть их с качелей", "Сказать учителю, что они не делятся", "Стоять и смотреть"]
        },
        correctAnswer: 0,
        explanation: { en: "Asking nicely is the best way! You can do something else while you wait.", ru: "Вежливо спросить — лучший способ! Ты можешь заняться чем-то другим пока ждёшь." }
      },
      {
        situation: { en: "Your friend wants to choose the movie but you wanted to", ru: "Твой друг хочет выбрать фильм, но ты тоже хотел" },
        question: { en: "What could you do?", ru: "Что ты мог бы сделать?" },
        options: {
          en: ["Take turns choosing - they pick this time, you pick next time", "Say 'No, I always choose!'", "Refuse to watch anything", "Walk away upset"],
          ru: ["Чередоваться - они выбирают сейчас, ты выбираешь в следующий раз", "Сказать 'Нет, я всегда выбираю!'", "Отказаться смотреть что-либо", "Уйти расстроенным"]
        },
        correctAnswer: 0,
        explanation: { en: "Taking turns is fair! You can pick the movie next time.", ru: "Чередоваться — это честно! Ты можешь выбрать фильм в следующий раз." }
      }
    ]
  }
];

const SocialScenarios = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const texts = {
    title: { en: "Social Scenarios", ru: "Социальные сценарии" },
    subtitle: { en: "Practice real-life situations", ru: "Практикуй реальные ситуации" },
    chooseCategory: { en: "Choose a category to practice", ru: "Выбери категорию для практики" },
    correct: { en: "Great choice! 🎉", ru: "Отличный выбор! 🎉" },
    tryAgain: { en: "Let's think about this...", ru: "Давай подумаем об этом..." },
    next: { en: "Next", ru: "Дальше" },
    restart: { en: "Play Again", ru: "Играть снова" },
    completed: { en: "Great job!", ru: "Отлично!" },
    score: { en: "Score", ru: "Счёт" },
    backToCategories: { en: "Back to Categories", ru: "Назад к категориям" },
    scenarios: { en: "scenarios", ru: "сценариев" },
  };

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    const category = socialScenarios[selectedCategory!];
    const scenario = category.scenarios[currentScenario];
    if (index === scenario.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const category = socialScenarios[selectedCategory!];
    if (currentScenario < category.scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentScenario(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <>
      <Helmet>
        <title>{texts.title[language]} - CalmStep</title>
        <meta name="description" content="Practice real-life social scenarios including school situations, making friends, and asking for help." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 py-8 pt-24">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-6xl block mb-4">🤝</span>
              <h1 className="text-3xl font-bold text-foreground mb-2">{texts.title[language]}</h1>
              <p className="text-muted-foreground">{texts.subtitle[language]}</p>
            </div>

            {selectedCategory === null ? (
              // Category selection
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4 text-center">{texts.chooseCategory[language]}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {socialScenarios.map((category, index) => (
                    <Card 
                      key={index}
                      className="bg-calm-light border-calm/20 cursor-pointer hover:border-calm/40 transition-all hover:scale-[1.02]"
                      onClick={() => setSelectedCategory(index)}
                    >
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center">
                          <span className="text-4xl">{category.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{category.category[language]}</h3>
                          <p className="text-sm text-muted-foreground">{category.scenarios.length} {texts.scenarios[language]}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : completed ? (
              // Completion screen
              <Card className="bg-gradient-to-br from-calm-light to-warm-light border-calm/20">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: score }).map((_, i) => (
                      <Star key={i} className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{texts.completed[language]}</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {texts.score[language]}: {score}/{socialScenarios[selectedCategory].scenarios.length}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={handleBackToCategories}>
                      {texts.backToCategories[language]}
                    </Button>
                    <Button onClick={handleRestart} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      {texts.restart[language]}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Scenario display
              <>
                <Button 
                  variant="ghost" 
                  className="mb-4"
                  onClick={handleBackToCategories}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {texts.backToCategories[language]}
                </Button>

                <Card className="bg-card border-calm/20">
                  <CardContent className="p-6">
                    {(() => {
                      const category = socialScenarios[selectedCategory];
                      const scenario = category.scenarios[currentScenario];
                      return (
                        <>
                          <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <span className="text-2xl">{category.icon}</span>
                              <h3 className="text-lg font-semibold text-foreground">{category.category[language]}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground">{currentScenario + 1} / {category.scenarios.length}</p>
                          </div>

                          <div className="bg-calm-light rounded-2xl p-4 mb-6">
                            <p className="text-lg text-center text-foreground">{scenario.situation[language]}</p>
                          </div>

                          <p className="text-center font-medium text-foreground mb-4">{scenario.question[language]}</p>

                          <div className="space-y-3 mb-6">
                            {scenario.options[language].map((option, index) => (
                              <Button
                                key={index}
                                variant={selected === index ? (index === scenario.correctAnswer ? "default" : "destructive") : "outline"}
                                className={`w-full h-auto py-4 text-left justify-start px-4 transition-all whitespace-normal ${
                                  showResult && index === scenario.correctAnswer ? "ring-2 ring-green-500 bg-green-100" : ""
                                }`}
                                onClick={() => handleSelect(index)}
                                disabled={showResult}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>

                          {showResult && (
                            <div className="space-y-4">
                              <div className="bg-muted rounded-xl p-4">
                                <p className="text-sm text-foreground">{scenario.explanation[language]}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className={`flex items-center gap-2 ${selected === scenario.correctAnswer ? "text-green-600" : "text-destructive"}`}>
                                  {selected === scenario.correctAnswer ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                  ) : (
                                    <XCircle className="w-5 h-5" />
                                  )}
                                  <span className="font-medium">
                                    {selected === scenario.correctAnswer ? texts.correct[language] : texts.tryAgain[language]}
                                  </span>
                                </div>
                                <Button onClick={handleNext}>{texts.next[language]}</Button>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SocialScenarios;
