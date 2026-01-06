import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-gentle-pulse" />
        
        {/* Decorative shapes */}
        <div className="absolute top-32 left-1/4 w-4 h-4 bg-primary/40 rounded-full animate-float animation-delay-300" />
        <div className="absolute bottom-40 right-1/3 w-6 h-6 bg-accent/50 rounded-full animate-float animation-delay-100" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-secondary/60 rounded-full animate-float animation-delay-400" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light border border-primary/20 rounded-full mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground">Safe & Supportive Learning</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-display font-bold text-foreground mb-6 animate-fade-in-up animation-delay-100 leading-tight">
              Calm steps toward{" "}
              <span className="text-primary relative inline-block">
                learning
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-in-up animation-delay-200">
              A gentle learning space designed for children with autism. 
              No timers, no pressure, no grades — just learning at your own comfortable pace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in-up animation-delay-300">
              <Button variant="hero" size="xl" className="group">
                Start Learning
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Learn How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/30 animate-fade-in-up animation-delay-400">
              <p className="text-sm text-muted-foreground mb-4">Trusted by families and educators</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 items-center opacity-70">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20" />
                  <span className="font-medium text-foreground text-sm">1000+ Families</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary/30" />
                  <span className="font-medium text-foreground text-sm">200+ Educators</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/30" />
                  <span className="font-medium text-foreground text-sm">Child-First</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Hero illustration */}
          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <img 
                src={heroIllustration} 
                alt="Diverse children learning together in a calm, nature-inspired environment" 
                className="w-full h-auto object-cover"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
            </div>
            {/* Floating decorative elements around the image */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float animation-delay-300" />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
          <path
            d="M0 50C240 80 480 100 720 80C960 60 1200 40 1440 60V100H0V50Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
