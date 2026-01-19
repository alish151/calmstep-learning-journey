import { useNavigate, useLocation } from "react-router-dom";
import { Calculator, BookOpen, Puzzle, Heart, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { id: "math", icon: Calculator, emoji: "🔢", path: "/learn/math" },
  { id: "reading", icon: BookOpen, emoji: "📖", path: "/learn/reading" },
  { id: "logic", icon: Puzzle, emoji: "🧩", path: "/learn/logic" },
  { id: "emotions", icon: Heart, emoji: "💭", path: "/learn/emotions" },
  { id: "social", icon: Users, emoji: "🤝", path: "/social-scenarios" },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/social-scenarios") {
      return location.pathname === path;
    }
    return location.pathname.includes(path.split("/")[2]);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/30 sm:hidden">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-all ${
                active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-[10px] font-medium truncate max-w-[60px]">
                {item.id === "social" 
                  ? (t("nav.socialScenarios") || "Social").split(" ")[0]
                  : t(`learning.${item.id}`)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
