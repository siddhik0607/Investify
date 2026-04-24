import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";

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
  <div className="min-h-screen bg-gradient-soft">
    <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </header>

    <main className="container px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card p-8 shadow-elevated lg:p-10">
        <div className="inline-flex rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {badge}
        </div>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  </div>
);
