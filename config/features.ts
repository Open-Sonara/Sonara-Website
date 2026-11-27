/**
 * Every feature the website mentions, with its real status. Pages render
 * from this file, so updating a status here updates the homepage, the
 * features directory and every badge at once.
 *
 * Status vocabulary (from the website specification):
 *   available       shipped in a published release
 *   preview         in a published pre-release, may change
 *   in-development  being built; `progress` says how far
 *   planned         intended, not started
 *   experimental    shipped behind a flag, may be removed
 *
 * `progress` qualifies in-development work:
 *   built    implemented and tested on the main branch, not yet released
 *   partial  part of it is built (for example the server side only)
 *
 * Statuses checked against the core repository's docs/PROGRESS.md on the
 * date in config/release-status.ts. Nothing is "available" until a
 * release exists.
 */

export type FeatureStatus = "available" | "preview" | "in-development" | "planned" | "experimental";
export type FeatureProgress = "built" | "partial";

export type BrandId =
  | "pulse"
  | "inbox"
  | "echo"
  | "discover"
  | "rewind"
  | "connect"
  | "vision"
  | "split"
  | "radio"
  | "mix"
  | "extensions";

export interface Feature {
  id: string;
  name: string;
  summary: string;
  status: FeatureStatus;
  progress?: FeatureProgress;
  /** Roadmap phase in the core repository, or null when not yet scheduled. */
  phase: number | null;
  brand?: BrandId;
  note?: string;
}

export interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  features: Feature[];
}

export interface FeatureBrand {
  id: BrandId;
  name: string;
  summary: string;
  status: FeatureStatus;
  progress?: FeatureProgress;
  phase: number | null;
}

/** Product feature names. Names for parts of one application, not separate installs. */
export const brands: FeatureBrand[] = [
  {
    id: "inbox",
    name: "Sonara Inbox",
    summary: "Automatic music recognition, folder sorting and library organization.",
    status: "in-development",
    progress: "partial",
    phase: null,
  },
  {
    id: "echo",
    name: "Sonara Echo",
    summary: "Audio fingerprinting, song recognition and duplicate detection.",
    status: "in-development",
    progress: "partial",
    phase: 6,
  },
  {
    id: "discover",
    name: "Sonara Discover",
    summary: "Personalized external music discovery and recommendations.",
    status: "planned",
    phase: null,
  },
  {
    id: "mix",
    name: "Sonara Mix",
    summary: "Automatically generated music collections.",
    status: "in-development",
    progress: "partial",
    phase: 7,
  },
  {
    id: "radio",
    name: "Sonara Radio",
    summary: "Continuous personalized music recommendations.",
    status: "in-development",
    progress: "partial",
    phase: 7,
  },
  {
    id: "rewind",
    name: "Sonara Rewind",
    summary: "Listening summaries, personalized statistics and interactive music quizzes.",
    status: "planned",
    phase: 9,
  },
  {
    id: "connect",
    name: "Sonara Connect",
    summary: "Playback synchronization and remote device control.",
    status: "planned",
    phase: 8,
  },
  {
    id: "pulse",
    name: "Sonara Pulse",
    summary: "Public Now Playing API, WebSockets and embeddable listening widgets.",
    status: "planned",
    phase: null,
  },
  { id: "vision", name: "Sonara Vision", summary: "Music video integration.", status: "planned", phase: null },
  {
    id: "split",
    name: "Sonara Split",
    summary: "Long-form recording and compilation processing.",
    status: "planned",
    phase: null,
  },
  {
    id: "extensions",
    name: "Sonara Extensions",
    summary: "Community modules and platform integrations.",
    status: "planned",
    phase: null,
  },
];

