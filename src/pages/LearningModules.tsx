import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import LearningModulesSection from "@/components/sections/LearningModulesSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const LearningModules = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("nav.learning")} - CalmStep</title>
        <meta name="description" content="Explore interactive learning modules for Math, Reading, Logic, and Emotions designed for children with autism." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <LearningModulesSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LearningModules;
