/**
 * Where Sonara stands today. This is the single switch that moves the site
 * from "in development" to "released": when a release ships, set `stage`,
 * flip `containerImagesPublished` / `installVerified` once the release
 * workflow has actually succeeded, and the install sections unlock.
 *
 * Source of truth: the core repository's ROADMAP.md (phase table) and
 * docs/PROGRESS.md (per-feature status, the more current of the two).
 */

import { site } from "./site";

export type ReleaseStage = "pre-release" | "beta" | "stable";
export type PhaseState = "built" | "in-progress" | "not-started";

export interface RoadmapPhase {
  number: number;
  name: string;
  state: PhaseState;
  /** What is still open, in the maintainers' words. */
  note?: string;
}

export const releaseStatus = {
  stage: "pre-release" as ReleaseStage,
  /** Date the status below was last checked against the core repository. */
  asOf: "2026-11-27",

  /** No release, tag or published image exists yet. */
  latestRelease: null as null | { version: string; date: string; url: string },
  containerImagesPublished: false,
  /** Set true only after the install steps have been run end to end on a published image. */
  installVerified: false,

  currentPhase: 1,
  totalPhases: 10,

  sources: {
    roadmap: site.github.coreFile("ROADMAP.md"),
    progress: site.github.coreFile("docs/PROGRESS.md"),
    changelog: site.github.coreFile("CHANGELOG.md"),
    installation: site.github.coreFile("docs/INSTALLATION.md"),
  },

  phases: [
    {
      number: 1,
      name: "Project foundation",
      state: "in-progress",
      note: "Server and web app are built and tested; container images and automatic CI are still pending.",
    },
    { number: 2, name: "Core music library", state: "built" },
    { number: 3, name: "Playlists", state: "built", note: "Custom cover upload and playlist merge remain." },
    { number: 4, name: "Import & acquisition", state: "built" },
    { number: 5, name: "Automatic synchronization", state: "built" },
    {
      number: 6,
      name: "Automatic categorization",
      state: "built",
      note: "Built ahead of schedule according to the progress tracker.",
    },
    {
      number: 7,
      name: "Advanced discovery",
      state: "in-progress",
      note: "Smart playlists, recommendations and radio are built on the server; their web screens are not.",
    },
    { number: 8, name: "Advanced playback", state: "not-started" },
    { number: 9, name: "Multi-user & statistics", state: "not-started" },
    { number: 10, name: "Release preparation", state: "not-started" },
  ] satisfies RoadmapPhase[],
};

export const isReleased = () => releaseStatus.stage !== "pre-release" && releaseStatus.latestRelease !== null;
export const canShowInstallCommands = () => releaseStatus.containerImagesPublished && releaseStatus.installVerified;
