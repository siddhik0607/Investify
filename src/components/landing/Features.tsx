import { Calculator, LineChart, Target, Bell, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

const features = [
  {
    icon: Target,
    title: "Set real-life goals",
    desc: "Car, home, wedding, sabbatical — define what matters and when you want it.",
    to: "/goals",
  },
  {
    icon: Calculator,
    title: "Smart SIP calculator",
    desc: "We solve the math: exact monthly investment to hit your target on time.",
    to: "/sip-calculator",
  },
  {
    icon: LineChart,
    title: "Visualize growth",
    desc: "Clean charts compare what you invest vs. what your money becomes.",
    to: "/visualize-growth",
  },
  {
    icon: Bell,
    title: "Helpful nudges",
    desc: "Stretch your duration, adjust returns — get plain-English suggestions.",
    to: "/helpful-nudges",
  },
];

export const Features = () => (
  <section id="features" className="border-t border-border/60 bg-background py-20 md:py-28">
    <div className="container px-4">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Why Investify</p>
        <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">
          Everything you need to invest with intent.
        </h2>
        <p className="mt-4 text-muted-foreground">
          No jargon. No noise. Just a clear plan that adapts as your life does.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((f) => (
          <FeatureCard key={f.title} title={f.title} desc={f.desc} to={f.to} icon={<f.icon className="h-5 w-5" />} />
        ))}
      </motion.div>
    </div>
  </section>
);

const FeatureCard = ({
  title,
  desc,
  to,
  icon,
}: {
  title: string;
  desc: string;
  to: string;
  icon: React.ReactNode;
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const rotateX = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.985 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
      }}
    >
      <Link
        ref={ref}
        to={to}
        className="group block rounded-2xl border border-border/60 bg-background/30 shadow-card backdrop-blur-xl transition-colors hover:border-primary/30"
      >
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.55 }}
          onPointerMove={(e) => {
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            rotateX.set(-y * 6);
            rotateY.set(x * 8);
          }}
          onPointerLeave={() => {
            rotateX.set(0);
            rotateY.set(0);
          }}
          className="relative rounded-2xl p-6"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(700px_circle_at_50%_0%,rgba(79,70,229,0.18),transparent_55%)]" />
          <div className="relative">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
              {icon}
            </div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Open page
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};
