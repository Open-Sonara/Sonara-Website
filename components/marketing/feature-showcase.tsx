import type { ReactNode } from "react";

import { DiscoveryDemo } from "@/components/demonstrations/discovery-demo";
import { ExtensionsDemo } from "@/components/demonstrations/extensions-demo";
import { ImportDemo } from "@/components/demonstrations/import-demo";
import { InboxDemo } from "@/components/demonstrations/inbox-demo";
import { LibraryDemo } from "@/components/demonstrations/library-demo";
import { PersonalizeDemo } from "@/components/demonstrations/personalize-demo";
import { RewindDemo } from "@/components/demonstrations/rewind-demo";
import { VersionsDemo } from "@/components/demonstrations/versions-demo";
import { Container, DemoCaption, SectionHeading } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { getBrand, getFeature, type BrandId } from "@/config/features";
import { cn } from "@/lib/utils";

interface Row {
  id: string;
  title: string;
  body: string;
  points: string[];
  /** Status comes from config: a feature id or a brand id. */
  feature?: string;
  brand?: BrandId;
  visual: ReactNode;
  caption: string;
}

const rows: Row[] = [
  {
    id: "library",
    title: "Your entire music library",
    body: "Stream music from your own server through a modern, responsive interface, with a player that keeps going while you browse.",
    points: [
      "MP3, FLAC, AAC/M4A, ALAC, Opus, Ogg Vorbis, WAV and more",
      "Browse by album, artist, genre, mood and era",
      "Typo-tolerant search across the whole library",
    ],
    feature: "streaming",
    visual: <LibraryDemo />,
    caption: "Interface preview with illustrative albums and generated artwork.",
  },
  {
    id: "playlists",
    title: "Bring your playlists with you",
    body: "Import playlist metadata from Spotify, YouTube, CSV, JSON, M3U and plain text. A matching engine finds each track in your library and tells you why it matched.",
    points: [
      "Knows a live recording from the studio one, and a remix from the original",
      "Review anything uncertain before the playlist is created",
      "Keep imported playlists in sync on a schedule",
    ],
    feature: "playlist-migration",
    visual: <ImportDemo />,
    caption: "Illustrative import. Spotify imports are metadata only; Sonara never downloads Spotify audio.",
  },
  {
    id: "inbox",
    title: "Let Sonara organize your music",
    body: "Sonara Inbox will take whatever lands in an incoming folder and turn it into a properly tagged, properly filed recording. Most of the steps already exist. Step through them here.",
    points: [],
    brand: "inbox",
    visual: <InboxDemo />,
    caption: "Interactive demonstration with an illustrative file. Each step shows whether it is built yet.",
  },
  {
    id: "discover",
    title: "Discover something new",
    body: "Sonara Discover is planned to look beyond your collection: recommendations with a reason, a note on whether you already own them, and a wishlist for later.",
    points: [],
    brand: "discover",
    visual: <DiscoveryDemo />,
    caption: "Illustrative recommendations. Today's mixes and radio are computed only from music already in your library.",
  },
  {
    id: "versions",
    title: "Every version deserves a place",
    body: "Originals, covers, remixes, nightcore edits and acoustic takes are not duplicates. Each recording keeps its own identity while staying connected to the song they share.",
    points: [
      "The matching engine already tells live, remix, cover, acoustic, sped-up and slowed versions apart",
      "Linking them to one song in the library is planned",
    ],
    feature: "recording-relationships",
    visual: <VersionsDemo />,
    caption: "Illustrative song and recordings.",
  },
  {
    id: "personalize",
    title: "Make it yours",
    body: "Build smart playlists from rules that refresh themselves, keep custom playlists in folders, and choose the accent color the app is drawn in.",
    points: ["Rules over genre, mood, plays, ratings, tags and more, nested with all/any", "Dark and light themes with your own accent"],
    feature: "smart-playlists",
    visual: <PersonalizeDemo />,
    caption: "Try the accent colors. Smart playlist rules are built on the server; the visual rule builder is not yet.",
  },
  {
    id: "rewind",
    title: "Your year in music",
    body: "Sonara Rewind is planned as a yearly look back at your listening, with statistics and quizzes made from your own history, and shareable cards that reveal nothing about your server.",
    points: [],
    brand: "rewind",
    visual: <RewindDemo />,
    caption: "Fictional statistics. Answer the question to try the quiz format.",
  },
  {
    id: "extensions",
    title: "Built to be extended",
    body: "Sonara Extensions is the plan for independently developed modules: new metadata sources, notification targets, themes and more, installed by choice and never run by this website.",
    points: [],
    brand: "extensions",
    visual: <ExtensionsDemo />,
    caption: "The module system is planned; no modules exist yet.",
  },
];

export function FeatureShowcase() {
  const stage = rows.find((r) => r.id === "inbox")!;
  const zigzag = rows.filter((r) => r.id !== "inbox");
  const before = zigzag.slice(0, 2);
  const after = zigzag.slice(2);
  const stageStatus = getBrand(stage.brand!);

  return (
    <section aria-labelledby="showcase-title" className="border-t border-line pt-24 pb-24 sm:pt-32 sm:pb-32">
      <Container>
        <SectionHeading
          id="showcase-title"
          title="Everything your collection needs, in one place."
          lead="Each part below says plainly whether it is built yet. Built means implemented and tested on the main branch; nothing ships until the first release."
        />
        <div className="mt-20 space-y-24 sm:space-y-32">
          {before.map((row, i) => (
            <ZigzagRow key={row.id} row={row} flip={i % 2 === 1} />
          ))}
        </div>
      </Container>

      <article
        id="inbox"
        aria-labelledby="row-inbox"
        className="relative mt-24 scroll-mt-20 overflow-hidden border-y border-line bg-ground-2 py-20 sm:mt-32 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(50%_100%_at_50%_0%,rgb(109_40_217/0.22)_0%,rgb(109_40_217/0)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <StatusBadge status={stageStatus.status} progress={stageStatus.progress} />
            <h3
              id="row-inbox"
              className="mt-5 text-[2.25rem] leading-[1.04] font-semibold tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.5rem]"
            >
              {stage.title}
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl sm:leading-relaxed">{stage.body}</p>
          </div>
          <div className="mx-auto mt-12 max-w-6xl sm:mt-14">
            {stage.visual}
            <DemoCaption className="justify-center">{stage.caption}</DemoCaption>
          </div>
        </Container>
      </article>

      <Container>
        <div className="mt-24 space-y-24 sm:mt-32 sm:space-y-32">
          {after.map((row, i) => (
            <ZigzagRow key={row.id} row={row} flip={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ZigzagRow({ row, flip }: { row: Row; flip: boolean }) {
  const s = row.feature ? getFeature(row.feature) : getBrand(row.brand!);
  return (
    <article
      id={row.id === "discover" ? "discover" : undefined}
      aria-labelledby={`row-${row.id}`}
      className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div className={cn("max-w-xl", flip && "lg:order-2 lg:justify-self-end")}>
        <StatusBadge status={s.status} progress={s.progress} />
        <h3 id={`row-${row.id}`} className="mt-5 text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-ink sm:text-[2.5rem]">
          {row.title}
        </h3>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2 sm:text-lg sm:leading-relaxed">{row.body}</p>
        {row.points.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {row.points.map((p) => (
              <li key={p} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-lav" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={cn("min-w-0", flip && "lg:order-1")}>
        {row.visual}
        <DemoCaption>{row.caption}</DemoCaption>
      </div>
    </article>
  );
}
