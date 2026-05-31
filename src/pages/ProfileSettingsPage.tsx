import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, Settings, ShieldCheck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfileSettingsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [risk, setRisk] = useState<"conservative" | "balanced" | "growth">("balanced");
  const [nudges, setNudges] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("user_name") || "");
    setEmail(localStorage.getItem("user_email") || "");
  }, []);

  const save = () => {
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);
    localStorage.setItem("risk_profile", risk);
    localStorage.setItem("pref_nudges", String(nudges));
    localStorage.setItem("pref_newsletter", String(newsletter));
  };

  return (
    <FeaturePageScaffold
      badge="Profile"
      title="Profile & settings"
      description="Update your info, set a risk preference, and configure planning nudges — all with the same premium UI."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account</p>
              <p className="mt-2 text-lg font-bold text-foreground">Your information</p>
              <p className="mt-1 text-sm text-muted-foreground">Used to personalize goals and plans across Investify.</p>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <User className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Full name</span>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12 bg-card" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Email</span>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-card" />
            </label>
          </div>

          <Button className="mt-6 w-full bg-gradient-primary shadow-elevated hover:opacity-95" onClick={save}>
            Save settings
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk profile</p>
                <p className="mt-2 text-lg font-bold text-foreground">Preference</p>
                <p className="mt-1 text-sm text-muted-foreground">Helps tailor suggestions and allocation guidance.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>

            <RadioGroup value={risk} onValueChange={(v) => setRisk(v as typeof risk)} className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="conservative" id="risk-conservative" />
                  <Label htmlFor="risk-conservative" className="text-sm font-semibold text-foreground">Conservative</Label>
                </div>
                <span className="text-xs text-muted-foreground">Lower volatility</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="balanced" id="risk-balanced" />
                  <Label htmlFor="risk-balanced" className="text-sm font-semibold text-foreground">Balanced</Label>
                </div>
                <span className="text-xs text-muted-foreground">Moderate</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="growth" id="risk-growth" />
                  <Label htmlFor="risk-growth" className="text-sm font-semibold text-foreground">Growth</Label>
                </div>
                <span className="text-xs text-muted-foreground">Higher returns</span>
              </div>
            </RadioGroup>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferences</p>
                <p className="mt-2 text-lg font-bold text-foreground">Notifications</p>
                <p className="mt-1 text-sm text-muted-foreground">Control reminders and learning nudges.</p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Settings className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Planning nudges</p>
                  <p className="text-xs text-muted-foreground">Helpful suggestions for better SIP consistency.</p>
                </div>
                <Switch checked={nudges} onCheckedChange={setNudges} />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Newsletter</p>
                  <p className="text-xs text-muted-foreground">Monthly investing tips and updates.</p>
                </div>
                <Switch checked={newsletter} onCheckedChange={setNewsletter} />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button className="bg-gradient-primary shadow-elevated hover:opacity-95" onClick={save}>
                Save
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button asChild variant="outline" className="bg-background">
                <Link to="/dashboard">
                  Back to dashboard
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FeaturePageScaffold>
  );
};

export default ProfileSettingsPage;
