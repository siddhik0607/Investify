import { Button } from "@/components/ui/button";
import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";

const DownloadPlanPage = () => (
  <FeaturePageScaffold
    badge="Download Plan"
    title="Download your financial plan summary."
    description="This page gives users a clean download area for their latest SIP strategy and projected goal outcome."
  >
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
      <div className="rounded-2xl border border-border bg-background p-6">
        <p className="text-lg font-semibold">Plan Summary</p>
        <div className="mt-5 space-y-3">
          <SummaryRow label="Goal" value="Dream Home" />
          <SummaryRow label="Target" value="₹15,00,000" />
          <SummaryRow label="Monthly SIP" value="₹12,450" />
          <SummaryRow label="Time Horizon" value="5 Years" />
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-background p-6">
        <p className="text-lg font-semibold">Download Options</p>
        <p className="mt-3 text-sm text-muted-foreground">Export your latest plan in a simple downloadable format.</p>
        <div className="mt-5 grid gap-3">
          <Button className="bg-gradient-primary hover:opacity-95">Download PDF</Button>
          <Button variant="outline">Email Plan</Button>
        </div>
      </div>
    </div>
  </FeaturePageScaffold>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold text-foreground">{value}</span>
  </div>
);

export default DownloadPlanPage;
