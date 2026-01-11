// Task data organized by module, type, and difficulty level
// Each task type has multiple groups that are randomly selected

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface TaskTranslation {
  en: string;
  ru: string;
}

// ============= MATH TASKS =============

// Multiple task groups for counting - randomly selected
export const mathCountingTaskGroups = {
  easy: [
    // Group 1: Basic objects
    [
      { items: ["⭐"], answer: 1 },
      { items: ["🍎", "🍎"], answer: 2 },
      { items: ["🌸", "🌸", "🌸"], answer: 3 },
      { items: ["🦋", "🦋"], answer: 2 },
      { items: ["🌈"], answer: 1 },
    ],
    // Group 2: Animals
    [
      { items: ["🐶"], answer: 1 },
      { items: ["🐱", "🐱", "🐱"], answer: 3 },
      { items: ["🐰", "🐰"], answer: 2 },
      { items: ["🐦"], answer: 1 },
      { items: ["🐸", "🐸", "🐸"], answer: 3 },
    ],
    // Group 3: Food
    [
      { items: ["🍕", "🍕"], answer: 2 },
      { items: ["🍌"], answer: 1 },
      { items: ["🍪", "🍪", "🍪"], answer: 3 },
      { items: ["🍓", "🍓"], answer: 2 },
      { items: ["🧁"], answer: 1 },
    ],
  ],
  medium: [
    // Group 1
    [
      { items: ["⭐", "⭐", "⭐", "⭐", "⭐"], answer: 5 },
      { items: ["🐶", "🐶", "🐶", "🐶", "🐶", "🐶"], answer: 6 },
      { items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], answer: 7 },
      { items: ["🍪", "🍪", "🍪", "🍪"], answer: 4 },
      { items: ["🚗", "🚗", "🚗", "🚗", "🚗", "🚗"], answer: 6 },
    ],
    // Group 2
    [
      { items: ["🌺", "🌺", "🌺", "🌺"], answer: 4 },
      { items: ["🎁", "🎁", "🎁", "🎁", "🎁"], answer: 5 },
      { items: ["🎨", "🎨", "🎨", "🎨", "🎨", "🎨"], answer: 6 },
      { items: ["🌙", "🌙", "🌙", "🌙", "🌙", "🌙", "🌙"], answer: 7 },
      { items: ["🎵", "🎵", "🎵", "🎵"], answer: 4 },
    ],
    // Group 3
    [
      { items: ["🚀", "🚀", "🚀", "🚀", "🚀"], answer: 5 },
      { items: ["🎯", "🎯", "🎯", "🎯"], answer: 4 },
      { items: ["🎪", "🎪", "🎪", "🎪", "🎪", "🎪"], answer: 6 },
      { items: ["🎭", "🎭", "🎭", "🎭", "🎭", "🎭", "🎭"], answer: 7 },
      { items: ["🎸", "🎸", "🎸", "🎸", "🎸"], answer: 5 },
    ],
  ],
  hard: [
    // Group 1
    [
      { items: ["🐱", "🐱", "🐱", "🐱", "🐱", "🐱", "🐱", "🐱"], answer: 8 },
      { items: ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"], answer: 9 },
      { items: ["🌟", "🌟", "🌟", "🌟", "🌟", "🌟", "🌟", "🌟", "🌟", "🌟"], answer: 10 },
      { items: ["🍭", "🍭", "🍭", "🍭", "🍭", "🍭", "🍭"], answer: 7 },
      { items: ["🌻", "🌻", "🌻", "🌻", "🌻", "🌻", "🌻", "🌻"], answer: 8 },
    ],
    // Group 2
    [
      { items: ["💎", "💎", "💎", "💎", "💎", "💎", "💎", "💎", "💎"], answer: 9 },
      { items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], answer: 10 },
      { items: ["🌸", "🌸", "🌸", "🌸", "🌸", "🌸", "🌸"], answer: 7 },
      { items: ["🎁", "🎁", "🎁", "🎁", "🎁", "🎁", "🎁", "🎁"], answer: 8 },
      { items: ["🦋", "🦋", "🦋", "🦋", "🦋", "🦋", "🦋", "🦋", "🦋"], answer: 9 },
    ],
    // Group 3
    [
      { items: ["🍀", "🍀", "🍀", "🍀", "🍀", "🍀", "🍀", "🍀"], answer: 8 },
      { items: ["🌈", "🌈", "🌈", "🌈", "🌈", "🌈", "🌈"], answer: 7 },
      { items: ["⚡", "⚡", "⚡", "⚡", "⚡", "⚡", "⚡", "⚡", "⚡", "⚡"], answer: 10 },
      { items: ["🎯", "🎯", "🎯", "🎯", "🎯", "🎯", "🎯", "🎯", "🎯"], answer: 9 },
      { items: ["🏆", "🏆", "🏆", "🏆", "🏆", "🏆", "🏆", "🏆"], answer: 8 },
    ],
  ],
};

// Legacy single array format (kept for compatibility)
export const mathCountingTasks = {
  easy: mathCountingTaskGroups.easy[0],
  medium: mathCountingTaskGroups.medium[0],
  hard: mathCountingTaskGroups.hard[0],
};

export const mathShapeTasks = {
  easy: [
    { shape: "🔵", shapeName: { en: "Circle", ru: "Круг" }, options: ["🔵", "🔷", "🔺", "⬛"], answer: "🔵" },
    { shape: "⬛", shapeName: { en: "Square", ru: "Квадрат" }, options: ["🔵", "🔷", "🔺", "⬛"], answer: "⬛" },
    { shape: "🔺", shapeName: { en: "Triangle", ru: "Треугольник" }, options: ["🔵", "🔷", "🔺", "⬛"], answer: "🔺" },
    { shape: "❤️", shapeName: { en: "Heart", ru: "Сердце" }, options: ["❤️", "⭐", "🔺", "🔵"], answer: "❤️" },
    { shape: "⭐", shapeName: { en: "Star", ru: "Звезда" }, options: ["⭐", "🔷", "🔺", "⬛"], answer: "⭐" },
  ],
  medium: [
    { shape: "🔷", shapeName: { en: "Diamond", ru: "Ромб" }, options: ["🔵", "🔷", "🔺", "⬛"], answer: "🔷" },
    { shape: "🟢", shapeName: { en: "Green Circle", ru: "Зелёный круг" }, options: ["🔵", "🟢", "🟡", "🔴"], answer: "🟢" },
    { shape: "🟡", shapeName: { en: "Yellow Circle", ru: "Жёлтый круг" }, options: ["🔵", "🟢", "🟡", "🔴"], answer: "🟡" },
    { shape: "🔴", shapeName: { en: "Red Circle", ru: "Красный круг" }, options: ["🔵", "🟢", "🟡", "🔴"], answer: "🔴" },
    { shape: "🌙", shapeName: { en: "Moon", ru: "Луна" }, options: ["🌙", "⭐", "☀️", "🔵"], answer: "🌙" },
  ],
  hard: [
    { shape: "🟣", shapeName: { en: "Purple Circle", ru: "Фиолетовый круг" }, options: ["🟣", "🟢", "🟡", "🔴"], answer: "🟣" },
    { shape: "🟠", shapeName: { en: "Orange Circle", ru: "Оранжевый круг" }, options: ["🟠", "🟢", "🟡", "🔴"], answer: "🟠" },
    { shape: "⬜", shapeName: { en: "White Square", ru: "Белый квадрат" }, options: ["⬜", "🔷", "🔺", "🔵"], answer: "⬜" },
    { shape: "☀️", shapeName: { en: "Sun", ru: "Солнце" }, options: ["🌙", "⭐", "☀️", "🔵"], answer: "☀️" },
    { shape: "💎", shapeName: { en: "Gem", ru: "Драгоценный камень" }, options: ["💎", "🔷", "🔺", "⬛"], answer: "💎" },
  ],
};

