# Contributing to the Sonara website

Thanks for helping. This repository is the public website only; to work on Sonara itself, see the [core contribution guide](https://github.com/Open-Sonara/Sonara/blob/main/CONTRIBUTING.md).

## Setup

```bash
corepack enable
pnpm install
pnpm dev
```

Before opening a pull request, run:

```bash
pnpm typecheck && pnpm lint && pnpm test
pnpm build && pnpm e2e
```

## Layout

```text
app/                    routes (homepage, /features, /about), metadata routes, fonts
components/
  brand/                Sonara mark and wordmark
  layout/               header, mobile menu, footer
  marketing/            homepage sections
  demonstrations/       interface previews and interactive demos (illustrative data)
  ui/                   buttons, status badges, section headings, copy button
config/                 everything that changes over time: status, features, links
data/                   GitHub snapshot used when the API is unreachable
lib/                    GitHub data layer, metadata helper, utilities, demo data
styles/                 global CSS and design tokens
tests/                  unit (Vitest) and end-to-end (Playwright + axe) tests
```

## Content rules

These keep the site honest while Sonara is in development:

- **Status comes from config.** Never write "available" or describe a feature as shipped in a component. Change `config/features.ts` instead, and only to match the core repository's progress tracker.
- **Nothing is installable until it is.** Install commands render only when `config/release-status.ts` says images are published and the steps are verified.
- **No invented evidence.** No fake statistics, testimonials, user counts, contributors, releases or download numbers. Live numbers come from the GitHub API.
- **Illustrative data is labeled.** Demo artists, albums and statistics are fictional and every place they appear says so. Cover art is generated; never use real album artwork.
- **No unfinished pages in navigation.** Add a route, then flip its flag in `config/navigation.ts`.
- **Privacy.** No analytics, trackers, third-party scripts or third-party fonts without a documented decision.

## Design

Use the tokens in `styles/globals.css` (`ground`, `raised`, `line`, `lav`, `ink`…), the display face for headings and Geist for everything else, and the `StatusBadge` component for any status. Keep motion to the existing hero entrance and the player equalizer, and make every interactive demo keyboard-operable.

## Accessibility

Target WCAG 2.2 AA. The e2e suite runs axe on every page at desktop and mobile widths; keep it green.

## Commits and pull requests

Small, focused commits with a clear message. Open pull requests against `main`.
