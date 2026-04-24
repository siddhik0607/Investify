import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { buildGrowthSeries, formatInr } from "@/lib/finance";
import { Link } from "react-router-dom";

const week = [
  { day: "Sunday", percent: 90 },
  { day: "Monday", percent: 100 },
  { day: "Tuesday", percent: 85 },
  { day: "Wednesday", percent: 100 },
  { day: "Thursday", percent: 78 },
  { day: "Friday", percent: 100 },
  { day: "Saturday", percent: 95 },
];

const TrackProgressPage = () => {
  const target = 1500000;
  const invested = 261450;
  const currentValue = 292000;
  const sipPaid = 12450;
  const series = buildGrowthSeries(12450, 5, 12);
  const percent = Math.round((currentValue / target) * 100);

  return (
    <FeaturePageScaffold
      badge="Track Progress"
      title="Track your goal progress with SIP paid, invested amount, current value, streaks, and milestones."
      description="This page keeps the same website colors and fonts while giving users a clear progress summary for their active SIP goal."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Goal Progress</p>
                <h2 className="mt-2 text-2xl font-semibold">Dream Home Goal</h2>
              </div>
              <span className="rounded-full bg-secondary-soft px-3 py-1 text-sm font-semibold text-secondary">{percent}% Completed</span>
            </div>
            <div className="mt-5">
              <Progress value={percent} className="h-3" />
              <p className="mt-3 text-sm text-muted-foreground">{formatInr(currentValue)} of {formatInr(target)}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="SIP Paid" value={formatInr(sipPaid)} />
            <MetricCard label="Total Invested" value={formatInr(invested)} />
            <MetricCard label="Current Value" value={formatInr(currentValue)} accent />
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Progress Over Time</p>
            <div className="mt-5 space-y-4">
              {series.map((item) => (
                <div key={item.year}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">Year {item.year}</span>
                    <span className="text-muted-foreground">{formatInr(item.value)}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-growth" style={{ width: `${Math.min(100, (item.value / target) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Streak: Sunday to Saturday</p>
            <div className="mt-5 grid grid-cols-7 gap-2">
              {week.map((item) => (
                <div key={item.day} className="text-center">
                  <div className="text-[11px] font-semibold text-muted-foreground">{item.day.slice(0, 1)}</div>
                  <div className={`mt-2 rounded-full px-2 py-2 text-[11px] font-bold ${item.percent >= 90 ? "bg-secondary-soft text-secondary" : "bg-primary-soft text-primary"}`}>
                    {item.percent}%
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Consistency this week is helping you stay on track with your SIP goal.</p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Milestones</p>
            <div className="mt-4 space-y-3">
              <Milestone label="25% Completed" complete />
              <Milestone label="50% Completed" />
              <Milestone label="75% Completed" />
              <Milestone label="Goal Achieved" />
            </div>
          </div>

          <Button asChild className="w-full bg-gradient-primary hover:opacity-95">
            <Link to="/new-goal">Update this plan</Link>
          </Button>
        </section>
      </div>
    </FeaturePageScaffold>
  );
};

const MetricCard = ({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) => (
  <div className={`rounded-2xl border p-5 ${accent ? "border-primary/30 bg-primary-soft" : "border-border bg-background"}`}>
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={`mt-3 text-2xl font-bold ${accent ? "text-primary" : "text-foreground"}`}>{value}</p>
  </div>
);

const Milestone = ({ label, complete = false }: { label: string; complete?: boolean }) => (
  <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`text-sm font-semibold ${complete ? "text-secondary" : "text-muted-foreground"}`}>{complete ? "Done" : "Pending"}</span>
  </div>
);

export default TrackProgressPage;
