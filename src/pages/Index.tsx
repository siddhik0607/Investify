import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PlannerDashboard } from "@/components/landing/PlannerDashboard";
import { Footer } from "@/components/landing/Footer";
import { AIInsightsSection, CalculatorSection, ContactSection, FaqSection, PortfolioSection, PricingSection, TestimonialsSection } from "@/components/landing/OnePageSections";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-24 pb-24">
        <Hero />
        <Features />
        <HowItWorks />
        <PlannerDashboard />
        <PortfolioSection />
        <CalculatorSection />
        <AIInsightsSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
