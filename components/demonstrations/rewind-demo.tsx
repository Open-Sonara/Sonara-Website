"use client";

import { Check, X } from "lucide-react";
import { useId, useState } from "react";

import { CoverArt } from "@/components/demonstrations/cover-art";
import { cn } from "@/lib/utils";

const options = ["Lighthouse Frequency", "Prism Weather", "Night Bus Diaries", "Second Moon"];
const answer = "Night Bus Diaries";

const hours = [2, 1, 0, 0, 0, 0, 1, 3, 4, 3, 2, 3, 4, 3, 3, 4, 5, 6, 7, 8, 9, 10, 8, 5];

/** Rewind preview with fictional statistics and one playable quiz question. */
export function RewindDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  const qid = useId();
  const correct = picked === answer;

  return (
    <div className="overflow-hidden rounded-[var(--radius-panel)] border border-lav/30 shadow-float">
      <div className="relative bg-[linear-gradient(140deg,#c4b5fd_0%,#a78bfa_55%,#8b6cf0_100%)] text-lav-ink p-5 sm:p-7">
        <p className="font-display text-sm font-semibold">Sonara Rewind · demo data</p>
        <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Your year in music</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          <div>
            <dt className="text-xs font-medium">Minutes</dt>
            <dd className="tabular font-display text-2xl font-semibold sm:text-3xl">41,280</dd>
          </div>
          <div>
            <dt className="text-xs font-medium">Top artist</dt>
            <dd className="font-display text-lg leading-tight font-semibold sm:text-xl">Hollow Coast</dd>
          </div>
          <div>
            <dt className="text-xs font-medium">Top genre</dt>
            <dd className="font-display text-lg leading-tight font-semibold sm:text-xl">Dream pop</dd>
          </div>
        </dl>

        <div className="mt-6" aria-hidden="true">
          <div className="flex h-16 items-end gap-[3px]">
            {hours.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-sm bg-lav-ink/75" style={{ height: `${10 + h * 9}%` }} />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[0.6875rem] font-medium">
            <span>midnight</span>
            <span>noon</span>
            <span>11 pm</span>
          </div>
        </div>
        <div className="absolute top-5 right-5 w-16 rotate-6 overflow-hidden rounded-lg shadow-lift sm:w-20" aria-hidden="true">
          <CoverArt seed="nightbus" />
        </div>
      </div>

      <div className="bg-ground-2 p-5 sm:p-7">
        <fieldset>
          <legend id={qid} className="font-semibold text-ink">
            Which song did you play most in March?
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {options.map((o) => {
              const isPicked = picked === o;
              const showRight = picked !== null && o === answer;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setPicked(o)}
                  disabled={picked !== null}
                  aria-pressed={isPicked}
                  className={cn(
                    "flex min-h-11 items-center justify-between gap-2 rounded-xl border px-3.5 py-2 text-left text-[0.9375rem] transition-colors duration-300",
                    picked === null && "border-line-strong text-ink hover:border-lav/60 hover:bg-raised",
                    showRight && "border-lav bg-lav/15 text-ink",
                    isPicked && !correct && "border-line-strong bg-raised text-ink-2 line-through",
                    picked !== null && !isPicked && !showRight && "border-line text-ink-3",
                  )}
                >
                  {o}
                  {showRight && <Check className="size-4 shrink-0 text-lav-bright" aria-hidden="true" />}
                  {isPicked && !correct && <X className="size-4 shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </fieldset>
        <div className="mt-3 flex min-h-6 flex-wrap items-center gap-3 text-[0.9375rem]" aria-live="polite">
          {picked !== null && (
            <>
              <span className={correct ? "text-lav-bright" : "text-ink-2"}>
                {correct ? "Right: 61 plays in March." : `Not quite. It was ${answer}, with 61 plays.`}
              </span>
              <button type="button" onClick={() => setPicked(null)} className="text-ink-2 underline hover:text-ink">
                Try again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
