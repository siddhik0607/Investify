import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Profiler, Suspense, lazy, useEffect, useRef } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumBackground } from "@/components/PremiumBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeProvider } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatInr } from "@/lib/finance";
import Index from "./pages/Index.tsx";

const SignIn = lazy(() => import("./pages/SignIn.tsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.tsx"));
const ProfileSettingsPage = lazy(() => import("./pages/ProfileSettingsPage.tsx"));
const GoalPlannerPage = lazy(() => import("./pages/GoalPlannerPage.tsx"));
const NewGoal = lazy(() => import("./pages/NewGoal.tsx"));
const GoalsPage = lazy(() => import("./pages/GoalsPage.tsx"));
const MultipleGoalsPage = lazy(() => import("./pages/MultipleGoalsPage.tsx"));
const TrackProgressPage = lazy(() => import("./pages/TrackProgressPage.tsx"));
const VisualizeGrowthPage = lazy(() => import("./pages/VisualizeGrowthPage.tsx"));
const InvestmentCalculatorPage = lazy(() => import("./pages/InvestmentCalculatorPage.tsx"));
const SipCalculatorPage = lazy(() => import("./pages/SipCalculatorPage.tsx"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage.tsx"));
const AIInsightsPage = lazy(() => import("./pages/AIInsightsPage.tsx"));
const AIAssistantPage = lazy(() => import("./pages/AIAssistantPage.tsx"));
const PricingPage = lazy(() => import("./pages/PricingPage.tsx"));
const LearnPage = lazy(() => import("./pages/LearnPage.tsx"));
const AboutContactPage = lazy(() => import("./pages/AboutContactPage.tsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.tsx"));
const RiskProfileQuizPage = lazy(() => import("./pages/RiskProfileQuizPage.tsx"));
const ScenarioSimulatorPage = lazy(() => import("./pages/ScenarioSimulatorPage.tsx"));
const ExpensePlannerPage = lazy(() => import("./pages/ExpensePlannerPage.tsx"));
const RemindersPage = lazy(() => import("./pages/RemindersPage.tsx"));
const StreakMilestonesPage = lazy(() => import("./pages/StreakMilestonesPage.tsx"));
const HelpfulNudgesPage = lazy(() => import("./pages/HelpfulNudgesPage.tsx"));
const DownloadPlanPage = lazy(() => import("./pages/DownloadPlanPage.tsx"));
const SipPlanResultPage = lazy(() => import("./pages/SipPlanResultPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

gsap.registerPlugin(ScrollTrigger);

const PERF_DEBUG =
  import.meta.env.DEV && typeof window !== "undefined" && window.location.search.includes("perf=1");
const DEBUG_SERVER_URL = "http://127.0.0.1:7777/event";
const DEBUG_SESSION_ID = "scroll-lag-60fps";
const DEBUG_RUN_ID = "post-fix-2";

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

const RouteFallback = () => (
  <div data-scroll="section" className="min-h-[60vh]">
    <div data-scroll="inner" className="container px-4 py-16">
      <div className="rounded-3xl border border-border/60 bg-background/30 p-8 shadow-card">
        <p className="text-sm font-semibold text-muted-foreground">Loading…</p>
      </div>
    </div>
  </div>
);

const RouteShell = ({ children }: { children: React.ReactNode }) => (
  <PageTransition>
    <Suspense fallback={<RouteFallback />}>{children}</Suspense>
  </PageTransition>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RouteShell><Index /></RouteShell>} />
        <Route path="/signin" element={<RouteShell><SignIn /></RouteShell>} />
        <Route path="/signup" element={<RouteShell><SignIn /></RouteShell>} />

        <Route path="/goal-planner" element={<RouteShell><GoalPlannerPage /></RouteShell>} />
        <Route path="/new-goal" element={<RouteShell><NewGoal /></RouteShell>} />
        <Route path="/goals" element={<RouteShell><GoalsPage /></RouteShell>} />
        <Route path="/multiple-goals" element={<RouteShell><MultipleGoalsPage /></RouteShell>} />
        <Route path="/track-progress" element={<RouteShell><TrackProgressPage /></RouteShell>} />
        <Route path="/visualize-growth" element={<RouteShell><VisualizeGrowthPage /></RouteShell>} />

        <Route path="/calculators" element={<RouteShell><InvestmentCalculatorPage /></RouteShell>} />
        <Route path="/sip-calculator" element={<RouteShell><SipCalculatorPage /></RouteShell>} />

        <Route path="/portfolio" element={<RouteShell><PortfolioPage /></RouteShell>} />

        <Route path="/ai-insights" element={<RouteShell><AIInsightsPage /></RouteShell>} />
        <Route path="/ai-assistant" element={<RouteShell><AIAssistantPage /></RouteShell>} />

        <Route path="/pricing" element={<RouteShell><PricingPage /></RouteShell>} />
        <Route path="/learn" element={<RouteShell><LearnPage /></RouteShell>} />
        <Route path="/faq" element={<RouteShell><FaqPage /></RouteShell>} />
        <Route path="/about" element={<RouteShell><AboutContactPage /></RouteShell>} />
        <Route path="/contact" element={<RouteShell><AboutContactPage /></RouteShell>} />

        <Route path="/risk-quiz" element={<RouteShell><RiskProfileQuizPage /></RouteShell>} />
        <Route path="/scenario-simulator" element={<RouteShell><ScenarioSimulatorPage /></RouteShell>} />
        <Route path="/expense-planner" element={<RouteShell><ExpensePlannerPage /></RouteShell>} />
        <Route path="/reminders" element={<RouteShell><RemindersPage /></RouteShell>} />
        <Route path="/streak-milestones" element={<RouteShell><StreakMilestonesPage /></RouteShell>} />
        <Route path="/helpful-nudges" element={<RouteShell><HelpfulNudgesPage /></RouteShell>} />

        <Route path="/download-plan" element={<RouteShell><DownloadPlanPage /></RouteShell>} />
        <Route path="/sip-plan-result" element={<RouteShell><SipPlanResultPage /></RouteShell>} />

        <Route path="/dashboard" element={<RouteShell><DashboardPage /></RouteShell>} />
        <Route path="/profile" element={<RouteShell><ProfileSettingsPage /></RouteShell>} />

        <Route path="*" element={<RouteShell><NotFound /></RouteShell>} />
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
    const hash = location.hash?.replace("#", "")?.trim();
    if (hash && typeof window.__scrollToSection === "function") {
      window.__scrollToSection(hash);
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash, lenisRef]);

  const enableBackground3d = enable3d && location.pathname !== "/";

  return <PremiumBackground enable3d={enableBackground3d} />;
};

const ScrollAnimator = ({
  isMobile,
}: {
  isMobile: boolean;
}) => {
  const location = useLocation();
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduceMotion) return;

    ctxRef.current?.revert();

    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null;
    const cores = navigator.hardwareConcurrency ?? null;
    const lowEnd =
      isMobile ||
      (typeof mem === "number" && mem > 0 && mem <= 4) ||
      (typeof cores === "number" && cores > 0 && cores <= 4);

    const ctx = gsap.context(() => {
      ScrollTrigger.config({ ignoreMobileResize: true });

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

      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll="section"]'));
      for (let idx = 0; idx < sections.length; idx += 1) {
        const section = sections[idx];
        if (section.id === "top") continue;
        const inner = section.querySelector<HTMLElement>('[data-scroll="inner"]') ?? section;

        const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-card]"));
        const bars = Array.from(section.querySelectorAll<HTMLElement>("[data-growth-bar]"));
        const counters = Array.from(section.querySelectorAll<HTMLElement>("[data-count-to]"));

        if (cards.length) {
          gsap.set(cards, { y: isMobile ? 18 : 34, opacity: 0, scale: 0.98, rotate: -1.2 });
        }
        if (bars.length) {
          for (const bar of bars) {
            const target = bar.dataset.growthBar;
            if (!target) continue;
            const pct = Math.max(0, Math.min(1, Number.parseFloat(target) / 100));
            if (!Number.isFinite(pct)) continue;
            gsap.set(bar, { transformOrigin: "50% 100%", scaleY: 0 });
          }
        }
        if (counters.length) {
          for (const el of counters) {
            const kind = el.dataset.countFormat || "int";
            if (kind === "inr") el.textContent = formatInr(0);
            else el.textContent = "0";
          }
        }

        let extrasPlayed = false;
        const playExtras = () => {
          if (extrasPlayed) return;
          extrasPlayed = true;

          if (cards.length) {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: isMobile ? 0.04 : 0.08,
            });
          }

          if (bars.length) {
            const items: Array<{ el: HTMLElement; pct: number }> = [];
            for (const bar of bars) {
              const target = bar.dataset.growthBar;
              if (!target) continue;
              const pct = Math.max(0, Math.min(1, Number.parseFloat(target) / 100));
              if (!Number.isFinite(pct)) continue;
              items.push({ el: bar, pct });
            }
            for (const [i, item] of items.entries()) {
              gsap.to(item.el, { scaleY: item.pct, duration: 1.0, delay: i * 0.04, ease: "power3.out" });
            }
          }

          if (counters.length) {
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
              gsap.to(proxy, { v: to, duration: 1.1, ease: "power3.out", onUpdate: setText });
            }
          }
        };

        const yIn = isMobile || lowEnd ? (isMobile ? 26 : 40) : 60;
        const scaleIn = isMobile || lowEnd ? 0.985 : 0.975;
        const rotIn = isMobile || lowEnd ? 0 : 2;
        gsap.set(inner, { transformOrigin: "50% 50%", y: yIn, scale: scaleIn, rotateX: rotIn });
        ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.set(inner, { willChange: "transform" });
            gsap.to(inner, {
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.95,
              ease: "power3.out",
              onComplete: () => gsap.set(inner, { willChange: "auto" }),
            });
            playExtras();
          },
        });
      }

      // #region debug-point A:scrolltrigger-inventory
      if (PERF_DEBUG) {
        try {
          const all = ScrollTrigger.getAll();
          const active = all.filter((t) => t.isActive).length;
          fetch(DEBUG_SERVER_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
              sessionId: DEBUG_SESSION_ID,
              runId: DEBUG_RUN_ID,
              hypothesisId: "A",
              location: "App.tsx:ScrollAnimator",
              msg: "[DEBUG] ScrollTrigger inventory",
              data: {
                pathname: location.pathname,
                isMobile,
                lowEnd,
                triggers: all.length,
                active,
                sections: document.querySelectorAll('[data-scroll="section"]').length,
                cards: document.querySelectorAll("[data-card]").length,
                counters: document.querySelectorAll("[data-count-to]").length,
                bars: document.querySelectorAll("[data-growth-bar]").length,
              },
              ts: Date.now(),
            }),
          }).catch(() => {});
        } catch (err) {
          void err;
        }
      }
      // #endregion
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
    const existed = PERF_DEBUG ? typeof window.__lenis !== "undefined" : false;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;
    window.__scrollToSection = (id: string) => {
      const clean = (id || "").replace("#", "").trim();
      if (!clean) return;
      const offset = -72;
      const el = document.getElementById(clean);
      if (el) {
        lenis.scrollTo(el, { offset, duration: 1.1 });
      }
    };
    window.__lenis = lenis;

    let parallaxRaf = 0;
    let latestScroll = window.scrollY;
    let lastScroll = latestScroll;
    let latestVelocity = 0;
    let parallaxQueued = false;
    let depthTick = 0;
    let depthRoot: HTMLElement | null = null;
    const ensureDepthRoot = () => {
      if (depthRoot) return depthRoot;
      depthRoot = document.getElementById("depth-root") as HTMLElement | null;
      return depthRoot;
    };
    let maxScroll = 1;
    const recalcMaxScroll = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    recalcMaxScroll();
    const updateParallax = () => {
      parallaxQueued = false;
      const root = ensureDepthRoot();
      if (!root) return;
      depthTick += 1;
      if (window.__scrollFast === true && depthTick % 2 === 1) return;
      const s = latestScroll;
      root.style.setProperty("--p-bg", `${Math.round(-s * 0.06)}px`);
      root.style.setProperty("--p-mid", `${Math.round(-s * 0.1)}px`);
      root.style.setProperty("--p-fg", `${Math.round(-s * 0.14)}px`);
    };
    const onLenisScroll = (e: unknown) => {
      if (e && typeof e === "object" && "scroll" in e) {
        const s = (e as { scroll?: unknown }).scroll;
        const v = (e as { velocity?: unknown }).velocity;
        if (typeof s === "number") latestScroll = s;
        else latestScroll = window.scrollY;
        if (typeof v === "number") latestVelocity = v;
        else latestVelocity = latestScroll - lastScroll;
      } else {
        latestScroll = window.scrollY;
        latestVelocity = latestScroll - lastScroll;
      }
      lastScroll = latestScroll;
      window.__scrollVelocity = latestVelocity;
      window.__scrollFast = Math.abs(latestVelocity) > 24;
      if (!parallaxQueued) {
        parallaxQueued = true;
        parallaxRaf = window.requestAnimationFrame(updateParallax);
      }
    };
    lenis.on("scroll", onLenisScroll);
    parallaxRaf = window.requestAnimationFrame(updateParallax);

    const onResize = () => {
      recalcMaxScroll();
      if (!parallaxQueued) {
        parallaxQueued = true;
        parallaxRaf = window.requestAnimationFrame(updateParallax);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    // #region debug-point C:lenis-init-post
    if (PERF_DEBUG) {
      try {
        fetch(DEBUG_SERVER_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            sessionId: DEBUG_SESSION_ID,
            runId: DEBUG_RUN_ID,
            hypothesisId: "C",
            location: "App.tsx:LenisInit",
            msg: "[DEBUG] Lenis initialized",
            data: {
              existed,
              duration: 1.4,
              wheelMultiplier: 1.0,
              touchMultiplier: 1.1,
              maxScroll,
              deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null,
              hardwareConcurrency: navigator.hardwareConcurrency ?? null,
              reduceMotion: window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? null,
            },
            ts: Date.now(),
          }),
        }).catch(() => {});
      } catch (err) {
        void err;
      }
    }
    // #endregion
    let rafId = 0;
    let resourceObserver: PerformanceObserver | null = null;
    let longTaskObserver: PerformanceObserver | null = null;
    if (PERF_DEBUG) {
      // #region debug-point D:frame-sampler
      let last = performance.now();
      let lastSend = last;
      let sum = 0;
      let n = 0;
      let longFrames = 0;
      let maxDt = 0;
      const loop = (now: number) => {
        const dt = now - last;
        last = now;
        sum += dt;
        n += 1;
        if (dt > 24) longFrames += 1;
        if (dt > maxDt) maxDt = dt;
        if (now - lastSend > 2000) {
          const avg = n ? sum / n : 16.67;
          const fps = avg > 0 ? Math.round(1000 / avg) : 0;
          try {
            fetch(DEBUG_SERVER_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain" },
              body: JSON.stringify({
                sessionId: DEBUG_SESSION_ID,
                runId: DEBUG_RUN_ID,
                hypothesisId: "D",
                location: "App.tsx:RAF",
                msg: "[DEBUG] Frame sampler",
                data: {
                  fps,
                  avgDtMs: Number(avg.toFixed(2)),
                  maxDtMs: Number(maxDt.toFixed(2)),
                  longFrames,
                  pathname: window.location.pathname,
                  scrollY: Math.round(window.scrollY),
                },
                ts: Date.now(),
              }),
            }).catch(() => {});
          } catch (err) {
            void err;
          }
          sum = 0;
          n = 0;
          longFrames = 0;
          maxDt = 0;
          lastSend = now;
        }
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
      // #endregion

      // #region debug-point F:resource-timing
      let resSend = 0;
      resourceObserver =
        "PerformanceObserver" in window
          ? new PerformanceObserver(() => {
              const now = performance.now();
              if (now - resSend < 5000) return;
              resSend = now;
              const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
              const rows = entries
                .filter(
                  (e) =>
                    typeof e.name === "string" &&
                    e.name &&
                    (e.initiatorType === "img" || e.initiatorType === "script" || e.initiatorType === "link"),
                )
                .map((e) => ({
                  name: e.name,
                  type: e.initiatorType,
                  transferSize: Number.isFinite(e.transferSize) ? e.transferSize : null,
                  encodedBodySize: Number.isFinite(e.encodedBodySize) ? e.encodedBodySize : null,
                  decodedBodySize: Number.isFinite(e.decodedBodySize) ? e.decodedBodySize : null,
                  durationMs: Number(e.duration.toFixed(2)),
                }))
                .sort((a, b) => (b.transferSize ?? b.encodedBodySize ?? 0) - (a.transferSize ?? a.encodedBodySize ?? 0))
                .slice(0, 8);
              try {
                fetch(DEBUG_SERVER_URL, {
                  method: "POST",
                  mode: "no-cors",
                  headers: { "Content-Type": "text/plain" },
                  body: JSON.stringify({
                    sessionId: DEBUG_SESSION_ID,
                    runId: DEBUG_RUN_ID,
                    hypothesisId: "F",
                    location: "App.tsx:ResourceTiming",
                    msg: "[DEBUG] Resource timing top",
                    data: { top: rows },
                    ts: Date.now(),
                  }),
                }).catch(() => {});
              } catch (err) {
                void err;
              }
            })
          : null;
      try {
        resourceObserver?.observe({ entryTypes: ["resource"] });
      } catch (err) {
        void err;
      }
      // #endregion

      // #region debug-point E:longtask
      let ltSend = 0;
      let ltCount = 0;
      let ltMax = 0;
      longTaskObserver =
        "PerformanceObserver" in window
          ? new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                ltCount += 1;
                const d = (entry as PerformanceEntry).duration || 0;
                if (d > ltMax) ltMax = d;
              }
              const now = performance.now();
              if (now - ltSend < 2000) return;
              ltSend = now;
              try {
                fetch(DEBUG_SERVER_URL, {
                  method: "POST",
                  mode: "no-cors",
                  headers: { "Content-Type": "text/plain" },
                  body: JSON.stringify({
                    sessionId: DEBUG_SESSION_ID,
                    runId: DEBUG_RUN_ID,
                    hypothesisId: "E",
                    location: "App.tsx:LongTask",
                    msg: "[DEBUG] Long task summary",
                    data: { longTaskCount: ltCount, longTaskMaxMs: Number(ltMax.toFixed(2)) },
                    ts: Date.now(),
                  }),
                }).catch(() => {});
              } catch (err) {
                void err;
              }
            })
          : null;
      try {
        longTaskObserver?.observe({ entryTypes: ["longtask"] });
      } catch (err) {
        void err;
      }
      // #endregion
    }

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.cancelAnimationFrame(parallaxRaf);
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      try {
        resourceObserver?.disconnect();
      } catch (err) {
        void err;
      }
      try {
        longTaskObserver?.disconnect();
      } catch (err) {
        void err;
      }
      lenis.off("scroll", onLenisScroll);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
      delete window.__scrollToSection;
    };
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
            <ScrollAnimator isMobile={isMobile} />
            {PERF_DEBUG ? (
              <Profiler
                id="routes"
                onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => {
                  // #region debug-point E:react-profiler
                  try {
                    fetch(DEBUG_SERVER_URL, {
                      method: "POST",
                      mode: "no-cors",
                      headers: { "Content-Type": "text/plain" },
                      body: JSON.stringify({
                        sessionId: DEBUG_SESSION_ID,
                        runId: DEBUG_RUN_ID,
                        hypothesisId: "E",
                        location: "App.tsx:Profiler",
                        msg: "[DEBUG] React Profiler",
                        data: {
                          id,
                          phase,
                          actualDurationMs: Number(actualDuration.toFixed(2)),
                          baseDurationMs: Number(baseDuration.toFixed(2)),
                          startTimeMs: Number(startTime.toFixed(2)),
                          commitTimeMs: Number(commitTime.toFixed(2)),
                        },
                        ts: Date.now(),
                      }),
                    }).catch(() => {});
                  } catch (err) {
                    void err;
                  }
                  // #endregion
                }}
              >
                <AnimatedRoutes />
              </Profiler>
            ) : (
              <AnimatedRoutes />
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
