import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { saveScrollPosition } from "@/hooks/useScrollPosition";

const mainNavItems = [
  { id: "home", emoji: "🏠", path: "/", labelKey: "nav.home" },
  { id: "math", emoji: "🔢", path: "/learn/math", labelKey: "learning.math" },
  { id: "reading", emoji: "📖", path: "/learn/reading", labelKey: "learning.reading" },
  { id: "progress", emoji: "📊", path: "/progress", labelKey: "nav.progress" },
];

const moreNavItems = [
  { id: "logic", emoji: "🧩", path: "/learn/logic", labelKey: "learning.logic" },
  { id: "emotions", emoji: "💭", path: "/learn/emotions", labelKey: "learning.emotions" },
  { id: "social", emoji: "🤝", path: "/social-scenarios", labelKey: "nav.socialScenarios" },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [showMore, setShowMore] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/progress") {
      return location.pathname === "/progress";
    }
    if (path === "/social-scenarios") {
      return location.pathname === "/social-scenarios";
    }
    if (path.startsWith("/learn/")) {
      return location.pathname.includes(path.split("/")[2]);
    }
    return false;
  };

  const isMoreActive = moreNavItems.some(item => isActive(item.path));

  const getLabel = (item: typeof mainNavItems[0]) => {
    const translated = t(item.labelKey);
    if (item.id === "home") return translated || "Home";
    if (item.id === "progress") return translated || "Progress";
    return translated;
  };

  const handleNavigate = (path: string) => {
    saveScrollPosition(location.pathname, window.scrollY);
    setShowMore(false);
    navigate(path);
  };

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setShowMore(false)}
        />
      )}
      
      {/* More menu popup */}
      {showMore && (
        <div className="fixed bottom-[72px] left-4 right-4 z-50 bg-card rounded-2xl shadow-lg border border-border/30 p-4 sm:hidden animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground text-sm">{t("nav.moreModules")}</h3>
            <button 
              onClick={() => setShowMore(false)}
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {moreNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all ${
                    active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs font-medium truncate max-w-full">
                    {t(item.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/30 sm:hidden">
        <div className="flex items-center justify-around py-2 px-1">
          {mainNavItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
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
          
          {/* More button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center gap-0.5 py-2 px-2 rounded-lg transition-all ${
              showMore || isMoreActive
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">{showMore ? "✕" : "⋯"}</span>
            <span className="text-[10px] font-medium">
              {t("nav.more")}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default MobileBottomNav;
