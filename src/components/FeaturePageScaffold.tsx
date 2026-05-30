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
  <div className="min-h-screen">
    <header className="border-b border-white/10 bg-background/50 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </header>

    <main className="container px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-elevated backdrop-blur-xl lg:p-10">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
          {badge}
        </div>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base text-white/75 sm:text-lg">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  </div>
);
