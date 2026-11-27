# Security Policy

This policy covers the Open Sonara **website** (this repository, served at opensonara.com). For the Sonara application itself, see the [core security policy](https://github.com/Open-Sonara/Sonara/blob/main/SECURITY.md).

## Reporting a vulnerability

Please **do not open a public issue**. Use GitHub's private vulnerability reporting on this repository (**Security → Report a vulnerability**) and include the affected page or file, a description, reproduction steps and the impact you expect.

## What the website does and does not do

- It is a static site, or a standalone Next.js server that renders the same pages. It has no accounts, no forms that store data, no database and no cookies.
- It loads no third-party scripts, fonts or analytics. Fonts are self-hosted.
- Repository statistics come from the public GitHub API on the server. An optional `GITHUB_TOKEN` raises the rate limit; it is read only on the server and is never sent to the browser. No scopes are needed.
- The Node server sends a Content-Security-Policy, `frame-ancestors 'none'`, `nosniff`, a referrer policy and a permissions policy (see `next.config.ts`). Static hosts should add equivalent headers in their own configuration.
- The container runs as the unprivileged `node` user and works with a read-only root filesystem.

## Known limitations

- Next.js needs `'unsafe-inline'` for scripts and styles in the CSP. No third-party script origins are allowed.
