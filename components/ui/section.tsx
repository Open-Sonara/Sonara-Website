import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Section heading and lead paragraph. No eyebrow labels: the heading carries itself. */
export function SectionHeading({
  id,
  title,
  lead,
  align = "left",
  className,
  as: As = "h2",
}: {
  id?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <As
        id={id}
        className="text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </As>
      {lead && <p className="mt-5 text-lg leading-relaxed text-ink-2 sm:text-xl sm:leading-relaxed">{lead}</p>}
    </div>
  );
}

/** Small caption under illustrative previews. */
export function DemoCaption({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-3 flex items-center gap-2 text-[0.8125rem] text-ink-3", className)}>
      <span className="inline-block size-1.5 rounded-full bg-lav/70" aria-hidden="true" />
      {children}
    </p>
  );
}
