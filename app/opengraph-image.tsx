import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const dynamic = "force-static";
export const alt = "Sonara: Your music. Your server. Your rules.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social sharing image, rendered at build time. */
export default async function OpenGraphImage() {
  const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
  const [semibold, regular] = await Promise.all([
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
    readFile(join(fontDir, "Geist-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(70% 80% at 50% 0%, #3b1f73 0%, #0d0b12 70%)",
          color: "#f5f3ff",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="3.2" fill="#a78bfa" />
            <path d="M24 16A8 8 0 1 1 12 9.07" stroke="#a78bfa" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M27.26 22.5A13 13 0 1 1 16 3" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>Sonara</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>Your music. Your server.</div>
          <div style={{ fontSize: 86, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#c4b5fd" }}>Your rules.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a8a3b5", maxWidth: 900 }}>
            Open-source, self-hosted music streaming and library management.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a8a3b5" }}>
          <span>{site.domain}</span>
          <span>{site.organization} · {site.license.core.spdx}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
