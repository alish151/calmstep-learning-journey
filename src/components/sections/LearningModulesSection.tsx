import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, BookOpen, Puzzle, Heart, ArrowRight } from "lucide-react";

const LearningModulesSection = () => {
  const modules = [
    {
      icon: Calculator,
      emoji: "🔢",
      title: "Math",
      description: "Shapes, counting, and number recognition through visual and tactile activities.",
      topics: ["Counting objects", "Shape recognition", "Simple patterns"],
      color: "primary",
      bgColor: "bg-primary-light",
      borderColor: "border-primary/20",
    },
    {
      icon: BookOpen,
      emoji: "📖",
      title: "Reading",
      description: "Connect images to words to sounds in a gentle, multi-sensory approach.",
      topics: ["Image-word matching", "Phonics basics", "Story time"],
      color: "secondary",
      bgColor: "bg-secondary-light",
      borderColor: "border-secondary/30",
    },
    {
      icon: Puzzle,
      emoji: "🧩",
      title: "Logic",
      description: "Find patterns, sort objects, and develop problem-solving skills playfully.",
      topics: ["Finding similarities", "Sorting games", "Simple puzzles"],
      color: "accent",
      bgColor: "bg-accent-light",
      borderColor: "border-accent/20",
    },
    {
      icon: Heart,
      emoji: "💭",
      title: "Emotions",
      description: "Recognize, understand, and express feelings in a safe environment.",
      topics: ["Feeling identification", "Emotion cards", "Calm strategies"],
      color: "warm",
      bgColor: "bg-warm-light",
      borderColor: "border-warm/20",
    },
  ];

  return (
    <section id="learning" className="py-24 gradient-calm">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary-foreground rounded-full text-sm font-medium mb-4">
            Learning Modules
          </span>
          <h2 className="text-heading text-foreground mb-4">
            Explore at your own pace
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Four carefully designed learning areas, each with activities 
            that adapt to your child's comfort and interests.
          </p>
        </div>

        {/* Modules grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {modules.map((module, index) => (
            <Card 
              key={module.title}
              className={`group overflow-hidden ${module.bgColor} ${module.borderColor} border-2 hover:border-opacity-40`}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{module.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">Learning module</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {module.description}
                </p>

                <div className="space-y-2 mb-6">
                  {module.topics.map((topic) => (
                    <div 
                      key={topic}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {topic}
                    </div>
                  ))}
                </div>

                <Button variant="soft" size="sm" className="group/btn">
                  Explore module
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social scenarios callout */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-card border-calm/30 border-2">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-8 bg-calm-light flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl block mb-4">🤝</span>
                    <h3 className="text-xl font-bold text-foreground">Social Scenarios</h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    Practice real-life situations safely
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Interactive scenarios help children practice communication, 
                    asking for help, and navigating school situations — 
                    all in a safe environment with no failure states or punishment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["School situations", "Making friends", "Asking for help", "Taking turns"].map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-calm-light text-calm-foreground rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LearningModulesSection;
