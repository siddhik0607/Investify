import { useState } from "react";
import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calcMonthlySIP, formatInr } from "@/lib/finance";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    text: "Hi! I can answer questions about goals, SIP amounts, risk quiz, progress tracking, calculators, and other Investify features.",
  },
];

const quickQuestions = [
  "How much SIP do I need for a car in 3 years?",
  "What does the risk profile quiz do?",
  "How can I track my goal progress?",
  "What is the smart SIP calculator?",
];

const buildReply = (question: string) => {
  const text = question.toLowerCase();

  if (text.includes("car") && text.includes("3 year")) {
    return `For a car goal of ${formatInr(800000)} in 3 years, a rough monthly SIP is ${formatInr(
      calcMonthlySIP(800000, 3, 12),
    )} assuming 12% annual returns.`;
  }

  if (text.includes("risk")) {
    return "The Risk Profile Quiz asks simple questions about your timeline, reactions to market drops, and growth preference to classify you as conservative, balanced, or growth-focused.";
  }

  if (text.includes("progress") || text.includes("track")) {
    return "Use the Track Your Progress page to monitor goal completion, SIP paid, total invested, current value, and your weekly streak.";
  }

  if (text.includes("calculator") || text.includes("sip")) {
    return "The Smart SIP Calculator uses your target amount, expected return, and time horizon to estimate the monthly SIP needed to reach your goal.";
  }

  if (text.includes("goal")) {
    return "You can start from Smart Goal Setup, choose a popular goal or create your own, then move to Start Planning for a detailed SIP plan.";
  }

  return "I can help with Investify features like smart goal setup, SIP calculator, track progress, helpful nudges, risk quiz, and growth visualization. Try asking about any of these.";
};

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [value, setValue] = useState("");

  const askQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: buildReply(trimmed) },
    ]);
    setValue("");
  };

  return (
    <FeaturePageScaffold
      badge="AI Assistant"
      title="Ask the website assistant questions related to Investify."
      description="This assistant now works on its own page and responds to questions related to planning goals, SIP estimates, calculators, risk quiz, progress tracking, and other site features."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-border bg-background p-6">
          <p className="text-lg font-semibold">Quick Questions</p>
          <div className="mt-5 grid gap-3">
            {quickQuestions.map((question) => (
              <Button
                key={question}
                type="button"
                variant="outline"
                className="h-auto justify-start whitespace-normal px-4 py-4 text-left text-sm"
                onClick={() => askQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6">
          <p className="text-lg font-semibold">Assistant Chat</p>
          <div className="mt-5 space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : "ml-auto bg-muted text-foreground"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask about goals, SIP, calculator, risk quiz, tracking..."
              className="h-12 bg-card"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  askQuestion(value);
                }
              }}
            />
            <Button className="h-12 bg-gradient-primary px-6 hover:opacity-95" onClick={() => askQuestion(value)}>
              Ask
            </Button>
          </div>
        </div>
      </div>
    </FeaturePageScaffold>
  );
};

export default AIAssistantPage;
