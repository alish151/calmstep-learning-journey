import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ru";

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

export const translations: Translations = {
  // Header
  "nav.home": { en: "Home", ru: "Главная" },
  "nav.howItWorks": { en: "How It Works", ru: "Как это работает" },
  "nav.learning": { en: "Learning", ru: "Обучение" },
  "nav.forParents": { en: "For Parents", ru: "Для родителей" },
  "nav.progress": { en: "Progress", ru: "Прогресс" },
  "nav.more": { en: "More", ru: "Ещё" },
  "nav.moreModules": { en: "More Modules", ru: "Другие модули" },
  "nav.socialScenarios": { en: "Social", ru: "Социальное" },
  "btn.startLearning": { en: "Start Learning", ru: "Начать обучение" },
  
  // Hero Section
  "hero.badge": { en: "Safe & Supportive Learning", ru: "Безопасное и поддерживающее обучение" },
  "hero.title1": { en: "Calm steps toward", ru: "Спокойные шаги к" },
  "hero.title2": { en: "learning", ru: "обучению" },
  "hero.subtitle": { 
    en: "A gentle learning space designed for children with autism. No timers, no pressure, no grades — just learning at your own comfortable pace.",
    ru: "Мягкое пространство для обучения, созданное для детей с аутизмом. Без таймеров, без давления, без оценок — просто обучение в комфортном темпе."
  },
  "hero.learnHow": { en: "Learn How It Works", ru: "Узнать, как это работает" },
  "hero.trustedBy": { en: "Trusted by families and educators", ru: "Доверяют семьи и педагоги" },
  "hero.families": { en: "1000+ Families", ru: "1000+ семей" },
  "hero.educators": { en: "200+ Educators", ru: "200+ педагогов" },
  "hero.childFirst": { en: "Child-First", ru: "Ребёнок прежде всего" },
  
  // How It Works
  "how.badge": { en: "How It Works", ru: "Как это работает" },
  "how.title": { en: "Learning designed with care", ru: "Обучение с заботой" },
  "how.subtitle": {
    en: "Every aspect of CalmStep is thoughtfully created to provide a safe, comfortable, and effective learning experience.",
    ru: "Каждый аспект CalmStep создан с заботой для безопасного, комфортного и эффективного обучения."
  },
  "how.personalProfile": { en: "Personal Profile", ru: "Личный профиль" },
  "how.personalProfileDesc": {
    en: "Create a unique profile with preferred colors, sounds, and learning pace that feels just right.",
    ru: "Создайте уникальный профиль с любимыми цветами, звуками и темпом обучения."
  },
  "how.microLessons": { en: "Micro-Lessons", ru: "Микро-уроки" },
  "how.microLessonsDesc": {
    en: "Short 1-2 minute lessons that fit naturally into any routine without feeling overwhelming.",
    ru: "Короткие уроки по 1-2 минуты, которые легко вписываются в любой распорядок дня."
  },
  "how.noPressure": { en: "No Pressure", ru: "Без давления" },
  "how.noPressureDesc": {
    en: "No grades, no comparisons, no timers. Just gentle encouragement and celebrating small wins.",
    ru: "Без оценок, без сравнений, без таймеров. Только мягкая поддержка и празднование маленьких побед."
  },
  "how.adaptiveLearning": { en: "Adaptive Learning", ru: "Адаптивное обучение" },
  "how.adaptiveLearningDesc": {
    en: "AI-powered adjustments that respond to comfort levels and learning preferences in real-time.",
    ru: "ИИ-адаптация, которая реагирует на уровень комфорта и предпочтения в обучении в реальном времени."
  },
  "how.everyChild": { en: "Every child learns differently", ru: "Каждый ребёнок учится по-своему" },
  "how.everyChildDesc": {
    en: "CalmStep adapts to each child's unique needs. Our AI gently adjusts difficulty, detects signs of overload, and creates personalized learning paths — always supporting, never replacing, the guidance of teachers and parents.",
    ru: "CalmStep адаптируется к уникальным потребностям каждого ребёнка. Наш ИИ мягко регулирует сложность, определяет признаки перегрузки и создаёт персонализированные пути обучения."
  },
  
  // Learning Modules
  "learning.badge": { en: "Learning Modules", ru: "Модули обучения" },
  "learning.title": { en: "Explore at your own pace", ru: "Изучайте в своём темпе" },
  "learning.subtitle": {
    en: "Four carefully designed learning areas, each with activities that adapt to your child's comfort and interests.",
    ru: "Четыре тщательно разработанные области обучения, каждая с активностями, адаптированными к комфорту и интересам вашего ребёнка."
  },
  "learning.module": { en: "Learning module", ru: "Модуль обучения" },
  "learning.explore": { en: "Explore module", ru: "Изучить модуль" },
  "learning.math": { en: "Math", ru: "Математика" },
  "learning.mathDesc": {
    en: "Shapes, counting, and number recognition through visual and tactile activities.",
    ru: "Фигуры, счёт и распознавание чисел через визуальные и тактильные активности."
  },
  "learning.mathTopic1": { en: "Counting objects", ru: "Счёт предметов" },
  "learning.mathTopic2": { en: "Shape recognition", ru: "Распознавание фигур" },
  "learning.mathTopic3": { en: "Simple patterns", ru: "Простые паттерны" },
  "learning.reading": { en: "Reading", ru: "Чтение" },
  "learning.readingDesc": {
    en: "Connect images to words to sounds in a gentle, multi-sensory approach.",
    ru: "Связь изображений со словами и звуками в мягком, мультисенсорном подходе."
  },
  "learning.readingTopic1": { en: "Image-word matching", ru: "Сопоставление картинок и слов" },
  "learning.readingTopic2": { en: "Phonics basics", ru: "Основы фонетики" },
  "learning.readingTopic3": { en: "Story time", ru: "Время сказок" },
  "learning.logic": { en: "Logic", ru: "Логика" },
  "learning.logicDesc": {
    en: "Find patterns, sort objects, and develop problem-solving skills playfully.",
    ru: "Находите закономерности, сортируйте предметы и развивайте навыки решения задач в игровой форме."
  },
  "learning.logicTopic1": { en: "Finding similarities", ru: "Поиск сходств" },
  "learning.logicTopic2": { en: "Sorting games", ru: "Игры на сортировку" },
  "learning.logicTopic3": { en: "Simple puzzles", ru: "Простые головоломки" },
  "learning.emotions": { en: "Emotions", ru: "Эмоции" },
  "learning.emotionsDesc": {
    en: "Recognize, understand, and express feelings in a safe environment.",
    ru: "Распознавайте, понимайте и выражайте чувства в безопасной среде."
  },
  "learning.emotionsTopic1": { en: "Feeling identification", ru: "Определение чувств" },
  "learning.emotionsTopic2": { en: "Emotion cards", ru: "Карточки эмоций" },
  "learning.emotionsTopic3": { en: "Calm strategies", ru: "Стратегии успокоения" },
  "learning.socialScenarios": { en: "Social Scenarios", ru: "Социальные сценарии" },
  "learning.practiceReal": { en: "Practice real-life situations safely", ru: "Безопасно практикуйте жизненные ситуации" },
  "learning.socialDesc": {
    en: "Interactive scenarios help children practice communication, asking for help, and navigating school situations — all in a safe environment with no failure states or punishment.",
    ru: "Интерактивные сценарии помогают детям практиковать общение, просьбы о помощи и навигацию в школьных ситуациях — в безопасной среде без неудач и наказаний."
  },
  "learning.schoolSituations": { en: "School situations", ru: "Школьные ситуации" },
  "learning.makingFriends": { en: "Making friends", ru: "Заводим друзей" },
  "learning.askingHelp": { en: "Asking for help", ru: "Просим о помощи" },
  "learning.takingTurns": { en: "Taking turns", ru: "По очереди" },
  
  // Virtual Assistant
  "assistant.badge": { en: "Virtual Assistant", ru: "Виртуальный помощник" },
  "assistant.title": { en: "A calm friend by your side", ru: "Спокойный друг рядом с тобой" },
  "assistant.subtitle": {
    en: "Meet your child's supportive companion — a gentle virtual assistant that uses calming, reassuring language and never pressures or judges.",
    ru: "Познакомьтесь с поддерживающим компаньоном вашего ребёнка — мягким виртуальным помощником, который использует успокаивающий язык и никогда не давит и не осуждает."
  },
  "assistant.soundEnabled": { en: "Sound enabled", ru: "Звук включён" },
  "assistant.soundDisabled": { en: "Sound disabled", ru: "Звук выключен" },
  "assistant.soundOff": { en: "Sounds can be turned off at any time", ru: "Звуки можно отключить в любое время" },
  "assistant.keyFeatures": { en: "Key features:", ru: "Ключевые особенности:" },
  "assistant.feature1": { en: "Neutral, supportive phrases only", ru: "Только нейтральные, поддерживающие фразы" },
  "assistant.feature2": { en: "Never uses negative language", ru: "Никогда не использует негативный язык" },
  "assistant.feature3": { en: "Encourages breaks when needed", ru: "Поощряет перерывы когда нужно" },
  "assistant.feature4": { en: "Celebrates effort, not just results", ru: "Отмечает усилия, а не только результаты" },
  "assistant.phrase1": { en: "You can try again whenever you're ready 💙", ru: "Ты можешь попробовать снова, когда будешь готов 💙" },
  "assistant.phrase2": { en: "Let's take a little break together", ru: "Давай вместе немного отдохнём" },
  "assistant.phrase3": { en: "Everything is okay, you're doing great", ru: "Всё хорошо, ты молодец" },
  "assistant.phrase4": { en: "There's no rush — we have all the time we need", ru: "Не торопись — у нас есть всё время" },
  "assistant.inputPlaceholder": { en: "Your child can respond at their own pace...", ru: "Ваш ребёнок может отвечать в своём темпе..." },
  
  // Parent Dashboard
  "parents.badge": { en: "For Parents & Educators", ru: "Для родителей и педагогов" },
  "parents.title": { en: "Stay connected, stress-free", ru: "Оставайтесь на связи без стресса" },
  "parents.subtitle": {
    en: "A dedicated dashboard that helps you understand your child's progress and comfort level — without the pressure of traditional grades.",
    ru: "Специальная панель управления поможет вам понять прогресс и уровень комфорта вашего ребёнка — без давления традиционных оценок."
  },
  "parents.progressTracking": { en: "Progress Tracking", ru: "Отслеживание прогресса" },
  "parents.progressTrackingDesc": {
    en: "See your child's journey without grades or scores — just gentle milestones and achievements.",
    ru: "Смотрите путь вашего ребёнка без оценок — только мягкие вехи и достижения."
  },
  "parents.interestInsights": { en: "Interest Insights", ru: "Аналитика интересов" },
  "parents.interestInsightsDesc": {
    en: "Discover what topics spark your child's curiosity and where they feel most comfortable.",
    ru: "Узнайте, какие темы вызывают любопытство вашего ребёнка и где ему наиболее комфортно."
  },
  "parents.recommendations": { en: "Gentle Recommendations", ru: "Мягкие рекомендации" },
  "parents.recommendationsDesc": {
    en: "Receive personalized suggestions based on your child's learning patterns and preferences.",
    ru: "Получайте персонализированные предложения на основе паттернов и предпочтений вашего ребёнка."
  },
  "parents.privacy": { en: "Privacy First", ru: "Приватность прежде всего" },
  "parents.privacyDesc": {
    en: "All data stays local and private. We never share or sell any information.",
    ru: "Все данные остаются локальными и приватными. Мы никогда не делимся информацией."
  },
  "parents.emmaProgress": { en: "Emma's Progress", ru: "Прогресс Эммы" },
  "parents.weekSummary": { en: "This week's summary", ru: "Итоги недели" },
  "parents.viewDetails": { en: "View Details", ru: "Подробнее" },
  "parents.sessionsWeek": { en: "Sessions this week", ru: "Сессий на этой неделе" },
  "parents.comfortablePace": { en: "Comfortable pace ✓", ru: "Комфортный темп ✓" },
  "parents.favoriteTopic": { en: "Favorite topic", ru: "Любимая тема" },
  "parents.shapes": { en: "Shapes", ru: "Фигуры" },
  "parents.inMathModule": { en: "In Math module", ru: "В модуле Математика" },
  "parents.comfortLevel": { en: "Comfort level", ru: "Уровень комфорта" },
  "parents.high": { en: "High", ru: "Высокий" },
  "parents.gentleSuggestion": { en: "Gentle suggestion", ru: "Мягкое предложение" },
  "parents.suggestionText": {
    en: "Emma has shown interest in patterns. Consider trying the \"Pattern Matching\" activity in the Logic module when she feels ready.",
    ru: "Эмма проявила интерес к паттернам. Попробуйте активность \"Сопоставление паттернов\" в модуле Логика, когда она будет готова."
  },
  
  // AI Section
  "ai.badge": { en: "Powered by AI", ru: "На основе ИИ" },
  "ai.title": { en: "Smart support, gentle guidance", ru: "Умная поддержка, мягкое руководство" },
  "ai.subtitle": {
    en: "Our AI works quietly in the background, making learning smoother and more comfortable — always supporting, never replacing, the care of teachers and parents.",
    ru: "Наш ИИ работает незаметно в фоновом режиме, делая обучение более плавным и комфортным — всегда поддерживая, но никогда не заменяя заботу учителей и родителей."
  },
  "ai.adaptiveDifficulty": { en: "Adaptive Difficulty", ru: "Адаптивная сложность" },
  "ai.adaptiveDifficultyDesc": {
    en: "Automatically adjusts lesson complexity based on your child's responses and comfort level.",
    ru: "Автоматически регулирует сложность уроков на основе ответов и уровня комфорта вашего ребёнка."
  },
  "ai.overloadDetection": { en: "Overload Detection", ru: "Определение перегрузки" },
  "ai.overloadDetectionDesc": {
    en: "Recognizes signs of cognitive or sensory overload and suggests calming breaks.",
    ru: "Распознаёт признаки когнитивной или сенсорной перегрузки и предлагает успокаивающие перерывы."
  },
  "ai.personalizedPaths": { en: "Personalized Paths", ru: "Персональные пути" },
  "ai.personalizedPathsDesc": {
    en: "Creates unique learning journeys tailored to each child's interests and learning style.",
    ru: "Создаёт уникальные пути обучения, адаптированные к интересам и стилю обучения каждого ребёнка."
  },
  "ai.howAIHelps": { en: "How AI Helps", ru: "Как помогает ИИ" },
  "ai.observes": { en: "Observes", ru: "Наблюдает" },
  "ai.adapts": { en: "Adapts", ru: "Адаптирует" },
  "ai.supports": { en: "Supports", ru: "Поддерживает" },
  "ai.trustMessage": {
    en: "\"AI as a supportive assistant, not a replacement for human connection\"",
    ru: "\"ИИ как поддерживающий помощник, а не замена человеческой связи\""
  },
  
  // Footer
  "footer.description": {
    en: "A gentle learning space designed for children with autism. Learning at your own pace, without pressure.",
    ru: "Мягкое пространство для обучения, созданное для детей с аутизмом. Обучение в своём темпе, без давления."
  },
  "footer.product": { en: "Product", ru: "Продукт" },
  "footer.resources": { en: "Resources", ru: "Ресурсы" },
  "footer.company": { en: "Company", ru: "Компания" },
  "footer.howItWorks": { en: "How It Works", ru: "Как это работает" },
  "footer.learningModules": { en: "Learning Modules", ru: "Модули обучения" },
  "footer.forParents": { en: "For Parents", ru: "Для родителей" },
  "footer.accessibility": { en: "Accessibility", ru: "Доступность" },
  "footer.gettingStarted": { en: "Getting Started", ru: "Начало работы" },
  "footer.tipsForParents": { en: "Tips for Parents", ru: "Советы для родителей" },
  "footer.educatorGuide": { en: "Educator Guide", ru: "Руководство для педагогов" },
  "footer.faq": { en: "FAQ", ru: "ЧаВо" },
  "footer.aboutUs": { en: "About Us", ru: "О нас" },
  "footer.ourMission": { en: "Our Mission", ru: "Наша миссия" },
  "footer.privacyPolicy": { en: "Privacy Policy", ru: "Политика конфиденциальности" },
  "footer.contact": { en: "Contact", ru: "Контакты" },
  "footer.copyright": { en: "CalmStep. Made with care for every child.", ru: "CalmStep. Создано с заботой о каждом ребёнке." },
  "footer.designedFor": { en: "Designed with", ru: "Создано с" },
  "footer.neurodiversity": { en: "for neurodiversity", ru: "для нейроразнообразия" },
  
  // Learning Module Page
  "module.back": { en: "Back to Home", ru: "На главную" },
  "module.askQuestion": { en: "Ask a question about", ru: "Задай вопрос о" },
  "module.placeholder": { en: "Type your question here...", ru: "Напиши свой вопрос здесь..." },
  "module.send": { en: "Send", ru: "Отправить" },
  "module.thinking": { en: "Thinking...", ru: "Думаю..." },
  "module.tryActivity": { en: "Try an activity", ru: "Попробуй активность" },
  "module.activities": { en: "Activities", ru: "Активности" },
  
  // Toast messages
  "toast.welcome": { en: "Welcome to CalmStep! 🌟", ru: "Добро пожаловать в CalmStep! 🌟" },
  "toast.welcomeDesc": { en: "Learning modules coming soon. Take your time exploring!", ru: "Модули обучения скоро появятся. Изучайте не торопясь!" },
  "toast.apiKeyMissing": { en: "Please add your OpenAI API key in src/lib/ai-config.ts", ru: "Пожалуйста, добавьте ваш API-ключ OpenAI в src/lib/ai-config.ts" },
  
  // Common
  "common.back": { en: "Back", ru: "Назад" },
  
  // Modules
  "modules.math": { en: "Math", ru: "Математика" },
  "modules.reading": { en: "Reading", ru: "Чтение" },
  "modules.logic": { en: "Logic", ru: "Логика" },
  "modules.emotions": { en: "Emotions", ru: "Эмоции" },
  "modules.social": { en: "Social", ru: "Социальные навыки" },
  
  // Progress Dashboard
  "progress.pageTitle": { en: "Progress Dashboard", ru: "Панель прогресса" },
  "progress.pageDescription": { en: "View your child's learning progress and achievements", ru: "Просмотр прогресса и достижений вашего ребёнка" },
  "progress.title": { en: "Learning Journey", ru: "Путь обучения" },
  "progress.subtitle": { en: "Celebrate every step of your child's unique learning adventure — no pressure, just progress.", ru: "Празднуйте каждый шаг уникального пути обучения вашего ребёнка — без давления, только прогресс." },
  "progress.tasksCompleted": { en: "Tasks Completed", ru: "Выполнено заданий" },
  "progress.totalSessions": { en: "Total Sessions", ru: "Всего сессий" },
  "progress.achievementsUnlocked": { en: "Achievements", ru: "Достижения" },
  "progress.moduleProgress": { en: "Progress by Module", ru: "Прогресс по модулям" },
  "progress.notYet": { en: "Not started yet", ru: "Ещё не начато" },
  "progress.today": { en: "Today", ru: "Сегодня" },
  "progress.yesterday": { en: "Yesterday", ru: "Вчера" },
  "progress.daysAgo": { en: "days ago", ru: "дней назад" },
  "progress.completed": { en: "Completed", ru: "Выполнено" },
  "progress.tasks": { en: "tasks", ru: "заданий" },
  "progress.continue": { en: "Continue Learning", ru: "Продолжить обучение" },
  "progress.achievements": { en: "Achievements", ru: "Достижения" },
  "progress.unlocked": { en: "Unlocked!", ru: "Получено!" },
  "progress.resetInfo": { en: "Want to start fresh? You can reset all progress here.", ru: "Хотите начать заново? Вы можете сбросить весь прогресс здесь." },
  "progress.resetButton": { en: "Reset Progress", ru: "Сбросить прогресс" },
  "progress.resetConfirm": { en: "Are you sure you want to reset all progress? This cannot be undone.", ru: "Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить." },
  
  // Achievements
  "achievements.firstStep": { en: "First Step", ru: "Первый шаг" },
  "achievements.firstStepDesc": { en: "Complete your first activity", ru: "Выполните первое задание" },
  "achievements.explorer": { en: "Explorer", ru: "Исследователь" },
  "achievements.explorerDesc": { en: "Try activities in 3 different modules", ru: "Попробуйте задания в 3 разных модулях" },
  "achievements.consistent": { en: "Steady Pace", ru: "Стабильный темп" },
  "achievements.consistentDesc": { en: "Complete 5 activities", ru: "Выполните 5 заданий" },
  "achievements.dedicated": { en: "Dedicated Learner", ru: "Преданный ученик" },
  "achievements.dedicatedDesc": { en: "Complete 10 activities", ru: "Выполните 10 заданий" },
  "achievements.superStar": { en: "Super Star", ru: "Суперзвезда" },
  "achievements.superStarDesc": { en: "Complete 15 activities", ru: "Выполните 15 заданий" },
  "achievements.achiever": { en: "High Achiever", ru: "Высокий достиженец" },
  "achievements.achieverDesc": { en: "Complete 20 activities", ru: "Выполните 20 заданий" },
  "achievements.champion": { en: "Learning Champion", ru: "Чемпион обучения" },
  "achievements.championDesc": { en: "Complete 25 activities", ru: "Выполните 25 заданий" },
  "achievements.legend": { en: "Learning Legend", ru: "Легенда обучения" },
  "achievements.legendDesc": { en: "Complete 50 activities", ru: "Выполните 50 заданий" },
  "achievements.master": { en: "Grand Master", ru: "Великий мастер" },
  "achievements.masterDesc": { en: "Complete 100 activities", ru: "Выполните 100 заданий" },
  "achievements.allRounder": { en: "Well-Rounded", ru: "Всесторонний" },
  "achievements.allRounderDesc": { en: "Complete 5 activities in each module", ru: "Выполните по 5 заданий в каждом модуле" },
  "achievements.mathWhiz": { en: "Math Whiz", ru: "Знаток математики" },
  "achievements.mathWhizDesc": { en: "Complete 10 math activities", ru: "Выполните 10 заданий по математике" },
  "achievements.bookworm": { en: "Bookworm", ru: "Книжный червь" },
  "achievements.bookwormDesc": { en: "Complete 10 reading activities", ru: "Выполните 10 заданий по чтению" },
  "achievements.puzzlePro": { en: "Puzzle Pro", ru: "Профи головоломок" },
  "achievements.puzzleProDesc": { en: "Complete 10 logic activities", ru: "Выполните 10 заданий по логике" },
  "achievements.empath": { en: "Empath", ru: "Эмпат" },
  "achievements.empathDesc": { en: "Complete 10 emotion activities", ru: "Выполните 10 заданий по эмоциям" },
  "achievements.socialButterfly": { en: "Social Butterfly", ru: "Социальная бабочка" },
  "achievements.socialButterflyDesc": { en: "Complete 10 social scenario activities", ru: "Выполните 10 социальных сценариев" },
  
  // Prizes section
  "prizes.title": { en: "Prizes & Rewards", ru: "Призы и награды" },
  "prizes.subtitle": { en: "Collect special prizes as you learn!", ru: "Собирайте особые призы по мере обучения!" },
  "prizes.locked": { en: "Locked", ru: "Заблокировано" },
  "prizes.unlocked": { en: "Unlocked!", ru: "Получено!" },
  "prizes.tasksNeeded": { en: "tasks needed", ru: "заданий нужно" },
  
  // Streak section
  "streak.title": { en: "Learning Streak", ru: "Серия обучения" },
  "streak.subtitle": { en: "Keep learning every day to build your streak!", ru: "Учитесь каждый день, чтобы продлить серию!" },
  "streak.currentStreak": { en: "Current Streak", ru: "Текущая серия" },
  "streak.longestStreak": { en: "Best Streak", ru: "Лучшая серия" },
  "streak.days": { en: "days", ru: "дней" },
  "streak.day": { en: "day", ru: "день" },
  "streak.keepItUp": { en: "Keep it up!", ru: "Так держать!" },
  "streak.startStreak": { en: "Start your streak today!", ru: "Начни серию сегодня!" },
  "streak.streakLost": { en: "Start a new streak!", ru: "Начни новую серию!" },
  "streak.practicedToday": { en: "Practiced today ✓", ru: "Сегодня занимались ✓" },
  "streak.practiceToday": { en: "Practice today to continue!", ru: "Позанимайтесь сегодня!" },
  
  // Streak achievements
  "achievements.streak3": { en: "3-Day Streak", ru: "Серия 3 дня" },
  "achievements.streak3Desc": { en: "Learn 3 days in a row", ru: "Учитесь 3 дня подряд" },
  "achievements.streak7": { en: "Week Warrior", ru: "Воин недели" },
  "achievements.streak7Desc": { en: "Learn 7 days in a row", ru: "Учитесь 7 дней подряд" },
  "achievements.streak14": { en: "Two-Week Champion", ru: "Чемпион двух недель" },
  "achievements.streak14Desc": { en: "Learn 14 days in a row", ru: "Учитесь 14 дней подряд" },
  "achievements.streak30": { en: "Monthly Master", ru: "Мастер месяца" },
  "achievements.streak30Desc": { en: "Learn 30 days in a row", ru: "Учитесь 30 дней подряд" },
  
  // Parent Dashboard link
  "parents.viewProgress": { en: "View Full Progress Dashboard", ru: "Открыть полную панель прогресса" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
