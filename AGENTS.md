<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sonara website: notes for coding agents

This repository is the public website for Sonara (opensonara.com). It is not the Sonara application; never modify the core repository (`Open-Sonara/Sonara`) from here.

## Ground rules

- **Honest status.** Feature and release status live in `config/features.ts` and `config/release-status.ts`, sourced from the core repository's `docs/PROGRESS.md` and `ROADMAP.md`. Do not describe planned or unreleased work as available anywhere in components or copy.
- **No install commands** unless `canShowInstallCommands()` is true. Never present a container image as downloadable before the release workflow has published it.
- **No fabricated evidence**: statistics, testimonials, users, contributors, releases, download counts. Live numbers come from `lib/github.ts` (server-only, cached hourly, snapshot fallback in `data/`).
- **Illustrative data is labeled**, and cover art is generated (`components/demonstrations/cover-art.tsx`); never use real album artwork.
- **Pages not built yet stay out of navigation.** Use the `pages` flags in `config/navigation.ts`.
- **Privacy**: no analytics, trackers, third-party scripts or third-party fonts.
- **Static-export compatible**: every route must work under `SONARA_OUTPUT=export` (no request-time APIs; metadata routes use `dynamic = "force-static"`).

## Checks

```bash
pnpm typecheck && pnpm lint && pnpm test
pnpm build && pnpm e2e        # Playwright + axe, WCAG 2.2 AA
pnpm build:static             # must also succeed
```

## Style

Design tokens are in `styles/globals.css`. Headings use the display face (Bricolage Grotesque), everything else Geist; Geist Mono only for commands and code. Use `StatusBadge` for any status and `DemoCaption` under any illustrative preview. No eyebrow labels above headings, no gradient text, no glassmorphism.
