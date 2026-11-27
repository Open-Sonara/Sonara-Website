import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { StatusMark } from "@/components/ui/status-badge";
import { Container, SectionHeading } from "@/components/ui/section";
import { getFeature, statusLabel } from "@/config/features";

/** The capabilities the spec says Sonara combines, each with its real status mark. */
const combines: Array<{ id: string; label: string }> = [
  { id: "streaming", label: "Personal streaming" },
  { id: "playlist-migration", label: "Playlist migration" },
  { id: "file-organization", label: "Automatic organization" },
  { id: "mixes", label: "Music discovery" },
  { id: "recognition", label: "Audio recognition" },
  { id: "enrichment", label: "Metadata enrichment" },
  { id: "music-videos", label: "Music videos" },
  { id: "community-extensions", label: "Community extensions" },
];

const reasons = [
  {
    title: "It looks after the collection, not just the playback",
    text: "Scanning, fingerprinting, metadata enrichment and genre and mood classification keep the library tidy as it grows, with field locks, a change history and a review queue for anything uncertain.",
  },
  {
    title: "It brings your history with you",
    text: "Playlists from Spotify exports, CSV, JSON, M3U or plain text are matched to your files, and imported playlists can stay in sync with their source.",
  },
  {
    title: "It knows one version from another",
    text: "A live take is not the studio recording, and a remix is not the original. The matching engine checks for live, remix, cover, acoustic, sped-up and slowed versions before it counts a match.",
  },
  {
    title: "It learns from your listening, on your server",
    text: "Mixes, radio and recommendations are worked out locally from your plays, likes and ratings. No outside service sees your taste.",
  },
  {
    title: "It stays yours",
    text: "Self-hosted, free software, no account with anyone. Mount your existing folders read-only and Sonara will never touch them.",
  },
];

function toneFor(id: string) {
  const f = getFeature(id);
  if (f.status === "in-development") return f.progress === "built" ? "built" : "progress";
  return f.status === "planned" ? "planned" : "built";
}

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="intro-title"
            title="More than a music player."
            lead="Most music servers play files. Sonara is built to be an intelligent personal library: one that organizes itself and gets better at knowing what you want to hear."
          />
          <p className="mt-8 text-sm font-medium text-ink">Sonara brings together</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {combines.map((c) => {
              const f = getFeature(c.id);
              const tone = toneFor(c.id);
              return (
                <li
                  key={c.id}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[0.8125rem] ${
                    tone === "planned" ? "border-line text-ink-2" : "border-lav/30 text-ink"
                  }`}
                >
                  <StatusMark tone={tone} className={tone === "planned" ? "size-2.5 text-ink-3" : "size-2.5 text-lav-bright"} />
                  {c.label}
                  <span className="sr-only"> ({statusLabel(f.status, f.progress)})</span>
                </li>
              );
            })}
          </ul>
          <Link href="/features" className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-lav-bright hover:underline">
            Status of every feature
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {reasons.map((r) => (
            <li key={r.title} className="py-7 sm:py-8">
              <h3 className="text-2xl leading-snug font-semibold tracking-[-0.02em] text-ink sm:text-[1.75rem]">{r.title}</h3>
              <p className="mt-2.5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
