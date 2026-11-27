/**
 * Illustrative data for interface previews and demonstrations. Every artist,
 * album, track and number here is invented; the site labels each place it
 * appears. Cover art is generated from the seed, never real artwork.
 */

export interface DemoAlbum {
  title: string;
  artist: string;
  year: number;
  seed: string;
}

export const demoAlbums: DemoAlbum[] = [
  { title: "Tidal Static", artist: "Hollow Coast", year: 2023, seed: "tidal" },
  { title: "Glasshouse Summer", artist: "Mira Vance", year: 2021, seed: "glasshouse" },
  { title: "Low Orbit Hymns", artist: "The Lantern Choir", year: 2019, seed: "orbit" },
  { title: "Paper Satellites", artist: "Kestrel & Vine", year: 2024, seed: "satellites8" },
  { title: "Night Bus Diaries", artist: "Juno Park", year: 2022, seed: "nightbus" },
  { title: "Salt & Signal", artist: "Ostra", year: 2020, seed: "salt19" },
  { title: "Late Bloom", artist: "Cassia Reyes", year: 2018, seed: "bloom" },
  { title: "Afterglow Index", artist: "Fen & Fable", year: 2025, seed: "afterglow" },
  { title: "Quiet Machines", artist: "Arlo Sato", year: 2017, seed: "machines54" },
  { title: "Sundown Protocol", artist: "Wren Halloway", year: 2024, seed: "sundown16" },
  { title: "Moth Radio", artist: "Pale Harbor", year: 2016, seed: "moth" },
  { title: "Velour Hours", artist: "Sable Kids", year: 2023, seed: "velour" },
];

export const nowPlaying = {
  title: "Lighthouse Frequency",
  artist: "Hollow Coast",
  album: "Tidal Static",
  seed: "tidal",
  elapsed: "1:42",
  duration: "4:08",
};

export const demoPlaylists = ["Liked Songs", "Late-night drive", "Imported: Road trip 2019", "Focus, no vocals", "Kitchen radio"];
