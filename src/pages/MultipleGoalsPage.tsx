import { Button } from "@/components/ui/button";
import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Link } from "react-router-dom";

const goals = [
  { title: "Dream Home", target: "₹15,00,000", sip: "₹12,450 / month", status: "On Track" },
  { title: "Family Vacation", target: "₹3,00,000", sip: "₹6,200 / month", status: "Needs Review" },
  { title: "Emergency Fund", target: "₹2,00,000", sip: "₹4,100 / month", status: "On Track" },
];

const MultipleGoalsPage = () => (
  <FeaturePageScaffold
    badge="Multiple Goals"
    title="Track all your goals in one place."
    description="View several planning targets together and jump straight into editing any one of them."
  >
    <div className="grid gap-4">
      {goals.map((goal) => (
        <div key={goal.title} className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{goal.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Target: {goal.target}</p>
              <p className="mt-1 text-sm text-muted-foreground">Recommended SIP: {goal.sip}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${goal.status === "On Track" ? "bg-secondary-soft text-secondary" : "bg-primary-soft text-primary"}`}>
                {goal.status}
              </span>
              <Button asChild variant="outline">
                <Link to="/new-goal">Edit Goal</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </FeaturePageScaffold>
);

export default MultipleGoalsPage;
