import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getStartedLink, githubLink, primaryNav } from "@/config/navigation";
import { site } from "@/config/site";
import { getProjectData } from "@/lib/github";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

const bricolage = localFont({
  src: "./fonts/BricolageGrotesque-latin.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: site.seo.titleTemplate },
  description: site.seo.description,
  applicationName: site.name,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.organization, url: site.github.orgUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0b12",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.organization,
      url: site.url,
      sameAs: [site.github.orgUrl],
    },
    {
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Linux, Docker",
      description: site.seo.description,
      license: `https://spdx.org/licenses/${site.license.core.spdx}.html`,
      url: site.url,
      codeRepository: site.github.coreRepoUrl,
      isAccessibleForFree: true,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const project = await getProjectData();

  return (
    <html lang={site.locale} className={cn(GeistSans.variable, GeistMono.variable, bricolage.variable)}>
      <body className="flex min-h-dvh flex-col bg-ground text-ink">
        <a
          href="#content"
          className="sr-only rounded-full bg-lav px-4 py-2 font-medium text-lav-ink focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[60]"
        >
          Skip to content
        </a>
        <SiteHeader nav={primaryNav} github={githubLink} getStarted={getStartedLink} stars={project.core?.stars ?? null} />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
