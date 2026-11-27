import { ArrowUpRight, Container as ContainerIcon, HardDrive, Server, ShieldCheck } from "lucide-react";

import { CopyCommand } from "@/components/ui/copy-command";
import { Container, SectionHeading } from "@/components/ui/section";
import { platforms, supportLabel } from "@/config/platforms";
import { canShowInstallCommands, releaseStatus } from "@/config/release-status";
import { cn } from "@/lib/utils";

const facts = [
  { icon: ContainerIcon, title: "One compose file", text: "PostgreSQL, Valkey, the worker and a gateway start together. One port is exposed." },
  { icon: HardDrive, title: "Your folders stay yours", text: "Mount existing collections read-only. Sonara never changes their ownership or deletes audio." },
  { icon: Server, title: "Modest hardware", text: "Designed for machines like a 4-core NAS, with amd64 and arm64 images. Benchmarks come before 1.0." },
  {
    icon: ShieldCheck,
    title: "No cloud account",
    text: "No account with Open Sonara or anyone else. Services like MusicBrainz only receive track details, and can be switched off.",
  },
];

export function SelfHosting() {
  const showCommands = canShowInstallCommands();

  return (
    <section id="get-started" aria-labelledby="selfhost-title" className="scroll-mt-20 border-t border-line bg-ground-2 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="selfhost-title"
          title="Your server. Your collection. Your control."
          lead="Sonara runs on your own hardware, as a set of Docker containers on a Linux box or a NAS. Your music, your listening history and your accounts never leave it."
        />

        <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <li key={f.title}>
              <f.icon className="size-6 text-lav" aria-hidden="true" />
              <h3 className="mt-4 font-sans text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{f.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">Installing Sonara</h3>
            {showCommands ? (
              <div className="mt-5">
                <p className="text-[1.0625rem] leading-relaxed text-ink-2">Download the compose file and environment template, set a database password, then start the stack.</p>
                <CopyCommand
                  className="mt-5"
                  command={`curl -fsSLO https://raw.githubusercontent.com/Open-Sonara/Sonara/main/docker-compose.yml\ncurl -fsSL https://raw.githubusercontent.com/Open-Sonara/Sonara/main/.env.example -o .env\ndocker compose up -d`}
                />
              </div>
            ) : (
              <div className="mt-5 rounded-[var(--radius-card)] border border-line-strong bg-ground p-5 sm:p-6">
                <p className="font-semibold text-ink">There is nothing to install yet.</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                  Sonara has no release and its container images have not been published. The copy-and-paste install command will appear here once the first release is out and the steps have been checked on it.
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  Until then, the install guide describes the planned setup and how developers can build the images themselves.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
                  <a href={releaseStatus.sources.installation} rel="noopener" className="inline-flex items-center gap-1 font-medium text-lav-bright hover:underline">
                    Read the install guide <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                  <a href={`${releaseStatus.sources.roadmap}`} rel="noopener" className="inline-flex items-center gap-1 text-ink-2 hover:text-ink hover:underline">
                    Follow the roadmap <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">Where it runs</h3>
            <p className="mt-2 text-[0.9375rem] text-ink-2">Support as it stands today. Nothing is marked tested until published images have run on it.</p>
            <ul className="mt-5 divide-y divide-line rounded-[var(--radius-card)] border border-line bg-ground">
              {platforms.map((p) => (
                <li key={p.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{p.name}</p>
                    <p className="text-[0.8125rem] leading-snug text-ink-3">{p.note ?? p.method}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-[0.8125rem] font-medium",
                      p.support === "tested" && "text-lav-bright",
                      p.support === "documented" && "text-ink-2",
                      (p.support === "planned" || p.support === "not-yet") && "text-ink-3",
                    )}
                  >
                    {supportLabel(p.support)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
