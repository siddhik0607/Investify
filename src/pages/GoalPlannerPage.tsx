import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatInr } from "@/lib/finance";
import { Car, ChevronRight, Home, PiggyBank, Plane, Target, Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const templates = [
  { title: "Buy a Home", icon: Home, target: 5000000, years: 8, desc: "Build a down payment plan with realistic monthly SIPs." },
  { title: "Buy a Car", icon: Car, target: 800000, years: 3, desc: "Plan a car upgrade without stressing your monthly budget." },
  { title: "Vacation", icon: Plane, target: 300000, years: 2, desc: "Turn a dream trip into a clear monthly saving plan." },
  { title: "Emergency Fund", icon: PiggyBank, target: 200000, years: 2, desc: "Create a safety net goal with steady contributions." },
];

const activeGoals = [
  { title: "Dream Home", target: 1500000, current: 510000, eta: "5 years" },
  { title: "Next Car", target: 800000, current: 220000, eta: "3 years" },
  { title: "Vacation Fund", target: 300000, current: 98000, eta: "18 months" },
];

const GoalPlannerPage = () => {
  const navigate = useNavigate();

  return (
    <FeaturePageScaffold
      badge="Goal Planner"
      title="Create goals that feel achievable."
      description="Start from templates, adjust timelines, and visualize goal progress — all in the same premium Investify system."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Templates</p>
              <p className="mt-2 text-lg font-bold text-foreground">Choose a goal type</p>
              <p className="mt-1 text-sm text-muted-foreground">Pick a target + timeline and jump into planning.</p>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Target className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2" data-stagger="cards">
            {templates.map((t) => (
              <button
                key={t.title}
                type="button"
                data-card
                onClick={() =>
                  navigate("/new-goal", {
                    state: { template: { goalName: t.title, targetAmount: t.target, years: t.years } },
                  })
                }
                className="group rounded-2xl border border-border/60 bg-background/30 p-5 text-left shadow-card transition-colors hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform group-hover:scale-105">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div className="rounded-full bg-background/50 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground border border-border/60">
                    {t.years}y
                  </div>
                </div>
                <p className="mt-4 text-base font-semibold text-foreground">{t.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <p className="mt-4 text-sm font-bold text-primary">{formatInr(t.target)}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-gradient-primary shadow-elevated hover:opacity-95">
              <Link to="/new-goal">
                Create custom goal
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-background">
              <Link to="/goals">
                Explore goal ideas
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Progress</p>
                <p className="mt-2 text-lg font-bold text-foreground">Active goals</p>
                <p className="mt-1 text-sm text-muted-foreground">Track completion as you invest monthly.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                <Trophy className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {activeGoals.map((g) => {
                const pct = Math.min(100, Math.round((g.current / Math.max(g.target, 1)) * 100));
                return (
                  <div key={g.title} className="rounded-2xl border border-border/60 bg-background/30 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{g.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          <span data-count-to={g.current} data-count-format="inr">{formatInr(0)}</span> of {formatInr(g.target)} · {g.eta}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-foreground">{pct}%</p>
                    </div>
                    <Progress value={pct} className="mt-3 h-2 bg-muted/30" />
                  </div>
                );
              })}
            </div>

            <Button asChild variant="outline" className="mt-6 w-full bg-background">
              <Link to="/track-progress">
                Track progress
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next step</p>
            <p className="mt-2 text-lg font-bold text-foreground">Get an investment plan</p>
            <p className="mt-1 text-sm text-muted-foreground">Generate a monthly SIP plan and keep it saved for tracking.</p>
            <Button asChild className="mt-6 w-full bg-gradient-primary shadow-elevated hover:opacity-95">
              <Link to="/sip-plan-result">
                Open latest plan
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </FeaturePageScaffold>
  );
};

export default GoalPlannerPage;
