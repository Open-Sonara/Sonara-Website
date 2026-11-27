import type { ReactNode } from "react";

/**
 * The page's one authored entrance: the hero preview settles from a slight
 * tilt into place. Pure CSS, so it needs no JavaScript, and the global
 * reduced-motion rule makes it land instantly.
 */
export function SettleIn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} style={{ perspective: "1800px" }}>
      <div className="origin-top animate-settle">{children}</div>
    </div>
  );
}
