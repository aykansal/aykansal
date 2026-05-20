#!/usr/bin/env node
/**
 * List deployment UIDs between two boundary IDs (inclusive by created timestamp).
 * Usage: node list-range.mjs <startId> <endId> <api-json-file>
 * Writes table to stdout and IDs to vercel-delete-ids.txt in cwd.
 */

import fs from "node:fs";

const [startId, endId, file] = process.argv.slice(2);
if (!startId || !endId || !file) {
  console.error("Usage: node list-range.mjs <startId> <endId> <api-json-file>");
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8").trim();
let deployments = [];

try {
  const parsed = JSON.parse(raw);
  deployments = Array.isArray(parsed) ? parsed : parsed.deployments ?? [];
} catch {
  for (const line of raw.split(/\n(?=\[|\{)/)) {
    if (!line.trim()) continue;
    const chunk = JSON.parse(line);
    deployments.push(...(Array.isArray(chunk) ? chunk : chunk.deployments ?? []));
  }
}

const byId = new Map(deployments.map((d) => [d.uid, d]));
const start = byId.get(startId);
const end = byId.get(endId);

if (!start) {
  console.error(`Start deployment not found: ${startId}`);
  process.exit(1);
}
if (!end) {
  console.error(`End deployment not found: ${endId}`);
  process.exit(1);
}

const minT = Math.min(start.created, end.created);
const maxT = Math.max(start.created, end.created);

const inRange = deployments
  .filter((d) => d.created >= minT && d.created <= maxT)
  .sort((a, b) => b.created - a.created);

for (const d of inRange) {
  console.log(
    `${d.uid}\t${d.state}\t${d.target ?? "-"}\t${new Date(d.created).toISOString()}\t${d.url ?? ""}`,
  );
}

fs.writeFileSync("vercel-delete-ids.txt", inRange.map((d) => d.uid).join("\n"));
console.error(`\n${inRange.length} deployment(s) → vercel-delete-ids.txt`);
