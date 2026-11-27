/**
 * The planned Open Sonara repositories. Most do not exist yet; the GitHub
 * integration checks which ones do and only shows statistics for those.
 * `repo` is the expected GitHub name (case-insensitive on GitHub).
 */

export interface EcosystemRepo {
  name: string;
  repo: string;
  description: string;
}

export const ecosystem: EcosystemRepo[] = [
  { name: "sonara", repo: "Sonara", description: "Core music streaming and management platform." },
  { name: "sonara-website", repo: "Sonara-Website", description: "This website." },
  { name: "sonara-docs", repo: "Sonara-Docs", description: "Official documentation." },
  { name: "sonara-nas", repo: "Sonara-NAS", description: "NAS deployment templates for every platform." },
  { name: "sonara-sdk", repo: "Sonara-SDK", description: "Developer SDKs." },
  { name: "sonara-modules", repo: "Sonara-Modules", description: "Official modules." },
  { name: "sonara-registry", repo: "Sonara-Registry", description: "Community module registry." },
  { name: "sonara-mobile", repo: "Sonara-Mobile", description: "Native mobile clients." },
  { name: "sonara-desktop", repo: "Sonara-Desktop", description: "Desktop clients." },
  { name: "sonara-themes", repo: "Sonara-Themes", description: "Official themes." },
  { name: ".github", repo: ".github", description: "Organization profile and shared configuration." },
];
