import { SonaraMark } from "@/components/brand/sonara-mark";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-32 text-center">
      <SonaraMark className="size-12" />
      <h1 className="mt-8 text-5xl font-semibold tracking-[-0.035em] text-ink sm:text-6xl">Nothing playing here.</h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">
        This page doesn&rsquo;t exist, or hasn&rsquo;t been built yet.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Back to the homepage</ButtonLink>
        <ButtonLink href="/features" variant="secondary">
          See all features
        </ButtonLink>
      </div>
    </Container>
  );
}
