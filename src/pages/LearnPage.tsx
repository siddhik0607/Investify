import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, BookOpen, ChevronRight, GraduationCap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const articles = [
  {
    id: "sip-compounding",
    title: "SIP basics: how compounding works",
    tag: "SIP Guides",
    desc: "Understand how monthly investing grows over time with simple examples.",
    content: [
      "A SIP (Systematic Investment Plan) is a disciplined way to invest a fixed amount every month.",
      "Compounding works best when you give it time. Small monthly contributions become meaningful when returns are reinvested.",
      "A simple rule of thumb: the longer the horizon, the less you need to push monthly contributions to reach the same target.",
    ],
  },
  {
    id: "goal-timeline",
    title: "Choosing a timeline for your goal",
    tag: "Goal Planning",
    desc: "How to pick years that feel realistic and reduce monthly pressure.",
    content: [
      "Start with the date you need the money, not the date you want the outcome.",
      "Stress-test the plan: if the monthly SIP feels too high, either extend the timeline or adjust the target.",
      "Use a buffer for inflation and life events so you don’t have to restart your plan.",
    ],
  },
  {
    id: "risk-return",
    title: "Risk vs return: the calm way to think about it",
    tag: "Investing Basics",
    desc: "A beginner-friendly guide to volatility, returns, and patience.",
    content: [
      "Higher potential returns usually come with higher volatility (bigger swings).",
      "Match risk to your timeline: shorter goals generally need more stability.",
      "Good portfolios are built to keep you invested through bad weeks — not to chase perfect returns.",
    ],
  },
  {
    id: "sip-vs-lumpsum",
    title: "Lump sum vs SIP: when each makes sense",
    tag: "Calculators",
    desc: "Use both strategies wisely — based on your cash flow and timeline.",
    content: [
      "SIPs reduce timing pressure by spreading buys across market conditions.",
      "Lump sums can work well when you have surplus cash and a long horizon.",
      "A hybrid approach is common: invest a portion now and SIP the rest over time.",
    ],
  },
  {
    id: "retirement-starter",
    title: "Retirement planning: a simple starting point",
    tag: "Retirement",
    desc: "Estimate your retirement corpus and monthly investment needed.",
    content: [
      "Start with a monthly expense estimate and multiply by the number of years you want to fund after retirement.",
      "Add a cushion for inflation and healthcare.",
      "Then back-calculate the SIP needed with a conservative expected return.",
    ],
  },
  {
    id: "emergency-fund",
    title: "Building an emergency fund first",
    tag: "Foundations",
    desc: "Why stability comes before aggressive growth and how to plan it.",
    content: [
      "An emergency fund reduces the chance you’ll stop SIPs during stressful months.",
      "A typical starting point is 3–6 months of expenses in safer instruments.",
      "Once it’s built, you can invest more confidently for long-term goals.",
    ],
  },
];

