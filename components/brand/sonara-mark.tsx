import { cn } from "@/lib/utils";

/**
 * Sonara mark: a source point with two broken concentric arcs, like a sonar
 * sweep. Taken from the Sonara application and recolored; temporary until
 * official brand assets exist.
 */
export function SonaraMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-6 shrink-0 text-lav", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
      <path d="M24 16A8 8 0 1 1 12 9.07" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M27.26 22.5A13 13 0 1 1 16 3"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SonaraWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SonaraMark className="size-7" />
      <span className="font-display text-[1.3rem] font-semibold tracking-[-0.03em] text-ink">Sonara</span>
    </span>
  );
}
