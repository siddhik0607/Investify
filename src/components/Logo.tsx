import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="relative flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-primary shadow-elevated">
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-primary-foreground">
        <path d="M3 17l5-5 4 4 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 7h6v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <span className="text-base font-bold tracking-tight">Investify</span>
  </div>
);