const LearnPage = () => {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<(typeof articles)[number] | null>(null);
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return articles;
    return articles.filter((a) => `${a.title} ${a.tag} ${a.desc}`.toLowerCase().includes(t));
  }, [q]);

  return (
    <FeaturePageScaffold
      badge="Learn"
      title="Financial education built into the product."
      description="Guides, basics, and practical resources — designed to be clear, calm, and premium."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 rounded-2xl border border-border bg-background p-6 shadow-card md:grid-cols-3">
          <div id="sip" className="rounded-2xl border border-border/60 bg-background/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SIP 101</p>
            <p className="mt-2 text-base font-bold text-foreground">Start disciplined investing</p>
            <p className="mt-2 text-sm text-muted-foreground">Understand monthly investing, compounding, and the habits that win long-term.</p>
            <Button asChild variant="outline" className="mt-4 bg-background">
              <Link to="/sip-calculator">
                Try SIP calculator
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div id="guide" className="rounded-2xl border border-border/60 bg-background/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Guide</p>
            <p className="mt-2 text-base font-bold text-foreground">Build a goal-first plan</p>
            <p className="mt-2 text-sm text-muted-foreground">Pick timelines, stress-test SIPs, and keep your plan stable even when life changes.</p>
            <Button asChild variant="outline" className="mt-4 bg-background">
              <Link to="/goal-planner">
                Open goal planner
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div id="glossary" className="rounded-2xl border border-border/60 bg-background/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Glossary</p>
            <p className="mt-2 text-base font-bold text-foreground">Key terms, simplified</p>
            <p className="mt-2 text-sm text-muted-foreground">SIP, NAV, CAGR, volatility — plain-English explanations you can actually use.</p>
            <Button asChild variant="outline" className="mt-4 bg-background">
              <Link to="/faq">
                Open help center
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search</p>
              <p className="mt-2 text-lg font-bold text-foreground">Find a topic</p>
              <p className="mt-1 text-sm text-muted-foreground">Quickly search across SIP, goals, retirement, and basics.</p>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: SIP, goal, retirement, risk..." className="h-12 bg-card" />
            <Button className="h-12 bg-gradient-primary px-6 hover:opacity-95">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Articles</p>
                <p className="mt-2 text-lg font-bold text-foreground">Browse resources</p>
                <p className="mt-1 text-sm text-muted-foreground">Short, actionable learning — no jargon.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2" data-stagger="cards">
              {filtered.map((a) => (
                <div key={a.title} data-card className="rounded-2xl border border-border/60 bg-background/30 p-5 shadow-card">
                  <div className="inline-flex rounded-full border border-border/60 bg-background/30 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    {a.tag}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-background"
                    onClick={() => {
                      setActive(a);
                      setOpen(true);
                    }}
                  >
                    Read
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recommended</p>
                  <p className="mt-2 text-lg font-bold text-foreground">Try a calculator</p>
                  <p className="mt-1 text-sm text-muted-foreground">Learn by adjusting numbers in real time.</p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <Button asChild className="mt-6 w-full bg-gradient-primary shadow-elevated hover:opacity-95">
                <Link to="/calculators">
                  Open calculators
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Need help?</p>
              <p className="mt-2 text-lg font-bold text-foreground">Ask the AI assistant</p>
              <p className="mt-1 text-sm text-muted-foreground">Get plain-English answers about SIPs, goals, and progress tracking.</p>
              <Button asChild variant="outline" className="mt-6 w-full bg-background">
                <Link to="/ai-assistant">
                  Ask assistant
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div id="videos" className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Videos</p>
          <p className="mt-2 text-lg font-bold text-foreground">Short explanations (coming soon)</p>
          <p className="mt-1 text-sm text-muted-foreground">This section is wired for future video embeds and quick lessons.</p>
          <Button asChild variant="outline" className="mt-6 bg-background">
            <Link to="/learn#sip">
              Start with SIP 101
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div id="blog" className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Blog</p>
          <p className="mt-2 text-lg font-bold text-foreground">New: calm investing notes</p>
          <p className="mt-1 text-sm text-muted-foreground">Weekly, actionable insights. No hype.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3" data-stagger="cards">
            {articles.slice(0, 3).map((a) => (
              <button
                key={a.id}
                type="button"
                data-card
                onClick={() => {
                  setActive(a);
                  setOpen(true);
                }}
                className="rounded-2xl border border-border/60 bg-background/30 p-5 text-left shadow-card transition-colors hover:border-primary/30"
              >
                <div className="inline-flex rounded-full border border-border/60 bg-background/30 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  {a.tag}
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{a.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{active?.title ?? "Article"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm text-muted-foreground">
            {(active?.content ?? []).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button asChild className="bg-gradient-primary shadow-elevated hover:opacity-95">
              <Link to="/goal-planner">
                Open goal planner
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-background">
              <Link to="/sip-calculator">
                Try SIP calculator
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </FeaturePageScaffold>
  );
};

export default LearnPage;
