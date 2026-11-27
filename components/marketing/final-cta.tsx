import { ArrowRight } from "lucide-react";

import { SonaraMark } from "@/components/brand/sonara-mark";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section";
import { getStartedLink } from "@/config/navigation";
import { site } from "@/config/site";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgb(109_40_217/0.35)_0%,rgb(109_40_217/0)_70%)]"
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <SonaraMark className="mx-auto size-12" />
        <h2
          id="cta-title"
          className="mx-auto mt-8 max-w-3xl text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl"
        >
          Give your music a home of its own.
        </h2>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={getStartedLink.href} size="lg">
            Get started
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={site.github.coreRepoUrl} external variant="secondary" size="lg">
            <GitHubIcon className="size-[1.1rem]" />
            Explore GitHub
          </ButtonLink>
          <ButtonLink href={site.github.coreTree("docs")} external variant="secondary" size="lg">
            Read the documentation
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