export const mathNumberTasks = {
  easy: [
    { target: 1, options: [1, 2, 3, 4] },
    { target: 2, options: [1, 2, 3, 4] },
    { target: 3, options: [1, 2, 3, 4] },
    { target: 4, options: [2, 3, 4, 5] },
    { target: 5, options: [3, 4, 5, 6] },
  ],
  medium: [
    { target: 6, options: [4, 5, 6, 7] },
    { target: 7, options: [5, 6, 7, 8] },
    { target: 8, options: [6, 7, 8, 9] },
    { target: 9, options: [7, 8, 9, 10] },
    { target: 10, options: [8, 9, 10, 11] },
  ],
  hard: [
    { target: 12, options: [10, 11, 12, 13] },
    { target: 15, options: [13, 14, 15, 16] },
    { target: 18, options: [16, 17, 18, 19] },
    { target: 20, options: [18, 19, 20, 21] },
    { target: 25, options: [23, 24, 25, 26] },
  ],
};

// NEW: Addition tasks with multiple groups
export const mathAdditionTaskGroups = {
  easy: [
    // Group 1
    [
      { num1: 1, num2: 1, answer: 2 },
      { num1: 1, num2: 2, answer: 3 },
      { num1: 2, num2: 1, answer: 3 },
      { num1: 2, num2: 2, answer: 4 },
      { num1: 1, num2: 3, answer: 4 },
    ],
    // Group 2
    [
      { num1: 0, num2: 1, answer: 1 },
      { num1: 1, num2: 1, answer: 2 },
      { num1: 2, num2: 0, answer: 2 },
      { num1: 0, num2: 3, answer: 3 },
      { num1: 3, num2: 1, answer: 4 },
    ],
    // Group 3
    [
      { num1: 2, num2: 2, answer: 4 },
      { num1: 1, num2: 0, answer: 1 },
      { num1: 3, num2: 0, answer: 3 },
      { num1: 2, num2: 1, answer: 3 },
      { num1: 1, num2: 4, answer: 5 },
    ],
  ],
  medium: [
    // Group 1
    [
      { num1: 3, num2: 2, answer: 5 },
      { num1: 4, num2: 3, answer: 7 },
      { num1: 2, num2: 4, answer: 6 },
      { num1: 5, num2: 3, answer: 8 },
      { num1: 4, num2: 4, answer: 8 },
    ],
    // Group 2
    [
      { num1: 3, num2: 3, answer: 6 },
      { num1: 5, num2: 2, answer: 7 },
      { num1: 4, num2: 5, answer: 9 },
      { num1: 6, num2: 2, answer: 8 },
      { num1: 3, num2: 4, answer: 7 },
    ],
    // Group 3
    [
      { num1: 2, num2: 5, answer: 7 },
      { num1: 6, num2: 3, answer: 9 },
      { num1: 4, num2: 2, answer: 6 },
      { num1: 5, num2: 4, answer: 9 },
      { num1: 3, num2: 5, answer: 8 },
    ],
  ],
  hard: [
    // Group 1
    [
      { num1: 6, num2: 5, answer: 11 },
      { num1: 7, num2: 4, answer: 11 },
      { num1: 8, num2: 5, answer: 13 },
      { num1: 9, num2: 6, answer: 15 },
      { num1: 7, num2: 8, answer: 15 },
    ],
    // Group 2
    [
      { num1: 8, num2: 7, answer: 15 },
      { num1: 6, num2: 6, answer: 12 },
      { num1: 9, num2: 4, answer: 13 },
      { num1: 7, num2: 7, answer: 14 },
      { num1: 8, num2: 6, answer: 14 },
    ],
    // Group 3
    [
      { num1: 5, num2: 8, answer: 13 },
      { num1: 9, num2: 3, answer: 12 },
      { num1: 6, num2: 8, answer: 14 },
      { num1: 7, num2: 5, answer: 12 },
      { num1: 8, num2: 8, answer: 16 },
    ],
  ],
};

export const mathAdditionTasks = {
  easy: mathAdditionTaskGroups.easy[0],
  medium: mathAdditionTaskGroups.medium[0],
  hard: mathAdditionTaskGroups.hard[0],
};

// NEW: Comparison tasks (bigger/smaller)
export const mathComparisonTasks = {
  easy: [
    { left: 1, right: 3, answer: "smaller" as const },
    { left: 5, right: 2, answer: "bigger" as const },
    { left: 2, right: 4, answer: "smaller" as const },
    { left: 3, right: 1, answer: "bigger" as const },
    { left: 4, right: 4, answer: "equal" as const },
  ],
  medium: [
    { left: 7, right: 5, answer: "bigger" as const },
    { left: 4, right: 8, answer: "smaller" as const },
    { left: 6, right: 6, answer: "equal" as const },
    { left: 9, right: 3, answer: "bigger" as const },
    { left: 2, right: 7, answer: "smaller" as const },
  ],
  hard: [
    { left: 12, right: 15, answer: "smaller" as const },
    { left: 18, right: 11, answer: "bigger" as const },
    { left: 14, right: 14, answer: "equal" as const },
    { left: 9, right: 17, answer: "smaller" as const },
    { left: 20, right: 13, answer: "bigger" as const },
  ],
};

// ============= READING TASKS =============

export const readingPictureWordTasks = {
  easy: [
    { image: "🍎", word: { en: "Apple", ru: "Яблоко" }, options: { en: ["Apple", "Banana", "Orange", "Grape"], ru: ["Яблоко", "Банан", "Апельсин", "Виноград"] } },
    { image: "🐱", word: { en: "Cat", ru: "Кот" }, options: { en: ["Dog", "Cat", "Bird", "Fish"], ru: ["Собака", "Кот", "Птица", "Рыба"] } },
    { image: "🐕", word: { en: "Dog", ru: "Собака" }, options: { en: ["Cat", "Dog", "Bird", "Mouse"], ru: ["Кот", "Собака", "Птица", "Мышь"] } },
    { image: "🌞", word: { en: "Sun", ru: "Солнце" }, options: { en: ["Moon", "Star", "Sun", "Cloud"], ru: ["Луна", "Звезда", "Солнце", "Облако"] } },
    { image: "🏠", word: { en: "House", ru: "Дом" }, options: { en: ["Tree", "House", "Car", "Flower"], ru: ["Дерево", "Дом", "Машина", "Цветок"] } },
  ],
  medium: [
    { image: "🌸", word: { en: "Flower", ru: "Цветок" }, options: { en: ["Flower", "Tree", "Leaf", "Grass"], ru: ["Цветок", "Дерево", "Лист", "Трава"] } },
    { image: "🚗", word: { en: "Car", ru: "Машина" }, options: { en: ["Bus", "Car", "Bike", "Train"], ru: ["Автобус", "Машина", "Велосипед", "Поезд"] } },
    { image: "🌳", word: { en: "Tree", ru: "Дерево" }, options: { en: ["Tree", "Flower", "Bush", "Grass"], ru: ["Дерево", "Цветок", "Куст", "Трава"] } },
    { image: "⭐", word: { en: "Star", ru: "Звезда" }, options: { en: ["Moon", "Sun", "Star", "Cloud"], ru: ["Луна", "Солнце", "Звезда", "Облако"] } },
    { image: "🐟", word: { en: "Fish", ru: "Рыба" }, options: { en: ["Fish", "Bird", "Cat", "Dog"], ru: ["Рыба", "Птица", "Кот", "Собака"] } },
  ],
  hard: [
    { image: "🦋", word: { en: "Butterfly", ru: "Бабочка" }, options: { en: ["Butterfly", "Bird", "Bee", "Ant"], ru: ["Бабочка", "Птица", "Пчела", "Муравей"] } },
    { image: "🌈", word: { en: "Rainbow", ru: "Радуга" }, options: { en: ["Rainbow", "Cloud", "Sun", "Rain"], ru: ["Радуга", "Облако", "Солнце", "Дождь"] } },
    { image: "🎈", word: { en: "Balloon", ru: "Шарик" }, options: { en: ["Balloon", "Ball", "Kite", "Bird"], ru: ["Шарик", "Мяч", "Воздушный змей", "Птица"] } },
    { image: "🐻", word: { en: "Bear", ru: "Медведь" }, options: { en: ["Bear", "Lion", "Tiger", "Wolf"], ru: ["Медведь", "Лев", "Тигр", "Волк"] } },
    { image: "🦁", word: { en: "Lion", ru: "Лев" }, options: { en: ["Bear", "Lion", "Tiger", "Wolf"], ru: ["Медведь", "Лев", "Тигр", "Волк"] } },
  ],
};

