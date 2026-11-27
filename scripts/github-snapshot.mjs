#!/usr/bin/env node
/**
 * Refresh data/github-snapshot.json, the fallback the site uses when the
 * GitHub API is unreachable at build or request time.
 *
 *   pnpm github:snapshot           (optional: GITHUB_TOKEN=... for a higher rate limit)
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ORG = "Open-Sonara";
const CORE = `${ORG}/Sonara`;
const out = fileURLToPath(new URL("../data/github-snapshot.json", import.meta.url));

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "sonara-website",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  return { ok: res.ok, status: res.status, data: res.ok ? await res.json() : null };
}

const repo = await gh(`/repos/${CORE}`);
if (!repo.ok) {
  console.error(`GitHub returned ${repo.status} for ${CORE}; snapshot not updated.`);
  process.exit(1);
}
const release = await gh(`/repos/${CORE}/releases/latest`);
const contributors = await gh(`/repos/${CORE}/contributors?per_page=100&anon=0`);
const orgRepos = await gh(`/orgs/${ORG}/repos?per_page=100&type=public`);

const r = repo.data;
const snapshot = {
  core: {
    fullName: r.full_name,
    url: r.html_url,
    description: r.description,
    stars: r.stargazers_count,
    forks: r.forks_count,
    openIssues: r.open_issues_count,
    language: r.language,
    license: r.license?.spdx_id && r.license.spdx_id !== "NOASSERTION" ? r.license.spdx_id : null,
    pushedAt: r.pushed_at,
    hasDiscussions: Boolean(r.has_discussions),
  },
  latestRelease: release.ok
    ? {
        tag: release.data.tag_name,
        name: release.data.name,
        url: release.data.html_url,
        publishedAt: release.data.published_at,
        prerelease: release.data.prerelease,
      }
    : null,
  contributors: contributors.ok ? contributors.data.length : null,
  orgRepos: orgRepos.ok ? orgRepos.data.map((x) => x.name) : [],
  fetchedAt: new Date().toISOString(),
};

await writeFile(out, JSON.stringify(snapshot, null, 2) + "\n");
console.log(`Wrote ${out}`);
