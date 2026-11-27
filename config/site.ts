/**
 * Site-wide identity and links. Change the organization, repositories or
 * domains here; components read from this file instead of hardcoding them.
 */

const githubOrg = "Open-Sonara";
const coreRepo = `${githubOrg}/Sonara`;
const websiteRepo = `${githubOrg}/Sonara-Website`;

export const site = {
  name: "Sonara",
  organization: "Open Sonara",
  tagline: "Your music. Your server. Your rules.",
  description:
    "Sonara is an open-source, self-hosted music platform that brings intelligent music discovery, automated library management and a beautiful listening experience together — entirely on your own infrastructure.",

  /** Canonical origin used for metadata, sitemap and Open Graph URLs. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://opensonara.com").replace(/\/+$/, ""),
  domain: "opensonara.com",
  /** Planned long-term documentation host. Not live yet. */
  docsDomain: "docs.opensonara.com",
  locale: "en",

  seo: {
    title: "Sonara — Open-Source, Self-Hosted Music Streaming",
    titleTemplate: "%s · Sonara",
    description:
      "Take control of your music with Sonara, an open-source, self-hosted platform for music streaming, intelligent discovery, playlist management and automated library organization.",
    keywords: [
      "self-hosted music streaming",
      "open-source music server",
      "self-hosted Spotify alternative",
      "Docker music server",
      "NAS music streaming",
      "personal music library",
      "automatic music organization",
      "music library management",
      "Spotify playlist migration",
      "smart playlists",
      "audio fingerprinting",
    ],
  },

  github: {
    org: githubOrg,
    orgUrl: `https://github.com/${githubOrg}`,
    coreRepo,
    coreRepoUrl: `https://github.com/${coreRepo}`,
    websiteRepo,
    websiteRepoUrl: `https://github.com/${websiteRepo}`,
    /** Build a link to a file on the core repository's default branch. */
    coreFile: (path: string) => `https://github.com/${coreRepo}/blob/main/${path}`,
    coreTree: (path: string) => `https://github.com/${coreRepo}/tree/main/${path}`,
  },

  license: {
    core: { spdx: "AGPL-3.0-or-later", name: "GNU Affero General Public License v3.0 or later" },
    website: { spdx: "AGPL-3.0-or-later", name: "GNU Affero General Public License v3.0 or later" },
  },
} as const;

export type Site = typeof site;
