import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Car,
  Check,
  ChevronRight,
  CircleDollarSign,
  Download,
  Home,
  LineChart,
  PiggyBank,
  Plane,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { buildGrowthSeries, calcMonthlySIP, formatInr } from "@/lib/finance";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";

const lifestyleAdjustments: Record<string, number> = {
  balanced: 1,
  minimal: 0.9,
  ambitious: 1.12,
};

const popularGoals = [
  { title: "Buy a Car", icon: Car, cost: 800000, route: "/goals" },
  { title: "Buy a Home", icon: Home, cost: 5000000, route: "/goals" },
  { title: "World Trip", icon: Plane, cost: 300000, route: "/goals" },
  { title: "Gadget Upgrade", icon: Wallet, cost: 120000, route: "/goals" },
  { title: "Emergency Fund", icon: PiggyBank, cost: 200000, route: "/goals" },
];

const weekProgress = [
  { day: "S", percent: 100 },
  { day: "M", percent: 100 },
  { day: "T", percent: 85 },
  { day: "W", percent: 100 },
  { day: "T", percent: 75 },
  { day: "F", percent: 100 },
  { day: "S", percent: 92 },
];

const milestoneItems = [
  { label: "25% Completed", done: true },
  { label: "50% Completed", done: true },
  { label: "75% Completed", done: false },
  { label: "Goal Achieved", done: false },
];

const powerfulFeatures = [
  {
    title: "Risk Profile Quiz",
    desc: "Get a plan that matches your risk appetite.",
    button: "Take Quiz",
    icon: ShieldCheck,
    to: "/risk-quiz",
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Expense Planner",
    desc: "Add your monthly expenses and get better SIP advice.",
    button: "Add Expenses",
    icon: CircleDollarSign,
    to: "/expense-planner",
    accent: "bg-amber-100 text-amber-500",
  },
  {
    title: "Multiple Goals",
    desc: "Track all your goals in one place.",
    button: "Add New Goal",
    icon: Target,
    to: "/multiple-goals",
    accent: "bg-rose-100 text-rose-500",
  },
  {
    title: "Reminders",
    desc: "Never miss an SIP. Get timely reminders.",
    button: "Set Reminder",
    icon: Bell,
    to: "/reminders",
    accent: "bg-orange-100 text-orange-500",
  },
  {
    title: "Download Plan",
    desc: "Download your financial plan as PDF.",
    button: "Download PDF",
    icon: Download,
    to: "/download-plan",
    accent: "bg-violet-100 text-violet-600",
  },
];

