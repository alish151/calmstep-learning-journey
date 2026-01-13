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

interface ProgressData {
  math: ModuleProgress;
  reading: ModuleProgress;
  logic: ModuleProgress;
  emotions: ModuleProgress;
  social: ModuleProgress;
}

const defaultModuleProgress: ModuleProgress = {
  completedTasks: 0,
  totalAttempts: 0,
  correctAnswers: 0,
  lastPlayed: null,
  activities: {},
};

const defaultProgressData: ProgressData = {
  math: { ...defaultModuleProgress },
  reading: { ...defaultModuleProgress },
  logic: { ...defaultModuleProgress },
  emotions: { ...defaultModuleProgress },
  social: { ...defaultModuleProgress },
};

const STORAGE_KEY = 'calmstep_progress';

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

  const updateProgress = useCallback((
    module: keyof ProgressData,
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

      return {
        ...prev,
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
  }, []);

  const getModuleProgress = useCallback((module: keyof ProgressData): ModuleProgress => {
    return progress[module];
  }, [progress]);

  const getActivityProgress = useCallback((module: keyof ProgressData, activityIndex: number) => {
    return progress[module].activities[activityIndex] || {
      completed: false,
      score: 0,
      attempts: 0,
    };
  }, [progress]);

  const getTotalProgress = useCallback(() => {
    const modules = Object.values(progress);
    const totalCompleted = modules.reduce((sum, m) => sum + m.completedTasks, 0);
    const totalAttempts = modules.reduce((sum, m) => sum + m.totalAttempts, 0);
    const totalCorrect = modules.reduce((sum, m) => sum + m.correctAnswers, 0);
    
    return {
      totalCompleted,
      totalAttempts,
      totalCorrect,
      completionRate: totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0,
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
    resetProgress,
  };
};

export type { ProgressData, ModuleProgress };
