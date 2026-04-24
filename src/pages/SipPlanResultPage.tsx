import { useLocation, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  Wallet, 
  Target, 
  Calendar,
  Building2,
  PieChart,
  ShieldCheck,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { formatInr } from "@/lib/finance";
import { useEffect } from "react";

const SipPlanResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const planData = location.state?.planData;

  useEffect(() => {
    if (!planData) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [planData, navigate]);

  if (!planData) return null;

  const {
    userName,
    selectedGoal,
    adjustedTarget,
    targetYears,
    expectedReturn,
    recommendedSip,
  } = planData;

  const totalInvested = recommendedSip * targetYears * 12;
  const estimatedReturns = Math.max(0, adjustedTarget - totalInvested);

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-14 items-center justify-between px-4">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Planner
          </Link>
        </div>
      </header>

      <main className="container px-4 py-10 max-w-4xl">
        {/* Success Banner */}
        <div className="mb-10 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary-soft text-secondary mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Congratulations, {userName}!
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Your personalized investment plan for <span className="text-primary font-bold">{selectedGoal}</span> is ready.
          </p>
        </div>

        {/* Summary Card */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <SummaryCard 
            icon={<Target className="h-5 w-5" />} 
            label="Goal Target" 
            value={formatInr(adjustedTarget)} 
            subValue={`in ${targetYears} years`}
          />
          <SummaryCard 
            icon={<Wallet className="h-5 w-5" />} 
            label="Monthly SIP" 
            value={formatInr(recommendedSip)} 
            subValue="to be invested"
            highlight
          />
          <SummaryCard 
            icon={<TrendingUp className="h-5 w-5" />} 
            label="Est. Growth" 
            value={formatInr(estimatedReturns)} 
            subValue={`${expectedReturn}% expected return`}
          />
        </div>

        {/* Systematic Plan Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <PieChart className="h-6 w-6 text-primary" />
            Your Step-by-Step Investment Strategy
          </h2>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
            
            {/* Step 1 */}
            <PlanStep 
              number={1} 
              title="When to start? — Immediately" 
              icon={<Calendar className="h-5 w-5" />}
              description={`The power of compounding works best when you start early. Aim to start your first SIP of ${formatInr(recommendedSip)} before the 5th of next month.`}
            />

            {/* Step 2 */}
            <PlanStep 
              number={2} 
              title="Where to invest? — Diversified Equity Funds" 
              icon={<Building2 className="h-5 w-5" />}
              description="Since your goal is in the future, we recommend a mix of Nifty 50 Index Funds and Mid-cap funds to capture market growth while maintaining stability."
              list={[
                "50% in Large Cap / Index Funds (Stable growth)",
                "30% in Mid Cap Funds (Higher returns)",
                "20% in Small Cap Funds (Aggressive growth)"
              ]}
            />

            {/* Step 3 */}
            <PlanStep 
              number={3} 
              title="How to invest? — Automated SIP" 
              icon={<ShieldCheck className="h-5 w-5" />}
              description="Set up an 'Auto-debit' with your bank. This ensures your investment happens consistently every month without you having to manually do it."
            />

            {/* Step 4 */}
            <PlanStep 
              number={4} 
              title="Review & Rebalance — Every 12 Months" 
              icon={<ChevronRight className="h-5 w-5" />}
              description="Once a year, check if your funds are performing. If you get a salary hike, consider increasing your SIP amount by 10% to reach your goal even faster."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="h-12 px-8 bg-gradient-primary font-bold shadow-elevated">
            <Download className="mr-2 h-5 w-5" />
            Download Full PDF Plan
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 font-bold" asChild>
            <Link to="/">Create Another Plan</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

const SummaryCard = ({ icon, label, value, subValue, highlight = false }: any) => (
  <div className={`p-6 rounded-2xl border ${highlight ? 'border-primary/30 bg-primary-soft shadow-card' : 'border-border bg-card shadow-sm'}`}>
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${highlight ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
      {icon}
    </div>
    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-black ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
    <p className="text-xs font-medium text-muted-foreground mt-1">{subValue}</p>
  </div>
);

const PlanStep = ({ number, title, description, icon, list }: any) => (
  <div className="relative pl-12 animate-fade-in-up">
    <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary text-primary font-bold shadow-sm z-10">
      {number}
    </div>
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed text-sm">
        {description}
      </p>
      {list && (
        <ul className="mt-4 space-y-2">
          {list.map((item: string, i: number) => (
            <li key={i} className="flex items-center gap-2 text-xs font-medium text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default SipPlanResultPage;