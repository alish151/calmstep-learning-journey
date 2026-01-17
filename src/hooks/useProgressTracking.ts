import { useState, useEffect, useCallback } from 'react';

interface ModuleProgress {
  completedTasks: number;
  totalAttempts: number;
  correctAnswers: number;
  lastPlayed: string | null;
  activities: {
    [activityIndex: number]: {
      completed: boolean;
      score: number;
      attempts: number;
    };
  };
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  streakDates: string[]; // Array of ISO date strings (date only, no time)
}

interface ProgressData {
  math: ModuleProgress;
  reading: ModuleProgress;
  logic: ModuleProgress;
  emotions: ModuleProgress;
  social: ModuleProgress;
  streak: StreakData;
}

const defaultModuleProgress: ModuleProgress = {
  completedTasks: 0,
  totalAttempts: 0,
  correctAnswers: 0,
  lastPlayed: null,
  activities: {},
};

const defaultStreakData: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  streakDates: [],
};

const defaultProgressData: ProgressData = {
  math: { ...defaultModuleProgress },
  reading: { ...defaultModuleProgress },
  logic: { ...defaultModuleProgress },
  emotions: { ...defaultModuleProgress },
  social: { ...defaultModuleProgress },
  streak: { ...defaultStreakData },
};

const STORAGE_KEY = 'calmstep_progress';

// Helper to get date string without time
const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper to check if two dates are consecutive
const areConsecutiveDays = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

// Helper to check if date is today
const isToday = (dateString: string): boolean => {
  return dateString === getDateString(new Date());
};

// Helper to check if date is yesterday
const isYesterday = (dateString: string): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === getDateString(yesterday);
};

export const useProgressTracking = () => {
  const [progress, setProgress] = useState<ProgressData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    return defaultProgressData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [progress]);

  const updateStreak = useCallback((prev: ProgressData): StreakData => {
    const today = getDateString(new Date());
    const { streak } = prev;
    
    // If already practiced today, no change to streak
    if (streak.lastActivityDate === today) {
      return streak;
    }
    
    let newCurrentStreak = 1;
    let newLongestStreak = streak.longestStreak;
    let newStreakDates = [...streak.streakDates];
    
    // Check if we're continuing a streak
    if (streak.lastActivityDate) {
      if (isYesterday(streak.lastActivityDate)) {
        // Continuing streak from yesterday
        newCurrentStreak = streak.currentStreak + 1;
      } else if (!isToday(streak.lastActivityDate)) {
        // Streak broken - starting fresh
        newCurrentStreak = 1;
        newStreakDates = [];
      }
    }
    
    // Update longest streak if current is higher
    if (newCurrentStreak > newLongestStreak) {
      newLongestStreak = newCurrentStreak;
    }
    
    // Add today to streak dates if not already there
    if (!newStreakDates.includes(today)) {
      newStreakDates.push(today);
      // Keep only last 30 days of streak history
      if (newStreakDates.length > 30) {
        newStreakDates = newStreakDates.slice(-30);
      }
    }
    
    return {
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      lastActivityDate: today,
      streakDates: newStreakDates,
    };
  }, []);

  const updateProgress = useCallback((
    module: keyof Omit<ProgressData, 'streak'>,
    activityIndex: number,
    score: number,
    totalQuestions: number,
    wasSuccessful: boolean
  ) => {
    setProgress(prev => {
      const moduleProgress = prev[module];
      const activity = moduleProgress.activities[activityIndex] || {
        completed: false,
        score: 0,
        attempts: 0,
      };

      // Update streak data
      const newStreak = updateStreak(prev);

      return {
        ...prev,
        streak: newStreak,
        [module]: {
          ...moduleProgress,
          completedTasks: wasSuccessful 
            ? moduleProgress.completedTasks + (activity.completed ? 0 : 1)
            : moduleProgress.completedTasks,
          totalAttempts: moduleProgress.totalAttempts + 1,
          correctAnswers: moduleProgress.correctAnswers + score,
          lastPlayed: new Date().toISOString(),
          activities: {
            ...moduleProgress.activities,
            [activityIndex]: {
              completed: activity.completed || wasSuccessful,
              score: Math.max(activity.score, score),
              attempts: activity.attempts + 1,
            },
          },
        },
      };
    });
  }, [updateStreak]);

  const getModuleProgress = useCallback((module: keyof Omit<ProgressData, 'streak'>): ModuleProgress => {
    return progress[module];
  }, [progress]);

  const getActivityProgress = useCallback((module: keyof Omit<ProgressData, 'streak'>, activityIndex: number) => {
    return progress[module].activities[activityIndex] || {
      completed: false,
      score: 0,
      attempts: 0,
    };
  }, [progress]);

  const getTotalProgress = useCallback(() => {
    const { streak, ...modules } = progress;
    const moduleValues = Object.values(modules) as ModuleProgress[];
    const totalCompleted = moduleValues.reduce((sum, m) => sum + m.completedTasks, 0);
    const totalAttempts = moduleValues.reduce((sum, m) => sum + m.totalAttempts, 0);
    const totalCorrect = moduleValues.reduce((sum, m) => sum + m.correctAnswers, 0);
    
    return {
      totalCompleted,
      totalAttempts,
      totalCorrect,
      completionRate: totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0,
    };
  }, [progress]);

  const getStreakData = useCallback((): StreakData => {
    // Check if streak is still valid (not broken)
    const { streak } = progress;
    if (!streak.lastActivityDate) {
      return streak;
    }
    
    const today = getDateString(new Date());
    
    // If last activity was today or yesterday, streak is still valid
    if (isToday(streak.lastActivityDate) || isYesterday(streak.lastActivityDate)) {
      return streak;
    }
    
    // Streak is broken - return reset values (but keep longest streak)
    return {
      ...streak,
      currentStreak: 0,
    };
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgressData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    progress,
    updateProgress,
    getModuleProgress,
    getActivityProgress,
    getTotalProgress,
    getStreakData,
    resetProgress,
  };
};

export type { ProgressData, ModuleProgress, StreakData };
