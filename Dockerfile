# syntax=docker/dockerfile:1.7
# Sonara website: Next.js standalone server.
#
#   docker build -t ghcr.io/open-sonara/sonara-website .
#   docker run -p 3000:3000 ghcr.io/open-sonara/sonara-website

ARG NODE_VERSION=24

# ---------------------------------------------------------------------------
# deps: install from the lockfile only
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable
COPY package.json pnpm-lock.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    corepack install && pnpm install --frozen-lockfile

# ---------------------------------------------------------------------------
# build: compile the standalone server
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_SITE_URL=https://opensonara.com
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# GITHUB_TOKEN is optional and only raises the API rate limit during the build.
RUN --mount=type=secret,id=github_token,required=false \
    export GITHUB_TOKEN="$(cat /run/secrets/github_token 2>/dev/null || true)"; \
    corepack install && pnpm build

# ---------------------------------------------------------------------------
# runner: minimal runtime, non-root
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

LABEL org.opencontainers.image.title="sonara-website" \
      org.opencontainers.image.description="The official website for Sonara" \
      org.opencontainers.image.source="https://github.com/Open-Sonara/Sonara-Website" \
      org.opencontainers.image.licenses="AGPL-3.0-or-later"

COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/healthz').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "server.js"]
