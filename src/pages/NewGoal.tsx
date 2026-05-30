import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/Logo";
import { ArrowLeft, BadgeCheck, Bell, MessageCircle, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildGrowthSeries, calcMonthlySIP, formatInr } from "@/lib/finance";
import { supabase } from "@/lib/supabase";

const NewGoal = () => {
  const navigate = useNavigate();
  const [goalName, setGoalName] = useState("Dream Home");
  const [targetAmount, setTargetAmount] = useState(800000);
  const [years, setYears] = useState(4);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [name, setName] = useState(() => localStorage.getItem("user_name") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("user_email") || "");
  const [mobile, setMobile] = useState("");
  const [whatsApp, setWhatsApp] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const monthlySip = useMemo(
    () => calcMonthlySIP(targetAmount, years, annualReturn),
    [annualReturn, targetAmount, years],
  );
  const series = useMemo(
    () => buildGrowthSeries(monthlySip, years, annualReturn),
    [annualReturn, monthlySip, years],
  );
  const totalInvested = monthlySip * years * 12;
  const estimatedGrowth = Math.max(0, targetAmount - totalInvested);
  const chartMax = Math.max(...series.map((item) => item.value), totalInvested, 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!goalName.trim()) {
      toast({ title: "Please enter a goal name", variant: "destructive" });
      return;
    }

    if (!name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }

    if (!email.trim()) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }

    if (!/^\+?\d{10,13}$/.test(mobile.replace(/\s/g, ""))) {
      toast({ title: "Please enter a valid mobile number", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const planData = {
      userName: name,
      userEmail: email,
      selectedGoal: goalName,
      adjustedTarget: targetAmount,
      targetYears: years,
      expectedReturn: annualReturn,
      income: 0, // Not captured on this page, but needed for planData structure
      lifestyle: "balanced",
      recommendedSip: monthlySip
    };

    try {
      const { error } = await supabase
        .from("investment_plans")
        .insert([
          {
            full_name: name,
            email: email,
            goal_name: goalName,
            target_amount: targetAmount,
            target_years: years,
            expected_return: annualReturn,
            recommended_sip: monthlySip,
          },
        ]);

      if (error) {
        console.warn("Supabase save failed, but proceeding to show plan:", error.message);
      } else {
        toast({ title: "Plan saved successfully!" });
      }
    } catch (err: any) {
      console.error("Error saving plan:", err);
    } finally {
      setIsSubmitting(false);
      navigate("/sip-plan-result", { state: { planData } });
    }
  };

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

      <main className="container px-4 py-8 lg:py-12">
        {name && (
          <div className="mb-10 text-center animate-fade-in">
            <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Hello {name}, welcome to Investify
            </h2>
            <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-primary/20" />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.95fr]">
          <section className="rounded-3xl border border-border bg-card p-8 shadow-elevated lg:p-10">
            <h1 className="text-balance text-4xl font-bold sm:text-5xl">
              Build your investment plan with the same colors as the rest of Investify.
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Monthly SIP" value={formatInr(monthlySip)} accent />
              <StatCard label="Total Invested" value={formatInr(totalInvested)} />
              <StatCard label="Estimated Growth" value={formatInr(estimatedGrowth)} />
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">Growth Preview</p>
                  <h2 className="mt-2 text-2xl font-semibold">Invested vs projected value</h2>
                </div>
                <span className="rounded-full bg-secondary-soft px-3 py-1 text-xs font-semibold text-secondary">
                  {years} year plan
                </span>
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
                          style={{ width: `${Math.max(6, (item.invested / chartMax) * 100)}%` }}
                        />
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-growth"
                          style={{ width: `${Math.max(6, (item.value / chartMax) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title="Simple monthly target"
                  text={`Aiming for ${formatInr(targetAmount)} over ${years} years keeps your plan clear and trackable.`}
                />
                <InfoCard
                  icon={<TrendingUp className="h-4 w-4" />}
                  title="Expected return input"
                  text={`At ${annualReturn}% expected return, your plan is currently targeting ${formatInr(estimatedGrowth)} in growth.`}
                />
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-elevated">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Plan Builder</p>
              <h2 className="mt-2 text-2xl font-bold">Create your SIP plan</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your goal details and user information to see the monthly investment needed.
              </p>

              <div className="mt-6 grid gap-4">
                <Field label="Goal Name" value={goalName} onChange={setGoalName} placeholder="Dream Home" />
                <NumberField
                  label="Target Amount"
                  value={targetAmount}
                  onChange={setTargetAmount}
                  placeholder="800000"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <NumberField label="Years" value={years} onChange={setYears} placeholder="4" />
                  <NumberField
                    label="Return % p.a."
                    value={annualReturn}
                    onChange={setAnnualReturn}
                    placeholder="12"
                    step="0.1"
                  />
                </div>
                <Field label="Your Name" value={name} onChange={setName} placeholder="Your name" />
                <Field label="Email Address" value={email} onChange={setEmail} placeholder="your@email.com" />
                <Field label="Mobile Number" value={mobile} onChange={setMobile} placeholder="+91 98765 43210" />
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={whatsApp}
                  onChange={(e) => setWhatsApp(e.target.checked)}
                  className="h-4 w-4 rounded accent-[hsl(var(--primary))]"
                />
                <MessageCircle className="h-4 w-4 text-secondary" />
                Get plan updates on WhatsApp
              </label>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-6 h-12 w-full bg-gradient-primary text-base font-semibold hover:opacity-95"
              >
                {isSubmitting ? "Generating Plan..." : "Show My Investment Plan"}
              </Button>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Your planning inputs stay aligned with the website theme and layout.
              </div>
            </form>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-card">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <Bell className="h-4 w-4" />
                Suggested Next Step
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                If this monthly SIP feels high, open Helpful Nudges to compare longer durations, better return assumptions, and easier starting points.
              </p>
              <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>Confidence tracker</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <Button asChild variant="outline" className="mt-5 w-full">
                <Link to="/helpful-nudges">Open Helpful Nudges</Link>
              </Button>
            </div>
          </aside>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-12 bg-background"
    />
  </label>
);

const NumberField = ({
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
      className="h-12 bg-background"
    />
  </label>
);

const StatCard = ({
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

const InfoCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">{icon}</span>
      {title}
    </div>
    <p className="mt-3 text-sm text-muted-foreground">{text}</p>
  </div>
);

export default NewGoal;
