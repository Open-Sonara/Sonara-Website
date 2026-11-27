import type { MetadataRoute } from "next";

import { pages } from "@/config/navigation";
import { site } from "@/config/site";

export const dynamic = "force-static";

const routes: Array<{ path: string; live: boolean; priority: number }> = [
  { path: "/", live: true, priority: 1 },
  { path: "/features", live: pages.features, priority: 0.8 },
  { path: "/about", live: pages.about, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((r) => r.live)
    .map((r) => ({
      url: `${site.url}${r.path === "/" ? "" : r.path}`,
      changeFrequency: "weekly",
      priority: r.priority,
    }));
}
