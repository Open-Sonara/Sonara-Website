import type { Metadata } from "next";

import { site } from "@/config/site";

/** Page metadata with matching canonical, Open Graph and Twitter fields. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = site.seo.titleTemplate.replace("%s", title);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, title: fullTitle, description, url: path, locale: "en_US" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
