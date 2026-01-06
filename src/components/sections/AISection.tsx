import { Card, CardContent } from "@/components/ui/card";
import { Brain, Activity, Route, Sparkles } from "lucide-react";

const AISection = () => {
  const aiFeatures = [
    {
      icon: Activity,
      title: "Adaptive Difficulty",
      description: "Automatically adjusts lesson complexity based on your child's responses and comfort level.",
    },
    {
      icon: Brain,
      title: "Overload Detection",
      description: "Recognizes signs of cognitive or sensory overload and suggests calming breaks.",
    },
    {
      icon: Route,
      title: "Personalized Paths",
      description: "Creates unique learning journeys tailored to each child's interests and learning style.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Powered by AI</span>
              </div>
              
              <h2 className="text-heading text-foreground mb-6">
                Smart support, gentle guidance
              </h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                Our AI works quietly in the background, making learning smoother 
                and more comfortable — always supporting, never replacing, 
                the care of teachers and parents.
              </p>

              {/* AI features list */}
              <div className="space-y-4">
                {aiFeatures.map((feature) => (
                  <div 
                    key={feature.title}
                    className="flex items-start gap-4 p-4 bg-card rounded-2xl shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - Visual representation */}
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-card to-primary-light border-primary/20">
                <div className="text-center">
                  {/* Central brain icon */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-gentle-pulse">
                    <Brain className="w-12 h-12 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    How AI Helps
                  </h3>

                  {/* Connection lines */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[
                      { emoji: "👁️", label: "Observes" },
                      { emoji: "🎯", label: "Adapts" },
                      { emoji: "💚", label: "Supports" },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-card shadow-soft flex items-center justify-center">
                          <span className="text-2xl">{item.emoji}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Trust message */}
                  <div className="mt-8 p-4 bg-card rounded-xl">
                    <p className="text-sm text-muted-foreground italic">
                      "AI as a supportive assistant, not a replacement for human connection"
                    </p>
                  </div>
                </div>
              </Card>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/30 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/30 rounded-full blur-xl animate-float animation-delay-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
