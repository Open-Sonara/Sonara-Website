/**
 * External services Sonara talks to, and what it does with each. Sonara is
 * not affiliated with any of these services; each integration is subject to
 * that service's own terms.
 */

import type { FeatureProgress, FeatureStatus } from "./features";

export interface Integration {
  id: string;
  name: string;
  role: string;
  status: FeatureStatus;
  progress?: FeatureProgress;
  note?: string;
}

export const integrations: Integration[] = [
  {
    id: "spotify",
    name: "Spotify",
    role: "Playlist import (metadata only) from data exports or the Web API, plus monitored playlists.",
    status: "in-development",
    progress: "built",
    note: "Sonara never downloads or decrypts audio from Spotify.",
  },
  {
    id: "youtube",
    name: "YouTube",
    role: "Playlist and channel import with ongoing sync; acquisition only when an administrator authorizes the source.",
    status: "in-development",
    progress: "built",
  },
  {
    id: "musicbrainz",
    name: "MusicBrainz",
    role: "Identifiers and authoritative metadata for enrichment.",
    status: "in-development",
    progress: "built",
  },
  {
    id: "coverartarchive",
    name: "Cover Art Archive",
    role: "Album artwork.",
    status: "in-development",
    progress: "built",
  },
  {
    id: "lastfm",
    name: "Last.fm",
    role: "Optional tags for genre gaps and mood suggestions, with your own API key.",
    status: "in-development",
    progress: "built",
  },
  {
    id: "files",
    name: "CSV, JSON, M3U and text",
    role: "Import playlists exported from other services and players.",
    status: "in-development",
    progress: "built",
  },
  { id: "lrclib", name: "LRCLIB", role: "Synced lyrics, downloaded and stored for offline use.", status: "planned" },
  { id: "acoustid", name: "AcoustID", role: "Recognizing unknown recordings from fingerprints.", status: "planned" },
  { id: "apple-music", name: "Apple Music", role: "Playlist metadata import.", status: "planned" },
  { id: "listenbrainz", name: "ListenBrainz and Last.fm scrobbling", role: "Send your plays, if you choose to.", status: "planned" },
];
