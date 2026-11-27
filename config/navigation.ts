/**
 * Navigation and page availability. A route whose page is not built yet is
 * marked `live: false` and is never shown as a working link. When a page
 * ships, flip its flag and point the nav item at it.
 */

import { releaseStatus } from "./release-status";
import { site } from "./site";
import { socials } from "./socials";

export const pages = {
  features: true,
  about: true,
  screenshots: false,
  getStarted: false,
  nas: false,
  ecosystem: false,
  extensions: false,
  docs: false,
  demo: false,
  pulse: false,
  roadmap: false,
  releases: false,
  changelog: false,
  blog: false,
  community: false,
  faq: false,
  privacy: false,
  terms: false,
  licenses: false,
  security: false,
  trademarks: false,
} as const satisfies Record<string, boolean>;

export type PageKey = keyof typeof pages;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  /** Short line shown in the mobile drawer. */
  hint?: string;
}

/** Primary navigation, in the spec's order, without pages that do not exist yet. */
export const primaryNav: NavLink[] = [
  { label: "Features", href: "/features", hint: "Everything Sonara does, with status" },
  { label: "Discover", href: "/#discover", hint: "Recommendations beyond your library" },
  ...(pages.screenshots ? [{ label: "Screenshots", href: "/screenshots" }] : []),
  ...(pages.extensions ? [{ label: "Extensions", href: "/extensions" }] : []),
  pages.docs
    ? { label: "Documentation", href: "/docs" }
    : {
        label: "Documentation",
        href: site.github.coreTree("docs"),
        external: true,
        hint: "Install, configuration and API docs on GitHub",
      },
  pages.community
    ? { label: "Community", href: "/community" }
    : { label: "Community", href: socials.discussions, external: true, hint: "GitHub Discussions" },
];

export const githubLink: NavLink = { label: "GitHub", href: site.github.coreRepoUrl, external: true };

/** The primary action. Points at the homepage install section until /get-started exists. */
export const getStartedLink: NavLink = pages.getStarted
  ? { label: "Get started", href: "/get-started" }
  : { label: "Get started", href: "/#get-started" };

export interface FooterGroup {
  title: string;
  links: NavLink[];
}

export const footerGroups: FooterGroup[] = [
  {
    title: "Sonara",
    links: [
      { label: "Features", href: "/features" },
      { label: "About", href: "/about" },
      { label: "Roadmap", href: releaseStatus.sources.roadmap, external: true },
      { label: "Progress tracker", href: releaseStatus.sources.progress, external: true },
      { label: "Changelog", href: releaseStatus.sources.changelog, external: true },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Installation", href: releaseStatus.sources.installation, external: true },
      { label: "Configuration", href: site.github.coreFile("docs/CONFIGURATION.md"), external: true },
      { label: "Troubleshooting", href: site.github.coreFile("docs/TROUBLESHOOTING.md"), external: true },
      { label: "REST API", href: site.github.coreFile("docs/API.md"), external: true },
      { label: "Architecture", href: site.github.coreFile("ARCHITECTURE.md"), external: true },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discussions", href: socials.discussions, external: true },
      { label: "Issues", href: socials.issues, external: true },
      { label: "Contributing", href: socials.contributing, external: true },
      { label: "Security policy", href: socials.security, external: true },
    ],
  },
  {
    title: "Open Sonara",
    links: [
      { label: "GitHub organization", href: site.github.orgUrl, external: true },
      { label: "Website source", href: site.github.websiteRepoUrl, external: true },
      { label: "License (AGPL-3.0)", href: site.github.coreFile("LICENSE"), external: true },
    ],
  },
];
