#!/usr/bin/env node
/**
 * List deployment UIDs with state ERROR from a Vercel /v6/deployments API dump.
 * Usage: node filter-errors.mjs <api-json-file> [--include-canceled]
 * Writes IDs to vercel-error-ids.txt in cwd.
 */

import fs from "node:fs";

const args = process.argv.slice(2);
const includeCanceled = args.includes("--include-canceled");
const file = args.find((a) => !a.startsWith("--"));

if (!file) {
  console.error("Usage: node filter-errors.mjs <api-json-file> [--include-canceled]");
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

const isError = (d) => {
  const state = String(d.state ?? d.readyState ?? "").toUpperCase();
  if (state === "ERROR") return true;
  if (includeCanceled && state === "CANCELED") return true;
  return false;
};

const errors = deployments.filter(isError).sort((a, b) => b.created - a.created);

for (const d of errors) {
  console.log(
    `${d.uid}\t${d.state}\t${d.target ?? "-"}\t${new Date(d.created).toISOString()}\t${d.url ?? ""}`,
  );
}

fs.writeFileSync("vercel-error-ids.txt", errors.map((d) => d.uid).join("\n"));
const label = includeCanceled ? "error/canceled" : "error";
console.error(`\n${errors.length} ${label} deployment(s) → vercel-error-ids.txt`);
