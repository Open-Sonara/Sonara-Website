import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { FinalCta } from "@/components/marketing/final-cta";
import { Hero } from "@/components/marketing/hero";
import { Intro } from "@/components/marketing/intro";
import { OpenSource } from "@/components/marketing/open-source";
import { SelfHosting } from "@/components/marketing/self-hosting";
import { getProjectData } from "@/lib/github";

export default async function HomePage() {
  const project = await getProjectData();

  return (
    <>
      <Hero />
      <Intro />
      <FeatureShowcase />
      <SelfHosting />
      <OpenSource project={project} />
      <FinalCta />
    </>
  );
}
