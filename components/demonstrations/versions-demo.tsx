import { Music2 } from "lucide-react";

import { CoverArt } from "@/components/demonstrations/cover-art";

interface Version {
  kind: string;
  title: string;
  by: string;
  length: string;
  seed: string;
}

const versions: Version[] = [
  { kind: "Original recording", title: "Lighthouse Frequency", by: "Hollow Coast", length: "4:08", seed: "tidal" },
  { kind: "Nightcore", title: "Lighthouse Frequency (Nightcore)", by: "fan edit", length: "3:21", seed: "nightcore151" },
  { kind: "Piano cover", title: "Lighthouse Frequency", by: "Juno Park", length: "3:55", seed: "nightbus" },
  { kind: "Acoustic", title: "Lighthouse Frequency (Acoustic)", by: "Hollow Coast", length: "4:31", seed: "acoustic50" },
  { kind: "Remix", title: "Lighthouse Frequency (Arlo Sato Remix)", by: "Hollow Coast, Arlo Sato", length: "5:47", seed: "machines54" },
  { kind: "Slowed", title: "Lighthouse Frequency (Slowed + Reverb)", by: "fan edit", length: "5:12", seed: "slowed7" },
];

/** One composition, six recordings, each keeping its own identity. */
export function VersionsDemo() {
  return (
    <div className="relative rounded-[var(--radius-panel)] border border-line bg-ground-2 p-4 shadow-float sm:p-6">
      <div className="flex items-center gap-4 rounded-2xl border border-lav/40 bg-lav/10 p-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lav text-lav-ink">
          <Music2 className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">Lighthouse Frequency</p>
          <p className="text-[0.9375rem] text-ink-2">The song · written by Hollow Coast · 6 recordings</p>
        </div>
      </div>

      <ul className="relative mt-3 grid gap-2 pl-6 sm:grid-cols-2 sm:gap-3 sm:pl-0" aria-label="Recordings of Lighthouse Frequency">
        <span className="absolute top-0 bottom-4 left-[0.6rem] w-px bg-line-strong sm:hidden" aria-hidden="true" />
        {versions.map((v) => (
          <li key={v.kind} className="relative flex items-center gap-3 rounded-xl border border-line bg-raised/60 p-2.5">
            <span className="absolute top-1/2 -left-[0.95rem] h-px w-3.5 bg-line-strong sm:hidden" aria-hidden="true" />
            <div className="w-11 shrink-0 overflow-hidden rounded-md">
              <CoverArt seed={v.seed} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-lav-bright">{v.kind}</p>
              <p className="line-clamp-2 text-[0.875rem] leading-snug text-ink">{v.title}</p>
              <p className="truncate text-[0.8125rem] text-ink-3">
                {v.by} · <span className="tabular">{v.length}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
