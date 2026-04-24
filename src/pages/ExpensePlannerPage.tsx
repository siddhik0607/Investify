import { Button } from "@/components/ui/button";
import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Textarea } from "@/components/ui/textarea";

const ExpensePlannerPage = () => (
  <FeaturePageScaffold
    badge="Expense Planner"
    title="Add your monthly expenses and get better SIP advice."
    description="This page helps users think about living costs before finalizing a monthly investment amount."
  >
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-2xl border border-border bg-background p-6">
        <p className="text-lg font-semibold">Monthly Expense Snapshot</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ExpenseRow label="Rent / Home" value="₹18,000" />
          <ExpenseRow label="Food & Groceries" value="₹9,500" />
          <ExpenseRow label="Transport" value="₹4,500" />
          <ExpenseRow label="Utilities" value="₹3,000" />
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium">Notes</p>
          <Textarea className="mt-2 min-h-[120px]" placeholder="Add any monthly expenses or lifestyle notes here..." />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Suggested SIP Advice</p>
        <p className="mt-4 text-sm text-muted-foreground">
          After covering monthly expenses, Investify recommends keeping your SIP within a safe range so your goals stay practical.
        </p>
        <div className="mt-5 space-y-3">
          <ExpenseRow label="Income" value="₹80,000" />
          <ExpenseRow label="Expenses" value="₹35,000" />
          <ExpenseRow label="Comfortable SIP Range" value="₹10,000 - ₹14,000" />
        </div>
        <Button className="mt-6 w-full bg-gradient-primary hover:opacity-95">Save Expense Plan</Button>
      </div>
    </div>
  </FeaturePageScaffold>
);

const ExpenseRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold text-foreground">{value}</span>
  </div>
);

export default ExpensePlannerPage;
