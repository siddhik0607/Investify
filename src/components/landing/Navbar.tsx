import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#how" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">How it works</a>
          <a href="#features" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <Link to="/faqs" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden h-9 text-xs sm:inline-flex">
            <Link to="/signin">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="h-9 px-4 text-xs bg-gradient-primary shadow-elevated hover:opacity-95">
            <Link to="/signin">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
