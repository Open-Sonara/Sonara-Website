/**
 * Deployment platforms and how far each is supported. "documented" means the
 * core install guide has instructions for it; nothing is "tested" until
 * published images have been run on that platform.
 */

import { site } from "./site";

export type PlatformSupport = "tested" | "documented" | "planned" | "not-yet";

export interface Platform {
  id: string;
  name: string;
  support: PlatformSupport;
  method: string;
  note?: string;
  docs?: string;
  maintainedBy?: "official" | "community";
}

const installGuide = site.github.coreFile("docs/INSTALLATION.md");

export const platforms: Platform[] = [
  {
    id: "docker-compose",
    name: "Docker Compose",
    support: "documented",
    method: "docker compose up -d with the provided compose file",
    docs: installGuide,
    maintainedBy: "official",
  },
  {
    id: "linux",
    name: "Linux",
    support: "documented",
    method: "Docker Engine 24+ with the Compose plugin",
    docs: installGuide,
    maintainedBy: "official",
  },
  {
    id: "unraid",
    name: "Unraid",
    support: "documented",
    method: "Compose Manager plugin with the provided compose file",
    note: "A native Unraid template is planned for Phase 10.",
    docs: installGuide,
    maintainedBy: "official",
  },
  {
    id: "truenas",
    name: "TrueNAS SCALE",
    support: "documented",
    method: "Custom app from YAML (Compose)",
    docs: installGuide,
    maintainedBy: "official",
  },
  {
    id: "synology",
    name: "Synology",
    support: "documented",
    method: "Container Manager project from the compose file",
    docs: installGuide,
    maintainedBy: "official",
  },
  {
    id: "portainer",
    name: "Portainer",
    support: "documented",
    method: "Stack from the compose file",
    docs: installGuide,
    maintainedBy: "official",
  },
  { id: "qnap", name: "QNAP", support: "not-yet", method: "Container Station (not documented yet)" },
  { id: "omv", name: "OpenMediaVault", support: "not-yet", method: "Compose plugin (not documented yet)" },
];

export function supportLabel(s: PlatformSupport): string {
  switch (s) {
    case "tested":
      return "Tested";
    case "documented":
      return "Guide written, untested";
    case "planned":
      return "Planned";
    case "not-yet":
      return "Not documented yet";
  }
}
