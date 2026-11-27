"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/** A shell command with an accessible copy button. */
export function CopyCommand({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn("relative rounded-[var(--radius-card)] border border-line bg-ground", className)}>
      <pre className="overflow-x-auto p-4 pr-14 text-[0.8125rem] leading-relaxed text-ink">
        <code>{command}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-2.5 right-2.5 inline-flex size-9 items-center justify-center rounded-lg border border-line text-ink-2 hover:text-ink"
      >
        {copied ? <Check className="size-4 text-lav-bright" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        <span className="sr-only">{copied ? "Copied" : "Copy command"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Command copied to clipboard" : ""}
      </span>
    </div>
  );
}
