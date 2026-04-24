import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { buildGrowthSeries, calculateFutureValue, formatInr } from "@/lib/finance";

const VisualizeGrowthPage = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(12000);
  const [years, setYears] = useState(7);
  const [annualReturn, setAnnualReturn] = useState(12);

  const series = useMemo(
    () => buildGrowthSeries(monthlyInvestment, years, annualReturn),
    [annualReturn, monthlyInvestment, years],
  );
  const finalValue = calculateFutureValue(monthlyInvestment, years, annualReturn);
  const totalInvested = monthlyInvestment * years * 12;
  const maxValue = Math.max(...series.map((item) => item.value), totalInvested, 1);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card p-8 shadow-elevated lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <BarChart3 className="h-3.5 w-3.5" />
                Visualize Growth
              </div>
              <h1 className="mt-5 text-balance text-4xl font-bold sm:text-5xl">
                Compare what you invest with what your money can become.
              </h1>
              <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
                This page keeps the same website colors while showing a clean year-by-year comparison between your invested amount and projected value.
              </p>
            </div>
            <Button asChild className="bg-gradient-primary hover:opacity-95">
              <Link to="/new-goal">Open Start Planning</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InputCard label="Monthly Investment" value={monthlyInvestment} onChange={setMonthlyInvestment} />
            <InputCard label="Years" value={years} onChange={setYears} />
            <InputCard label="Return % p.a." value={annualReturn} onChange={setAnnualReturn} step="0.1" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <SummaryCard label="You invest" value={formatInr(totalInvested)} />
            <SummaryCard label="Projected value" value={formatInr(finalValue)} accent />
            <SummaryCard label="Estimated gain" value={formatInr(Math.max(0, finalValue - totalInvested))} />
          </div>

          <section className="mt-10 rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <TrendingUp className="h-4 w-4" />
              Growth Comparison Chart
            </div>
            <div className="mt-6 space-y-5">
              {series.map((item) => (
                <div key={item.year}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-foreground">Year {item.year}</span>
                    <span className="text-muted-foreground">
                      {formatInr(item.invested)} invested · {formatInr(item.value)} projected
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-secondary"
                        style={{ width: `${Math.max(6, (item.invested / maxValue) * 100)}%` }}
                      />
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-growth"
                        style={{ width: `${Math.max(6, (item.value / maxValue) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const InputCard = ({
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
  <label className="rounded-2xl border border-border bg-background p-5 shadow-card">
    <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
    <Input
      type="number"
      min="0"
      step={step}
      value={Number.isFinite(value) ? value : ""}
      onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
      className="h-11 bg-card"
    />
  </label>
);

const SummaryCard = ({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className={`rounded-2xl border p-5 ${accent ? "border-primary/30 bg-primary-soft" : "border-border bg-background"}`}>
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={`mt-3 text-2xl font-bold ${accent ? "text-primary" : "text-foreground"}`}>{value}</p>
  </div>
);

export default VisualizeGrowthPage;
