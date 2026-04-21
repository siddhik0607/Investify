import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">How it works</a>
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
          <Button size="sm" className="bg-gradient-primary shadow-elevated hover:opacity-95">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
};
