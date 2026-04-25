import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Login } from "@/components/auth/Login";
import { SignUp } from "@/components/auth/SignUp";

const SignIn = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  return (
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

      <main className="container px-4 py-10 lg:py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-elevated md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {authMode === "signin" ? "Secure Login" : "Join Investify"}
          </div>
          <div className="mt-6">
            <h1 className="text-balance text-4xl font-bold sm:text-5xl">
              {authMode === "signin" ? "Sign in to continue planning." : "Create your planning profile."}
            </h1>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-background p-6">
            <div className="mb-8 inline-flex rounded-full border border-border bg-background p-1">
              <button
                type="button"
                onClick={() => setAuthMode("signin")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  authMode === "signin" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  authMode === "signup" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            {authMode === "signin" ? <Login /> : <SignUp />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
