import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, LineChart, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const trustPillars = [
  {
    title: "Secure by design",
    desc: "Authentication and API access follow proven, production-grade patterns.",
    tone: "border-border bg-background/30",
    icon: ShieldCheck,
    points: ["Supabase Auth ready", "HTTPS by default", "No credentials stored in the browser"],
  },
  {
    title: "Privacy-first data",
    desc: "We only collect what’s needed to plan goals and show progress.",
    tone: "border-primary/30 bg-primary-soft",
    icon: Lock,
    points: ["Minimal fields", "Clear purpose", "Designed for least privilege"],
    highlight: true,
  },
  {
    title: "Transparent planning",
    desc: "Every number is grounded in inputs you can understand and edit.",
    tone: "border-secondary/30 bg-secondary-soft",
    icon: LineChart,
    points: ["Clear SIP math", "Editable assumptions", "Readable projections"],
  },
];

const PricingPage = () => {
  return (
    <FeaturePageScaffold
      badge="Trust"
      title="Built for security, privacy, and clarity."
      description="A premium planning experience that earns trust through transparency and secure defaults."
    >
      <div className="grid gap-6 lg:grid-cols-3" data-stagger="cards">
        {trustPillars.map((p) => (
          <div
            key={p.title}
            data-card
            className={`relative overflow-hidden rounded-3xl border p-6 shadow-card ${p.tone}`}
          >
            {p.highlight ? (
              <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-violet-200" />
                Core pillar
              </div>
            ) : null}

            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-background/30 text-primary">
              <p.icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-lg font-bold text-foreground">{p.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

            <div className="mt-6 space-y-3">
              {p.points.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-background/50 border border-border/60">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-background p-6 shadow-card">
        <p className="text-sm font-semibold text-foreground">Need help setting up Supabase securely?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We’ll guide you on environment variables and safe auth flows.
        </p>
        <Button asChild className="mt-5 bg-gradient-primary shadow-elevated hover:opacity-95">
          <Link to="/contact">
            Contact support
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </FeaturePageScaffold>
  );
};

export default PricingPage;