export const readingSoundMatchTasks = {
  easy: [
    { letter: "A", sound: "/a/", options: ["🍎", "🐶", "🏠", "🌸"], answer: "🍎", hint: { en: "Apple", ru: "Яблоко" } },
    { letter: "B", sound: "/b/", options: ["🍌", "🐱", "🌈", "⭐"], answer: "🍌", hint: { en: "Banana", ru: "Банан" } },
    { letter: "C", sound: "/k/", options: ["🐱", "🦋", "🌸", "🍎"], answer: "🐱", hint: { en: "Cat", ru: "Кот" } },
    { letter: "D", sound: "/d/", options: ["🐶", "🐱", "🦋", "🐟"], answer: "🐶", hint: { en: "Dog", ru: "Собака" } },
    { letter: "S", sound: "/s/", options: ["☀️", "🌙", "⭐", "🌈"], answer: "☀️", hint: { en: "Sun", ru: "Солнце" } },
  ],
  medium: [
    { letter: "F", sound: "/f/", options: ["🐟", "🐶", "🐱", "🦋"], answer: "🐟", hint: { en: "Fish", ru: "Рыба" } },
    { letter: "G", sound: "/g/", options: ["🍇", "🐶", "🐱", "🍎"], answer: "🍇", hint: { en: "Grapes", ru: "Виноград" } },
    { letter: "H", sound: "/h/", options: ["🏠", "🐶", "🐱", "🌸"], answer: "🏠", hint: { en: "House", ru: "Дом" } },
    { letter: "L", sound: "/l/", options: ["🦁", "🐶", "🐱", "🐟"], answer: "🦁", hint: { en: "Lion", ru: "Лев" } },
    { letter: "M", sound: "/m/", options: ["🌙", "🐶", "🐱", "🐟"], answer: "🌙", hint: { en: "Moon", ru: "Луна" } },
  ],
  hard: [
    { letter: "E", sound: "/e/", options: ["🥚", "🍎", "🐶", "🌸"], answer: "🥚", hint: { en: "Egg", ru: "Яйцо" } },
    { letter: "O", sound: "/o/", options: ["🍊", "🍎", "🍌", "🍇"], answer: "🍊", hint: { en: "Orange", ru: "Апельсин" } },
    { letter: "P", sound: "/p/", options: ["🐷", "🐶", "🐱", "🐟"], answer: "🐷", hint: { en: "Pig", ru: "Свинья" } },
    { letter: "R", sound: "/r/", options: ["🌈", "🐶", "🐱", "🐟"], answer: "🌈", hint: { en: "Rainbow", ru: "Радуга" } },
    { letter: "T", sound: "/t/", options: ["🌳", "🌸", "🍎", "🍌"], answer: "🌳", hint: { en: "Tree", ru: "Дерево" } },
  ],
};

export const readingStoryTasks = {
  easy: [
    {
      story: { en: "The cat sat.", ru: "Кот сидел." },
      question: { en: "What did the cat do?", ru: "Что делал кот?" },
      options: { en: ["Sat", "Ran", "Slept", "Ate"], ru: ["Сидел", "Бежал", "Спал", "Ел"] },
      answer: 0,
    },
    {
      story: { en: "The sun is bright.", ru: "Солнце яркое." },
      question: { en: "What is bright?", ru: "Что яркое?" },
      options: { en: ["Moon", "Sun", "Star", "Cloud"], ru: ["Луна", "Солнце", "Звезда", "Облако"] },
      answer: 1,
    },
    {
      story: { en: "The dog ran.", ru: "Собака бежала." },
      question: { en: "What did the dog do?", ru: "Что делала собака?" },
      options: { en: ["Sat", "Ran", "Slept", "Ate"], ru: ["Сидела", "Бежала", "Спала", "Ела"] },
      answer: 1,
    },
  ],
  medium: [
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
  ],
  hard: [
    {
      story: { en: "Ben has a big brown bear toy. He plays with it every day.", ru: "У Бена есть большой коричневый игрушечный медведь. Он играет с ним каждый день." },
      question: { en: "What toy does Ben have?", ru: "Какая игрушка есть у Бена?" },
      options: { en: ["A car", "A bear", "A doll", "A ball"], ru: ["Машинка", "Медведь", "Кукла", "Мяч"] },
      answer: 1,
    },
    {
      story: { en: "It rained all day yesterday. The children stayed inside.", ru: "Вчера весь день шёл дождь. Дети остались дома." },
      question: { en: "What was the weather like?", ru: "Какая была погода?" },
      options: { en: ["Sunny", "Snowy", "Rainy", "Windy"], ru: ["Солнечная", "Снежная", "Дождливая", "Ветреная"] },
      answer: 2,
    },
    {
      story: { en: "The butterfly landed on the flower and drank nectar.", ru: "Бабочка села на цветок и пила нектар." },
      question: { en: "Where did the butterfly land?", ru: "Куда села бабочка?" },
      options: { en: ["On the tree", "On the flower", "On the rock", "On the water"], ru: ["На дерево", "На цветок", "На камень", "На воду"] },
      answer: 1,
    },
  ],
};

// NEW: Rhyming words task
export const readingRhymingTasks = {
  easy: [
    { word: { en: "Cat", ru: "Кот" }, options: { en: ["Bat", "Dog", "Fish", "Car"], ru: ["Рот", "Собака", "Рыба", "Машина"] }, answer: 0 },
    { word: { en: "Dog", ru: "Нос" }, options: { en: ["Log", "Cat", "Sun", "Tree"], ru: ["Покос", "Кот", "Солнце", "Дерево"] }, answer: 0 },
    { word: { en: "Sun", ru: "День" }, options: { en: ["Fun", "Cat", "Hat", "Fish"], ru: ["Лень", "Кот", "Шапка", "Рыба"] }, answer: 0 },
  ],
  medium: [
    { word: { en: "Star", ru: "Звезда" }, options: { en: ["Car", "Moon", "Fish", "Tree"], ru: ["Беда", "Луна", "Рыба", "Дерево"] }, answer: 0 },
    { word: { en: "Night", ru: "Ночь" }, options: { en: ["Light", "Day", "Sun", "Star"], ru: ["Дочь", "День", "Солнце", "Звезда"] }, answer: 0 },
    { word: { en: "Ball", ru: "Мяч" }, options: { en: ["Tall", "Fish", "Dog", "Cat"], ru: ["Грач", "Рыба", "Собака", "Кот"] }, answer: 0 },
  ],
  hard: [
    { word: { en: "Flower", ru: "Цветок" }, options: { en: ["Tower", "Tree", "Grass", "Leaf"], ru: ["Восток", "Дерево", "Трава", "Лист"] }, answer: 0 },
    { word: { en: "Dream", ru: "Сон" }, options: { en: ["Stream", "Sleep", "Night", "Star"], ru: ["Закон", "Спать", "Ночь", "Звезда"] }, answer: 0 },
    { word: { en: "Time", ru: "Время" }, options: { en: ["Climb", "Watch", "Clock", "Day"], ru: ["Бремя", "Часы", "Время", "День"] }, answer: 0 },
  ],
};

// ============= LOGIC TASKS =============

