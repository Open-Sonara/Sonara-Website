import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/section";
import { StatusBadge, StatusLegend } from "@/components/ui/status-badge";
import { brands, featureCategories, type Feature } from "@/config/features";
import { integrations } from "@/config/integrations";
import { releaseStatus } from "@/config/release-status";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Features",
  description:
    "Every Sonara feature with its real development status: streaming, playlist migration, automatic organization, metadata enrichment, discovery, smart playlists and more.",
  path: "/features",
});

function phaseText(f: { phase: number | null }) {
  return f.phase ? `Roadmap phase ${f.phase}` : "Not yet scheduled";
}

function FeatureRow({ f }: { f: Feature }) {
  return (
    <li className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
      <div className="min-w-0">
        <h3 className="font-sans text-[1.0625rem] font-semibold text-ink">{f.name}</h3>
        <p className="mt-1 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">{f.summary}</p>
        {f.note && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-3">{f.note}</p>}
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
        <StatusBadge status={f.status} progress={f.progress} />
        <span className="text-[0.8125rem] text-ink-3">{phaseText(f)}</span>
      </div>
    </li>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bloom pointer-events-none absolute inset-x-0 top-0 h-[32rem]" aria-hidden="true" />
        <Container className="relative pt-16 pb-14 sm:pt-20">
          <h1 className="max-w-4xl text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
            Everything Sonara does, and how far along it is.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl sm:leading-relaxed">
            Sonara has no release yet, so nothing here is available to install. Each feature shows whether it is built on the main branch, partly built, or planned, according to the{" "}
            <a href={releaseStatus.sources.progress} rel="noopener" className="text-lav-bright underline">
              progress tracker
            </a>{" "}
            (checked {formatDate(releaseStatus.asOf)}).
          </p>
          <StatusLegend className="mt-10 max-w-4xl" />
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <nav aria-label="Feature categories" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {[...featureCategories.map((c) => ({ id: c.id, name: c.name })), { id: "names", name: "Feature names" }, { id: "integrations", name: "Integrations" }].map(
              (c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="inline-flex h-9 items-center rounded-full border border-line px-3.5 text-[0.9375rem] text-ink-2 transition-colors hover:border-line-strong hover:text-ink lg:w-full lg:rounded-lg lg:border-transparent lg:px-3 lg:hover:bg-raised"
                  >
                    {c.name}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="min-w-0 space-y-16">
          {featureCategories.map((c) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-24">
              <h2 id={`${c.id}-title`} className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
                {c.name}
              </h2>
              <p className="mt-2 text-[1.0625rem] text-ink-2">{c.description}</p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {c.features.map((f) => (
                  <FeatureRow key={f.id} f={f} />
                ))}
              </ul>
            </section>
          ))}

          <section id="names" aria-labelledby="names-title" className="scroll-mt-24">
            <h2 id="names-title" className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              Feature names
            </h2>
            <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
              Names used across the site for parts of Sonara. They are all part of one application, not separate things to install.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {brands.map((b) => (
                <li key={b.id} className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-ground-2 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">{b.name}</h3>
                    <StatusBadge status={b.status} progress={b.progress} size="xs" />
                  </div>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">{b.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="integrations" aria-labelledby="integrations-title" className="scroll-mt-24">
            <h2 id="integrations-title" className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              Integrations
            </h2>
            <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
              External services Sonara can work with. Sonara is not affiliated with any of them, and each is subject to that service&rsquo;s own terms. You are responsible for making sure your use of media is authorized.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {integrations.map((i) => (
                <li key={i.id} className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                  <div className="min-w-0">
                    <h3 className="font-sans text-[1.0625rem] font-semibold text-ink">{i.name}</h3>
                    <p className="mt-1 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">{i.role}</p>
                    {i.note && <p className="mt-1.5 text-sm text-ink-3">{i.note}</p>}
                  </div>
                  <div className="sm:justify-self-end">
                    <StatusBadge status={i.status} progress={i.progress} />
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={releaseStatus.sources.roadmap}
              rel="noopener"
              className="mt-8 inline-flex items-center gap-1.5 font-medium text-lav-bright hover:underline"
            >
              Read the full roadmap <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </section>
        </div>
      </Container>
    </>
  );
}
