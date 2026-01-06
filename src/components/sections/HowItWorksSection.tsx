import { User, Clock, Trophy, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorksSection = () => {
  const features = [
    {
      icon: User,
      title: "Personal Profile",
      description: "Create a unique profile with preferred colors, sounds, and learning pace that feels just right.",
      color: "primary",
    },
    {
      icon: Clock,
      title: "Micro-Lessons",
      description: "Short 1-2 minute lessons that fit naturally into any routine without feeling overwhelming.",
      color: "secondary",
    },
    {
      icon: Trophy,
      title: "No Pressure",
      description: "No grades, no comparisons, no timers. Just gentle encouragement and celebrating small wins.",
      color: "accent",
    },
    {
      icon: Palette,
      title: "Adaptive Learning",
      description: "AI-powered adjustments that respond to comfort levels and learning preferences in real-time.",
      color: "calm",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "bg-primary-light text-primary",
      secondary: "bg-secondary-light text-secondary-foreground",
      accent: "bg-accent-light text-accent-foreground",
      calm: "bg-calm-light text-calm-foreground",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section id="how-it-works" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 gradient-calm opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary-light text-secondary-foreground rounded-full text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-heading text-foreground mb-4">
            Learning designed with care
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Every aspect of CalmStep is thoughtfully created to provide a safe, 
            comfortable, and effective learning experience.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group border-none bg-card hover:bg-card/80"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl ${getColorClasses(feature.color)} flex items-center justify-center mb-5 transition-calm group-hover:scale-105`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 p-8 rounded-3xl gradient-warm border border-warm/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-warm flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🌟</span>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Every child learns differently
              </h3>
              <p className="text-muted-foreground max-w-2xl">
                CalmStep adapts to each child's unique needs. Our AI gently adjusts difficulty, 
                detects signs of overload, and creates personalized learning paths — 
                always supporting, never replacing, the guidance of teachers and parents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
