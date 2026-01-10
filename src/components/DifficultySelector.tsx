import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { DifficultyLevel, difficultyLabels } from "@/data/taskData";
import { Star } from "lucide-react";

interface DifficultySelectorProps {
  selectedDifficulty: DifficultyLevel | null;
  onSelect: (difficulty: DifficultyLevel) => void;
}

const DifficultySelector = ({ selectedDifficulty, onSelect }: DifficultySelectorProps) => {
  const { language } = useLanguage();

  const difficulties: DifficultyLevel[] = ['easy', 'medium', 'hard'];

  const getStars = (level: DifficultyLevel) => {
    const count = level === 'easy' ? 1 : level === 'medium' ? 2 : 3;
    return Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-current" />
    ));
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground text-center">
        {language === 'en' ? 'Choose difficulty level' : 'Выбери уровень сложности'}
      </p>
      <div className="flex gap-3 justify-center">
        {difficulties.map((level) => (
          <Button
            key={level}
            variant={selectedDifficulty === level ? "default" : "outline"}
            className={`flex-1 flex flex-col gap-1 h-auto py-3 ${
              selectedDifficulty === level ? '' : difficultyLabels[level].color
            }`}
            onClick={() => onSelect(level)}
          >
            <div className="flex items-center gap-0.5">
              {getStars(level)}
            </div>
            <span className="text-sm font-medium">
              {difficultyLabels[level][language]}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
