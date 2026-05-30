import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumBackground } from "@/components/PremiumBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeProvider } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatInr } from "@/lib/finance";
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

gsap.registerPlugin(ScrollTrigger);

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

const BackgroundAndScrollEffects = ({
  enable3d,
  lenisRef,
}: {
  enable3d: boolean;
  lenisRef: React.MutableRefObject<Lenis | null>;
}) => {
  const location = useLocation();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, lenisRef]);

  const enableBackground3d = enable3d && location.pathname !== "/";

  return <PremiumBackground enable3d={enableBackground3d} />;
};

const ScrollAnimator = ({
  isMobile,
  lenisRef,
}: {
  isMobile: boolean;
  lenisRef: React.MutableRefObject<Lenis | null>;
}) => {
  const location = useLocation();
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduceMotion) return;

    ctxRef.current?.revert();

    const ctx = gsap.context(() => {
      const progressEl = document.getElementById("scroll-progress");
      if (progressEl) {
        gsap.set(progressEl, { scaleX: 0 });
        const setX = gsap.quickSetter(progressEl, "scaleX");
        ScrollTrigger.create({
          start: 0,
          end: () => ScrollTrigger.maxScroll(window),
          onUpdate: (self) => setX(self.progress),
        });
      }

      const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      for (const el of parallaxEls) {
        const speed = Number(el.dataset.parallax || "0.12");
        const trigger = el.closest<HTMLElement>('[data-scroll="section"]') ?? document.body;
        gsap.to(el, {
          y: () => -window.innerHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll="section"]'));
      for (let idx = 0; idx < sections.length; idx += 1) {
        const section = sections[idx];
        const inner = section.querySelector<HTMLElement>('[data-scroll="inner"]') ?? section;
        gsap.set(inner, { transformOrigin: "50% 50%", willChange: "transform, opacity" });

        gsap.fromTo(
          inner,
          { y: isMobile ? 72 : 140, scale: 0.94, rotateX: isMobile ? 0 : 5 },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 92%",
              end: "top 25%",
              scrub: true,
            },
          },
        );

        const defaultExitOpacity = idx === sections.length - 1 ? 0.95 : 0.6;
        const exitOpacity = Number(section.dataset.exitOpacity ?? defaultExitOpacity);

        gsap.to(inner, {
          y: isMobile ? -44 : -90,
          scale: 0.98,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "bottom 82%",
            end: "bottom 18%",
            scrub: true,
          },
        });
      }

      const staggerWraps = Array.from(document.querySelectorAll<HTMLElement>("[data-stagger='cards']"));
      for (const wrap of staggerWraps) {
        const cards = Array.from(wrap.querySelectorAll<HTMLElement>("[data-card]"));
        if (!cards.length) continue;
        gsap.set(cards, { willChange: "transform, opacity" });
        gsap.fromTo(
          cards,
          { y: isMobile ? 44 : 80, opacity: 0.25, scale: 0.9, rotate: -2 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            ease: "none",
            stagger: isMobile ? 0.04 : 0.08,
            scrollTrigger: {
              trigger: wrap,
              start: "top 85%",
              end: "bottom 25%",
              scrub: true,
            },
          },
        );
      }

      const bars = Array.from(document.querySelectorAll<HTMLElement>("[data-growth-bar]"));
      for (const bar of bars) {
        const target = bar.dataset.growthBar;
        if (!target) continue;
        gsap.set(bar, { height: "0%" });
        gsap.to(bar, {
          height: target,
          ease: "none",
          scrollTrigger: {
            trigger: bar.closest("[data-growth-wrap]") ?? bar,
            start: "top 78%",
            end: "top 30%",
            scrub: true,
          },
        });
      }

      const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count-to]"));
      for (const el of counters) {
        const raw = Number(el.dataset.countTo || "0");
        const to = Number.isFinite(raw) ? raw : 0;
        const kind = el.dataset.countFormat || "int";
        const proxy = { v: 0 };
        const setText = () => {
          if (kind === "inr") el.textContent = formatInr(Math.round(proxy.v));
          else el.textContent = Math.round(proxy.v).toLocaleString();
        };
        setText();
        gsap.to(proxy, {
          v: to,
          ease: "none",
          onUpdate: setText,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        });
      }
    });

    ctxRef.current = ctx;

    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [isMobile, location.pathname]);

  return null;
};

const App = () => {
  const isMobile = useIsMobile();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.65,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
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
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div
              id="scroll-progress"
              className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-gradient-primary"
            />
            <BackgroundAndScrollEffects enable3d={!isMobile} lenisRef={lenisRef} />
            <ScrollAnimator isMobile={isMobile} lenisRef={lenisRef} />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
