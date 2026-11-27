"use client";

import { AudioWaveform, Fingerprint, FolderCheck, FolderInput, RotateCcw, ScanSearch, Sparkles, Tags } from "lucide-react";
import { useState } from "react";

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
  { id: "incoming", label: "Incoming folder", icon: FolderInput, tone: "planned", detail: "A new file lands with a meaningless name and empty tags. (Planned: watching an incoming folder.)" },
  { id: "fingerprint", label: "Fingerprinting", icon: Fingerprint, tone: "built", detail: "Chromaprint computes an acoustic fingerprint from the audio itself." },
  { id: "recognition", label: "Audio recognition", icon: ScanSearch, tone: "planned", detail: "The fingerprint identifies the recording. (Planned: AcoustID lookup.)" },
  { id: "enrichment", label: "Metadata enrichment", icon: Sparkles, tone: "built", detail: "MusicBrainz and Cover Art Archive fill in artist, album, track and artwork." },
  { id: "classification", label: "Genre classification", icon: Tags, tone: "built", detail: "Genres and moods are assigned with confidence; uncertain ones go to review." },
  { id: "filed", label: "Organized library", icon: FolderCheck, tone: "built", detail: "The file is renamed and moved using your library template." },
];

function Field({ label, value, known }: { label: string; value: string; known: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2 last:border-0">
      <dt className="text-[0.8125rem] text-ink-3">{label}</dt>
      <dd className={cn("min-w-0 truncate text-right text-[0.9375rem] transition-colors duration-500", known ? "text-ink" : "text-ink-3 italic")}>
        {value}
      </dd>
    </div>
  );
}

export function InboxDemo() {
  const [step, setStep] = useState(0);
  const at = (id: string) => step >= steps.findIndex((s) => s.id === id);
  const current = steps[step]!;
  const done = step === steps.length - 1;

  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-ground-2 p-4 shadow-float sm:p-6">
      <ol className="grid grid-cols-6 gap-1.5" aria-label="Sonara Inbox steps">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              aria-label={`${i + 1}. ${s.label}${s.tone === "planned" ? " (planned)" : ""}`}
              className={cn(
                "flex h-11 w-full items-center justify-center rounded-xl border transition-colors duration-300",
                i < step && "border-lav/30 bg-lav/10 text-lav-bright",
                i === step && "border-lav bg-lav text-lav-ink",
                i > step && "border-line text-ink-3 hover:border-line-strong hover:text-ink-2",
              )}
            >
              <s.icon className="size-[1.15rem]" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex min-h-[4.5rem] items-start gap-3" aria-live="polite">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-semibold text-ink">
            {current.label}
            <span className={cn("inline-flex items-center gap-1 text-xs font-medium", current.tone === "planned" ? "text-ink-2" : "text-lav-bright")}>
              <StatusMark tone={current.tone} />
              {current.tone === "planned" ? "Planned" : "Built, unreleased"}
            </span>
          </p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{current.detail}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[4.5rem_1fr] gap-4 sm:grid-cols-[7.5rem_1fr]">
        <div className="relative overflow-hidden rounded-xl border border-line bg-raised">
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
          <Field
            label="File"
            known={at("filed")}
            value={at("filed") ? "03 - Lighthouse Frequency.mp3" : "01 - track (final) [www.rip].mp3"}
          />
          <Field label="Fingerprint" known={at("fingerprint")} value={at("fingerprint") ? "AQADtEmUSEkS…  4:08" : "not computed"} />
          <Field label="Artist" known={at("recognition")} value={at("recognition") ? "Hollow Coast" : "unknown"} />
          <Field label="Album" known={at("enrichment")} value={at("enrichment") ? "Tidal Static (2023) · track 3" : "unknown"} />
          <Field
            label="Genre · mood"
            known={at("classification")}
            value={at("classification") ? "Dream pop 0.82 · Late night 0.74" : "none"}
          />
        </dl>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-ground px-3 py-2.5 font-mono text-[0.8125rem] leading-relaxed break-all text-ink-2">
        <span className="text-ink-3">path </span>
        {at("filed") ? (
          <span className="text-lav-bright">/music/Hollow Coast/Tidal Static (2023)/03 - Lighthouse Frequency.mp3</span>
        ) : (
          <span>/downloads/incoming/01 - track (final) [www.rip].mp3</span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {done ? (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.9375rem] text-ink hover:border-lav/60"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Start over
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-lav px-4 text-[0.9375rem] font-medium text-lav-ink hover:bg-lav-bright"
          >
            {step === 0 ? "Run the Inbox" : `Next: ${steps[step + 1]!.label}`}
          </button>
        )}
        <span className="tabular text-sm text-ink-3">
          Step {step + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
}
