import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Progress } from "@/components/ui/progress";

const days = [
  { label: "Sunday", value: 90 },
  { label: "Monday", value: 100 },
  { label: "Tuesday", value: 86 },
  { label: "Wednesday", value: 100 },
  { label: "Thursday", value: 74 },
  { label: "Friday", value: 100 },
  { label: "Saturday", value: 92 },
];

const milestones = [
  { label: "25% Completed", value: 100 },
  { label: "50% Completed", value: 58 },
  { label: "75% Completed", value: 24 },
  { label: "Goal Achieved", value: 0 },
];

const StreakMilestonesPage = () => (
  <FeaturePageScaffold
    badge="Streak & Milestones"
    title="Track streaks from Sunday to Saturday and see how each milestone is progressing."
    description="This page shows consistency and milestone progress in a wider, clearer layout using the same Investify colors and font system."
  >
    <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      <div className="rounded-2xl border border-border bg-background p-6">
        <p className="text-lg font-semibold">Weekly Streak</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {days.map((day) => (
            <div key={day.label} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">{day.label}</p>
              <p className="mt-3 text-3xl font-bold text-primary">{day.value}%</p>
              <Progress value={day.value} className="mt-4 h-2.5" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-6">
        <p className="text-lg font-semibold">Milestone Status</p>
        <div className="mt-5 space-y-4">
          {milestones.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <span className="text-sm font-semibold text-secondary">{item.value}%</span>
              </div>
              <Progress value={item.value} className="mt-3 h-2.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </FeaturePageScaffold>
);

export default StreakMilestonesPage;
