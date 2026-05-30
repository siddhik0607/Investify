import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { calcMonthlySIP, formatInr } from "@/lib/finance";

const SipCalculatorPage = () => {
  const [targetAmount, setTargetAmount] = useState(1500000);
  const [years, setYears] = useState(5);
  const [annualReturn, setAnnualReturn] = useState(12);

  const monthlySip = useMemo(
    () => calcMonthlySIP(targetAmount, years, annualReturn),
    [annualReturn, targetAmount, years],
  );
  const totalInvested = monthlySip * years * 12;
  const estimatedGrowth = Math.max(0, targetAmount - totalInvested);

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-background/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-elevated backdrop-blur-xl lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <section>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Calculator className="h-3.5 w-3.5" />
                Smart SIP Calculator
              </div>
              <h1 className="mt-5 text-balance text-4xl font-bold sm:text-5xl">
                Solve the monthly investment needed to hit your target.
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                Enter your goal amount, timeline, and expected return. Investify instantly shows the monthly SIP required and the split between invested money and growth.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <MetricCard label="Monthly SIP" value={formatInr(monthlySip)} accent />
                <MetricCard label="Total Invested" value={formatInr(totalInvested)} />
                <MetricCard label="Estimated Growth" value={formatInr(estimatedGrowth)} />
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-background p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">How to read this</p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Target className="mt-0.5 h-4 w-4 text-primary" />
                    The monthly SIP is the amount you need to invest every month to reach your target on time.
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="mt-0.5 h-4 w-4 text-secondary" />
                    Estimated growth is the extra value created by your expected annual return.
                  </li>
                </ul>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-background p-6 shadow-card">
              <p className="text-lg font-semibold">Calculator Inputs</p>
              <div className="mt-6 grid gap-5">
                <Field
                  label="Target Amount"
                  value={targetAmount}
                  onChange={setTargetAmount}
                  placeholder="1500000"
                />
                <Field label="Time Horizon (Years)" value={years} onChange={setYears} placeholder="5" />
                <Field
                  label="Expected Return (% p.a.)"
                  value={annualReturn}
                  onChange={setAnnualReturn}
                  placeholder="12"
                  step="0.1"
                />
              </div>

              <div className="mt-8 rounded-2xl bg-card p-5 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Suggested monthly SIP</p>
                    <p className="mt-1 text-3xl font-bold text-primary">{formatInr(monthlySip)}</p>
                  </div>
                  <div className="rounded-xl bg-secondary-soft px-4 py-3 text-right">
                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Goal</p>
                    <p className="text-lg font-semibold text-foreground">{formatInr(targetAmount)}</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="mt-6 w-full bg-gradient-primary hover:opacity-95">
                <Link to="/new-goal">Use this plan in Start Planning</Link>
              </Button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  step = "1",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder: string;
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
      placeholder={placeholder}
      className="h-12 bg-card"
    />
  </label>
);

const MetricCard = ({
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

export default SipCalculatorPage;
