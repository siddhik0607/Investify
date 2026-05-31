import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { formatInr } from "@/lib/finance";
import { Bot, ChevronRight, LineChart, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const trend = [
  { day: "Mon", score: 42 },
  { day: "Tue", score: 48 },
  { day: "Wed", score: 51 },
  { day: "Thu", score: 58 },
  { day: "Fri", score: 55 },
  { day: "Sat", score: 61 },
  { day: "Sun", score: 64 },
];

const chartConfig = {
  score: { label: "Market momentum", theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
};

const suggestions = [
  { title: "Increase SIP by 8%", desc: "Based on income safety ratio, you can raise SIP while staying comfortable.", strength: 78 },
  { title: "Diversify allocation", desc: "Equity exposure is slightly high for a 3-year goal — consider adding debt.", strength: 66 },
  { title: "Set a reminder cadence", desc: "Weekly nudges reduce missed SIPs and improve goal completion streaks.", strength: 72 },
];

const AIInsightsPage = () => {
  const exampleTarget = 1500000;
  const exampleCurrent = 510000;
  const exampleGap = Math.max(0, exampleTarget - exampleCurrent);

  return (
    <FeaturePageScaffold
      badge="AI Insights"
      title="Personalized insights that feel like a premium fintech product."
      description="Market trends, suggestions, and savings recommendations — designed to be clear, actionable, and calm."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Market trend</p>
              <p className="mt-2 text-lg font-bold text-foreground">Momentum index</p>
              <p className="mt-1 text-sm text-muted-foreground">A simplified weekly view for planning calm, not noise.</p>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <LineChart className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6">
            <ChartContainer config={chartConfig} className="h-56 w-full">
              <RechartsPrimitive.AreaChart data={trend} margin={{ left: 8, right: 10, top: 12, bottom: 0 }}>
                <RechartsPrimitive.CartesianGrid vertical={false} />
                <RechartsPrimitive.XAxis dataKey="day" tickLine={false} axisLine={false} />
                <RechartsPrimitive.YAxis tickLine={false} axisLine={false} width={34} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RechartsPrimitive.Area type="monotone" dataKey="score" stroke="var(--color-score)" fill="var(--color-score)" fillOpacity={0.14} strokeWidth={2.5} />
              </RechartsPrimitive.AreaChart>
            </ChartContainer>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2" data-stagger="cards">
            <div data-card className="rounded-2xl border border-border/60 bg-background/30 p-5">
              <p className="text-xs font-semibold text-muted-foreground">Goal gap</p>
              <p className="mt-2 text-2xl font-extrabold text-foreground">
                <span data-count-to={exampleGap} data-count-format="inr">{formatInr(0)}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Remaining to reach Dream Home.</p>
            </div>
            <div data-card className="rounded-2xl border border-secondary/25 bg-secondary-soft p-5">
              <p className="text-xs font-semibold text-secondary">Recommendation</p>
              <p className="mt-2 text-base font-bold text-foreground">Keep SIP steady</p>
              <p className="mt-1 text-xs text-muted-foreground">Momentum looks positive. Avoid over-reacting.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suggestions</p>
                <p className="mt-2 text-lg font-bold text-foreground">Actionable nudges</p>
                <p className="mt-1 text-sm text-muted-foreground">Improve outcomes without adding stress.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {suggestions.map((s) => (
                <div key={s.title} className="rounded-2xl border border-border/60 bg-background/30 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <p className="text-sm font-bold text-foreground">{s.strength}%</p>
                  </div>
                  <Progress value={s.strength} className="mt-3 h-2 bg-muted/30" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assistant</p>
                <p className="mt-2 text-lg font-bold text-foreground">Ask a financial question</p>
                <p className="mt-1 text-sm text-muted-foreground">Get simple answers about SIPs, goals, and tracking.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Bot className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button asChild className="bg-gradient-primary shadow-elevated hover:opacity-95">
                <Link to="/ai-assistant">
                  Open assistant
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-background">
                <Link to="/dashboard">
                  Back to dashboard
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FeaturePageScaffold>
  );
};

export default AIInsightsPage;
