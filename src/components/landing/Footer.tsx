import { Logo } from "@/components/Logo";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-background py-10">
    <div className="container flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
      <Logo />
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} SIPlan. Plan with confidence.
      </p>
    </div>
  </footer>
);
