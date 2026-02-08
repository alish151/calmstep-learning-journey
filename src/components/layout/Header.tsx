import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, BarChart3, LogIn, BookOpen, Calculator, Brain, Smile, Users, Crown, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import UserProfileMenu from "@/components/UserProfileMenu";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();

  const isOnHomePage = location.pathname === "/";

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.learning"), href: "#learning" },
    { label: t("nav.forParents"), href: "#parents" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (isOnHomePage) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleStartLearning = () => {
    setIsMenuOpen(false);
    navigate("/learn/math");
  };

  const handleProgressClick = () => {
    setIsMenuOpen(false);
    navigate("/progress");
  };

  const handleSignOut = async () => {
    setIsMenuOpen(false);
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSignIn = () => {
    setIsMenuOpen(false);
    navigate("/auth");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick("#home")} 
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-calm group-hover:scale-105">
              <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-foreground">CalmStep</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium"
              >
                {link.label}
              </button>
            ))}
            {/* Modules Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium">
                  {t("nav.learning")}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-popover border border-border shadow-card z-50">
                <DropdownMenuItem onClick={() => { navigate("/learn/math"); }} className="cursor-pointer gap-2">
                  <Calculator className="w-4 h-4" /> {t("modules.math")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate("/learn/reading"); }} className="cursor-pointer gap-2">
                  <BookOpen className="w-4 h-4" /> {t("modules.reading")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate("/learn/logic"); }} className="cursor-pointer gap-2">
                  <Brain className="w-4 h-4" /> {t("modules.logic")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate("/learn/emotions"); }} className="cursor-pointer gap-2">
                  <Smile className="w-4 h-4" /> {t("modules.emotions")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate("/social-scenarios"); }} className="cursor-pointer gap-2">
                  <Users className="w-4 h-4" /> {t("modules.social")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={() => navigate("/pricing")} className="gap-1">
              <Crown className="w-4 h-4" />
              {t("nav.pricing")}
            </Button>
          </nav>

          {/* CTA Button & User Area */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            {user ? (
              <UserProfileMenu />
            ) : (
              <Button variant="ghost" size="sm" onClick={handleSignIn}>
                <LogIn className="w-4 h-4" />
                {t("nav.signIn")}
              </Button>
            )}
            <Button variant="hero" size="default" onClick={handleStartLearning}>
              {t("btn.startLearning")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-xl hover:bg-primary-light transition-calm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-fade-in-up">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium text-left"
                >
                  {link.label}
                </button>
              ))}
              {/* Progress Link */}
              <button
                onClick={handleProgressClick}
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium text-left flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                {t("nav.progress")}
              </button>
              {/* Module links */}
              <div className="border-t border-border/30 pt-2 mt-2">
                <p className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("nav.learning")}</p>
                <button onClick={() => { setIsMenuOpen(false); navigate("/learn/math"); }} className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium text-left flex items-center gap-2 w-full">
                  <Calculator className="w-4 h-4" /> {t("modules.math")}
                </button>
                <button onClick={() => { setIsMenuOpen(false); navigate("/learn/reading"); }} className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium text-left flex items-center gap-2 w-full">
                  <BookOpen className="w-4 h-4" /> {t("modules.reading")}
                </button>
                <button onClick={() => { setIsMenuOpen(false); navigate("/learn/logic"); }} className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium text-left flex items-center gap-2 w-full">
                  <Brain className="w-4 h-4" /> {t("modules.logic")}
                </button>
                <button onClick={() => { setIsMenuOpen(false); navigate("/learn/emotions"); }} className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium text-left flex items-center gap-2 w-full">
                  <Smile className="w-4 h-4" /> {t("modules.emotions")}
                </button>
                <button onClick={() => { setIsMenuOpen(false); navigate("/social-scenarios"); }} className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-primary-light rounded-xl transition-calm font-medium text-left flex items-center gap-2 w-full">
                  <Users className="w-4 h-4" /> {t("modules.social")}
                </button>
              </div>
              <div className="pt-4 flex flex-col gap-2">
                <Button variant="hero" size="lg" className="w-full" onClick={handleStartLearning}>
                  {t("btn.startLearning")}
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => { setIsMenuOpen(false); navigate("/pricing"); }}>
                  <Crown className="w-4 h-4" />
                  {t("nav.pricing")}
                </Button>
                {user ? (
                  <>
                    <Button variant="outline" size="lg" className="w-full" onClick={() => { setIsMenuOpen(false); navigate("/subscription"); }}>
                      <CreditCard className="w-4 h-4" />
                      {language === "ru" ? "Подписка" : "Subscription"}
                    </Button>
                    <Button variant="ghost" size="lg" className="w-full" onClick={handleSignOut}>
                      {t("nav.signOut")}
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="lg" className="w-full" onClick={handleSignIn}>
                    <LogIn className="w-4 h-4" />
                    {t("nav.signIn")}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
