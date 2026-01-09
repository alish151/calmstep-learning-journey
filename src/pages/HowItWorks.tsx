import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HowItWorks = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("nav.howItWorks")} - CalmStep</title>
        <meta name="description" content="Learn how CalmStep works to help children with autism learn in a calm, supportive environment." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <HowItWorksSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HowItWorks;
