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
const basePath = process.env.SONARA_BASE_PATH?.replace(/\/+$/, "") || undefined;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
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
  reactStrictMode: true,
  images: {
    unoptimized: isStatic,
    formats: ["image/avif", "image/webp"],
  },
  ...(isStatic
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
