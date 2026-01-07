import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ru" : "en")}
      className="gap-2 text-muted-foreground hover:text-foreground"
    >
      <Globe className="w-4 h-4" />
      {language === "en" ? "RU" : "EN"}
    </Button>
  );
};

export default LanguageSwitcher;
