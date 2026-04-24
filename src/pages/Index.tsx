import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { PlannerDashboard } from "@/components/landing/PlannerDashboard";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="space-y-24 pb-24">
        <Hero />
        <PlannerDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
