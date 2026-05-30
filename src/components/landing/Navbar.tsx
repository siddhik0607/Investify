import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, Moon, Sun, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check for logged in user
    const name = localStorage.getItem("user_name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    setUserName(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#how" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">How it works</a>
          <a href="#features" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <Link to="/faqs" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                Theme
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/60" />
              <DropdownMenuRadioGroup value={theme ?? "dark"} onValueChange={(v) => setTheme(v)}>
                <DropdownMenuRadioItem value="dark">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="light">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator className="bg-border/60" />
              <DropdownMenuItem onClick={() => setTheme("dark")}>Reset to dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {userName ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-border/60 backdrop-blur-xl">
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
                <Link to="/signin">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
