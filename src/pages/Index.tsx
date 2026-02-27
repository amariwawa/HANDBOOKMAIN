import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SubjectsSection } from "@/components/SubjectsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";
import { useTheme } from "@/components/theme-provider";

const Index = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SubjectsSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
