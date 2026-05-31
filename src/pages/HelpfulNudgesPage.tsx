import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bell, Clock3, LineChart, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { calcMonthlySIP, formatInr } from "@/lib/finance";
import { motion } from "framer-motion";

const HelpfulNudgesPage = () => {
  const [targetAmount, setTargetAmount] = useState(2500000);
  const [years, setYears] = useState(6);
  const [annualReturn, setAnnualReturn] = useState(11);

  const currentPlan = useMemo(
    () => calcMonthlySIP(targetAmount, years, annualReturn),
    [annualReturn, targetAmount, years],
  );
  const longerDurationPlan = calcMonthlySIP(targetAmount, years + 2, annualReturn);
  const betterReturnPlan = calcMonthlySIP(targetAmount, years, annualReturn + 1.5);
  const stepUpStarter = currentPlan * 0.82;

  const suggestions = [
    `If you stretch the duration by 2 years, your monthly SIP can drop by ${formatInr(
      Math.max(0, currentPlan - longerDurationPlan),
    )}.`,
    `If your return expectation improves from ${annualReturn}% to ${(annualReturn + 1.5).toFixed(
      1,
    )}%, the monthly SIP can reduce by ${formatInr(Math.max(0, currentPlan - betterReturnPlan))}.`,
    `If the current SIP feels high, start around ${formatInr(stepUpStarter)} and increase it by about 10% every year.`,
  ];

  return (
    <div data-scroll="section" className="min-h-screen">
      <header className="border-b border-white/10 bg-background/50">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          data-scroll="inner"
          className="mx-auto max-w-6xl rounded-3xl border border-border bg-card p-8 shadow-elevated lg:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Bell className="h-3.5 w-3.5" />
                Helpful Nudges
              </div>
              <h1 className="mt-5 text-balance text-4xl font-bold sm:text-5xl">
                Adjust duration, returns, and next steps with plain-English suggestions.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                This page keeps your website styling while giving users simple planning nudges based on the goal they are trying to reach.
              </p>

              <div className="mt-8 grid gap-4">
                {suggestions.map((suggestion, index) => (
                  <div key={suggestion} className="rounded-2xl border border-border bg-background p-5 shadow-card">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                        {index === 0 ? <Clock3 className="h-4 w-4" /> : index === 1 ? <LineChart className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
                <p className="text-lg font-semibold">Your Plan Inputs</p>
                <div className="mt-6 grid gap-5">
                  <Field label="Target Amount" value={targetAmount} onChange={setTargetAmount} />
                  <Field label="Duration (Years)" value={years} onChange={setYears} />
                  <Field label="Expected Return (% p.a.)" value={annualReturn} onChange={setAnnualReturn} step="0.1" />
                </div>
              </div>

              <div className="grid gap-4">
                <PlanCard
                  icon={<Bell className="h-4 w-4" />}
                  label="Current plan"
                  description={`Reach ${formatInr(targetAmount)} in ${years} years`}
                  value={formatInr(currentPlan)}
                />
                <PlanCard
                  icon={<Clock3 className="h-4 w-4" />}
                  label="Stretch duration"
                  description={`Extend to ${years + 2} years and reduce monthly pressure`}
                  value={formatInr(longerDurationPlan)}
                />
                <PlanCard
                  icon={<LineChart className="h-4 w-4" />}
                  label="Adjust returns"
                  description={`At ${(annualReturn + 1.5).toFixed(1)}% expected return`}
                  value={formatInr(betterReturnPlan)}
                />
              </div>

              <Button asChild size="lg" className="w-full bg-gradient-primary hover:opacity-95">
                <Link to="/new-goal">
                  Apply this in Start Planning
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.section>
          </div>
        </motion.div>
      </main>
    </div>
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

const PlanCard = ({
  icon,
  label,
  description,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-border bg-background p-5 shadow-card">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <p className="mt-4 text-2xl font-bold text-primary">{value}<span className="ml-1 text-sm font-medium text-muted-foreground">/month</span></p>
  </div>
);

export default HelpfulNudgesPage;
