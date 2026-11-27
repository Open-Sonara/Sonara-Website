import { describe, expect, it } from "vitest";

import { allFeatures, brands, featureCategories, getBrand, statusLabel } from "@/config/features";
import { footerGroups, getStartedLink, pages, primaryNav } from "@/config/navigation";
import { canShowInstallCommands, isReleased, releaseStatus } from "@/config/release-status";
import { socials } from "@/config/socials";

describe("features config", () => {
  it("has unique feature ids", () => {
    const ids = allFeatures().map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("references only known brands", () => {
    for (const f of allFeatures()) {
      if (f.brand) expect(() => getBrand(f.brand!)).not.toThrow();
    }
  });

  it("covers every category the spec lists", () => {
    expect(featureCategories.map((c) => c.name)).toEqual([
      "Music experience",
      "Music organization",
      "Discovery",
      "Personalization",
      "Developer functionality",
      "Administration",
    ]);
  });

  it("marks nothing available while no release exists", () => {
    if (releaseStatus.latestRelease === null) {
      for (const f of allFeatures()) expect(f.status).not.toBe("available");
      for (const b of brands) expect(b.status).not.toBe("available");
    }
  });

  it("only uses progress on in-development work", () => {
    for (const f of allFeatures()) {
      if (f.progress) expect(f.status).toBe("in-development");
    }
  });

  it("labels built-but-unreleased work honestly", () => {
    expect(statusLabel("in-development", "built")).toBe("Built, unreleased");
    expect(statusLabel("in-development", "partial")).toBe("In development");
    expect(statusLabel("planned")).toBe("Planned");
  });
});

describe("release status", () => {
  it("does not offer install commands before images are published and verified", () => {
    if (!releaseStatus.containerImagesPublished || !releaseStatus.installVerified) {
      expect(canShowInstallCommands()).toBe(false);
    }
  });

  it("is consistent about releases", () => {
    if (releaseStatus.latestRelease === null) expect(isReleased()).toBe(false);
  });

  it("lists every phase exactly once", () => {
    expect(releaseStatus.phases.map((p) => p.number)).toEqual(
      Array.from({ length: releaseStatus.totalPhases }, (_, i) => i + 1),
    );
  });
});

describe("navigation", () => {
  const internal = [...primaryNav, getStartedLink, ...footerGroups.flatMap((g) => g.links)].filter(
    (l) => !l.external,
  );

  it("never links to a page that is switched off", () => {
    const routeToPage: Record<string, keyof typeof pages> = {
      "/features": "features",
      "/about": "about",
      "/screenshots": "screenshots",
      "/get-started": "getStarted",
      "/extensions": "extensions",
      "/docs": "docs",
      "/community": "community",
    };
    for (const link of internal) {
      const path = link.href.split("#")[0] || "/";
      const key = routeToPage[path];
      if (key) expect(pages[key], `${link.label} -> ${link.href}`).toBe(true);
    }
  });

  it("does not render community destinations that do not exist", () => {
    const hrefs = [...primaryNav, ...footerGroups.flatMap((g) => g.links)].map((l) => l.href);
    if (socials.discord === null) expect(hrefs.some((h) => h.includes("discord"))).toBe(false);
  });
});
