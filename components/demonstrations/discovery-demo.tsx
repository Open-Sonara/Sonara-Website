"use client";

import { Bookmark, BookmarkCheck, CircleCheck, CircleDashed, Search } from "lucide-react";
import { useState } from "react";

import { CoverArt } from "@/components/demonstrations/cover-art";
import { cn } from "@/lib/utils";

interface Rec {
  seed: string;
  track: string;
  artist: string;
  reason: string;
  inLibrary: boolean;
  source?: string;
}

const recs: Rec[] = [
  {
    seed: "glasshouse",
    track: "Prism Weather",
    artist: "Mira Vance",
    reason: "Shares the reverb-heavy dream pop of your late-night plays",
    inLibrary: false,
    source: "Find on YouTube (authorized source)",
  },
  {
    seed: "orbit",
    track: "Second Moon",
    artist: "The Lantern Choir",
    reason: "Played after Hollow Coast by listeners with similar taste",
    inLibrary: false,
    source: "Search your configured providers",
  },
  {
    seed: "machines54",
    track: "Idle Hands, Warm Circuits",
    artist: "Arlo Sato",
    reason: "You have the remix; this is the original recording",
    inLibrary: true,
  },
];

export function DiscoveryDemo() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  return (
    <ul className="grid gap-3">
      {recs.map((r) => {
        const isSaved = Boolean(saved[r.seed]);
        return (
          <li key={r.seed} className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-ground-2 p-3 shadow-lift sm:p-4">
            <div className="w-20 shrink-0 overflow-hidden rounded-lg sm:w-24">
              <CoverArt seed={r.seed} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{r.track}</p>
                  <p className="truncate text-[0.9375rem] text-ink-2">{r.artist}</p>
                </div>
                {!r.inLibrary && (
                  <button
                    type="button"
                    aria-pressed={isSaved}
                    onClick={() => setSaved((s) => ({ ...s, [r.seed]: !isSaved }))}
                    className={cn(
                      "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[0.8125rem] transition-colors",
                      isSaved ? "border-lav/50 bg-lav/15 text-lav-bright" : "border-line-strong text-ink-2 hover:text-ink",
                    )}
                  >
                    {isSaved ? <BookmarkCheck className="size-4" aria-hidden="true" /> : <Bookmark className="size-4" aria-hidden="true" />}
                    {isSaved ? "On wishlist" : "Wishlist"}
                    <span className="sr-only"> {r.track}</span>
                  </button>
                )}
              </div>
              <p className="mt-2 text-[0.875rem] leading-snug text-ink-2">{r.reason}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-[0.8125rem]">
                {r.inLibrary ? (
                  <span className="inline-flex items-center gap-1.5 text-lav-bright">
                    <CircleCheck className="size-4" aria-hidden="true" /> In your library
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-ink-3">
                    <CircleDashed className="size-4" aria-hidden="true" /> Not in your library
                  </span>
                )}
                {r.source && (
                  <span className="inline-flex items-center gap-1.5 text-ink-2">
                    <Search className="size-3.5" aria-hidden="true" /> {r.source}
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
