import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, BellRing, Calculator, LineChart, LogIn, Target, TrendingUp } from "lucide-react";

interface HowItWorksDialogProps {
  children: ReactNode;
}

/**
 * A visual explanation dialog. Renders a 4-step flow diagram built with
 * semantic design tokens — no external chart library required for this view.
 */
export const HowItWorksDialog = ({ children }: HowItWorksDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">How Investify works</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            A simple flow from login → goal → SIP plan → growth view → progress tracking.
          </DialogDescription>
        </DialogHeader>

        {/* Flow diagram */}
        <div className="relative mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <FlowStep
            n={1}
            icon={<LogIn className="h-5 w-5" />}
            title="Sign in"
            desc="Login with your email to save goals and plans."
            tone="primary"
          />
          <FlowStep
            n={2}
            icon={<Target className="h-5 w-5" />}
            title="Create a goal"
            desc="Pick a target amount and timeline (years)."
            tone="primary"
          />
          <FlowStep
            n={3}
            icon={<Calculator className="h-5 w-5" />}
            title="Get your SIP"
            desc="We calculate the monthly SIP needed to hit your target."
            tone="primary"
          />
          <FlowStep
            n={4}
            icon={<LineChart className="h-5 w-5" />}
            title="See the growth"
            desc="Clean chart shows invested vs. expected returns over time."
            tone="secondary"
          />
          <FlowStep
            n={5}
            icon={<TrendingUp className="h-5 w-5" />}
            title="Track progress"
            desc="Update deposits and watch your goal completion increase."
            tone="secondary"
          />
          <FlowStep
            n={6}
            icon={<BellRing className="h-5 w-5" />}
            title="Stay consistent"
            desc="Use reminders + nudges to keep your SIP streak going."
            tone="secondary"
            className="sm:col-span-2 lg:col-span-5"
          />
        </div>

        {/* Formula card */}
        <div className="mt-4 rounded-2xl border border-border/60 bg-background/30 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">The math behind it</p>
          <p className="mt-2 font-mono text-sm">
            FV = P × [((1 + r)<sup>n</sup> − 1) / r] × (1 + r)
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            <strong>FV</strong> = future value (your target) · <strong>P</strong> = monthly SIP · <strong>r</strong> =
            monthly return · <strong>n</strong> = months. We solve for <strong>P</strong>.
          </p>
        </div>

        {/* Mini growth visualization */}
        <div className="mt-2 rounded-2xl border border-border/60 bg-background/30 p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Example: ₹8L in 4 years @ 12%</span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" /> Invested
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-secondary" /> Returns
              </span>
            </div>
          </div>
          <svg viewBox="0 0 300 90" className="h-24 w-full">
            <defs>
              <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,78 C60,70 110,60 160,46 C210,32 260,18 300,10 L300,90 L0,90 Z" fill="url(#hg)" />
            <path
              d="M0,78 C60,70 110,60 160,46 C210,32 260,18 300,10"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0,82 C60,76 120,70 180,62 C240,54 280,50 300,48"
              stroke="hsl(var(--secondary))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const toneStyles = {
  primary: "border-primary/25 bg-primary-soft text-primary",
  secondary: "border-secondary/25 bg-secondary-soft text-secondary",
} as const;

const FlowStep = ({
  n,
  icon,
  title,
  desc,
  tone,
  className,
}: {
  n: number;
  icon: ReactNode;
  title: string;
  desc: string;
  tone: keyof typeof toneStyles;
  className?: string;
}) => (
  <div className={`relative rounded-2xl border border-border/60 bg-background/30 p-4 shadow-card ${className || ""}`}>
    <div className="absolute -top-2 left-4 rounded-full bg-background px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      Step {n}
    </div>
    <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border ${toneStyles[tone]}`}>
      {icon}
    </div>
    <p className="text-sm font-semibold">{title}</p>
    <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground/50 lg:block [.grid>div:last-child_&]:hidden" />
  </div>
);
