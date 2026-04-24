import { Button } from "@/components/ui/button";
import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";

const reminders = [
  { title: "SIP Due Reminder", detail: "2 days before each SIP date" },
  { title: "Goal Review Reminder", detail: "Every first Sunday of the month" },
  { title: "Annual SIP Step-Up", detail: "Once every 12 months" },
];

const RemindersPage = () => (
  <FeaturePageScaffold
    badge="Reminders"
    title="Set timely reminders so you never miss a SIP."
    description="This page keeps users updated on payments, plan reviews, and annual SIP step-ups using the same visual theme as the rest of the site."
  >
    <div className="grid gap-4 lg:grid-cols-3">
      {reminders.map((item) => (
        <div key={item.title} className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{item.detail}</p>
          <Button className="mt-5 w-full bg-gradient-primary hover:opacity-95">Enable</Button>
        </div>
      ))}
    </div>
  </FeaturePageScaffold>
);

export default RemindersPage;
