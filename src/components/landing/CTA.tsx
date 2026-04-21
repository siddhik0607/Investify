import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => (
  <section className="py-20 md:py-28">
    <div className="container px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center shadow-elevated sm:p-16">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_70%_80%,white,transparent_40%)]" />
        <div className="relative">
          <h2 className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
            Your first goal is the hardest. Let's start it today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Free to use. No credit card. Built for people who want clarity, not complexity.
          </p>
          <Button size="lg" variant="secondary" className="mt-8 bg-background text-foreground hover:bg-background/90">
            Create your first goal
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </section>
);
