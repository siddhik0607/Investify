import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";

const questions = [
  {
    id: "timeline",
    label: "How long do you plan to stay invested?",
    options: [
      { label: "Less than 3 years", score: 1 },
      { label: "3 to 5 years", score: 2 },
      { label: "More than 5 years", score: 3 },
    ],
  },
  {
    id: "reaction",
    label: "If your portfolio drops 10%, what would you do?",
    options: [
      { label: "Exit quickly", score: 1 },
      { label: "Wait and watch", score: 2 },
      { label: "Invest more", score: 3 },
    ],
  },
  {
    id: "priority",
    label: "What matters more to you?",
    options: [
      { label: "Capital safety", score: 1 },
      { label: "Balanced growth", score: 2 },
      { label: "Higher long-term growth", score: 3 },
    ],
  },
];

const RiskProfileQuizPage = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, value) => sum + value, 0),
    [answers],
  );

  const result = totalScore <= 4 ? "Conservative" : totalScore <= 7 ? "Balanced" : "Growth-focused";
  const advice =
    result === "Conservative"
      ? "Start with stable, lower-volatility funds and keep your SIP amount comfortable."
      : result === "Balanced"
        ? "A diversified SIP mix can help you balance returns and stability."
        : "A long-term growth strategy may suit you if you are comfortable with market swings.";

  return (
    <FeaturePageScaffold
      badge="Risk Profile Quiz"
      title="Answer a few simple investment questions and generate your risk profile."
      description="This working quiz helps users understand whether they are conservative, balanced, or growth-focused before choosing a SIP strategy."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="rounded-2xl border border-border bg-background p-6">
              <p className="text-base font-semibold">{question.label}</p>
              <div className="mt-4 grid gap-3">
                {question.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.score }))}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      answers[question.id] === option.score
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Your Result</p>
          <div className="mt-5 flex h-28 items-center justify-center rounded-3xl bg-gradient-soft">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-3xl">?</div>
          </div>
          <p className="mt-6 text-3xl font-bold text-foreground">{result}</p>
          <p className="mt-3 text-sm text-muted-foreground">{advice}</p>
          <div className="mt-6 rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">Current score</p>
            <p className="mt-2 text-2xl font-bold text-primary">{totalScore} / 9</p>
          </div>
          <Button className="mt-6 w-full bg-gradient-primary hover:opacity-95">Save My Risk Profile</Button>
        </section>
      </div>
    </FeaturePageScaffold>
  );
};

export default RiskProfileQuizPage;
