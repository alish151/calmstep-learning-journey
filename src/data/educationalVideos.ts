import { VideoData } from "@/components/YouTubeVideo";

// Educational YouTube videos for kids (short, age-appropriate content)
// Using popular educational channels like: Numberblocks, Super Simple Songs, Cocomelon, etc.

export const mathVideos: VideoData[] = [
  {
    id: "TvMyssfAUx0",
    title: { en: "Counting 1-10 for Kids", ru: "Счёт от 1 до 10 для детей" },
  },
  {
    id: "DR-cfDsHCGA",
    title: { en: "Learn Shapes for Children", ru: "Учим фигуры для детей" },
  },
  {
    id: "85M1yxIcHpw",
    title: { en: "Number Song 1-20", ru: "Песенка про числа 1-20" },
  },
  {
    id: "e0dJWfQHF8Y",
    title: { en: "Addition for Kids", ru: "Сложение для детей" },
  },
  {
    id: "CLGJ-LVCQrM",
    title: { en: "Comparing Numbers", ru: "Сравнение чисел" },
  },
];

export const readingVideos: VideoData[] = [
  {
    id: "36IBDpTRVNE",
    title: { en: "ABC Phonics Song", ru: "Песенка про алфавит" },
  },
  {
    id: "BELlZKpi1Zs",
    title: { en: "Learn to Read", ru: "Учимся читать" },
  },
  {
    id: "hq3yfQnllfQ",
    title: { en: "Alphabet Song", ru: "Песня алфавита" },
  },
  {
    id: "WA3qSVyjuDs",
    title: { en: "Rhyming Words for Kids", ru: "Рифмы для детей" },
  },
  {
    id: "saF3-f0XWAY",
    title: { en: "Story Time for Kids", ru: "Сказки для детей" },
  },
];

export const logicVideos: VideoData[] = [
  {
    id: "wtPI9Qzqb3U",
    title: { en: "Pattern Recognition", ru: "Распознавание паттернов" },
  },
  {
    id: "6Ho3CYzz5t0",
    title: { en: "Sorting and Matching", ru: "Сортировка и сопоставление" },
  },
  {
    id: "7OJvMMNxMCo",
    title: { en: "Critical Thinking for Kids", ru: "Логическое мышление для детей" },
  },
  {
    id: "DnHLvnkXpKM",
    title: { en: "What Comes Next?", ru: "Что дальше?" },
  },
  {
    id: "cLDwMmDq5ow",
    title: { en: "Brain Games for Kids", ru: "Игры для развития мозга" },
  },
];

export const emotionsVideos: VideoData[] = [
  {
    id: "ZxHU7QQYjF0",
    title: { en: "Feelings and Emotions", ru: "Чувства и эмоции" },
  },
  {
    id: "K4bm6S7qvJk",
    title: { en: "Managing Big Emotions", ru: "Управление эмоциями" },
  },
  {
    id: "UTSSz6x2vPg",
    title: { en: "Calm Down Song", ru: "Песня для успокоения" },
  },
  {
    id: "QT6FdhKriB8",
    title: { en: "Being Kind to Others", ru: "Быть добрым к другим" },
  },
  {
    id: "3e6Z4F5c6wo",
    title: { en: "Understanding Feelings", ru: "Понимание чувств" },
  },
];

// Helper function to get random videos for a module
export function getRandomVideos(videos: VideoData[], count: number = 2): VideoData[] {
  const shuffled = [...videos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, videos.length));
}
