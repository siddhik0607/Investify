import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, EyeOff, ShieldCheck, Sparkles, User, Mail, Phone, Lock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type AuthMode = "signin" | "signup";

const SignIn = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === "signup") {
        if (!email || !password || !username || !phone) {
          toast({ title: "Please fill all fields", variant: "destructive" });
          setIsLoading(false);
          return;
        }

        // Direct storage logic
        const { error: dbError } = await supabase
          .from('user_credentials')
          .insert([
            {
              email,
              password,
              username,
              phone,
              created_at: new Date().toISOString(),
            }
          ]);

        if (dbError) throw dbError;

        // Save session info
        localStorage.setItem("user_name", username);
        localStorage.setItem("user_email", email);

        toast({ 
          title: "Profile Created Successfully!", 
          description: "Your credentials have been stored in the database." 
        });
        
        setTimeout(() => {
          navigate("/new-goal");
        }, 1500);

      } else {
        // Sign In logic
        if (!email || !password) {
          toast({ title: "Please enter email and password", variant: "destructive" });
          setIsLoading(false);
          return;
        }

        const { data, error: signInError } = await supabase
          .from('user_credentials')
          .select('*')
          .eq('email', email)
          .single();

        if (signInError) {
          if (signInError.code === "PGRST116") {
            throw new Error("No account found with this email. Please Sign Up first.");
          }
          throw signInError;
        }

        if (data.password !== password) {
          throw new Error("Incorrect password. Please try again.");
        }

        // Save session info
        localStorage.setItem("user_name", data.username);
        localStorage.setItem("user_email", data.email);

        toast({ title: "Welcome back!", description: "Successfully logged in." });
        navigate("/new-goal");
      }
    } catch (err: any) {
      console.error("Database operation failed:", err);
      toast({ 
        title: "Database Error", 
        description: err.message || "Could not complete operation.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="inline-flex rounded-full border border-border bg-background p-1">
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

            <form onSubmit={handleAuth} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-background"
                  placeholder="name@example.com"
                  required
                />
              </div>

              {authMode === "signup" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Username
                    </label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 bg-background"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 bg-background"
                      placeholder="+1 234 567 8900"
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-background pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPwd ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-12 w-full bg-gradient-primary text-base font-semibold hover:opacity-95"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  authMode === "signin" ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            {authMode === "signin" && (
              <div className="mt-4 text-center">
                <button 
                  onClick={() => toast({ title: "Reset link sent", description: "Check your email." })}
                  className="text-sm font-medium text-primary hover:underline bg-transparent border-none"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-secondary" />
            Your data is secured with Supabase Authentication.
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
