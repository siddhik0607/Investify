import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, TrendingUp, Hand } from "lucide-react";
import { Link } from "react-router-dom";
import { HowItWorksDialog } from "@/components/landing/HowItWorksDialog";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("user_name")?.trim() || null;
    const email = localStorage.getItem("user_email")?.trim() || null;
    const inferredFromEmail = email ? email.split("@")[0] : null;
    setDisplayName(name || inferredFromEmail || null);
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const parallaxEl = parallaxRef.current;
    if (!sectionEl || !parallaxEl) return;

    let rafId = 0;
    const factor = 0.18;
    const maxShift = 28;

    const update = () => {
      rafId = 0;
      const rect = sectionEl.getBoundingClientRect();
      const height = Math.max(sectionEl.offsetHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), height);
      const y = Math.min(scrolled * factor, maxShift);
      parallaxEl.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden">
      <style>{`
        @keyframes hero-bg-pop {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes hero-bg-float {
          0%, 100% { transform: translate3d(0, -3px, 0); }
          50% { transform: translate3d(0, 3px, 0); }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          ref={parallaxRef}
          className="absolute -inset-8 will-change-transform motion-reduce:transform-none"
          style={{ transition: "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}
        >
          <div
            className="absolute inset-0 will-change-transform motion-reduce:animate-none"
            style={{ animation: "hero-bg-float 10s ease-in-out infinite" }}
          >
            <img
              src="/hero-bg.jpeg"
              alt=""
              className="h-full w-full object-cover object-center will-change-transform motion-reduce:transform-none"
              loading="eager"
              decoding="async"
              style={{ animation: "hero-bg-pop 1.35s ease-out both", filter: "brightness(1.08) saturate(1.05)" }}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl" />

      <div className="container relative z-10 flex min-h-[calc(100svh-3.5rem)] px-6 py-16 md:py-24 lg:py-32">
        <div className="flex w-full max-w-2xl flex-col justify-center animate-pop">
          <div className="mb-6 flex items-center gap-2 rounded-full bg-primary/5 border border-primary/10 px-4 py-1.5 w-fit">
            <Hand className="h-4 w-4 text-primary animate-bounce" />
            <span className="text-sm font-semibold text-primary">
              {displayName ? `Hi, ${displayName} — welcome to Investify.` : "Welcome to Investify."}
            </span>
          </div>
          
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Turn your goals into a{" "}
            <span className="bg-gradient-growth bg-clip-text text-transparent">monthly plan</span>{" "}
            you can actually follow.
          </h1>

          <p className="mt-6 max-w-xl text-balance text-base text-white/90 sm:text-lg leading-relaxed">
            A car, a home, a dream trip — tell Investify what you want and when. We'll calculate the exact monthly SIP and show you how your money grows, in plain language.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 bg-gradient-primary shadow-elevated transition-transform hover:scale-[1.01] hover:opacity-95 text-base font-semibold">
              <Link to="/new-goal">
                Start planning free
                <ArrowRight className="ml-2 h-4.5 w-4.5" />
              </Link>
            </Button>
            <HowItWorksDialog>
              <Button size="lg" variant="outline" className="h-12 px-7 text-base font-semibold">
                See how it works
              </Button>
            </HowItWorksDialog>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              Bank-grade security
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              No fees to plan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
