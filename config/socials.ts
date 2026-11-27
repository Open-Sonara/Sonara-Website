/**
 * Community destinations. A destination set to `null` does not exist yet and
 * is never rendered as a link.
 */

import { site } from "./site";

export const socials = {
  github: site.github.orgUrl,
  repository: site.github.coreRepoUrl,
  discussions: `${site.github.coreRepoUrl}/discussions`,
  issues: `${site.github.coreRepoUrl}/issues`,
  newIssue: `${site.github.coreRepoUrl}/issues/new/choose`,
  featureRequests: `${site.github.coreRepoUrl}/discussions`,
  contributing: site.github.coreFile("CONTRIBUTING.md"),
  security: site.github.coreFile("SECURITY.md"),
  codeOfConduct: null as string | null,
  /** No Discord server exists. Documentation and downloads never require one. */
  discord: null as string | null,
} as const;
