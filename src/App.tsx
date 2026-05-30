import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumBackground } from "@/components/PremiumBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import Index from "./pages/Index.tsx";
import SignIn from "./pages/SignIn.tsx";
import NewGoal from "./pages/NewGoal.tsx";
import GoalsPage from "./pages/GoalsPage.tsx";
import SipCalculatorPage from "./pages/SipCalculatorPage.tsx";
import VisualizeGrowthPage from "./pages/VisualizeGrowthPage.tsx";
import HelpfulNudgesPage from "./pages/HelpfulNudgesPage.tsx";
import TrackProgressPage from "./pages/TrackProgressPage.tsx";
import RiskProfileQuizPage from "./pages/RiskProfileQuizPage.tsx";
import ExpensePlannerPage from "./pages/ExpensePlannerPage.tsx";
import MultipleGoalsPage from "./pages/MultipleGoalsPage.tsx";
import RemindersPage from "./pages/RemindersPage.tsx";
import DownloadPlanPage from "./pages/DownloadPlanPage.tsx";
import ScenarioSimulatorPage from "./pages/ScenarioSimulatorPage.tsx";
import StreakMilestonesPage from "./pages/StreakMilestonesPage.tsx";
import AIAssistantPage from "./pages/AIAssistantPage.tsx";
import FaqPage from "./pages/FaqPage.tsx";
import SipPlanResultPage from "./pages/SipPlanResultPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
        <Route path="/new-goal" element={<PageTransition><NewGoal /></PageTransition>} />
        <Route path="/goals" element={<PageTransition><GoalsPage /></PageTransition>} />
        <Route path="/sip-calculator" element={<PageTransition><SipCalculatorPage /></PageTransition>} />
        <Route path="/visualize-growth" element={<PageTransition><VisualizeGrowthPage /></PageTransition>} />
        <Route path="/helpful-nudges" element={<PageTransition><HelpfulNudgesPage /></PageTransition>} />
        <Route path="/track-progress" element={<PageTransition><TrackProgressPage /></PageTransition>} />
        <Route path="/risk-quiz" element={<PageTransition><RiskProfileQuizPage /></PageTransition>} />
        <Route path="/expense-planner" element={<PageTransition><ExpensePlannerPage /></PageTransition>} />
        <Route path="/multiple-goals" element={<PageTransition><MultipleGoalsPage /></PageTransition>} />
        <Route path="/reminders" element={<PageTransition><RemindersPage /></PageTransition>} />
        <Route path="/download-plan" element={<PageTransition><DownloadPlanPage /></PageTransition>} />
        <Route path="/scenario-simulator" element={<PageTransition><ScenarioSimulatorPage /></PageTransition>} />
        <Route path="/streak-milestones" element={<PageTransition><StreakMilestonesPage /></PageTransition>} />
        <Route path="/ai-assistant" element={<PageTransition><AIAssistantPage /></PageTransition>} />
        <Route path="/sip-plan-result" element={<PageTransition><SipPlanResultPage /></PageTransition>} />
        <Route path="/faqs" element={<PageTransition><FaqPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Supabase auth error in App.tsx:", error.message);
        } else {
          console.log("Supabase connected. Current session:", session);
        }
      } catch (err) {
        console.error("Unexpected error in App.tsx:", err);
      }
    };

    checkSupabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PremiumBackground enable3d={!isMobile} />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
