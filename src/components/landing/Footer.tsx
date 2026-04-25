import { Link } from "react-router-dom";
import { ArrowRight, CircleHelp, Facebook, Instagram, Linkedin, ShieldCheck, Twitter, Youtube, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-background py-12">
    <div className="container px-4">
      <section className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,hsl(226_66%_14%),hsl(231_66%_10%))] p-6 text-white shadow-elevated lg:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-xl font-bold tracking-tight text-white">Investify</p>
            <p className="text-sm leading-relaxed text-white/70 max-w-xs">
              We help you plan, invest, and achieve your dreams with disciplined and smart planning.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:kasabesiddhi@gmail.com">kasabesiddhi@gmail.com</a>
            </div>
            <Button asChild variant="outline" size="sm" className="border-white/20 bg-white/10 text-xs text-white hover:bg-white/15 hover:text-white">
              <Link to="/faqs">Open FAQs Page</Link>
            </Button>
          </div>
          
          <FooterList title="Learn" items={["What is SIP?", "How it Works", "SIP Calculator", "Investment Guide", "Blog"]} />
          <FooterList title="Resources" items={["Calculators", "Market Updates", "Videos", "Glossary", "Help Center"]} />
          <FooterList title="Company" items={["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"]} />
          
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">Stay Updated</p>
            <p className="text-sm text-white/70">Subscribe to our newsletter for tips & updates.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="h-10 border-white/10 bg-white/10 text-sm text-white placeholder:text-white/40 focus:border-primary/50"
              />
              <Button size="icon" className="h-10 w-10 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-3 pt-2">
              <SocialIcon icon={<Facebook className="h-4 w-4" />} />
              <SocialIcon icon={<Instagram className="h-4 w-4" />} />
              <SocialIcon icon={<Twitter className="h-4 w-4" />} />
              <SocialIcon icon={<Linkedin className="h-4 w-4" />} />
              <SocialIcon icon={<Youtube className="h-4 w-4" />} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} Investify. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            <Badge text="Bank-level Security" icon={<ShieldCheck className="h-4 w-4" />} />
            <Badge text="Made in India" icon={<CircleHelp className="h-4 w-4" />} />
          </div>
        </div>
      </section>
    </div>
  </footer>
);

const FooterList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="space-y-4">
    <p className="text-sm font-semibold uppercase tracking-wider text-white/60">{title}</p>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item}>
          <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{item}</a>
        </li>
      ))}
    </ul>
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
