import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, Star, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DifficultySelector from "@/components/DifficultySelector";
import { DifficultyLevel } from "@/data/taskData";
import { getRandomElement, selectRandomTasks } from "@/lib/taskUtils";
import YouTubeVideo from "@/components/YouTubeVideo";
import { socialVideos, getRandomVideos } from "@/data/educationalVideos";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import CelebrationAnimation from "@/components/CelebrationAnimation";
import { saveScrollPosition } from "@/hooks/useScrollPosition";

interface Scenario {
  situation: { en: string; ru: string };
  question: { en: string; ru: string };
  options: { en: string[]; ru: string[] };
  correctAnswer: number;
  explanation: { en: string; ru: string };
}

interface CategoryData {
  category: { en: string; ru: string };
  icon: string;
  scenarios: {
    easy: Scenario[][];
    medium: Scenario[][];
    hard: Scenario[][];
  };
}

// Social scenarios organized by category, difficulty, and groups for randomization
const socialScenarioData: CategoryData[] = [
  {
    category: { en: "School", ru: "Школа" },
    icon: "🏫",
    scenarios: {
      easy: [
        // Group 1
        [
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
            situation: { en: "It's time for class to start", ru: "Пора начать урок" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Sit down and get ready", "Keep playing", "Talk to friends", "Run around"],
              ru: ["Сесть и приготовиться", "Продолжать играть", "Разговаривать с друзьями", "Бегать"]
            },
            correctAnswer: 0,
            explanation: { en: "Being ready for class shows respect for your teacher and classmates!", ru: "Быть готовым к уроку — это уважение к учителю и одноклассникам!" }
          },
        ],
        // Group 2
        [
          {
            situation: { en: "You finished your work early", ru: "Ты закончил работу раньше" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Read a book quietly", "Disturb other students", "Leave the classroom", "Play on your phone"],
              ru: ["Тихо почитать книгу", "Мешать другим ученикам", "Уйти из класса", "Играть на телефоне"]
            },
            correctAnswer: 0,
            explanation: { en: "Reading quietly is a great way to use extra time!", ru: "Тихое чтение — отличный способ использовать свободное время!" }
          },
          {
            situation: { en: "You need to go to the bathroom during class", ru: "Тебе нужно в туалет во время урока" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Raise your hand and ask permission", "Just leave", "Wait until it hurts", "Tell a classmate"],
              ru: ["Поднять руку и попросить разрешения", "Просто уйти", "Терпеть до боли", "Сказать однокласснику"]
            },
            correctAnswer: 0,
            explanation: { en: "It's polite to ask permission before leaving class.", ru: "Вежливо попросить разрешения перед тем, как выйти из класса." }
          },
          {
            situation: { en: "A classmate drops their books", ru: "Одноклассник уронил книги" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Help them pick up the books", "Laugh at them", "Walk away", "Tell them to be careful"],
              ru: ["Помочь собрать книги", "Смеяться над ними", "Уйти", "Сказать быть осторожнее"]
            },
            correctAnswer: 0,
            explanation: { en: "Helping others is kind and makes everyone feel good!", ru: "Помогать другим — это добро, и всем становится хорошо!" }
          },
        ],
      ],
      medium: [
        // Group 1
        [
          {
            situation: { en: "You don't understand the homework assignment", ru: "Ты не понимаешь домашнее задание" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask the teacher for help", "Don't do the homework", "Cry", "Copy from a friend"],
              ru: ["Попросить помощи у учителя", "Не делать домашнее задание", "Плакать", "Списать у друга"]
            },
            correctAnswer: 0,
            explanation: { en: "It's great to ask for help when you need it! Teachers want to help you learn.", ru: "Отлично просить о помощи когда она нужна! Учителя хотят помочь тебе учиться." }
          },
          {
            situation: { en: "You see a classmate being picked on", ru: "Ты видишь, что над одноклассником издеваются" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Tell a teacher", "Join in the teasing", "Ignore it", "Film it"],
              ru: ["Сказать учителю", "Присоединиться к дразнению", "Проигнорировать", "Снять на видео"]
            },
            correctAnswer: 0,
            explanation: { en: "Telling a teacher helps protect everyone and stops bullying.", ru: "Сказать учителю помогает защитить всех и остановить издевательства." }
          },
          {
            situation: { en: "You forgot to do your homework", ru: "Ты забыл сделать домашнее задание" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Tell the teacher honestly", "Lie about it", "Copy from someone", "Skip class"],
              ru: ["Честно сказать учителю", "Соврать", "Списать у кого-то", "Прогулять урок"]
            },
            correctAnswer: 0,
            explanation: { en: "Being honest is always the best choice, even when it's hard.", ru: "Быть честным всегда лучший выбор, даже когда это сложно." }
          },
        ],
        // Group 2
        [
          {
            situation: { en: "You disagree with a classmate's idea during group work", ru: "Ты не согласен с идеей одноклассника в групповой работе" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Respectfully share your opinion", "Say their idea is stupid", "Stay quiet and be angry", "Leave the group"],
              ru: ["Уважительно поделиться своим мнением", "Сказать, что их идея глупая", "Молчать и злиться", "Уйти из группы"]
            },
            correctAnswer: 0,
            explanation: { en: "It's okay to disagree! Just share your thoughts kindly.", ru: "Можно не соглашаться! Просто поделись своими мыслями вежливо." }
          },
          {
            situation: { en: "You made a mistake on a test", ru: "Ты сделал ошибку на тесте" },
            question: { en: "What should you think?", ru: "Что тебе следует подумать?" },
            options: {
              en: ["Mistakes help me learn", "I'm not smart", "I should give up", "Tests are unfair"],
              ru: ["Ошибки помогают учиться", "Я не умный", "Нужно сдаться", "Тесты несправедливы"]
            },
            correctAnswer: 0,
            explanation: { en: "Everyone makes mistakes! They're how we learn and grow.", ru: "Все делают ошибки! Так мы учимся и растём." }
          },
          {
            situation: { en: "A new student joins your class", ru: "В ваш класс приходит новый ученик" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Welcome them and offer to help", "Ignore them", "Stare at them", "Whisper about them"],
              ru: ["Поприветствовать и предложить помощь", "Проигнорировать их", "Смотреть на них", "Шептаться о них"]
            },
            correctAnswer: 0,
            explanation: { en: "Being welcoming helps new students feel comfortable and happy!", ru: "Быть приветливым помогает новым ученикам чувствовать себя комфортно!" }
          },
        ],
      ],
      hard: [
        // Group 1
        [
          {
            situation: { en: "Your friend is cheating on a test and asks you not to tell", ru: "Твой друг списывает на тесте и просит не рассказывать" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Explain why cheating is wrong and encourage them to stop", "Help them cheat", "Ignore it", "Tell everyone in class"],
              ru: ["Объяснить почему списывание плохо и попросить их остановиться", "Помочь списать", "Проигнорировать", "Рассказать всему классу"]
            },
            correctAnswer: 0,
            explanation: { en: "A good friend helps others make good choices, even when it's uncomfortable.", ru: "Хороший друг помогает другим делать правильный выбор, даже когда это неудобно." }
          },
          {
            situation: { en: "You accidentally broke something in the classroom", ru: "Ты случайно сломал что-то в классе" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Tell the teacher what happened", "Blame someone else", "Hide the broken item", "Pretend nothing happened"],
              ru: ["Сказать учителю что произошло", "Обвинить кого-то другого", "Спрятать сломанную вещь", "Притвориться, что ничего не случилось"]
            },
            correctAnswer: 0,
            explanation: { en: "Being honest about accidents shows maturity and responsibility.", ru: "Быть честным об авариях показывает зрелость и ответственность." }
          },
          {
            situation: { en: "A classmate said something mean about your friend", ru: "Одноклассник сказал что-то обидное о твоём друге" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Stand up for your friend kindly", "Say mean things back", "Laugh along", "Spread the gossip"],
              ru: ["Вежливо заступиться за друга", "Сказать обидные слова в ответ", "Смеяться вместе", "Распространить сплетню"]
            },
            correctAnswer: 0,
            explanation: { en: "Standing up for friends shows loyalty and courage!", ru: "Заступаться за друзей показывает верность и смелость!" }
          },
        ],
        // Group 2
        [
          {
            situation: { en: "You're working on a group project but one person isn't helping", ru: "Вы работаете над групповым проектом, но один человек не помогает" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Talk to them nicely and ask if they need help", "Do all the work yourself", "Tell the teacher immediately", "Be mean to them"],
              ru: ["Вежливо поговорить и спросить, нужна ли помощь", "Сделать всю работу самому", "Сразу рассказать учителю", "Быть злым к ним"]
            },
            correctAnswer: 0,
            explanation: { en: "Sometimes people need help or encouragement. Talking kindly is the first step.", ru: "Иногда людям нужна помощь или поддержка. Вежливый разговор — первый шаг." }
          },
          {
            situation: { en: "You got a higher grade than your friend and they seem upset", ru: "Ты получил оценку выше, чем друг, и он расстроен" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Be kind and offer to help them next time", "Brag about your grade", "Ignore their feelings", "Feel bad about your grade"],
              ru: ["Быть добрым и предложить помочь в следующий раз", "Хвастаться своей оценкой", "Проигнорировать их чувства", "Чувствовать себя плохо из-за оценки"]
            },
            correctAnswer: 0,
            explanation: { en: "Being supportive of friends shows empathy and kindness.", ru: "Поддерживать друзей показывает эмпатию и доброту." }
          },
          {
            situation: { en: "The teacher made a mistake while explaining something", ru: "Учитель ошибся, объясняя что-то" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Politely raise your hand and mention it", "Shout out 'You're wrong!'", "Laugh at the teacher", "Tell everyone after class"],
              ru: ["Вежливо поднять руку и сказать об этом", "Крикнуть 'Вы ошиблись!'", "Смеяться над учителем", "Рассказать всем после урока"]
            },
            correctAnswer: 0,
            explanation: { en: "Everyone makes mistakes, including teachers! A polite correction is helpful.", ru: "Все делают ошибки, включая учителей! Вежливое исправление полезно." }
          },
        ],
      ],
    },
  },
  {
    category: { en: "Making Friends", ru: "Заводить друзей" },
    icon: "🤝",
    scenarios: {
      easy: [
        [
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
            situation: { en: "You want to play with other kids", ru: "Ты хочешь поиграть с другими детьми" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask 'Can I play too?'", "Just join without asking", "Stand and watch", "Walk away sad"],
              ru: ["Спросить 'Можно мне тоже поиграть?'", "Просто присоединиться без спроса", "Стоять и смотреть", "Уйти грустным"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking to join shows good manners and respect!", ru: "Спросить можно ли присоединиться — это хорошие манеры и уважение!" }
          },
          {
            situation: { en: "Your friend shares their snack with you", ru: "Друг делится с тобой закуской" },
            question: { en: "What should you say?", ru: "Что тебе следует сказать?" },
            options: {
              en: ["Thank you!", "Give me more", "Take it without saying anything", "I don't want it"],
              ru: ["Спасибо!", "Дай ещё", "Взять молча", "Я не хочу"]
            },
            correctAnswer: 0,
            explanation: { en: "Saying 'thank you' shows appreciation and good manners!", ru: "Сказать 'спасибо' показывает благодарность и хорошие манеры!" }
          },
        ],
        [
          {
            situation: { en: "Someone says 'hi' to you", ru: "Кто-то говорит тебе 'привет'" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Say 'Hi!' back and smile", "Ignore them", "Walk away", "Look at the ground"],
              ru: ["Сказать 'Привет!' в ответ и улыбнуться", "Проигнорировать", "Уйти", "Смотреть в пол"]
            },
            correctAnswer: 0,
            explanation: { en: "Greeting people back is friendly and polite!", ru: "Отвечать на приветствие — это дружелюбно и вежливо!" }
          },
          {
            situation: { en: "You made a new friend today", ru: "Ты завёл нового друга сегодня" },
            question: { en: "How should you feel?", ru: "Как тебе следует себя чувствовать?" },
            options: {
              en: ["Happy and excited!", "Worried", "Angry", "Sad"],
              ru: ["Счастливым и взволнованным!", "Встревоженным", "Злым", "Грустным"]
            },
            correctAnswer: 0,
            explanation: { en: "Making new friends is wonderful and something to celebrate!", ru: "Заводить новых друзей — это замечательно и повод для радости!" }
          },
          {
            situation: { en: "Your friend fell down and is crying", ru: "Твой друг упал и плачет" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Help them up and ask if they're okay", "Laugh at them", "Keep playing", "Walk away"],
              ru: ["Помочь подняться и спросить всё ли хорошо", "Смеяться над ними", "Продолжить играть", "Уйти"]
            },
            correctAnswer: 0,
            explanation: { en: "Helping friends when they're hurt shows you care!", ru: "Помогать друзьям когда им больно показывает что ты заботишься!" }
          },
        ],
      ],
      medium: [
        [
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
            explanation: { en: "Walking away and telling a trusted adult is the best choice. Mean words can hurt, but you don't have to respond the same way.", ru: "Уйти и сказать взрослому — лучший выбор. Обидные слова могут ранить, но не нужно отвечать так же." }
          },
          {
            situation: { en: "You want to join a game but don't know the rules", ru: "Ты хочешь присоединиться к игре, но не знаешь правил" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask someone to explain the rules", "Just start playing your way", "Pretend you know", "Walk away"],
              ru: ["Попросить объяснить правила", "Просто начать играть по-своему", "Притвориться, что знаешь", "Уйти"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking to learn is great! It shows you want to play fairly.", ru: "Просить научить — это здорово! Это показывает, что ты хочешь играть честно." }
          },
        ],
        [
          {
            situation: { en: "Your friend is sad because they lost a game", ru: "Твой друг грустит, потому что проиграл" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Say 'Good game! Want to play again?'", "Say 'I won, you lost!'", "Ignore them", "Laugh at them"],
              ru: ["Сказать 'Хорошая игра! Хочешь сыграть ещё?'", "Сказать 'Я выиграл, ты проиграл!'", "Проигнорировать", "Смеяться над ними"]
            },
            correctAnswer: 0,
            explanation: { en: "Being a good sport means being kind whether you win or lose!", ru: "Быть хорошим игроком означает быть добрым в победе и в поражении!" }
          },
          {
            situation: { en: "You and your friend want to play different games", ru: "Вы с другом хотите играть в разные игры" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Take turns - play their game first, then yours", "Only play what you want", "Stop being friends", "Get angry"],
              ru: ["Чередоваться - сначала их игра, потом твоя", "Играть только во что ты хочешь", "Перестать дружить", "Разозлиться"]
            },
            correctAnswer: 0,
            explanation: { en: "Compromise and taking turns helps friendships grow!", ru: "Компромисс и чередование помогают дружбе расти!" }
          },
          {
            situation: { en: "Your friend forgot to bring lunch", ru: "Твой друг забыл взять обед" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Share some of your lunch with them", "Eat all your food in front of them", "Ignore the problem", "Make fun of them"],
              ru: ["Поделиться частью своего обеда", "Есть всю еду перед ними", "Проигнорировать проблему", "Смеяться над ними"]
            },
            correctAnswer: 0,
            explanation: { en: "Sharing shows kindness and caring for friends!", ru: "Делиться показывает доброту и заботу о друзьях!" }
          },
        ],
      ],
      hard: [
        [
          {
            situation: { en: "Two of your friends are fighting and both want you on their side", ru: "Двое друзей ссорятся и оба хотят, чтобы ты был на их стороне" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Try to help them talk and solve the problem", "Pick one side", "Walk away and ignore it", "Start arguing too"],
              ru: ["Попробовать помочь им поговорить и решить проблему", "Выбрать одну сторону", "Уйти и проигнорировать", "Тоже начать спорить"]
            },
            correctAnswer: 0,
            explanation: { en: "Being a peacemaker and helping friends communicate is very mature!", ru: "Быть миротворцем и помогать друзьям общаться — это очень зрело!" }
          },
          {
            situation: { en: "Your friend wants to do something you know is wrong", ru: "Твой друг хочет сделать что-то, что ты знаешь неправильно" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Explain why it's not a good idea and suggest something else", "Go along with it", "Pretend you didn't hear", "Tell everyone about it"],
              ru: ["Объяснить почему это не хорошая идея и предложить другое", "Согласиться", "Притвориться, что не слышал", "Рассказать всем об этом"]
            },
            correctAnswer: 0,
            explanation: { en: "Good friends help each other make good choices!", ru: "Хорошие друзья помогают друг другу делать правильный выбор!" }
          },
          {
            situation: { en: "You accidentally hurt your friend's feelings", ru: "Ты случайно обидел чувства друга" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Apologize and ask how you can make it better", "Blame them for being too sensitive", "Ignore it", "Make excuses"],
              ru: ["Извиниться и спросить как исправить ситуацию", "Обвинить их в излишней чувствительности", "Проигнорировать", "Оправдываться"]
            },
            correctAnswer: 0,
            explanation: { en: "A sincere apology shows you care about your friend's feelings.", ru: "Искреннее извинение показывает, что тебе важны чувства друга." }
          },
        ],
        [
          {
            situation: { en: "Your friend is spreading rumors about another kid", ru: "Твой друг распространяет слухи о другом ребёнке" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Tell your friend that rumors hurt people and ask them to stop", "Join in the gossip", "Ignore it", "Spread more rumors"],
              ru: ["Сказать другу что слухи обижают людей и попросить остановиться", "Присоединиться к сплетням", "Проигнорировать", "Распространять больше слухов"]
            },
            correctAnswer: 0,
            explanation: { en: "Standing up against rumors protects others and shows integrity.", ru: "Выступить против слухов защищает других и показывает честность." }
          },
          {
            situation: { en: "You're being left out of a group activity on purpose", ru: "Тебя специально не включают в групповое занятие" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Talk to a trusted adult about how you feel", "Get angry and yell", "Try to force your way in", "Feel like something is wrong with you"],
              ru: ["Поговорить с взрослым о своих чувствах", "Разозлиться и кричать", "Попытаться силой пробиться", "Думать что что-то не так с тобой"]
            },
            correctAnswer: 0,
            explanation: { en: "Talking to an adult can help you find a solution and feel better.", ru: "Разговор с взрослым может помочь найти решение и почувствовать себя лучше." }
          },
          {
            situation: { en: "Your best friend wants to be friends with someone you don't like", ru: "Твой лучший друг хочет дружить с кем-то, кто тебе не нравится" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Accept that your friend can have other friends too", "Tell your friend they can't be friends with that person", "Stop being their friend", "Be mean to the other person"],
              ru: ["Принять что твой друг может иметь и других друзей", "Сказать другу что они не могут дружить с тем человеком", "Перестать быть их другом", "Быть злым к другому человеку"]
            },
            correctAnswer: 0,
            explanation: { en: "Everyone can have many friends. True friendship isn't possessive.", ru: "Каждый может иметь много друзей. Настоящая дружба не собственническая." }
          },
        ],
      ],
    },
  },
  {
    category: { en: "Asking for Help", ru: "Просить помощь" },
    icon: "🙋",
    scenarios: {
      easy: [
        [
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
            situation: { en: "You can't reach something on a high shelf", ru: "Ты не можешь достать что-то с высокой полки" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask a tall person for help", "Climb on unstable furniture", "Give up", "Throw things at it"],
              ru: ["Попросить высокого человека помочь", "Залезть на неустойчивую мебель", "Сдаться", "Бросать вещи в неё"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking for help keeps you safe!", ru: "Просить о помощи — это безопасно!" }
          },
          {
            situation: { en: "You don't know how to tie your shoes", ru: "Ты не знаешь как завязать шнурки" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask someone to teach you", "Walk with untied shoes", "Get upset", "Take off your shoes"],
              ru: ["Попросить кого-то научить тебя", "Ходить с развязанными шнурками", "Расстроиться", "Снять ботинки"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking to learn something new is always a good idea!", ru: "Просить научить чему-то новому — всегда хорошая идея!" }
          },
        ],
        [
          {
            situation: { en: "You need help with your zipper", ru: "Тебе нужна помощь с молнией" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Say 'Can you help me with my zipper please?'", "Pull really hard and break it", "Stay inside all day", "Get frustrated and cry"],
              ru: ["Сказать 'Можете помочь с молнией, пожалуйста?'", "Тянуть сильно и сломать её", "Оставаться дома весь день", "Расстроиться и плакать"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking nicely is the best way to get help!", ru: "Вежливо попросить — лучший способ получить помощь!" }
          },
          {
            situation: { en: "You're thirsty but can't see any water", ru: "Ты хочешь пить, но не видишь воды" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask 'May I have some water please?'", "Stay thirsty", "Drink something you shouldn't", "Cry"],
              ru: ["Спросить 'Можно мне воды, пожалуйста?'", "Терпеть жажду", "Пить что-то что не следует", "Плакать"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking for what you need politely always works!", ru: "Вежливо просить о том что нужно — всегда работает!" }
          },
          {
            situation: { en: "You can't find your toy", ru: "Ты не можешь найти свою игрушку" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask 'Can you help me find my toy?'", "Make a mess looking for it", "Blame someone else", "Cry"],
              ru: ["Спросить 'Можешь помочь найти мою игрушку?'", "Устроить беспорядок в поисках", "Обвинить кого-то другого", "Плакать"]
            },
            correctAnswer: 0,
            explanation: { en: "Two pairs of eyes are better than one!", ru: "Две пары глаз лучше чем одна!" }
          },
        ],
      ],
      medium: [
        [
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
            situation: { en: "You feel sick at school", ru: "Тебе стало плохо в школе" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Tell your teacher you don't feel well", "Keep it to yourself", "Go home by yourself", "Pretend nothing is wrong"],
              ru: ["Сказать учителю, что тебе плохо", "Держать это в себе", "Идти домой самому", "Притворяться, что всё в порядке"]
            },
            correctAnswer: 0,
            explanation: { en: "Always tell a teacher or adult if you feel sick! They will help you feel better.", ru: "Всегда говори учителю или взрослому, если тебе плохо! Они помогут тебе почувствовать себя лучше." }
          },
          {
            situation: { en: "You don't understand the directions for an activity", ru: "Ты не понимаешь инструкции к заданию" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Raise your hand and ask for clarification", "Guess and hope for the best", "Do nothing", "Copy someone else"],
              ru: ["Поднять руку и попросить объяснить", "Угадывать и надеяться на лучшее", "Ничего не делать", "Списать у кого-то"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking questions helps you learn and do your best!", ru: "Задавать вопросы помогает учиться и делать всё возможное!" }
          },
        ],
        [
          {
            situation: { en: "You're having trouble with something on the computer", ru: "У тебя проблемы с чем-то на компьютере" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask a teacher or parent for help", "Keep clicking random things", "Give up", "Get angry at the computer"],
              ru: ["Попросить помощи у учителя или родителя", "Продолжать нажимать случайные вещи", "Сдаться", "Злиться на компьютер"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking for help with technology is smart!", ru: "Просить помощи с технологиями — это умно!" }
          },
          {
            situation: { en: "You see a friend who needs help but you can't help them yourself", ru: "Ты видишь друга которому нужна помощь, но ты сам не можешь помочь" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Find an adult who can help", "Ignore the situation", "Tell your friend they're on their own", "Pretend you didn't see"],
              ru: ["Найти взрослого который может помочь", "Проигнорировать ситуацию", "Сказать другу что они сами по себе", "Притвориться что не видел"]
            },
            correctAnswer: 0,
            explanation: { en: "Getting help for others is just as important as getting help for yourself!", ru: "Получить помощь для других так же важно как для себя!" }
          },
          {
            situation: { en: "You're afraid of something but don't want to seem scared", ru: "Ты боишься чего-то, но не хочешь показаться испуганным" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Talk to someone you trust about your fear", "Pretend you're not scared", "Avoid the thing forever", "Make fun of others who are scared"],
              ru: ["Поговорить с кем-то кому доверяешь о страхе", "Притвориться что не боишься", "Избегать этого навсегда", "Смеяться над теми кто боится"]
            },
            correctAnswer: 0,
            explanation: { en: "Everyone feels scared sometimes. Talking about it helps!", ru: "Все иногда боятся. Разговор об этом помогает!" }
          },
        ],
      ],
      hard: [
        [
          {
            situation: { en: "Someone is doing something that makes you uncomfortable", ru: "Кто-то делает что-то, что заставляет тебя чувствовать себя некомфортно" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Tell a trusted adult right away", "Keep it to yourself", "Think it's your fault", "Wait to see if it happens again"],
              ru: ["Сразу сказать взрослому которому доверяешь", "Держать это в себе", "Думать что это твоя вина", "Ждать повторится ли это"]
            },
            correctAnswer: 0,
            explanation: { en: "Always tell a trusted adult if something makes you uncomfortable. You're not in trouble.", ru: "Всегда говори взрослому если что-то заставляет чувствовать себя некомфортно. Ты не виноват." }
          },
          {
            situation: { en: "You're feeling very sad and don't know why", ru: "Тебе очень грустно и ты не знаешь почему" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Talk to someone about how you feel", "Keep your feelings inside", "Pretend to be happy", "Blame yourself for being sad"],
              ru: ["Поговорить с кем-то о своих чувствах", "Держать чувства в себе", "Притворяться счастливым", "Винить себя за грусть"]
            },
            correctAnswer: 0,
            explanation: { en: "Talking about feelings helps! It's okay to feel sad sometimes.", ru: "Разговор о чувствах помогает! Грустить иногда — это нормально." }
          },
          {
            situation: { en: "You made a big mistake and feel terrible about it", ru: "Ты совершил большую ошибку и чувствуешь себя ужасно" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Tell an adult and ask for help fixing it", "Hide what happened", "Blame someone else", "Be too hard on yourself"],
              ru: ["Сказать взрослому и попросить помощи исправить", "Скрыть что произошло", "Обвинить кого-то другого", "Быть слишком строгим к себе"]
            },
            correctAnswer: 0,
            explanation: { en: "Mistakes happen. Adults can help you learn from them and fix things.", ru: "Ошибки случаются. Взрослые могут помочь учиться на них и исправлять." }
          },
        ],
        [
          {
            situation: { en: "You notice a friend is being hurt by someone", ru: "Ты замечаешь что друга обижает кто-то" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Tell a trusted adult immediately", "Try to handle it yourself", "Mind your own business", "Wait to see what happens"],
              ru: ["Немедленно сказать взрослому которому доверяешь", "Попытаться справиться самому", "Не вмешиваться", "Ждать что будет"]
            },
            correctAnswer: 0,
            explanation: { en: "Getting adult help for serious situations is the right thing to do.", ru: "Получить помощь взрослого в серьёзных ситуациях — это правильно." }
          },
          {
            situation: { en: "You're struggling with schoolwork and falling behind", ru: "Тебе тяжело с учёбой и ты отстаёшь" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Ask your teacher or parent for extra help", "Give up on trying", "Hide your struggles", "Think you're not smart enough"],
              ru: ["Попросить учителя или родителя о дополнительной помощи", "Сдаться", "Скрывать трудности", "Думать что ты недостаточно умный"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking for help shows strength, not weakness!", ru: "Просить о помощи показывает силу, а не слабость!" }
          },
          {
            situation: { en: "You're in an emergency and need help right away", ru: "Ты в экстренной ситуации и нуждаешься в помощи прямо сейчас" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Find any adult immediately and clearly explain the emergency", "Try to handle it alone", "Wait for someone to notice", "Be too shy to ask for help"],
              ru: ["Найти любого взрослого немедленно и чётко объяснить экстренную ситуацию", "Попытаться справиться одному", "Ждать пока кто-то заметит", "Стесняться просить о помощи"]
            },
            correctAnswer: 0,
            explanation: { en: "In emergencies, getting adult help quickly is the most important thing.", ru: "В экстренных ситуациях быстро получить помощь взрослого — самое важное." }
          },
        ],
      ],
    },
  },
  {
    category: { en: "Taking Turns", ru: "Очередность" },
    icon: "🔄",
    scenarios: {
      easy: [
        [
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
            situation: { en: "You want to go down the slide but someone is on it", ru: "Ты хочешь скатиться с горки, но там кто-то есть" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Wait for them to finish", "Push them", "Climb up anyway", "Go home upset"],
              ru: ["Подождать пока они закончат", "Толкнуть их", "Залезть всё равно", "Пойти домой расстроенным"]
            },
            correctAnswer: 0,
            explanation: { en: "Waiting your turn keeps everyone safe and happy!", ru: "Ждать своей очереди — безопасно и делает всех счастливыми!" }
          },
          {
            situation: { en: "It's time to wash hands but there's a line", ru: "Пора мыть руки, но там очередь" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Wait in line for your turn", "Push to the front", "Skip washing hands", "Complain loudly"],
              ru: ["Ждать в очереди", "Пробраться вперёд", "Не мыть руки", "Громко жаловаться"]
            },
            correctAnswer: 0,
            explanation: { en: "Standing in line shows respect for others!", ru: "Стоять в очереди — это уважение к другим!" }
          },
        ],
        [
          {
            situation: { en: "You and your sibling both want the last cookie", ru: "Вы с братом/сестрой оба хотите последнее печенье" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Share it by splitting in half", "Take it all for yourself", "Fight for it", "Throw it away"],
              ru: ["Поделить пополам", "Взять всё себе", "Драться за него", "Выбросить"]
            },
            correctAnswer: 0,
            explanation: { en: "Sharing is fair and kind!", ru: "Делиться — это честно и добро!" }
          },
          {
            situation: { en: "Everyone wants to be first in line", ru: "Все хотят быть первыми в очереди" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Take turns being first on different days", "Push to be first", "Cry about it", "Never get in line"],
              ru: ["По очереди быть первым в разные дни", "Пробиваться вперёд", "Плакать из-за этого", "Никогда не вставать в очередь"]
            },
            correctAnswer: 0,
            explanation: { en: "Taking turns being first is fair for everyone!", ru: "Чередоваться быть первым — честно для всех!" }
          },
          {
            situation: { en: "You're waiting for the water fountain", ru: "Ты ждёшь у питьевого фонтанчика" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Wait patiently behind the person drinking", "Tell them to hurry up", "Push them away", "Give up and leave"],
              ru: ["Терпеливо ждать позади человека который пьёт", "Сказать им торопиться", "Оттолкнуть их", "Сдаться и уйти"]
            },
            correctAnswer: 0,
            explanation: { en: "Patience is a superpower! Everyone needs water.", ru: "Терпение — это суперсила! Всем нужна вода." }
          },
        ],
      ],
      medium: [
        [
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
          },
          {
            situation: { en: "During a game, someone keeps taking extra turns", ru: "Во время игры кто-то берёт лишние ходы" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Kindly remind them about the rules", "Start cheating too", "Quit the game angrily", "Let them keep cheating"],
              ru: ["Вежливо напомнить о правилах", "Тоже начать жульничать", "Выйти из игры со злостью", "Позволить им продолжать жульничать"]
            },
            correctAnswer: 0,
            explanation: { en: "A friendly reminder helps everyone play fairly!", ru: "Дружеское напоминание помогает всем играть честно!" }
          },
        ],
        [
          {
            situation: { en: "Your family is deciding where to go for dinner", ru: "Ваша семья решает куда пойти ужинать" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Share your idea and listen to others' ideas too", "Demand to go where you want", "Refuse to eat anywhere else", "Get upset if not chosen"],
              ru: ["Поделиться своей идеей и выслушать идеи других", "Требовать пойти куда ты хочешь", "Отказаться есть где-то ещё", "Расстроиться если не выбрали"]
            },
            correctAnswer: 0,
            explanation: { en: "Everyone's opinion matters! Sharing and listening is respectful.", ru: "Мнение каждого важно! Делиться и слушать — это уважительно." }
          },
          {
            situation: { en: "Two people want to use the same computer at the same time", ru: "Два человека хотят использовать один компьютер одновременно" },
            question: { en: "What's a fair solution?", ru: "Какое справедливое решение?" },
            options: {
              en: ["Set a timer and take turns", "Fight over it", "One person never gets to use it", "Break the computer"],
              ru: ["Поставить таймер и чередоваться", "Драться за него", "Один человек никогда не пользуется", "Сломать компьютер"]
            },
            correctAnswer: 0,
            explanation: { en: "Using a timer makes sure everyone gets equal time!", ru: "Таймер гарантирует что у всех будет равное время!" }
          },
          {
            situation: { en: "You've been waiting for your turn a long time", ru: "Ты уже долго ждёшь своей очереди" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Politely ask if it's almost your turn", "Push ahead", "Give up and leave", "Complain loudly"],
              ru: ["Вежливо спросить скоро ли твоя очередь", "Пробраться вперёд", "Сдаться и уйти", "Громко жаловаться"]
            },
            correctAnswer: 0,
            explanation: { en: "Asking politely is always the right approach!", ru: "Вежливо спросить — всегда правильный подход!" }
          },
        ],
      ],
      hard: [
        [
          {
            situation: { en: "Someone cuts in front of you in line", ru: "Кто-то влез перед тобой в очереди" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Politely say 'Excuse me, I was in line before you'", "Push them out of the way", "Cut in front of someone else", "Yell at them"],
              ru: ["Вежливо сказать 'Извините, я был в очереди раньше вас'", "Вытолкнуть их", "Влезть перед кем-то другим", "Кричать на них"]
            },
            correctAnswer: 0,
            explanation: { en: "Speaking up politely is the right thing to do!", ru: "Вежливо сказать — это правильно!" }
          },
          {
            situation: { en: "Your younger sibling doesn't want to wait their turn", ru: "Твой младший брат/сестра не хочет ждать своей очереди" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Help them understand why taking turns is important", "Let them always go first", "Get angry at them", "Never play with them again"],
              ru: ["Помочь им понять почему очерёдность важна", "Всегда позволять им идти первыми", "Злиться на них", "Никогда больше не играть с ними"]
            },
            correctAnswer: 0,
            explanation: { en: "Teaching others about fairness helps everyone!", ru: "Учить других честности помогает всем!" }
          },
          {
            situation: { en: "You've been waiting in line but suddenly have to leave", ru: "Ты ждал в очереди но вдруг нужно уйти" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Accept you'll have to wait again when you come back", "Ask someone to save your spot", "Get upset about losing your place", "Cut in line when you return"],
              ru: ["Принять что придётся ждать снова когда вернёшься", "Попросить кого-то сохранить место", "Расстроиться из-за потери места", "Влезть в очередь когда вернёшься"]
            },
            correctAnswer: 0,
            explanation: { en: "Sometimes we have to start over, and that's okay!", ru: "Иногда приходится начинать сначала, и это нормально!" }
          },
        ],
        [
          {
            situation: { en: "You notice someone never gets a turn because they're shy", ru: "Ты замечаешь что кто-то никогда не получает очередь потому что стесняется" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Invite them to take a turn", "Ignore the situation", "Take their turn for yourself", "Point out they're shy"],
              ru: ["Пригласить их сделать ход", "Проигнорировать ситуацию", "Взять их очередь себе", "Указать что они стесняются"]
            },
            correctAnswer: 0,
            explanation: { en: "Including everyone makes activities more fun for all!", ru: "Включать всех делает занятия веселее для всех!" }
          },
          {
            situation: { en: "You want to keep playing but it's time to let someone else have a turn", ru: "Ты хочешь продолжать играть но пора уступить очередь другому" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Stop gracefully and let them play", "Keep playing anyway", "Say 'just one more minute' over and over", "Get upset about stopping"],
              ru: ["Остановиться с достоинством и позволить им играть", "Продолжать играть всё равно", "Говорить 'ещё минутку' снова и снова", "Расстроиться из-за остановки"]
            },
            correctAnswer: 0,
            explanation: { en: "Being a good sport means sharing time fairly!", ru: "Быть хорошим игроком значит честно делить время!" }
          },
          {
            situation: { en: "During a group project, everyone wants to do the fun part", ru: "Во время группового проекта все хотят делать весёлую часть" },
            question: { en: "What should you do?", ru: "Что тебе следует сделать?" },
            options: {
              en: ["Suggest splitting the fun parts fairly among everyone", "Do all the fun parts yourself", "Only do the fun parts", "Refuse to do any other parts"],
              ru: ["Предложить честно разделить весёлые части между всеми", "Сделать все весёлые части самому", "Делать только весёлые части", "Отказаться делать другие части"]
            },
            correctAnswer: 0,
            explanation: { en: "Fair distribution makes teamwork better!", ru: "Честное распределение делает командную работу лучше!" }
          },
        ],
      ],
    },
  },
];

const SocialScenarios = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { playCorrect, playIncorrect, playComplete, playClick } = useSoundEffects();

  // Get random scenarios based on difficulty and category
  const currentScenarios = useMemo(() => {
    if (selectedCategory === null || !difficulty) return [];
    const categoryData = socialScenarioData[selectedCategory];
    const groups = categoryData.scenarios[difficulty];
    const randomGroup = getRandomElement(groups);
    return selectRandomTasks(randomGroup, 3);
  }, [selectedCategory, difficulty]);

  const randomVideos = useMemo(() => getRandomVideos(socialVideos, 2), []);

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
    watchVideos: { en: "Watch Learning Videos", ru: "Смотреть обучающие видео" },
    hideVideos: { en: "Hide Videos", ru: "Скрыть видео" },
    back: { en: "Back", ru: "Назад" },
  };

  const handleSelect = (index: number) => {
    if (showResult) return;
    playClick();
    setSelected(index);
    setShowResult(true);

    const scenario = currentScenarios[currentScenario];
    if (index === scenario?.correctAnswer) {
      setScore(score + 1);
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  const handleNext = () => {
    if (currentScenario < currentScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      setShowCelebration(true);
      playComplete();
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setShowVideos(false);
    setDifficulty(null);
    setSelectedCategory(null);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentScenario(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setShowVideos(false);
  };

  const handleDifficultySelect = (newDifficulty: DifficultyLevel) => {
    playClick();
    setDifficulty(newDifficulty);
  };

  const handleBack = () => {
    saveScrollPosition('/');
    navigate(-1);
  };

  return (
    <>
      <CelebrationAnimation show={showCelebration} onComplete={() => setShowCelebration(false)} />
      <Helmet>
        <title>{texts.title[language]} - CalmStep</title>
        <meta name="description" content="Practice real-life social scenarios including school situations, making friends, and asking for help." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 py-8 pt-24">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Button variant="ghost" className="mb-4" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {texts.back[language]}
            </Button>

            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-6xl block mb-4">🤝</span>
              <h1 className="text-3xl font-bold text-foreground mb-2">{texts.title[language]}</h1>
              <p className="text-muted-foreground">{texts.subtitle[language]}</p>
            </div>

            {/* Show difficulty selector first if not selected */}
            {!difficulty ? (
              <Card className="bg-card border-calm/20">
                <CardContent className="p-6">
                  <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultySelect} />
                </CardContent>
              </Card>
            ) : selectedCategory === null ? (
              // Category selection
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4 text-center">{texts.chooseCategory[language]}</h2>
                
                <div className="mb-6">
                  <DifficultySelector selectedDifficulty={difficulty} onSelect={handleDifficultySelect} />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {socialScenarioData.map((category, index) => (
                    <Card 
                      key={index}
                      className="bg-calm-light border-calm/20 cursor-pointer hover:border-calm/40 transition-all hover:scale-[1.02]"
                      onClick={() => {
                        playClick();
                        setSelectedCategory(index);
                      }}
                    >
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center">
                          <span className="text-4xl">{category.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{category.category[language]}</h3>
                          <p className="text-sm text-muted-foreground">3 {texts.scenarios[language]}</p>
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
                    {texts.score[language]}: {score}/{currentScenarios.length}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" onClick={handleBackToCategories}>
                      {texts.backToCategories[language]}
                    </Button>
                    <Button onClick={handleRestart} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      {texts.restart[language]}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowVideos(!showVideos)}
                      className="gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      {showVideos ? texts.hideVideos[language] : texts.watchVideos[language]}
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
                      const category = socialScenarioData[selectedCategory];
                      const scenario = currentScenarios[currentScenario];
                      if (!scenario) return null;
                      
                      return (
                        <>
                          <div className="text-center mb-6 mt-4">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <span className="text-2xl">{category.icon}</span>
                              <h3 className="text-lg font-semibold text-foreground">{category.category[language]}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground">{currentScenario + 1} / {currentScenarios.length}</p>
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