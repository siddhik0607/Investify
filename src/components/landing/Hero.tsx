import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, TrendingUp, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { HowItWorksDialog } from "@/components/landing/HowItWorksDialog";
import { forwardRef, lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";

export const Hero = () => {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();
  const themeMode = resolvedTheme === "light" ? "light" : "dark";

  const HeroCanvas = useMemo(
    () =>
      lazy(() =>
        import("./HeroCanvas").then((m) => ({
          default: m.HeroCanvas,
        })),
      ),
    [],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentY = useTransform(scrollYProgress, [0, 0.95], [0, -220]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.14]);
  const headlineY = useTransform(scrollYProgress, [0, 0.8], [0, -52]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);
  const ctaY = useTransform(scrollYProgress, [0, 0.85], [0, -40]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.28]);
  const cardsScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cardsRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  useEffect(() => {
    const name = localStorage.getItem("user_name")?.trim() || null;
    const email = localStorage.getItem("user_email")?.trim() || null;
    const inferredFromEmail = email ? email.split("@")[0] : null;
    setDisplayName(name || inferredFromEmail || null);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "45%");
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x.toFixed(2)}%`);
    el.style.setProperty("--my", `${y.toFixed(2)}%`);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      data-scroll="section"
      className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden text-foreground"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroCanvas scrollProgress={scrollYProgress} isMobile={isMobile} theme={themeMode} />
          </Suspense>
        </motion.div>

        <motion.div
          style={{ y: glowY }}
          className="absolute inset-0 opacity-80"
        >
          <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_var(--mx,_50%)_var(--my,_45%),rgba(79,70,229,0.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(16,185,129,0.25),transparent_55%)]" />
        </motion.div>

        <motion.div style={{ y: overlayY }} className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/25" />
      </div>

      <div data-scroll="inner" className="container relative z-10 grid min-h-[calc(100svh-3.5rem)] grid-cols-1 items-center gap-12 px-6 py-16 md:py-20 lg:grid-cols-12 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-7"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.h1
            style={{ y: headlineY, opacity: headlineOpacity }}
            className="text-balance text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Turn your goals into a{" "}
            <span className="bg-gradient-to-r from-violet-200 via-indigo-200 to-emerald-200 bg-clip-text text-transparent">
              monthly plan
            </span>{" "}
            you can actually follow.
          </motion.h1>

          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            A car, a home, a dream trip — tell Investify what you want and when. We'll calculate the exact monthly SIP and show you how your money grows, in plain language.
          </p>

          <motion.div style={{ y: ctaY, opacity: ctaOpacity }} className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <MagneticButton>
              <Button
                asChild
                size="lg"
                className="h-12 px-7 bg-gradient-to-r from-indigo-500 to-violet-500 shadow-elevated hover:opacity-95 text-base font-semibold"
              >
                <Link to="/new-goal">
                  Start planning free
                  <ArrowRight className="ml-2 h-4.5 w-4.5" />
                </Link>
              </Button>
            </MagneticButton>
            <HowItWorksDialog>
              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-7 text-base font-semibold"
                >
                  See how it works
                </Button>
              </MagneticButton>
            </HowItWorksDialog>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-200" />
              Bank-grade security
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-200" />
              No fees to plan
            </div>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <Stat label="Avg return" value={12.4} suffix="%" />
            <Stat label="Plans built" value={18240} suffix="+" />
            <Stat label="Setup time" value={2} suffix=" min" />
          </div>
        </motion.div>

        <motion.div className="relative lg:col-span-5" style={{ y: cardsY, scale: cardsScale, rotate: cardsRotate }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <FloatingCard className="mb-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Portfolio</p>
                  <p className="mt-1 text-lg font-bold text-foreground">Growth Snapshot</p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                  <Zap className="h-3.5 w-3.5" />
                  Live
                </div>
              </div>
              <div className="mt-4">
                <GrowthChart />
              </div>
            </FloatingCard>

            <div className="grid gap-4 sm:grid-cols-2">
              <FloatingCard>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Monthly SIP</p>
                <p className="mt-2 text-2xl font-extrabold text-foreground">₹12,450</p>
                <p className="mt-2 text-sm text-muted-foreground">Optimized for your timeline</p>
              </FloatingCard>
              <FloatingCard>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Projected</p>
                <p className="mt-2 text-2xl font-extrabold text-foreground">₹8.0L</p>
                <p className="mt-2 text-sm text-muted-foreground">In 4 years @ 12%</p>
              </FloatingCard>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shown) return;
    const start = performance.now();
    const duration = 900;
    const from = 0;
    const to = value;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, value]);

  const formatted = value >= 100 ? Math.round(current).toLocaleString() : current.toFixed(1);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border/60 bg-background/30 px-4 py-3 backdrop-blur-xl shadow-elevated"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-extrabold text-foreground">
        {formatted}
        {suffix}
      </p>
    </div>
  );
};

const FloatingCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`group relative rounded-3xl border border-border/60 bg-background/30 p-5 backdrop-blur-xl shadow-card ${className || ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -2 }}
      style={{ transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (y - 0.5) * -10;
        const ry = (x - 0.5) * 10;
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(79,70,229,0.22),transparent_55%)]" />
      <div className="relative">{children}</div>
    </motion.div>
  );
};

const MagneticButton = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, onPointerMove, onPointerLeave, ...rest }, forwardedRef) => {
  const localRef = useRef<HTMLDivElement | null>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <div
      ref={setRefs}
      className={`inline-flex will-change-transform ${className || ""}`}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        const el = localRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `translate3d(${(x * 10).toFixed(2)}px, ${(y * 10).toFixed(2)}px, 0)`;
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        const el = localRef.current;
        if (!el) return;
        el.style.transform = "translate3d(0,0,0)";
      }}
      {...rest}
    >
      {children}
    </div>
  );
  },
);
MagneticButton.displayName = "MagneticButton";

const GrowthChart = () => {
  const path =
    "M2 42 C 18 38, 26 36, 36 30 C 46 24, 54 22, 62 18 C 72 13, 84 10, 98 6";
  return (
    <div className="rounded-2xl border border-border/60 bg-background/30 p-4 backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Projected growth</span>
        <span className="font-semibold text-emerald-200">+₹2.1L returns</span>
      </div>
      <svg viewBox="0 0 100 48" className="h-20 w-full">
        <defs>
          <linearGradient id="heroChart" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(99,102,241,0.85)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.85)" />
          </linearGradient>
        </defs>
        <motion.path
          d={path}
          fill="none"
          stroke="url(#heroChart)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <motion.path
          d={`${path} L 98 48 L 2 48 Z`}
          fill="url(#heroChart)"
          opacity="0.12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};
