import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { SonaraMark } from "@/components/brand/sonara-mark";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section";
import { site } from "@/config/site";
import { socials } from "@/config/socials";
import { getProjectData } from "@/lib/github";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Open Sonara is an independent open-source project built around a simple idea: people should have control over their own music collections and listening experiences.",
  path: "/about",
});

const principles = [
  { name: "User ownership", text: "Your collection, your playlists and your history belong to you." },
  { name: "Self-hosting", text: "Sonara runs on hardware you control, not on ours." },
  { name: "Privacy", text: "No mandatory cloud account and no listening data sent to the project." },
  { name: "Transparency", text: "Public code, a public roadmap and honest status." },
  { name: "Open-source development", text: "Licensed so anyone can read, change and share it." },
  { name: "Community participation", text: "Decisions and work happen where anyone can join in." },
  { name: "Interoperability", text: "Standard formats in and out: M3U, CSV, JSON, your own files." },
  { name: "Extensibility", text: "Designed for providers and modules other people build." },
  { name: "Accessibility", text: "Aiming for WCAG 2.2 AA in the app and on this site." },
];

export default async function AboutPage() {
  const project = await getProjectData();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bloom pointer-events-none absolute inset-x-0 top-0 h-[32rem]" aria-hidden="true" />
        <Container className="relative pt-16 pb-16 sm:pt-20">
          <SonaraMark className="size-11" />
          <h1 className="mt-8 max-w-4xl text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
            People should be in control of their own music.
          </h1>
          <div className="prose-sonara mt-8 text-lg">
            <p>
              <strong>{site.organization}</strong> is an independent open-source project built around a simple idea: people should have control over their own music collections and listening experiences.
            </p>
            <p>
              Sonara brings together personal music streaming, automated organization, intelligent discovery and an extensible ecosystem, without asking you to give up control of your infrastructure.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-20 sm:py-24">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">Principles</h2>
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <li key={p.name} className="border-t border-line pt-5">
              <h3 className="font-sans text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>

      <section className="border-y border-line bg-ground-2">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">The project, and your installation</h2>
            <div className="prose-sonara mt-6">
              <p>
                Open Sonara runs this website, the GitHub organization and the code. It does not run your Sonara. Every installation is operated independently by whoever set it up, on their own hardware, under their own responsibility.
              </p>
              <p>
                The project never sees your library, your accounts or what you listen to. If a future feature ever involves sending data anywhere, it will be optional and explained before you turn it on.
              </p>
              <p>
                Open-source code can be inspected, but that alone does not make software secure or private. Read the{" "}
                <a href={socials.security} rel="noopener">
                  security policy
                </a>{" "}
                to see the threat model and how to report a vulnerability.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">License and independence</h2>
            <div className="prose-sonara mt-6">
              <p>
                Sonara and this website are licensed under the <strong>{site.license.core.name}</strong>. You can use, study, change and share them, and changes you make available to others must stay under the same license.
              </p>
              <p>
                Sonara is not affiliated with Spotify, Apple Music, YouTube, MusicBrainz or any other service it can connect to. Integrations depend on each service&rsquo;s terms, and you are responsible for making sure the media you use is authorized. Sonara does not download or decrypt audio from DRM-protected services.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-20 sm:py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">Who builds it</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Sonara is early and small.
            {project.contributors !== null &&
              ` The core repository has ${project.contributors} ${project.contributors === 1 ? "contributor" : "contributors"} so far.`}{" "}
            Everyone is welcome: bug reports, documentation, NAS templates, translations, accessibility testing and code all help.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={socials.contributing} external size="lg">
              Read the contribution guide
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={site.github.orgUrl} external variant="secondary" size="lg">
              <GitHubIcon className="size-[1.1rem]" />
              {site.organization} on GitHub
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
