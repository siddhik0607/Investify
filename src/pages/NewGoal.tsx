import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Star, Briefcase, CreditCard, HeartPulse, Phone, ChevronDown, BadgeCheck, MessageCircle, ShieldCheck, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    isFinite(n) ? n : 0,
  );

/** SIP future value: FV = P × [((1+r)^n − 1)/r] × (1+r) */
function calcMonthlySIP(target: number, years: number, annualRatePct: number) {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualRatePct / 100 / 12;
  if (r === 0) return target / n;
  const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return target / factor;
}

const NewGoal = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsApp, setWhatsApp] = useState(true);
  const { toast } = useToast();

  // Static showcase numbers (matches the Policybazaar-style hero)
  const target = 10000000; // ₹1 Crore
  const years = 11; // 2015 → 2026
  const rate = 12;
  const monthly = useMemo(() => calcMonthlySIP(target, years, rate), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!/^\+?\d{10,13}$/.test(mobile.replace(/\s/g, ""))) {
      toast({ title: "Please enter a valid mobile number", variant: "destructive" });
      return;
    }
    toast({
      title: "Plans on the way ✨",
      description: `We'll show plans starting at ${fmt(1000)}/month — target ${fmt(target)}.`,
    });
  };

  return (
    <div className="min-h-screen bg-[hsl(220_15%_8%)] text-white">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Logo className="text-white [&_span]:text-white" />
          </div>
          <a href="tel:18001234567" className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(199_98%_60%)]">
            <Phone className="h-4 w-4" />
            Talk to Expert
          </a>
        </div>
      </header>

      <main className="container px-4 py-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* LEFT: Hero + chart */}
          <section>
            <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Get returns upto{" "}
              <span className="text-[hsl(199_98%_60%)]">₹1 Crore<sup className="text-sm">*</sup></span>
              <br />
              <span className="text-2xl font-medium text-white/85 sm:text-3xl">
                on investment of <span className="text-[hsl(199_98%_60%)]">₹10K/month</span>
              </span>
            </h1>

            {/* Bullets */}
            <ul className="mt-8 space-y-4 text-base">
              <Bullet icon={<Star className="h-4 w-4" />}>One stop destination for your investment needs</Bullet>
              <Bullet icon={<Briefcase className="h-4 w-4" />}>Complete support by dedicated financial advisor</Bullet>
              <Bullet icon={<CreditCard className="h-4 w-4" />}>Option to diversify your portfolio with 150+ fund options</Bullet>
              <Bullet icon={<HeartPulse className="h-4 w-4" />} accent>Inbuilt life cover</Bullet>
            </ul>

            {/* Growth chart (SENSEX-style) */}
            <div className="relative mt-10 rounded-xl bg-[hsl(220_15%_10%)] p-4">
              <svg viewBox="0 0 600 220" className="h-56 w-full">
                <defs>
                  <linearGradient id="grow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160 84% 45%)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="hsl(160 84% 45%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* jagged growth path */}
                <path
                  d="M0,180 L20,178 L40,182 L60,170 L80,176 L100,165 L120,172 L140,158 L160,168 L180,148 L200,160 L220,140 L240,150 L260,128 L280,142 L300,118 L320,130 L340,108 L360,118 L380,90 L400,104 L420,82 L440,94 L460,68 L480,82 L500,52 L520,68 L540,40 L560,55 L580,28 L600,22 L600,220 L0,220 Z"
                  fill="url(#grow)"
                />
                <path
                  d="M0,180 L20,178 L40,182 L60,170 L80,176 L100,165 L120,172 L140,158 L160,168 L180,148 L200,160 L220,140 L240,150 L260,128 L280,142 L300,118 L320,130 L340,108 L360,118 L380,90 L400,104 L420,82 L440,94 L460,68 L480,82 L500,52 L520,68 L540,40 L560,55 L580,28 L600,22"
                  stroke="hsl(160 84% 50%)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* End marker */}
                <circle cx="600" cy="22" r="5" fill="hsl(160 84% 50%)" />
              </svg>

              {/* Start label */}
              <div className="absolute bottom-16 left-2 rounded bg-[hsl(220_15%_14%)] px-2.5 py-1 text-xs">
                <div className="font-semibold">21,140</div>
                <div className="text-white/60">2015</div>
              </div>
              {/* End label */}
              <div className="absolute right-3 top-3 rounded bg-[hsl(220_15%_14%)] px-2.5 py-1 text-right text-xs">
                <div className="font-semibold">80,015</div>
                <div className="text-white/60">2026</div>
              </div>

              <div className="mt-2 flex flex-col items-center">
                <span className="rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
                  Market never stops growing
                </span>
                <p className="mt-2 text-xs text-white/70">3x returns in the last 10 Years SENSEX data</p>
              </div>
            </div>
          </section>

          {/* RIGHT: Form + Ad */}
          <aside className="space-y-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-[hsl(220_15%_10%)] p-6 shadow-elevated"
            >
              <p className="text-xl font-bold leading-tight">Explore plans starting from just</p>
              <p className="text-2xl font-extrabold text-[hsl(160_84%_50%)]">
                ₹1,000<span className="text-sm font-medium text-white/70">/month</span>
              </p>

              {/* Name */}
              <div className="mt-6">
                <FloatingField
                  label="Your Name"
                  value={name}
                  onChange={setName}
                  placeholder="Your Name"
                  invalid={!name.trim()}
                  errorText="Please enter your name"
                />
              </div>

              {/* Mobile */}
              <div className="mt-4">
                <label className="mb-1 block text-xs font-semibold text-[hsl(199_98%_60%)]">Mobile Number</label>
                <div
                  className={`flex items-center gap-2 rounded-md border bg-transparent px-3 py-2.5 ${
                    mobile && !/^\+?\d{10,13}$/.test(mobile.replace(/\s/g, "")) ? "border-destructive" : "border-[hsl(199_98%_60%)]"
                  }`}
                >
                  <button type="button" className="inline-flex items-center gap-1 text-sm text-white/80">
                    India <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-white/40">|</span>
                  <span className="text-sm text-white/70">+ 91</span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Mobile Number"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
                  />
                </div>
                {!mobile && (
                  <p className="mt-1 text-xs text-destructive">• Please enter your mobile number</p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-6 h-12 w-full rounded-md bg-[hsl(199_98%_55%)] text-base font-semibold text-white hover:bg-[hsl(199_98%_50%)]"
              >
                View Plans
              </Button>

              <div className="mt-4 space-y-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-[hsl(199_98%_60%)]" />
                  Only our Certified experts will assist you
                </div>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={whatsApp}
                    onChange={(e) => setWhatsApp(e.target.checked)}
                    className="h-4 w-4 rounded accent-[hsl(199_98%_55%)]"
                  />
                  <MessageCircle className="h-4 w-4 text-secondary" />
                  Get updates on WhatsApp
                </label>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-white/60">
                By clicking on view plans, you agreed to our{" "}
                <a className="text-[hsl(199_98%_60%)] underline" href="#">Privacy policy</a>,{" "}
                <a className="text-[hsl(199_98%_60%)] underline" href="#">Terms of Use</a> &{" "}
                <sup>+</sup>Disclaimer
              </p>
            </form>

            {/* Mutual Funds Advertisement */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[hsl(243_75%_25%)] to-[hsl(243_75%_15%)] p-6 shadow-elevated">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(160_84%_55%)]">
                <Star className="h-3.5 w-3.5" /> Sponsored · Mutual Funds
              </div>
              <h3 className="mt-2 text-xl font-bold">Top-rated SIPs for 2026</h3>
              <p className="mt-1 text-sm text-white/75">
                Hand-picked equity & hybrid funds with consistent 5-yr returns. Start investing from ₹500/month.
              </p>

              <div className="mt-4 space-y-3">
                <FundRow name="Bluechip Equity Fund" cagr="14.8%" risk="Moderate" />
                <FundRow name="Balanced Advantage Fund" cagr="12.3%" risk="Low" />
                <FundRow name="Smallcap Growth Fund" cagr="18.6%" risk="High" />
              </div>

              <Button className="mt-5 w-full bg-secondary text-secondary-foreground hover:opacity-95">
                Explore Mutual Funds
              </Button>
              <p className="mt-2 text-[10px] text-white/50">
                Mutual fund investments are subject to market risks. Read all scheme related documents carefully.
              </p>
            </div>

            {/* Suggested SIP plan badge */}
            <div className="rounded-2xl border border-white/10 bg-[hsl(220_15%_10%)] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
                <ShieldCheck className="h-3.5 w-3.5 text-[hsl(160_84%_50%)]" /> Suggested plan
              </div>
              <p className="mt-2 text-sm text-white/80">
                To reach <span className="font-semibold text-white">{fmt(target)}</span> in {years} years @ {rate}% p.a.
              </p>
              <p className="mt-1 text-2xl font-bold text-[hsl(160_84%_55%)]">{fmt(monthly)}/month</p>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-white/60">
                  <span>Goal progress</span>
                  <span>32%</span>
                </div>
                <Progress value={32} className="h-2 bg-white/10" />
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-secondary">
                <TrendingUp className="h-3.5 w-3.5" /> Avg. return +12.4% p.a.
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

const Bullet = ({ icon, children, accent = false }: { icon: React.ReactNode; children: React.ReactNode; accent?: boolean }) => (
  <li className="flex items-center gap-3">
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(199_98%_60%/0.15)] text-[hsl(199_98%_60%)]">
      {icon}
    </span>
    <span className={accent ? "font-semibold text-[hsl(160_84%_55%)]" : "text-white/90"}>{children}</span>
  </li>
);

const FloatingField = ({
  label,
  value,
  onChange,
  placeholder,
  invalid,
  errorText,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  invalid?: boolean;
  errorText?: string;
}) => (
  <div>
    <label className="mb-1 block text-xs font-semibold text-[hsl(199_98%_60%)]">{label}</label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-11 border-[hsl(199_98%_60%)] bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0 ${
        invalid ? "border-destructive" : ""
      }`}
    />
    {invalid && errorText && <p className="mt-1 text-xs text-destructive">• {errorText}</p>}
  </div>
);

const FundRow = ({ name, cagr, risk }: { name: string; cagr: string; risk: string }) => (
  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
    <div>
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-[11px] text-white/60">Risk: {risk}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-[hsl(160_84%_55%)]">{cagr}</p>
      <p className="text-[10px] text-white/60">5Y CAGR</p>
    </div>
  </div>
);

export default NewGoal;
