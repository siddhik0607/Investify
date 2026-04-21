import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Phone, Lock, ShieldCheck } from "lucide-react";

type Mode = "email" | "phone";

const SignIn = () => {
  const [mode, setMode] = useState<Mode>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (real auth wires up when Lovable Cloud is enabled)
    if (mode === "email" && !/^\S+@\S+\.\S+$/.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (mode === "phone" && !/^\+?\d{10,13}$/.test(phone.replace(/\s/g, ""))) {
      toast({ title: "Invalid mobile number", description: "Enter a valid 10–13 digit number.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back 👋", description: "Signed in successfully." });
    navigate("/new-goal");
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container flex min-h-screen flex-col px-4 py-6">
        <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center">
              <Logo />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h1 className="text-2xl font-bold tracking-tight">Sign in to SIPlan</h1>
              <p className="mt-1 text-sm text-muted-foreground">Pick up your goals where you left off.</p>

              {/* Mode toggle */}
              <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setMode("email")}
                  className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                    mode === "email" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <Mail className="h-4 w-4" /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setMode("phone")}
                  className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                    mode === "phone" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <Phone className="h-4 w-4" /> Mobile
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {mode === "email" ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" className="text-xs font-medium text-primary hover:underline">
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary shadow-elevated hover:opacity-95">
                  Sign in
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                New to SIPlan?{" "}
                <Link to="/signin" className="font-medium text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
              Protected by bank-grade security
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
