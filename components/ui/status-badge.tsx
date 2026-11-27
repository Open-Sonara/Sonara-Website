import type { FeatureProgress, FeatureStatus } from "@/config/features";
import { statusLabel } from "@/config/features";
import { cn } from "@/lib/utils";

/**
 * The one status vocabulary used everywhere on the site. Each status has its
 * own drawn mark so it reads without relying on color.
 */

type Tone = "available" | "built" | "progress" | "planned" | "preview" | "experimental";

function toneFor(status: FeatureStatus, progress?: FeatureProgress): Tone {
  if (status === "in-development") return progress === "built" ? "built" : "progress";
  return status;
}

const toneClass: Record<Tone, string> = {
  available: "border-lav/50 bg-lav/15 text-lav-bright",
  built: "border-lav/35 bg-lav/10 text-lav-bright",
  progress: "border-lav/25 bg-transparent text-lav-bright",
  planned: "border-line-strong bg-transparent text-ink-2",
  preview: "border-lav/35 bg-lav-deep/20 text-lav-bright",
  experimental: "border-line-strong border-dashed bg-transparent text-ink-2",
};

export function StatusMark({ tone, className }: { tone: Tone; className?: string }) {
  const cls = cn("size-3 shrink-0", className);
  switch (tone) {
    case "available":
      return (
        <svg viewBox="0 0 12 12" className={cls} aria-hidden="true">
          <circle cx="6" cy="6" r="6" fill="currentColor" />
          <path d="M3.4 6.2 5.2 8l3.4-3.8" fill="none" stroke="var(--color-ground)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "built":
      return (
        <svg viewBox="0 0 12 12" className={cls} aria-hidden="true">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="2.6" fill="currentColor" />
        </svg>
      );
    case "progress":
      return (
        <svg viewBox="0 0 12 12" className={cls} aria-hidden="true">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 1a5 5 0 0 1 0 10Z" fill="currentColor" />
        </svg>
      );
    case "preview":
    case "experimental":
      return (
        <svg viewBox="0 0 12 12" className={cls} aria-hidden="true">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 1.6" />
        </svg>
      );
    case "planned":
      return (
        <svg viewBox="0 0 12 12" className={cls} aria-hidden="true">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

export function StatusBadge({
  status,
  progress,
  className,
  size = "sm",
}: {
  status: FeatureStatus;
  progress?: FeatureProgress;
  className?: string;
  size?: "sm" | "xs";
}) {
  const tone = toneFor(status, progress);
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border font-medium whitespace-nowrap",
        size === "sm" ? "h-7 px-2.5 text-[0.8125rem]" : "h-6 px-2 text-xs",
        toneClass[tone],
        className,
      )}
    >
      <StatusMark tone={tone} />
      {statusLabel(status, progress)}
    </span>
  );
}

/** Legend explaining the status marks; shown wherever statuses are listed. */
export function StatusLegend({ className }: { className?: string }) {
  const items: Array<{ status: FeatureStatus; progress?: FeatureProgress; text: string }> = [
    { status: "in-development", progress: "built", text: "Implemented and tested on the main branch, waiting for the first release." },
    { status: "in-development", progress: "partial", text: "Part of it is built, usually the server side." },
    { status: "planned", text: "Intended, not started." },
  ];
  return (
    <dl className={cn("grid gap-3 text-sm text-ink-2 sm:grid-cols-3", className)}>
      {items.map((i) => (
        <div key={statusLabel(i.status, i.progress)} className="flex flex-col items-start gap-2">
          <dt>
            <StatusBadge status={i.status} progress={i.progress} size="xs" />
          </dt>
          <dd className="leading-snug">{i.text}</dd>
        </div>
      ))}
    </dl>
  );
}