export const featureCategories: FeatureCategory[] = [
  {
    id: "experience",
    name: "Music experience",
    description: "Listening to your own collection in a modern streaming interface.",
    features: [
      {
        id: "streaming",
        name: "Streaming",
        summary: "Stream your original files from your server, with seeking.",
        status: "in-development",
        progress: "built",
        phase: 2,
        note: "Original-quality streaming is built; on-demand transcoding is planned for Phase 8.",
      },
      {
        id: "player",
        name: "Persistent music player",
        summary: "A player that keeps going while you browse, with a full-screen view and Media Session controls.",
        status: "in-development",
        progress: "built",
        phase: 2,
      },
      {
        id: "playlists",
        name: "Custom playlists",
        summary: "Playlists with folders, drag-and-drop ordering, in-playlist search and M3U8/JSON/CSV export.",
        status: "in-development",
        progress: "built",
        phase: 3,
        note: "Custom cover upload and playlist merging are not built yet.",
      },
      {
        id: "smart-playlists",
        name: "Smart playlists",
        summary: "Rule-based playlists that refresh themselves as your library and listening change.",
        status: "in-development",
        progress: "partial",
        phase: 7,
        note: "The rule engine is built on the server; the visual rule builder is not.",
      },
      {
        id: "favorites",
        name: "Favorites",
        summary: "Liked Songs, plus favorite albums, artists and playlists.",
        status: "in-development",
        progress: "built",
        phase: 3,
      },
      {
        id: "queue",
        name: "Queue management",
        summary: "A server-side queue that is remembered between sessions.",
        status: "in-development",
        progress: "built",
        phase: 3,
      },
      {
        id: "lyrics",
        name: "Lyrics",
        summary: "Embedded and .lrc lyrics, plus LRCLIB downloads stored for offline use, with synced highlighting.",
        status: "planned",
        phase: 8,
      },
      {
        id: "music-videos",
        name: "Music videos",
        summary: "Watch the video for a recording alongside the audio.",
        status: "planned",
        phase: null,
        brand: "vision",
      },
      {
        id: "playback-customization",
        name: "Playback customization",
        summary: "Gapless playback, crossfade, loudness normalization, equalizer, speed and sleep timer.",
        status: "planned",
        phase: 8,
      },
      {
        id: "device-sync",
        name: "Device synchronization",
        summary: "Hand playback between devices and control one from another.",
        status: "planned",
        phase: 8,
        brand: "connect",
      },
    ],
  },
  {
    id: "organization",
    name: "Music organization",
    description: "A library that scans, identifies, enriches and tidies itself.",
    features: [
      {
        id: "playlist-migration",
        name: "Playlist migration",
        summary:
          "Import playlists from Spotify (data export or Web API), CSV, JSON, M3U and text, matched to your library by a version-aware engine you can review.",
        status: "in-development",
        progress: "built",
        phase: 4,
        note: "Metadata only: Sonara never downloads audio from Spotify.",
      },
      {
        id: "playlist-sync",
        name: "Playlist sync",
        summary: "Subscribe to YouTube and Spotify playlists and keep them in sync on a schedule, with optional approval.",
        status: "in-development",
        progress: "built",
        phase: 5,
      },
      {
        id: "inbox",
        name: "Sonara Inbox",
        summary: "Drop files in one place and have them recognized, tagged and filed into your library.",
        status: "in-development",
        progress: "partial",
        phase: null,
        brand: "inbox",
        note: "Fingerprinting, enrichment, categorization and templated filing are built; the incoming-folder workflow that ties them together is not.",
      },
      {
        id: "watched-folders",
        name: "Watched folders",
        summary: "Full, incremental and scheduled scans of multiple library folders; unchanged files are skipped.",
        status: "in-development",
        progress: "built",
        phase: 2,
      },
      {
        id: "file-organization",
        name: "Automatic file organization",
        summary: "Music Sonara acquires is filed into a managed library using your naming template.",
        status: "in-development",
        progress: "built",
        phase: 4,
        note: "Existing collections can be mounted read-only and are never moved.",
      },
      {
        id: "enrichment",
        name: "Metadata enrichment",
        summary: "MusicBrainz, Cover Art Archive and optional Last.fm data, with field locks, history and undo.",
        status: "in-development",
        progress: "built",
        phase: 6,
      },
      {
        id: "genre-classification",
        name: "Genre classification",
        summary: "Genres, moods, eras and languages with confidence scores and a review queue for uncertain ones.",
        status: "in-development",
        progress: "built",
        phase: 6,
      },
      {
        id: "fingerprinting",
        name: "Audio fingerprinting",
        summary: "Chromaprint fingerprints computed for every track.",
        status: "in-development",
        progress: "built",
        phase: 6,
        brand: "echo",
      },
      {
        id: "recognition",
        name: "Song recognition",
        summary: "Identify unknown recordings from their fingerprint.",
        status: "planned",
        phase: null,
        brand: "echo",
      },
      {
        id: "duplicates",
        name: "Duplicate detection",
        summary: "Find duplicates by fingerprint, then keep both, keep the best copy, merge or ignore.",
        status: "in-development",
        progress: "built",
        phase: 6,
        brand: "echo",
      },
      {
        id: "compilation-splitting",
        name: "Compilation splitting",
        summary: "Split long-form recordings and mixes into individual tracks.",
        status: "planned",
        phase: null,
        brand: "split",
      },
      {
        id: "recording-relationships",
        name: "Recording relationships",
        summary: "Connect originals, covers, remixes and alternate recordings to the song they share.",
        status: "planned",
        phase: null,
        note: "The matching engine already recognizes live, remix, cover, acoustic, sped-up and slowed versions; linking them in the library is not built yet.",
      },
    ],
  },
  {
    id: "discovery",
    name: "Discovery",
    description: "Finding what to play next, computed on your own server.",
    features: [
      {
        id: "external-recommendations",
        name: "External music recommendations",
        summary: "Recommendations for music that is not in your library yet.",
        status: "planned",
        phase: null,
        brand: "discover",
      },
      {
        id: "mixes",
        name: "Personalized mixes",
        summary: "Daily mixes, On Repeat, Repeat Rewind, mood and time-of-day mixes from your listening.",
        status: "in-development",
        progress: "partial",
        phase: 7,
        brand: "mix",
        note: "Built on the server; the screens are not.",
      },
      {
        id: "artist-radio",
        name: "Artist radio",
        summary: "An endless station seeded by an artist.",
        status: "in-development",
        progress: "partial",
        phase: 7,
        brand: "radio",
        note: "Built on the server; the screens are not.",
      },
      {
        id: "track-radio",
        name: "Track radio",
        summary: "An endless station seeded by a single track.",
        status: "in-development",
        progress: "partial",
        phase: 7,
        brand: "radio",
        note: "Built on the server; the screens are not.",
      },
      {
        id: "missing-originals",
        name: "Missing original recordings",
        summary: "Notice when you have a cover or remix but not the original.",
        status: "planned",
        phase: null,
      },
      {
        id: "cover-remix-discovery",
        name: "Cover and remix discovery",
        summary: "Find other versions of songs you love.",
        status: "planned",
        phase: null,
      },
      {
        id: "wishlist",
        name: "Discovery wishlist",
        summary: "Save recommendations to look for later.",
        status: "planned",
        phase: null,
      },
      {
        id: "providers",
        name: "Connected music providers",
        summary: "Spotify, YouTube, MusicBrainz and Last.fm connections managed from Settings.",
        status: "in-development",
        progress: "built",
        phase: 4,
      },
    ],
  },
  {
    id: "personalization",
    name: "Personalization",
    description: "Making the app and your listening history your own.",
    features: [
      {
        id: "sidebar",
        name: "Customizable sidebar",
        summary: "Choose and order what appears in the sidebar.",
        status: "planned",
        phase: null,
      },
      {
        id: "themes",
        name: "Themes",
        summary: "Dark and light themes with an accent color you choose.",
        status: "in-development",
        progress: "built",
        phase: 1,
      },
      {
        id: "layouts",
        name: "Workspace layouts",
        summary: "Arrange panels like the queue, lyrics and now playing the way you like.",
        status: "planned",
        phase: null,
      },
      {
        id: "history",
        name: "Listening history",
        summary: "Recently played and a full history, with play-counting rules.",
        status: "in-development",
        progress: "built",
        phase: 3,
      },
      {
        id: "statistics",
        name: "Listening statistics",
        summary: "A dashboard of what, when and how you listen.",
        status: "planned",
        phase: 9,
      },
      {
        id: "rewind",
        name: "Sonara Rewind",
        summary: "A yearly summary of your listening, with shareable cards that reveal nothing about your server.",
        status: "planned",
        phase: 9,
        brand: "rewind",
      },
      {
        id: "quizzes",
        name: "Interactive quizzes",
        summary: "Music quizzes built from your own listening.",
        status: "planned",
        phase: null,
        brand: "rewind",
      },
    ],
  },
  {
    id: "developers",
    name: "Developer functionality",
    description: "Building on top of Sonara.",
    features: [
      {
        id: "rest-api",
        name: "REST API",
        summary: "A versioned REST API with an OpenAPI description served at /api/docs.",
        status: "in-development",
        progress: "built",
        phase: 1,
      },
      {
        id: "websocket-api",
        name: "WebSocket API",
        summary: "Authenticated WebSockets for live playback state and remote control.",
        status: "planned",
        phase: 8,
        brand: "connect",
      },
      {
        id: "now-playing",
        name: "Now Playing widgets",
        summary: "Embeddable widgets fed by your own server.",
        status: "planned",
        phase: null,
        brand: "pulse",
      },
      {
        id: "webhooks",
        name: "Webhooks",
        summary: "Notifications to services such as Discord when things happen in your library.",
        status: "planned",
        phase: 9,
      },
      {
        id: "modules",
        name: "Module system",
        summary: "Independently developed modules that extend Sonara.",
        status: "planned",
        phase: null,
        brand: "extensions",
      },
      { id: "sdk", name: "SDK", summary: "Client libraries for the Sonara API.", status: "planned", phase: null },
      {
        id: "community-extensions",
        name: "Community extensions",
        summary: "A public directory of community modules.",
        status: "planned",
        phase: null,
        brand: "extensions",
      },
    ],
  },
  {
    id: "administration",
    name: "Administration",
    description: "Running Sonara for yourself or a household.",
    features: [
      {
        id: "docker",
        name: "Docker deployment",
        summary: "One docker compose up, one exposed port, amd64 and arm64 images.",
        status: "in-development",
        progress: "partial",
        phase: 1,
        note: "The Compose file and Dockerfiles exist; images have not been built or published yet.",
      },
      {
        id: "multi-user",
        name: "Multi-user accounts",
        summary: "Separate accounts with invitations and optional public registration.",
        status: "in-development",
        progress: "built",
        phase: 1,
      },
      {
        id: "permissions",
        name: "Permissions",
        summary: "Roles and permissions checked on every admin action, with an audit log.",
        status: "in-development",
        progress: "built",
        phase: 1,
      },
      {
        id: "library-management",
        name: "Library management",
        summary: "Multiple library folders, read-only collections and a managed library for new music.",
        status: "in-development",
        progress: "built",
        phase: 1,
      },
      {
        id: "storage",
        name: "Storage management",
        summary: "Storage overview, disk-space guards for downloads and artwork caching.",
        status: "in-development",
        progress: "partial",
        phase: 1,
      },
      {
        id: "jobs",
        name: "Background jobs",
        summary: "A durable scheduler and worker that survive restarts.",
        status: "in-development",
        progress: "built",
        phase: 1,
      },
      {
        id: "backups",
        name: "Backups",
        summary: "Scheduled database and settings backups with a tested restore.",
        status: "planned",
        phase: 10,
        note: "A manual pg_dump is documented today.",
      },
      {
        id: "integrations",
        name: "Integration management",
        summary: "Enable, configure and check external providers from one settings page.",
        status: "in-development",
        progress: "built",
        phase: 4,
      },
    ],
  },
];

export const allFeatures = (): Feature[] => featureCategories.flatMap((c) => c.features);

export const getFeature = (id: string): Feature => {
  const f = allFeatures().find((x) => x.id === id);
  if (!f) throw new Error(`Unknown feature id "${id}" in config/features.ts`);
  return f;
};

export const getBrand = (id: BrandId): FeatureBrand => {
  const b = brands.find((x) => x.id === id);
  if (!b) throw new Error(`Unknown brand id "${id}" in config/features.ts`);
  return b;
};

/** Human label for a status, used by every badge on the site. */
export function statusLabel(status: FeatureStatus, progress?: FeatureProgress): string {
  switch (status) {
    case "available":
      return "Available";
    case "preview":
      return "Preview";
    case "experimental":
      return "Experimental";
    case "planned":
      return "Planned";
    case "in-development":
      return progress === "built" ? "Built, unreleased" : "In development";
  }
}
