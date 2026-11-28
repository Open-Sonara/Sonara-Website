# Sonara website

The official website for [Sonara](https://github.com/Open-Sonara/Sonara), the open-source, self-hosted music streaming, discovery and library management platform from Open Sonara. It is served at [opensonara.com](https://opensonara.com).

> **Your music. Your server. Your rules.**

The site is independent of the Sonara application. It needs no database or other infrastructure, and builds either as a standalone Node server or as a fully static site.

## Status

This is website Phase 1: brand system, homepage, features directory, about page, navigation, GitHub integration, SEO, Docker and CI. Sonara itself has no release yet, and the site says so: every feature carries its real status, and install commands stay hidden until published images exist.

## Development

Requirements: Node.js 22+ and pnpm 9 (`corepack enable`).

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Development server |
| `pnpm build` | Standalone production build (`.next/standalone`) |
| `pnpm build:static` | Static export to `out/` |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | TypeScript |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm e2e` | End-to-end and accessibility tests (Playwright + axe) against a production build; run `pnpm build` first and `pnpm exec playwright install chromium` once |
| `pnpm github:snapshot` | Refresh `data/github-snapshot.json`, the fallback used when the GitHub API is unreachable |

## Updating content

Almost everything that changes over time lives in `config/`:

| File | Controls |
|------|----------|
| `config/site.ts` | Name, tagline, domain, GitHub organization and repositories, license |
| `config/release-status.ts` | Release stage, latest release, whether images are published and install steps verified, roadmap phases |
| `config/features.ts` | Every feature and feature name, with its status |
| `config/navigation.ts` | Which pages are live, the primary navigation and footer links |
| `config/platforms.ts` | Deployment platforms and their support level |
| `config/integrations.ts` | External services and what Sonara does with them |
| `config/ecosystem.ts` | Planned Open Sonara repositories |
| `config/socials.ts` | Community destinations (set to `null` when they do not exist) |

When Sonara ships its first release, update `config/release-status.ts` and the feature statuses; the install section unlocks once `containerImagesPublished` and `installVerified` are both true. Unit tests in `tests/unit/config.test.ts` guard against marking features available before a release exists and against linking to pages that are switched off.

## Deployment

**Docker** (standalone server, non-root, health check on `/healthz`):

```bash
docker compose up -d --build        # http://localhost:3000
```

Once the release workflow has published it, the image is `ghcr.io/open-sonara/sonara-website`. Until then, build it locally as above.

**Static hosts** (Cloudflare Pages, GitHub Pages, any web server): run `pnpm build:static` and serve `out/`. Set `SONARA_BASE_PATH` when serving from a sub-path. Static hosts should add the security headers listed in `next.config.ts` themselves.

**Plesk** (Node.js extension): `app.js` is the startup file.

1. Upload the repository (or deploy it with Plesk's Git integration).
2. In **Node.js**, set *Node.js version* to 22 or newer, *Application root* to the repository folder, *Document root* to `public`, *Application startup file* to `app.js`, and *Application mode* to production.
3. Click **NPM install**, then **Run script** → `build`.
4. **Restart App.** On first start after each build, `app.js` copies `.next/static` and `public/` into `.next/standalone` and starts the server.

Optional environment variables (`GITHUB_TOKEN`, `NEXT_PUBLIC_SITE_URL`) go in the same panel; set `NEXT_PUBLIC_SITE_URL` before building. The build needs roughly 1–2 GB of memory; on a small plan, build locally on Linux (or WSL) and upload the repository with its `.next/` folder instead. Don't upload `node_modules` or a `.next/` built on Windows or macOS: some dependencies ship platform-specific binaries.

On older Linux (for example AlmaLinux/RHEL 8, glibc 2.28), Next.js's native compiler cannot load (`GLIBC_2.29 not found`); the build then falls back automatically to the WebAssembly compiler (`@next/swc-wasm-nodejs`), which is why `pnpm build` uses webpack. It is slower but produces the same site. If you would rather not build on the server at all, use the static export: run `pnpm build:static` on your own machine, upload the contents of `out/` (including `.htaccess`) to the domain's document root, and turn off the Node.js app for the domain. The included `.htaccess` sets the security headers, the 404 page and caching on Apache.

If nginx serves the files on its own (in Plesk: *Apache & nginx Settings* with *Proxy mode* off), `.htaccess` is ignored; add the equivalent to *Additional nginx directives*:

```nginx
error_page 404 /404.html;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "DENY" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
location ~ ^/(opengraph-image|apple-icon)$ { default_type image/png; }
location ^~ /_next/static/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
```

**Node hosting or a reverse proxy**: run `pnpm build`, then `node .next/standalone/server.js` with `.next/static` and `public/` copied alongside, as the Dockerfile does. Set `PORT` and `HOSTNAME` as needed.

### Environment

All optional; see `.env.example`.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and the sitemap (default `https://opensonara.com`) |
| `GITHUB_TOKEN` | Raises the GitHub API rate limit. Server-side only, no scopes needed |
| `SONARA_OUTPUT=export` | Static export (used by `pnpm build:static`) |
| `SONARA_BASE_PATH` | Sub-path for static hosting |
| `PORT`, `HOSTNAME` | Standalone server bind address |

## Privacy

The website sets no cookies and loads no analytics, trackers, third-party scripts or third-party fonts. GitHub statistics are fetched on the server.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security issues: [SECURITY.md](SECURITY.md).

## License

Copyright © 2026 Zoey Hart.

Licensed under the GNU Affero General Public License v3.0 or later. See [LICENSE](LICENSE). Bricolage Grotesque (`app/fonts/`) is licensed under the SIL Open Font License 1.1; Geist under the SIL Open Font License 1.1.
