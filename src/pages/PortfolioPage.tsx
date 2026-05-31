import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { formatInr } from "@/lib/finance";
import { ChevronRight, PieChart, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const allocation = [
  { name: "Equity", value: 62, fill: "hsl(var(--primary))" },
  { name: "Debt", value: 28, fill: "hsl(var(--secondary))" },
  { name: "Gold", value: 6, fill: "hsl(43 96% 56%)" },
  { name: "Cash", value: 4, fill: "hsl(var(--muted-foreground))" },
];

const performance = [
  { month: "Jan", value: 50500 },
  { month: "Feb", value: 102500 },
  { month: "Mar", value: 155400 },
  { month: "Apr", value: 213800 },
  { month: "May", value: 279200 },
  { month: "Jun", value: 352500 },
];

const chartConfig = {
  value: { label: "Portfolio value", theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
};

const PortfolioPage = () => {
  const value = performance[performance.length - 1]?.value ?? 0;
  const riskScore = 62;

  return (
    <FeaturePageScaffold
      badge="Portfolio"
      title="Allocation, performance, and risk — in one view."
      description="A premium portfolio experience with asset splits, returns tracking, and growth projections."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Performance</p>
              <p className="mt-2 text-lg font-bold text-foreground">Portfolio value</p>
              <p className="mt-1 text-sm text-muted-foreground">Monthly progression with premium chart styling.</p>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2" data-stagger="cards">
            <div data-card className="rounded-2xl border border-border/60 bg-background/30 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground">Current value</p>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-extrabold text-foreground">
                <span data-count-to={value} data-count-format="inr">{formatInr(0)}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Across all tracked assets.</p>
            </div>
            <div data-card className="rounded-2xl border border-secondary/25 bg-secondary-soft p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-secondary">Risk score</p>
                <ShieldCheck className="h-4 w-4 text-secondary" />
              </div>
              <p className="mt-2 text-2xl font-extrabold text-foreground">
                <span data-count-to={riskScore}>{riskScore}</span>/100
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Balanced profile.</p>
            </div>
          </div>

          <div className="mt-6">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <RechartsPrimitive.AreaChart data={performance} margin={{ left: 8, right: 10, top: 12, bottom: 0 }}>
                <RechartsPrimitive.CartesianGrid vertical={false} />
                <RechartsPrimitive.XAxis dataKey="month" tickLine={false} axisLine={false} />
                <RechartsPrimitive.YAxis tickLine={false} axisLine={false} width={52} tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <RechartsPrimitive.Area type="monotone" dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.14} strokeWidth={2.5} />
              </RechartsPrimitive.AreaChart>
            </ChartContainer>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Allocation</p>
                <p className="mt-2 text-lg font-bold text-foreground">Asset split</p>
                <p className="mt-1 text-sm text-muted-foreground">A clean view of how your money is distributed.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <PieChart className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6">
              <ChartContainer config={{}} className="h-64 w-full">
                <RechartsPrimitive.PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <RechartsPrimitive.Pie
                    data={allocation}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={58}
                    outerRadius={90}
                    paddingAngle={3}
                    stroke="transparent"
                  >
                    {allocation.map((entry) => (
                      <RechartsPrimitive.Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </RechartsPrimitive.Pie>
                </RechartsPrimitive.PieChart>
              </ChartContainer>
            </div>

            <div className="mt-6 space-y-3">
              {allocation.map((a) => (
                <div key={a.name} className="rounded-xl border border-border/60 bg-background/30 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">{a.name}</span>
                    <span className="text-muted-foreground">{a.value}%</span>
                  </div>
                  <Progress value={a.value} className="mt-2 h-2 bg-muted/30" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next step</p>
            <p className="mt-2 text-lg font-bold text-foreground">Improve diversification</p>
            <p className="mt-1 text-sm text-muted-foreground">Use the Risk Quiz to match allocation to your comfort level.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button asChild className="bg-gradient-primary shadow-elevated hover:opacity-95">
                <Link to="/risk-quiz">
                  Take risk quiz
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-background">
                <Link to="/ai-insights">
                  AI recommendations
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

export default PortfolioPage;
