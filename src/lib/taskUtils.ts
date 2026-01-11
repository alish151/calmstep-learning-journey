// Utility functions for random task selection

/**
 * Fisher-Yates shuffle algorithm for randomizing arrays
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Select random tasks from a task pool
 * @param tasks Array of tasks
 * @param count Number of tasks to select (default: 5)
 */
export function selectRandomTasks<T>(tasks: T[], count: number = 5): T[] {
  const shuffled = shuffleArray(tasks);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get a random element from an array
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
