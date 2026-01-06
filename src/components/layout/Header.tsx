import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Learning", href: "#learning" },
    { label: "For Parents", href: "#parents" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartLearning = () => {
    toast({
      title: "Welcome to CalmStep! 🌟",
      description: "Learning modules coming soon. Take your time exploring!",
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="default" onClick={handleStartLearning}>
              Start Learning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-primary-light transition-calm"
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
                  Start Learning
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
