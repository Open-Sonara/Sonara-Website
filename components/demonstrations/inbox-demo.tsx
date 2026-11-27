"use client";

import { AudioWaveform, Fingerprint, FolderCheck, FolderInput, RotateCcw, ScanSearch, Sparkles, Tags } from "lucide-react";
import { Fragment, useState } from "react";

import { CoverArt } from "@/components/demonstrations/cover-art";
import { StatusMark } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

type Tone = "built" | "planned";

interface Step {
  id: string;
  label: string;
  icon: typeof Fingerprint;
  tone: Tone;
  detail: string;
}

const steps: Step[] = [
  {
    id: "incoming",
    label: "Incoming folder",
    icon: FolderInput,
    tone: "planned",
    detail: "A new file lands with a meaningless name and empty tags. Watching an incoming folder is planned.",
  },
  {
    id: "fingerprint",
    label: "Fingerprint",
    icon: Fingerprint,
    tone: "built",
    detail: "Chromaprint computes an acoustic fingerprint from the audio itself, so the file name and tags don't matter.",
  },
  {
    id: "recognition",
    label: "Recognize",
    icon: ScanSearch,
    tone: "planned",
    detail: "The fingerprint identifies the recording. Looking it up (for example with AcoustID) is planned.",
  },
  {
    id: "enrichment",
    label: "Enrich",
    icon: Sparkles,
    tone: "built",
    detail: "MusicBrainz and Cover Art Archive fill in the artist, album, track number and artwork.",
  },
  {
    id: "classification",
    label: "Classify",
    icon: Tags,
    tone: "built",
    detail: "Genres and moods are assigned with a confidence score. Uncertain ones wait for your review.",
  },
  {
    id: "filed",
    label: "File",
    icon: FolderCheck,
    tone: "built",
    detail: "The file is renamed and moved into your library using your naming template.",
  },
];

/** Render a path that only wraps at its separators. */
function PathText({ path }: { path: string }) {
  const parts = path.split("/");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              /<wbr />
            </>
          )}
          <span className="whitespace-nowrap">{p}</span>
        </Fragment>
      ))}
    </>
  );
}

function Field({ label, value, known }: { label: string; value: string; known: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2.5 last:border-0">
      <dt className="shrink-0 text-[0.8125rem] text-ink-3">{label}</dt>
      <dd
        className={cn(
          "min-w-0 truncate text-right text-[0.9375rem] transition-colors duration-500",
          known ? "text-ink" : "text-ink-3 italic",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

/** Interactive Sonara Inbox walkthrough: the page's signature demonstration. */
export function InboxDemo() {
  const [step, setStep] = useState(0);
  const at = (id: string) => step >= steps.findIndex((s) => s.id === id);
  const current = steps[step]!;
  const done = step === steps.length - 1;

  return (
    <div className="rounded-[1.5rem] border border-line-strong/70 bg-ground-2 p-4 shadow-float sm:p-8">
      <ol className="relative grid grid-cols-6 gap-2 sm:gap-3" aria-label="Sonara Inbox steps">
        <span className="absolute top-[1.375rem] right-[8%] left-[8%] h-px bg-line-strong sm:top-7" aria-hidden="true" />
        {steps.map((s, i) => (
          <li key={s.id} className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${s.label}${s.tone === "planned" ? " (planned)" : ""}`}
              className={cn(
                "grid size-11 place-items-center rounded-full border transition-colors duration-300 sm:size-14",
                i < step && "border-lav/40 bg-raised text-lav-bright",
                i === step && "border-lav bg-lav text-lav-ink shadow-[0_0.5rem_1.5rem_-0.5rem_rgb(167_139_250/0.7)]",
                i > step && "border-line-strong bg-ground-2 text-ink-3 hover:text-ink-2",
              )}
            >
              <s.icon className="size-[1.15rem] sm:size-6" aria-hidden="true" />
            </button>
            <span
              className={cn(
                "mt-2.5 hidden text-center text-sm font-medium sm:block",
                i === step ? "text-ink" : "text-ink-2",
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                "mt-1 hidden items-center gap-1 text-xs sm:inline-flex",
                s.tone === "planned" ? "text-ink-3" : "text-lav-bright",
              )}
            >
              <StatusMark tone={s.tone} className="size-2.5" />
              {s.tone === "planned" ? "Planned" : "Built"}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
        <div className="flex flex-col" aria-live="polite">
          <p className="tabular text-sm text-ink-3">
            Step {step + 1} of {steps.length}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
            {current.label}
            <span
              className={cn(
                "inline-flex items-center gap-1.5 font-sans text-sm font-medium tracking-normal",
                current.tone === "planned" ? "text-ink-2" : "text-lav-bright",
              )}
            >
              <StatusMark tone={current.tone} />
              {current.tone === "planned" ? "Planned" : "Built, unreleased"}
            </span>
          </p>
          <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-2">{current.detail}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {done ? (
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.9375rem] text-ink hover:border-lav/60"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Start over
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-lav px-5 text-[0.9375rem] font-medium text-lav-ink hover:bg-lav-bright"
              >
                {step === 0 ? "Run the Inbox" : `Next: ${steps[step + 1]!.label}`}
              </button>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-ground p-4 sm:p-5">
          <div className="grid grid-cols-[4.5rem_1fr] gap-4 sm:grid-cols-[7rem_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-raised">
              <div className={cn("transition-opacity duration-700", at("enrichment") ? "opacity-100" : "opacity-0")}>
                <CoverArt seed="tidal" title={at("enrichment") ? "Generated artwork for the demo album Tidal Static" : undefined} />
              </div>
              {!at("enrichment") && (
                <div className="absolute inset-0 grid place-items-center text-ink-3">
                  <AudioWaveform className="size-8" aria-hidden="true" />
                </div>
              )}
            </div>
            <dl className="min-w-0">
              <Field label="Artist" known={at("recognition")} value={at("recognition") ? "Hollow Coast" : "unknown"} />
              <Field label="Album" known={at("enrichment")} value={at("enrichment") ? "Tidal Static (2023) · track 3" : "unknown"} />
              <Field
                label="Genre · mood"
                known={at("classification")}
                value={at("classification") ? "Dream pop 0.82 · Late night 0.74" : "none"}
              />
              <Field label="Fingerprint" known={at("fingerprint")} value={at("fingerprint") ? "AQADtEmUSEkS… · 4:08" : "not computed"} />
            </dl>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-ground-2 px-3.5 py-3 font-mono text-[0.8125rem] leading-relaxed text-ink-2">
            <span className="block text-xs text-ink-3">path</span>
            {at("filed") ? (
              <span className="text-lav-bright">
                <PathText path="/music/Hollow Coast/Tidal Static (2023)/03 - Lighthouse Frequency.mp3" />
              </span>
            ) : (
              <PathText path="/downloads/incoming/01 - track (final) [www.rip].mp3" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
