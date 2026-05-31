import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { calcMonthlySIP, calculateFutureValue, formatInr } from "@/lib/finance";
import { faqItems } from "@/lib/faqs";
import * as RechartsPrimitive from "recharts";
import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronRight, LineChart, PieChart, Quote, Sparkles, TrendingUp, Wallet } from "lucide-react";
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

const portfolioChartConfig = {
  value: { label: "Portfolio value", theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
};

export const PortfolioSection = () => {
  const value = performance[performance.length - 1]?.value ?? 0;
  const riskScore = 62;

  return (
    <section id="portfolio" data-scroll="section" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-primary/12 blur-2xl" />
        <div className="absolute -right-40 bottom-10 h-[520px] w-[520px] rounded-full bg-secondary/12 blur-2xl" />
      </div>

      <div data-scroll="inner" className="container px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Portfolio</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">See allocation, performance, and risk.</h2>
          <p className="mt-3 text-sm text-muted-foreground">A clean portfolio view that stays calm even when markets are not.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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
                  <Sparkles className="h-4 w-4 text-secondary" />
                </div>
                <p className="mt-2 text-2xl font-extrabold text-foreground">
                  <span data-count-to={riskScore}>{riskScore}</span>/100
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Balanced profile.</p>
              </div>
            </div>

            <div className="mt-6">
              <ChartContainer config={portfolioChartConfig} className="h-72 w-full">
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

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Allocation</p>
                <p className="mt-2 text-lg font-bold text-foreground">Asset split</p>
                <p className="mt-1 text-sm text-muted-foreground">A clear split across your major buckets.</p>
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
        </div>
      </div>
    </section>
  );
};

function calculateLumpSumFutureValue(principal: number, years: number, annualRatePct: number) {
  const n = Math.max(0, years);
  const r = annualRatePct / 100;
  return principal * Math.pow(1 + r, n);
}

function buildYearlySeries(fn: (year: number) => number, years: number) {
  const end = Math.max(1, Math.round(years));
  return new Array(end + 1).fill(0).map((_, i) => ({ year: i, value: fn(i) }));
}

const calcChartConfig = {
  value: { label: "Value", theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
  invested: { label: "Invested", theme: { light: "hsl(var(--secondary))", dark: "hsl(var(--secondary))" } },
};

export const CalculatorSection = () => {
  const [tab, setTab] = useState<"sip" | "lumpsum" | "retirement">("sip");

  const [sipTarget, setSipTarget] = useState(1500000);
  const [sipYears, setSipYears] = useState(5);
  const [sipReturn, setSipReturn] = useState(12);

  const sipMonthly = useMemo(() => calcMonthlySIP(sipTarget, sipYears, sipReturn), [sipTarget, sipYears, sipReturn]);
  const sipFinalValue = useMemo(() => calculateFutureValue(sipMonthly, sipYears, sipReturn), [sipMonthly, sipYears, sipReturn]);
  const sipInvested = useMemo(() => sipMonthly * Math.max(1, Math.round(sipYears * 12)), [sipMonthly, sipYears]);

  const sipSeries = useMemo(() => {
    const years = Math.max(1, Math.round(sipYears));
    return buildYearlySeries((y) => calculateFutureValue(sipMonthly, y, sipReturn), years).map((row) => ({
      year: row.year,
      value: row.value,
      invested: sipMonthly * row.year * 12,
    }));
  }, [sipMonthly, sipReturn, sipYears]);

  const [lumpPrincipal, setLumpPrincipal] = useState(250000);
  const [lumpYears, setLumpYears] = useState(7);
  const [lumpReturn, setLumpReturn] = useState(12);
  const lumpFinal = useMemo(() => calculateLumpSumFutureValue(lumpPrincipal, lumpYears, lumpReturn), [lumpPrincipal, lumpReturn, lumpYears]);
  const lumpSeries = useMemo(() => buildYearlySeries((y) => calculateLumpSumFutureValue(lumpPrincipal, y, lumpReturn), lumpYears), [lumpPrincipal, lumpReturn, lumpYears]);

  const [currentAge, setCurrentAge] = useState(28);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(65000);
  const [inflation, setInflation] = useState(6);
  const [preRetReturn, setPreRetReturn] = useState(12);

  const retirementYears = Math.max(1, retireAge - currentAge);
  const inflatedAnnualExpense = monthlyExpense * 12 * Math.pow(1 + inflation / 100, retirementYears);
  const retirementCorpus = inflatedAnnualExpense * 25;
  const retirementSip = useMemo(() => calcMonthlySIP(retirementCorpus, retirementYears, preRetReturn), [preRetReturn, retirementCorpus, retirementYears]);
  const retirementSeries = useMemo(() => buildYearlySeries((y) => calculateFutureValue(retirementSip, y, preRetReturn), retirementYears), [preRetReturn, retirementSip, retirementYears]);

  return (
    <section id="calculators" data-scroll="section" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="absolute left-1/2 top-0 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-primary/10 blur-2xl" />
      </div>

      <div data-scroll="inner" className="container px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Investment calculators</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">Interactive planning, in real time.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Adjust inputs and see projected growth instantly — with premium charts.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tools</p>
                <p className="mt-2 text-lg font-bold text-foreground">Choose calculator</p>
                <p className="mt-1 text-sm text-muted-foreground">SIP, Lump Sum, and Retirement.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mt-6">
              <TabsList className="grid w-full grid-cols-3 bg-background/30">
                <TabsTrigger value="sip">SIP</TabsTrigger>
                <TabsTrigger value="lumpsum">Lump Sum</TabsTrigger>
                <TabsTrigger value="retirement">Retirement</TabsTrigger>
              </TabsList>

              <TabsContent value="sip" className="mt-6 space-y-4">
                <Field label="Target amount" value={sipTarget} onChange={setSipTarget} />
                <Field label="Timeline (years)" value={sipYears} onChange={setSipYears} />
                <Field label="Expected return (% p.a.)" value={sipReturn} step="0.1" onChange={setSipReturn} />
                <div className="rounded-2xl border border-secondary/25 bg-secondary-soft p-5">
                  <p className="text-xs font-semibold text-secondary">Estimated monthly SIP</p>
                  <p className="mt-2 text-3xl font-extrabold text-foreground">{formatInr(sipMonthly)}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Invested: {formatInr(sipInvested)} · Projected: {formatInr(sipFinalValue)}</p>
                </div>
              </TabsContent>

              <TabsContent value="lumpsum" className="mt-6 space-y-4">
                <Field label="One-time investment" value={lumpPrincipal} onChange={setLumpPrincipal} />
                <Field label="Timeline (years)" value={lumpYears} onChange={setLumpYears} />
                <Field label="Expected return (% p.a.)" value={lumpReturn} step="0.1" onChange={setLumpReturn} />
                <div className="rounded-2xl border border-primary/25 bg-primary-soft p-5">
                  <p className="text-xs font-semibold text-primary">Projected value</p>
                  <p className="mt-2 text-3xl font-extrabold text-foreground">{formatInr(lumpFinal)}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Assumes annual compounding.</p>
                </div>
              </TabsContent>

              <TabsContent value="retirement" className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Current age" value={currentAge} onChange={setCurrentAge} />
                  <Field label="Retirement age" value={retireAge} onChange={setRetireAge} />
                </div>
                <Field label="Monthly expenses today" value={monthlyExpense} onChange={setMonthlyExpense} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Inflation (% p.a.)" value={inflation} step="0.1" onChange={setInflation} />
                  <Field label="Expected return (% p.a.)" value={preRetReturn} step="0.1" onChange={setPreRetReturn} />
                </div>
                <div className="rounded-2xl border border-border bg-background p-5 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Retirement estimate</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Required corpus: <span className="font-semibold text-foreground">{formatInr(retirementCorpus)}</span>
                  </p>
                  <p className="mt-3 text-xs font-semibold text-muted-foreground">Estimated monthly SIP</p>
                  <p className="mt-2 text-3xl font-extrabold text-foreground">{formatInr(retirementSip)}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chart</p>
                <p className="mt-2 text-lg font-bold text-foreground">Growth projection</p>
                <p className="mt-1 text-sm text-muted-foreground">A clear trajectory — not noise.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6">
              {tab === "sip" ? (
                <ChartContainer config={calcChartConfig} className="h-72 w-full">
                  <RechartsPrimitive.LineChart data={sipSeries} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
                    <RechartsPrimitive.CartesianGrid vertical={false} />
                    <RechartsPrimitive.XAxis dataKey="year" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}y`} />
                    <RechartsPrimitive.YAxis tickLine={false} axisLine={false} width={52} tickFormatter={(v) => `₹${Math.round(v / 100000)}L`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <RechartsPrimitive.Line type="monotone" dataKey="invested" stroke="var(--color-invested)" strokeWidth={2} dot={false} />
                    <RechartsPrimitive.Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2.5} dot={false} />
                  </RechartsPrimitive.LineChart>
                </ChartContainer>
              ) : tab === "lumpsum" ? (
                <ChartContainer config={{ value: calcChartConfig.value }} className="h-72 w-full">
                  <RechartsPrimitive.AreaChart data={lumpSeries} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
                    <RechartsPrimitive.CartesianGrid vertical={false} />
                    <RechartsPrimitive.XAxis dataKey="year" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}y`} />
                    <RechartsPrimitive.YAxis tickLine={false} axisLine={false} width={52} tickFormatter={(v) => `₹${Math.round(v / 100000)}L`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <RechartsPrimitive.Area type="monotone" dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.14} strokeWidth={2.5} />
                  </RechartsPrimitive.AreaChart>
                </ChartContainer>
              ) : (
                <ChartContainer config={{ value: calcChartConfig.value }} className="h-72 w-full">
                  <RechartsPrimitive.AreaChart data={retirementSeries} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
                    <RechartsPrimitive.CartesianGrid vertical={false} />
                    <RechartsPrimitive.XAxis dataKey="year" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}y`} />
                    <RechartsPrimitive.YAxis tickLine={false} axisLine={false} width={52} tickFormatter={(v) => `₹${Math.round(v / 100000)}L`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <RechartsPrimitive.Area type="monotone" dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.14} strokeWidth={2.5} />
                  </RechartsPrimitive.AreaChart>
                </ChartContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const trend = [
  { day: "Mon", score: 42 },
  { day: "Tue", score: 48 },
  { day: "Wed", score: 51 },
  { day: "Thu", score: 58 },
  { day: "Fri", score: 55 },
  { day: "Sat", score: 61 },
  { day: "Sun", score: 64 },
];

const aiChartConfig = {
  score: { label: "Market momentum", theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
};

const suggestions = [
  { title: "Increase SIP by 8%", desc: "Based on your comfort ratio, you can raise SIP while staying safe.", strength: 78 },
  { title: "Diversify allocation", desc: "Equity exposure is slightly high for a 3-year goal — add some debt.", strength: 66 },
  { title: "Set reminder cadence", desc: "Weekly nudges reduce missed SIPs and improve goal completion streaks.", strength: 72 },
];

export const AIInsightsSection = () => {
  const exampleTarget = 1500000;
  const exampleCurrent = 510000;
  const exampleGap = Math.max(0, exampleTarget - exampleCurrent);

  return (
    <section id="ai-insights" data-scroll="section" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="absolute -left-48 top-16 h-[560px] w-[560px] rounded-full bg-secondary/10 blur-2xl" />
        <div className="absolute -right-48 bottom-16 h-[560px] w-[560px] rounded-full bg-primary/10 blur-2xl" />
      </div>

      <div data-scroll="inner" className="container px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">AI insights</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">Premium guidance. Calm decisions.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Trends, suggestions, and reminders built to reduce stress.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Market trend</p>
                <p className="mt-2 text-lg font-bold text-foreground">Momentum index</p>
                <p className="mt-1 text-sm text-muted-foreground">A simplified weekly view for planning calm.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <LineChart className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6">
              <ChartContainer config={aiChartConfig} className="h-56 w-full">
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

            <Button asChild className="mt-6 w-full bg-gradient-primary shadow-elevated hover:opacity-95">
              <Link to="/contact">
                Contact us for guidance
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const plans = [
  {
    name: "Free",
    price: "₹0",
    desc: "Best for getting started with goals and SIP planning.",
    tone: "border-border bg-background/30",
    features: ["Goal templates", "SIP calculator", "Growth visualization", "Basic progress tracking"],
    cta: { label: "Start free", to: "/signin" },
  },
  {
    name: "Pro",
    price: "₹299/mo",
    desc: "For consistent planners who want more tracking and insights.",
    tone: "border-primary/30 bg-primary-soft",
    features: ["Everything in Free", "Advanced progress tracking", "Goal streaks & milestones", "Portfolio insights"],
    cta: { label: "Go Pro", to: "/signin" },
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹799/mo",
    desc: "For power users who want AI guidance and premium features.",
    tone: "border-secondary/30 bg-secondary-soft",
    features: ["Everything in Pro", "AI Insights", "AI Financial Assistant", "Priority support"],
    cta: { label: "Get Premium", to: "/signin" },
  },
];

export const PricingSection = () => (
  <section id="pricing" data-scroll="section" className="relative">
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      <div className="absolute left-24 top-28 h-[520px] w-[520px] rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute right-24 bottom-24 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-2xl" />
    </div>

    <div data-scroll="inner" className="container px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Pricing</p>
        <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">Plans that scale with your journey.</h2>
        <p className="mt-3 text-sm text-muted-foreground">Premium cards, clear value, and simple comparisons.</p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3" data-stagger="cards">
        {plans.map((p) => (
          <div key={p.name} data-card className={`relative overflow-hidden rounded-3xl border p-6 shadow-card ${p.tone}`}>
            {p.highlight && (
              <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-violet-200" />
                Most popular
              </div>
            )}
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{p.name}</p>
            <p className="mt-3 text-4xl font-extrabold text-foreground">{p.price}</p>
            <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>

            <div className="mt-6 space-y-3">
              {p.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-background/50 border border-border/60">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className={`mt-8 w-full ${p.highlight ? "bg-gradient-primary shadow-elevated hover:opacity-95" : "bg-background/60 hover:bg-background/75"}`}
              variant={p.highlight ? "default" : "outline"}
            >
              <Link to={p.cta.to}>
                {p.cta.label}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const testimonials = [
  { quote: "The SIP plan feels instantly understandable. I finally know what to do monthly.", name: "Aditi", role: "First-time investor" },
  { quote: "The charts and goal tracking are calm and premium. No noise, just clarity.", name: "Rohan", role: "Working professional" },
  { quote: "Investify makes planning feel like a product, not a spreadsheet.", name: "Neha", role: "Freelancer" },
];

export const TestimonialsSection = () => (
  <section id="testimonials" data-scroll="section" className="relative">
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      <div className="absolute left-1/2 top-12 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/8 blur-2xl" />
    </div>

    <div data-scroll="inner" className="container px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</p>
        <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">Loved for clarity and calm.</h2>
        <p className="mt-3 text-sm text-muted-foreground">Designed to feel premium and simple — not overwhelming.</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3" data-stagger="cards">
        {testimonials.map((t) => (
          <div key={t.name} data-card className="rounded-3xl border border-border bg-background p-6 shadow-card">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Quote className="h-5 w-5" />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-foreground/90">“{t.quote}”</p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FaqSection = () => (
  <section id="faq" data-scroll="section" className="relative">
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-2xl" />
    </div>

    <div data-scroll="inner" className="container px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</p>
        <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">Answers, without the jargon.</h2>
        <p className="mt-3 text-sm text-muted-foreground">Everything you need to understand the workflow.</p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-background p-6 shadow-card">
        <Accordion type="single" collapsible>
          {faqItems.map((faq, index) => (
            <AccordionItem key={faq.q} value={`faq-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 1800);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" data-scroll="section" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="absolute left-10 bottom-0 h-[560px] w-[560px] rounded-full bg-primary/10 blur-2xl" />
      </div>

      <div data-scroll="inner" className="container px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">Talk to us.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Questions about SIPs, goals, or the product flow? Send a message.</p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-2xl border border-border/60 bg-background/30 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Need fast answers?</p>
              <p className="mt-2 text-lg font-bold text-foreground">Try the AI assistant</p>
              <p className="mt-1 text-sm text-muted-foreground">Ask questions about SIPs, goal timelines, and tracking.</p>
              <Button asChild className="mt-6 w-full bg-gradient-primary shadow-elevated hover:opacity-95">
                <Link to="/signin">
                  Sign in for AI chat
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <div className="mt-6 rounded-2xl border border-border/60 bg-background/30 p-5">
                <p className="text-xs font-semibold text-muted-foreground">Newsletter</p>
                <p className="mt-1 text-sm text-muted-foreground">Get monthly tips and calm investing guidance.</p>
                <div className="mt-4 flex gap-2">
                  <Input placeholder="Email address" className="h-11 bg-card" />
                  <Button size="icon" className="h-11 w-11 bg-primary text-primary-foreground hover:bg-primary/90">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border/60 bg-background/30 p-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">Name</span>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 bg-card" required />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">Email</span>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 bg-card" type="email" required />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">Message</span>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[120px] bg-card" required />
              </label>
              <Button type="submit" className="h-11 bg-gradient-primary shadow-elevated hover:opacity-95">
                {sent ? "Sent" : "Send message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, value, onChange, step = "1" }: { label: string; value: number; onChange: (value: number) => void; step?: string }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
    <Input
      type="number"
      min="0"
      step={step}
      value={Number.isFinite(value) ? value : ""}
      onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
      className="h-12 bg-card"
    />
  </label>
);
