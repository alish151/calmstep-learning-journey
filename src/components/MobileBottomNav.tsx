import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { saveScrollPosition } from "@/hooks/useScrollPosition";
import { useProgressTracking } from "@/hooks/useProgressTracking";

const mainNavItems = [
  { id: "home", emoji: "🏠", path: "/", labelKey: "nav.home", moduleKey: null },
  { id: "math", emoji: "🔢", path: "/learn/math", labelKey: "learning.math", moduleKey: "math" as const },
  { id: "reading", emoji: "📖", path: "/learn/reading", labelKey: "learning.reading", moduleKey: "reading" as const },
  { id: "progress", emoji: "📊", path: "/progress", labelKey: "nav.progress", moduleKey: null },
];

const moreNavItems = [
  { id: "logic", emoji: "🧩", path: "/learn/logic", labelKey: "learning.logic", moduleKey: "logic" as const },
  { id: "emotions", emoji: "💭", path: "/learn/emotions", labelKey: "learning.emotions", moduleKey: "emotions" as const },
  { id: "social", emoji: "🤝", path: "/social-scenarios", labelKey: "nav.socialScenarios", moduleKey: "social" as const },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [showMore, setShowMore] = useState(false);
  const { progress } = useProgressTracking();

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

  const getModuleProgress = (moduleKey: "math" | "reading" | "logic" | "emotions" | "social" | null) => {
    if (!moduleKey) return null;
    const moduleProgress = progress[moduleKey];
    return moduleProgress?.completedTasks || 0;
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
              const completedTasks = getModuleProgress(item.moduleKey);
              const hasProgress = completedTasks !== null && completedTasks > 0;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all relative ${
                    active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="relative">
                    <span className="text-2xl">{item.emoji}</span>
                    {hasProgress && (
                      <div className="absolute -top-1 -right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium truncate max-w-full">
                    {t(item.labelKey)}
                  </span>
                  {hasProgress && (
                    <span className="text-[9px] text-green-600 font-medium">
                      {completedTasks} ✓
                    </span>
                  )}
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
            const completedTasks = getModuleProgress(item.moduleKey);
            const hasProgress = completedTasks !== null && completedTasks > 0;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`flex flex-col items-center gap-0.5 py-2 px-2 rounded-lg transition-all relative ${
                  active 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="relative">
                  <span className="text-xl">{item.emoji}</span>
                  {hasProgress && (
                    <div className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
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
