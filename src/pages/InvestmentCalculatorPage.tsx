import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { calcMonthlySIP, calculateFutureValue, formatInr } from "@/lib/finance";
import * as RechartsPrimitive from "recharts";
import { Calculator, ChevronRight, PiggyBank, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

function calculateLumpSumFutureValue(principal: number, years: number, annualRatePct: number) {
  const n = Math.max(0, years);
  const r = annualRatePct / 100;
  return principal * Math.pow(1 + r, n);
}

function buildYearlySeries(fn: (year: number) => number, years: number) {
  const end = Math.max(1, Math.round(years));
  return new Array(end + 1).fill(0).map((_, i) => ({ year: i, value: fn(i) }));
}

const chartConfig = {
  value: { label: "Value", theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
  invested: { label: "Invested", theme: { light: "hsl(var(--secondary))", dark: "hsl(var(--secondary))" } },
};

const InvestmentCalculatorPage = () => {
  const [tab, setTab] = useState<"sip" | "lumpsum" | "retirement">("sip");

  const [sipTarget, setSipTarget] = useState(1500000);
  const [sipYears, setSipYears] = useState(5);
  const [sipReturn, setSipReturn] = useState(12);

  const sipMonthly = useMemo(() => calcMonthlySIP(sipTarget, sipYears, sipReturn), [sipTarget, sipYears, sipReturn]);
  const sipFinalValue = useMemo(() => calculateFutureValue(sipMonthly, sipYears, sipReturn), [sipMonthly, sipYears, sipReturn]);
  const sipInvested = useMemo(() => sipMonthly * Math.max(1, Math.round(sipYears * 12)), [sipMonthly, sipYears]);

  const sipSeries = useMemo(() => {
    const years = Math.max(1, Math.round(sipYears));
    return buildYearlySeries(
      (y) => calculateFutureValue(sipMonthly, y, sipReturn),
      years,
    ).map((row) => ({
      year: row.year,
      value: row.value,
      invested: sipMonthly * row.year * 12,
    }));
  }, [sipMonthly, sipReturn, sipYears]);

  const [lumpPrincipal, setLumpPrincipal] = useState(250000);
  const [lumpYears, setLumpYears] = useState(7);
  const [lumpReturn, setLumpReturn] = useState(12);

  const lumpFinal = useMemo(
    () => calculateLumpSumFutureValue(lumpPrincipal, lumpYears, lumpReturn),
    [lumpPrincipal, lumpReturn, lumpYears],
  );

  const lumpSeries = useMemo(() => {
    const years = Math.max(1, Math.round(lumpYears));
    return buildYearlySeries((y) => calculateLumpSumFutureValue(lumpPrincipal, y, lumpReturn), years);
  }, [lumpPrincipal, lumpReturn, lumpYears]);

  const [currentAge, setCurrentAge] = useState(28);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(65000);
  const [inflation, setInflation] = useState(6);
  const [preRetReturn, setPreRetReturn] = useState(12);

  const retirementYears = Math.max(1, retireAge - currentAge);
  const inflatedAnnualExpense = monthlyExpense * 12 * Math.pow(1 + inflation / 100, retirementYears);
  const retirementCorpus = inflatedAnnualExpense * 25;
  const retirementSip = useMemo(
    () => calcMonthlySIP(retirementCorpus, retirementYears, preRetReturn),
    [preRetReturn, retirementCorpus, retirementYears],
  );
  const retirementSeries = useMemo(() => {
    const years = Math.max(1, Math.round(retirementYears));
    return buildYearlySeries((y) => calculateFutureValue(retirementSip, y, preRetReturn), years);
  }, [preRetReturn, retirementSip, retirementYears]);

  return (
    <FeaturePageScaffold
      badge="Investment Calculators"
      title="Interactive calculators with real-time results."
      description="SIP, Lump Sum, and Retirement calculators with premium charts and scroll-driven motion."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tools</p>
              <p className="mt-2 text-lg font-bold text-foreground">Choose calculator</p>
              <p className="mt-1 text-sm text-muted-foreground">Switch between SIP, Lump Sum, and Retirement.</p>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Calculator className="h-5 w-5" />
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
                <p className="mt-2 text-xs text-muted-foreground">
                  Invested: {formatInr(sipInvested)} · Projected: {formatInr(sipFinalValue)}
                </p>
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
                  Required corpus (inflation-adjusted): <span className="font-semibold text-foreground">{formatInr(retirementCorpus)}</span>
                </p>
                <p className="mt-3 text-xs font-semibold text-muted-foreground">Estimated monthly SIP</p>
                <p className="mt-2 text-3xl font-extrabold text-foreground">{formatInr(retirementSip)}</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button asChild variant="outline" className="bg-background">
              <Link to="/sip-calculator">
                Open SIP page
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="bg-gradient-primary shadow-elevated hover:opacity-95">
              <Link to="/goal-planner">
                Plan a goal
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chart</p>
              <p className="mt-2 text-lg font-bold text-foreground">Growth projection</p>
              <p className="mt-1 text-sm text-muted-foreground">Scroll-linked, interactive, and updated in real time.</p>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6">
            {tab === "sip" ? (
              <ChartContainer config={chartConfig} className="h-72 w-full">
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
              <ChartContainer config={{ value: chartConfig.value }} className="h-72 w-full">
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
              <ChartContainer config={{ value: chartConfig.value }} className="h-72 w-full">
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2" data-stagger="cards">
            <div data-card className="rounded-2xl border border-border/60 bg-background/30 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground">Selected</p>
                <Target className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-lg font-bold text-foreground">
                {tab === "sip" ? "SIP Calculator" : tab === "lumpsum" ? "Lump Sum" : "Retirement"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Scroll-scrubbed chart + premium motion.</p>
            </div>
            <div data-card className="rounded-2xl border border-secondary/25 bg-secondary-soft p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-secondary">Result</p>
                <PiggyBank className="h-4 w-4 text-secondary" />
              </div>
              <p className="mt-2 text-lg font-bold text-foreground">
                {tab === "sip" ? formatInr(sipMonthly) : tab === "lumpsum" ? formatInr(lumpFinal) : formatInr(retirementSip)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tab === "sip" ? "Estimated monthly SIP" : tab === "lumpsum" ? "Projected value" : "Estimated monthly SIP"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </FeaturePageScaffold>
  );
};

const Field = ({
  label,
  value,
  onChange,
  step = "1",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: string;
}) => (
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

export default InvestmentCalculatorPage;
