import { Link } from "react-router-dom";
import { ArrowRight, CircleHelp, Facebook, Instagram, Linkedin, ShieldCheck, Twitter, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-background py-12">
    <div className="container px-4">
      <section className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,hsl(226_66%_14%),hsl(231_66%_10%))] p-6 text-white shadow-elevated lg:p-8">
        <p className="text-base font-bold tracking-tight">Footer Design</p>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.9fr_0.9fr_0.9fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold">About Investify</p>
            <p className="mt-3 text-xs leading-6 text-white/70">
              We help you plan, invest, and achieve your dreams with disciplined and smart planning.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4 border-white/20 bg-white/10 text-xs text-white hover:bg-white/15 hover:text-white">
              <Link to="/faqs">Open FAQs Page</Link>
            </Button>
          </div>
          <FooterList title="Learn" items={["What is SIP?", "How it Works", "SIP Calculator", "Investment Guide", "Blog"]} />
          <FooterList title="Resources" items={["Calculators", "Market Updates", "Videos", "Glossary", "Help Center"]} />
          <FooterList title="Company" items={["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"]} />
          <div>
            <p className="text-sm font-semibold">Stay Updated</p>
            <p className="mt-3 text-xs text-white/70">Subscribe to our newsletter for tips & updates.</p>
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="Enter your email"
                className="h-9 border-white/10 bg-white/10 text-xs text-white placeholder:text-white/50"
              />
              <Button size="icon" className="h-9 w-9 bg-primary text-primary-foreground hover:opacity-95">
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="mt-5 flex gap-2.5 text-white/75">
              <SocialIcon icon={<Facebook className="h-3.5 w-3.5" />} />
              <SocialIcon icon={<Instagram className="h-3.5 w-3.5" />} />
              <SocialIcon icon={<Twitter className="h-3.5 w-3.5" />} />
              <SocialIcon icon={<Linkedin className="h-3.5 w-3.5" />} />
              <SocialIcon icon={<Youtube className="h-3.5 w-3.5" />} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Investify. All rights reserved.</p>
          <div className="flex flex-wrap gap-2.5">
            <Badge text="Bank-level Security" icon={<ShieldCheck className="h-3.5 w-3.5" />} />
            <Badge text="Made in India" icon={<CircleHelp className="h-3.5 w-3.5" />} />
          </div>
        </div>
      </section>
    </div>
  </footer>
);

const FooterList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <p className="text-sm font-semibold">{title}</p>
    <div className="mt-3 space-y-2.5 text-xs text-white/70">
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10">
    {icon}
  </div>
);

const Badge = ({ text, icon }: { text: string; icon: React.ReactNode }) => (
  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
    {icon}
    {text}
  </div>
);
