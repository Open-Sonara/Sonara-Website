import { House, Library, ListMusic, Pause, Search } from "lucide-react";

import { CoverArt } from "@/components/demonstrations/cover-art";
import { demoAlbums, nowPlaying } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

/**
 * The Sonara web app's phone layout (bottom tab bar, mini player), drawn at
 * real sizes for small screens. Illustrative data; decorative to assistive
 * technology, with the caption describing it.
 */
export function AppPreviewMobile({ className }: { className?: string }) {
  const quick = [demoAlbums[6]!, demoAlbums[7]!, demoAlbums[9]!, demoAlbums[3]!];
  const recent = demoAlbums.slice(0, 3);

  return (
    <div className={cn("mx-auto w-full max-w-[20rem]", className)} aria-hidden="true">
      <div className="overflow-hidden rounded-[2.2rem] border border-line-strong bg-[#110e18] p-2 shadow-float">
        <div className="overflow-hidden rounded-[1.7rem] border border-line bg-[linear-gradient(180deg,rgb(109_40_217/0.28)_0%,rgb(17_14_24/0)_40%)]">
          <div className="px-4 pt-5">
            <p className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">Good evening</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {quick.map((a) => (
                <div key={a.seed} className="flex h-11 items-center gap-2 overflow-hidden rounded-md bg-raised-2/80 text-[0.6875rem] font-semibold text-ink">
                  <div className="size-11 shrink-0">
                    <CoverArt seed={a.seed} />
                  </div>
                  <span className="truncate pr-1">{a.title}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 font-display text-[0.9375rem] font-semibold text-ink">Recently added</p>
            <div className="mt-2 grid grid-cols-3 gap-2.5">
              {recent.map((a) => (
                <div key={a.seed} className="min-w-0">
                  <div className="overflow-hidden rounded-md">
                    <CoverArt seed={a.seed} />
                  </div>
                  <p className="mt-1 truncate text-[0.6875rem] font-medium text-ink">{a.title}</p>
                  <p className="truncate text-[0.625rem] text-ink-3">{a.artist}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-2 mt-4 flex items-center gap-2.5 rounded-xl bg-raised p-2">
            <div className="size-9 shrink-0 overflow-hidden rounded-md">
              <CoverArt seed={nowPlaying.seed} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-ink">{nowPlaying.title}</p>
              <p className="truncate text-[0.6875rem] text-ink-2">{nowPlaying.artist}</p>
            </div>
            <span className="grid size-8 place-items-center rounded-full bg-ink text-[#110e18]">
              <Pause className="size-3.5" fill="currentColor" />
            </span>
          </div>
          <div className="mx-4 mt-2 h-0.5 rounded-full bg-line-strong">
            <div className="h-full w-[41%] rounded-full bg-lav" />
          </div>

          <div className="mt-2 grid grid-cols-4 border-t border-line bg-[#0c0a11] py-2.5 text-[0.625rem] text-ink-3">
            {[
              { icon: House, label: "Home", active: true },
              { icon: Search, label: "Search" },
              { icon: Library, label: "Library" },
              { icon: ListMusic, label: "Playlists" },
            ].map((t) => (
              <span key={t.label} className={cn("flex flex-col items-center gap-1", t.active && "text-ink")}>
                <t.icon className="size-4" />
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
