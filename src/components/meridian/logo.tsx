import { cn } from "@/lib/utils";

export function CompassMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("text-accent", className)} aria-hidden>
      <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 5.5 L18.2 16 L16 26.5 L13.8 16 Z" fill="currentColor" />
      <path d="M5.5 16 L16 13.8 L26.5 16 L16 18.2 Z" fill="currentColor" opacity="0.38" />
      <circle cx="16" cy="16" r="2.1" className="fill-bg" />
      <circle cx="16" cy="16" r="1.05" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <CompassMark className="size-8 shrink-0" />
      <div className={cn("leading-none", compact && "hidden sm:block")}>
        <div className="font-display text-xl italic tracking-tight text-fg">Meridian</div>
        <div className="mt-0.5 text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
          World atlas
        </div>
      </div>
    </div>
  );
}
