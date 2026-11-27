import type { MetadataRoute } from "next";

import { site } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} by ${site.organization}`,
    short_name: site.name,
    description: site.seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#0d0b12",
    theme_color: "#0d0b12",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
