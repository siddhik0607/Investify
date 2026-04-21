import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Target, TrendingUp, Wallet, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    isFinite(n) ? n : 0,
  );

/**
 * SIP required monthly contribution from target future value.
 * FV = P × [((1 + r)^n − 1) / r] × (1 + r)
 * Solve for P (monthly SIP) given FV, annual return rate, duration in years.
 */
function calcMonthlySIP(target: number, years: number, annualRatePct: number) {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualRatePct / 100 / 12;
  if (r === 0) return target / n;
  const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return target / factor;
}

const NewGoal = () => {
  const [goalName, setGoalName] = useState("Buy first car");
  const [target, setTarget] = useState(800000);
  const [years, setYears] = useState(4);
  const [rate, setRate] = useState(12);
  const { toast } = useToast();

  const monthly = useMemo(() => calcMonthlySIP(target, years, rate), [target, years, rate]);
  const invested = monthly * years * 12;
  const returns = Math.max(0, target - invested);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Goal plan ready ✨",
      description: `Save ${fmt(monthly)}/month to reach ${fmt(target)} in ${years} years.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <main className="container px-4 py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New goal
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Tell us your goal — we'll plan the SIP.
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Enter your target amount, timeline, and expected return. We'll calculate exactly how much to invest every
              month.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {/* Form */}
            <form
              onSubmit={handleSave}
              className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card md:col-span-3"
            >
              <div className="space-y-2">
                <Label htmlFor="goalName">Goal name</Label>
                <div className="relative">
                  <Target className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="goalName"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="e.g. Buy first car"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Target amount (₹)</Label>
                <Input
                  id="target"
                  type="number"
                  min={1000}
                  step={1000}
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="years">Duration (years)</Label>
                  <Input
                    id="years"
                    type="number"
                    min={1}
                    max={40}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Expected return (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    min={1}
                    max={30}
                    step={0.5}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary-soft p-4 text-sm text-accent-foreground">
                💡 Tip: Increase the duration to reduce your monthly SIP.
              </div>

              <Button type="submit" className="w-full bg-gradient-primary shadow-elevated hover:opacity-95">
                Save goal plan
              </Button>
            </form>

            {/* Summary */}
            <aside className="space-y-4 md:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Monthly SIP</p>
                <p className="mt-1 bg-gradient-growth bg-clip-text text-3xl font-bold text-transparent">
                  {fmt(monthly)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">for {years} years · {rate}% p.a.</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center justify-between py-1.5">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Wallet className="h-4 w-4" /> You invest
                  </span>
                  <span className="text-sm font-semibold">{fmt(invested)}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-secondary" /> Expected returns
                  </span>
                  <span className="text-sm font-semibold text-secondary">{fmt(returns)}</span>
                </div>
                <div className="mt-2 border-t border-border pt-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Target</span>
                  <span className="text-sm font-bold">{fmt(target)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewGoal;
