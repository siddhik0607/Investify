import { Calculator, LineChart, Target, Bell } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Set real-life goals",
    desc: "Car, home, wedding, sabbatical — define what matters and when you want it.",
  },
  {
    icon: Calculator,
    title: "Smart SIP calculator",
    desc: "We solve the math: exact monthly investment to hit your target on time.",
  },
  {
    icon: LineChart,
    title: "Visualize growth",
    desc: "Clean charts compare what you invest vs. what your money becomes.",
  },
  {
    icon: Bell,
    title: "Helpful nudges",
    desc: "Stretch your duration, adjust returns — get plain-English suggestions.",
  },
];

export const Features = () => (
  <section id="features" className="border-t border-border/60 bg-background py-20 md:py-28">
    <div className="container px-4">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Why SIPlan</p>
        <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">
          Everything you need to invest with intent.
        </h2>
        <p className="mt-4 text-muted-foreground">
          No jargon. No noise. Just a clear plan that adapts as your life does.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
