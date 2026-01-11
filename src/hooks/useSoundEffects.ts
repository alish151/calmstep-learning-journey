import { useCallback } from 'react';

// Sound URLs from free sound libraries (Web Audio API compatible)
const SOUNDS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  incorrect: 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3',
  complete: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  levelUp: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
};

type SoundType = keyof typeof SOUNDS;

// Check if sounds are enabled (stored in localStorage)
const isSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('calmstep-sounds-enabled');
  return stored !== 'false';
};

export const useSoundEffects = () => {
  const playSound = useCallback((type: SoundType) => {
    if (!isSoundEnabled()) return;
    
    try {
      const audio = new Audio(SOUNDS[type]);
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
    } catch {
      // Silently fail if audio creation fails
    }
  }, []);

  const playCorrect = useCallback(() => playSound('correct'), [playSound]);
  const playIncorrect = useCallback(() => playSound('incorrect'), [playSound]);
  const playComplete = useCallback(() => playSound('complete'), [playSound]);
  const playClick = useCallback(() => playSound('click'), [playSound]);
  const playLevelUp = useCallback(() => playSound('levelUp'), [playSound]);

  return {
    playSound,
    playCorrect,
    playIncorrect,
    playComplete,
    playClick,
    playLevelUp,
  };
};

// Utility to toggle sounds
export const toggleSounds = (enabled: boolean): void => {
  localStorage.setItem('calmstep-sounds-enabled', String(enabled));
};

export const getSoundsEnabled = (): boolean => isSoundEnabled();
