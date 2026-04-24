import { FeaturePageScaffold } from "@/components/FeaturePageScaffold";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/lib/faqs";

const FaqPage = () => (
  <FeaturePageScaffold
    badge="FAQs"
    title="Frequently asked questions about Investify."
    description="All frequently asked questions now live on a separate page so the homepage footer can stay fully horizontal and spacious."
  >
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
      <Accordion type="single" collapsible>
        {faqItems.map((faq, index) => (
          <AccordionItem key={faq.q} value={`faq-${index}`} className="border-border">
            <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-7 text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </FeaturePageScaffold>
);

export default FaqPage;
