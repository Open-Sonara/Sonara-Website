import { CoverArt } from "@/components/demonstrations/cover-art";
import { demoAlbums } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const tabs = ["Albums", "Artists", "Genres", "Moods", "Eras"];
const formats = ["FLAC", "FLAC", "MP3", "FLAC", "Opus", "ALAC", "FLAC", "AAC"];

/** Library browsing, as in the app: tabs, quality badges, artwork grid. */
export function LibraryDemo() {
  const albums = demoAlbums.slice(0, 8);
  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-ground-2 p-4 shadow-float sm:p-6" aria-hidden="true">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-2xl font-semibold tracking-[-0.02em]">Library</p>
        <p className="tabular text-sm text-ink-3">8 of 1,284 albums</p>
      </div>
      <div className="mt-4 flex gap-1.5 overflow-hidden">
        {tabs.map((t, i) => (
          <span
            key={t}
            className={cn(
              "rounded-full px-3 py-1.5 text-[0.8125rem]",
              i === 0 ? "bg-ink text-ground" : "border border-line text-ink-2",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
        {albums.map((a, i) => (
          <div key={a.seed} className={cn("min-w-0", i > 5 && "hidden sm:block")}>
            <div className="relative overflow-hidden rounded-lg shadow-lift">
              <CoverArt seed={a.seed} />
              <span className="absolute right-1.5 bottom-1.5 rounded bg-ground/85 px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wide text-ink">
                {formats[i]}
              </span>
            </div>
            <p className="mt-2 truncate text-[0.8125rem] font-medium text-ink">{a.title}</p>
            <p className="truncate text-xs text-ink-3">{a.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
