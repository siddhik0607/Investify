import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ChevronRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AboutContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Investify contact request");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`);
    window.location.href = `mailto:kasabesiddhi@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 1800);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <FeaturePageScaffold
      badge="About"
      title="A calmer way to plan your financial goals."
      description="Investify is built to help people make consistent monthly progress with clarity, premium design, and simple math."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mission</p>
                <p className="mt-2 text-lg font-bold text-foreground">Make investing feel simple and achievable.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We focus on goal-based planning, clear projections, and premium UX — so users feel confident
                  moving forward each month.
                </p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2" data-stagger="cards">
            <div data-card className="rounded-2xl border border-border bg-background p-6 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">Trust-first defaults</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Private by default, minimal friction, and consistent planning workflows.
              </p>
            </div>
            <div data-card className="rounded-2xl border border-border bg-background p-6 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">Human-centered planning</p>
              <p className="mt-1 text-sm text-muted-foreground">
                No jargon. No noise. Just a plan you can stick to.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</p>
            <p className="mt-2 text-lg font-bold text-foreground">Try the platform pages</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button asChild className="bg-gradient-primary shadow-elevated hover:opacity-95">
                <Link to="/dashboard">
                  Open dashboard
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-background">
                <Link to="/learn">
                  Open learn hub
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</p>
          <p className="mt-2 text-lg font-bold text-foreground">Send a message</p>
          <p className="mt-1 text-sm text-muted-foreground">We’ll respond with clarity and next steps.</p>

          <form onSubmit={submit} className="mt-6 grid gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Name</span>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12 bg-card" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Email</span>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-card" type="email" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Message</span>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[120px] bg-card" required />
            </label>

            <Button type="submit" className="h-12 bg-gradient-primary shadow-elevated hover:opacity-95">
              {sent ? (
                <>
                  Sent
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Send message
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div id="privacy" className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Privacy Policy</p>
          <p className="mt-2 text-lg font-bold text-foreground">Respectful by default</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Investify is designed to minimize data collection and keep your planning experience private. We do not sell personal data.
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>• We store only what’s needed to provide planning and tracking features.</p>
            <p>• We avoid unnecessary third-party tracking on core flows.</p>
            <p>• You can request deletion of your profile and planning data.</p>
          </div>
        </div>
        <div id="terms" className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Terms</p>
          <p className="mt-2 text-lg font-bold text-foreground">Clear expectations</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Investify provides educational projections and planning tools. Actual returns depend on markets and product selection.
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>• Projections are estimates, not financial advice.</p>
            <p>• You remain responsible for investment decisions and risk.</p>
            <p>• Pricing tiers may change; existing subscriptions keep benefits until renewal.</p>
          </div>
        </div>
      </div>
    </FeaturePageScaffold>
  );
};

export default AboutContactPage;
