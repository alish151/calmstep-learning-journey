import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.learning"), href: "#learning" },
    { label: t("nav.forParents"), href: "#parents" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartLearning = () => {
    toast({
      title: t("toast.welcome"),
      description: t("toast.welcomeDesc"),
    });
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
          </nav>

          {/* CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
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
              <div className="pt-4">
                <Button variant="hero" size="lg" className="w-full" onClick={handleStartLearning}>
                  {t("btn.startLearning")}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