export const PlannerDashboard = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState(80000);
  const [userName, setUserName] = useState(() => localStorage.getItem("user_name") || "");
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("user_email") || "");
  const [lifestyle, setLifestyle] = useState<"balanced" | "minimal" | "ambitious">("balanced");
  const [selectedGoal, setSelectedGoal] = useState("My Custom Goal");
  const [targetAmount, setTargetAmount] = useState(1500000);
  const [targetYears, setTargetYears] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adjustedTarget = useMemo(
    () => Math.round(targetAmount * lifestyleAdjustments[lifestyle]),
    [lifestyle, targetAmount],
  );
  const recommendedSip = useMemo(
    () => calcMonthlySIP(adjustedTarget, targetYears, expectedReturn),
    [adjustedTarget, expectedReturn, targetYears],
  );

  const handleShowPlan = async () => {
    if (!userName || !userEmail) {
      toast.error("Please enter your name and email to continue");
      return;
    }

    setIsSubmitting(true);
    
    // Prepare the plan data for navigation
    const planData = {
      userName,
      userEmail,
      selectedGoal,
      adjustedTarget,
      targetYears,
      expectedReturn,
      income,
      lifestyle,
      recommendedSip
    };

    try {
      // Try to save to Supabase
      const { error } = await supabase
        .from("investment_plans")
        .insert([
          {
            full_name: userName,
            email: userEmail,
            goal_name: selectedGoal,
            target_amount: adjustedTarget,
            target_years: targetYears,
            expected_return: expectedReturn,
            monthly_income: income,
            lifestyle: lifestyle,
            recommended_sip: recommendedSip,
          },
        ]);

      if (error) {
        console.warn("Supabase save failed, but proceeding to show plan:", error.message);
        // We don't throw here so the user can still see their plan even if DB save fails
      } else {
        toast.success("Plan saved to database!");
      }
    } catch (error: any) {
      console.error("Error saving plan:", error);
      // Proceeding anyway
    } finally {
      setIsSubmitting(false);
      // ALWAYS navigate to results page so user can see their plan
      navigate("/sip-plan-result", { state: { planData } });
    }
  };
  const growthSeries = useMemo(
    () => buildGrowthSeries(recommendedSip, targetYears, expectedReturn),
    [expectedReturn, recommendedSip, targetYears],
  );
  const maxGrowthValue = growthSeries[growthSeries.length - 1]?.value || 1;
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInView = useInView(chartRef, { once: true, amount: 0.35 });
  const totalInvested = recommendedSip * targetYears * 12;
  const estimatedReturns = Math.max(0, adjustedTarget - totalInvested);
  const safeRatio = Math.min(100, Math.round((income * 0.35 > 0 ? recommendedSip / (income * 0.35) : 0) * 100));
  const affordabilityScore = Math.max(58, 100 - Math.max(0, safeRatio - 85));
  const currentValue = Math.round(totalInvested * 1.12);
  const monthlyPaid = Math.round(recommendedSip);
  const progressPercent = Math.min(100, Math.round((currentValue / Math.max(adjustedTarget, 1)) * 100));
  const streakAverage = Math.round(weekProgress.reduce((sum, day) => sum + day.percent, 0) / weekProgress.length);
  const customGoalSummary = `${selectedGoal} • ${formatInr(adjustedTarget)} target`;

  return (
    <section id="how" className="border-t border-border/60 bg-background py-16 md:py-20">
      <div className="container space-y-12 px-6">
        <div className="grid gap-8">
          <CardShell title="1. Smart Goal Setup" subtitle="Pick a goal or create your own to get started">
            <div className="grid gap-8 lg:grid-cols-[2.5fr_1fr]">
              {/* Left Column: Popular Goals */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Popular Goals</h3>
                  <Link to="/goals" className="text-xs font-semibold text-primary hover:underline">
                    View all goals
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {popularGoals.map((goal) => (
                    <button
                      key={goal.title}
                      type="button"
                      onClick={() => {
                        setSelectedGoal(goal.title);
                        setTargetAmount(goal.cost);
                      }}
                      className="group relative flex flex-col items-center rounded-2xl border border-border bg-background p-6 text-center shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <goal.icon className="h-8 w-8" />
                      </div>
                      <p className="mt-5 text-base font-bold text-foreground">{goal.title}</p>
                      <p className="mt-2 text-2xl font-black text-primary">{formatInr(goal.cost)}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Typical Cost</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Lifestyle & Custom Goal */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Your Details</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-xs font-semibold">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-xs font-medium outline-none focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-xs font-medium outline-none focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Lifestyle Details</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-xs font-semibold">Monthly Income</label>
                      <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(Math.max(0, Number(e.target.value) || 0))}
                        className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-xs font-medium outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold">Lifestyle</label>
                      <select
                        value={lifestyle}
                        onChange={(e) => setLifestyle(e.target.value as "balanced" | "minimal" | "ambitious")}
                        className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-xs font-medium outline-none focus:border-primary transition-colors"
                      >
                        <option value="minimal">Minimal</option>
                        <option value="balanced">Balanced</option>
                        <option value="ambitious">Ambitious</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background p-5 shadow-card">
                  <p className="text-lg font-bold text-foreground">Custom Goal</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Goal Name</label>
                      <input
                        value={selectedGoal}
                        onChange={(e) => setSelectedGoal(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-lg border border-input bg-card px-3 text-sm font-medium outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Target Amount</label>
                      <input
                        type="number"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(Math.max(0, Number(e.target.value) || 0))}
                        className="mt-1.5 h-11 w-full rounded-lg border border-input bg-card px-3 text-sm font-medium outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleShowPlan} 
                    disabled={isSubmitting}
                    className="mt-6 h-12 w-full bg-gradient-primary px-6 text-base font-bold shadow-elevated transition-transform hover:scale-[1.01]"
                  >
                    {isSubmitting ? "Saving Plan..." : "Show My Investment Plan"}
                  </Button>
                  <p className="mt-4 text-center text-[11px] font-medium text-muted-foreground">{customGoalSummary}</p>
                </div>
              </div>
            </div>
          </CardShell>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <CardShell title="2. Smart Plan Calculation" subtitle="We calculate the exact SIP you need using the SIP formula.">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="space-y-3 rounded-2xl border border-border bg-background p-5"
              >
                <DataRow label="Target Amount" value={formatInr(adjustedTarget)} />
                <DataRow label="Target Year" value={`${targetYears} Years`} />
                <DataRow label="Expected Return" value={`${expectedReturn}% p.a.`} />
                <DataRow label="Monthly Income" value={formatInr(income)} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                className="rounded-2xl border border-secondary/25 bg-secondary-soft p-6"
              >
                <p className="text-xs font-semibold text-primary">Your Recommended SIP</p>
                <p className="mt-3 text-4xl font-bold text-foreground">
                  <CountUpNumber value={recommendedSip} format={formatInr} />
                  <span className="ml-1.5 text-base font-medium text-muted-foreground">/mo</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Comfortable investment based on your setup.</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-[11px] font-semibold text-secondary">
                  <Check className="h-3.5 w-3.5" />
                  Safe & Optimal
                </div>
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Affordability Score</span>
                    <span>{affordabilityScore} / 100</span>
                  </div>
                  <Progress value={affordabilityScore} className="h-2 bg-white/70" />
                </div>
                <Button asChild variant="outline" className="mt-6 h-10 w-full bg-card text-sm font-semibold">
                  <Link to="/sip-calculator">Open calculator</Link>
                </Button>
              </motion.div>
            </div>
          </CardShell>

          <CardShell title="3. Growth Visualization" subtitle="Visualize your wealth growth over time.">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <motion.div
                ref={chartRef}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="mb-5 flex flex-wrap items-center gap-4 text-[11px] font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Invested
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    Growth
                  </span>
                </div>
                <div className="flex h-48 items-end gap-2 px-1">
                  {growthSeries.map((item, i) => (
                    <div key={item.year} className="group relative flex-1">
                      <motion.div
                        className="w-full rounded-t-md bg-primary/20 transition-colors group-hover:bg-primary/30"
                        initial={{ height: 0 }}
                        animate={{ height: chartInView ? `${(item.invested / maxGrowthValue) * 100}%` : 0 }}
                        transition={{ duration: 0.9, delay: 0.05 + i * 0.03, ease: [0.2, 0.8, 0.2, 1] }}
                      />
                      <motion.div
                        className="absolute bottom-0 w-full rounded-t-md bg-secondary transition-opacity group-hover:opacity-90"
                        initial={{ height: 0 }}
                        animate={{ height: chartInView ? `${(item.value / maxGrowthValue) * 100}%` : 0 }}
                        transition={{ duration: 1.0, delay: 0.08 + i * 0.035, ease: [0.2, 0.8, 0.2, 1] }}
                      />
                      <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 scale-0 rounded-md bg-foreground px-2 py-1 text-[10px] text-background transition-all group-hover:scale-100">
                        {item.year}y: {formatInr(item.value)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between px-1 text-[10px] font-bold text-muted-foreground">
                  {growthSeries.map((item) => (
                    <span key={item.year}>{item.year}Y</span>
                  ))}
                </div>
              </motion.div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="rounded-2xl border border-border bg-background p-4 shadow-card">
                  <p className="text-xs font-semibold text-muted-foreground">Total Invested</p>
                  <p className="mt-1.5 text-xl font-bold text-foreground">
                    <CountUpNumber value={totalInvested} format={formatInr} />
                  </p>
                </div>
                <div className="rounded-2xl border border-secondary/20 bg-secondary-soft p-4 shadow-card">
                  <p className="text-xs font-semibold text-secondary">Est. Returns</p>
                  <p className="mt-1.5 text-xl font-bold text-foreground">
                    <CountUpNumber value={estimatedReturns} format={formatInr} />
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                  className="rounded-2xl border border-primary/25 bg-primary-soft p-4 shadow-card"
                >
                  <p className="text-xs font-semibold text-primary">Future Value</p>
                  <p className="mt-1.5 text-xl font-bold text-foreground">
                    <CountUpNumber value={adjustedTarget} format={formatInr} />
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-muted-foreground">in {targetYears} years</p>
                </motion.div>
                <Button asChild className="h-12 w-full bg-gradient-primary text-sm font-bold shadow-card">
                  <Link to="/visualize-growth">View Chart</Link>
                </Button>
              </div>
            </div>
          </CardShell>
        </div>

        <div className="rounded-[2rem] border border-border bg-background p-8 shadow-card md:p-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-2xl font-bold text-foreground md:text-3xl">Everything you need to grow.</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Unlock powerful features and personalized nudges to stay on track.
              </p>
            </div>
            <Button asChild size="lg" className="h-14 bg-gradient-primary px-8 text-lg font-bold shadow-elevated">
              <Link to="/new-goal">Get Started Free</Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {powerfulFeatures.map((feat) => (
              <Link
                key={feat.title}
                to={feat.to}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feat.accent} transition-transform group-hover:scale-105`}>
                  <feat.icon className="h-6 w-6" />
                </div>
                <h4 className="mt-5 text-lg font-bold text-foreground">{feat.title}</h4>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{feat.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-primary">
                  {feat.button}
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <CardShell title="4. Track & Celebrate" subtitle="Stay motivated with real-time tracking and milestones.">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">Goal Progress</p>
                  <p className="text-[10px] font-bold text-primary">{progressPercent}%</p>
                </div>
                <Progress value={progressPercent} className="mt-3 h-2 bg-muted/30" />
                <div className="mt-8 grid grid-cols-7 gap-2">
                  {weekProgress.map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="relative h-20 w-full rounded-full bg-muted/20">
                        <div
                          className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-primary to-primary-light transition-all"
                          style={{ height: `${day.percent}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-secondary/20 bg-secondary-soft p-6">
                <div>
                  <div className="flex items-center gap-2.5">
                    <Trophy className="h-5 w-5 text-secondary" />
                    <p className="text-base font-bold text-foreground">Milestones</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    {milestoneItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            item.done ? "bg-primary text-primary-foreground" : "border-2 border-muted/30 text-muted/30"
                          }`}
                        >
                          {item.done && <Check className="h-3 w-3" />}
                        </div>
                        <span className={`text-xs font-bold ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button asChild variant="outline" className="h-10 w-full bg-card text-sm font-bold">
                  <Link to="/track-progress">Track all goals</Link>
                </Button>
              </div>
            </div>
          </CardShell>

          <CardShell title="5. Stay Motivated" subtitle="Daily nudges and tips to help you reach your financial peak.">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">Goal: {selectedGoal}</p>
                    <p className="text-xs font-medium text-muted-foreground">Keep it up, you are doing great!</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-elevated">
                  <p className="text-lg font-bold italic leading-relaxed">
                    "The best time to plant a tree was 20 years ago. The second best time is now."
                  </p>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-80">— Chinese Proverb</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Target className="h-5 w-5 text-secondary" />
                    <p className="text-sm font-bold text-foreground">Daily Nudge</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">10:30 AM</span>
                </div>
                <p className="text-xs font-medium leading-relaxed text-muted-foreground">
                  Consider moving a small part of your luxury budget to your {selectedGoal.toLowerCase()} SIP today for faster results.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-8 h-12 w-full bg-card text-base font-bold">
                <Link to="/helpful-nudges">View all nudges</Link>
              </Button>
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
};

function CountUpNumber({
  value,
  format,
  durationMs = 900,
}: {
  value: number;
  format: (n: number) => string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShown(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shown) return;
    const start = performance.now();
    const from = 0;
    const to = Number.isFinite(value) ? value : 0;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, shown, value]);

  return <span ref={ref}>{format(Math.round(current))}</span>;
}

const CardShell = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">{title}</h2>
      <p className="text-base font-medium text-muted-foreground">{subtitle}</p>
    </div>
    {children}
  </div>
);

const MiniHint = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-foreground">{title}</p>
      <p className="mt-1 text-[10px] font-medium leading-relaxed text-muted-foreground">{text}</p>
    </div>
  </div>
);

const DataRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
    <span className="text-xs font-bold text-muted-foreground">{label}</span>
    <span className="text-sm font-black text-foreground">{value}</span>
  </div>
);
