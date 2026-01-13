import { useEffect, useState } from "react";

interface CelebrationAnimationProps {
  show: boolean;
  onComplete?: () => void;
}

const CelebrationAnimation = ({ show, onComplete }: CelebrationAnimationProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    color: string;
    emoji: string;
  }>>([]);

  useEffect(() => {
    if (show) {
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#A855F7', '#22C55E', '#F97316'];
      const emojis = ['🎉', '⭐', '🌟', '✨', '🎊', '💫', '🏆', '👏'];
      
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }));
      
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-celebration-particle"
          style={{
            left: `${particle.x}%`,
            top: `-10%`,
            fontSize: `${particle.scale * 2}rem`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 1}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
      
      {/* Center celebration burst */}
      {show && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-celebration-burst">
            <span className="text-7xl">🎉</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CelebrationAnimation;
