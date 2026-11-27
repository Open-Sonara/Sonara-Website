import { Bell, Database, Download, Palette, Radar, ScanLine } from "lucide-react";

const kinds = [
  { icon: Database, name: "Metadata providers", line: "More sources for credits, tags and artwork." },
  { icon: Download, name: "Acquisition providers", line: "Sources you are authorized to use." },
  { icon: Radar, name: "Discovery", line: "New ways to find music outside your library." },
  { icon: ScanLine, name: "Audio recognition", line: "Alternative fingerprint and recognition services." },
  { icon: Bell, name: "Notifications", line: "Tell other tools when your library changes." },
  { icon: Palette, name: "Themes", line: "Change how Sonara looks." },
];

/** The kinds of modules the planned system is meant to support. No fictional modules. */
export function ExtensionsDemo() {
  return (
    <div className="rounded-[var(--radius-panel)] border border-dashed border-line-strong bg-ground-2/60 p-4 sm:p-6">
      <p className="text-sm text-ink-2">Module categories the extension system is being designed around</p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {kinds.map((k) => (
          <li key={k.name} className="flex items-start gap-3 rounded-xl border border-line bg-ground p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-raised text-lav-bright">
              <k.icon className="size-[1.1rem]" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[0.9375rem] font-medium text-ink">{k.name}</p>
              <p className="text-[0.8125rem] leading-snug text-ink-3">{k.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
