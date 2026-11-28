import type { NextConfig } from "next";

/**
 * Two build targets from one codebase:
 *
 *   pnpm build          standalone Node server (Docker, Node hosting, reverse proxies).
 *                       GitHub data revalidates hourly; security headers are set here.
 *   pnpm build:static   fully static export in ./out (Cloudflare Pages, GitHub Pages,
 *                       any static host). GitHub data is fetched once at build time.
 *                       Set SONARA_BASE_PATH when serving from a sub-path such as
 *                       https://<user>.github.io/<repo>.
 */

const isStatic = process.env.SONARA_OUTPUT === "export";
// The CSP blocks eval and the HMR WebSocket that the dev server needs, so headers apply to production builds only.
const isDev = process.env.NODE_ENV === "development";
const basePath = process.env.SONARA_BASE_PATH?.replace(/\/+$/, "") || undefined;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: isStatic ? "export" : "standalone",
  basePath,
  trailingSlash: isStatic,
  poweredByHeader: false,
  // Let the dev server be opened at 127.0.0.1 as well as localhost.
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  reactStrictMode: true,
  // The site ships no raster images that need resizing, so the server never needs sharp,
  // a native module that can break on older Linux hosts. Leave it out of the standalone output.
  images: { unoptimized: true },
  outputFileTracingExcludes: { "*": ["**/node_modules/sharp/**", "**/node_modules/@img/**"] },
  ...(isStatic || isDev
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
