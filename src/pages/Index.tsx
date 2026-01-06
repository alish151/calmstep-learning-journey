import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LearningModulesSection from "@/components/sections/LearningModulesSection";
import VirtualAssistantSection from "@/components/sections/VirtualAssistantSection";
import ParentDashboardSection from "@/components/sections/ParentDashboardSection";
import AISection from "@/components/sections/AISection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>CalmStep - Gentle Learning for Children with Autism</title>
        <meta 
          name="description" 
          content="CalmStep provides a calm, pressure-free learning environment designed for children with autism. No timers, no grades — just learning at your own comfortable pace."
        />
        <meta name="keywords" content="autism, ASD, education, learning, children, accessible, calm, supportive" />
        <link rel="canonical" href="https://calmstep.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <LearningModulesSection />
          <VirtualAssistantSection />
          <ParentDashboardSection />
          <AISection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
