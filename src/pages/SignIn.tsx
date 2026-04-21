import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, EyeOff, Info, QrCode, Play, ShieldCheck, Zap } from "lucide-react";

type Mode = "userid" | "mobile";

const SignIn = () => {
  const [mode, setMode] = useState<Mode>("userid");
  const [userId, setUserId] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "userid" && !userId.trim()) {
      toast({ title: "Enter your User ID", variant: "destructive" });
      return;
    }
    if (mode === "mobile" && !/^\+?\d{10,13}$/.test(mobile.replace(/\s/g, ""))) {
      toast({ title: "Enter a valid mobile number", variant: "destructive" });
      return;
    }
    if (password.length < 4) {
      toast({ title: "Enter your password / PIN", variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back 👋", description: "Signed in successfully." });
    navigate("/new-goal");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </header>

      <main className="container px-4 py-8 lg:py-14">
        <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card shadow-card">
          <div className="grid gap-0 md:grid-cols-[1fr_auto_1fr]">
            {/* LEFT: QR login */}
            <section className="relative p-8 md:p-10">
              <a
                href="#"
                className="absolute right-6 top-6 inline-flex items-center gap-1 text-sm font-medium text-brand-orange"
              >
                <Play className="h-3.5 w-3.5 fill-current" /> Demo Video
              </a>

              <h2 className="text-2xl font-semibold text-foreground/90">Quick &amp; Easy login using QR</h2>
              <p className="mt-1 text-sm text-muted-foreground">Hassle free login without User ID, Password &amp; OTP</p>

              <div className="mt-8 flex flex-col items-center">
                {/* QR Code mock */}
                <div className="relative h-44 w-44 rounded-md bg-muted/60 p-2">
                  <QRMock />
                </div>

                <h3 className="mt-6 text-xl font-semibold">Quick &amp; Easy login using QR</h3>
                <p className="mt-1 text-center text-sm text-muted-foreground">
                  Hassle free login without User ID, Password &amp; OTP
                </p>

                <button className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-brand-orange">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
                    <QrCode className="h-5 w-5" />
                  </span>
                  Click to generate QR Code
                </button>

                <p className="mt-4 text-xs text-muted-foreground">00:1 Secs</p>

                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-brand-orange" />
                  <div className="text-center">
                    <div>Scan the QR code</div>
                    <div>Investment App → Menu → Web Login</div>
                  </div>
                </div>
              </div>
            </section>

            {/* OR divider */}
            <div className="relative hidden md:flex md:items-center md:justify-center">
              <div className="absolute inset-y-8 w-px bg-border" />
              <span className="relative z-10 bg-card px-2 text-base font-medium text-foreground">OR</span>
            </div>
            <div className="flex items-center justify-center py-2 md:hidden">
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">OR</span>
            </div>

            {/* RIGHT: Credentials */}
            <section className="p-8 md:p-10">
              {/* Toggle */}
              <div className="inline-flex overflow-hidden rounded-md border border-brand-orange">
                <button
                  type="button"
                  onClick={() => setMode("userid")}
                  className={`px-6 py-2 text-sm font-semibold transition-colors ${
                    mode === "userid" ? "bg-brand-orange text-white" : "bg-transparent text-foreground"
                  }`}
                >
                  User ID
                </button>
                <button
                  type="button"
                  onClick={() => setMode("mobile")}
                  className={`px-6 py-2 text-sm font-semibold transition-colors ${
                    mode === "mobile" ? "bg-brand-orange text-white" : "bg-transparent text-foreground"
                  }`}
                >
                  Mobile No
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {mode === "userid" ? (
                  <div className="space-y-1.5">
                    <label className="text-sm text-foreground/80">User ID</label>
                    <Input
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="h-11 border-brand-orange focus-visible:ring-0"
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-sm text-foreground/80">Mobile No</label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="h-11 border-brand-orange focus-visible:ring-0"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="flex items-center gap-1 text-sm text-foreground/80">
                    Password / PIN <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </label>
                  <div className="relative">
                    <Input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10 focus-visible:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded accent-[hsl(var(--brand-orange))]"
                  />
                  Remember Me
                </label>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-md bg-brand-orange text-base font-semibold text-white hover:opacity-95"
                >
                  Login
                </Button>

                <div className="pt-2 text-center">
                  <a href="#" className="text-sm font-medium text-brand-orange hover:underline">
                    Trouble Logging-in?
                  </a>
                </div>
              </form>
            </section>
          </div>

          {/* Bottom row */}
          <div className="border-t border-border px-6 py-4 text-center text-sm">
            Don't have an Account?{" "}
            <Link to="/signin" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <ShieldCheck className="mr-1 inline h-3.5 w-3.5 text-secondary" />
          Best viewed in modern browsers at 1024 x 768 resolution.
        </p>
      </main>
    </div>
  );
};

/** Decorative QR code mock built from a deterministic grid */
const QRMock = () => {
  const cells: boolean[] = [];
  for (let i = 0; i < 21 * 21; i++) {
    // deterministic pseudo-pattern
    cells.push(((i * 73 + (i % 21) * 13) % 7) < 3);
  }
  return (
    <div className="grid h-full w-full grid-cols-[repeat(21,1fr)] gap-[1px] bg-muted/40">
      {cells.map((on, i) => (
        <div key={i} className={on ? "bg-foreground/80" : "bg-transparent"} />
      ))}
      {/* Three corner anchors */}
      <CornerAnchor className="left-1 top-1" />
      <CornerAnchor className="right-1 top-1" />
      <CornerAnchor className="bottom-1 left-1" />
    </div>
  );
};

const CornerAnchor = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute h-8 w-8 rounded-sm border-[3px] border-foreground bg-background ${className}`}>
    <div className="absolute inset-1.5 bg-foreground" />
  </div>
);

export default SignIn;
