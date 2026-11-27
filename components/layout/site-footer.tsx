import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SonaraWordmark } from "@/components/brand/sonara-mark";
import { footerGroups } from "@/config/navigation";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ground-2">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <SonaraWordmark />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              {site.tagline} An open-source, self-hosted music platform from the {site.organization} project.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">
              This website sets no cookies and loads no trackers or third-party scripts.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-sans text-sm font-semibold text-ink">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          rel="noopener"
                          className="inline-flex items-center gap-1 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3.5 opacity-50" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link href={link.href} className="text-[0.9375rem] text-ink-2 transition-colors hover:text-ink">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Sonara and this website are free software under the {site.license.core.spdx} license.
          </p>
          <p className="max-w-xl sm:text-right">
            Sonara is an independent project, not affiliated with Spotify, Apple Music, YouTube or any other service it can connect to.
          </p>
        </div>
      </div>
    </footer>
  );
}
