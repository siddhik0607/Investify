import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const CTA = () => (
  <section data-scroll="section" className="relative overflow-hidden py-20 md:py-28">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div data-depth="bg" className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div data-depth="fg" className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_80%_70%,rgba(255,255,255,0.08),transparent_60%)]" />
    </div>
    <div data-scroll="inner" className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center shadow-elevated sm:p-16"
      >
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_70%_80%,white,transparent_40%)]" />
        <div className="relative">
          <h2 className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
            Your first goal is the hardest. Let's start it today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Free to use. No credit card. Built for people who want clarity, not complexity.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 bg-background text-foreground hover:bg-background/90">
            <Link to="/new-goal">
              Create your first goal
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);
