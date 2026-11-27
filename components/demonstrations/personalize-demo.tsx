"use client";

import { Play, Shuffle, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { CoverArt } from "@/components/demonstrations/cover-art";
import { demoAlbums } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const accents = [
  { name: "Lavender", value: "#a78bfa" },
  { name: "Rose", value: "#f0abfc" },
  { name: "Sky", value: "#93c5fd" },
  { name: "Mint", value: "#86efac" },
  { name: "Amber", value: "#fcd34d" },
];

const rules = [
  ["Genre", "is", "Dream pop"],
  ["Play count", "is less than", "3"],
  ["Added", "in the last", "90 days"],
];

/** Smart playlist rules plus an accent color the visitor can change. */
export function PersonalizeDemo() {
  const [accent, setAccent] = useState(accents[0]!);
  const tracks = [demoAlbums[0]!, demoAlbums[2]!, demoAlbums[7]!, demoAlbums[11]!];

  return (
    <div
      className="rounded-[var(--radius-panel)] border border-line bg-ground-2 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--accent)_16%,transparent)_0%,transparent_45%)] p-4 shadow-float transition-[background-image] duration-500 sm:p-6"
      style={{ "--accent": accent.value } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.02em]">
            <SlidersHorizontal className="size-5 shrink-0 text-[var(--accent)] transition-colors duration-500" aria-hidden="true" />
            Unplayed dream pop
          </p>
          <p className="tabular mt-0.5 text-sm text-ink-3">Smart playlist · 38 tracks</p>
        </div>
        <span
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-ground transition-colors duration-500"
          aria-hidden="true"
        >
          <Play className="size-4 translate-x-px" fill="currentColor" />
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-ground p-3 text-[0.875rem]">
        <p className="text-ink-2">
          Match <span className="font-medium text-ink">all</span> of these rules
        </p>
        <ul className="mt-2 space-y-1.5">
          {rules.map(([field, op, value]) => (
            <li key={field} className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-md bg-raised px-2 py-1 text-ink">{field}</span>
              <span className="text-ink-3">{op}</span>
              <span className="rounded-md border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] px-2 py-1 text-ink transition-colors duration-500">
                {value}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 flex items-center gap-1.5 text-ink-3">
          <Shuffle className="size-3.5" aria-hidden="true" /> Order: shuffled, stable between refreshes
        </p>
      </div>

      <ul className="mt-4 grid grid-cols-4 gap-2.5" aria-hidden="true">
        {tracks.map((t) => (
          <li key={t.seed} className="overflow-hidden rounded-lg">
            <CoverArt seed={t.seed} />
          </li>
        ))}
      </ul>

      <fieldset className="mt-5">
        <legend className="text-sm text-ink-2">Accent color</legend>
        <div className="mt-2 flex gap-2.5">
          {accents.map((a) => (
            <label key={a.name} className="relative cursor-pointer">
              <input
                type="radio"
                name="accent"
                value={a.name}
                checked={accent.name === a.name}
                onChange={() => setAccent(a)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "block size-8 rounded-full ring-offset-2 ring-offset-ground-2 transition-shadow peer-focus-visible:ring-2 peer-focus-visible:ring-lav-bright",
                  accent.name === a.name && "ring-2 ring-ink",
                )}
                style={{ background: a.value }}
              />
              <span className="sr-only">{a.name}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
