import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const VirtualAssistantSection = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { t } = useLanguage();

  const supportivePhrases = [
    t("assistant.phrase1"),
    t("assistant.phrase2"),
    t("assistant.phrase3"),
    t("assistant.phrase4"),
  ];

  const features = [
    t("assistant.feature1"),
    t("assistant.feature2"),
    t("assistant.feature3"),
    t("assistant.feature4"),
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-accent-light text-accent-foreground rounded-full text-sm font-medium mb-4">
                {t("assistant.badge")}
              </span>
              <h2 className="text-heading text-foreground mb-6">
                {t("assistant.title")}
              </h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                {t("assistant.subtitle")}
              </p>

              {/* Sound toggle */}
              <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="bg-card"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-primary" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>
                <div>
                  <p className="font-medium text-foreground">
                    {soundEnabled ? t("assistant.soundEnabled") : t("assistant.soundDisabled")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("assistant.soundOff")}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">{t("assistant.keyFeatures")}</p>
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right content - Chat preview */}
            <div className="relative">
              {/* Assistant character */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center shadow-card animate-float">
                  <span className="text-4xl">🌈</span>
                </div>
              </div>

              {/* Chat bubbles */}
              <div className="pt-12 p-6 bg-card rounded-3xl shadow-card border border-border/50">
                <div className="space-y-4">
                  {supportivePhrases.map((phrase, index) => (
                    <div
                      key={phrase}
                      className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl ${
                          index % 2 === 0
                            ? "bg-secondary-light text-foreground rounded-tl-md"
                            : "bg-primary-light text-foreground rounded-tr-md"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {index % 2 === 0 && (
                            <MessageCircle className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                          )}
                          <p className="text-sm leading-relaxed">{phrase}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input preview */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <div className="flex-1 text-sm text-muted-foreground">
                      {t("assistant.inputPlaceholder")}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualAssistantSection;