// Multiple task groups for patterns - randomly selected
export const logicPatternTaskGroups = {
  easy: [
    // Group 1
    [
      { pattern: ["🔴", "🔵", "🔴", "?"], options: ["🔴", "🔵", "🟢", "🟡"], answer: "🔵" },
      { pattern: ["🍎", "🍎", "🍌", "?"], options: ["🍇", "🍎", "🍌", "🍊"], answer: "🍎" },
      { pattern: ["⭐", "🌙", "⭐", "?"], options: ["⭐", "🌙", "☀️", "🌈"], answer: "🌙" },
      { pattern: ["🐶", "🐱", "🐶", "?"], options: ["🐶", "🐱", "🐟", "🐦"], answer: "🐱" },
      { pattern: ["❤️", "💙", "❤️", "?"], options: ["❤️", "💙", "💚", "💛"], answer: "💙" },
    ],
    // Group 2
    [
      { pattern: ["🌸", "🌺", "🌸", "?"], options: ["🌸", "🌺", "🌹", "🌻"], answer: "🌺" },
      { pattern: ["🚗", "🚌", "🚗", "?"], options: ["🚗", "🚌", "✈️", "🚂"], answer: "🚌" },
      { pattern: ["⬜", "⬛", "⬜", "?"], options: ["⬜", "⬛", "🔲", "🔳"], answer: "⬛" },
      { pattern: ["🎈", "🎁", "🎈", "?"], options: ["🎈", "🎁", "🎂", "🎉"], answer: "🎁" },
      { pattern: ["🌞", "🌚", "🌞", "?"], options: ["🌞", "🌚", "⭐", "🌙"], answer: "🌚" },
    ],
  ],
  medium: [
    // Group 1
    [
      { pattern: ["🔴", "🔵", "🔴", "🔵", "?"], options: ["🔴", "🔵", "🟢", "🟡"], answer: "🔴" },
      { pattern: ["⭐", "⭐", "🌙", "⭐", "⭐", "?"], options: ["⭐", "🌙", "☀️", "🌈"], answer: "🌙" },
      { pattern: ["🔺", "🔺", "⬛", "🔺", "🔺", "?"], options: ["🔺", "⬛", "🔵", "🔷"], answer: "⬛" },
      { pattern: ["🐱", "🐶", "🐱", "🐶", "?"], options: ["🐱", "🐶", "🐟", "🐦"], answer: "🐱" },
      { pattern: ["🍎", "🍌", "🍎", "🍌", "?"], options: ["🍇", "🍎", "🍌", "🍊"], answer: "🍎" },
    ],
    // Group 2
    [
      { pattern: ["🌈", "☀️", "🌈", "☀️", "?"], options: ["🌈", "☀️", "🌙", "⭐"], answer: "🌈" },
      { pattern: ["🎵", "🎶", "🎵", "🎶", "?"], options: ["🎵", "🎶", "🎤", "🎸"], answer: "🎵" },
      { pattern: ["🦋", "🐛", "🦋", "🐛", "?"], options: ["🦋", "🐛", "🐜", "🐝"], answer: "🦋" },
      { pattern: ["🏠", "🏡", "🏠", "🏡", "?"], options: ["🏠", "🏡", "🏰", "🏢"], answer: "🏠" },
      { pattern: ["🌻", "🌻", "🌹", "🌻", "🌻", "?"], options: ["🌻", "🌹", "🌸", "🌺"], answer: "🌹" },
    ],
  ],
  hard: [
    // Group 1
    [
      { pattern: ["🟢", "🟢", "🟡", "🟢", "🟢", "🟡", "?"], options: ["🟢", "🟡", "🔴", "🔵"], answer: "🟢" },
      { pattern: ["🔵", "🔵", "🔴", "🔵", "🔵", "🔴", "?"], options: ["🔵", "🔴", "🟢", "🟡"], answer: "🔵" },
      { pattern: ["🎈", "🎈", "🎁", "🎈", "🎈", "🎁", "?"], options: ["🎈", "🎁", "🎂", "🎉"], answer: "🎈" },
      { pattern: ["❤️", "💛", "💚", "❤️", "💛", "?"], options: ["❤️", "💛", "💚", "💙"], answer: "💚" },
      { pattern: ["🌸", "🌺", "🌻", "🌸", "🌺", "?"], options: ["🌸", "🌺", "🌻", "🌹"], answer: "🌻" },
    ],
    // Group 2
    [
      { pattern: ["🐶", "🐱", "🐦", "🐶", "🐱", "?"], options: ["🐶", "🐱", "🐦", "🐟"], answer: "🐦" },
      { pattern: ["1️⃣", "2️⃣", "3️⃣", "1️⃣", "2️⃣", "?"], options: ["1️⃣", "2️⃣", "3️⃣", "4️⃣"], answer: "3️⃣" },
      { pattern: ["⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "?"], options: ["⬜", "⬛", "🔲", "🔳"], answer: "⬜" },
      { pattern: ["🚗", "🚗", "🚌", "🚗", "🚗", "🚌", "?"], options: ["🚗", "🚌", "✈️", "🚂"], answer: "🚗" },
      { pattern: ["🌙", "⭐", "⭐", "🌙", "⭐", "?"], options: ["🌙", "⭐", "☀️", "🌈"], answer: "⭐" },
    ],
  ],
};

export const logicPatternTasks = {
  easy: logicPatternTaskGroups.easy[0],
  medium: logicPatternTaskGroups.medium[0],
  hard: logicPatternTaskGroups.hard[0],
};

export const logicSortingTaskGroups = {
  easy: [
    // Group 1
    [
      { title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" }, items: ["🐘", "🐭"], correctOrder: ["🐭", "🐘"] },
      { title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" }, items: ["🍉", "🍓"], correctOrder: ["🍓", "🍉"] },
      { title: { en: "Sort by height: Short to Tall", ru: "Сортировка по высоте: от низкого к высокому" }, items: ["🌳", "🌱"], correctOrder: ["🌱", "🌳"] },
    ],
    // Group 2
    [
      { title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" }, items: ["🐋", "🐟"], correctOrder: ["🐟", "🐋"] },
      { title: { en: "Sort by loudness: Quiet to Loud", ru: "Сортировка по громкости: от тихого к громкому" }, items: ["📢", "🔇"], correctOrder: ["🔇", "📢"] },
      { title: { en: "Sort by speed: Slow to Fast", ru: "Сортировка по скорости: от медленного к быстрому" }, items: ["🐌", "🚀"], correctOrder: ["🐌", "🚀"] },
    ],
  ],
  medium: [
    // Group 1
    [
      { title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" }, items: ["🐘", "🐱", "🐭"], correctOrder: ["🐭", "🐱", "🐘"] },
      { title: { en: "Sort by speed: Slow to Fast", ru: "Сортировка по скорости: от медленного к быстрому" }, items: ["🚀", "🐌", "🚗"], correctOrder: ["🐌", "🚗", "🚀"] },
      { title: { en: "Sort by age: Young to Old", ru: "Сортировка по возрасту: от молодого к старому" }, items: ["👴", "👶", "👦"], correctOrder: ["👶", "👦", "👴"] },
    ],
    // Group 2
    [
      { title: { en: "Sort by weight: Light to Heavy", ru: "Сортировка по весу: от лёгкого к тяжёлому" }, items: ["🪨", "🪶", "📦"], correctOrder: ["🪶", "📦", "🪨"] },
      { title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" }, items: ["🍇", "🍉", "🍓"], correctOrder: ["🍓", "🍇", "🍉"] },
      { title: { en: "Sort by height: Short to Tall", ru: "Сортировка по высоте: от низкого к высокому" }, items: ["🌲", "🌱", "🌿"], correctOrder: ["🌱", "🌿", "🌲"] },
    ],
  ],
  hard: [
    // Group 1
    [
      { title: { en: "Sort by temperature: Cold to Hot", ru: "Сортировка по температуре: от холодного к горячему" }, items: ["☀️", "❄️", "🌤️", "🔥"], correctOrder: ["❄️", "🌤️", "☀️", "🔥"] },
      { title: { en: "Sort by time: Morning to Night", ru: "Сортировка по времени: от утра к ночи" }, items: ["🌙", "🌅", "☀️", "🌆"], correctOrder: ["🌅", "☀️", "🌆", "🌙"] },
      { title: { en: "Sort by weight: Light to Heavy", ru: "Сортировка по весу: от лёгкого к тяжёлому" }, items: ["🪨", "🪶", "📦", "🏠"], correctOrder: ["🪶", "📦", "🪨", "🏠"] },
    ],
    // Group 2
    [
      { title: { en: "Sort by distance: Near to Far", ru: "Сортировка по расстоянию: от ближнего к дальнему" }, items: ["🌍", "🏠", "🌙", "⭐"], correctOrder: ["🏠", "🌍", "🌙", "⭐"] },
      { title: { en: "Sort by age: New to Old", ru: "Сортировка по возрасту: от нового к старому" }, items: ["🏛️", "🏗️", "🏠", "🏰"], correctOrder: ["🏗️", "🏠", "🏰", "🏛️"] },
      { title: { en: "Sort by sweetness: Less to More", ru: "Сортировка по сладости: от менее к более" }, items: ["🍬", "🥒", "🍎", "🍯"], correctOrder: ["🥒", "🍎", "🍬", "🍯"] },
    ],
  ],
};

export const logicSortingTasks = {
  easy: [
    {
      title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" },
      items: ["🐘", "🐭"],
      correctOrder: ["🐭", "🐘"],
    },
    {
      title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" },
      items: ["🍉", "🍓"],
      correctOrder: ["🍓", "🍉"],
    },
  ],
  medium: [
    {
      title: { en: "Sort by size: Small to Big", ru: "Сортировка по размеру: от маленького к большому" },
      items: ["🐘", "🐱", "🐭"],
      correctOrder: ["🐭", "🐱", "🐘"],
    },
    {
      title: { en: "Sort by speed: Slow to Fast", ru: "Сортировка по скорости: от медленного к быстрому" },
      items: ["🚀", "🐌", "🚗"],
      correctOrder: ["🐌", "🚗", "🚀"],
    },
    {
      title: { en: "Sort by age: Young to Old", ru: "Сортировка по возрасту: от молодого к старому" },
      items: ["👴", "👶", "👦"],
      correctOrder: ["👶", "👦", "👴"],
    },
  ],
  hard: [
    {
      title: { en: "Sort by temperature: Cold to Hot", ru: "Сортировка по температуре: от холодного к горячему" },
      items: ["☀️", "❄️", "🌤️", "🔥"],
      correctOrder: ["❄️", "🌤️", "☀️", "🔥"],
    },
    {
      title: { en: "Sort by time: Morning to Night", ru: "Сортировка по времени: от утра к ночи" },
      items: ["🌙", "🌅", "☀️", "🌆"],
      correctOrder: ["🌅", "☀️", "🌆", "🌙"],
    },
    {
      title: { en: "Sort by weight: Light to Heavy", ru: "Сортировка по весу: от лёгкого к тяжёлому" },
      items: ["🪨", "🪶", "📦", "🏠"],
      correctOrder: ["🪶", "📦", "🪨", "🏠"],
    },
  ],
};

export const logicSequenceTaskGroups = {
  easy: [
    // Group 1
    [
      { sequence: ["🥚", "🐣", "?"], question: { en: "What comes next?", ru: "Что дальше?" }, options: ["🐥", "🥚", "🐣", "🦆"], answer: "🐥" },
      { sequence: ["🌱", "🌿", "?"], question: { en: "What comes next?", ru: "Что дальше?" }, options: ["🌱", "🌳", "🌸", "🍂"], answer: "🌳" },
      { sequence: ["☀️", "🌅", "?"], question: { en: "What comes next?", ru: "Что дальше?" }, options: ["🌙", "☀️", "🌧️", "🌈"], answer: "🌙" },
    ],
    // Group 2
    [
      { sequence: ["1️⃣", "2️⃣", "?"], question: { en: "What number comes next?", ru: "Какое число следующее?" }, options: ["3️⃣", "1️⃣", "4️⃣", "0️⃣"], answer: "3️⃣" },
      { sequence: ["🔴", "🟠", "?"], question: { en: "What color comes next?", ru: "Какой цвет следующий?" }, options: ["🟡", "🔴", "🔵", "🟢"], answer: "🟡" },
      { sequence: ["🌑", "🌓", "?"], question: { en: "Moon phase: What comes next?", ru: "Фаза луны: Что дальше?" }, options: ["🌕", "🌑", "🌗", "☀️"], answer: "🌕" },
    ],
  ],
  medium: [
    // Group 1
    [
      { sequence: ["🥚", "🐣", "🐥", "?"], question: { en: "What comes next?", ru: "Что дальше?" }, options: ["🐔", "🥚", "🐣", "🦆"], answer: "🐔" },
      { sequence: ["🌱", "🌿", "🌳", "?"], question: { en: "What comes next?", ru: "Что дальше?" }, options: ["🌱", "🍎", "🌸", "🍂"], answer: "🍂" },
      { sequence: ["☀️", "🌅", "🌙", "?"], question: { en: "What comes next?", ru: "Что дальше?" }, options: ["⭐", "☀️", "🌧️", "🌈"], answer: "⭐" },
      { sequence: ["🐛", "🐚", "🦋", "?"], question: { en: "What comes after the butterfly?", ru: "Что после бабочки?" }, options: ["🐛", "🥚", "🌸", "💀"], answer: "🌸" },
    ],
    // Group 2
    [
      { sequence: ["1️⃣", "2️⃣", "3️⃣", "?"], question: { en: "What number comes next?", ru: "Какое число следующее?" }, options: ["4️⃣", "1️⃣", "5️⃣", "0️⃣"], answer: "4️⃣" },
      { sequence: ["🚶", "🏃", "🚴", "?"], question: { en: "What comes next (faster)?", ru: "Что дальше (быстрее)?" }, options: ["🚗", "🚶", "🐌", "🦥"], answer: "🚗" },
      { sequence: ["📕", "📗", "📘", "?"], question: { en: "What color book comes next?", ru: "Какого цвета книга следующая?" }, options: ["📙", "📕", "📗", "📓"], answer: "📙" },
    ],
  ],
  hard: [
    // Group 1
    [
      { sequence: ["❄️", "🌸", "☀️", "?"], question: { en: "What season comes next?", ru: "Какое время года следующее?" }, options: ["🍂", "❄️", "🌸", "☀️"], answer: "🍂" },
      { sequence: ["👶", "👦", "👨", "?"], question: { en: "What comes next?", ru: "Что дальше?" }, options: ["👴", "👶", "👦", "🧒"], answer: "👴" },
      { sequence: ["🌑", "🌓", "🌕", "?"], question: { en: "Moon phase: What comes next?", ru: "Фаза луны: Что дальше?" }, options: ["🌗", "🌑", "🌓", "☀️"], answer: "🌗" },
    ],
    // Group 2
    [
      { sequence: ["🌍", "🚀", "🌙", "?"], question: { en: "Space journey: What comes next?", ru: "Космическое путешествие: Что дальше?" }, options: ["⭐", "🌍", "🌞", "🛸"], answer: "⭐" },
      { sequence: ["🧵", "👕", "👔", "?"], question: { en: "Clothing evolution: What next?", ru: "Эволюция одежды: Что дальше?" }, options: ["🎩", "🧵", "👗", "🩳"], answer: "🎩" },
      { sequence: ["🥛", "🧀", "🐄", "?"], question: { en: "Reverse process: What started it?", ru: "Обратный процесс: Что началo?" }, options: ["🌾", "🥛", "🧈", "🍦"], answer: "🌾" },
    ],
  ],
};

export const logicSequenceTasks = {
  easy: logicSequenceTaskGroups.easy[0],
  medium: logicSequenceTaskGroups.medium[0],
  hard: logicSequenceTaskGroups.hard[0],
};

// NEW: Odd one out task
export const logicOddOneOutTasks = {
  easy: [
    { items: ["🍎", "🍌", "🍇", "🐶"], answer: "🐶", reason: { en: "Dog is not a fruit", ru: "Собака - не фрукт" } },
    { items: ["🚗", "🚌", "✈️", "🍎"], answer: "🍎", reason: { en: "Apple is not a vehicle", ru: "Яблоко - не транспорт" } },
    { items: ["🔴", "🔵", "🟢", "🐱"], answer: "🐱", reason: { en: "Cat is not a color", ru: "Кот - не цвет" } },
  ],
  medium: [
    { items: ["🐶", "🐱", "🐟", "🏠"], answer: "🏠", reason: { en: "House is not an animal", ru: "Дом - не животное" } },
    { items: ["☀️", "🌙", "⭐", "🍎"], answer: "🍎", reason: { en: "Apple is not in the sky", ru: "Яблоко - не на небе" } },
    { items: ["1️⃣", "2️⃣", "3️⃣", "🍌"], answer: "🍌", reason: { en: "Banana is not a number", ru: "Банан - не число" } },
  ],
  hard: [
    { items: ["🦁", "🐯", "🐻", "🐟"], answer: "🐟", reason: { en: "Fish lives in water, others on land", ru: "Рыба живёт в воде, остальные на суше" } },
    { items: ["✈️", "🚁", "🎈", "🚗"], answer: "🚗", reason: { en: "Car doesn't fly", ru: "Машина не летает" } },
    { items: ["🌞", "🌙", "⭐", "🌈"], answer: "🌈", reason: { en: "Rainbow appears only with rain", ru: "Радуга появляется только с дождём" } },
  ],
};

// NEW: Memory match task (pairs to remember)
export const logicMemoryTasks = {
  easy: [
    { pairs: [["🍎", "🍎"], ["🍌", "🍌"]], gridSize: 2 },
    { pairs: [["🐶", "🐶"], ["🐱", "🐱"]], gridSize: 2 },
  ],
  medium: [
    { pairs: [["🍎", "🍎"], ["🍌", "🍌"], ["🍇", "🍇"]], gridSize: 3 },
    { pairs: [["🐶", "🐶"], ["🐱", "🐱"], ["🐟", "🐟"]], gridSize: 3 },
  ],
  hard: [
    { pairs: [["🍎", "🍎"], ["🍌", "🍌"], ["🍇", "🍇"], ["🍊", "🍊"]], gridSize: 4 },
    { pairs: [["🐶", "🐶"], ["🐱", "🐱"], ["🐟", "🐟"], ["🦋", "🦋"]], gridSize: 4 },
  ],
};

// ============= EMOTIONS TASKS =============

// Multiple task groups for feelings - randomly selected
export const emotionsFeelingsTaskGroups = {
  easy: [
    // Group 1: Basic emotions
    [
      { face: "😊", emotion: { en: "Happy", ru: "Счастливый" }, options: { en: ["Happy", "Sad", "Angry", "Scared"], ru: ["Счастливый", "Грустный", "Злой", "Испуганный"] } },
      { face: "😢", emotion: { en: "Sad", ru: "Грустный" }, options: { en: ["Happy", "Sad", "Angry", "Surprised"], ru: ["Счастливый", "Грустный", "Злой", "Удивлённый"] } },
      { face: "😠", emotion: { en: "Angry", ru: "Злой" }, options: { en: ["Happy", "Sad", "Angry", "Tired"], ru: ["Счастливый", "Грустный", "Злой", "Уставший"] } },
      { face: "😴", emotion: { en: "Tired", ru: "Уставший" }, options: { en: ["Happy", "Tired", "Angry", "Scared"], ru: ["Счастливый", "Уставший", "Злой", "Испуганный"] } },
    ],
    // Group 2
    [
      { face: "🥰", emotion: { en: "Loved", ru: "Любимый" }, options: { en: ["Loved", "Sad", "Angry", "Scared"], ru: ["Любимый", "Грустный", "Злой", "Испуганный"] } },
      { face: "😮", emotion: { en: "Surprised", ru: "Удивлённый" }, options: { en: ["Happy", "Surprised", "Angry", "Tired"], ru: ["Счастливый", "Удивлённый", "Злой", "Уставший"] } },
      { face: "😌", emotion: { en: "Peaceful", ru: "Спокойный" }, options: { en: ["Peaceful", "Sad", "Angry", "Tired"], ru: ["Спокойный", "Грустный", "Злой", "Уставший"] } },
      { face: "😨", emotion: { en: "Scared", ru: "Испуганный" }, options: { en: ["Excited", "Sad", "Scared", "Happy"], ru: ["Взволнованный", "Грустный", "Испуганный", "Счастливый"] } },
    ],
  ],
  medium: [
    // Group 1
    [
      { face: "😨", emotion: { en: "Scared", ru: "Испуганный" }, options: { en: ["Excited", "Sad", "Scared", "Happy"], ru: ["Взволнованный", "Грустный", "Испуганный", "Счастливый"] } },
      { face: "😮", emotion: { en: "Surprised", ru: "Удивлённый" }, options: { en: ["Surprised", "Sad", "Angry", "Tired"], ru: ["Удивлённый", "Грустный", "Злой", "Уставший"] } },
      { face: "😴", emotion: { en: "Tired", ru: "Уставший" }, options: { en: ["Happy", "Tired", "Angry", "Scared"], ru: ["Счастливый", "Уставший", "Злой", "Испуганный"] } },
      { face: "🤗", emotion: { en: "Loving", ru: "Любящий" }, options: { en: ["Loving", "Sad", "Angry", "Tired"], ru: ["Любящий", "Грустный", "Злой", "Уставший"] } },
      { face: "😇", emotion: { en: "Proud", ru: "Гордый" }, options: { en: ["Proud", "Sad", "Angry", "Scared"], ru: ["Гордый", "Грустный", "Злой", "Испуганный"] } },
    ],
    // Group 2
    [
      { face: "🥺", emotion: { en: "Pleading", ru: "Умоляющий" }, options: { en: ["Happy", "Pleading", "Angry", "Tired"], ru: ["Счастливый", "Умоляющий", "Злой", "Уставший"] } },
      { face: "😔", emotion: { en: "Disappointed", ru: "Разочарованный" }, options: { en: ["Happy", "Disappointed", "Angry", "Excited"], ru: ["Счастливый", "Разочарованный", "Злой", "Взволнованный"] } },
      { face: "🤔", emotion: { en: "Curious", ru: "Любопытный" }, options: { en: ["Curious", "Sad", "Angry", "Scared"], ru: ["Любопытный", "Грустный", "Злой", "Испуганный"] } },
      { face: "😌", emotion: { en: "Peaceful", ru: "Спокойный" }, options: { en: ["Happy", "Peaceful", "Angry", "Tired"], ru: ["Счастливый", "Спокойный", "Злой", "Уставший"] } },
    ],
  ],
  hard: [
    // Group 1
    [
      { face: "😤", emotion: { en: "Frustrated", ru: "Раздосадованный" }, options: { en: ["Happy", "Frustrated", "Scared", "Tired"], ru: ["Счастливый", "Раздосадованный", "Испуганный", "Уставший"] } },
      { face: "🥳", emotion: { en: "Excited", ru: "Взволнованный" }, options: { en: ["Excited", "Sad", "Angry", "Scared"], ru: ["Взволнованный", "Грустный", "Злой", "Испуганный"] } },
      { face: "😔", emotion: { en: "Disappointed", ru: "Разочарованный" }, options: { en: ["Happy", "Disappointed", "Angry", "Excited"], ru: ["Счастливый", "Разочарованный", "Злой", "Взволнованный"] } },
      { face: "🤔", emotion: { en: "Curious", ru: "Любопытный" }, options: { en: ["Curious", "Sad", "Angry", "Scared"], ru: ["Любопытный", "Грустный", "Злой", "Испуганный"] } },
      { face: "😳", emotion: { en: "Embarrassed", ru: "Смущённый" }, options: { en: ["Embarrassed", "Sad", "Happy", "Scared"], ru: ["Смущённый", "Грустный", "Счастливый", "Испуганный"] } },
    ],
    // Group 2
    [
      { face: "🤯", emotion: { en: "Mind-blown", ru: "Ошеломлённый" }, options: { en: ["Mind-blown", "Sad", "Angry", "Tired"], ru: ["Ошеломлённый", "Грустный", "Злой", "Уставший"] } },
      { face: "😶", emotion: { en: "Speechless", ru: "Безмолвный" }, options: { en: ["Happy", "Speechless", "Angry", "Scared"], ru: ["Счастливый", "Безмолвный", "Злой", "Испуганный"] } },
      { face: "🥱", emotion: { en: "Bored", ru: "Скучающий" }, options: { en: ["Bored", "Sad", "Happy", "Scared"], ru: ["Скучающий", "Грустный", "Счастливый", "Испуганный"] } },
      { face: "😣", emotion: { en: "Distressed", ru: "Расстроенный" }, options: { en: ["Happy", "Distressed", "Angry", "Excited"], ru: ["Счастливый", "Расстроенный", "Злой", "Взволнованный"] } },
    ],
  ],
};

export const emotionsFeelingsTasks = {
  easy: emotionsFeelingsTaskGroups.easy[0],
  medium: emotionsFeelingsTaskGroups.medium[0],
  hard: emotionsFeelingsTaskGroups.hard[0],
};

export const emotionsCalmingActivities = [
  {
    title: { en: "Deep Breathing", ru: "Глубокое дыхание" },
    instruction: { en: "Breathe in slowly... and out...", ru: "Вдохни медленно... и выдохни..." },
    icon: "🌬️",
    steps: { 
      en: ["Breathe in for 4 seconds", "Hold for 4 seconds", "Breathe out for 4 seconds", "Repeat 3 times"],
      ru: ["Вдохни на 4 секунды", "Задержи на 4 секунды", "Выдохни на 4 секунды", "Повтори 3 раза"]
    },
  },
  {
    title: { en: "Body Scan", ru: "Сканирование тела" },
    instruction: { en: "Notice how your body feels", ru: "Почувствуй своё тело" },
    icon: "🧘",
    steps: {
      en: ["Close your eyes", "Feel your feet on the ground", "Feel your hands relaxing", "Take a deep breath"],
      ru: ["Закрой глаза", "Почувствуй ноги на земле", "Почувствуй как расслабляются руки", "Сделай глубокий вдох"]
    },
  },
  {
    title: { en: "Happy Place", ru: "Счастливое место" },
    instruction: { en: "Think of a place that makes you happy", ru: "Подумай о месте, где тебе хорошо" },
    icon: "🏖️",
    steps: {
      en: ["Close your eyes", "Imagine your favorite place", "What do you see there?", "How does it feel?"],
      ru: ["Закрой глаза", "Представь своё любимое место", "Что ты там видишь?", "Как ты себя чувствуешь?"]
    },
  },
  {
    title: { en: "5-4-3-2-1 Grounding", ru: "Заземление 5-4-3-2-1" },
    instruction: { en: "Use your senses to calm down", ru: "Используй свои чувства для успокоения" },
    icon: "✋",
    steps: {
      en: ["Name 5 things you see", "Name 4 things you can touch", "Name 3 things you hear", "Name 2 things you smell", "Name 1 thing you taste"],
      ru: ["Назови 5 вещей, которые видишь", "Назови 4 вещи, которые можешь потрогать", "Назови 3 вещи, которые слышишь", "Назови 2 вещи, которые чувствуешь запахом", "Назови 1 вещь, которую чувствуешь на вкус"]
    },
  },
  {
    title: { en: "Butterfly Hug", ru: "Объятие бабочки" },
    instruction: { en: "Hug yourself like a butterfly", ru: "Обними себя как бабочка" },
    icon: "🦋",
    steps: {
      en: ["Cross your arms over your chest", "Tap your shoulders gently", "Left, right, left, right", "Feel calm and safe"],
      ru: ["Скрести руки на груди", "Мягко похлопывай по плечам", "Левое, правое, левое, правое", "Почувствуй спокойствие и безопасность"]
    },
  },
];

export const emotionsScenarioTaskGroups = {
  easy: [
    // Group 1
    [
      { scenario: { en: "Your friend shared their toy with you", ru: "Друг поделился с тобой игрушкой" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😨"], answer: "😊", explanation: { en: "Happy! It feels nice when friends share", ru: "Счастливый! Приятно когда друзья делятся" } },
      { scenario: { en: "You lost your favorite toy", ru: "Ты потерял любимую игрушку" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😴"], answer: "😢", explanation: { en: "Sad. It's okay to feel sad when we lose something", ru: "Грустный. Нормально грустить когда что-то теряешь" } },
      { scenario: { en: "Your mom made your favorite dinner", ru: "Мама приготовила твой любимый ужин" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😨"], answer: "😊", explanation: { en: "Happy! It's lovely when someone does something nice for us", ru: "Счастливый! Приятно когда кто-то делает что-то хорошее для нас" } },
    ],
    // Group 2
    [
      { scenario: { en: "You got a new pet", ru: "У тебя появился новый питомец" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😨"], answer: "😊", explanation: { en: "Excited and happy! Pets are wonderful companions", ru: "Взволнованный и счастливый! Питомцы — прекрасные друзья" } },
      { scenario: { en: "It's raining and you can't play outside", ru: "Идёт дождь и нельзя играть на улице" }, question: { en: "How might you feel?", ru: "Что бы ты мог почувствовать?" }, options: ["😊", "😢", "😠", "😴"], answer: "😢", explanation: { en: "Disappointed. It's okay to feel sad when plans change", ru: "Разочарованный. Нормально грустить когда планы меняются" } },
      { scenario: { en: "Your grandparents came to visit", ru: "Бабушка и дедушка приехали в гости" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😨"], answer: "😊", explanation: { en: "Happy! Family visits are special", ru: "Счастливый! Семейные визиты особенные" } },
    ],
  ],
  medium: [
    // Group 1
    [
      { scenario: { en: "Someone took your turn in line", ru: "Кто-то занял твою очередь" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😨"], answer: "😠", explanation: { en: "Angry. It's normal to feel upset, but we can talk about it calmly", ru: "Злой. Нормально расстроиться, но можно поговорить спокойно" } },
      { scenario: { en: "You're about to go on your first plane ride", ru: "Ты собираешься полететь на самолёте впервые" }, question: { en: "How might you feel?", ru: "Что бы ты мог почувствовать?" }, options: ["😊", "😢", "😨", "😴"], answer: "😨", explanation: { en: "Nervous or scared. New experiences can be scary but also exciting!", ru: "Нервничать или бояться. Новый опыт может быть страшным, но и волнующим!" } },
      { scenario: { en: "You won a game with your friends", ru: "Ты выиграл в игре с друзьями" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["🥳", "😢", "😠", "😨"], answer: "🥳", explanation: { en: "Excited and proud! Winning feels great, but remember to be kind to others", ru: "Взволнованный и гордый! Выигрывать приятно, но помни быть добрым к другим" } },
    ],
    // Group 2
    [
      { scenario: { en: "Your pet is sick", ru: "Твой питомец заболел" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "🥳"], answer: "😢", explanation: { en: "Sad or worried. It's natural to feel sad when someone we love is not well", ru: "Грустный или обеспокоенный. Естественно грустить когда тот, кого мы любим, нездоров" } },
      { scenario: { en: "You have to go to bed early", ru: "Тебе нужно рано лечь спать" }, question: { en: "How might you feel?", ru: "Что бы ты мог почувствовать?" }, options: ["😊", "😢", "😠", "😴"], answer: "😠", explanation: { en: "Frustrated. It's okay to feel upset, but rest is important for our bodies", ru: "Раздосадованный. Нормально расстроиться, но отдых важен для нашего тела" } },
      { scenario: { en: "You learned to ride a bike", ru: "Ты научился кататься на велосипеде" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😨"], answer: "😊", explanation: { en: "Proud and happy! Learning new skills is amazing", ru: "Гордый и счастливый! Учиться новому — это замечательно" } },
    ],
  ],
  hard: [
    // Group 1
    [
      { scenario: { en: "Your best friend moved to a new city", ru: "Твой лучший друг переехал в другой город" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "🥳"], answer: "😢", explanation: { en: "Sad. It's hard when friends move away, but you can still stay in touch", ru: "Грустный. Тяжело когда друзья уезжают, но вы можете оставаться на связи" } },
      { scenario: { en: "Someone said something mean to you", ru: "Кто-то сказал тебе что-то обидное" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "🥳"], answer: "😢", explanation: { en: "Sad or hurt. It's okay to feel this way, and you can talk to a trusted adult", ru: "Грустный или обиженный. Нормально так себя чувствовать, и можно поговорить с взрослым" } },
      { scenario: { en: "You have to give a presentation in front of the class", ru: "Тебе нужно выступить перед классом" }, question: { en: "How might you feel?", ru: "Что бы ты мог почувствовать?" }, options: ["😊", "😨", "😠", "😴"], answer: "😨", explanation: { en: "Nervous or scared. It's normal to feel this way, and practice helps!", ru: "Нервничать или бояться. Это нормально, и практика помогает!" } },
    ],
    // Group 2
    [
      { scenario: { en: "A thunder storm is happening outside", ru: "На улице гроза" }, question: { en: "How might you feel?", ru: "Что бы ты мог почувствовать?" }, options: ["😊", "😢", "😨", "🥳"], answer: "😨", explanation: { en: "Scared. Thunder can be loud and scary, but you're safe inside", ru: "Испуганный. Гром может быть громким и страшным, но ты в безопасности внутри" } },
      { scenario: { en: "You helped your little sibling with homework", ru: "Ты помог младшему брату/сестре с домашним заданием" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😨"], answer: "😊", explanation: { en: "Proud and happy! Helping others feels wonderful", ru: "Гордый и счастливый! Помогать другим — это замечательно" } },
      { scenario: { en: "You got a gold star at school", ru: "Ты получил золотую звёздочку в школе" }, question: { en: "How would you feel?", ru: "Что бы ты почувствовал?" }, options: ["😊", "😢", "😠", "😨"], answer: "😊", explanation: { en: "Proud and happy! Your hard work was recognized", ru: "Гордый и счастливый! Твоя тяжёлая работа была замечена" } },
    ],
  ],
};

export const emotionsScenarioTasks = {
  easy: emotionsScenarioTaskGroups.easy[0],
  medium: emotionsScenarioTaskGroups.medium[0],
  hard: emotionsScenarioTaskGroups.hard[0],
};

// NEW: Empathy task - what would help?
export const emotionsEmpathyTasks = {
  easy: [
    {
      scenario: { en: "Your friend is crying", ru: "Твой друг плачет" },
      question: { en: "What could help them feel better?", ru: "Что могло бы помочь им почувствовать себя лучше?" },
      options: { en: ["Give them a hug", "Walk away", "Laugh at them", "Ignore them"], ru: ["Обнять", "Уйти", "Посмеяться", "Игнорировать"] },
      answer: 0,
    },
    {
      scenario: { en: "Someone dropped their books", ru: "Кто-то уронил книги" },
      question: { en: "What could you do?", ru: "Что ты мог бы сделать?" },
      options: { en: ["Help pick them up", "Step over them", "Laugh", "Run away"], ru: ["Помочь поднять", "Перешагнуть", "Посмеяться", "Убежать"] },
      answer: 0,
    },
  ],
  medium: [
    {
      scenario: { en: "Your classmate is sitting alone at lunch", ru: "Твой одноклассник сидит один за обедом" },
      question: { en: "What could help them feel included?", ru: "Что могло бы помочь им не чувствовать себя одиноким?" },
      options: { en: ["Invite them to sit with you", "Ignore them", "Point and laugh", "Tell others to avoid them"], ru: ["Пригласить сесть с тобой", "Игнорировать", "Показывать и смеяться", "Сказать другим избегать их"] },
      answer: 0,
    },
    {
      scenario: { en: "Your friend failed a test and looks upset", ru: "Твой друг провалил тест и выглядит расстроенным" },
      question: { en: "What would be kind to say?", ru: "Что было бы добрым сказать?" },
      options: { en: ["It's okay, you'll do better next time", "I knew you'd fail", "That was easy", "You're not smart"], ru: ["Всё хорошо, в следующий раз получится лучше", "Я знал, что провалишься", "Это было легко", "Ты не умный"] },
      answer: 0,
    },
  ],
  hard: [
    {
      scenario: { en: "Someone at school is being teased by others", ru: "Кого-то в школе дразнят другие" },
      question: { en: "What's the best thing to do?", ru: "Что лучше всего сделать?" },
      options: { en: ["Stand up for them or tell an adult", "Join in teasing", "Watch and do nothing", "Walk away"], ru: ["Заступиться или сказать взрослому", "Присоединиться к дразнилкам", "Смотреть и ничего не делать", "Уйти"] },
      answer: 0,
    },
    {
      scenario: { en: "Your younger sibling is scared of the dark", ru: "Твой младший брат/сестра боится темноты" },
      question: { en: "How could you help?", ru: "Как ты мог бы помочь?" },
      options: { en: ["Stay with them and comfort them", "Laugh at their fear", "Make scary sounds", "Tell them to stop being a baby"], ru: ["Остаться с ними и утешить", "Посмеяться над страхом", "Издавать страшные звуки", "Сказать не быть ребёнком"] },
      answer: 0,
    },
  ],
};

// ============= ACTIVITY DEFINITIONS =============

export const mathActivities = [
  { id: 'counting', title: { en: "Count the Stars", ru: "Посчитай звёзды" }, emoji: "⭐" },
  { id: 'shapes', title: { en: "Shape Match", ru: "Найди фигуру" }, emoji: "🔷" },
  { id: 'numbers', title: { en: "Number Hunt", ru: "Найди число" }, emoji: "🔍" },
  { id: 'addition', title: { en: "Simple Addition", ru: "Простое сложение" }, emoji: "➕" },
  { id: 'comparison', title: { en: "Bigger or Smaller", ru: "Больше или меньше" }, emoji: "⚖️" },
];

export const readingActivities = [
  { id: 'pictureWords', title: { en: "Picture Words", ru: "Картинки и слова" }, emoji: "🖼️" },
  { id: 'soundMatch', title: { en: "Sound Match", ru: "Сопоставь звуки" }, emoji: "🔊" },
  { id: 'storyTime', title: { en: "Story Time", ru: "Время сказок" }, emoji: "📚" },
  { id: 'rhyming', title: { en: "Rhyming Words", ru: "Рифмующиеся слова" }, emoji: "🎵" },
];

export const logicActivities = [
  { id: 'pattern', title: { en: "Find the Pattern", ru: "Найди паттерн" }, emoji: "🔄" },
  { id: 'sorting', title: { en: "Sort It Out", ru: "Рассортируй" }, emoji: "📦" },
  { id: 'sequence', title: { en: "What Comes Next?", ru: "Что дальше?" }, emoji: "➡️" },
  { id: 'oddOneOut', title: { en: "Odd One Out", ru: "Найди лишнее" }, emoji: "🔍" },
  { id: 'memory', title: { en: "Memory Match", ru: "Найди пары" }, emoji: "🧠" },
];

export const emotionsActivities = [
  { id: 'feelings', title: { en: "How Do They Feel?", ru: "Что они чувствуют?" }, emoji: "😊" },
  { id: 'calming', title: { en: "Calm Corner", ru: "Уголок спокойствия" }, emoji: "🌿" },
  { id: 'scenarios', title: { en: "Emotion Cards", ru: "Карточки эмоций" }, emoji: "🎴" },
  { id: 'empathy', title: { en: "Helping Others", ru: "Помощь другим" }, emoji: "🤝" },
];

// Difficulty level labels
export const difficultyLabels = {
  easy: { en: "Easy", ru: "Лёгкий", color: "bg-green-100 text-green-700 border-green-200" },
  medium: { en: "Medium", ru: "Средний", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  hard: { en: "Hard", ru: "Сложный", color: "bg-red-100 text-red-700 border-red-200" },
};
