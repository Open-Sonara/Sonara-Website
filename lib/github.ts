import "server-only";

import snapshot from "@/data/github-snapshot.json";
import { site } from "@/config/site";

/**
 * Public GitHub data for the Open Sonara repositories.
 *
 * Runs only on the server (at build time for static output, or on the
 * server with hourly revalidation). No token is required for public data;
 * an optional GITHUB_TOKEN raises the rate limit and is never sent to the
 * browser. If GitHub is unreachable, the committed snapshot in
 * data/github-snapshot.json is used, and anything missing is simply hidden.
 */

export interface RepoStats {
  fullName: string;
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  license: string | null;
  pushedAt: string | null;
  hasDiscussions: boolean;
}

export interface ReleaseInfo {
  tag: string;
  name: string | null;
  url: string;
  publishedAt: string | null;
  prerelease: boolean;
}

export interface ProjectData {
  core: RepoStats | null;
  latestRelease: ReleaseInfo | null;
  contributors: number | null;
  orgRepos: string[];
  /** "live" when fetched now, "snapshot" when GitHub was unreachable. */
  source: "live" | "snapshot";
  fetchedAt: string;
}

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60;

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "sonara-website",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function gh<T>(path: string): Promise<{ ok: true; data: T } | { ok: false; status: number }> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { ok: false, status: res.status };
    return { ok: true, data: (await res.json()) as T };
  } catch {
    return { ok: false, status: 0 };
  }
}

interface ApiRepo {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  license: { spdx_id: string | null } | null;
  pushed_at: string | null;
  has_discussions?: boolean;
  name: string;
}

interface ApiRelease {
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string | null;
  prerelease: boolean;
}

const toRepo = (r: ApiRepo): RepoStats => ({
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
});

export async function getProjectData(): Promise<ProjectData> {
  const [repo, release, contributors, orgRepos] = await Promise.all([
    gh<ApiRepo>(`/repos/${site.github.coreRepo}`),
    gh<ApiRelease>(`/repos/${site.github.coreRepo}/releases/latest`),
    gh<unknown[]>(`/repos/${site.github.coreRepo}/contributors?per_page=100&anon=0`),
    gh<ApiRepo[]>(`/orgs/${site.github.org}/repos?per_page=100&type=public`),
  ]);

  // The core repository is the one thing we need; without it, fall back entirely.
  if (!repo.ok) {
    return { ...(snapshot as unknown as Omit<ProjectData, "source">), source: "snapshot" };
  }

  return {
    core: toRepo(repo.data),
    // 404 means "no release yet", which is a real answer, not a failure.
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
    orgRepos: orgRepos.ok ? orgRepos.data.map((r) => r.name) : (snapshot.orgRepos as string[]),
    source: "live",
    fetchedAt: new Date().toISOString(),
  };
}
