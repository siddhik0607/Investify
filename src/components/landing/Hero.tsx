import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Hand } from "lucide-react";
import { Link } from "react-router-dom";
import { HowItWorksDialog } from "@/components/landing/HowItWorksDialog";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    if (name) setUserName(name);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl" />

      <div className="container relative grid gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-12 lg:py-32">
        <div className="flex flex-col justify-center animate-fade-in-up">
          {userName && (
            <div className="mb-6 flex items-center gap-2 rounded-full bg-primary/5 border border-primary/10 px-4 py-1.5 w-fit">
              <Hand className="h-4 w-4 text-primary animate-bounce" />
              <span className="text-sm font-semibold text-primary">
                Welcome back, {userName}! Let's reach your next goal.
              </span>
            </div>
          )}
          
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Turn your goals into a{" "}
            <span className="bg-gradient-growth bg-clip-text text-transparent">monthly plan</span>{" "}
            you can actually follow.
          </h1>

          <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg leading-relaxed">
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

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
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

        {/* Hero card mockup */}
        <div className="relative flex items-center justify-center animate-fade-in-up [animation-delay:120ms]">
          <HeroCard />
        </div>
      </div>
    </section>
  );
};

const HeroCard = () => (
  <div className="relative w-full max-w-md">
    <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
    <div className="relative rounded-2xl border border-border bg-card p-6 shadow-elevated">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Investment</p>
          <p className="mt-1 text-lg font-semibold">Mutual Funds SIP 📈</p>
        </div>
        <span className="rounded-full bg-secondary-soft px-2.5 py-1 text-xs font-semibold text-secondary">On track</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Stat label="Target" value="₹8,00,000" />
        <Stat label="In" value="4 years" />
        <Stat label="Monthly SIP" value="₹12,450" highlight />
        <Stat label="Expected" value="12% / yr" />
      </div>

      {/* Mini chart */}
      <div className="mt-6 rounded-xl bg-muted/50 p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Growth projection</span>
          <span className="font-semibold text-secondary">+₹2.1L returns</span>
        </div>
        <svg viewBox="0 0 300 80" className="h-20 w-full">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,70 C60,60 90,55 130,42 C170,30 210,28 260,14 L300,8 L300,80 L0,80 Z" fill="url(#g)" />
          <path d="M0,70 C60,60 90,55 130,42 C170,30 210,28 260,14 L300,8" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M0,72 C60,68 120,64 180,58 C240,52 280,48 300,46" stroke="hsl(var(--secondary))" strokeWidth="2" fill="none" strokeDasharray="4 4" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold">38%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[38%] rounded-full bg-gradient-growth" />
        </div>
      </div>
    </div>

    {/* Floating mini cards */}
    <div className="absolute -left-6 -bottom-6 hidden rounded-xl border border-border bg-card p-3 shadow-card animate-float sm:flex sm:items-center sm:gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-soft text-secondary">
        <TrendingUp className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground">Avg. return</p>
        <p className="text-sm font-semibold">+12.4%</p>
      </div>
    </div>
  </div>
);

const Stat = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`rounded-xl border p-2.5 ${highlight ? "border-primary/30 bg-primary-soft" : "border-border bg-background"}`}>
    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={`mt-0.5 text-sm font-semibold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
  </div>
);
