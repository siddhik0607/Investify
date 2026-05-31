import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    desc: "Best for getting started with goals and SIP planning.",
    tone: "border-border bg-background/30",
    features: ["Goal templates", "SIP calculator", "Growth visualization", "Basic progress tracking"],
    cta: { label: "Start free", to: "/new-goal" },
  },
  {
    name: "Pro",
    price: "₹299/mo",
    desc: "For consistent planners who want more tracking and insights.",
    tone: "border-primary/30 bg-primary-soft",
    features: ["Everything in Free", "Advanced progress tracking", "Goal streaks & milestones", "Portfolio insights"],
    cta: { label: "Go Pro", to: "/pricing" },
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹799/mo",
    desc: "For power users who want AI guidance and premium features.",
    tone: "border-secondary/30 bg-secondary-soft",
    features: ["Everything in Pro", "AI Insights", "AI Financial Assistant", "Priority support"],
    cta: { label: "Get Premium", to: "/pricing" },
  },
];

const PricingPage = () => {
  return (
    <FeaturePageScaffold
      badge="Pricing"
      title="Plans that scale with your investing journey."
      description="Premium fintech pricing cards with clear value and modern comparison styling."
    >
      <div className="grid gap-6 lg:grid-cols-3" data-stagger="cards">
        {plans.map((p) => (
          <div
            key={p.name}
            data-card
            className={`relative overflow-hidden rounded-3xl border p-6 shadow-card ${p.tone}`}
          >
            {p.highlight && (
              <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-violet-200" />
                Most popular
              </div>
            )}
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{p.name}</p>
            <p className="mt-3 text-4xl font-extrabold text-foreground">{p.price}</p>
            <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>

            <div className="mt-6 space-y-3">
              {p.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-background/50 border border-border/60">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className={`mt-8 w-full ${p.highlight ? "bg-gradient-primary shadow-elevated hover:opacity-95" : "bg-background/60 hover:bg-background/75"}`}
              variant={p.highlight ? "default" : "outline"}
            >
              <Link to={p.cta.to}>
                {p.cta.label}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-background p-6 shadow-card">
        <p className="text-sm font-semibold text-foreground">Need help choosing?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Use the AI assistant to understand which plan fits your goals and risk preference.
        </p>
        <Button asChild variant="outline" className="mt-5 bg-background">
          <Link to="/ai-assistant">
            Ask AI assistant
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </FeaturePageScaffold>
  );
};

export default PricingPage;
