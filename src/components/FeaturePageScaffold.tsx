import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { motion } from "framer-motion";

export const FeaturePageScaffold = ({
  badge,
  title,
  description,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen">
    <header className="border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </header>

    <main className="container px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="mx-auto max-w-6xl rounded-3xl border border-border/60 bg-background/30 p-8 shadow-elevated backdrop-blur-xl lg:p-10"
      >
        <div className="inline-flex rounded-full border border-border/60 bg-background/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-xl">
          {badge}
        </div>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">{description}</p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8"
        >
          {children}
        </motion.div>
      </motion.div>
    </main>
  </div>
);
