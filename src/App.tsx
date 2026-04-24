import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
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

const App = () => {
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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/new-goal" element={<NewGoal />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/sip-calculator" element={<SipCalculatorPage />} />
            <Route path="/visualize-growth" element={<VisualizeGrowthPage />} />
            <Route path="/helpful-nudges" element={<HelpfulNudgesPage />} />
            <Route path="/track-progress" element={<TrackProgressPage />} />
            <Route path="/risk-quiz" element={<RiskProfileQuizPage />} />
            <Route path="/expense-planner" element={<ExpensePlannerPage />} />
            <Route path="/multiple-goals" element={<MultipleGoalsPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/download-plan" element={<DownloadPlanPage />} />
            <Route path="/scenario-simulator" element={<ScenarioSimulatorPage />} />
            <Route path="/streak-milestones" element={<StreakMilestonesPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/sip-plan-result" element={<SipPlanResultPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
