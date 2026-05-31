import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, User as UserIcon } from "lucide-react";

export const Navbar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for logged in user
    const name = localStorage.getItem("user_name");
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    setUserName(null);
    navigate("/");
  };

  const goHomeTop = () => {
    if (location.pathname === "/") {
      const lenis = window.__lenis as { scrollTo?: (target: number, opts?: { duration?: number }) => void } | undefined;
      if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 1.0 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        isScrolled
          ? "border-b border-border/60 bg-background/70"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-300 ease-out ${isScrolled ? "h-14" : "h-16"}`}>
        <button type="button" onClick={goHomeTop} className="cursor-pointer">
          <Logo />
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/#how" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">How it works</Link>
          <Link to="/#features" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Features</Link>
          <Link to="/goal-planner" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Goal planner</Link>
          <Link to="/portfolio" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Portfolio</Link>
          <Link to="/calculators" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Calculators</Link>
          <Link to="/ai-insights" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">AI insights</Link>
          <Link to="/pricing" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
          <Link to="/learn" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Learn</Link>
          <Link to="/contact" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          {userName ? (
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="hidden h-8 bg-background sm:inline-flex">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="hidden h-8 bg-background sm:inline-flex">
                <Link to="/profile">Profile</Link>
              </Button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-border/60">
                <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">
                  Hello, {userName}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden h-9 text-xs sm:inline-flex">
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="h-9 px-4 text-xs bg-gradient-primary shadow-elevated hover:opacity-95">
                <Link to="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
