import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  GraduationCap,
  Home,
  Plane,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const featuredGoals = [
  {
    title: "Dream Home",
    timeline: "6-10 years",
    target: "₹35L - ₹75L",
    icon: Home,
    blurb: "Plan the down payment with a steady SIP and see how each month builds toward your keys.",
  },
  {
    title: "Next Car",
    timeline: "2-4 years",
    target: "₹8L - ₹18L",
    icon: Car,
    blurb: "Save for a family car or your first upgrade without breaking your monthly budget.",
  },
  {
    title: "Higher Studies",
    timeline: "4-8 years",
    target: "₹12L - ₹30L",
    icon: GraduationCap,
    blurb: "Create a study fund that grows over time and keeps education goals realistic.",
  },
  {
    title: "Family Vacation",
    timeline: "1-3 years",
    target: "₹2L - ₹8L",
    icon: Plane,
    blurb: "Turn a dream trip into a simple monthly plan with a target date you can stick to.",
  },
];

const GoalsPage = () => {
  return (
    <div data-scroll="section" className="min-h-screen">
      <header className="border-b border-white/10 bg-background/50">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container px-4 py-12 md:py-16">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          data-scroll="inner"
          className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-elevated lg:grid-cols-[1.1fr_0.9fr] lg:p-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-violet-200" />
              Featured Goal Ideas
            </div>
            <h1 className="mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Set real-life goals with pages that feel like your website.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
              Explore planning-focused goal ideas, compare timelines, and jump into a matching SIP plan without leaving the same clean Investify theme.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-elevated hover:opacity-95">
                <Link to="/new-goal">
                  Start your own plan
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/sip-calculator">Open SIP calculator</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Planning Ads</p>
            <div className="mt-6 grid gap-4">
              {featuredGoals.slice(0, 2).map((goal) => (
                <div key={goal.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-emerald-200 border border-white/10">
                      <goal.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                      {goal.timeline}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold">{goal.title}</h2>
                  <p className="mt-2 text-sm text-white/70">{goal.blurb}</p>
                  <p className="mt-3 text-sm font-semibold text-white">{goal.target}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {featuredGoals.map((goal) => (
            <article key={goal.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-violet-200">
                <goal.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{goal.title}</h2>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">{goal.timeline}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{goal.blurb}</p>
              <p className="mt-4 text-sm font-semibold text-white">{goal.target}</p>
              <Button asChild className="mt-6 w-full bg-gradient-primary hover:opacity-95">
                <Link to="/new-goal">
                  Plan this goal
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </motion.section>
      </main>
    </div>
  );
};

export default GoalsPage;
