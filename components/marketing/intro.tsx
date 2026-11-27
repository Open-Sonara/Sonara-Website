import { StatusBadge } from "@/components/ui/status-badge";
import { Container, SectionHeading } from "@/components/ui/section";
import { getFeature } from "@/config/features";

const pillars: Array<{ id: string; label: string; line: string }> = [
  { id: "streaming", label: "Personal music streaming", line: "Your files, in original quality, wherever you are." },
  { id: "playlist-migration", label: "Playlist migration", line: "Bring playlists over from the services you used before." },
  { id: "file-organization", label: "Automatic organization", line: "New music is tagged and filed without you touching it." },
  { id: "mixes", label: "Music discovery", line: "Mixes and radio worked out from your own listening." },
  { id: "enrichment", label: "Metadata enrichment", line: "Credits, artwork and genres filled in from open sources." },
  { id: "recognition", label: "Audio recognition", line: "Name unknown files from their sound." },
  { id: "music-videos", label: "Music videos", line: "The video for a song, beside the song." },
  { id: "community-extensions", label: "Community extensions", line: "Modules built by other people, for your setup." },
];

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="intro-title"
            title="More than a music player."
            lead="Most music servers play files. Sonara looks after the collection too: it brings in your playlists, works out what each file is, files it properly and gets better at suggesting what to play next."
          />
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
            The goal is a personal library that stays organized and keeps learning, not a copy of a streaming service&rsquo;s interface.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {pillars.map((p) => {
            const f = getFeature(p.id);
            return (
              <li key={p.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-lg font-semibold text-ink">{p.label}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{p.line}</p>
                </div>
                <StatusBadge status={f.status} progress={f.progress} />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
