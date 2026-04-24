import { Button } from "@/components/ui/button";
import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { formatInr } from "@/lib/finance";

const scenarios = [
  {
    label: "Increase SIP by 10%",
    sip: formatInr(13695),
    corpus: formatInr(1740000),
    impact: "You may reach the goal around 8 months earlier.",
  },
  {
    label: "Change return to 13%",
    sip: formatInr(11780),
    corpus: formatInr(1635000),
    impact: "A higher expected return can reduce monthly pressure.",
  },
  {
    label: "Delay goal by 1 year",
    sip: formatInr(10320),
    corpus: formatInr(1500000),
    impact: "Extra time helps the plan rely more on compounding.",
  },
];

const ScenarioSimulatorPage = () => (
  <FeaturePageScaffold
    badge="Scenario Simulator"
    title="Compare different SIP scenarios and see the impact clearly."
    description="This page lets users test changes like increasing SIP, adjusting returns, or extending the goal timeline while staying inside the same site theme."
  >
    <div className="grid gap-5">
      {scenarios.map((scenario) => (
        <div key={scenario.label} className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{scenario.label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{scenario.impact}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
              <Metric label="New SIP" value={scenario.sip} />
              <Metric label="Estimated Corpus" value={scenario.corpus} />
            </div>
          </div>
        </div>
      ))}
      <Button className="h-12 bg-gradient-primary text-base hover:opacity-95">Save Preferred Scenario</Button>
    </div>
  </FeaturePageScaffold>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-border bg-card px-4 py-3">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
  </div>
);

export default ScenarioSimulatorPage;
