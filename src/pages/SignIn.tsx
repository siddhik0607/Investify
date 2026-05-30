import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Login } from "@/components/auth/Login";
import { SignUp } from "@/components/auth/SignUp";
import { motion } from "framer-motion";

const SignIn = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  return (
    <div data-scroll="section" className="min-h-screen">
      <header className="border-b border-white/10 bg-background/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container px-4 py-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          data-scroll="inner"
          className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-elevated backdrop-blur-xl md:p-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
            <Sparkles className="h-3.5 w-3.5 text-violet-200" />
            {authMode === "signin" ? "Secure Login" : "Join Investify"}
          </div>
          <div className="mt-6">
            <h1 className="text-balance text-4xl font-bold sm:text-5xl">
              {authMode === "signin" ? "Sign in to continue planning." : "Create your planning profile."}
            </h1>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
            <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setAuthMode("signin")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  authMode === "signin" ? "bg-gradient-primary text-primary-foreground shadow-elevated" : "text-white/60 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  authMode === "signup" ? "bg-gradient-primary text-primary-foreground shadow-elevated" : "text-white/60 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {authMode === "signin" ? <Login /> : <SignUp />}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SignIn;
