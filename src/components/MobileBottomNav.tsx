import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { id: "home", emoji: "🏠", path: "/", labelKey: "nav.home" },
  { id: "math", emoji: "🔢", path: "/learn/math", labelKey: "learning.math" },
  { id: "reading", emoji: "📖", path: "/learn/reading", labelKey: "learning.reading" },
  { id: "logic", emoji: "🧩", path: "/learn/logic", labelKey: "learning.logic" },
  { id: "progress", emoji: "📊", path: "/progress", labelKey: "nav.progress" },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/progress") {
      return location.pathname === "/progress";
    }
    return location.pathname.includes(path.split("/")[2]);
  };

  const getLabel = (item: typeof navItems[0]) => {
    const translated = t(item.labelKey);
    // Shorten labels for mobile
    if (item.id === "home") return translated || "Home";
    if (item.id === "progress") return translated || "Progress";
    return translated;
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
              className={`flex flex-col items-center gap-0.5 py-2 px-2 rounded-lg transition-all ${
                active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-[10px] font-medium truncate max-w-[56px]">
                {getLabel(item)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
