import {
  Compass,
  Download,
  Heart,
  House,
  Library,
  ListMusic,
  Pause,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

import { SonaraMark } from "@/components/brand/sonara-mark";
import { CoverArt } from "@/components/demonstrations/cover-art";
import { demoAlbums, demoPlaylists, nowPlaying } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

import s from "./app-preview.module.css";

const waveform = Array.from({ length: 64 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 0.43) * Math.cos(i * 0.17)) * 0.75);

/**
 * A coded preview of the Sonara web app's layout (sidebar, home, now-playing
 * panel, persistent player). Illustrative data only; decorative to assistive
 * technology, with the caption describing it.
 */
export function AppPreview({ className }: { className?: string }) {
  const recent = demoAlbums.slice(0, 5);
  const quick = [demoAlbums[6]!, demoAlbums[7]!, demoAlbums[9]!, demoAlbums[3]!, demoAlbums[10]!, demoAlbums[11]!];
  const queue = [demoAlbums[1]!, demoAlbums[8]!, demoAlbums[5]!];

  return (
    <div className={cn(s.frame, className)} aria-hidden="true">
      <div className={s.app}>
        <aside className={s.sidebar}>
          <div className={s.brand}>
            <SonaraMark />
            Sonara
          </div>
          <div className={cn(s.navItem, s.navActive)}>
            <House /> Home
          </div>
          <div className={s.navItem}>
            <Search /> Search
          </div>
          <div className={s.navItem}>
            <Library /> Library
          </div>
          <div className={s.navItem}>
            <Compass /> Genres &amp; moods
          </div>
          <div className={s.navItem}>
            <Download /> Imports
          </div>
          <div className={s.sideLabel}>Playlists</div>
          {demoPlaylists.map((p) => (
            <div key={p} className={s.playlist}>
              {p}
            </div>
          ))}
        </aside>

        <div className={s.main}>
          <div className={s.topbar}>
            <div className={s.search}>
              <Search /> Search artists, albums, moods…
            </div>
            <div className={s.avatar} />
          </div>
          <div className={s.h1}>Good evening</div>
          <div className={s.quick}>
            {quick.map((a) => (
              <div key={a.seed} className={s.quickItem}>
                <CoverArt seed={a.seed} />
                <span>{a.title}</span>
              </div>
            ))}
          </div>
          <div className={s.rowTitle}>Recently added</div>
          <div className={s.albums}>
            {recent.map((a) => (
              <div key={a.seed} className={s.album}>
                <div className={s.cover}>
                  <CoverArt seed={a.seed} />
                </div>
                <div className={s.albumTitle}>{a.title}</div>
                <div className={s.albumArtist}>
                  {a.artist} · {a.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={s.panel}>
          <div className={s.panelLabel}>Now playing</div>
          <div className={s.panelCover}>
            <CoverArt seed={nowPlaying.seed} />
          </div>
          <div className={s.panelTitle}>{nowPlaying.title}</div>
          <div className={s.panelArtist}>{nowPlaying.artist}</div>
          <div className={s.chips}>
            <span className={s.chip}>FLAC · 24-bit</span>
            <span className={s.chip}>Dream pop</span>
            <span className={s.chip}>Late night</span>
          </div>
          <div className={s.queue}>
            {queue.map((a) => (
              <div key={a.seed} className={s.queueItem}>
                <CoverArt seed={a.seed} />
                <div className={s.queueText}>
                  <div>{a.title}</div>
                  <div>{a.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className={s.player}>
          <div className={s.track}>
            <CoverArt seed={nowPlaying.seed} />
            <div>
              <div className={s.trackTitle}>
                {nowPlaying.title}
                <span className={s.eq}>
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div className={s.trackArtist}>{nowPlaying.artist}</div>
            </div>
            <Heart style={{ width: "1.1em", height: "1.1em", color: "var(--color-lav)", fill: "var(--color-lav)" }} />
          </div>
          <div className={s.controls}>
            <div className={s.buttons}>
              <Shuffle />
              <SkipBack />
              <span className={s.play}>
                <Pause fill="currentColor" />
              </span>
              <SkipForward />
              <Repeat />
            </div>
            <div className={s.progress}>
              <span>{nowPlaying.elapsed}</span>
              <div className={s.wave}>
                {waveform.map((v, i) => (
                  <span key={i} style={{ height: `${v * 100}%` }} data-played={i < 26 ? "" : undefined} />
                ))}
              </div>
              <span>{nowPlaying.duration}</span>
            </div>
          </div>
          <div className={s.extras}>
            <ListMusic />
            <Volume2 />
            <div className={s.volume} />
          </div>
        </div>
      </div>
    </div>
  );
}
