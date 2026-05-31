import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatInr } from "@/lib/finance";
import * as RechartsPrimitive from "recharts";
import { ArrowUpRight, CalendarCheck2, ChevronRight, ShieldCheck, Sparkles, Target, TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const portfolioSeries = [
  { month: "Jan", invested: 48000, value: 50500 },
  { month: "Feb", invested: 96000, value: 102500 },
  { month: "Mar", invested: 144000, value: 155400 },
  { month: "Apr", invested: 192000, value: 213800 },
  { month: "May", invested: 240000, value: 279200 },
  { month: "Jun", invested: 288000, value: 352500 },
];

const activity = [
  { title: "SIP processed", meta: "₹12,450 · HDFC Index Fund", time: "2 hours ago" },
  { title: "Goal updated", meta: "Dream Home timeline set to 5 years", time: "Yesterday" },
  { title: "Portfolio insight", meta: "Equity exposure increased to 62%", time: "2 days ago" },
  { title: "Reminder enabled", meta: "Monthly SIP auto-nudge is ON", time: "Last week" },
];

const goals = [
  { title: "Dream Home", target: 1500000, current: 510000, eta: "5 years", tone: "bg-primary-soft text-primary" },
  { title: "Next Car", target: 800000, current: 220000, eta: "3 years", tone: "bg-secondary-soft text-secondary" },
  { title: "Vacation Fund", target: 300000, current: 98000, eta: "18 months", tone: "bg-emerald-400/10 text-emerald-200" },
];

const chartConfig = {
  invested: { label: "Invested", theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
  value: { label: "Portfolio value", theme: { light: "hsl(var(--secondary))", dark: "hsl(var(--secondary))" } },
};

const DashboardPage = () => {
  const invested = portfolioSeries[portfolioSeries.length - 1]?.invested ?? 0;
  const value = portfolioSeries[portfolioSeries.length - 1]?.value ?? 0;
  const gains = Math.max(0, value - invested);

  return (
    <FeaturePageScaffold
      badge="Dashboard"
      title="Your portfolio at a glance."
      description="Track SIPs, goals, growth, and recent activity in one premium dashboard."
    >
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="grid gap-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-violet-200" />
                  Live overview
                </div>
                <h2 className="mt-4 text-xl font-bold text-foreground">Portfolio performance</h2>
                <p className="mt-1 text-sm text-muted-foreground">Invested vs. current value over the last 6 months.</p>
              </div>
              <Button asChild className="bg-gradient-primary shadow-elevated hover:opacity-95">
                <Link to="/portfolio">
                  Open portfolio
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3" data-stagger="cards">
              <div data-card className="rounded-2xl border border-border/60 bg-background/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground">Invested</p>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-2 text-2xl font-extrabold text-foreground">
                  <span data-count-to={invested} data-count-format="inr">{formatInr(0)}</span>
                </p>
              </div>
              <div data-card className="rounded-2xl border border-border/60 bg-background/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground">Portfolio value</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-2 text-2xl font-extrabold text-foreground">
                  <span data-count-to={value} data-count-format="inr">{formatInr(0)}</span>
                </p>
              </div>
              <div data-card className="rounded-2xl border border-secondary/25 bg-secondary-soft p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-secondary">Estimated gains</p>
                  <ArrowUpRight className="h-4 w-4 text-secondary" />
                </div>
                <p className="mt-2 text-2xl font-extrabold text-foreground">
                  <span data-count-to={gains} data-count-format="inr">{formatInr(0)}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Market-linked, not guaranteed.</p>
              </div>
            </div>

            <div className="mt-6">
              <ChartContainer config={chartConfig} className="h-56 w-full">
                <RechartsPrimitive.AreaChart data={portfolioSeries} margin={{ left: 0, right: 6, top: 8, bottom: 0 }}>
                  <RechartsPrimitive.CartesianGrid vertical={false} />
                  <RechartsPrimitive.XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <RechartsPrimitive.YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} width={46} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <RechartsPrimitive.Area
                    type="monotone"
                    dataKey="invested"
                    stroke="var(--color-invested)"
                    fill="var(--color-invested)"
                    fillOpacity={0.12}
                    strokeWidth={2}
                  />
                  <RechartsPrimitive.Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    fill="var(--color-value)"
                    fillOpacity={0.14}
                    strokeWidth={2.5}
                  />
                </RechartsPrimitive.AreaChart>
              </ChartContainer>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monthly SIP tracking</p>
                  <p className="mt-2 text-lg font-bold text-foreground">June SIP is on track</p>
                  <p className="mt-1 text-sm text-muted-foreground">Next debit scheduled on 5th.</p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <CalendarCheck2 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>Paid</span>
                  <span>₹12,450 / ₹12,450</span>
                </div>
                <Progress value={100} className="h-2 bg-muted/30" />
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>Streak</span>
                  <span>6 months</span>
                </div>
                <Progress value={78} className="h-2 bg-muted/30" />
              </div>
              <Button asChild variant="outline" className="mt-6 w-full bg-background">
                <Link to="/goal-planner">
                  View progress
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Security</p>
                  <p className="mt-2 text-lg font-bold text-foreground">Bank-grade defaults</p>
                  <p className="mt-1 text-sm text-muted-foreground">We keep planning safe and private by default.</p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/30 px-4 py-3">
                  <span>Local preferences</span>
                  <span className="text-foreground font-semibold">Enabled</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/30 px-4 py-3">
                  <span>Risk guidance</span>
                  <span className="text-foreground font-semibold">Balanced</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/30 px-4 py-3">
                  <span>Reminders</span>
                  <span className="text-foreground font-semibold">On</span>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-6 w-full bg-background">
                <Link to="/profile">
                  Profile & settings
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Goal progress</p>
                <p className="mt-2 text-lg font-bold text-foreground">Your active goals</p>
                <p className="mt-1 text-sm text-muted-foreground">Momentum across multiple timelines.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Target className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {goals.map((g) => {
                const pct = Math.min(100, Math.round((g.current / Math.max(g.target, 1)) * 100));
                return (
                  <div key={g.title} className="rounded-2xl border border-border/60 bg-background/30 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${g.tone}`}>
                          {g.eta}
                        </div>
                        <p className="mt-2 text-sm font-semibold text-foreground">{g.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          <span data-count-to={g.current} data-count-format="inr">{formatInr(0)}</span> of {formatInr(g.target)}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-foreground">{pct}%</p>
                    </div>
                    <Progress value={pct} className="mt-3 h-2 bg-muted/30" />
                  </div>
                );
              })}
            </div>

            <Button asChild className="mt-6 w-full bg-gradient-primary shadow-elevated hover:opacity-95">
              <Link to="/#goal-planner">
                Open goal planner
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent activity</p>
            <p className="mt-2 text-lg font-bold text-foreground">Timeline</p>
            <div className="mt-6 space-y-4">
              {activity.map((item) => (
                <div key={item.title + item.time} className="flex gap-3">
                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.meta}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-6 w-full bg-background">
              <Link to="/#ai-insights">
                Generate AI insights
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </FeaturePageScaffold>
  );
};

export default DashboardPage;
