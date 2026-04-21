const steps = [
  { n: "01", title: "Add your goal", desc: "Name it, set the target amount and when you need it." },
  { n: "02", title: "Get your SIP", desc: "We instantly calculate the monthly investment to reach it." },
  { n: "03", title: "Track & adjust", desc: "Watch progress month by month and tweak as life changes." },
];

export const HowItWorks = () => (
  <section id="how" className="bg-gradient-soft py-20 md:py-28">
    <div className="container px-4">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
        <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">
          Three steps from dream to plan.
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7 shadow-card">
            <div className="absolute -top-4 left-7 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-elevated">
              Step {s.n}
            </div>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="mt-5 hidden h-px w-full bg-gradient-to-r from-primary/40 to-transparent md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
