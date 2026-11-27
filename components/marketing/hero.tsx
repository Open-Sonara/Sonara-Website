import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { AppPreview } from "@/components/demonstrations/app-preview";
import { AppPreviewMobile } from "@/components/demonstrations/app-preview-mobile";
import { SettleIn } from "@/components/marketing/settle-in";
import { SonarRings } from "@/components/marketing/sonar-rings";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { Container, DemoCaption } from "@/components/ui/section";
import { getStartedLink } from "@/config/navigation";
import { releaseStatus } from "@/config/release-status";
import { site } from "@/config/site";

const attributes = ["Open source", "Self-hosted", "Built for Docker", "Privacy-focused", "Community-driven"];

export function Hero() {
  const phase = releaseStatus.phases.find((p) => p.number === releaseStatus.currentPhase);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bloom pointer-events-none absolute inset-x-0 top-0 h-[56rem]" aria-hidden="true" />
      <SonarRings />

      <Container className="relative pt-12 text-center sm:pt-16 lg:pt-20">
        <h1
          id="hero-title"
          className="mx-auto max-w-5xl text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.03em] text-ink sm:text-7xl lg:text-[5.5rem] lg:tracking-[-0.02em]"
        >
          <span className="sm:block">Your music. Your server.</span>{" "}
          <span className="text-lav-bright sm:block">Your rules.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl sm:leading-relaxed">
          {site.description}
        </p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={getStartedLink.href} size="lg">
            Get started
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={site.github.coreRepoUrl} external variant="secondary" size="lg">
            <GitHubIcon className="size-[1.1rem]" />
            View on GitHub
          </ButtonLink>
        </div>

        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.9375rem] text-ink-2">
          {attributes.map((a) => (
            <li key={a} className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-lav" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink-3">
          In active development, Phase {releaseStatus.currentPhase} of {releaseStatus.totalPhases}
          {phase ? ` (${phase.name.toLowerCase()})` : ""}. No release yet.{" "}
          <Link href="#open-source" className="text-lav-bright underline">
            See what&rsquo;s built
          </Link>
        </p>
      </Container>

      <Container className="relative mt-12">
        <SettleIn className="mx-auto max-w-6xl lg:pb-40 xl:pb-44">
          <div className="relative hidden md:block">
            <div className="rounded-[1.4rem] border border-line-strong/60 bg-ground-2/80 p-2 shadow-float lg:mr-10">
              <AppPreview phoneOverlap />
            </div>
            <div className="absolute -right-2 -bottom-40 hidden w-[14rem] drop-shadow-[0_2rem_2.5rem_rgb(4_2_10/0.75)] lg:block xl:-bottom-44 xl:w-[17rem]">
              <AppPreviewMobile />
            </div>
          </div>
          <AppPreviewMobile className="md:hidden" />
        </SettleIn>
        <DemoCaption className="justify-center">
          Interface preview of the Sonara web app with illustrative artists and artwork.
        </DemoCaption>
      </Container>
    </section>
  );
}
