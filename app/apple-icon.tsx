import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0b12" }}>
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="3.2" fill="#a78bfa" />
          <path d="M24 16A8 8 0 1 1 12 9.07" stroke="#a78bfa" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M27.26 22.5A13 13 0 1 1 16 3" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
