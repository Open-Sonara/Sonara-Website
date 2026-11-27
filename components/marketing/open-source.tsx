import { ArrowUpRight } from "lucide-react";

import { StatusMark } from "@/components/ui/status-badge";
import { GitHubIcon } from "@/components/ui/icons";
import { Container, SectionHeading } from "@/components/ui/section";
import { releaseStatus, type PhaseState } from "@/config/release-status";
import { site } from "@/config/site";
import { socials } from "@/config/socials";
import type { ProjectData } from "@/lib/github";
import { formatDate } from "@/lib/utils";

const principles = [
  { title: "Transparent development", text: "Code, roadmap and progress tracker are public, and so are the decisions behind them." },
  { title: "Community contributions", text: "Bug reports, ideas, documentation and code are all welcome." },
  { title: "Extensible architecture", text: "A modular server built so new providers and modules can plug in." },
  { title: "Independent deployment", text: "Your installation is yours. It does not depend on any Open Sonara server." },
];

const links = [
  { label: "Repository", href: site.github.coreRepoUrl },
  { label: "Contribution guide", href: socials.contributing },
  { label: "Issue tracker", href: socials.issues },
  { label: "Feature requests and discussions", href: socials.discussions },
];

const phaseTone: Record<PhaseState, "built" | "progress" | "planned"> = {
  built: "built",
  "in-progress": "progress",
  "not-started": "planned",
};
const phaseText: Record<PhaseState, string> = {
  built: "Built, unreleased",
  "in-progress": "In development",
  "not-started": "Planned",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.8125rem] text-ink-3">{label}</dt>
      <dd className="mt-0.5 truncate text-[0.9375rem] font-medium text-ink">{value}</dd>
    </div>
  );
}

export function OpenSource({ project }: { project: ProjectData }) {
  const core = project.core;

  return (
    <section id="open-source" aria-labelledby="oss-title" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeading
              id="oss-title"
              title="Built in the open. Made for everyone."
              lead={`Sonara is free software under the ${site.license.core.name}. You can read every line, run it however you like and help shape where it goes.`}
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {principles.map((p) => (
                <li key={p.title}>
                  <h3 className="font-sans text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{p.text}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    rel="noopener"
                    className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line-strong px-4 text-[0.9375rem] text-ink transition-colors hover:border-lav/60"
                  >
                    {l.label}
                    <ArrowUpRight className="size-4 text-ink-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            {core && (
              <div className="rounded-[var(--radius-card)] border border-line bg-ground-2 p-5 sm:p-6">
                <a href={core.url} rel="noopener" className="group inline-flex items-center gap-2.5 font-semibold text-ink">
                  <GitHubIcon className="size-5" />
                  <span className="group-hover:underline">{core.fullName}</span>
                  <ArrowUpRight className="size-4 text-ink-3" aria-hidden="true" />
                </a>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                  <Stat label="Latest release" value={project.latestRelease ? project.latestRelease.tag : "None yet"} />
                  <Stat label="License" value={core.license ?? "See repository"} />
                  {core.language && <Stat label="Main language" value={core.language} />}
                  {core.pushedAt && <Stat label="Last update" value={formatDate(core.pushedAt)} />}
                  <Stat label="Stars" value={core.stars.toLocaleString("en")} />
                  {project.contributors !== null && <Stat label="Contributors" value={project.contributors.toLocaleString("en")} />}
                </dl>
                <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] text-ink-3">
                  {project.source === "live"
                    ? "Live from the GitHub API, refreshed hourly."
                    : `GitHub was unreachable; showing data saved on ${formatDate(project.fetchedAt)}.`}
                </p>
              </div>
            )}

            <div className="rounded-[var(--radius-card)] border border-line bg-ground-2 p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-sans text-base font-semibold text-ink">Roadmap</h3>
                <a href={releaseStatus.sources.progress} rel="noopener" className="inline-flex items-center gap-1 text-[0.8125rem] text-lav-bright hover:underline">
                  Progress tracker <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
              <ol className="mt-4 space-y-2.5">
                {releaseStatus.phases.map((p) => (
                  <li key={p.number} className="grid grid-cols-[1.75rem_1fr_auto] items-start gap-x-2 text-[0.9375rem]">
                    <span className="tabular pt-px text-ink-3">{p.number}</span>
                    <div className="min-w-0">
                      <span className={p.state === "not-started" ? "text-ink-2" : "text-ink"}>{p.name}</span>
                      {p.note && <p className="text-[0.8125rem] leading-snug text-ink-3">{p.note}</p>}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 pt-0.5 text-[0.8125rem] ${p.state === "not-started" ? "text-ink-3" : "text-lav-bright"}`}
                    >
                      <StatusMark tone={phaseTone[p.state]} />
                      {phaseText[p.state]}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-line pt-4 text-[0.8125rem] text-ink-3">
                From the core repository&rsquo;s roadmap and progress tracker, checked {formatDate(releaseStatus.asOf)}. No dates are promised.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
