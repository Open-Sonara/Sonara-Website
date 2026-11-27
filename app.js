/**
 * Startup file for Plesk (Node.js extension / Phusion Passenger) and any host
 * that expects a single entry script.
 *
 * Plesk settings:
 *   Application root:   the repository folder
 *   Document root:      <repository>/public
 *   Application startup file: app.js
 *   Node.js version:    22 or newer
 *
 * Build first ("NPM install", then run the "build" script), then restart the
 * app. This file starts the Next.js standalone server from .next/standalone and
 * copies the static assets it needs next to it on first start.
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const standaloneDir = path.join(root, ".next", "standalone");
const serverFile = path.join(standaloneDir, "server.js");

if (!fs.existsSync(serverFile)) {
  console.error(
    "[sonara-website] .next/standalone/server.js not found. Run the build first (npm run build), then restart the app.",
  );
  process.exit(1);
}

// Next.js leaves static assets and public/ out of the standalone folder; copy
// them in so the server can serve CSS, JS, fonts and images.
function syncDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, { recursive: true });
}

// Copy after every new build: compare the build id with the one already copied.
const buildIdFile = path.join(root, ".next", "BUILD_ID");
const copiedIdFile = path.join(standaloneDir, ".next", "COPIED_BUILD_ID");
const buildId = fs.existsSync(buildIdFile) ? fs.readFileSync(buildIdFile, "utf8").trim() : "";
const copiedId = fs.existsSync(copiedIdFile) ? fs.readFileSync(copiedIdFile, "utf8").trim() : null;

if (buildId !== copiedId) {
  syncDir(path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static"));
  syncDir(path.join(root, "public"), path.join(standaloneDir, "public"));
  fs.mkdirSync(path.dirname(copiedIdFile), { recursive: true });
  fs.writeFileSync(copiedIdFile, buildId);
}

process.env.NODE_ENV = "production";
process.env.NEXT_TELEMETRY_DISABLED = "1";
// Many Linux shells export HOSTNAME as the machine name, which would make the
// server bind to the wrong interface. Passenger replaces the address anyway.
process.env.HOSTNAME = process.env.SONARA_HOST || "0.0.0.0";
process.env.PORT = process.env.PORT || "3000";

require(serverFile);
