import { Check, CircleAlert, Search } from "lucide-react";

import { CoverArt } from "@/components/demonstrations/cover-art";
import { cn } from "@/lib/utils";

interface Row {
  title: string;
  artist: string;
  seed: string;
  state: "matched" | "review" | "missing";
  score?: number;
  why: string[];
}

const rows: Row[] = [
  { title: "Night Bus Diaries", artist: "Juno Park", seed: "nightbus", state: "matched", score: 98, why: ["Title", "Artist", "Duration ±1s"] },
  { title: "Salt & Signal", artist: "Ostra", seed: "salt19", state: "matched", score: 94, why: ["Title", "Artist", "Album"] },
  {
    title: "Paper Satellites (Live)",
    artist: "Kestrel & Vine",
    seed: "satellites8",
    state: "review",
    score: 61,
    why: ["Only the studio version is in your library"],
  },
  { title: "Velour Hours", artist: "Sable Kids", seed: "velour", state: "missing", why: ["Not in your library"] },
];

/** A playlist import being matched against the library, with explanations. */
export function ImportDemo() {
  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-ground-2 p-4 shadow-float sm:p-6" aria-hidden="true">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-display text-xl font-semibold tracking-[-0.02em]">Road trip 2019</p>
          <p className="text-sm text-ink-3">Imported from a Spotify data export · 42 tracks</p>
        </div>
        <p className="tabular text-sm text-ink-2">
          <span className="text-lav-bright">37 matched</span> · 3 to review · 2 missing
        </p>
      </div>
      <ul className="mt-5 divide-y divide-line">
        {rows.map((r) => (
          <li key={r.title} className="flex items-center gap-3 py-3">
            <div className="w-10 shrink-0 overflow-hidden rounded-md">
              <CoverArt seed={r.seed} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] font-medium text-ink">{r.title}</p>
              <p className="truncate text-[0.8125rem] text-ink-3">
                {r.artist} · {r.why.join(" · ")}
              </p>
            </div>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                r.state === "matched" && "bg-lav/15 text-lav-bright",
                r.state === "review" && "border border-lav/40 text-lav-bright",
                r.state === "missing" && "border border-line-strong text-ink-2",
              )}
            >
              {r.state === "matched" && <Check className="size-3.5" />}
              {r.state === "review" && <CircleAlert className="size-3.5" />}
              {r.state === "missing" && <Search className="size-3.5" />}
              {r.state === "matched" && <span className="tabular">{r.score}%</span>}
              {r.state === "review" && "Review"}
              {r.state === "missing" && "Find a source"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
