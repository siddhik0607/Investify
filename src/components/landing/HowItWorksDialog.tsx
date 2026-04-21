import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Target, Calculator, LineChart, TrendingUp } from "lucide-react";

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
          <DialogTitle className="text-2xl">How Investment Planning works</DialogTitle>
          <DialogDescription>
            Four simple steps from your dream goal to a monthly plan you can actually follow.
          </DialogDescription>
        </DialogHeader>

        {/* Flow diagram */}
        <div className="mt-2 grid gap-3 sm:grid-cols-4">
          <FlowStep
            n={1}
            icon={<Target className="h-5 w-5" />}
            title="Set a goal"
            desc="Car, home, trip — name it and pick a target amount."
            tone="primary"
          />
          <FlowStep
            n={2}
            icon={<Calculator className="h-5 w-5" />}
            title="We calculate"
            desc="We compute the exact monthly SIP using the FV formula."
            tone="primary"
          />
          <FlowStep
            n={3}
            icon={<LineChart className="h-5 w-5" />}
            title="See the growth"
            desc="Clean chart shows invested vs. expected returns over time."
            tone="secondary"
          />
          <FlowStep
            n={4}
            icon={<TrendingUp className="h-5 w-5" />}
            title="Track progress"
            desc="Update each month and watch your goal progress bar fill up."
            tone="secondary"
          />
        </div>

        {/* Formula card */}
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
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
        <div className="mt-2 rounded-xl border border-border bg-card p-4">
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
}: {
  n: number;
  icon: ReactNode;
  title: string;
  desc: string;
  tone: keyof typeof toneStyles;
}) => (
  <div className="relative rounded-xl border border-border bg-card p-4 shadow-sm">
    <div className="absolute -top-2 left-4 rounded-full bg-background px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      Step {n}
    </div>
    <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border ${toneStyles[tone]}`}>
      {icon}
    </div>
    <p className="text-sm font-semibold">{title}</p>
    <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground/50 sm:block [.grid>div:last-child_&]:hidden" />
  </div>
);
